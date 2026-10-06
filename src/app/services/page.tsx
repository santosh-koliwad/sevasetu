import { createPublicClient } from '@/utils/supabase/public';
import ClientServices from './ClientServices';

export const revalidate = 60;

export default async function ServicesPage() {
  const supabase = createPublicClient();
  
  // Fetch categories for filter
  const { data: categories } = await supabase.from('categories').select('*').eq('active', true).order('created_at', { ascending: true });
  
  // Fetch all services
  const { data: services } = await supabase.from('services').select('*, categories(name_en, name_kn)').eq('active', true).order('name_en', { ascending: true });

  return (
    <ClientServices 
      initialServices={services || []} 
      categories={categories || []} 
    />
  );
}
