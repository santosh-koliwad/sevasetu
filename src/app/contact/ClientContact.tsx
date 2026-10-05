'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export default function ClientContact({ settings }: any) {
  const { t } = useLanguage();

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">{t('Contact Us', 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ')}</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            {t('Have a question or need assistance with a service? Reach out to us or visit our centre.', 'ಪ್ರಶ್ನೆ ಇದೆಯೇ ಅಥವಾ ಸೇವೆಯ ಸಹಾಯ ಬೇಕೇ? ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ ಅಥವಾ ನಮ್ಮ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{t('Get In Touch', 'ಸಂಪರ್ಕದಲ್ಲಿರಿ')}</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-xl text-blue-600 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{t('Visit Our Centre', 'ನಮ್ಮ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ')}</h3>
                  <p className="text-slate-600 mt-1">{t(settings.address_en, settings.address_kn) || 'Address not updated'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-xl text-blue-600 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{t('Call Us', 'ನಮಗೆ ಕರೆ ಮಾಡಿ')}</h3>
                  <p className="text-slate-600 mt-1">{settings.phone || 'Phone not updated'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-xl text-green-600 shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{t('WhatsApp', 'ವಾಟ್ಸಾಪ್')}</h3>
                  <p className="text-slate-600 mt-1">+{settings.whatsapp || 'Not updated'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-xl text-blue-600 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{t('Email', 'ಇಮೇಲ್')}</h3>
                  <p className="text-slate-600 mt-1">{settings.email || 'Email not updated'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-xl text-purple-600 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{t('Opening Hours', 'ಕಾರ್ಯಾಚರಣೆಯ ಸಮಯ')}</h3>
                  <p className="text-slate-600 mt-1">{settings.opening_hours || 'Not updated'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder or direct contact CTA */}
          <div className="bg-blue-900 rounded-2xl p-8 text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">{t('Ready to get started?', 'ಪ್ರಾರಂಭಿಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ?')}</h3>
              <p className="text-blue-100 mb-8 max-w-sm">
                {t('Login to your account to request services online, or visit us directly.', 'ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಸೇವೆಗಳನ್ನು ವಿನಂತಿಸಲು ನಿಮ್ಮ ಖಾತೆಗೆ ಲಾಗಿನ್ ಮಾಡಿ, ಅಥವಾ ನೇರವಾಗಿ ನಮ್ಮನ್ನು ಭೇಟಿ ಮಾಡಿ.')}
              </p>
              {settings.whatsapp && (
                <a 
                  href={`https://wa.me/${settings.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition-colors inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t('Chat on WhatsApp', 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಚಾಟ್ ಮಾಡಿ')}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
