import React, { useState, useEffect } from 'react';
import { 
  Header, 
  NavTab 
} from './components/Header';
import { AboutAndPortfolio } from './components/AboutAndPortfolio';
import { ChatSection } from './components/ChatSection';
import { PersonalDiary } from './components/PersonalDiary';
import { FinancialAccounting } from './components/FinancialAccounting';
import { UserProfileAndSecurity } from './components/UserProfileAndSecurity';
import { BankingMenuModal } from './components/BankingMenuModal';
import { NotificationCenter } from './components/NotificationCenter';
import { SettingsModal } from './components/SettingsModal';
import { TwoFactorModal } from './components/TwoFactorModal';

import { 
  UserProfile, 
  DiaryEntry, 
  FinancialTransaction, 
  ChatMessage, 
  AppNotification, 
  AppSettings, 
  SecurityLog 
} from './types';

import { 
  INITIAL_USER, 
  INITIAL_DIARY, 
  INITIAL_TRANSACTIONS, 
  INITIAL_MESSAGES, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_SECURITY_LOGS, 
  BANKING_PORTALS,
  MD_TAREQ_PROFILE 
} from './data/initialData';

import {
  db,
  auth,
  testConnection,
  signInWithGoogle,
  logoutUser,
  onAuthStateChanged,
  FirebaseUser,
  doc,
  collection,
  setDoc,
  getDoc,
  deleteDoc,
  onSnapshot,
  handleFirestoreError,
  OperationType,
} from './firebase';

export default function App() {
  // Navigation & Modals
  const [activeTab, setActiveTab] = useState<NavTab>('portfolio');
  const [isBankingModalOpen, setIsBankingModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [twoFactorPrompt, setTwoFactorPrompt] = useState<{
    isOpen: boolean;
    onSuccess: () => void;
  }>({
    isOpen: false,
    onSuccess: () => {},
  });

  // Firebase connection & auth state
  const [firebaseConnected, setFirebaseConnected] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);

  // Settings State
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('md_tareq_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      language: 'bn',
      darkMode: false,
      soundEnabled: true,
      notificationsEnabled: true,
      autoLockPrivateDiary: true,
      currencySymbol: '৳',
    };
  });

  // User State
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('md_tareq_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_USER;
  });

  // Security Logs
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>(() => {
    const saved = localStorage.getItem('md_tareq_security_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_SECURITY_LOGS;
  });

  // Chat Messages
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('md_tareq_chat');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_MESSAGES;
  });

  // Diary Entries
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>(() => {
    const saved = localStorage.getItem('md_tareq_diary');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_DIARY;
  });

  // Financial Transactions
  const [transactions, setTransactions] = useState<FinancialTransaction[]>(() => {
    const saved = localStorage.getItem('md_tareq_transactions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_TRANSACTIONS;
  });

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('md_tareq_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Real-time Toast
  const [activeToast, setActiveToast] = useState<{
    id: string;
    title: string;
    message: string;
  } | null>(null);

  // 1. Boot connection test
  useEffect(() => {
    let isMounted = true;
    testConnection().then((connected) => {
      if (isMounted) setFirebaseConnected(connected);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Auth State Listener & Profile Sync
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            setUser(snap.data() as UserProfile);
          } else {
            const syncedUser: UserProfile = {
              ...user,
              id: fbUser.uid,
              name: fbUser.displayName || user.name,
              email: fbUser.email || user.email,
              avatar: fbUser.photoURL || user.avatar,
            };
            await setDoc(userDocRef, syncedUser);
            setUser(syncedUser);
          }
        } catch (err) {
          console.error('Error fetching user document:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // 3. Real-time Firestore Sync for Chat Messages
  useEffect(() => {
    const chatCollRef = collection(db, 'chatMessages');
    const unsubscribe = onSnapshot(
      chatCollRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const loadedMessages = snapshot.docs.map((d) => d.data() as ChatMessage);
          loadedMessages.sort((a, b) => (a.id > b.id ? 1 : -1));
          setMessages(loadedMessages);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'chatMessages');
      }
    );

    return () => unsubscribe();
  }, []);

  // 4. Real-time Firestore Sync for User-scoped Collections
  useEffect(() => {
    if (!firebaseUser) return;

    const diaryPath = `users/${firebaseUser.uid}/diaryEntries`;
    const unsubDiary = onSnapshot(
      collection(db, 'users', firebaseUser.uid, 'diaryEntries'),
      (snapshot) => {
        if (!snapshot.empty) {
          const items = snapshot.docs.map((d) => d.data() as DiaryEntry);
          setDiaryEntries(items);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, diaryPath);
      }
    );

    const txnPath = `users/${firebaseUser.uid}/transactions`;
    const unsubTxn = onSnapshot(
      collection(db, 'users', firebaseUser.uid, 'transactions'),
      (snapshot) => {
        if (!snapshot.empty) {
          const items = snapshot.docs.map((d) => d.data() as FinancialTransaction);
          setTransactions(items);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, txnPath);
      }
    );

    const logsPath = `users/${firebaseUser.uid}/securityLogs`;
    const unsubLogs = onSnapshot(
      collection(db, 'users', firebaseUser.uid, 'securityLogs'),
      (snapshot) => {
        if (!snapshot.empty) {
          const items = snapshot.docs.map((d) => d.data() as SecurityLog);
          setSecurityLogs(items);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, logsPath);
      }
    );

    return () => {
      unsubDiary();
      unsubTxn();
      unsubLogs();
    };
  }, [firebaseUser]);

  // Sync dark mode class with root html element
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('md_tareq_settings', JSON.stringify(settings));
  }, [settings]);

  // Persist items
  useEffect(() => {
    localStorage.setItem('md_tareq_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('md_tareq_security_logs', JSON.stringify(securityLogs));
  }, [securityLogs]);

  useEffect(() => {
    localStorage.setItem('md_tareq_chat', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('md_tareq_diary', JSON.stringify(diaryEntries));
  }, [diaryEntries]);

  useEffect(() => {
    localStorage.setItem('md_tareq_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('md_tareq_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Sound tone using Web Audio API
  const playGentleSound = () => {
    if (!settings.soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch (e) {
      // Audio context might be restricted before user gesture
    }
  };

  // Add Notification Helper
  const triggerNotification = (
    title: string,
    message: string,
    type: AppNotification['type'] = 'system'
  ) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      type,
      timestamp: settings.language === 'bn' ? 'এইমাত্র' : 'Just now',
      read: false,
    };

    setNotifications((prev) => [newNotif, ...prev]);

    if (settings.notificationsEnabled) {
      setActiveToast({
        id: newNotif.id,
        title,
        message,
      });
      playGentleSound();
      setTimeout(() => {
        setActiveToast((current) => (current?.id === newNotif.id ? null : current));
      }, 4000);
    }
  };

  // Log Security Activity
  const logSecurityAction = async (action: string, status: 'success' | 'warning' = 'success') => {
    const newLog: SecurityLog = {
      id: `sec-${Date.now()}`,
      action,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      device: 'Web Client',
      ip: '103.145.72.19',
      status,
    };
    setSecurityLogs((prev) => [newLog, ...prev.slice(0, 15)]);

    if (firebaseUser) {
      const logPath = `users/${firebaseUser.uid}/securityLogs`;
      try {
        await setDoc(doc(db, 'users', firebaseUser.uid, 'securityLogs', newLog.id), newLog);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, logPath);
      }
    }
  };

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    try {
      const fbUser = await signInWithGoogle();
      triggerNotification(
        settings.language === 'bn' ? 'গুগল সাইন-ইন সফল' : 'Google Sign-in Successful',
        settings.language === 'bn' 
          ? `স্বাগতম ${fbUser.displayName || 'ইউজার'}! আপনার ফায়ারবেস ক্লাউড ডাটাবেজ সিঙ্ক সক্রিয় হয়েছে।`
          : `Welcome ${fbUser.displayName || 'User'}! Cloud Firestore sync is active.`,
        'system'
      );
      logSecurityAction(`Google Login: ${fbUser.email}`, 'success');
    } catch (err: unknown) {
      console.error(err);
      triggerNotification(
        settings.language === 'bn' ? 'লগইন সম্পন্ন হয়নি' : 'Sign-in Not Completed',
        'দয়া করে আবার চেষ্টা করুন বা পপআপ অনুমোদন করুন।',
        'system'
      );
    }
  };

  // Google Sign-Out Handler
  const handleGoogleSignOut = async () => {
    try {
      await logoutUser();
      triggerNotification(
        settings.language === 'bn' ? 'সাইন আউট সম্পন্ন' : 'Signed Out',
        'ফায়ারবেস সেশন সফলভাবে বন্ধ করা হয়েছে।',
        'system'
      );
      logSecurityAction('Google Logout', 'warning');
    } catch (err: unknown) {
      console.error(err);
    }
  };

  // Send Message Handler
  const handleSendMessage = async (text: string, attachmentName?: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: firebaseUser ? firebaseUser.uid : user.id,
      senderName: firebaseUser?.displayName || user.name,
      senderRole: 'user',
      avatar: firebaseUser?.photoURL || user.avatar,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      attachmentName,
    };

    setMessages((prev) => [...prev, userMsg]);

    // Persist user message to Firestore
    try {
      await setDoc(doc(db, 'chatMessages', userMsg.id), userMsg);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'chatMessages');
    }

    // Intelligent MD Tareq reply
    setTimeout(async () => {
      let replyText = '';
      const lower = text.toLowerCase();

      if (lower.includes('ব্যাংক') || lower.includes('bank') || lower.includes('portal')) {
        replyText = settings.language === 'bn'
          ? 'আমাদের অ্যাপের উপরে থাকা "ব্যাংকিং হিসাব" মেনুতে চারটি প্রধান পোর্টালের লাইভ লিঙ্ক রয়েছে। আপনি কোর ব্যাংকিং, কমার্শিয়াল বা অপারেশনাল পোর্টালে সরাসরি ঢুকে যাবতীয় ব্যাংকিং কার্যক্রম পরিচালনা করতে পারবেন।'
          : 'You can access the 4 banking portals directly from the "Banking Portals" button in the top menu. It connects to core banking, commercial, and operational services.';
      } else if (lower.includes('2fa') || lower.includes('টু-ফ্যাক্টর') || lower.includes('সিকিউরিটি') || lower.includes('security')) {
        replyText = settings.language === 'bn'
          ? 'আমাদের প্ল্যাটফর্মে TOTP ভিত্তিক টু-ফ্যাক্টর অথেনটিকেশন (2FA) ব্যবস্থা যুক্ত রয়েছে। আপনি "প্রোফাইল ও নিরাপত্তা" ট্যাবে গিয়ে খুব সহজেই সিক্রেট কী ও ব্যাকআপ কোডসহ 2FA চালু করে নিতে পারেন।'
          : 'We have full Two-Factor Authentication (2FA) integrated. You can enable it in the "Profile & 2FA" tab with your authenticator app and backup codes.';
      } else if (lower.includes('প্রজেক্ট') || lower.includes('কাজ') || lower.includes('project') || lower.includes('meet') || lower.includes('মিটিং')) {
        replyText = settings.language === 'bn'
          ? 'ধন্যবাদ আপনার আগ্রহের জন্য! আমি ফিনটেক ও এন্টারপ্রাইজ সিস্টেমের কাজে আগ্রহী। আপনি আপনার প্রয়োজনীয়তা বা মিটিং এর সময় জানাতে পারেন অথবা সরাসরি mdtareq.t374@gmail.com এ ইমেইল করতে পারেন।'
          : 'Thank you for your interest! I am always open to discussing FinTech and enterprise projects. You can share your specifications here or reach out at mdtareq.t374@gmail.com.';
      } else if (lower.includes('ডায়রী') || lower.includes('হিসাব') || lower.includes('diary') || lower.includes('account')) {
        replyText = settings.language === 'bn'
          ? 'অ্যাপে "ব্যক্তিগত ডায়রী" ও "হিসাব-নিকাশ" মেনু রাখা হয়েছে, যেখানে আপনি আপনার প্রাত্যহিক কাজের নোট এবং আয়-ব্যয়ের লেজার সুরক্ষিত রাখতে পারবেন।'
          : 'You can keep your daily engineering notes in "Personal Diary" and track income & expenses in the "Accounting" section.';
      } else {
        replyText = settings.language === 'bn'
          ? `ধন্যবাদ মেসেজ দেওয়ার জন্য! আমি আপনার বার্তা পেয়েছি। আমি খুব শীঘ্রই আপনার সাথে এ বিষয়ে বিস্তারিত কথা বলব। আপনার সুবিধার্থে ৪টি ব্যাংকিং লিংক ও অন্যান্য ফিচার এক্সপ্লোর করতে পারেন!`
          : `Thank you for reaching out! I have received your message and will respond promptly. Feel free to explore the banking portals, personal diary, and accounting tools.`;
      }

      const tareqReply: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        senderId: 'tareq',
        senderName: 'MD Tareq',
        senderRole: 'tareq',
        avatar: MD_TAREQ_PROFILE.avatar,
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read',
      };

      setMessages((prev) => [...prev, tareqReply]);

      // Persist Tareq's reply to Firestore
      try {
        await setDoc(doc(db, 'chatMessages', tareqReply.id), tareqReply);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, 'chatMessages');
      }

      triggerNotification(
        settings.language === 'bn' ? 'MD Tareq এর নতুন মেসেজ' : 'New Message from MD Tareq',
        replyText.slice(0, 80) + '...',
        'chat'
      );
    }, 1200);
  };

  // Add Diary
  const handleAddDiaryEntry = async (entryData: Omit<DiaryEntry, 'id' | 'createdAt'>) => {
    const newEntry: DiaryEntry = {
      ...entryData,
      id: `diary-${Date.now()}`,
      createdAt: new Date().toLocaleString(),
    };
    setDiaryEntries((prev) => [newEntry, ...prev]);

    if (firebaseUser) {
      const diaryPath = `users/${firebaseUser.uid}/diaryEntries`;
      try {
        await setDoc(doc(db, 'users', firebaseUser.uid, 'diaryEntries', newEntry.id), newEntry);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, diaryPath);
      }
    }

    triggerNotification(
      settings.language === 'bn' ? 'ডায়রীতে নতুন নোট যুক্ত হয়েছে' : 'New Diary Note Added',
      `"${newEntry.title}" সফলভাবে ডায়রীতে সংরক্ষিত হলো।`,
      'diary'
    );
    logSecurityAction(`ডায়রী নোট তৈরি: ${newEntry.title}`);
  };

  // Delete Diary
  const handleDeleteDiaryEntry = async (id: string) => {
    setDiaryEntries((prev) => prev.filter((e) => e.id !== id));

    if (firebaseUser) {
      const diaryPath = `users/${firebaseUser.uid}/diaryEntries`;
      try {
        await deleteDoc(doc(db, 'users', firebaseUser.uid, 'diaryEntries', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, diaryPath);
      }
    }
  };

  // Add Financial Transaction
  const handleAddTransaction = async (txnData: Omit<FinancialTransaction, 'id'>) => {
    const newTxn: FinancialTransaction = {
      ...txnData,
      id: `txn-${Date.now()}`,
    };
    setTransactions((prev) => [newTxn, ...prev]);

    if (firebaseUser) {
      const txnPath = `users/${firebaseUser.uid}/transactions`;
      try {
        await setDoc(doc(db, 'users', firebaseUser.uid, 'transactions', newTxn.id), newTxn);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, txnPath);
      }
    }

    triggerNotification(
      settings.language === 'bn' ? 'নতুন লেনদেনের হিসাব যুক্ত হয়েছে' : 'Transaction Added',
      `${newTxn.type === 'income' ? 'আয়' : 'ব্যয়'}: ৳ ${newTxn.amount.toLocaleString('bn-BD')} (${newTxn.title})`,
      'finance'
    );
    logSecurityAction(`লেনদেন হিসাব তৈরি: ৳${newTxn.amount} (${newTxn.title})`);
  };

  // Delete Transaction
  const handleDeleteTransaction = async (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));

    if (firebaseUser) {
      const txnPath = `users/${firebaseUser.uid}/transactions`;
      try {
        await deleteDoc(doc(db, 'users', firebaseUser.uid, 'transactions', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, txnPath);
      }
    }
  };

  // 2FA Verification Handler for sensitive actions
  const require2FA = (onSuccess: () => void) => {
    setTwoFactorPrompt({
      isOpen: true,
      onSuccess: () => {
        logSecurityAction('2FA ভেরিফিকেশন সফল', 'success');
        onSuccess();
      },
    });
  };

  // Export JSON Backup
  const handleExportBackup = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      user,
      diaryEntries,
      transactions,
      settings,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MD_Tareq_App_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset to Defaults
  const handleResetData = () => {
    if (window.confirm(settings.language === 'bn' ? 'আপনি কি সব ডাটা ডিফল্ট অবস্থায় ফিরিয়ে নিতে চান?' : 'Reset all data to defaults?')) {
      setUser(INITIAL_USER);
      setDiaryEntries(INITIAL_DIARY);
      setTransactions(INITIAL_TRANSACTIONS);
      setMessages(INITIAL_MESSAGES);
      setNotifications(INITIAL_NOTIFICATIONS);
      localStorage.clear();
      triggerNotification('ডাটা রিসেট', 'অ্যাপের প্রাথমিক ডাটা লোড করা হয়েছে।', 'system');
    }
  };

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors flex flex-col font-sans">
      
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={settings.language}
        setLanguage={(lang) => setSettings((prev) => ({ ...prev, language: lang }))}
        darkMode={settings.darkMode}
        setDarkMode={(dark) => setSettings((prev) => ({ ...prev, darkMode: dark }))}
        unreadChatCount={0}
        unreadNotifCount={unreadNotifCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenBanking={() => setIsBankingModalOpen(true)}
        user={user}
        firebaseConnected={firebaseConnected}
        firebaseUser={firebaseUser}
        onSignInGoogle={handleGoogleSignIn}
        onSignOutGoogle={handleGoogleSignOut}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'portfolio' && (
          <AboutAndPortfolio
            language={settings.language}
            onNavigateToChat={() => setActiveTab('chat')}
            onSendMessageToTareq={(msg) => {
              handleSendMessage(msg);
              setActiveTab('chat');
            }}
            onOpenBanking={() => setIsBankingModalOpen(true)}
          />
        )}

        {activeTab === 'chat' && (
          <ChatSection
            messages={messages}
            onSendMessage={handleSendMessage}
            onClearChat={() => {
              setMessages([]);
              localStorage.removeItem('md_tareq_chat');
            }}
            language={settings.language}
            user={user}
            onOpenBanking={() => setIsBankingModalOpen(true)}
          />
        )}

        {activeTab === 'diary' && (
          <PersonalDiary
            entries={diaryEntries}
            onAddEntry={handleAddDiaryEntry}
            onDeleteEntry={handleDeleteDiaryEntry}
            language={settings.language}
            user={user}
            onRequire2FA={require2FA}
          />
        )}

        {activeTab === 'finance' && (
          <FinancialAccounting
            transactions={transactions}
            onAddTransaction={handleAddTransaction}
            onDeleteTransaction={handleDeleteTransaction}
            language={settings.language}
            onOpenBanking={() => setIsBankingModalOpen(true)}
          />
        )}

        {activeTab === 'profile' && (
          <UserProfileAndSecurity
            user={user}
            onUpdateUser={async (updated) => {
              const newProfile = { ...user, ...updated };
              setUser(newProfile);
              if (firebaseUser) {
                const userDocRef = doc(db, 'users', firebaseUser.uid);
                try {
                  await setDoc(userDocRef, newProfile);
                } catch (error) {
                  handleFirestoreError(error, OperationType.WRITE, `users/${firebaseUser.uid}`);
                }
              }
            }}
            securityLogs={securityLogs}
            language={settings.language}
            onTriggerNotification={triggerNotification}
          />
        )}
      </main>

      {/* 4 Banking Portals Modal */}
      <BankingMenuModal
        portals={BANKING_PORTALS}
        isOpen={isBankingModalOpen}
        onClose={() => setIsBankingModalOpen(false)}
        language={settings.language}
        onLogSecurity={logSecurityAction}
      />

      {/* Notifications Drawer */}
      <NotificationCenter
        notifications={notifications}
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onMarkAllRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        }}
        onClearAll={() => {
          setNotifications([]);
          localStorage.removeItem('md_tareq_notifications');
        }}
        onNotificationClick={(notif) => {
          setNotifications((prev) =>
            prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
          );
          if (notif.type === 'chat') setActiveTab('chat');
          if (notif.type === 'diary') setActiveTab('diary');
          if (notif.type === 'finance') setActiveTab('finance');
          if (notif.type === 'security') setActiveTab('profile');
          if (notif.type === 'bank') setIsBankingModalOpen(true);
          setIsNotificationsOpen(false);
        }}
        language={settings.language}
      />

      {/* Custom Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(updated) => setSettings((prev) => ({ ...prev, ...updated }))}
        onExportBackup={handleExportBackup}
        onResetData={handleResetData}
      />

      {/* 2FA Verification Modal */}
      <TwoFactorModal
        isOpen={twoFactorPrompt.isOpen}
        onClose={() => setTwoFactorPrompt({ isOpen: false, onSuccess: () => {} })}
        onSuccess={twoFactorPrompt.onSuccess}
        user={user}
        language={settings.language}
        onNavigateToProfile={() => {
          setActiveTab('profile');
        }}
      />

      {/* Real-time Toast Popover */}
      {activeToast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-5 duration-300 flex items-start justify-between gap-3">
          <div>
            <h5 className="font-bold text-xs text-blue-400 mb-0.5">{activeToast.title}</h5>
            <p className="text-xs text-slate-300 leading-snug">{activeToast.message}</p>
          </div>
          <button
            onClick={() => setActiveToast(null)}
            className="text-slate-400 hover:text-white p-1"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
