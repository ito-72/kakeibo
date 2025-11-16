// /api/kakeiboComment.js
import { GAS_URL } from './config.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { message } = req.body || {};

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ message: 'message は必須です' });
  }

  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: 'kakeiboComment',
        message,
      }),
    });

    const resultText = await response.text();

    if (!response.ok) {
      console.error('GASエラー応答:', resultText);
      return res.status(500).json({
        message: 'GAS側でエラーが発生しました',
        detail: resultText,
      });
    }

    // ★ GAS は「AIのコメント本文」をテキストで返してくる想定
    res.status(200).json({
      reply: resultText || 'コメントが空でした',
    });
  } catch (error) {
    console.error('GAS送信エラー:', error);
    res.status(500).json({ message: 'GASへの送信に失敗しました' });
  }
}
