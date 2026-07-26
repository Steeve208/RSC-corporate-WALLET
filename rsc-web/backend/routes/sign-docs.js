const express = require('express');
const rateLimit = require('express-rate-limit');
const {
  normalizeEmail,
  listDocumentsForEmail,
  getDocumentDetail,
  downloadPdfBuffer,
  getSignaturesForMerge,
  saveSignature
} = require('../services/signDocsService');

const router = express.Router();

const accessLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many access attempts', code: 'RATE_LIMIT' }
});

const signLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many sign attempts', code: 'RATE_LIMIT' }
});

function handleError(res, error) {
  if (error.code === 'UNAUTHORIZED_EMAIL') {
    return res.status(403).json({ success: false, error: error.message, code: error.code });
  }
  if (error.code === 'ALREADY_SIGNED') {
    return res.status(409).json({ success: false, error: error.message, code: error.code });
  }
  console.error('Sign docs error:', error);
  return res.status(500).json({ success: false, error: 'Internal server error', code: 'INTERNAL_ERROR' });
}

router.post('/access', accessLimiter, async (req, res) => {
  try {
    const email = normalizeEmail(req.body?.email);
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Valid email required', code: 'INVALID_EMAIL' });
    }

    const documents = await listDocumentsForEmail(email);
    res.json({ success: true, email, documents, count: documents.length });
  } catch (error) {
    return handleError(res, error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const email = normalizeEmail(req.query.email);
    if (!email) {
      return res.status(400).json({ success: false, error: 'email query param required', code: 'MISSING_EMAIL' });
    }

    const document = await getDocumentDetail(req.params.id, email);
    res.json({ success: true, data: document });
  } catch (error) {
    return handleError(res, error);
  }
});

router.get('/:id/pdf', async (req, res) => {
  try {
    const email = normalizeEmail(req.query.email);
    if (!email) {
      return res.status(400).json({ success: false, error: 'email query param required', code: 'MISSING_EMAIL' });
    }

    const buffer = await downloadPdfBuffer(req.params.id, email);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="document.pdf"');
    res.send(buffer);
  } catch (error) {
    return handleError(res, error);
  }
});

router.get('/:id/signatures', async (req, res) => {
  try {
    const email = normalizeEmail(req.query.email);
    if (!email) {
      return res.status(400).json({ success: false, error: 'email query param required', code: 'MISSING_EMAIL' });
    }

    const payload = await getSignaturesForMerge(req.params.id, email);
    res.json({ success: true, ...payload });
  } catch (error) {
    return handleError(res, error);
  }
});

router.post('/:id/sign', signLimiter, async (req, res) => {
  try {
    const email = normalizeEmail(req.body?.email);
    const { signatureDataUrl } = req.body || {};

    if (!email) {
      return res.status(400).json({ success: false, error: 'email required', code: 'MISSING_EMAIL' });
    }
    if (!signatureDataUrl || !String(signatureDataUrl).startsWith('data:image/png')) {
      return res.status(400).json({ success: false, error: 'PNG signature required', code: 'INVALID_SIGNATURE' });
    }

    const signature = await saveSignature(req.params.id, email, signatureDataUrl);
    const document = await getDocumentDetail(req.params.id, email);

    res.json({ success: true, signature, data: document });
  } catch (error) {
    return handleError(res, error);
  }
});

module.exports = router;
