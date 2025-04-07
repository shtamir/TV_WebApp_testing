// netlify/functions/ping.js

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const response = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/set/iphone_present/true`, {
    method: 'POST',
    headers: {
      
      'Access-Control-Allow-Origin': event.headers.origin || '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Presence set' })
  };
}
