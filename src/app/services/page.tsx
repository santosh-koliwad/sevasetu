import { createClient } from '@/utils/supabase/server';
import ClientServices from './ClientServices';

export const revalidate = 60;

export default async function ServicesPage({ searchParams }: { searchParams: { category?: string, q?: string } }) {
  const supabase = await createClient();
  const search = await searchParams; // Wait for search params Next.js 15
  
  // Fetch categories for filter
  const { data: categories } = await supabase.from('categories').select('*').eq('active', true).order('created_at', { ascending: true });
  
  // Base query for services
  let query = supabase.from('services').select('*, categories(name_en, name_kn)').eq('active', true);
  
  if (search?.category) {
    query = query.eq('category_id', search.category);
  }
  
  if (search?.q) {
    // Basic text search on english and kannada names
    query = query.or(`name_en.ilike.%${search.q}%,name_kn.ilike.%${search.q}%`);
  }
  
  const { data: services } = await query.order('name_en', { ascending: true });

  return (
    <ClientServices 
      initialServices={services || []} 
      categories={categories || []} 
      initialCategory={search?.category || ''}
      initialQuery={search?.q || ''}
    />
  );
}
