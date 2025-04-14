// netlify/functions/status.js

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

export async function handler(event) {          // keep this one
  console.log('Starting handler function…');

  // Pre‑flight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders };
  }

  try {
    const response = await fetch(
      `${process.env.UPSTASH_REDIS_REST_URL}/get/admin_present`,
      { headers: { Authorization:
          `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` } });
    if (!response.ok) throw new Error(`Upstash ${response.status}`);
    const json = await response.json();
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ admin_present: json.result === 'true' })
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: 'Internal Server Error' };
  }
}

export async function handler_prev(event, context) {
  console.log('Starting handler function...');
  
  try {
    const response = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/admin_present`, {
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    if (!response.ok) {
      console.error('Network response was not ok:', response.status);
      throw new Error('Network response error');
    }
    
    const json = await response.json();
    console.log('Parsed JSON:', json);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        admin_present: json.result === 'true'
      })
    };
  } catch (error) {
    console.error('Error in handler:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
}