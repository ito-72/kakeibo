import { GAS_URL } from './config.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { category, date, item, price, credit, chihiro_flag } = req.body;

  const categoryMap = {
    other: "その他",
    food: "食費",
    daily: "日用品",
    relax: "ほっこり",
    gas: "ガソリン",
    card: "カード引き落とし",
    zarame: "ざらめ",
    atsushi: "篤志外食",
    chihiro: "千尋立て替え"
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
        price,
        credit: credit || "",
        chihiro_flag: chihiro_flag || ""  // ★追加
      })
    });

    const resultText = await response.text();
    res.status(200).json({ message: resultText || 'GASに送信完了' });

  } catch (error) {
    console.error('GAS送信エラー:', error);
    res.status(500).json({ message: 'GASへの送信に失敗しました' });
  }
}
