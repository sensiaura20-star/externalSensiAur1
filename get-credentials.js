// Netlify Function: get-credentials.js
// Esta función devuelve las credenciales almacenadas

const { createClient } = require('@supabase/supabase-js');

// OPCIÓN 1: Usar Variables de Entorno de Netlify (Recomendado)
// Configura estas variables en: Netlify Dashboard > Site settings > Environment variables

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

  try {
    // OPCIÓN A: Usar Supabase como base de datos (recomendado para producción)
    if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY
      );

      const { data, error } = await supabase
        .from('credentials')
        .select('*')
        .single();

      if (error) throw error;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          credentials: data.credentials
        })
      };
    }

    // OPCIÓN B: Usar Netlify Blobs (más simple, recomendado para empezar)
    const { getStore } = require('@netlify/blobs');
    const store = getStore('credentials');
    
    const credentials = await store.get('current-credentials', {
      type: 'json'
    });

    if (!credentials) {
      // Credenciales por defecto si no existen
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          credentials: {
            'SENSIAURA.2026-HS-3DSS': {
              password: 'VIP1SS.SENSIAURA',
              user: 'VIP User',
              expires: '2026-12-31'
            }
          }
        })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        credentials: credentials
      })
    };

  } catch (error) {
    console.error('Error:', error);
    
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
