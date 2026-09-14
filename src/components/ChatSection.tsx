import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Smile, 
  Paperclip, 
  Trash2, 
  CheckCheck, 
  User, 
  Sparkles, 
  Phone, 
  Video, 
  Info,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { ChatMessage, AppLanguage, UserProfile } from '../types';
import { MD_TAREQ_PROFILE } from '../data/initialData';

interface ChatSectionProps {
  messages: ChatMessage[];
  onSendMessage: (text: string, attachmentName?: string) => void;
  onClearChat: () => void;
  language: AppLanguage;
  user: UserProfile;
  onOpenBanking: () => void;
}

export const ChatSection: React.FC<ChatSectionProps> = ({
  messages,
  onSendMessage,
  onClearChat,
  language,
  user,
  onOpenBanking,
}) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() && !selectedAttachment) return;

    const text = inputText;
    const attach = selectedAttachment || undefined;
    setInputText('');
    setSelectedAttachment(null);
    onSendMessage(text, attach);

    // Simulate MD Tareq typing and replying after 1.2s
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1600);
  };

  const quickPromptsBn = [
    'আপনার সাথে প্রজেক্ট নিয়ে আলোচনা করতে চাই',
    '৪টি ব্যাংকিং পোর্টালের বিস্তারিত জানতে পারি?',
    'টু-ফ্যাক্টর অথেন্টিকেশন কিভাবে সেট করব?',
    'আপনার সাথে মিটিং শিডিউল করতে কি করব?',
  ];

  const quickPromptsEn = [
    'I want to discuss a software project',
    'Tell me about the 4 banking portals',
    'How do I setup Two-Factor Authentication?',
    'How can I schedule a meeting with you?',
  ];

  const quickPrompts = language === 'bn' ? quickPromptsBn : quickPromptsEn;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedAttachment(file.name);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[78vh] overflow-hidden">
      
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={MD_TAREQ_PROFILE.avatar}
              alt="MD Tareq"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500/40"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                MD Tareq
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Official Contact
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {isTyping ? (
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {language === 'bn' ? 'টাইপ করছেন...' : 'typing...'}
                </span>
              ) : (
                <span>{language === 'bn' ? 'অনলাইন আছেন (তাৎক্ষণিক উত্তর)' : 'Online (Instant Response)'}</span>
              )}
            </p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={onOpenBanking}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={language === 'bn' ? '৪টি ব্যাংকিং পোর্টাল' : '4 Banking Portals'}
          >
            <Building2 className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400" />
          </button>
          <a
            href={`mailto:${MD_TAREQ_PROFILE.email}`}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={language === 'bn' ? 'ইমেইল করুন' : 'Email'}
          >
            <Info className="w-4.5 h-4.5" />
          </a>
          <button
            onClick={onClearChat}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={language === 'bn' ? 'চ্যাট হিস্ট্রি মুছুন' : 'Clear Chat'}
          >
            <Trash2 className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/20">
        
        {/* Welcome Notice */}
        <div className="text-center py-2">
          <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
            {language === 'bn' 
              ? 'নিরাপদ এনক্রিপ্টেড চ্যাট সেশন • সরাসরি MD Tareq এর সাথে যুক্ত' 
              : 'End-to-End Encrypted Live Session • Direct Connection'}
          </div>
        </div>

        {messages.map((msg) => {
          const isTareq = msg.senderRole === 'tareq';
          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2.5 ${isTareq ? 'justify-start' : 'justify-end'}`}
            >
              {isTareq && (
                <img
                  src={MD_TAREQ_PROFILE.avatar}
                  alt="MD Tareq"
                  className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-blue-400/40"
                />
              )}

              <div
                className={`max-w-[82%] sm:max-w-md rounded-2xl p-3.5 text-sm shadow-xs ${
                  isTareq
                    ? 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-xs'
                    : 'bg-blue-600 text-white rounded-br-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-1 text-[11px] opacity-75 font-medium">
                  <span>{msg.senderName}</span>
                  <span>{msg.timestamp}</span>
                </div>

                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                {msg.attachmentName && (
                  <div className="mt-2.5 pt-2 border-t border-white/20 dark:border-slate-700 flex items-center gap-2 text-xs">
                    <Paperclip className="w-3.5 h-3.5" />
                    <span className="font-mono truncate">{msg.attachmentName}</span>
                  </div>
                )}

                {!isTareq && (
                  <div className="mt-1 flex justify-end">
                    <CheckCheck className="w-3.5 h-3.5 text-blue-200" />
                  </div>
                )}
              </div>

              {!isTareq && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-slate-300 dark:ring-slate-700"
                />
              )}
            </div>
          );
        })}

        {/* Typing Bubble */}
        {isTyping && (
          <div className="flex items-end gap-2.5 justify-start animate-in fade-in">
            <img
              src={MD_TAREQ_PROFILE.avatar}
              alt="MD Tareq"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-blue-400/40"
            />
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-xs p-3.5 shadow-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-blue-500" />
          {language === 'bn' ? 'কুইক প্রশ্ন:' : 'Quick Prompt:'}
        </span>
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => {
              setInputText(prompt);
            }}
            className="text-xs shrink-0 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Attachment Tag Preview */}
      {selectedAttachment && (
        <div className="px-4 py-2 bg-blue-50 dark:bg-blue-950/40 border-t border-blue-100 dark:border-blue-900/50 flex items-center justify-between text-xs text-blue-700 dark:text-blue-300">
          <span className="flex items-center gap-2 truncate">
            <Paperclip className="w-3.5 h-3.5" />
            <span className="truncate">{selectedAttachment}</span>
          </span>
          <button
            onClick={() => setSelectedAttachment(null)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Chat Input Bar */}
      <form
        onSubmit={handleSend}
        className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-2.5 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={language === 'bn' ? 'ফাইল বা স্ক্রিনশট যুক্ত করুন' : 'Attach File'}
        >
          <Paperclip className="w-4.5 h-4.5" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={language === 'bn' ? 'MD Tareq কে মেসেজ লিখুন...' : 'Write a message to MD Tareq...'}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={!inputText.trim() && !selectedAttachment}
          className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 text-white shadow-md shadow-blue-500/20 transition-all"
          title="Send"
        >
          <Send className="w-4.5 h-4.5" />
        </button>
      </form>
    </div>
  );
};
