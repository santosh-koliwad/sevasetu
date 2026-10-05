'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { createClient } from '@/utils/supabase/client';
import { ArrowLeft, CheckSquare, Clock, Info, CreditCard, ChevronDown, ChevronUp, Send } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientServiceDetail({ service, documents, faqs }: any) {
  const { t } = useLanguage();
  const router = useRouter();
  const supabase = createClient();
  
  const [openFaq, setOpenFaq] = useState<string | null>(null);
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
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link href="/services" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('Back to Services', 'ಸೇವೆಗಳಿಗೆ ಹಿಂತಿರುಗಿ')}
        </Link>

        {/* Header */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-6 items-start">
          <div className="text-6xl bg-blue-50 p-4 rounded-2xl shrink-0">
            {service.icon || '📄'}
          </div>
          <div className="flex-grow">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-3">
              {t(service.categories?.name_en, service.categories?.name_kn)}
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {t(service.name_en, service.name_kn)}
            </h1>
            <p className="text-lg text-slate-600 mb-6">
              {t(service.short_description_en, service.short_description_kn)}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setShowRequestModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2 shadow-md shadow-blue-500/20"
              >
                <Send className="w-5 h-5" />
                {t('Request Assistance', 'ಸಹಾಯವನ್ನು ವಿನಂತಿಸಿ')}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                {t('Overview', 'ಅವಲೋಕನ')}
              </h2>
              <div className="prose prose-slate prose-blue max-w-none text-slate-700 whitespace-pre-wrap">
                {t(service.description_en, service.description_kn) || t('No detailed description provided.', 'ಯಾವುದೇ ವಿವರವಾದ ವಿವರಣೆಯನ್ನು ಒದಗಿಸಿಲ್ಲ.')}
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 border-l-4 border-l-blue-500">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-blue-600" />
                {t('Required Documents / Information', 'ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳು / ಮಾಹಿತಿ')}
              </h2>
              {documents.length > 0 ? (
                <ul className="space-y-3">
                  {documents.map((doc: any) => (
                    <li key={doc.id} className="flex items-start gap-3">
                      <div className="mt-0.5 text-green-500">
                        <CheckSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">
                          {t(doc.document_name_en, doc.document_name_kn)}
                          {doc.required && <span className="text-red-500 ml-1 text-sm">*</span>}
                        </p>
                        {(doc.description_en || doc.description_kn) && (
                          <p className="text-sm text-slate-500 mt-1">
                            {t(doc.description_en, doc.description_kn)}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500">{t('Please contact the centre for document requirements.', 'ದಾಖಲೆಗಳ ಅಗತ್ಯತೆಗಳಿಗಾಗಿ ದಯವಿಟ್ಟು ಕೇಂದ್ರವನ್ನು ಸಂಪರ್ಕಿಸಿ.')}</p>
              )}
              
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg text-sm text-yellow-800 border border-yellow-100">
                <strong>{t('Note:', 'ಸೂಚನೆ:')}</strong> {t('Requirements may vary depending on the specific case and official rules.', 'ನಿರ್ದಿಷ್ಟ ಪ್ರಕರಣ ಮತ್ತು ಅಧಿಕೃತ ನಿಯಮಗಳನ್ನು ಅವಲಂಬಿಸಿ ಅಗತ್ಯತೆಗಳು ಬದಲಾಗಬಹುದು.')}
              </div>
            </div>

            {/* Instructions */}
            {(service.instructions_en || service.instructions_kn) && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-4">{t('Important Instructions', 'ಪ್ರಮುಖ ಸೂಚನೆಗಳು')}</h2>
                <div className="whitespace-pre-wrap text-slate-700 bg-slate-50 p-4 rounded-lg">
                  {t(service.instructions_en, service.instructions_kn)}
                </div>
              </div>
            )}

            {/* FAQs */}
            {faqs.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-6">{t('Frequently Asked Questions', 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು')}</h2>
                <div className="space-y-4">
                  {faqs.map((faq: any) => (
                    <div key={faq.id} className="border border-slate-200 rounded-lg overflow-hidden">
                      <button
                        className="w-full px-5 py-4 text-left font-medium text-slate-900 bg-slate-50 hover:bg-slate-100 flex justify-between items-center transition-colors"
                        onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                      >
                        {t(faq.question_en, faq.question_kn)}
                        {openFaq === faq.id ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                      </button>
                      {openFaq === faq.id && (
                        <div className="px-5 py-4 bg-white text-slate-700 border-t border-slate-200">
                          {t(faq.answer_en, faq.answer_kn)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">{t('Quick Info', 'ತ್ವರಿತ ಮಾಹಿತಿ')}</h3>
              
              <div className="mb-4">
                <div className="flex items-center gap-2 text-slate-700 font-medium mb-1">
                  <Clock className="w-4 h-4 text-blue-600" />
                  {t('Estimated Processing Time', 'ಅಂದಾಜು ಪ್ರಕ್ರಿಯೆ ಸಮಯ')}
                </div>
                <p className="text-sm text-slate-600 pl-6">
                  {t(service.processing_time_en, service.processing_time_kn) || t('Varies by department', 'ಇಲಾಖೆಗೆ ಅನುಗುಣವಾಗಿ ಬದಲಾಗುತ್ತದೆ')}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-slate-700 font-medium mb-1">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  {t('Fees Information', 'ಶುಲ್ಕದ ಮಾಹಿತಿ')}
                </div>
                <p className="text-sm text-slate-600 pl-6">
                  {t(service.fee_information_en, service.fee_information_kn) || t('Official fee + service charge applicable', 'ಅಧಿಕೃತ ಶುಲ್ಕ + ಸೇವಾ ಶುಲ್ಕ ಅನ್ವಯಿಸುತ್ತದೆ')}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-2">{t('Need Help?', 'ಸಹಾಯ ಬೇಕೇ?')}</h3>
              <p className="text-sm text-blue-800 mb-4">
                {t('Contact our centre for direct assistance with this service.', 'ಈ ಸೇವೆಯೊಂದಿಗೆ ನೇರ ಸಹಾಯಕ್ಕಾಗಿ ನಮ್ಮ ಕೇಂದ್ರವನ್ನು ಸಂಪರ್ಕಿಸಿ.')}
              </p>
              <Link href="/contact" className="block w-full text-center bg-white border border-blue-200 text-blue-700 font-medium py-2 rounded-lg hover:bg-blue-50 transition-colors">
                {t('Contact Us', 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-900">{t('Request Assistance', 'ಸಹಾಯವನ್ನು ವಿನಂತಿಸಿ')}</h3>
              <button onClick={() => setShowRequestModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            
            <div className="p-6">
              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckSquare className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">{t('Request Sent!', 'ವಿನಂತಿಯನ್ನು ಕಳುಹಿಸಲಾಗಿದೆ!')}</h4>
                  <p className="text-slate-600">{t('We will contact you shortly.', 'ನಾವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitError && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">{submitError}</div>}
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('Full Name', 'ಪೂರ್ಣ ಹೆಸರು')} *</label>
                    <input required type="text" value={requestData.name} onChange={e => setRequestData({...requestData, name: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('Mobile Number', 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ')} *</label>
                    <input required type="tel" value={requestData.mobile} onChange={e => setRequestData({...requestData, mobile: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('Preferred Visit Date', 'ಆದ್ಯತೆಯ ಭೇಟಿಯ ದಿನಾಂಕ')} ({t('Optional', 'ಐಚ್ಛಿಕ')})</label>
                    <input type="date" value={requestData.date} onChange={e => setRequestData({...requestData, date: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('Additional Message', 'ಹೆಚ್ಚುವರಿ ಸಂದೇಶ')} ({t('Optional', 'ಐಚ್ಛಿಕ')})</label>
                    <textarea rows={3} value={requestData.message} onChange={e => setRequestData({...requestData, message: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-xs text-slate-500 mb-4">
                      {t('Do not include sensitive information like Aadhaar number in this form. Just provide basic details.', 'ಈ ಫಾರ್ಮ್‌ನಲ್ಲಿ ಆಧಾರ್ ಸಂಖ್ಯೆಯಂತಹ ಸೂಕ್ಷ್ಮ ಮಾಹಿತಿಯನ್ನು ಸೇರಿಸಬೇಡಿ. ಕೇವಲ ಮೂಲಭೂತ ವಿವರಗಳನ್ನು ಒದಗಿಸಿ.')}
                    </p>
                    <button type="submit" disabled={submitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50">
                      {submitting ? t('Sending...', 'ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...') : t('Submit Request', 'ವಿನಂತಿಯನ್ನು ಸಲ್ಲಿಸಿ')}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
