'use client';
import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditServicePage() {
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();
  const [categories, setCategories] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name_en: '',
    name_kn: '',
    category_id: '',
    short_description_en: '',
    short_description_kn: '',
    description_en: '',
    description_kn: '',
    instructions_en: '',
    instructions_kn: '',
    fee_information_en: '',
    fee_information_kn: '',
    processing_time_en: '',
    processing_time_kn: '',
    active: true,
  });

  const [docs, setDocs] = useState([{ name_en: '', name_kn: '' }]);

  useEffect(() => {
    async function fetchData() {
      // Fetch categories
      const { data: cats } = await supabase.from('categories').select('*').eq('active', true);
      if (cats) setCategories(cats);

      // Fetch existing service
      const { data: service } = await supabase.from('services').select('*').eq('id', params.id).single();
      if (service) {
        setFormData({
          name_en: service.name_en || '',
          name_kn: service.name_kn || '',
          category_id: service.category_id || '',
          short_description_en: service.short_description_en || '',
          short_description_kn: service.short_description_kn || '',
          description_en: service.description_en || '',
          description_kn: service.description_kn || '',
          instructions_en: service.instructions_en || '',
          instructions_kn: service.instructions_kn || '',
          fee_information_en: service.fee_information_en || '',
          fee_information_kn: service.fee_information_kn || '',
          processing_time_en: service.processing_time_en || '',
          processing_time_kn: service.processing_time_kn || '',
          active: service.active !== false,
        });
      }

      // Fetch existing docs
      const { data: existingDocs } = await supabase.from('service_documents').select('*').eq('service_id', params.id).order('display_order');
      if (existingDocs && existingDocs.length > 0) {
        setDocs(existingDocs.map(d => ({ name_en: d.document_name_en, name_kn: d.document_name_kn })));
      }
      
      setLoading(false);
    }
    fetchData();
  }, [supabase, params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDocChange = (index: number, field: string, value: string) => {
    const newDocs = [...docs];
    newDocs[index] = { ...newDocs[index], [field]: value };
    setDocs(newDocs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const { error: serviceError } = await supabase.from('services').update(formData).eq('id', params.id);
    
    if (serviceError) {
      alert('Error updating service: ' + serviceError.message);
      setSaving(false);
      return;
    }

    // Update docs
    await supabase.from('service_documents').delete().eq('service_id', params.id);
    
    const validDocs = docs.filter(d => d.name_en.trim() !== '');
    if (validDocs.length > 0) {
      const docsToInsert = validDocs.map((d, index) => ({
        service_id: params.id,
        document_name_en: d.name_en,
        document_name_kn: d.name_kn || d.name_en,
        display_order: index
      }));
      await supabase.from('service_documents').insert(docsToInsert);
    }

    router.push('/admin/services');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Edit Service</h1>
        <Link href="/admin/services" className="text-slate-600 hover:text-slate-900">Cancel</Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-8">
        
        {/* Basic Info */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <select required name="category_id" value={formData.category_id} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900">
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name_en}</option>)}
              </select>
            </div>
            <div></div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Service Name (English)</label>
              <input required type="text" name="name_en" value={formData.name_en} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Service Name (Kannada)</label>
              <input required type="text" name="name_kn" value={formData.name_kn} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Short Description (English)</label>
              <textarea required name="short_description_en" value={formData.short_description_en} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 h-24 text-slate-900" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Short Description (Kannada)</label>
              <textarea required name="short_description_kn" value={formData.short_description_kn} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 h-24 text-slate-900" />
            </div>
          </div>
        </div>

        {/* Details */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-4">Additional Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Fee Information (English)</label>
              <input type="text" name="fee_information_en" value={formData.fee_information_en} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900" placeholder="e.g. ₹500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Fee Information (Kannada)</label>
              <input type="text" name="fee_information_kn" value={formData.fee_information_kn} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Processing Time (English)</label>
              <input type="text" name="processing_time_en" value={formData.processing_time_en} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900" placeholder="e.g. 3-5 working days" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Processing Time (Kannada)</label>
              <input type="text" name="processing_time_kn" value={formData.processing_time_kn} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900" />
            </div>
          </div>
        </div>
        
        {/* Documents */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-4">Required Documents</h2>
          <div className="space-y-4">
            {docs.map((doc, index) => (
              <div key={index} className="flex gap-4 items-center">
                <input 
                  type="text" 
                  value={doc.name_en} 
                  onChange={(e) => handleDocChange(index, 'name_en', e.target.value)} 
                  className="flex-1 border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900" 
                  placeholder={`Document ${index + 1} (English)`} 
                />
                <input 
                  type="text" 
                  value={doc.name_kn} 
                  onChange={(e) => handleDocChange(index, 'name_kn', e.target.value)} 
                  className="flex-1 border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900" 
                  placeholder={`Document ${index + 1} (Kannada)`} 
                />
                <button type="button" onClick={() => {
                  const newDocs = docs.filter((_, i) => i !== index);
                  setDocs(newDocs.length ? newDocs : [{ name_en: '', name_kn: '' }]);
                }} className="text-red-500 hover:text-red-700 font-bold px-2">X</button>
              </div>
            ))}
            <button type="button" onClick={() => setDocs([...docs, { name_en: '', name_kn: '' }])} className="text-blue-600 font-medium text-sm hover:underline">+ Add another document</button>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Update Service'}
          </button>
        </div>
      </form>
    </div>
  );
}
