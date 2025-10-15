import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { chatApi } from '../../lib/api';
import { Send, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function StaffChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const mutation = useMutation({
    mutationFn: chatApi.getRecipe,
    onSuccess: (response: any) => {
      console.log('Chat API Response:', response);
      let responseText = '';
      
      if (response.ingredient && response.step) {
        responseText = `**Ingredients:**\n${response.ingredient.join('\n')}\n\n**Steps:**\n${response.step.map((step: string, i: number) => `${i + 1}. ${step}`).join('\n')}`;
      } else {
        responseText = response.message || JSON.stringify(response) || 'No response received';
      }
      
      const botMessage: Message = {
        id: Date.now().toString() + '_bot',
        text: responseText,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    },
    onError: (error: any) => {
      const errorMessage: Message = {
        id: Date.now().toString() + '_error',
        text: `Error: ${error.message}`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    console.log(e);
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString() + '_user',
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    const requestData = { prompt: input };
    console.log('Sending to chat API:', requestData);
    
    setMessages(prev => [...prev, userMessage]);
    mutation.mutate(requestData);
    setInput('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Recipe Chat Assistant</h1>

      <div className="bg-white rounded-lg shadow-md h-96 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Start a conversation about Thai recipes!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isUser
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}
          {mutation.isPending && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                <p className="text-sm">Thinking...</p>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Thai recipes..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={mutation.isPending}
            />
            <button
              type="submit"
              disabled={mutation.isPending || !input.trim()}
              className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}