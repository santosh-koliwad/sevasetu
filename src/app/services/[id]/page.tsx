import { createClient } from '@/utils/supabase/server';
import ClientServiceDetail from './ClientServiceDetail';
import { notFound } from 'next/navigation';

export default async function ServiceDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { id } = await params; // Next.js 15 params

  const { data: service, error } = await supabase
    .from('services')
    .select('*, categories(name_en, name_kn)')
    .eq('id', id)
    .single();

  if (error || !service) {
    notFound();
  }

  const { data: documents } = await supabase
    .from('service_documents')
    .select('*')
    .eq('service_id', id)
    .order('display_order', { ascending: true });

  const { data: faqs } = await supabase
    .from('service_faqs')
    .select('*')
    .eq('service_id', id)
    .eq('active', true)
    .order('display_order', { ascending: true });

  return (
    <ClientServiceDetail 
      service={service} 
      documents={documents || []} 
      faqs={faqs || []} 
    />
  );
}
