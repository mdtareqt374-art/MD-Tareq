import React, { useState } from 'react';
import { 
  Building2, 
  ExternalLink, 
  Maximize2, 
  Copy, 
  Check, 
  ShieldCheck, 
  Layers, 
  X, 
  Globe 
} from 'lucide-react';
import { BankingPortal, AppLanguage } from '../types';

interface BankingMenuModalProps {
  portals: BankingPortal[];
  isOpen: boolean;
  onClose: () => void;
  language: AppLanguage;
  onLogSecurity?: (action: string) => void;
}

export const BankingMenuModal: React.FC<BankingMenuModalProps> = ({
  portals,
  isOpen,
  onClose,
  language,
  onLogSecurity,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeIframeUrl, setActiveIframeUrl] = useState<string | null>(null);
  const [activeIframeTitle, setActiveIframeTitle] = useState<string>('');

  if (!isOpen) return null;

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleOpenEmbedded = (portal: BankingPortal) => {
    setActiveIframeUrl(portal.url);
    setActiveIframeTitle(language === 'bn' ? portal.nameBn : portal.nameEn);
    if (onLogSecurity) {
      onLogSecurity(`ব্যাংকিং পোর্টাল খোলা হয়েছে: ${portal.nameBn}`);
    }
  };

  return (
    <div id="banking-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="banking-modal-container"
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {language === 'bn' ? '৪টি ব্যাংকিং হিসাব কার্যক্রমের পোর্টাল' : '4 Banking Account Portals'}
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-medium">
                  {language === 'bn' ? 'সরাসরি লিঙ্ক' : 'Live Links'}
                </span>
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {language === 'bn' 
                  ? 'আপনার অ্যাপের সাথে সরাসরি সংযুক্ত চারটি নির্ভরযোগ্য ব্যাংকিং সিস্টেম'
                  : 'Four secure banking systems linked directly with this platform'}
              </p>
            </div>
          </div>
          <button
            id="close-banking-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portals.map((portal, index) => (
              <div
                key={portal.id}
                id={`banking-portal-card-${portal.id}`}
                className="group relative bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 rounded-xl p-5 hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      {language === 'bn' ? `পোর্টাল ${index + 1}` : `Portal 0${index + 1}`}
                    </span>
                    <span className="text-[11px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-sm font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      {portal.lastActive}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {language === 'bn' ? portal.nameBn : portal.nameEn}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {language === 'bn' ? portal.descriptionBn : portal.descriptionEn}
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-900/90 rounded-lg p-2.5 mb-4 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <span>{language === 'bn' ? 'অ্যাকাউন্ট ধরণ:' : 'Account Type:'}</span>
                      <span className="font-medium text-slate-700 dark:text-slate-300">{portal.accountType}</span>
                    </div>
                    <div className="text-[11px] font-mono text-blue-600 dark:text-blue-400 truncate flex items-center gap-1">
                      <Globe className="w-3 h-3 shrink-0" />
                      <span className="truncate">{portal.url}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-2">
                  <a
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (onLogSecurity) {
                        onLogSecurity(`বাহ্যিক ব্যাংকিং পোর্টালে ভিজিট: ${portal.nameBn}`);
                      }
                    }}
                    className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    <span>{language === 'bn' ? 'নতুন ট্যাবে খুলুন' : 'Open in New Tab'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => handleOpenEmbedded(portal)}
                    title={language === 'bn' ? 'অ্যাপের ভেতরেই প্রিভিউ দেখুন' : 'Embedded Applet View'}
                    className="p-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{language === 'bn' ? 'প্রিভিউ' : 'Preview'}</span>
                  </button>

                  <button
                    onClick={() => handleCopy(portal.id, portal.url)}
                    title={language === 'bn' ? 'লিঙ্ক কপি করুন' : 'Copy URL'}
                    className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    {copiedId === portal.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>{language === 'bn' ? 'সকল পোর্টাল এসএসএল এনক্রিপ্টেড ও সুরক্ষিত' : 'All portals are SSL secured and isolated'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 font-medium transition-colors"
          >
            {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>

      {/* Embedded Iframe Modal */}
      {activeIframeUrl && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full h-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-700">
            <div className="p-3 sm:p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                <Building2 className="w-5 h-5 text-blue-400 shrink-0" />
                <span className="font-semibold text-sm sm:text-base truncate">{activeIframeTitle}</span>
                <span className="text-[11px] font-mono text-slate-400 hidden md:inline truncate">{activeIframeUrl}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={activeIframeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:px-3 sm:py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs flex items-center gap-1 transition-colors"
                >
                  <span className="hidden sm:inline">{language === 'bn' ? 'বাইরে ওপেন করুন' : 'Open in New Tab'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setActiveIframeUrl(null)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 w-full bg-slate-950 relative">
              <iframe
                src={activeIframeUrl}
                title={activeIframeTitle}
                className="w-full h-full border-none"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
