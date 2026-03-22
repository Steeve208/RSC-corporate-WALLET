# 📚 Instrucciones de Uso - RSC Chain Chatbot Backend

## 🚀 Inicio Rápido

### 1. Instalación

```bash
# Ir a la carpeta del chatbot
cd chatbot-backend

# Crear entorno virtual (recomendado)
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt
```

### 2. Configuración

Copia `env.example` a `.env` y configura:

```bash
# Windows
copy env.example .env

# Linux/Mac
cp env.example .env
```

Edita `.env`:
- `EMAIL_USER`: Tu email (ej: tuemail@gmail.com)
- `EMAIL_PASSWORD`: App Password de Gmail (ver abajo)
- `SUPPORT_EMAIL`: Email donde recibir solicitudes (ej: support@rscchain.com)

**Configurar Gmail:**
1. Activa verificación en 2 pasos: https://myaccount.google.com/security
2. Genera App Password: https://myaccount.google.com/apppasswords
3. Usa el App Password generado como `EMAIL_PASSWORD`

### 3. Ejecutar

```bash
# Opción 1: Directamente
python app.py

# Opción 2: Con scripts
# Windows:
start.bat
# Linux/Mac:
chmod +x start.sh
./start.sh
```

El servidor estará en `http://localhost:5000`

## 🔧 Funcionamiento

### Base de Conocimiento

El bot está entrenado con información completa sobre:
- ✅ Minería web y sesiones
- ✅ Creación y gestión de wallets
- ✅ Staking y delegación
- ✅ P2P Trading
- ✅ Explorer de blockchain
- ✅ Troubleshooting común
- ✅ Seguridad y mejores prácticas

### Detección de Intenciones

El bot detecta automáticamente:
- **Saludos**: Responde con mensaje personalizado según hora del día
- **Preguntas**: Busca en la base de conocimiento
- **Problemas técnicos**: Ofrece soluciones o escala a soporte
- **Información general**: Proporciona detalles sobre RSC Chain

### Escalación Automática

Cuando el bot no puede resolver un problema:
1. Detecta baja confianza en la respuesta
2. Solicita email y username al usuario
3. Envía email al equipo de soporte con:
   - Email del usuario
   - Nombre de usuario
   - Problema descrito
   - Historial de conversación

## 📡 Integración con Frontend

El frontend ya está configurado para conectarse al backend:
- En desarrollo: `http://localhost:5000/api/chatbot`
- En producción: `/api/chatbot` (configurar proxy según tu servidor)

## 🧪 Probar el Chatbot

### Test Manual:

```bash
# Endpoint de salud
curl http://localhost:5000/api/chatbot/health

# Enviar mensaje
curl -X POST http://localhost:5000/api/chatbot/message \
  -H "Content-Type: application/json" \
  -d '{
    "message": "¿Cómo minar RSC?",
    "session_id": "test_session",
    "user_email": "",
    "username": ""
  }'
```

### Desde el Frontend:

1. Abre `index.html` en el navegador
2. Haz clic en el botón flotante de chat (esquina inferior derecha)
3. Escribe un mensaje
4. El bot responderá automáticamente

## 🐛 Troubleshooting

### El backend no inicia:
- Verifica que Python 3.8+ esté instalado
- Asegúrate de tener todas las dependencias: `pip install -r requirements.txt`
- Verifica que el puerto 5000 no esté en uso

### El frontend no se conecta:
- Verifica que el backend esté corriendo en `localhost:5000`
- Abre la consola del navegador (F12) para ver errores
- Verifica CORS si usas un dominio diferente

### Los emails no se envían:
- Verifica la configuración en `.env`
- Para Gmail, asegúrate de usar App Password, no tu contraseña normal
- Verifica que `SUPPORT_EMAIL` sea un email válido

## 📝 Notas Importantes

- El bot funciona completamente offline (sin necesidad de APIs externas)
- La base de conocimiento se puede actualizar editando `rsc_knowledge.py`
- Las sesiones se almacenan en memoria (en producción usar Redis/DB)
- El bot puede responder en español y detecta términos en inglés también

## 🔄 Actualizar Base de Conocimiento

Para agregar más información al bot, edita `rsc_knowledge.py`:

```python
self.knowledge_base = {
    'nueva_categoria': {
        'nuevo_tema': {
            'description': 'Información sobre el nuevo tema...',
            'troubleshooting': {
                'problema_comun': 'Solución al problema común...'
            }
        }
    }
}
```

## 🚀 Despliegue en Producción

### Con Gunicorn:

```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Variables de entorno en producción:

Asegúrate de configurar todas las variables en tu plataforma de hosting (Railway, Heroku, etc.)

---

**¿Preguntas?** Revisa el `README.md` o contacta al equipo de desarrollo.

