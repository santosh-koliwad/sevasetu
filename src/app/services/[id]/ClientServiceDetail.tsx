'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { createClient } from '@/utils/supabase/client';
import { ArrowLeft, CheckSquare, Send } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientServiceDetail({ service, documents }: any) {
  const { t } = useLanguage();
  const router = useRouter();
  const supabase = createClient();
  
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestData, setRequestData] = useState({ name: '', mobile: '', email: '', date: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login');
      return;
    }

    const { error } = await supabase.from('service_requests').insert({
      user_id: user.id,
      service_id: service.id,
      customer_name: requestData.name,
      mobile: requestData.mobile,
      email: requestData.email,
      preferred_date: requestData.date || null,
      message: requestData.message
    });

    setSubmitting(false);

    if (error) {
      setSubmitError(error.message);
    } else {
      setSubmitSuccess(true);
      setTimeout(() => {
        setShowRequestModal(false);
        setSubmitSuccess(false);
        router.push('/dashboard');
      }, 3000);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Massive Header */}
      <div className="bg-blue-600 text-white pt-6 pb-12 px-4 rounded-b-3xl shadow-lg text-center relative">
        <div className="max-w-xl mx-auto">
          <Link href="/services" className="absolute top-6 left-4 p-2 text-white/80 hover:text-white">
            <ArrowLeft className="w-8 h-8" />
          </Link>
          <div className="bg-white/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm shadow-inner">
            <span className="text-6xl drop-shadow-md">{service.icon || '📄'}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 drop-shadow-md">
            {t(service.name_en, service.name_kn)}
          </h1>
          <div className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-sm font-bold backdrop-blur-sm">
            {t(service.categories?.name_en, service.categories?.name_kn)}
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 -mt-6">
        {/* Documents Section */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center border-b-2 border-slate-100 pb-4">
            {t('Required Documents', 'ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳು')}
          </h2>
          
          {documents.length > 0 ? (
            <div className="space-y-4">
              {documents.map((doc: any, idx: number) => (
                <div key={doc.id} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 shrink-0 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xl">
                    {idx + 1}
                  </div>
                  <div className="flex-grow">
                    <p className="font-bold text-lg text-slate-900 leading-tight">
                      {t(doc.document_name_en, doc.document_name_kn)}
                      {doc.required && <span className="text-red-500 ml-1">*</span>}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500 font-medium py-4 text-lg">
              {t('Contact centre for documents', 'ದಾಖಲೆಗಳಿಗಾಗಿ ಕೇಂದ್ರವನ್ನು ಸಂಪರ್ಕಿಸಿ')}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button 
            onClick={() => setShowRequestModal(true)}
            className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white py-5 rounded-full font-extrabold text-2xl shadow-[0_8px_0_rgb(21,128,61)] hover:shadow-[0_4px_0_rgb(21,128,61)] hover:translate-y-1 transition-all flex items-center justify-center gap-3"
          >
            <Send className="w-8 h-8" />
            {t('APPLY NOW', 'ಈಗಲೇ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ')}
          </button>

          <Link 
            href="/contact"
            className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white py-5 rounded-full font-extrabold text-2xl shadow-[0_8px_0_rgb(29,78,216)] hover:shadow-[0_4px_0_rgb(29,78,216)] hover:translate-y-1 transition-all flex items-center justify-center gap-3 block text-center"
          >
            {t('CALL FOR HELP', 'ಸಹಾಯಕ್ಕಾಗಿ ಕರೆ ಮಾಡಿ')}
          </Link>
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border-4 border-green-500">
            <div className="p-6 bg-green-500 text-white flex justify-between items-center">
              <h3 className="font-bold text-xl">{t('Apply Now', 'ಅರ್ಜಿ ಸಲ್ಲಿಸಿ')}</h3>
              <button onClick={() => setShowRequestModal(false)} className="text-white/80 hover:text-white bg-green-600 w-8 h-8 rounded-full flex items-center justify-center">✕</button>
            </div>
            
            <div className="p-6">
              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckSquare className="w-12 h-12" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">{t('Sent!', 'ಕಳುಹಿಸಲಾಗಿದೆ!')}</h4>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitError && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">{submitError}</div>}
                  
                  <div>
                    <label className="block font-bold text-slate-700 mb-2 text-lg">{t('Full Name', 'ಪೂರ್ಣ ಹೆಸರು')}</label>
                    <input required type="text" value={requestData.name} onChange={e => setRequestData({...requestData, name: e.target.value})} className="w-full p-4 border-2 border-slate-300 rounded-xl outline-none focus:border-green-500 text-lg font-bold" />
                  </div>
                  
                  <div>
                    <label className="block font-bold text-slate-700 mb-2 text-lg">{t('Mobile Number', 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ')}</label>
                    <input required type="tel" value={requestData.mobile} onChange={e => setRequestData({...requestData, mobile: e.target.value})} className="w-full p-4 border-2 border-slate-300 rounded-xl outline-none focus:border-green-500 text-lg font-bold tracking-widest" />
                  </div>
                  
                  <button type="submit" disabled={submitting} className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-extrabold py-5 rounded-full transition-colors disabled:opacity-50 text-xl shadow-[0_6px_0_rgb(21,128,61)] active:translate-y-1 active:shadow-[0_2px_0_rgb(21,128,61)]">
                    {submitting ? t('Sending...', 'ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...') : t('Submit Details', 'ವಿವರಗಳನ್ನು ಸಲ್ಲಿಸಿ')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
