"use client"

import type React from "react"

import { useState } from "react"
import { Loader2, Brain, Sparkles, BookOpen, ArrowRight } from "lucide-react"

export default function Home() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAsk = async () => {
    if (!question.trim()) return

    setLoading(true)
    setAnswer("")

    try {
      const res = await fetch("/api/hello", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      })

      const data = await res.json()
      setAnswer(data.answer || data.error || "No response received.")
    } catch (err) {
      setAnswer("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleAsk()
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-6 shadow-lg">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Academic Tutor
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Get instant, comprehensive explanations for any academic question. From complex theories to simple concepts,
            I'm here to help you learn.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl border border-gray-200/50 overflow-hidden">
          {/* Input Section */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Ask Your Question</h2>
            </div>

            <div className="relative">
              <textarea
                placeholder="What would you like to learn about today? Try asking about mathematics, science, history, literature, or any academic topic..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyPress}
                className="w-full p-6 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 resize-none text-lg placeholder-gray-400 bg-gray-50/50"
                rows={4}
                disabled={loading}
              />
              <div className="absolute bottom-4 right-4 text-sm text-gray-400">Press Cmd/Ctrl + Enter to submit</div>
            </div>

            <button
              onClick={handleAsk}
              disabled={loading || !question.trim()}
              className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-6 h-6" />
                  <span>AI is thinking...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
                  <span>Get AI Explanation</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>
          </div>

          {/* Answer Section */}
          {(answer || loading) && (
            <div className="p-8 bg-gradient-to-br from-gray-50/50 to-indigo-50/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">AI Explanation</h3>
              </div>

              {loading ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-indigo-600">
                    <Loader2 className="animate-spin w-5 h-5" />
                    <span className="text-lg">Analyzing your question...</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded-full animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded-full animate-pulse w-1/2"></div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="prose prose-lg max-w-none">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">{answer}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Instant Answers</h3>
            <p className="text-gray-600 text-sm">Get comprehensive explanations in seconds</p>
          </div>

          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">All Subjects</h3>
            <p className="text-gray-600 text-sm">Mathematics, science, history, and more</p>
          </div>

          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Smart Learning</h3>
            <p className="text-gray-600 text-sm">Explanations tailored to your level</p>
          </div>
        </div>
      </div>
    </main>
  )
}
