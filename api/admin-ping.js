import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  console.log("Here 3... handler");
  if (req.method === 'POST') {
    const filePath = path.resolve('./admin_presence.json');
    fs.writeFileSync(filePath, JSON.stringify({ admin_presence: true }));
    return res.status(200).json({ status: "updated" });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
