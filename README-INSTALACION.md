 🎯 SensiAura - Instalación en Netlify

## 📋 Estructura de archivos necesaria

Tu proyecto debe tener esta estructura:

```
tu-proyecto/
├── index.html              (tu archivo principal)
├── netlify.toml           (configuración de Netlify)
├── package.json           (dependencias)
└── netlify/
    └── functions/
        ├── get-credentials.js
        └── update-credentials.js
```

## 🚀 Pasos para deployar en Netlify

### 1. Preparar tu proyecto

1. Crea una carpeta llamada `netlify/functions/` en tu proyecto
2. Mueve los archivos `get-credentials.js` y `update-credentials.js` dentro de `netlify/functions/`
3. Coloca `netlify.toml` y `package.json` en la raíz de tu proyecto

### 2. Subir a GitHub/GitLab (Recomendado)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin TU_REPOSITORIO_URL
git push -u origin main
```

### 3. Conectar con Netlify

1. Ve a https://app.netlify.com/
2. Click en "Add new site" > "Import an existing project"
3. Conecta tu repositorio de GitHub/GitLab
4. Configuración del build:
   - **Build command:** (déjalo vacío)
   - **Publish directory:** `.` (punto)
5. Click en "Deploy site"

### 4. Configurar Variables de Entorno

En tu sitio de Netlify:
1. Ve a "Site settings" > "Environment variables"
2. Agrega esta variable:
   - **Key:** `ADMIN_MASTER_KEY`
   - **Value:** `ADMIN.SENSIAURA.2026` (o tu master key personalizada)

### 5. ¡Listo! Prueba tu sitio

Tu sitio estará disponible en: `https://tu-sitio.netlify.app`

## 🧪 Probar localmente (Opcional)

```bash
# Instalar dependencias
npm install

# Instalar Netlify CLI globalmente
npm install -g netlify-cli

# Iniciar servidor local
netlify dev
```

Tu sitio estará en: `http://localhost:8888`

## 🔑 Cómo funciona

1. **Usuario normal:** 
   - Entra al sitio
   - El frontend llama a `/.netlify/functions/get-credentials`
   - Obtiene las credenciales actuales
   - Puede loguearse con la key válida

2. **Admin:**
   - Entra al admin panel con la master key
   - Genera nuevas credenciales
   - El frontend llama a `/.netlify/functions/update-credentials`
   - Las nuevas credenciales se guardan en Netlify Blobs
   - Todos los usuarios verán las nuevas credenciales automáticamente

## ⚠️ Notas importantes

- **Netlify Blobs** es gratis hasta 1GB de almacenamiento
- Las credenciales se actualizan en tiempo real para todos los usuarios
- La master key debe mantenerse secreta
- Puedes cambiar la master key en las variables de entorno de Netlify

## 🐛 Solución de problemas

### Error: "Failed to fetch credentials"
- Verifica que las funciones estén en `netlify/functions/`
- Revisa los logs en Netlify Dashboard > Functions

### Error: "Invalid admin key"
- Verifica la variable de entorno `ADMIN_MASTER_KEY` en Netlify

### Las credenciales no se actualizan
- Espera 30 segundos (tiempo de auto-refresh)
- O recarga la página

## 📞 Soporte

Si tienes problemas, revisa:
- Netlify Functions logs: Dashboard > Functions > Ver logs
- Browser console: F12 > Console
