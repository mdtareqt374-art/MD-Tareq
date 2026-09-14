import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Plus, 
  Trash2, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Download, 
  Building2, 
  Check, 
  DollarSign, 
  CreditCard 
} from 'lucide-react';
import { FinancialTransaction, AppLanguage } from '../types';

interface FinancialAccountingProps {
  transactions: FinancialTransaction[];
  onAddTransaction: (txn: Omit<FinancialTransaction, 'id'>) => void;
  onDeleteTransaction: (id: string) => void;
  language: AppLanguage;
  onOpenBanking: () => void;
}

export const FinancialAccounting: React.FC<FinancialAccountingProps> = ({
  transactions,
  onAddTransaction,
  onDeleteTransaction,
  language,
  onOpenBanking,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Form states
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState('ব্যাংক ট্রান্সফার (Bank Transfer)');
  const [notes, setNotes] = useState('');

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!title.trim() || isNaN(parsedAmount) || parsedAmount <= 0) return;

    onAddTransaction({
      title,
      amount: parsedAmount,
      type,
      category: category || (type === 'income' ? 'প্রজেক্ট রেভিনিউ' : 'অফিস খরচ'),
      date,
      paymentMethod,
      notes: notes || undefined,
    });

    setTitle('');
    setAmount('');
    setNotes('');
    setIsAdding(false);
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchesType = filterType === 'all' || t.type === filterType;
    const matchesCategory = filterCategory === 'all' || t.category === filterCategory;
    return matchesType && matchesCategory;
  });

  const categories = Array.from(new Set(transactions.map((t) => t.category)));

  const formatCurrency = (val: number) => {
    return `৳ ${val.toLocaleString('bn-BD')}`;
  };

  const handleExportCSV = () => {
    const headers = 'ID,Title,Type,Amount,Category,Date,PaymentMethod,Notes\n';
    const rows = transactions
      .map(
        (t) =>
          `"${t.id}","${t.title}","${t.type}",${t.amount},"${t.category}","${t.date}","${t.paymentMethod}","${t.notes || ''}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `MD_Tareq_Financial_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 rounded-2xl shadow-md border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>MD Tareq Financial Ledger</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            {language === 'bn' ? 'কাজ কর্ম ও আয়-ব্যয়ের হিসাব-নিকাশ' : 'Work & Financial Accounting'}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            {language === 'bn'
              ? 'ব্যক্তিগত কাজ ও ব্যবসার আয়-ব্যয়ের লেজার, ক্যাশফ্লো এবং ব্যাংকিং হিসাব সমন্বয়'
              : 'Personal & business ledger, cashflow tracker, and banking reconciliation'}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <button
            onClick={onOpenBanking}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Building2 className="w-4 h-4" />
            <span>{language === 'bn' ? '৪টি ব্যাংকিং পোর্টাল' : '4 Banking Portals'}</span>
          </button>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'bn' ? 'নতুন হিসাব যুক্ত করুন' : 'Add Transaction'}</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Total Income */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
              {language === 'bn' ? 'মোট আয় (Total Income)' : 'Total Income'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {formatCurrency(totalIncome)}
            </span>
            <span className="text-[11px] text-emerald-500 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              {language === 'bn' ? 'সফল প্রাপ্তি' : 'Received Inflow'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ArrowDownLeft className="w-6 h-6" />
          </div>
        </div>

        {/* Total Expense */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
              {language === 'bn' ? 'মোট ব্যয় (Total Expense)' : 'Total Expense'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400">
              {formatCurrency(totalExpense)}
            </span>
            <span className="text-[11px] text-rose-500 flex items-center gap-1 mt-1">
              <TrendingDown className="w-3 h-3" />
              {language === 'bn' ? 'পরিশোধিত খরচ' : 'Outflow Expenses'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </div>

        {/* Net Balance */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
              {language === 'bn' ? 'বর্তমান উদ্বৃত্ত (Net Balance)' : 'Net Balance'}
            </span>
            <span className={`text-xl sm:text-2xl font-black ${netBalance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-amber-500'}`}>
              {formatCurrency(netBalance)}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
              <Wallet className="w-3 h-3" />
              {language === 'bn' ? 'হাতে নগদ ও ব্যাংক জমা' : 'Liquid Funds & Bank Balance'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Wallet className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Add Transaction Form */}
      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-blue-200 dark:border-blue-900/60 p-6 shadow-lg animate-in slide-in-from-top-3 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-600" />
              {language === 'bn' ? 'নতুন লেনদেনের হিসাব যোগ করুন' : 'Add Financial Transaction'}
            </h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setType('income')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  type === 'income' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {language === 'bn' ? 'আয় (Income)' : 'Income'}
              </button>
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  type === 'expense' ? 'bg-rose-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {language === 'bn' ? 'ব্যয় (Expense)' : 'Expense'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'bn' ? 'বিবরণ / শিরোনাম *' : 'Description / Title *'}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={language === 'bn' ? 'যেমন: ফিনটেক কনসাল্টিং ফি' : 'e.g. Consulting fee'}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'bn' ? 'টাকার পরিমাণ (৳) *' : 'Amount (৳) *'}
              </label>
              <input
                type="number"
                required
                min="1"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="5000"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'bn' ? 'ক্যাটাগরি' : 'Category'}
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder={type === 'income' ? 'প্রজেক্ট বিল / বেতন' : 'সার্ভার / অফিস খরচ'}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'bn' ? 'পেমেন্ট মেথড / মাধ্যম' : 'Payment Method'}
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="ব্যাংক ট্রান্সফার (Bank Transfer)">ব্যাংক ট্রান্সফার (Bank Transfer)</option>
                <option value="ব্যাংকিং পোর্টাল ১ (Portal 01)">ব্যাংকিং পোর্টাল ১ (Portal 01)</option>
                <option value="ব্যাংকিং পোর্টাল ২ (Portal 02)">ব্যাংকিং পোর্টাল ২ (Portal 02)</option>
                <option value="ব্যাংকিং পোর্টাল ৩ (Portal 03)">ব্যাংকিং পোর্টাল ৩ (Portal 03)</option>
                <option value="ব্যাংকিং পোর্টাল ৪ (Portal 04)">ব্যাংকিং পোর্টাল ৪ (Portal 04)</option>
                <option value="ক্যাশ / নগদ (Cash)">ক্যাশ / নগদ (Cash)</option>
                <option value="কার্ড / ক্রেডিট কার্ড (Card)">কার্ড / ক্রেডিট কার্ড (Card)</option>
              </select>
            </div>

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
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {language === 'bn' ? 'মন্তব্য বা চালান রেফারেন্স' : 'Notes / Reference'}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={language === 'bn' ? 'ইনভয়েস বা ব্যাংক চালান নম্বর...' : 'Invoice or voucher number...'}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
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
              {language === 'bn' ? 'হিসাব সংরক্ষণ করুন' : 'Save Transaction'}
            </button>
          </div>
        </form>
      )}

      {/* Filter and Export Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterType === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            {language === 'bn' ? 'সব হিসাব' : 'All'}
          </button>
          <button
            onClick={() => setFilterType('income')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterType === 'income'
                ? 'bg-emerald-600 text-white'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            {language === 'bn' ? 'শুধুমাত্র আয়' : 'Income Only'}
          </button>
          <button
            onClick={() => setFilterType('expense')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterType === 'expense'
                ? 'bg-rose-600 text-white'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            {language === 'bn' ? 'শুধুমাত্র ব্যয়' : 'Expense Only'}
          </button>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'রিপোর্ট ডাউনলোড (CSV)' : 'Export CSV'}</span>
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">{language === 'bn' ? 'তারিখ' : 'Date'}</th>
                <th className="py-3 px-4">{language === 'bn' ? 'বিবরণ' : 'Description'}</th>
                <th className="py-3 px-4">{language === 'bn' ? 'ক্যাটাগরি' : 'Category'}</th>
                <th className="py-3 px-4">{language === 'bn' ? 'পেমেন্ট মাধ্যম' : 'Method'}</th>
                <th className="py-3 px-4 text-right">{language === 'bn' ? 'পরিমাণ' : 'Amount'}</th>
                <th className="py-3 px-4 text-center">{language === 'bn' ? 'অ্যাকশন' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    {language === 'bn' ? 'কোনো লেনদেন রেকর্ড পাওয়া যায়নি' : 'No transactions recorded'}
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((t) => {
                  const isIncome = t.type === 'income';
                  return (
                    <tr
                      key={t.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="py-3 px-4 whitespace-nowrap text-slate-500 dark:text-slate-400">
                        {t.date}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                        <div>{t.title}</div>
                        {t.notes && (
                          <div className="text-[11px] text-slate-400 font-normal mt-0.5">
                            {t.notes}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px]">
                          {t.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-slate-600 dark:text-slate-400">
                        {t.paymentMethod}
                      </td>
                      <td className={`py-3 px-4 whitespace-nowrap text-right font-bold ${
                        isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}>
                        {isIncome ? `+ ${formatCurrency(t.amount)}` : `- ${formatCurrency(t.amount)}`}
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => onDeleteTransaction(t.id)}
                          className="p-1 rounded-md text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
