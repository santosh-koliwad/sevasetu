'use client';
import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewServicePage() {
  const supabase = createClient();
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
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

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from('categories').select('*').eq('active', true);
      if (data) setCategories(data);
    }
    fetchCategories();
  }, [supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from('services').insert([formData]);
    if (error) {
      alert('Error saving service: ' + error.message);
      setSaving(false);
    } else {
      router.push('/admin/services');
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Add New Service</h1>
        <Link href="/admin/services" className="text-slate-600 hover:text-slate-900">Cancel</Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-8">
        
        {/* Basic Info */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <select required name="category_id" value={formData.category_id} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name_en}</option>)}
              </select>
            </div>
            <div></div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Service Name (English)</label>
              <input required type="text" name="name_en" value={formData.name_en} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Service Name (Kannada)</label>
              <input required type="text" name="name_kn" value={formData.name_kn} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Short Description (English)</label>
              <textarea required name="short_description_en" value={formData.short_description_en} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 h-24" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Short Description (Kannada)</label>
              <textarea required name="short_description_kn" value={formData.short_description_kn} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 h-24" />
            </div>
          </div>
        </div>

        {/* Details */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2 mb-4">Additional Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Fee Information (English)</label>
              <input type="text" name="fee_information_en" value={formData.fee_information_en} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. ₹500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Fee Information (Kannada)</label>
              <input type="text" name="fee_information_kn" value={formData.fee_information_kn} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Processing Time (English)</label>
              <input type="text" name="processing_time_en" value={formData.processing_time_en} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 3-5 working days" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Processing Time (Kannada)</label>
              <input type="text" name="processing_time_kn" value={formData.processing_time_kn} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end pt-6">
          <button 
            type="submit" 
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Service'}
          </button>
        </div>
      </form>
    </div>
  );
}
