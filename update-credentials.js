// Netlify Function: update-credentials.js
// Esta función actualiza las credenciales cuando el admin las cambia

const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event, context) => {
  // Permitir CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Manejar preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Solo permitir POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { adminKey, key, password, user, expires } = body;

    // Verificar master key
    const ADMIN_MASTER_KEY = process.env.ADMIN_MASTER_KEY || 'ADMIN.SENSIAURA.2026';
    
    if (adminKey !== ADMIN_MASTER_KEY) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Invalid admin key'
        })
      };
    }

    // Validar datos
    if (!key || !password || !user) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Missing required fields'
        })
      };
    }

    // Crear el objeto de credenciales
    const newCredentials = {
      [key]: {
        password: password,
        user: user,
        expires: expires || '2026-12-31'
      }
    };

    // OPCIÓN A: Usar Supabase
    if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY
      );

      const { error } = await supabase
        .from('credentials')
        .upsert({
          id: 1,
          credentials: newCredentials,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          credentials: newCredentials,
          message: 'Credentials updated successfully'
        })
      };
    }

    // OPCIÓN B: Usar Netlify Blobs (más simple)
    const { getStore } = require('@netlify/blobs');
    const store = getStore('credentials');
    
    await store.setJSON('current-credentials', newCredentials);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        credentials: newCredentials,
        message: 'Credentials updated successfully'
      })
    };

  } catch (error) {
    console.error('Error updating credentials:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
