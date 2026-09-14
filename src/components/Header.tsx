import React from 'react';
import { 
  Building2, 
  MessageSquare, 
  BookOpen, 
  Calculator, 
  UserCheck, 
  Bell, 
  Settings, 
  Globe, 
  Sun, 
  Moon, 
  Menu, 
  X,
  Briefcase,
  Flame,
  LogIn,
  LogOut
} from 'lucide-react';
import { AppLanguage, UserProfile } from '../types';
import { FirebaseUser } from '../firebase';

export type NavTab = 'portfolio' | 'chat' | 'diary' | 'finance' | 'profile';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  unreadChatCount: number;
  unreadNotifCount: number;
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
  onOpenBanking: () => void;
  user: UserProfile;
  firebaseConnected?: boolean;
  firebaseUser?: FirebaseUser | null;
  onSignInGoogle?: () => void;
  onSignOutGoogle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  darkMode,
  setDarkMode,
  unreadChatCount,
  unreadNotifCount,
  onOpenNotifications,
  onOpenSettings,
  onOpenBanking,
  user,
  firebaseConnected = true,
  firebaseUser = null,
  onSignInGoogle,
  onSignOutGoogle,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: { id: NavTab; labelBn: string; labelEn: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'portfolio',
      labelBn: 'পরিচিতি ও পোর্টফোলিও',
      labelEn: 'About & Portfolio',
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      id: 'chat',
      labelBn: 'লাইভ চ্যাট',
      labelEn: 'Live Chat',
      icon: <MessageSquare className="w-4 h-4" />,
      badge: unreadChatCount,
    },
    {
      id: 'diary',
      labelBn: 'ব্যক্তিগত ডায়রী',
      labelEn: 'Personal Diary',
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: 'finance',
      labelBn: 'হিসাব-নিকাশ',
      labelEn: 'Accounting',
      icon: <Calculator className="w-4 h-4" />,
    },
    {
      id: 'profile',
      labelBn: 'প্রোফাইল ও নিরাপত্তা (2FA)',
      labelEn: 'Profile & 2FA',
      icon: <UserCheck className="w-4 h-4" />,
      badge: user.twoFactorEnabled ? 0 : 1, // Alert badge if 2FA disabled!
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('portfolio')}
              className="flex items-center gap-3 text-left group focus:outline-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                MT
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                    MD Tareq
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                    Official
                  </span>
                  <span 
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30"
                    title={language === 'bn' ? 'ফায়ারবেস ক্লাউড ফায়ারস্টোর সরাসরি সংযুক্ত' : 'Direct Cloud Firestore & Auth Connected'}
                  >
                    <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="hidden sm:inline">{language === 'bn' ? 'ফায়ারবেস লাইভ' : 'Firebase Live'}</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{language === 'bn' ? 'সক্রিয় সংযোগ' : 'Active Live'}</span>
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  <span>{language === 'bn' ? item.labelBn : item.labelEn}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white text-blue-700' : 'bg-rose-500 text-white animate-pulse'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Bar Right */}
          <div className="flex items-center gap-2">
            
            {/* 4 Banking Portals Menu Trigger Button */}
            <button
              id="header-banking-portals-btn"
              onClick={onOpenBanking}
              className="relative px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/90 border border-blue-200 dark:border-slate-700 text-blue-700 dark:text-blue-300 hover:border-blue-400 dark:hover:border-blue-500 flex items-center gap-2 text-xs font-semibold shadow-xs transition-all hover:scale-[1.02]"
              title={language === 'bn' ? '৪টি ব্যাংকিং হিসাব কার্যক্রমের লিঙ্ক মেনু' : '4 Banking Portals Menu'}
            >
              <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="hidden sm:inline">{language === 'bn' ? 'ব্যাংকিং হিসাব' : 'Banking Portals'}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                4
              </span>
            </button>

            {/* Notification Bell */}
            <button
              id="header-notifications-btn"
              onClick={onOpenNotifications}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={language === 'bn' ? 'বিজ্ঞপ্তি' : 'Notifications'}
            >
              <Bell className="w-4.5 h-4.5" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900 animate-pulse"></span>
              )}
            </button>

            {/* Language Toggle */}
            <button
              id="header-lang-toggle"
              onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
              className="p-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 transition-colors"
              title={language === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
            >
              <Globe className="w-4 h-4 text-slate-500" />
              <span>{language === 'bn' ? 'BN' : 'EN'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              id="header-theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {darkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-slate-600" />}
            </button>

            {/* Settings Trigger */}
            <button
              id="header-settings-btn"
              onClick={onOpenSettings}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={language === 'bn' ? 'সেটিংস' : 'Settings'}
            >
              <Settings className="w-4.5 h-4.5" />
            </button>

            {/* User Profile / Google Auth */}
            {firebaseUser ? (
              <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setActiveTab('profile')}
                  className="flex items-center gap-2 text-left focus:outline-hidden group"
                  title={`${user.name} (${firebaseUser.email || ''})`}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-xl object-cover ring-2 ring-emerald-500/40"
                  />
                  <div className="hidden xl:block">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[110px]">
                      {user.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>Firestore Sync</span>
                    </div>
                  </div>
                </button>
                {onSignOutGoogle && (
                  <button
                    onClick={onSignOutGoogle}
                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title={language === 'bn' ? 'সাইন আউট করুন' : 'Sign Out'}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                {onSignInGoogle && (
                  <button
                    onClick={onSignInGoogle}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold transition-all shadow-xs"
                    title={language === 'bn' ? 'গুগল দিয়ে সাইন ইন করে ক্লাউড ফায়ারস্টোরে সিঙ্ক করুন' : 'Sign in with Google to sync cloud data'}
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'গুগল সাইন-ইন' : 'Google Sign-in'}</span>
                  </button>
                )}
                <button
                  onClick={() => setActiveTab('profile')}
                  className="flex items-center text-left focus:outline-hidden"
                  title={user.name}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-xl object-cover ring-2 ring-blue-500/30"
                  />
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1 animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{language === 'bn' ? item.labelBn : item.labelEn}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    isActive ? 'bg-white text-blue-600' : 'bg-rose-500 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenBanking();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold text-xs flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              <span>{language === 'bn' ? '৪টি ব্যাংকিং পোর্টাল মেনু' : '4 Banking Portals Menu'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
