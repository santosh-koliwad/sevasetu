'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientServices({ initialServices, categories, initialCategory, initialQuery }: any) {
  const { t } = useLanguage();
  const router = useRouter();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredServices, setFilteredServices] = useState(initialServices);

  useEffect(() => {
    let result = initialServices;
    if (selectedCategory) {
      result = result.filter((s: any) => s.category_id === selectedCategory);
    }
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter((s: any) => 
        (s.name_en && s.name_en.toLowerCase().includes(lowerSearch)) || 
        (s.name_kn && s.name_kn.toLowerCase().includes(lowerSearch)) ||
        (s.short_description_en && s.short_description_en.toLowerCase().includes(lowerSearch))
      );
    }
    setFilteredServices(result);
  }, [searchTerm, selectedCategory, initialServices]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filtering is handled by useEffect
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="bg-blue-900 rounded-3xl p-8 md:p-12 mb-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{t('Our Services', 'ನಮ್ಮ ಸೇವೆಗಳು')}</h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl">
              {t('Browse our wide range of digital and government assistance services.', 'ನಮ್ಮ ಡಿಜಿಟಲ್ ಮತ್ತು ಸರ್ಕಾರಿ ಸಹಾಯ ಸೇವೆಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ.')}
            </p>
            
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 max-w-3xl">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder={t('Search services (e.g., Aadhaar, PAN)...', 'ಸೇವೆಗಳನ್ನು ಹುಡುಕಿ (ಉದಾ: ಆಧಾರ್, ಪ್ಯಾನ್)...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/50"
                />
              </div>
              <div className="relative md:w-64">
                <Filter className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                  }}
                  className="w-full pl-12 pr-4 py-3 rounded-xl text-slate-900 outline-none focus:ring-4 focus:ring-blue-500/50 appearance-none bg-white"
                >
                  <option value="">{t('All Categories', 'ಎಲ್ಲಾ ವರ್ಗಗಳು')}</option>
                  {categories.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>{t(cat.name_en, cat.name_kn)}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors whitespace-nowrap">
                {t('Search', 'ಹುಡುಕಿ')}
              </button>
            </form>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">
            {filteredServices.length} {t('services found', 'ಸೇವೆಗಳು ಕಂಡುಬಂದಿವೆ')}
          </h2>
        </div>

        {filteredServices.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-700 mb-2">{t('No services found', 'ಯಾವುದೇ ಸೇವೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ')}</h3>
            <p className="text-slate-500">{t('Try adjusting your search or filters.', 'ನಿಮ್ಮ ಹುಡುಕಾಟವನ್ನು ಸರಿಹೊಂದಿಸಲು ಪ್ರಯತ್ನಿಸಿ.')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredServices.map((service: any, index: number) => {
              // Assign a vibrant color based on index for the grid look
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
        )}
      </div>
    </div>
  );
}
