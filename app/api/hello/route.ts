export async function POST(req: Request) {
  const { question } = await req.json();
  const apiKey = process.env.OPENROUTER_API_KEY;


  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
    'Authorization': `Bearer ${apiKey}`,
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
