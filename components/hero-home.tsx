'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react'; // Optional: for spinner icon
import Image from 'next/image';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question) return;
    setLoading(true);
    setAnswer('');
    try {
      const res = await fetch('/api/hello', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer || data.error || 'No response.');
    } catch (err) {
      setAnswer('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">🎓 AI Tutor</h1>
        <p className="text-center text-gray-600 mb-4">
          Ask any academic question and get instant AI-generated explanations.
        </p>

        <textarea
          placeholder="e.g. What is the Pythagorean Theorem?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-4 resize-none"
          rows={4}
        />

        <button
          onClick={handleAsk}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
        >
          {loading && <Loader2 className="animate-spin w-5 h-5" />}
          {loading ? 'Thinking...' : 'Ask AI'}
        </button>

        {answer && (
          <div className="mt-6 border-t pt-4">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Answer:</h2>
            <p className="text-gray-700 whitespace-pre-line">{answer}</p>
          </div>
        )}
      </div>
    </main>
  );
}
