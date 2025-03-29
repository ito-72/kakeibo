// /api/saveData.js
// /api/saveData.js
import { GAS_URL } from './config.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { category, date, item, price } = req.body; // ✅ date を追加！

  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, date, item, price }) // ✅ date を含めて送信
    });

    const result = await response.json();
    res.status(200).json({ message: result.message || 'GASに送信完了' });
  } catch (error) {
    console.error('GAS送信エラー:', error);
    res.status(500).json({ message: 'GASへの送信に失敗しました' });
  }
}
