// netlify/functions/ping.js

export async function handler(event) {
  const origin = event.headers.origin || '';
  const isPreview = origin.includes('--yakinton-46.netlify.app');

  const corsHeaders = {
    'Access-Control-Allow-Origin': isPreview ? origin : 'https://yakinton-46.netlify.app',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  const debug = {
    originReceived: origin,
    allowed: isPreview || origin === 'https://yakinton-46.netlify.app',
    resolvedOrigin: corsHeaders['Access-Control-Allow-Origin'],
    method: event.httpMethod,
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ debug }) };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method Not Allowed', debug }) };
  }

  // Your actual logic
  await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/set/iphone_present/true`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
    },
  });

  return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ message: 'Presence set', debug }) };
}
