// /api/saveData.js
import { GAS_URL } from "./config.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("GAS送信エラー:", error);
    return res.status(500).json({ message: "サーバーエラーが発生しました。" });
  }
}
