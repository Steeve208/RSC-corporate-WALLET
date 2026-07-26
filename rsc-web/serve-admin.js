#!/usr/bin/env node
/** Static server for admin panel only (no sqlite/mining). */
const express = require('express');
const path = require('path');

const app = express();
const root = __dirname;
const PORT = process.env.ADMIN_PORT || 3000;

app.use(express.static(root));

app.get('/', (_req, res) => {
  res.redirect('/admin/login.html');
});

app.listen(PORT, () => {
  console.log(`Admin panel: http://localhost:${PORT}/admin/login.html`);
  console.log(`Sign Docs admin: http://localhost:${PORT}/admin/sign-docs-admin.html`);
});
