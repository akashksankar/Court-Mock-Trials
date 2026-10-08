import React, { useState } from 'react';
import { CaseWitness } from '../types/case';
import { Send, User } from 'lucide-react';

interface WitnessSimProps {
  witness: CaseWitness;
}

export const WitnessSimEngine: React.FC<WitnessSimProps> = ({ witness }) => {
  const [question, setQuestion] = useState('');
  const [chatLog, setChatLog] = useState<{ sender: 'Counsel' | 'Witness'; text: string }[]>([
    {
      sender: 'Witness',
      text: `I am ${witness.name}, ${witness.role}. I affirm to tell the truth under BSA Evidence Oath. Counsel, you may proceed with cross-examination.`,
    },
  ]);

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const counselText = question.trim();
    setQuestion('');

    const newLog = [...chatLog, { sender: 'Counsel' as const, text: counselText }];

    // Match keywords against witness scenario data
    const lower = counselText.toLowerCase();
    let responseText = witness.statement;

    const match = witness.predefinedAnswers.find((ans) =>
      ans.keywords.some((kw) => lower.includes(kw.toLowerCase()))
    );

    if (match) {
      responseText = match.answer;
    } else if (lower.includes('where') || lower.includes('location')) {
      responseText = 'As stated in my police statement, I was present at the designated location during the relevant hours.';
    } else if (lower.includes('who') || lower.includes('saw')) {
      responseText = 'I observed the individuals involved clearly as the ambient street lighting was functional.';
    } else if (lower.includes('time') || lower.includes('when')) {
      responseText = 'The incident transpired between 1:15 AM and 1:30 AM according to my log records.';
    } else {
      responseText = `Addressing your inquiry, Counsel: ${witness.statement.substring(0, 110)}...`;
    }

    setChatLog([...newLog, { sender: 'Witness' as const, text: responseText }]);
  };

  return (
    <div className="bg-[#EDF2F4]/70 border border-[#8D99AE]/25 rounded-2xl p-3.5 space-y-3">
      <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#8D99AE]/20">
        <div className="w-8 h-8 rounded-xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-900 shadow-xs">
          <User className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-[#2B2D42]">Interactive Witness Examination Box</h4>
          <p className="text-[10px] text-[#8D99AE] font-medium">Examining: {witness.name} ({witness.role})</p>
        </div>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
        {chatLog.map((msg, i) => (
          <div
            key={i}
            className={`p-2.5 rounded-xl shadow-xs ${
              msg.sender === 'Counsel'
                ? 'bg-white border border-[#D90429]/30 text-[#2B2D42] ml-4'
                : 'bg-purple-50 border border-purple-200 text-purple-950 mr-4'
            }`}
          >
            <span className="text-[10px] font-bold block mb-0.5 uppercase tracking-wider opacity-80">
              {msg.sender === 'Counsel' ? '⚖️ Counsel Question' : `👤 Witness: ${witness.name}`}
            </span>
            <p className="leading-relaxed font-medium">{msg.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleAsk} className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask witness a question (e.g., 'Where were you?')..."
          className="flex-1 bg-white border border-[#8D99AE]/30 rounded-xl p-2.5 text-xs text-[#2B2D42] placeholder-[#8D99AE] focus:outline-none focus:border-[#EF233C] shadow-xs"
        />
        <button
          type="submit"
          className="px-3.5 py-2.5 bg-gradient-to-r from-[#D90429] to-[#EF233C] text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs transition-all cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
