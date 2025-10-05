# Usar Node.js versión LTS
FROM node:18-alpine

# Crear directorio de la app
WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Compilar TypeScript
RUN npm run build

# Exponer puerto
EXPOSE 10000

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=10000

# Comando de inicio
CMD ["npm", "start"]