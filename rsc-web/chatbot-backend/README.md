# 🤖 RSC Chain Chatbot Backend

Backend en Python para el chatbot de atención al cliente de RSC Chain.

## 🚀 Características

- ✅ IA especializada en RSC Chain
- ✅ Base de conocimiento completa sobre todas las funcionalidades
- ✅ Detección de intenciones y categorías
- ✅ Escalación automática a soporte humano cuando es necesario
- ✅ Envío de emails al equipo de soporte
- ✅ API REST con Flask

## 📋 Requisitos

- Python 3.8+
- pip

## 🛠️ Instalación

1. **Crear entorno virtual (recomendado)**:
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

2. **Instalar dependencias**:
```bash
pip install -r requirements.txt
```

3. **Configurar variables de entorno**:
```bash
cp .env.example .env
```

Edita `.env` y configura:
- `EMAIL_USER`: Tu email para enviar notificaciones
- `EMAIL_PASSWORD`: Tu contraseña o App Password
- `SUPPORT_EMAIL`: Email donde recibir solicitudes de soporte

## 🚀 Ejecutar

### Desarrollo:
```bash
python app.py
```

### Producción:
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

El servidor estará disponible en `http://localhost:5000`

## 📡 Endpoints

### POST `/api/chatbot/message`
Envía un mensaje al chatbot.

**Request:**
```json
{
  "message": "¿Cómo minar RSC?",
  "session_id": "unique-session-id",
  "user_email": "usuario@email.com",
  "username": "nombre_usuario"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Respuesta del bot...",
  "session_id": "unique-session-id",
  "needs_contact_info": false
}
```

### GET `/api/chatbot/health`
Verifica el estado del servicio.

### GET `/api/chatbot/knowledge`
Obtiene estadísticas de la base de conocimiento.

## 🔧 Configuración de Email

### Gmail:
1. Activa la verificación en 2 pasos
2. Genera un "App Password": https://myaccount.google.com/apppasswords
3. Usa el App Password como `EMAIL_PASSWORD`

### Otros proveedores:
Ajusta `SMTP_SERVER` y `SMTP_PORT` según tu proveedor.

## 📚 Base de Conocimiento

La base de conocimiento está en `rsc_knowledge.py` y contiene información sobre:
- Minería
- Wallets
- Staking
- P2P Trading
- Explorer
- Aspectos técnicos
- Troubleshooting

## 🔄 Integración con Frontend

El frontend debe hacer peticiones a `/api/chatbot/message` para comunicarse con el bot.

Ver `scripts/chatbot.js` para la integración completa.

## 📝 Notas

- En producción, considera usar Redis para sesiones en lugar de memoria
- El sistema detecta automáticamente cuando necesita escalar a soporte humano
- Las conversaciones se almacenan temporalmente en memoria (en producción usar DB)

