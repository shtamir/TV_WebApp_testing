// netlify/functions/status.js

export async function handler(event) {          // keep this one
  console.log('Starting handler function…');
  try {
    const response = await fetch(
      `${process.env.UPSTASH_REDIS_REST_URL}/get/admin_present`,
      { headers: { Authorization:
          `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` } });
    if (!response.ok) throw new Error(`Upstash ${response.status}`);
    const json = await response.json();
    return {
      statusCode: 200,
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