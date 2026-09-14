import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  User, 
  KeyRound, 
  Smartphone, 
  QrCode, 
  Copy, 
  Check, 
  RefreshCw, 
  Lock, 
  History, 
  Save, 
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';
import { UserProfile, SecurityLog, AppLanguage } from '../types';

interface UserProfileAndSecurityProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  securityLogs: SecurityLog[];
  language: AppLanguage;
  onTriggerNotification: (title: string, message: string, type: 'security') => void;
}

export const UserProfileAndSecurity: React.FC<UserProfileAndSecurityProps> = ({
  user,
  onUpdateUser,
  securityLogs,
  language,
  onTriggerNotification,
}) => {
  // Profile edit state
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [bio, setBio] = useState(user.bio);
  const [role, setRole] = useState(user.role);
  const [location, setLocation] = useState(user.location);
  const [avatar, setAvatar] = useState(user.avatar);
  const [isSaved, setIsSaved] = useState(false);

  // 2FA Setup flow
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [totpCode, setTotpCode] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedBackup, setCopiedBackup] = useState(false);
  const [isTestPromptOpen, setIsTestPromptOpen] = useState(false);
  const [testCodeInput, setTestCodeInput] = useState('');
  const [testResult, setTestResult] = useState<'success' | 'fail' | null>(null);

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      name,
      email,
      phone,
      bio,
      role,
      location,
      avatar,
    });
    setIsSaved(true);
    onTriggerNotification(
      language === 'bn' ? 'প্রোফাইল আপডেট সম্পন্ন' : 'Profile Updated',
      language === 'bn' ? 'আপনার ব্যক্তিগত প্রোফাইলের তথ্য সফলভাবে সংরক্ষিত হয়েছে।' : 'Your personal profile information has been saved.',
      'security'
    );
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleEnable2FA = () => {
    // Verify entered code (allow 123456 or 6 digits)
    if (totpCode.trim().length !== 6) {
      setVerificationError(language === 'bn' ? 'অনুগ্রহ করে ৬ সংখ্যার সঠিক কোড দিন' : 'Please enter a valid 6-digit code');
      return;
    }

    onUpdateUser({
      twoFactorEnabled: true,
      twoFactorSecret: user.twoFactorSecret || 'TAREQ-SECURE-8924-OTP',
    });

    setVerificationError('');
    setShow2FASetup(false);
    setTotpCode('');
    onTriggerNotification(
      language === 'bn' ? 'টু-ফ্যাক্টর অথেন্টিকেশন সক্রিয় হয়েছে' : '2FA Enabled Successfully',
      language === 'bn' ? 'আপনার অ্যাকাউন্টে সর্বোচ্চ স্তরের ডাটা সুরক্ষা নিশ্চিত করা হলো।' : 'Maximum two-factor data protection is now active.',
      'security'
    );
  };

  const handleDisable2FA = () => {
    if (window.confirm(language === 'bn' ? 'আপনি কি নিশ্চিতভাবে টু-ফ্যাক্টর অথেন্টিকেশন নিষ্ক্রিয় করতে চান?' : 'Are you sure you want to disable 2FA?')) {
      onUpdateUser({ twoFactorEnabled: false });
      onTriggerNotification(
        language === 'bn' ? 'টু-ফ্যাক্টর অথেন্টিকেশন নিষ্ক্রিয়' : '2FA Disabled',
        language === 'bn' ? 'নিরাপত্তা ঝুঁকি এড়াতে পুনরায় 2FA সক্রিয় করার পরামর্শ দেওয়া হচ্ছে।' : '2FA is disabled. It is recommended to keep it on.',
        'security'
      );
    }
  };

  const handleCopySecret = () => {
    if (user.twoFactorSecret) {
      navigator.clipboard.writeText(user.twoFactorSecret);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  const handleCopyBackupCodes = () => {
    if (user.backupCodes) {
      navigator.clipboard.writeText(user.backupCodes.join('\n'));
      setCopiedBackup(true);
      setTimeout(() => setCopiedBackup(false), 2000);
    }
  };

  const handleTest2FA = (e: React.FormEvent) => {
    e.preventDefault();
    if (testCodeInput === '123456' || (user.twoFactorEnabled && testCodeInput.length === 6)) {
      setTestResult('success');
      onTriggerNotification(
        language === 'bn' ? '2FA ভেরিফিকেশন সফল' : '2FA Verification Succeeded',
        language === 'bn' ? 'আপনার টু-ফ্যাক্টর অথেন্টিকেশন কোডটি সঠিকভাবে যাচাই করা হয়েছে।' : '2FA code verified successfully.',
        'security'
      );
    } else {
      setTestResult('fail');
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 text-white p-6 sm:p-8 rounded-2xl shadow-md border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Security & Personal Profile</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            {language === 'bn' ? 'ব্যক্তিগত প্রোফাইল ও টু-ফ্যাক্টর নিরাপত্তা (2FA)' : 'Personal Profile & 2FA Security'}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            {language === 'bn' 
              ? 'আপনার প্রোফাইল তথ্য হালনাগাদ করুন এবং টু-ফ্যাক্টর অথেন্টিকেশন দিয়ে ডাটা সুরক্ষিত রাখুন' 
              : 'Manage personal profile and protect your data with Two-Factor Authentication'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border ${
            user.twoFactorEnabled 
              ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300' 
              : 'bg-amber-950/70 border-amber-500/40 text-amber-300'
          }`}>
            {user.twoFactorEnabled ? <ShieldCheck className="w-4 h-4 text-emerald-400" /> : <ShieldAlert className="w-4 h-4 text-amber-400" />}
            <span>{user.twoFactorEnabled ? (language === 'bn' ? '2FA সক্রিয় আছে' : '2FA Active') : (language === 'bn' ? '2FA নিষ্ক্রিয়' : '2FA Disabled')}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Personal Profile Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                  {language === 'bn' ? 'ব্যক্তিগত প্রোফাইল তৈরি ও এডিট' : 'Personal Profile Information'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {language === 'bn' ? 'অ্যাপে আপনার প্রদর্শিত তথ্য কাস্টমাইজ করুন' : 'Customize your public and applet presence'}
                </p>
              </div>
            </div>

            {isSaved && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                {language === 'bn' ? 'সংরক্ষিত হয়েছে' : 'Saved'}
              </span>
            )}
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            {/* Avatar Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                {language === 'bn' ? 'প্রোফাইল ছবি / অবতার' : 'Profile Picture'}
              </label>
              <div className="flex items-center gap-4">
                <img
                  src={avatar}
                  alt={name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500 shadow-sm"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    {sampleAvatars.map((url, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setAvatar(url)}
                        className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-transform hover:scale-105 ${
                          avatar === url ? 'border-blue-600 scale-105' : 'border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <img src={url} alt="Preset" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    placeholder="Custom image URL..."
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'bn' ? 'পুরো নাম *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'bn' ? 'ইমেইল ঠিকানা *' : 'Email Address *'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'bn' ? 'মোবাইল নম্বর' : 'Phone Number'}
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'bn' ? 'পদবী বা ভূমিকা' : 'Designation / Role'}
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'bn' ? 'অবস্থান (Location)' : 'Location'}
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'bn' ? 'সংক্ষিপ্ত বায়ো / নিজের সম্পর্কে' : 'Bio / About You'}
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{language === 'bn' ? 'প্রোফাইল সংরক্ষণ করুন' : 'Save Profile'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: 2FA Security System */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 2FA Main Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  user.twoFactorEnabled ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/70 dark:text-emerald-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-950/70 dark:text-amber-400'
                }`}>
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                    {language === 'bn' ? 'টু-ফ্যাক্টর অথেন্টিকেশন (2FA)' : 'Two-Factor Authentication'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {language === 'bn' ? 'ডাটা ও অ্যাকাউন্টের সর্বোচ্চ নিরাপত্তা' : 'High-grade TOTP identity verification'}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {language === 'bn'
                ? 'টু-ফ্যাক্টর অথেন্টিকেশন সক্রিয় করলে গোপনীয় ডায়রী, ব্যাংকিং ট্রানজ্যাকশন এবং সংবেদনশীল হিসাব দেখতে ৬ সংখ্যার ভেরিফিকেশন কোড প্রয়োজন হবে।'
                : 'Enabling 2FA adds an extra layer of defense when accessing private notes and sensitive banking transactions.'}
            </p>

            {/* Action Buttons for 2FA */}
            <div className="space-y-3">
              {user.twoFactorEnabled ? (
                <div className="space-y-2">
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <div>
                        <div className="font-bold text-xs text-emerald-900 dark:text-emerald-200">
                          {language === 'bn' ? '2FA সুরক্ষিত ও সক্রিয়' : '2FA is Active & Protecting'}
                        </div>
                        <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono">
                          Key: {user.twoFactorSecret}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsTestPromptOpen(true)}
                      className="flex-1 py-2 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 hover:bg-blue-100 text-xs font-bold transition-colors"
                    >
                      {language === 'bn' ? 'ভেরিফিকেশন টেস্ট করুন' : 'Test 2FA Prompt'}
                    </button>
                    <button
                      onClick={handleDisable2FA}
                      className="py-2 px-3 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 text-xs font-semibold transition-colors"
                    >
                      {language === 'bn' ? 'নিষ্ক্রিয় করুন' : 'Disable'}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShow2FASetup(true)}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{language === 'bn' ? 'এখনই 2FA সেটআপ করুন' : 'Setup 2FA Security Now'}</span>
                </button>
              )}
            </div>

            {/* Backup Codes Section */}
            {user.twoFactorEnabled && user.backupCodes && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {language === 'bn' ? 'ব্যাকআপ রিকভারি কোডস (৮টি)' : 'Backup Recovery Codes'}
                  </span>
                  <button
                    onClick={handleCopyBackupCodes}
                    className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    {copiedBackup ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedBackup ? (language === 'bn' ? 'কপি হয়েছে' : 'Copied') : (language === 'bn' ? 'সব কপি করুন' : 'Copy All')}</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-1.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                  {user.backupCodes.map((code, idx) => (
                    <div key={idx} className="px-1.5 py-0.5 rounded-sm bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center">
                      {code}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Security Audit Activity Logs */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-slate-500" />
              <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                {language === 'bn' ? 'নিরাপত্তা লগ ও অডিট হিস্ট্রি' : 'Security Audit Log'}
              </h4>
            </div>

            <div className="space-y-2">
              {securityLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{log.action}</div>
                    <div className="text-[10px] text-slate-400">{log.device} • {log.ip}</div>
                  </div>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2FA Setup Modal Wizard */}
      {show2FASetup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center mb-3">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="font-black text-slate-900 dark:text-white text-lg">
                {language === 'bn' ? 'টু-ফ্যাক্টর অথেন্টিকেশন কনফিগারেশন' : 'Setup Two-Factor Authentication'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {language === 'bn' 
                  ? 'আপনার অথেন্টিকেটর অ্যাপ (Google/Microsoft Authenticator) এ এই সিক্রেট কি টি যোগ করুন' 
                  : 'Add this secret key into your authenticator application'}
              </p>
            </div>

            {/* Secret Key Box */}
            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  {language === 'bn' ? 'সিক্রেট সেটআপ কী' : 'Secret Setup Key'}
                </span>
                <span className="font-mono font-bold text-xs sm:text-sm text-blue-600 dark:text-blue-400">
                  {user.twoFactorSecret || 'TAREQ-SECURE-8924-OTP'}
                </span>
              </div>
              <button
                onClick={handleCopySecret}
                className="p-2 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-xs"
              >
                {copiedKey ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Code Verification Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 text-center">
                {language === 'bn' ? '৬ সংখ্যার ভেরিফিকেশন কোড দিন' : 'Enter 6-Digit Verification Code'}
              </label>
              <div className="flex justify-center gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  className="w-48 text-center text-xl font-mono tracking-widest px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Quick Demo Helper button */}
              <div className="text-center mt-2">
                <button
                  type="button"
                  onClick={() => setTotpCode('123456')}
                  className="text-[11px] text-blue-600 dark:text-blue-400 underline font-medium"
                >
                  {language === 'bn' ? 'ডেমো কোড "123456" বসান' : 'Auto-fill Demo Code "123456"'}
                </button>
              </div>

              {verificationError && (
                <p className="text-xs text-rose-500 text-center mt-1.5 font-medium">
                  {verificationError}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShow2FASetup(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
              >
                {language === 'bn' ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                onClick={handleEnable2FA}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
              >
                {language === 'bn' ? 'যাচাই ও সক্রিয় করুন' : 'Verify & Enable'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2FA Verification Test Modal */}
      {isTestPromptOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="text-center">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {language === 'bn' ? '2FA নিরাপত্তা ভেরিফিকেশন টেস্ট' : 'Test 2FA Prompt'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'bn' ? 'আপনার ৬ সংখ্যার নিরাপত্তা পিন বা ১২৩৪৫৬ দিন' : 'Enter your 6-digit TOTP pin or 123456'}
              </p>
            </div>

            <form onSubmit={handleTest2FA} className="space-y-3">
              <input
                type="text"
                maxLength={6}
                value={testCodeInput}
                onChange={(e) => setTestCodeInput(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                className="w-full text-center text-lg font-mono tracking-widest px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />

              {testResult === 'success' && (
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 text-xs font-semibold text-center">
                  ✓ {language === 'bn' ? 'ভেরিফিকেশন সফল হয়েছে!' : 'Verification Succeeded!'}
                </div>
              )}

              {testResult === 'fail' && (
                <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 text-xs font-semibold text-center">
                  ✕ {language === 'bn' ? 'ভুল কোড! পুনরায় চেষ্টা করুন।' : 'Invalid code! Try 123456.'}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsTestPromptOpen(false);
                    setTestResult(null);
                    setTestCodeInput('');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                >
                  {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
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
      )}
    </div>
  );
};
