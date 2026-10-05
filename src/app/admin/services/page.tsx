'use client';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

export default function AdminServices() {
  const supabase = createClient();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, [supabase]);

  const fetchServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('*, categories(name_en)')
      .order('created_at', { ascending: false });
    if (data) setServices(data);
    setLoading(false);
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    await supabase.from('services').update({ active: !currentStatus }).eq('id', id);
    fetchServices();
  };

  if (loading) return <div>Loading services...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Manage Services</h1>
        <Link href="/admin/services/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Service
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Service Name</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Category</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4">
                    <p className="font-medium text-slate-900">{service.name_en}</p>
                    <p className="text-xs text-slate-500">{service.name_kn}</p>
                  </td>
                  <td className="p-4 text-sm text-slate-700">{service.categories?.name_en}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => toggleStatus(service.id, service.active)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${service.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}
                    >
                      {service.active ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {service.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <Link href={`/admin/services/${service.id}/edit`} className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-4">
                      Edit
                    </Link>
                    <button 
                      onClick={async () => {
                        if(confirm('Are you sure you want to delete this service?')) {
                          await supabase.from('services').delete().eq('id', service.id);
                          fetchServices();
                        }
                      }}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">No services found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
