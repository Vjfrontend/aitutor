export async function POST(req: Request) {
  const { question } = await req.json();

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer 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`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:3000', // important for OpenRouter free use
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo',
      messages: [{ role: 'user', content: question }],
    }),
  });

  const data = await res.json();
  return Response.json({ answer: data.choices?.[0]?.message?.content || 'No response' });
}
