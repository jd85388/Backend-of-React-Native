# Life Reminder Backend API

Backend API para la aplicación Life Reminder desarrollada con Node.js, Express y TypeScript.

## 🚀 Deployment en Render

### Configuración automática:

1. **Build Command**: `npm run build`
2. **Start Command**: `npm start`
3. **Node Version**: 18+ (automático)

### Variables de entorno requeridas:

```env
MONGO=mongodb+srv://tu-usuario:tu-password@cluster.mongodb.net/
JWT_SECRET=tu-jwt-secret-super-seguro
REFRESH_TOKEN_SECRET=tu-refresh-secret-diferente
JWT_EXPIRES_IN=1d
PORT=10000
EMAIL=tu-email@gmail.com
PASS=tu-password-de-aplicacion
RESEND=tu-api-key-de-resend
```

### Scripts disponibles:

- `npm start` - Inicia el servidor en producción
- `npm run build` - Compila TypeScript a JavaScript
- `npm run dev` - Desarrollo con hot reload
- `npm test` - Ejecuta tests

### Estructura del proyecto:

```
backend/
├── src/
│   ├── Controllers/     # Controladores de API
│   ├── models/         # Modelos de Mongoose
│   ├── routes/         # Definición de rutas
│   ├── services/       # Lógica de negocio
│   ├── middleware/     # Middleware personalizado
│   ├── config/         # Configuración BD y vars
│   └── index.ts        # Punto de entrada
├── dist/              # Código compilado (generado)
├── package.json
└── tsconfig.json
```

## 🔗 Endpoints disponibles

- `GET /` - Health check
- `POST /Views/paciente/registro` - Registro de usuario
- `POST /Views/paciente/ingreso` - Login
- `GET /Views/paciente/medicamentos` - Listar medicamentos
- `POST /Views/paciente/medicamento` - Crear medicamento
- `GET /Views/paciente/consultas` - Listar consultas
- `POST /Views/paciente/consulta` - Crear consulta

## 📱 Conexión con Frontend

El frontend React Native se conecta a esta API usando las siguientes configuraciones:

```typescript
const BASE_URL = 'https://tu-render-app.onrender.com';
```

## 🛠️ Desarrollo local

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Iniciar en producción
npm start
```

## 🔧 Troubleshooting

### Error "Cannot find module"
- Verificar que `npm run build` se ejecute correctamente
- Confirmar que el directorio `dist/` contiene los archivos compilados

### Error de conexión a MongoDB
- Verificar que la variable `MONGO` esté configurada correctamente
- Confirmar que la IP de Render esté en la whitelist de MongoDB

### Error 500 en producción
- Revisar logs en Render dashboard
- Verificar que todas las variables de entorno estén configuradas