import React, { useState } from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Award, 
  Code2, 
  ShieldCheck, 
  Cpu,
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { MD_TAREQ_PROFILE, BANKING_PORTALS } from '../data/initialData';
import { AppLanguage } from '../types';

interface AboutAndPortfolioProps {
  language: AppLanguage;
  onNavigateToChat: () => void;
  onSendMessageToTareq: (msg: string) => void;
  onOpenBanking: () => void;
}

export const AboutAndPortfolio: React.FC<AboutAndPortfolioProps> = ({
  language,
  onNavigateToChat,
  onSendMessageToTareq,
  onOpenBanking,
}) => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;

    const formattedMessage = contactName 
      ? `[যোগাযোগ ফর্ম থেকে] প্রেরক: ${contactName} (${contactEmail || 'N/A'})\n\n${contactMessage}`
      : contactMessage;

    onSendMessageToTareq(formattedMessage);
    setIsSent(true);
    setContactMessage('');
    setTimeout(() => {
      setIsSent(false);
      onNavigateToChat();
    }, 1500);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-16 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Avatar & Badges */}
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div className="relative mb-4 group">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden ring-4 ring-blue-500/40 shadow-2xl bg-slate-800">
                <img
                  src={MD_TAREQ_PROFILE.avatar}
                  alt="MD Tareq"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-xl shadow-lg ring-4 ring-slate-900 flex items-center gap-1 text-[11px] font-bold px-2.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {MD_TAREQ_PROFILE.name}
            </h2>
            <p className="text-blue-400 font-medium text-sm mt-1">
              {language === 'bn' ? MD_TAREQ_PROFILE.designationBn : MD_TAREQ_PROFILE.designationEn}
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-slate-300">
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-lg">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                {MD_TAREQ_PROFILE.location}
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-lg">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                {MD_TAREQ_PROFILE.email}
              </span>
            </div>
          </div>

          {/* Bio & Highlights */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'ব্যক্তিগত পরিচিতি ও পোর্টফোলিও' : 'Personal Profile & Portfolio'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {language === 'bn' 
                ? 'আধুনিক ফিনটেক ও উচ্চ নিরাপত্তাযুক্ত ক্লাউড সলিউশন' 
                : 'Modern FinTech & High-Security Cloud Solutions'}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {language === 'bn' ? MD_TAREQ_PROFILE.aboutBn : MD_TAREQ_PROFILE.aboutEn}
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onNavigateToChat}
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{language === 'bn' ? 'সরাসরি চ্যাট শুরু করুন' : 'Start Live Chat'}</span>
              </button>

              <button
                onClick={onOpenBanking}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm flex items-center gap-2 border border-slate-700 transition-colors"
              >
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>{language === 'bn' ? '৪টি ব্যাংকিং পোর্টাল দেখুন' : 'View 4 Banking Portals'}</span>
              </button>

              <a
                href={`mailto:${MD_TAREQ_PROFILE.email}`}
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 font-medium text-sm flex items-center gap-2 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{language === 'bn' ? 'ইমেইল পাঠান' : 'Send Email'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Banking Portals Quick Access Strip */}
      <section className="bg-gradient-to-r from-blue-50 via-indigo-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800/80 dark:to-slate-900 p-6 rounded-2xl border border-blue-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-600 text-white">
                <Building2 className="w-4 h-4" />
              </span>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">
                {language === 'bn' ? 'সংযুক্ত ৪টি ব্যাংকিং হিসাব কার্যক্রম' : 'Linked 4 Banking Operation Portals'}
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              {language === 'bn' 
                ? 'আপনার চাহিদামাফিক চারটি ব্যাংকিং হিসাব কার্যক্রম এখানে সরাসরি অন্তর্ভুক্ত রয়েছে' 
                : 'All four requested banking management URLs are connected and accessible directly'}
            </p>
          </div>
          <button
            onClick={onOpenBanking}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 self-start md:self-auto shadow-xs"
          >
            <span>{language === 'bn' ? 'পূর্ণাঙ্গ মেনু ভিউ' : 'Open Full Menu'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {BANKING_PORTALS.map((portal, idx) => (
            <a
              key={portal.id}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold text-blue-600 dark:text-blue-400 mb-1">
                  <span>{language === 'bn' ? `পোর্টাল ০${idx + 1}` : `Portal 0${idx + 1}`}</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                  {language === 'bn' ? portal.nameBn : portal.nameEn}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                  {language === 'bn' ? portal.descriptionBn : portal.descriptionEn}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-[10px] text-slate-400">
                <span className="font-medium text-emerald-600 dark:text-emerald-400">● Active</span>
                <span>{portal.accountType}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Skills & Competencies */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Skills Progress */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">
              {language === 'bn' ? 'দক্ষতা ও প্রযুক্তিগত যোগ্যতা' : 'Skills & Technical Expertise'}
            </h3>
          </div>

          <div className="space-y-4">
            {MD_TAREQ_PROFILE.skills.map((skill) => (
              <div key={skill.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>{skill.name}</span>
                  <span className="text-blue-600 dark:text-blue-400">{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-center">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400">5+</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">{language === 'bn' ? 'বছরের অভিজ্ঞতা' : 'Years Experience'}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">40+</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">{language === 'bn' ? 'সফল প্রজেক্ট' : 'Projects Done'}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <div className="text-xl font-extrabold text-purple-600 dark:text-purple-400">100%</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">{language === 'bn' ? 'ডাটা নিরাপত্তা' : 'Data Integrity'}</div>
            </div>
          </div>
        </div>

        {/* Right: Career Experience */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">
              {language === 'bn' ? 'কাজের অভিজ্ঞতা ও ক্যারিয়ার' : 'Experience & Career'}
            </h3>
          </div>

          <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-3 space-y-6">
            {MD_TAREQ_PROFILE.experience.map((item, idx) => (
              <div key={idx} className="relative pl-6">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-white dark:ring-slate-900" />
                <span className="text-xs font-semibold px-2 py-0.5 rounded-sm bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300">
                  {language === 'bn' ? item.period : item.periodEn}
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-1">
                  {item.role}
                </h4>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  {item.company}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {language === 'bn' ? item.descBn : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Portfolio Projects Showcase */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {language === 'bn' ? 'কাজের পোর্টফোলিও ও সিস্টেমসমূহ' : 'Featured Portfolio & Systems'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {language === 'bn' ? 'MD Tareq দ্বারা ডিজাইন ও পরিচালিত মূল প্রকল্পসমূহ' : 'Key projects and systems engineered by MD Tareq'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MD_TAREQ_PROFILE.portfolioProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Featured
                    </span>
                  )}
                </div>

                <h4 className="font-extrabold text-slate-900 dark:text-white text-lg mb-2">
                  {language === 'bn' ? project.titleBn : project.titleEn}
                </h4>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {language === 'bn' ? project.descBn : project.descEn}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>{language === 'bn' ? 'সিস্টেম লাইভ দেখুন' : 'Explore System'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={onNavigateToChat}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {language === 'bn' ? 'প্রজেক্ট নিয়ে কথা বলুন' : 'Inquire'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Contact Form ("আমার সাথে সরাসরি যোগাযোগ") */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-2">
              <Mail className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'সরাসরি যোগাযোগ' : 'Direct Contact'}</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {language === 'bn' ? 'আমার সাথে সরাসরি যোগাযোগ করুন' : 'Get in Direct Touch with MD Tareq'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {language === 'bn'
                ? 'যেকোনো সফটওয়্যার প্রজেক্ট, ফিনটেক কনসালটেন্সি বা প্রশ্নের জন্য মেসেজ পাঠান। তাৎক্ষণিক লাইভ চ্যাটে যুক্ত হবে।'
                : 'Send a message regarding any project, FinTech consultancy or question. Directly connects to live chat.'}
            </p>
          </div>

          {isSent ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-center space-y-2 animate-in zoom-in-95 duration-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h4 className="font-bold text-emerald-800 dark:text-emerald-200 text-base">
                {language === 'bn' ? 'মেসেজটি সফলভাবে পাঠানো হয়েছে!' : 'Message Sent Successfully!'}
              </h4>
              <p className="text-xs text-emerald-700 dark:text-emerald-300">
                {language === 'bn' ? 'আপনাকে এখন লাইভ চ্যাট বক্সে নিয়ে যাওয়া হচ্ছে...' : 'Redirecting you to Live Chat...'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitContact} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {language === 'bn' ? 'আপনার নাম' : 'Your Name'}
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder={language === 'bn' ? 'যেমন: রহিম আহমেদ' : 'e.g. John Doe'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    {language === 'bn' ? 'আপনার ইমেইল' : 'Your Email'}
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  {language === 'bn' ? 'আপনার বার্তা / মেসেজ *' : 'Your Message *'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder={language === 'bn' 
                    ? 'MD Tareq এর কাছে আপনার প্রজেক্ট বা প্রস্তাবনা সম্পর্কে লিখুন...' 
                    : 'Write to MD Tareq about your project or inquiry...'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {language === 'bn' ? 'ইমেইল: mdtareq.t374@gmail.com' : 'Direct: mdtareq.t374@gmail.com'}
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
                >
                  <Send className="w-4 h-4" />
                  <span>{language === 'bn' ? 'মেসেজ পাঠান' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
