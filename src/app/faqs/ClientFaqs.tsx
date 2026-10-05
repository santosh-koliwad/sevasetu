'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircleQuestion } from 'lucide-react';

export default function ClientFaqs({ faqs }: any) {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageCircleQuestion className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">{t('Frequently Asked Questions', 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು')}</h1>
          <p className="text-slate-600">
            {t('Find answers to common questions about our digital services.', 'ನಮ್ಮ ಡಿಜಿಟಲ್ ಸೇವೆಗಳ ಬಗ್ಗೆ ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಗಳನ್ನು ಹುಡುಕಿ.')}
          </p>
        </div>

        {faqs.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-2xl border border-slate-200 text-slate-500">
            {t('No FAQs available at the moment.', 'ಪ್ರಸ್ತುತ ಯಾವುದೇ FAQ ಗಳು ಲಭ್ಯವಿಲ್ಲ.')}
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((faq: any) => (
              <div key={faq.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all">
                <button
                  className="w-full px-6 py-5 text-left font-semibold text-slate-900 hover:bg-slate-50 flex justify-between items-center transition-colors"
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                >
                  <span className="pr-8">{t(faq.question_en, faq.question_kn)}</span>
                  {openFaq === faq.id ? 
                    <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" /> : 
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  }
                </button>
                {openFaq === faq.id && (
                  <div className="px-6 py-5 bg-slate-50 text-slate-700 border-t border-slate-100">
                    {t(faq.answer_en, faq.answer_kn)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
