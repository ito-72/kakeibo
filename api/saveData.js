// /api/saveData.js

import { GAS_URL } from './config.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { date, category, item, price } = req.body;

  if (!date || !category || !item || !price) {
    return res.status(400).json({ message: 'すべての項目を入力してください。' });
  }

  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, category, item, price })
    });

    const result = await response.json();
    return res.status(200).json({ message: result.message || '登録成功' });
  } catch (error) {
    console.error('GAS送信エラー:', error);
    return res.status(500).json({ message: 'GASへの送信に失敗しました。' });
  }
}
