import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Lock, 
  Unlock, 
  Calendar, 
  Tag, 
  Search, 
  Filter, 
  Trash2, 
  Check, 
  ShieldAlert, 
  Sparkles,
  Edit3,
  Bookmark
} from 'lucide-react';
import { DiaryEntry, AppLanguage, UserProfile } from '../types';

interface PersonalDiaryProps {
  entries: DiaryEntry[];
  onAddEntry: (entry: Omit<DiaryEntry, 'id' | 'createdAt'>) => void;
  onDeleteEntry: (id: string) => void;
  language: AppLanguage;
  user: UserProfile;
  onRequire2FA: (onSuccess: () => void) => void;
}

export const PersonalDiary: React.FC<PersonalDiaryProps> = ({
  entries,
  onAddEntry,
  onDeleteEntry,
  language,
  user,
  onRequire2FA,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [unlockedEntryIds, setUnlockedEntryIds] = useState<Set<string>>(new Set());

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<DiaryEntry['category']>('work');
  const [tagsInput, setTagsInput] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [mood, setMood] = useState<DiaryEntry['mood']>('productive');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    onAddEntry({
      title,
      content,
      category,
      tags: tags.length > 0 ? tags : ['Work'],
      date,
      isPrivate,
      mood,
    });

    setTitle('');
    setContent('');
    setTagsInput('');
    setIsPrivate(false);
    setIsAdding(false);
  };

  const handleUnlockPrivateEntry = (entryId: string) => {
    onRequire2FA(() => {
      setUnlockedEntryIds((prev) => new Set(prev).add(entryId));
    });
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesCategory = selectedCategory === 'all' || entry.category === selectedCategory;
    const matchesSearch = 
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categoryLabels: Record<DiaryEntry['category'], { bn: string; en: string; color: string }> = {
    work: { bn: 'কাজের নোট', en: 'Work Note', color: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' },
    personal: { bn: 'ব্যক্তিগত', en: 'Personal', color: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' },
    financial: { bn: 'আর্থিক পরিকল্পনা', en: 'Financial Plan', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' },
    idea: { bn: 'আইডিয়া ও উদ্ভাবন', en: 'Ideas', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' },
    meeting: { bn: 'মিটিং নোট', en: 'Meeting Note', color: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' },
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-900 text-white p-6 sm:p-8 rounded-2xl shadow-md border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>MD Tareq's Journal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            {language === 'bn' ? 'ব্যক্তিগত ডায়রী ও কর্মতালিকা' : 'Personal Diary & Work Journal'}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            {language === 'bn' 
              ? 'প্রতিদিনের কাজের নোট, ফিনটেক পরিকল্পনা এবং সুরক্ষিত ডায়রী সংরক্ষণাগার' 
              : 'Daily engineering notes, FinTech planning, and 2FA secured private logs'}
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all self-start sm:self-auto"
        >
          {isAdding ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{isAdding ? (language === 'bn' ? 'ফর্ম বন্ধ করুন' : 'Close Form') : (language === 'bn' ? 'নতুন নোট লিখুন' : 'New Entry')}</span>
        </button>
      </div>

      {/* Add Entry Form Modal / Section */}
      {isAdding && (
        <form
          onSubmit={handleCreateSubmit}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-blue-200 dark:border-blue-900/60 p-6 shadow-lg animate-in slide-in-from-top-4 duration-200 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-blue-600" />
              {language === 'bn' ? 'নতুন ডায়রী / কাজের নোট তৈরি করুন' : 'Create New Diary Note'}
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {user.name}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'bn' ? 'নোটের শিরোনাম *' : 'Title *'}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={language === 'bn' ? 'যেমন: কোর ব্যাংকিং ডাটাবেজ ব্যাকআপ সম্পন্ন' : 'e.g. Core banking database backup'}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'bn' ? 'ক্যাটাগরি' : 'Category'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as DiaryEntry['category'])}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="work">{language === 'bn' ? 'কাজের নোট (Work)' : 'Work'}</option>
                <option value="financial">{language === 'bn' ? 'আর্থিক পরিকল্পনা (Financial)' : 'Financial'}</option>
                <option value="personal">{language === 'bn' ? 'ব্যক্তিগত (Personal)' : 'Personal'}</option>
                <option value="idea">{language === 'bn' ? 'আইডিয়া (Idea)' : 'Idea'}</option>
                <option value="meeting">{language === 'bn' ? 'মিটিং (Meeting)' : 'Meeting'}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'bn' ? 'তারিখ' : 'Date'}
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'bn' ? 'ট্যাগসমূহ (কমা দিয়ে লিখুন)' : 'Tags (comma separated)'}
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Fintech, 2FA, Backup"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'bn' ? 'মুড / অবস্থা' : 'Mood'}
              </label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value as DiaryEntry['mood'])}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="productive">{language === 'bn' ? 'উৎপাদনশীল (Productive)' : 'Productive'}</option>
                <option value="satisfied">{language === 'bn' ? 'সন্তুষ্ট (Satisfied)' : 'Satisfied'}</option>
                <option value="busy">{language === 'bn' ? 'ব্যস্ত (Busy)' : 'Busy'}</option>
                <option value="reflective">{language === 'bn' ? 'চিন্তাশীল (Reflective)' : 'Reflective'}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'bn' ? 'নোটের বিস্তারিত বিবরণ *' : 'Note Content *'}
            </label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={language === 'bn' ? 'আজকের কাজ, হিসাব বা পরিকল্পনার বিস্তারিত বিবরণ লিখুন...' : 'Write your notes, work logs or plans...'}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 2FA Privacy Toggle */}
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {language === 'bn' ? 'গোপনীয় হিসেবে চিহ্নিত করুন (2FA সুরক্ষিত)' : 'Mark as Confidential (2FA Protected)'}
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {language === 'bn' ? 'এই নোটটি দেখতে টু-ফ্যাক্টর অথেনটিকেশন কোড প্রয়োজন হবে' : 'Requires 2FA code verification to reveal this note'}
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded-md focus:ring-blue-500 cursor-pointer"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
            >
              {language === 'bn' ? 'বাতিল' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
            >
              {language === 'bn' ? 'নোট সংরক্ষণ করুন' : 'Save Note'}
            </button>
          </div>
        </form>
      )}

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'bn' ? 'ডায়রী ও নোট খুঁজুন...' : 'Search diary & tags...'}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            {language === 'bn' ? 'সব নোট' : 'All'}
          </button>
          {(['work', 'financial', 'personal', 'idea'] as DiaryEntry['category'][]).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {language === 'bn' ? categoryLabels[cat].bn : categoryLabels[cat].en}
            </button>
          ))}
        </div>
      </div>

      {/* Diary Entries List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h4 className="font-bold text-slate-700 dark:text-slate-300 text-base">
              {language === 'bn' ? 'কোনো নোট পাওয়া যায়নি' : 'No diary entries found'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {language === 'bn' ? 'নতুন নোট লিখতে উপরের "নতুন নোট লিখুন" বাটনে ক্লিক করুন।' : 'Click the button above to write your first journal note.'}
            </p>
          </div>
        ) : (
          filteredEntries.map((entry) => {
            const isLocked = entry.isPrivate && !unlockedEntryIds.has(entry.id);
            return (
              <div
                key={entry.id}
                className={`p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border transition-all ${
                  entry.isPrivate 
                    ? 'border-amber-200/80 dark:border-amber-900/50 shadow-xs' 
                    : 'border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md ${categoryLabels[entry.category]?.color}`}>
                      {language === 'bn' ? categoryLabels[entry.category]?.bn : categoryLabels[entry.category]?.en}
                    </span>

                    {entry.isPrivate && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        {language === 'bn' ? '2FA সুরক্ষিত' : '2FA Protected'}
                      </span>
                    )}

                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {entry.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {entry.mood && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {entry.mood}
                      </span>
                    )}
                    <button
                      onClick={() => onDeleteEntry(entry.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h4 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg mb-2">
                  {entry.title}
                </h4>

                {/* Content View or 2FA Lock Screen */}
                {isLocked ? (
                  <div className="my-3 p-5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-amber-200/60 dark:border-amber-900/40 text-center space-y-3">
                    <ShieldAlert className="w-8 h-8 text-amber-500 mx-auto" />
                    <div>
                      <h5 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                        {language === 'bn' ? 'এই নোটটি গোপনীয় ও সুরক্ষিত' : 'This entry is 2FA Protected'}
                      </h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {language === 'bn' 
                          ? 'ডাটা নিরাপত্তার জন্য টু-ফ্যাক্টর অথেনটিকেশন কোড যাচাই করে আনলক করুন' 
                          : 'Verify your Two-Factor Authentication code to unlock and read this note'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleUnlockPrivateEntry(entry.id)}
                      className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs"
                    >
                      <Unlock className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? '2FA কোড দিয়ে আনলক করুন' : 'Unlock with 2FA'}</span>
                    </button>
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {entry.content}
                  </p>
                )}

                {/* Tags */}
                {entry.tags.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 flex-wrap">
                    <Tag className="w-3 h-3 text-slate-400" />
                    {entry.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
