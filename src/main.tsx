import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { I18nProvider } from "./contexts/I18nContext";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("No se encontró el elemento root");
}

const root = createRoot(rootElement);

// Renderizar con manejo de errores
try {
  root.render(
    <React.StrictMode>
      <I18nProvider>
        <App />
      </I18nProvider>
    </React.StrictMode>
  );
} catch (error) {
  console.error("Error renderizando la aplicación:", error);
  root.render(
    <div style={{ 
      padding: '40px', 
      background: '#050509', 
      color: '#fff', 
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ color: '#f00' }}>Error al cargar la aplicación</h1>
      <pre style={{ color: '#f00', whiteSpace: 'pre-wrap', marginTop: '20px' }}>
        {String(error)}
        {error instanceof Error ? `\n\nStack:\n${error.stack}` : ''}
      </pre>
    </div>
  );
}
  