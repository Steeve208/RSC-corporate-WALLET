import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../contexts/I18nContext';
import { Navbar } from '../landing/Navbar';
import {
  accessSignDocs,
  createSignDocument,
  fetchPdfBytes,
  getPdfUrl,
  getSignDocument,
  getSignaturesForDownload,
  isSignDocsAdmin,
  submitSignature,
  type NewSignerInput,
  type SignDocument,
} from '../../lib/signDocsApi';
import { downloadPdfBytes, mergeSignaturesIntoPdf } from '../../lib/signDocsPdf';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Download,
  FileSignature,
  Loader2,
  PenLine,
  Plus,
  Trash2,
  Upload,
} from 'lucide-react';
import '../../styles/company-sign-docs-page.css';

type Step = 'gate' | 'list' | 'sign' | 'admin';

type PartnerRow = NewSignerInput;

export function CompanySignDocsPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState<Step>('gate');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [gateEmail, setGateEmail] = useState('');
  const [documents, setDocuments] = useState<SignDocument[]>([]);
  const [activeDoc, setActiveDoc] = useState<SignDocument | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signing, setSigning] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [partners, setPartners] = useState<PartnerRow[]>([
    { email: '', name: '', roleLabel: 'Partner' },
  ]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  useEffect(() => {
    if (step === 'sign') initCanvas();
  }, [step, activeDoc, initCanvas]);

  const refreshDocs = async (adminEmail: string) => {
    const docs = await accessSignDocs(adminEmail);
    setDocuments(docs);
  };

  const handleAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const normalized = gateEmail.trim().toLowerCase();
      const admin = isSignDocsAdmin(normalized);
      setEmail(normalized);
      setIsAdmin(admin);

      if (admin) {
        await refreshDocs(normalized);
        setStep('admin');
        return;
      }

      const docs = await accessSignDocs(normalized);
      if (!docs.length) {
        setError(t('companySignDocs.errors.noDocuments'));
        return;
      }
      setDocuments(docs);
      setStep('list');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('companySignDocs.errors.generic'));
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdfFile || !title.trim()) {
      setError(t('companySignDocs.admin.needTitlePdf'));
      return;
    }
    setCreating(true);
    setError(null);
    try {
      await createSignDocument({
        title,
        description,
        pdfFile,
        adminEmail: email,
        adminName: 'RSC Group',
        partners: partners.filter((p) => p.email.trim()),
      });
      setTitle('');
      setDescription('');
      setPdfFile(null);
      setPartners([{ email: '', name: '', roleLabel: 'Partner' }]);
      await refreshDocs(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('companySignDocs.errors.generic'));
    } finally {
      setCreating(false);
    }
  };

  const openDocument = async (doc: SignDocument) => {
    setLoading(true);
    setError(null);
    setPdfUrl(null);
    try {
      const fresh = await getSignDocument(doc.id, email);
      const url = await getPdfUrl(doc.id, email);
      setActiveDoc(fresh);
      setPdfUrl(url);
      setStep('sign');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('companySignDocs.errors.generic'));
    } finally {
      setLoading(false);
    }
  };

  const getCanvasPoint = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    drawing.current = true;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCanvasPoint(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCanvasPoint(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDraw = () => {
    drawing.current = false;
  };

  const clearSignature = () => initCanvas();

  const handleSign = async () => {
    if (!activeDoc || !canvasRef.current) return;
    setSigning(true);
    setError(null);
    try {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      const updated = await submitSignature(activeDoc.id, email, dataUrl);
      setActiveDoc(updated);
      setDocuments((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
    } catch (err) {
      setError(err instanceof Error ? err.message : t('companySignDocs.errors.generic'));
    } finally {
      setSigning(false);
    }
  };

  const handleDownload = async () => {
    if (!activeDoc) return;
    setDownloading(true);
    setError(null);
    try {
      const [{ signatures }, pdfBytes] = await Promise.all([
        getSignaturesForDownload(activeDoc.id, email),
        fetchPdfBytes(activeDoc.id, email),
      ]);
      const merged = await mergeSignaturesIntoPdf(pdfBytes, signatures);
      const slug = activeDoc.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
      downloadPdfBytes(merged, `${slug}-signed.pdf`);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('companySignDocs.errors.generic'));
    } finally {
      setDownloading(false);
    }
  };

  const signedCount = (doc: SignDocument) => doc.signers.filter((s) => s.signed).length;

  const backFromSign = () => {
    setActiveDoc(null);
    setPdfUrl(null);
    setStep(isAdmin ? 'admin' : 'list');
  };

  const updatePartner = (index: number, patch: Partial<PartnerRow>) => {
    setPartners((prev) => prev.map((p, i) => (i === index ? { ...p, ...patch } : p)));
  };

  return (
    <div className="company-sign-docs-page">
      <Navbar />

      <section className="company-sign-docs-hero">
        <div className="company-sign-docs-hero-container">
          <div className="company-sign-docs-hero-icon">
            <FileSignature size={64} />
          </div>
          <h1 className="company-sign-docs-hero-title">{t('companySignDocs.hero.title')}</h1>
          <p className="company-sign-docs-hero-subtitle">{t('companySignDocs.hero.subtitle')}</p>
        </div>
      </section>

      <section className="company-sign-docs-main">
        <div className="company-sign-docs-container">
          {error && <div className="company-sign-docs-error">{error}</div>}

          {step === 'gate' && (
            <div className="company-sign-docs-gate">
              <PenLine size={40} className="company-sign-docs-gate-icon" />
              <h2>{t('companySignDocs.gate.title')}</h2>
              <p>{t('companySignDocs.gate.description')}</p>
              <form onSubmit={handleAccess} className="company-sign-docs-gate-form">
                <input
                  type="email"
                  value={gateEmail}
                  onChange={(e) => setGateEmail(e.target.value)}
                  placeholder={t('companySignDocs.gate.emailPlaceholder')}
                  required
                  autoComplete="email"
                />
                <button type="submit" disabled={loading}>
                  {loading ? <Loader2 className="spin" size={18} /> : t('companySignDocs.gate.submit')}
                </button>
              </form>
            </div>
          )}

          {step === 'admin' && (
            <div className="company-sign-docs-admin">
              <div className="company-sign-docs-list-head">
                <button type="button" className="company-sign-docs-back" onClick={() => setStep('gate')}>
                  <ArrowLeft size={16} /> {t('companySignDocs.actions.changeEmail')}
                </button>
                <span className="company-sign-docs-email-badge company-sign-docs-email-badge--admin">
                  RSC Admin · {email}
                </span>
              </div>

              <div className="company-sign-docs-admin-create">
                <h2>{t('companySignDocs.admin.createTitle')}</h2>
                <p>{t('companySignDocs.admin.createHint')}</p>
                <form onSubmit={handleCreate} className="company-sign-docs-admin-form">
                  <label>
                    {t('companySignDocs.admin.title')}
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Partnership Agreement — Acme"
                      required
                    />
                  </label>
                  <label>
                    {t('companySignDocs.admin.description')}
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={2}
                      placeholder="Optional notes"
                    />
                  </label>
                  <label className="company-sign-docs-file">
                    {t('companySignDocs.admin.pdf')}
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                      required
                    />
                    {pdfFile && <span>{pdfFile.name}</span>}
                  </label>

                  <div className="company-sign-docs-partners">
                    <div className="company-sign-docs-partners-head">
                      <h3>{t('companySignDocs.admin.partners')}</h3>
                      <button
                        type="button"
                        className="company-sign-docs-secondary"
                        onClick={() =>
                          setPartners((p) => [...p, { email: '', name: '', roleLabel: 'Partner' }])
                        }
                      >
                        <Plus size={14} /> {t('companySignDocs.admin.addPartner')}
                      </button>
                    </div>
                    <p className="company-sign-docs-admin-note">{t('companySignDocs.admin.rscAuto')}</p>
                    {partners.map((p, i) => (
                      <div key={i} className="company-sign-docs-partner-row">
                        <input
                          type="email"
                          placeholder="partner@company.com"
                          value={p.email}
                          onChange={(e) => updatePartner(i, { email: e.target.value })}
                          required={i === 0}
                        />
                        <input
                          type="text"
                          placeholder={t('companySignDocs.admin.partnerName')}
                          value={p.name}
                          onChange={(e) => updatePartner(i, { name: e.target.value })}
                        />
                        <input
                          type="text"
                          placeholder="Partner"
                          value={p.roleLabel}
                          onChange={(e) => updatePartner(i, { roleLabel: e.target.value })}
                        />
                        {partners.length > 1 && (
                          <button
                            type="button"
                            className="company-sign-docs-icon-btn"
                            onClick={() => setPartners((prev) => prev.filter((_, j) => j !== i))}
                            aria-label="Remove"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button type="submit" className="company-sign-docs-primary" disabled={creating}>
                    {creating ? (
                      <Loader2 className="spin" size={16} />
                    ) : (
                      <>
                        <Upload size={16} /> {t('companySignDocs.admin.submit')}
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className="company-sign-docs-admin-list">
                <h2>{t('companySignDocs.admin.allDocs')}</h2>
                {loading ? (
                  <div className="company-sign-docs-loading"><Loader2 className="spin" size={32} /></div>
                ) : documents.length === 0 ? (
                  <p className="company-sign-docs-empty">{t('companySignDocs.admin.empty')}</p>
                ) : (
                  <ul className="company-sign-docs-doc-list">
                    {documents.map((doc) => (
                      <li key={doc.id}>
                        <button
                          type="button"
                          onClick={() => openDocument(doc)}
                          className="company-sign-docs-doc-card"
                        >
                          <div>
                            <h3>{doc.title}</h3>
                            {doc.description && <p>{doc.description}</p>}
                            <span className="company-sign-docs-progress">
                              {signedCount(doc)} / {doc.signers.length}{' '}
                              {t('companySignDocs.list.signatures')}
                            </span>
                            <div className="company-sign-docs-signer-chips">
                              {doc.signers.map((s) => (
                                <span
                                  key={s.id}
                                  className={s.signed ? 'chip-signed' : 'chip-pending'}
                                >
                                  {s.name} · {s.roleLabel}
                                </span>
                              ))}
                            </div>
                          </div>
                          <span className={`company-sign-docs-status company-sign-docs-status--${doc.status}`}>
                            {doc.status}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {step === 'list' && (
            <div className="company-sign-docs-list-view">
              <div className="company-sign-docs-list-head">
                <button type="button" className="company-sign-docs-back" onClick={() => setStep('gate')}>
                  <ArrowLeft size={16} /> {t('companySignDocs.actions.changeEmail')}
                </button>
                <span className="company-sign-docs-email-badge">{email}</span>
              </div>
              <h2>{t('companySignDocs.list.title')}</h2>
              {loading ? (
                <div className="company-sign-docs-loading"><Loader2 className="spin" size={32} /></div>
              ) : (
                <ul className="company-sign-docs-doc-list">
                  {documents.map((doc) => (
                    <li key={doc.id}>
                      <button type="button" onClick={() => openDocument(doc)} className="company-sign-docs-doc-card">
                        <div>
                          <h3>{doc.title}</h3>
                          {doc.description && <p>{doc.description}</p>}
                          <span className="company-sign-docs-progress">
                            {signedCount(doc)} / {doc.signers.length} {t('companySignDocs.list.signatures')}
                          </span>
                        </div>
                        <span className={`company-sign-docs-status company-sign-docs-status--${doc.status}`}>
                          {doc.status}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {step === 'sign' && activeDoc && (
            <div className="company-sign-docs-sign-view">
              <button type="button" className="company-sign-docs-back" onClick={backFromSign}>
                <ArrowLeft size={16} /> {t('companySignDocs.actions.backToList')}
              </button>

              <div className="company-sign-docs-sign-head">
                <h2>{activeDoc.title}</h2>
                <button
                  type="button"
                  className="company-sign-docs-download-btn"
                  onClick={handleDownload}
                  disabled={downloading || signedCount(activeDoc) === 0}
                >
                  {downloading ? <Loader2 className="spin" size={16} /> : <Download size={16} />}
                  {t('companySignDocs.actions.download')}
                </button>
              </div>

              <div className="company-sign-docs-layout">
                <div className="company-sign-docs-preview">
                  {pdfUrl ? (
                    <iframe title={activeDoc.title} src={pdfUrl} className="company-sign-docs-iframe" />
                  ) : (
                    <div className="company-sign-docs-loading"><Loader2 className="spin" size={32} /></div>
                  )}
                </div>

                <aside className="company-sign-docs-sidebar">
                  <h3>{t('companySignDocs.sign.signersTitle')}</h3>
                  <ul className="company-sign-docs-signers">
                    {activeDoc.signers.map((s) => (
                      <li key={s.id} className={s.signed ? 'signed' : 'pending'}>
                        {s.signed ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                        <div>
                          <strong>{s.name}</strong>
                          <span>{s.roleLabel}</span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {activeDoc.currentSignerId && !activeDoc.hasSigned ? (
                    <div className="company-sign-docs-pad">
                      <h3>{t('companySignDocs.sign.drawTitle')}</h3>
                      <p>{t('companySignDocs.sign.drawHint')}</p>
                      <canvas
                        ref={canvasRef}
                        width={480}
                        height={160}
                        className="company-sign-docs-canvas"
                        onMouseDown={startDraw}
                        onMouseMove={draw}
                        onMouseUp={endDraw}
                        onMouseLeave={endDraw}
                        onTouchStart={startDraw}
                        onTouchMove={draw}
                        onTouchEnd={endDraw}
                      />
                      <div className="company-sign-docs-pad-actions">
                        <button type="button" onClick={clearSignature} className="company-sign-docs-secondary">
                          {t('companySignDocs.sign.clear')}
                        </button>
                        <button
                          type="button"
                          onClick={handleSign}
                          disabled={signing}
                          className="company-sign-docs-primary"
                        >
                          {signing ? <Loader2 className="spin" size={16} /> : t('companySignDocs.sign.submit')}
                        </button>
                      </div>
                    </div>
                  ) : activeDoc.hasSigned ? (
                    <div className="company-sign-docs-done">
                      <CheckCircle2 size={32} />
                      <p>{t('companySignDocs.sign.alreadySigned')}</p>
                    </div>
                  ) : (
                    <p className="company-sign-docs-admin-note">{t('companySignDocs.admin.viewOnly')}</p>
                  )}
                </aside>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
