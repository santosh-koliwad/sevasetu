'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { FileText, CheckCircle2, UserPlus, Send } from 'lucide-react';

export default function ClientHome({ settings, allServices }: any) {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            {t(settings?.hero_title_en, settings?.hero_title_kn)}
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10">
            {t(settings?.hero_description_en, settings?.hero_description_kn)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services" className="px-8 py-3 bg-white text-blue-900 font-bold rounded-lg shadow-lg hover:bg-blue-50 transition-colors text-lg">
              {t('Explore Services', 'ಸೇವೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ')}
            </Link>
            <Link href="/contact" className="px-8 py-3 bg-blue-700 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 border border-blue-500 transition-colors text-lg">
              {t('Contact Us', 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ')}
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">{t('How It Works', 'ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ')}</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: UserPlus, title: t('1. Login', '೧. ಲಾಗಿನ್'), desc: t('Sign in securely with Google.', 'ಗೂಗಲ್ ಬಳಸಿ ಸುರಕ್ಷಿತವಾಗಿ ಸೈನ್ ಇನ್ ಮಾಡಿ.') },
              { icon: FileText, title: t('2. Select Service', '೨. ಸೇವೆ ಆಯ್ಕೆಮಾಡಿ'), desc: t('Choose the service you need assistance with.', 'ನಿಮಗೆ ಸಹಾಯ ಬೇಕಾದ ಸೇವೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.') },
              { icon: CheckCircle2, title: t('3. Check Documents', '೩. ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ'), desc: t('See what documents you should bring.', 'ನೀವು ತರಬೇಕಾದ ದಾಖಲೆಗಳನ್ನು ನೋಡಿ.') },
              { icon: Send, title: t('4. Visit / Contact', '೪. ಭೇಟಿ ನೀಡಿ / ಸಂಪರ್ಕಿಸಿ'), desc: t('Visit the centre or contact us.', 'ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ ಅಥವಾ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.') }
            ].map((step, idx) => (
              <div key={idx} className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">{t('Available Services', 'ಲಭ್ಯವಿರುವ ಸೇವೆಗಳು')}</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {allServices?.map((service: any, index: number) => {
              const colors = [
                'bg-blue-500', 'bg-green-500', 'bg-amber-500', 'bg-purple-500', 
                'bg-rose-500', 'bg-teal-500', 'bg-indigo-500', 'bg-orange-500'
              ];
              const bgColor = colors[index % colors.length];

              return (
                <Link 
                  key={service.id} 
                  href={`/services/${service.id}`}
                  className={`${bgColor} rounded-3xl p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 flex flex-col items-center justify-center text-center aspect-square`}
                >
                  <div className="bg-white/20 p-4 rounded-full mb-4">
                    <span className="text-5xl md:text-6xl text-white drop-shadow-md">
                      {service.icon || '📝'}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-extrabold text-white leading-tight drop-shadow-sm">
                    {t(service.name_en, service.name_kn)}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
