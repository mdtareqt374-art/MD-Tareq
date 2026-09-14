import { 
  UserProfile, 
  BankingPortal, 
  DiaryEntry, 
  FinancialTransaction, 
  ChatMessage, 
  AppNotification, 
  SecurityLog 
} from '../types';

export const MD_TAREQ_PROFILE = {
  name: 'MD Tareq',
  designationBn: 'সফটওয়্যার আর্কিটেক্ট ও ফিনটেক কনসালট্যান্ট',
  designationEn: 'Software Architect & FinTech Consultant',
  email: 'mdtareq.t374@gmail.com',
  phone: '+880 1700-000000',
  location: 'ঢাকা, বাংলাদেশ (Dhaka, Bangladesh)',
  aboutBn: 'আসসালামু আলাইকুম, আমি MD Tareq। আমি একজন অভিজ্ঞ সফটওয়্যার আর্কিটেক্ট এবং ফিনটেক ও ব্যবসায়িক সফটওয়্যার সমাধান বিশেষজ্ঞ। ডাটা নিরাপত্তা, হাই-স্কেলেবল অ্যাপ্লিকেশন, রিয়েল-টাইম আর্কিটেকচার এবং ব্যাংকিং লেজার সলিউশন তৈরিতে আমার দীর্ঘদিনের অভিজ্ঞতা রয়েছে। আমার সাথে সরাসরি যোগাযোগের জন্য এই অ্যাপের লাইভ চ্যাট অথবা সরাসরি মেসেজ ফর্ম ব্যবহার করতে পারেন।',
  aboutEn: 'Hello, I am MD Tareq. I am an experienced Software Architect and FinTech solutions specialist. I specialize in data security, high-scalability web systems, real-time architectures, and banking ledger systems. Feel free to contact me directly using the live chat or the contact form.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  skills: [
    { name: 'Full-Stack Architecture', level: 95 },
    { name: 'FinTech & Banking Security', level: 92 },
    { name: 'Two-Factor Authentication (2FA/TOTP)', level: 90 },
    { name: 'Cloud Infrastructure & Microservices', level: 88 },
    { name: 'React & TypeScript Ecosystem', level: 94 },
    { name: 'Financial Accounting Systems', level: 90 },
  ],
  experience: [
    {
      period: '2021 — বর্তমান',
      periodEn: '2021 — Present',
      role: 'Lead Architect & FinTech Advisor',
      company: 'Enterprise Financial Technologies',
      descBn: 'ক্লাউড ভিত্তিক ব্যাংকিং অ্যাপ্লিকেশন ও রিয়েল-টাইম ট্রানজেকশন প্ল্যাটফর্ম ডিজাইন ও তদারকি।',
      descEn: 'Architecting cloud banking applications and real-time transaction platforms.',
    },
    {
      period: '2019 — 2021',
      periodEn: '2019 — 2021',
      role: 'Senior Software Engineer',
      company: 'Digital Solutions Lab',
      descBn: 'এন্টারপ্রাইজ পোর্টাল, নিরাপদ এপিআই ইন্টিগ্রেশন এবং মাল্টি-ফ্যাক্টর সিকিউরিটি গেটওয়ে নির্মাণ।',
      descEn: 'Enterprise portal engineering, secure API gateways, and multi-factor authentication systems.',
    },
    {
      period: '2017 — 2019',
      periodEn: '2017 — 2019',
      role: 'Full-Stack Developer',
      company: 'Innovate Tech Ltd',
      descBn: 'ওয়েব অ্যাপ্লিকেশন, ড্যাশবোর্ড এবং ক্লাউড ডাটাবেজ ইন্টিগ্রেশন পরিচালনা।',
      descEn: 'Web development, analytic dashboards, and database infrastructure management.',
    }
  ],
  portfolioProjects: [
    {
      id: 'p1',
      titleBn: 'কোর ব্যাংকিং রিয়েল-টাইম হিসাব সিস্টেম',
      titleEn: 'Core Banking Real-time Accounting System',
      category: 'Fintech & Banking',
      descBn: 'উচ্চ নিরাপত্তা এবং তাৎক্ষণিক লেনদেন যাচাইসহ একটি পূর্ণাঙ্গ ব্যাংকিং অপারেশনাল কোর ইঞ্জিন।',
      descEn: 'Full-featured banking core operational engine with high security and instant reconciliation.',
      tags: ['TypeScript', 'Fintech', '2FA', 'Cloud Run', 'WebSockets'],
      link: 'https://ais-pre-enosmd4z6nlhqejcwftqz2-874924685879.asia-southeast1.run.app/',
      featured: true,
    },
    {
      id: 'p2',
      titleBn: 'বাণিজ্যিক অ্যাকাউন্টস ও লেজার প্ল্যাটফর্ম',
      titleEn: 'Commercial Accounts & Ledger Platform',
      category: 'Enterprise Finance',
      descBn: 'মাল্টি-কারেন্সি ও রিয়েল-টাইম অডিট ট্রেইল সহ প্রাতিষ্ঠানিক ব্যাংকিং ড্যাশবোর্ড।',
      descEn: 'Institutional banking dashboard with multi-currency tracking and real-time audit trails.',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Ledger'],
      link: 'https://ais-pre-kzcntyz4bqnfp62zb7es3y-750034224934.asia-southeast1.run.app/',
      featured: true,
    },
    {
      id: 'p3',
      titleBn: 'অপারেশনাল ট্রানজ্যাকশন পোর্টাল',
      titleEn: 'Operational Transaction Portal',
      category: 'Banking Ops',
      descBn: 'দৈনন্দিন নগদ প্রবাহ, ব্যাংক চালান এবং লেনদেন নিষ্পত্তির জন্য স্বয়ংক্রিয় ব্যবস্থা।',
      descEn: 'Automated settlement and workflow system for daily cashflows and banking invoices.',
      tags: ['Cloud Microservices', 'Express', 'Security Rules'],
      link: 'https://untitled-435217603340.asia-southeast1.run.app/',
      featured: false,
    },
    {
      id: 'p4',
      titleBn: 'ট্রেজারি ও রিটেইল ব্যাংকিং সার্ভিস',
      titleEn: 'Treasury & Retail Banking Service',
      category: 'Treasury',
      descBn: 'রিটেইল অ্যাকাউন্ট ব্যবস্থাপনা ও রিজার্ভ ফান্ড অ্যানালিটিক্স সংবলিত অনলাইন ব্যাংকিং সার্ভিস।',
      descEn: 'Online banking service with retail account operations and reserve analytics.',
      tags: ['API Integration', 'Data Security', 'OAuth'],
      link: 'https://ais-pre-phcpysawk6eapq26jbukcq-749714272460.asia-southeast1.run.app/',
      featured: false,
    }
  ]
};

export const BANKING_PORTALS: BankingPortal[] = [
  {
    id: 'bank-1',
    nameBn: 'ব্যাংকিং হিসাব কার্যক্রম - ০১ (কোর ব্যাংকিং)',
    nameEn: 'Banking Operations Portal 01 (Core Banking)',
    url: 'https://ais-pre-enosmd4z6nlhqejcwftqz2-874924685879.asia-southeast1.run.app/',
    category: 'Core Banking & Accounts',
    descriptionBn: 'প্রধান একাউন্টিং লেজার, আমানত এবং সরাসরি ফান্ড ট্রান্সফার সমন্বিত মূল ব্যাংকিং পোর্টাল।',
    descriptionEn: 'Primary accounting ledger, deposits, and direct fund transfer integration.',
    color: 'from-blue-600 to-indigo-700',
    accountType: 'Primary Operational Account',
    lastActive: 'আজ সক্রিয় (Active Today)',
  },
  {
    id: 'bank-2',
    nameBn: 'ব্যাংকিং হিসাব কার্যক্রম - ০২ (কমার্শিয়াল অ্যাকাউন্ট)',
    nameEn: 'Banking Operations Portal 02 (Commercial Banking)',
    url: 'https://ais-pre-kzcntyz4bqnfp62zb7es3y-750034224934.asia-southeast1.run.app/',
    category: 'Commercial Accounts',
    descriptionBn: 'বাণিজ্যিক লেনদেন, ব্যবসায়িক পেমেন্ট ও আন্তর্জাতিক ক্লিয়ারিং কার্য পরিচালনা।',
    descriptionEn: 'Commercial transactions, corporate vendor payments, and global settlement.',
    color: 'from-emerald-600 to-teal-700',
    accountType: 'Commercial Corporate Account',
    lastActive: 'গতকাল হালনাগাদ (Updated Yesterday)',
  },
  {
    id: 'bank-3',
    nameBn: 'ব্যাংকিং হিসাব কার্যক্রম - ০৩ (অপারেশনাল সেটেলমেন্ট)',
    nameEn: 'Banking Operations Portal 03 (Operational Settlement)',
    url: 'https://untitled-435217603340.asia-southeast1.run.app/',
    category: 'Operational Settlement',
    descriptionBn: 'দৈনিক ক্যাশ-ইন-ফ্লো এবং লেনদেন সংক্রান্ত যাবতীয় হিসাব কার্যক্রম পর্যবেক্ষণ।',
    descriptionEn: 'Daily cashflow settlements and banking transaction monitoring gateway.',
    color: 'from-amber-600 to-orange-700',
    accountType: 'Daily Settlement Gateway',
    lastActive: 'রিয়েল-টাইম কানেক্টেড (Live Connected)',
  },
  {
    id: 'bank-4',
    nameBn: 'ব্যাংকিং হিসাব কার্যক্রম - ০৪ (ট্রেজারি ও রিটেইল সার্ভিস)',
    nameEn: 'Banking Operations Portal 04 (Treasury & Retail)',
    url: 'https://ais-pre-phcpysawk6eapq26jbukcq-749714272460.asia-southeast1.run.app/',
    category: 'Treasury & Retail',
    descriptionBn: 'রিটেইল অ্যাকাউন্ট হ্যান্ডলিং, সঞ্চয়ী কার্যক্রম ও রিজার্ভ ব্যালেন্স ট্র্যাকিং।',
    descriptionEn: 'Retail account management, reserve balancing, and treasury funds.',
    color: 'from-violet-600 to-purple-700',
    accountType: 'Reserve & Retail Account',
    lastActive: 'নিরাপদ এনক্রিপ্টেড (Secured SSL)',
  }
];

export const INITIAL_USER: UserProfile = {
  id: 'usr-1',
  name: 'গেস্ট ব্যবহারকারী (User)',
  email: 'visitor@tareq-app.com',
  phone: '+880 1800-123456',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
  bio: 'MD Tareq এর অ্যাপের একজন সম্মানিত ব্যবহারকারী।',
  role: 'Client / Guest User',
  location: 'ঢাকা, বাংলাদেশ',
  joinedDate: '2026-09-13',
  twoFactorEnabled: false,
  twoFactorSecret: 'TAREQ-SECURE-8924-OTP',
  backupCodes: [
    'TRQ-4821-99',
    'TRQ-7312-04',
    'TRQ-9018-72',
    'TRQ-2365-11',
    'TRQ-6490-88',
    'TRQ-1543-67'
  ]
};

export const INITIAL_SECURITY_LOGS: SecurityLog[] = [
  {
    id: 'sec-1',
    action: 'লগইন সম্পন্ন (User Signed In)',
    timestamp: 'আজ, ১০:১৫ AM',
    device: 'Chrome on macOS / Windows',
    ip: '103.145.72.19 (Dhaka, BD)',
    status: 'success'
  },
  {
    id: 'sec-2',
    action: 'সেশন ইনিশিয়ালাইজেশন',
    timestamp: 'আজ, ১০:১২ AM',
    device: 'Web Client Applet',
    ip: '103.145.72.19',
    status: 'success'
  }
];

export const INITIAL_DIARY: DiaryEntry[] = [
  {
    id: 'diary-1',
    title: 'ফিনটেক কোর আর্কিটেকচার রিভিউ ও ব্যাংকিং এপিআই টেস্ট',
    content: 'আজ সকালে চারটি ব্যাংকিং পোর্টালের সাথে সংযোগ ও ডাটা ট্রান্সফার টেস্ট সফলভাবে সম্পন্ন হয়েছে। টু-ফ্যাক্টর অথেনটিকেশনের সেশন ভ্যালিডেশন এবং টোকেন এনক্রিপশন সফলভাবে কাজ করছে। আগামীকালের জন্য ব্যালেন্স রিকনসিলিয়েশন স্ক্রিপ্ট তৈরি করা প্রয়োজন।',
    category: 'work',
    tags: ['FinTech', 'API', 'Security', 'Banking'],
    date: '2026-09-13',
    isPrivate: false,
    mood: 'productive',
    createdAt: '2026-09-13 11:30'
  },
  {
    id: 'diary-2',
    title: 'ব্যক্তিগত অর্থনৈতিক পরিকল্পনা ও সঞ্চয় টার্গেট',
    content: 'চলতি মাসের আয়-ব্যয়ের হিসাব নিকাশ পর্যালোচনা করা হলো। কমার্শিয়াল ব্যাংক এবং কোর ব্যাংকিং পোর্টালের ব্যালেন্স সমন্বয় ঠিক রয়েছে। সঞ্চয় তহবিলে অতিরিক্ত ১৫% বরাদ্দ দেওয়ার সিদ্ধান্ত নেওয়া হয়েছে।',
    category: 'financial',
    tags: ['বাজেট', 'হিসাব', 'সঞ্চয়'],
    date: '2026-09-12',
    isPrivate: true, // Requires 2FA verification to unlock
    mood: 'reflective',
    createdAt: '2026-09-12 21:00'
  },
  {
    id: 'diary-3',
    title: 'নতুন মাইক্রোসার্ভিস আইডিয়া ও সিকিউরিটি প্রোটোকল',
    content: 'ব্যবহারকারীদের ডাটা সুরক্ষায় TOTP বেসড টু-ফ্যাক্টর অথেন্টিকেশন বাধ্যতামূলক করার পরিকল্পনা। সাথে ব্যাকআপ সিকিউরিটি কী জেনারেটর যুক্ত করা হবে যেন ডিভাইসের অনুপস্থিতিতেও অ্যাক্সেস পাওয়া যায়।',
    category: 'idea',
    tags: ['2FA', 'Ideation', 'Security'],
    date: '2026-09-11',
    isPrivate: false,
    mood: 'satisfied',
    createdAt: '2026-09-11 16:45'
  }
];

export const INITIAL_TRANSACTIONS: FinancialTransaction[] = [
  {
    id: 'txn-1',
    title: 'সফটওয়্যার ডেভেলপমেন্ট কনসালটেন্সি ফি',
    amount: 125000,
    type: 'income',
    category: 'প্রজেক্ট বিল (Project Bill)',
    date: '2026-09-12',
    paymentMethod: 'ব্যাংক ট্রান্সফার (Bank Transfer)',
    notes: 'ফিনটেক আর্কিটেকচার কনসাল্টিং পার্টনার পেমেন্ট'
  },
  {
    id: 'txn-2',
    title: 'ক্লাউড সার্ভার হোস্টিং ও ইনফ্রাস্ট্রাকচার',
    amount: 18500,
    type: 'expense',
    category: 'সার্ভার খরচ (Cloud Hosting)',
    date: '2026-09-10',
    paymentMethod: 'ক্রেডিট কার্ড (Credit Card)',
    notes: 'Google Cloud Run ও ডাটাবেজ বিল'
  },
  {
    id: 'txn-3',
    title: 'ফিনটেক অ্যাপ ডিজাইন ও UI ফ্রেমওয়ার্ক রয়্যালটি',
    amount: 60000,
    type: 'income',
    category: 'রয়্যালটি ও সার্ভিস (Service)',
    date: '2026-09-08',
    paymentMethod: 'অনলাইন ব্যাংকিং (Portal 01)',
    notes: 'ইউআই কিট লাইসেন্স পেমেন্ট'
  },
  {
    id: 'txn-4',
    title: 'অফিস ইউটিলিটি ও ইন্টারনেট ব্যাকবোন চার্জ',
    amount: 9500,
    type: 'expense',
    category: 'অফিস খরচ (Office Utility)',
    date: '2026-09-05',
    paymentMethod: 'বিকাশ / ব্যাংক (Direct)',
    notes: 'হাইস্পিড ফাইবার লাইন বিল'
  },
  {
    id: 'txn-5',
    title: 'সাইবার সিকিউরিটি অডিট ও 2FA সফটওয়্যার টুলস',
    amount: 15000,
    type: 'expense',
    category: 'টুলস ও লাইসেন্স (Tools)',
    date: '2026-09-02',
    paymentMethod: 'ব্যাংকিং পোর্টাল ২',
    notes: 'সিকিউরিটি কমপ্লায়েন্স সার্টিফিকেশন'
  }
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    senderId: 'tareq',
    senderName: 'MD Tareq',
    senderRole: 'tareq',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    text: 'আসসালামু আলাইকুম! আমি MD Tareq। আমার প্ল্যাটফর্মে আপনাকে স্বাগতম। আপনি এখানে আপনার ব্যক্তিগত প্রোফাইল তৈরি করতে পারেন, টু-ফ্যাক্টর অথেনটিকেশন সেট করতে পারেন, আমার পোর্টফোলিও দেখতে পারেন এবং আমার সাথে সরাসরি যে কোনো প্রজেক্ট বা বিষয়ে কথা বলতে পারেন!',
    timestamp: '১০:০০ AM',
    status: 'read'
  },
  {
    id: 'msg-2',
    senderId: 'tareq',
    senderName: 'MD Tareq',
    senderRole: 'tareq',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    text: 'এছাড়াও উপরে মেনুতে থাকা ৪টি ব্যাংকিং কার্যক্রমের লিঙ্ক থেকে সরাসরি ব্যাংকিং পোর্টালগুলোতেও ভিজিট করতে পারবেন। কোনো কিছু জানার থাকলে লিখে পাঠাতে পারেন!',
    timestamp: '১০:০১ AM',
    status: 'read'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'MD Tareq থেকে স্বাগতম বার্তা',
    message: 'MD Tareq আপনাকে নতুন মেসেজ পাঠিয়েছেন। চ্যাট বক্সে কথা বলুন।',
    type: 'chat',
    timestamp: '৫ মিনিট আগে',
    read: false
  },
  {
    id: 'notif-2',
    title: 'নিরাপত্তা সুপারিশ (2FA)',
    message: 'আপনার অ্যাকাউন্টের ডাটা সুরক্ষায় টু-ফ্যাক্টর অথেন্টিকেশন (2FA) সক্রিয় করার পরামর্শ দেওয়া হচ্ছে।',
    type: 'security',
    timestamp: '২০ মিনিট আগে',
    read: false
  },
  {
    id: 'notif-3',
    title: 'ব্যাংকিং হিসাব কার্যক্রম সংযুক্ত',
    message: 'আপনার সুবিধার জন্য ৪টি লাইভ ব্যাংকিং পোর্টাল অ্যাপ মেনুতে যুক্ত করা হয়েছে।',
    type: 'bank',
    timestamp: '১ ঘন্টা আগে',
    read: true
  }
];
