export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY!}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://aitutor1.vercel.app/', // required by OpenRouter
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo', // must be prefixed with openai/
        messages: [{ role: 'user', content: question }],
      }),
    });

    const data = await response.json();

    // ✅ Print the full raw response to terminal
    console.log('🧪 OpenRouter Raw Response:', JSON.stringify(data, null, 2));

    if (!data || !data.choices || data.choices.length === 0) {
      return Response.json({ answer: 'No AI response received from OpenRouter.' });
    }

    const answer = data.choices[0].message.content;
    return Response.json({ answer });
  } catch (err: any) {
    console.error('❌ Server Error:', err);
    return Response.json({ error: 'Internal Server Error: ' + err.message }, { status: 500 });
  }
}
