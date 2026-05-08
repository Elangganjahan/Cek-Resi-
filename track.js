export default async function handler(req, res) {
  // Allow CORS dari browser
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { courier, awb } = req.query;

  if (!courier || !awb) {
    return res.status(400).json({ error: 'Parameter courier dan awb wajib diisi.' });
  }

  const API_KEY = process.env.BINDERBYTE_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: 'API key belum dikonfigurasi di Vercel.' });
  }

  try {
    const url = `https://api.binderbyte.com/v1/track?api_key=${API_KEY}&courier=${courier}&awb=${encodeURIComponent(awb)}`;
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Gagal menghubungi Binderbyte. Coba lagi.' });
  }
}
