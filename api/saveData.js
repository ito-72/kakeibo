// /api/saveData.js
import { GAS_URL } from './config.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { category, date, item, price } = req.body;

  try {
    // GASに送るデータ（modeを追加）
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: "recordKakeibo", // ✅ ここを追加！
        category,
        date,
        item,
        price
      })
    });

    const resultText = await response.text(); // ← .json() を .text() に変更
res.status(200).json({ message: resultText || 'GASに送信完了' });


  } catch (error) {
    console.error('GAS送信エラー:', error);
    res.status(500).json({ message: 'GASへの送信に失敗しました' });
  }
}
