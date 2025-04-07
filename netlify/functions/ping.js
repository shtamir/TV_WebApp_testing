// netlify/functions/ping.js

export async function handler(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': event.headers.origin || '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    // Preflight response
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: 'Method Not Allowed',
    };
  }

  // Make the Redis call
  await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/set/iphone_present/true`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
    },
  });

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ message: 'Presence set' }),
  };
}
