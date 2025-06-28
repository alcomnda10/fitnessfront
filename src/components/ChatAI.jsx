import { useState } from 'react';
import { Mic, Sun, Trash2, Send } from 'lucide-react';
import axios from 'axios';

export default function ChatAI() {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: 'Hello, sir\nHow can I help you with your fitness?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const quickActions = [
    {
      title: 'Design a daily exercise plan',
      subtitle: 'Exercises to burn fat.',
      icon: '🏃‍♂️'
    },
    {
      title: 'Do I need to take supplements while dieting 2025?',
      subtitle: '',
      icon: '💊'
    },
    {
      title: 'How can I improve my flexibility?',
      subtitle: '',
      icon: '🧘‍♂️'
    },
    {
      title: 'Suggestion for you the best daily health regimen?',
      subtitle: '',
      icon: '🌟'
    }
  ];

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setInputMessage('');
    setLoading(true);

    try {
      const res = await axios.post('https://shark-app-on96m.ondigitalocean.app/api/proxy/ask', {
        question: userMessage
      });

      const aiReply =
        res.data.answer ?? JSON.stringify(res.data, null, 2) ?? '⚠️ No valid response.';

      setMessages(prev => [...prev, { type: 'ai', content: aiReply }]);
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      setMessages(prev => [...prev, { type: 'ai', content: "⚠️ Failed to get response." }]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Chat Messages */}
        <div className="space-y-6 mb-8">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`${message.type === 'user' ? 'bg-teal-600' : 'bg-gray-800'} rounded-lg p-4 max-w-[80%]`}>
                <p className="whitespace-pre-line">{message.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-800 rounded-lg p-4 max-w-[80%] text-gray-400">
                Typing...
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {messages.length === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 text-left border border-gray-700 hover:border-teal-500"
                onClick={() => {
                  setInputMessage(action.title);
                }}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{action.icon}</span>
                  <div>
                    <p className="font-medium">{action.title}</p>
                    {action.subtitle && (
                      <p className="text-sm text-gray-400">{action.subtitle}</p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="relative">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask AI ?"
            className="w-full bg-gray-800 rounded-lg pl-4 pr-32 py-4 focus:outline-none focus:ring-2 focus:ring-teal-500 border border-gray-700"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2">
            <button type="submit" className="p-2 hover:bg-gray-700 rounded-full" title="Send">
              <Send size={20} />
            </button>
            <button type="button" onClick={() => setMessages([messages[0]])} className="p-2 hover:bg-gray-700 rounded-full" title="Clear chat">
              <Trash2 size={20} />
            </button>
            <button type="button" className="p-2 hover:bg-gray-700 rounded-full" title="Theme">
              <Sun size={20} />
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          AI can make mistakes, so double-check it.
        </p>
      </div>
    </div>
  );
}
