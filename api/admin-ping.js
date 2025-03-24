/*import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  console.log("Here 3... handler");
  if (req.method === 'POST') {
    const filePath = path.resolve('./public/admin_presence.json');
    fs.writeFileSync(filePath, JSON.stringify({ admin_presence: true }));
    return res.status(200).json({ status: "updated" });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
*/

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  const response = await fetch(`${redisUrl}/set/admin_present/true`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${redisToken}`,
    },
  });

  if (!response.ok) {
    return res.status(500).json({ error: 'Failed to update presence' });
  }

  return res.status(200).json({ status: 'Admin presence marked' });
}