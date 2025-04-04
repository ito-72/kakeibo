// /api/saveData.js

import { GAS_URL } from './config.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { category, date, item, price } = req.body;

  // ✅ 英語 → 日本語カテゴリ変換マップ
  const categoryMap = {
    other: "その他",
    food: "食費",
    daily: "日用品",
    relax: "ほっこり",
    gas: "ガソリン",
    utility: "光熱費"
  };

  const categoryJP = categoryMap[category] || category;

  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: "recordKakeibo",
        category: categoryJP,
        date,
        item,
        price
      })
    });

    const resultText = await response.text();
    res.status(200).json({ message: resultText || 'GASに送信完了' });

  } catch (error) {
    console.error('GAS送信エラー:', error);
    res.status(500).json({ message: 'GASへの送信に失敗しました' });
  }
}
