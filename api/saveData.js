// /api/saveData.js

// Vercel Edge Function 形式（軽量・速い）
export const config = {
  runtime: 'edge',
};

import { GAS_URL } from './config.js';

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { date, category, item, price } = await req.json();

  if (!date || !category || !item || !price) {
    return new Response(JSON.stringify({ message: 'すべての項目を入力してください。' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const gasRes = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, category, item, price })
    });

    const result = await gasRes.json();

    return new Response(JSON.stringify({ message: result.message }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("送信失敗", error);
    return new Response(JSON.stringify({ message: 'GASへの送信に失敗しました。' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
