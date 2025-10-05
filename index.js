#!/usr/bin/env node

// Archivo de entrada principal para Render
// Este archivo se asegura de que la aplicación inicie correctamente

const path = require('path');
const fs = require('fs');

// Verificar si existe el archivo compilado
const compiledFile = path.join(__dirname, 'dist', 'index.js');
const sourceFile = path.join(__dirname, 'src', 'index.ts');

console.log('🚀 Iniciando Life Reminder Backend...');
console.log('📁 Directorio actual:', __dirname);
console.log('🔍 Buscando archivo compilado:', compiledFile);

if (fs.existsSync(compiledFile)) {
    console.log('✅ Archivo compilado encontrado, iniciando aplicación...');
    require(compiledFile);
} else {
    console.log('❌ Archivo compilado no encontrado.');
    console.log('📝 Contenido del directorio:');
    console.log(fs.readdirSync(__dirname));
    
    if (fs.existsSync(path.join(__dirname, 'dist'))) {
        console.log('📂 Contenido de /dist:');
        console.log(fs.readdirSync(path.join(__dirname, 'dist')));
    }
    
    console.error('💥 Error: No se puede iniciar la aplicación. Ejecuta "npm run build" primero.');
    process.exit(1);
}