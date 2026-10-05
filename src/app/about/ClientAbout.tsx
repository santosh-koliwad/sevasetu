'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Info, Shield, Users, Zap } from 'lucide-react';

export default function ClientAbout({ settings }: any) {
  const { t } = useLanguage();

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{t('About Us', 'ನಮ್ಮ ಬಗ್ಗೆ')}</h1>
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed text-left md:text-center">
              {t(settings.about_en, settings.about_kn)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{t('Fast & Efficient', 'ವೇಗ ಮತ್ತು ದಕ್ಷ')}</h3>
            <p className="text-slate-600">
              {t('We streamline complex digital processes to save your time and effort.', 'ನಿಮ್ಮ ಸಮಯ ಮತ್ತು ಶ್ರಮವನ್ನು ಉಳಿಸಲು ನಾವು ಸಂಕೀರ್ಣ ಡಿಜಿಟಲ್ ಪ್ರಕ್ರಿಯೆಗಳನ್ನು ಸರಳಗೊಳಿಸುತ್ತೇವೆ.')}
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{t('Reliable Guidance', 'ವಿಶ್ವಾಸಾರ್ಹ ಮಾರ್ಗದರ್ಶನ')}</h3>
            <p className="text-slate-600">
              {t('Accurate information and step-by-step assistance for all services.', 'ಎಲ್ಲಾ ಸೇವೆಗಳಿಗೆ ನಿಖರವಾದ ಮಾಹಿತಿ ಮತ್ತು ಹಂತ-ಹಂತದ ಸಹಾಯ.')}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{t('Citizen First', 'ನಾಗರಿಕರಿಗೆ ಆದ್ಯತೆ')}</h3>
            <p className="text-slate-600">
              {t('Dedicated to making digital services accessible to everyone.', 'ಡಿಜಿಟಲ್ ಸೇವೆಗಳನ್ನು ಎಲ್ಲರಿಗೂ ತಲುಪುವಂತೆ ಮಾಡಲು ಸಮರ್ಪಿತವಾಗಿದೆ.')}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
