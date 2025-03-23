// api/admin-reset.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  console.log("Here 4... handler");
  if (req.method === 'POST') {

    const filePath = path.resolve('./public/admin_presence.json');
    fs.writeFileSync(filePath, JSON.stringify({ admin_present: false }));
    return res.status(200).json({ status: "reset" });
  }
  console.log("Here 5... handler");
  return res.status(405).json({ error: "Method Not Allowed" });
}
