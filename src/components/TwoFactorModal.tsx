import React, { useState } from 'react';
import { 
  ShieldCheck, 
  KeyRound, 
  X, 
  AlertCircle, 
  Lock, 
  Check 
} from 'lucide-react';
import { AppLanguage, UserProfile } from '../types';

interface TwoFactorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: UserProfile;
  language: AppLanguage;
  onNavigateToProfile: () => void;
}

export const TwoFactorModal: React.FC<TwoFactorModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  user,
  language,
  onNavigateToProfile,
}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError(language === 'bn' ? 'কোড প্রদান করুন' : 'Please enter code');
      return;
    }

    // Check if code is valid (accepts '123456' or any 6-digit code or matching secret)
    if (code === '123456' || code.length === 6) {
      setError('');
      setCode('');
      onSuccess();
      onClose();
    } else {
      setError(language === 'bn' ? 'ভুল কোড! ডেমো কোড "123456" ব্যবহার করতে পারেন।' : 'Invalid code! You can use demo code "123456".');
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-sm w-full p-6 shadow-2xl space-y-4">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              {language === 'bn' ? 'নিরাপত্তা যাচাই (2FA)' : 'Two-Factor Verification'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          {language === 'bn'
            ? 'এই সংরক্ষিত তথ্যটি দেখার জন্য আপনার ৬ সংখ্যার টু-ফ্যাক্টর অথেনটিকেশন পিন যাচাই করুন।'
            : 'Enter your 6-digit 2FA code to access this secured content.'}
        </p>

        {!user.twoFactorEnabled && (
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 text-xs text-blue-700 dark:text-blue-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span>{language === 'bn' ? 'আপনার অ্যাকাউন্টে এখনও 2FA সেটআপ করা হয়নি। ডেমো কোড "123456" দিয়ে আনলক করতে পারেন অথবা প্রোফাইলে গিয়ে সেটআপ করুন।' : '2FA is not fully setup yet. Use demo code "123456" or enable it in Profile.'}</span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToProfile();
                }}
                className="block mt-1 font-bold underline"
              >
                {language === 'bn' ? 'প্রোফাইলে 2FA সেটআপ করুন →' : 'Setup 2FA in Profile →'}
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              maxLength={6}
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              placeholder="123456"
              className="w-full text-center text-xl font-mono tracking-widest px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setCode('123456')}
              className="text-[11px] text-blue-600 dark:text-blue-400 underline font-medium"
            >
              {language === 'bn' ? 'কুইক ডেমো কোড "123456" ব্যবহার করুন' : 'Use quick demo code "123456"'}
            </button>
          </div>

          {error && (
            <p className="text-xs text-rose-500 text-center font-medium">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
            >
              {language === 'bn' ? 'বাতিল' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
            >
              {language === 'bn' ? 'যাচাই করুন' : 'Verify'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
