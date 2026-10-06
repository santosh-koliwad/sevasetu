'use client';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export default function AdminRequests() {
  const supabase = createClient();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, [supabase]);

  const fetchRequests = async () => {
    const { data } = await supabase
      .from('service_requests')
      .select('*, services(name_en)')
      .order('created_at', { ascending: false });
    if (data) setRequests(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    await supabase.from('service_requests').update({ status: newStatus }).eq('id', id);
    fetchRequests();
  };

  if (loading) return <div>Loading requests...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Customer Requests</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Customer</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Contact</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Service</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Message</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase text-right">Update Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4">
                    <p className="font-medium text-slate-900">{req.customer_name}</p>
                    <p className="text-xs text-slate-500">{new Date(req.created_at).toLocaleDateString()}</p>
                  </td>
                  <td className="p-4 text-sm text-slate-700">
                    <p>{req.mobile}</p>
                  </td>
                  <td className="p-4 text-sm text-slate-700">{req.services?.name_en}</td>
                  <td className="p-4 text-sm text-slate-600 max-w-xs truncate" title={req.message}>{req.message || '-'}</td>
                  <td className="p-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      req.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      req.status === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <select 
                      value={req.status} 
                      onChange={(e) => updateStatus(req.id, e.target.value)}
                      className="text-sm border border-slate-300 rounded p-1 outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">No requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
