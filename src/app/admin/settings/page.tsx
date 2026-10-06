'use client';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';

export default function AdminSettings() {
  const supabase = createClient();
  const [settings, setSettings] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from('site_settings').select('*').eq('id', 1).single();
      if (data) setSettings(data);
    };
    fetchSettings();
  }, [supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    // Ensure id is 1
    const { id, updated_at, ...updateData } = settings;
    
    const { error } = await supabase.from('site_settings').update(updateData).eq('id', 1);
    
    setSaving(false);
    if (error) {
      setMessage('Error saving settings: ' + error.message);
    } else {
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Site Settings</h1>
      
      {message && (
        <div className={`p-4 mb-6 rounded-lg ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Contact Information */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 border-b pb-2 mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Shop Name</label>
                <input type="text" name="shop_name" value={settings.shop_name || ''} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-slate-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input type="text" name="phone" value={settings.phone || ''} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-slate-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp Number (incl. country code, no +)</label>
                <input type="text" name="whatsapp" value={settings.whatsapp || ''} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-slate-900" placeholder="e.g. 919876543210" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" name="email" value={settings.email || ''} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-slate-900" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Address (English)</label>
                <textarea name="address_en" value={settings.address_en || ''} onChange={handleChange} rows={2} className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-slate-900" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Address (Kannada)</label>
                <textarea name="address_kn" value={settings.address_kn || ''} onChange={handleChange} rows={2} className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-slate-900" />
              </div>
            </div>
          </div>

          {/* Homepage Content */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 border-b pb-2 mb-4">Homepage Content</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Hero Title (English)</label>
                <input type="text" name="hero_title_en" value={settings.hero_title_en || ''} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-slate-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Hero Title (Kannada)</label>
                <input type="text" name="hero_title_kn" value={settings.hero_title_kn || ''} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-slate-900" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Hero Subtitle (English)</label>
                <textarea name="hero_description_en" value={settings.hero_description_en || ''} onChange={handleChange} rows={2} className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-slate-900" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Hero Subtitle (Kannada)</label>
                <textarea name="hero_description_kn" value={settings.hero_description_kn || ''} onChange={handleChange} rows={2} className="w-full p-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-slate-900" />
              </div>
            </div>
          </div>

        </div>
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button type="submit" disabled={saving} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70">
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
