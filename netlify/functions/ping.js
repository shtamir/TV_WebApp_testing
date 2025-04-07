// netlify/functions/ping.js

export async function handler(event, context) {
  const allowedOrigins = [
    'https://yakinton-46.netlify.app',
    'https://test-db-1--yakinton-46.netlify.app',
    'https://deploy-preview-7--yakinton-46.netlify.app'
  ];

  const origin = event.headers.origin;
  const isAllowed = allowedOrigins.includes(origin);

  const corsHeaders = {
    'Access-Control-Allow-Origin': isAllowed ? origin : 'https://yakinton-46.netlify.app',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: 'Method Not Allowed',
    };
  }

  await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/set/iphone_present/true`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
    },
  });

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({ message: 'Presence set' }),
  };
}
