import React from 'react';
import { 
  Settings, 
  X, 
  Globe, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Lock, 
  Download, 
  Upload, 
  RefreshCcw 
} from 'lucide-react';
import { AppSettings, AppLanguage } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (updated: Partial<AppSettings>) => void;
  onExportBackup: () => void;
  onResetData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onExportBackup,
  onResetData,
}) => {
  if (!isOpen) return null;

  const isBn = settings.language === 'bn';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                {isBn ? 'কাস্টম অ্যাপ সেটিংস' : 'Custom App Settings'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isBn ? 'ভাষা, থিম, নোটিফিকেশন ও নিরাপত্তা পছন্দসমূহ' : 'Preferences for language, theme, and security'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Language Selection */}
          <div className="space-y-2">
            <label className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-500" />
              <span>{isBn ? 'ভাষা নির্বাচন (Language)' : 'Language'}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onUpdateSettings({ language: 'bn' })}
                className={`p-2.5 rounded-xl border font-bold flex items-center justify-center gap-2 transition-colors ${
                  settings.language === 'bn'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                বাংলা (Bengali)
              </button>
              <button
                type="button"
                onClick={() => onUpdateSettings({ language: 'en' })}
                className={`p-2.5 rounded-xl border font-bold flex items-center justify-center gap-2 transition-colors ${
                  settings.language === 'en'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Theme Mode */}
          <div className="space-y-2">
            <label className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              {settings.darkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              <span>{isBn ? 'ডিসপ্লে থিম (Theme)' : 'Display Theme'}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onUpdateSettings({ darkMode: false })}
                className={`p-2.5 rounded-xl border font-medium flex items-center justify-center gap-2 transition-colors ${
                  !settings.darkMode
                    ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>{isBn ? 'লাইট মোড (Light)' : 'Light Mode'}</span>
              </button>
              <button
                type="button"
                onClick={() => onUpdateSettings({ darkMode: true })}
                className={`p-2.5 rounded-xl border font-medium flex items-center justify-center gap-2 transition-colors ${
                  settings.darkMode
                    ? 'border-blue-600 bg-blue-950/60 text-blue-300 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span>{isBn ? 'ডার্ক মোড (Dark)' : 'Dark Mode'}</span>
              </button>
            </div>
          </div>

          {/* Real-time Notifications & Sounds */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white">
              {isBn ? 'নোটিফিকেশন ও অ্যালার্ট' : 'Notifications & Sounds'}
            </h4>
            
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                  {isBn ? 'রিয়েল-টাইম নোটিফিকেশন' : 'Real-time Notifications'}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isBn ? 'মেসেজ এবং সিকিউরিটি অ্যালার্ট দেখাবে' : 'Show alerts for incoming messages and 2FA'}
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.notificationsEnabled}
                onChange={(e) => onUpdateSettings({ notificationsEnabled: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded-md focus:ring-blue-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                  {isBn ? 'শব্দ / নোটিফিকেশন সাউন্ড' : 'Sound Alerts'}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isBn ? 'নতুন মেসেজ এলে মৃদু অডিও সংকেত' : 'Gentle sound tone for messages'}
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => onUpdateSettings({ soundEnabled: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded-md focus:ring-blue-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Security & Diary Lock */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{isBn ? 'নিরাপত্তা ও প্রাইভেসি' : 'Security & Privacy'}</span>
            </h4>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                  {isBn ? 'অটো-লক প্রাইভেট ডায়রী' : 'Auto-lock Private Diary'}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isBn ? 'গোপনীয় নোট দেখতে প্রতিবার 2FA আবশ্যক' : 'Always require 2FA to reveal private notes'}
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.autoLockPrivateDiary}
                onChange={(e) => onUpdateSettings({ autoLockPrivateDiary: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded-md focus:ring-blue-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Data Backup & Reset */}
          <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white">
              {isBn ? 'ডাটা ব্যাকআপ ও রিস্টোর' : 'Data Backup & Storage'}
            </h4>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onExportBackup}
                className="flex-1 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isBn ? 'ব্যাকআপ ডাউনলোড (JSON)' : 'Download Backup'}</span>
              </button>
              <button
                type="button"
                onClick={onResetData}
                className="py-2 px-3 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                title={isBn ? 'ডিফল্ট ডাটাতে রিসেট করুন' : 'Reset to Default'}
              >
                <RefreshCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors"
          >
            {isBn ? 'সম্পন্ন' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
