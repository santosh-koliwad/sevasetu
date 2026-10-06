import { createPublicClient } from '@/utils/supabase/public';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, FileText, CheckCircle2, MapPin } from 'lucide-react';
import ClientHome from './ClientHome';

export const revalidate = 60; // Cache the page for 60 seconds (ISR)

export default async function Home() {
  const supabase = createPublicClient();
  
  const { data: settings } = await supabase.from('site_settings').select('*').eq('id', 1).single();
  const { data: categories } = await supabase.from('categories').select('*').eq('active', true).order('created_at', { ascending: true }).limit(8);
  const { data: allServices } = await supabase.from('services').select('*, categories(name_en, name_kn)').eq('active', true).order('created_at', { ascending: false });

  return (
    <div className="flex flex-col min-h-screen">
      <ClientHome 
        settings={settings} 
        allServices={allServices || []} 
      />
    </div>
  );
}
