export type AppLanguage = 'bn' | 'en';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  role: string;
  location: string;
  joinedDate: string;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  backupCodes?: string[];
}

export interface SecurityLog {
  id: string;
  action: string;
  timestamp: string;
  device: string;
  ip: string;
  status: 'success' | 'warning' | 'alert';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'user' | 'tareq' | 'system';
  avatar?: string;
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  attachmentName?: string;
}

export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  category: 'work' | 'personal' | 'financial' | 'idea' | 'meeting';
  tags: string[];
  date: string;
  isPrivate: boolean; // Needs 2FA to view if enabled
  mood?: 'productive' | 'satisfied' | 'busy' | 'reflective';
  createdAt: string;
}

export interface FinancialTransaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  paymentMethod: string;
  notes?: string;
}

export interface BankingPortal {
  id: string;
  nameBn: string;
  nameEn: string;
  url: string;
  category: string;
  descriptionBn: string;
  descriptionEn: string;
  color: string;
  accountType: string;
  lastActive?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'chat' | 'security' | 'finance' | 'diary' | 'bank' | 'system';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface AppSettings {
  language: AppLanguage;
  darkMode: boolean;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  autoLockPrivateDiary: boolean;
  currencySymbol: string;
}
