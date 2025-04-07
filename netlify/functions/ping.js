// netlify/functions/ping.js

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': event.headers.origin || '*',
      },
      body: 'Method Not Allowed'
    };
  }

  const redisResponse = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/set/iphone_present/true`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`
    }
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': event.headers.origin || '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS'
    },
    body: JSON.stringify({ message: 'Presence set' })
  };
}
