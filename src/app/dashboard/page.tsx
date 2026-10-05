'use client';
import { useLanguage } from '@/contexts/LanguageContext';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogOut, FileText, Clock, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { t } = useLanguage();
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserAndRequests = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data } = await supabase
          .from('service_requests')
          .select('*, services(name_en, name_kn)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (data) setRequests(data);
      } else {
        router.push('/login');
      }
    };
    fetchUserAndRequests();
  }, [supabase, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (!user) return <div className="p-8 text-center">Loading...</div>;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Contacted': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-purple-100 text-purple-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <img src={user.user_metadata?.avatar_url || '/placeholder.png'} alt="Profile" className="w-16 h-16 rounded-full" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {t('Welcome', 'ಸುಸ್ವಾಗತ')}, {user.user_metadata?.full_name}
            </h1>
            <p className="text-slate-500">{user.email}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-medium">
          <LogOut className="w-4 h-4" />
          {t('Logout', 'ಲಾಗ್ ಔಟ್')}
        </button>
      </div>

      <div className="mb-8 flex justify-between items-end">
        <h2 className="text-xl font-bold text-slate-900">{t('My Service Requests', 'ನನ್ನ ಸೇವಾ ವಿನಂತಿಗಳು')}</h2>
        <Link href="/services" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          {t('Browse Services', 'ಸೇವೆಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ')} &rarr;
        </Link>
      </div>

      {requests.length === 0 ? (
        <div className="text-center bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-12">
          <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">{t('No requests yet', 'ಇನ್ನೂ ಯಾವುದೇ ವಿನಂತಿಗಳಿಲ್ಲ')}</h3>
          <p className="text-slate-500 mb-6">{t('You have not requested any services yet.', 'ನೀವು ಇನ್ನೂ ಯಾವುದೇ ಸೇವೆಗಳನ್ನು ವಿನಂತಿಸಿಲ್ಲ.')}</p>
          <Link href="/services" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            {t('Explore Services', 'ಸೇವೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ')}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div key={req.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusColor(req.status)}`}>
                  {req.status}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(req.created_at).toLocaleDateString()}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{t(req.services?.name_en, req.services?.name_kn)}</h3>
              {req.preferred_date && (
                <p className="text-sm text-slate-600 mb-1">
                  <span className="font-medium">{t('Preferred Date:', 'ಆದ್ಯತೆಯ ದಿನಾಂಕ:')}</span> {req.preferred_date}
                </p>
              )}
              {req.message && (
                <p className="text-sm text-slate-600 mb-4 line-clamp-2 bg-slate-50 p-2 rounded">
                  "{req.message}"
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
