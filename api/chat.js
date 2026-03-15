const { kv } = require('@vercel/kv');

const MILO_API   = 'https://api-miloai.vercel.app/api/aijahat';
const MILO_TOKEN = 'MILO-AI-BLACKS3X';
const MAX_CTX    = 20; // pasang pesan yang dibawa sebagai konteks

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const session = (req.query.session || 'default').slice(0, 60);

  // GET — ambil riwayat
  if (req.method === 'GET') {
    const history = (await kv.get(`chat:${session}`)) || [];
    return res.status(200).json({ ok: true, session, history });
  }

  // POST — kirim pesan
  if (req.method === 'POST') {
    const { message } = req.body || {};
    if (!message?.trim()) return res.status(400).json({ ok: false, error: 'Pesan kosong' });

    let history = (await kv.get(`chat:${session}`)) || [];

    // Susun prompt + konteks
    let prompt = message.trim();
    if (history.length > 0) {
      const ctx = history
        .slice(-(MAX_CTX * 2))
        .map(m => (m.role === 'user' ? `User: ${m.text}` : `AI: ${m.text}`))
        .join('\n');
      prompt = `Riwayat percakapan:\n${ctx}\n\nUser: ${message.trim()}\n\nLanjutkan dengan mengingat konteks di atas.`;
    }

    const miloRes  = await fetch(`${MILO_API}?text=${encodeURIComponent(prompt)}&token=${MILO_TOKEN}`);
    const miloData = await miloRes.json();
    if (!miloData.status || !miloData.result)
      return res.status(502).json({ ok: false, error: 'AI gagal merespons' });

    const reply = miloData.result;

    history.push({ role: 'user', text: message.trim(), ts: Date.now() });
    history.push({ role: 'ai',   text: reply,          ts: Date.now() });
    if (history.length > MAX_CTX * 4) history = history.slice(-(MAX_CTX * 4));

    await kv.set(`chat:${session}`, history, { ex: 60 * 60 * 24 * 30 }); // 30 hari

    return res.status(200).json({ ok: true, reply, history_count: history.length });
  }

  // DELETE — hapus riwayat
  if (req.method === 'DELETE') {
    await kv.del(`chat:${session}`);
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ ok: false, error: 'Method not allowed' });
};
