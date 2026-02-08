#!/bin/bash

# Script para configurar la estructura de Netlify Functions
echo "🎯 Configurando SensiAura para Netlify..."

# Crear carpeta de funciones
echo "📁 Creando carpeta netlify/functions/..."
mkdir -p netlify/functions

# Mover archivos de funciones
echo "📝 Moviendo archivos de funciones..."
mv get-credentials.js netlify/functions/ 2>/dev/null
mv update-credentials.js netlify/functions/ 2>/dev/null

# Verificar estructura
echo ""
echo "✅ Estructura creada:"
echo "   netlify/"
echo "   └── functions/"
echo "       ├── get-credentials.js"
echo "       └── update-credentials.js"
echo ""

# Verificar archivos
if [ -f "netlify/functions/get-credentials.js" ] && [ -f "netlify/functions/update-credentials.js" ]; then
    echo "✓ Funciones configuradas correctamente"
else
    echo "❌ Error: Faltan archivos de funciones"
    exit 1
fi

if [ -f "netlify.toml" ]; then
    echo "✓ netlify.toml encontrado"
else
    echo "❌ Advertencia: netlify.toml no encontrado"
fi

if [ -f "package.json" ]; then
    echo "✓ package.json encontrado"
else
    echo "❌ Advertencia: package.json no encontrado"
fi

echo ""
echo "🚀 Siguiente paso:"
echo "   1. Sube estos archivos a GitHub/GitLab"
echo "   2. Conecta tu repositorio en Netlify"
echo "   3. Deploy automático!"
echo ""
echo "📖 Lee README-INSTALACION.md para instrucciones completas"
