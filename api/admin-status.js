// api/admin-status.js

export default async function handler(req, res) {
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  
    const response = await fetch(`${redisUrl}/get/admin_present`, {
      headers: {
        Authorization: `Bearer ${redisToken}`,
      },
    });
  
    const json = await response.json();
  
    return res.status(200).json({
      admin_present: json.result === 'true',
    });
  }
  