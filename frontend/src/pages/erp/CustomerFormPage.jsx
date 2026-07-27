import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, User, Phone, Mail, MapPin, Building } from 'lucide-react';
import api from '../../services/api';
import PageHeader from '../../components/erp/PageHeader';
import { toast } from '../../utils/toast';

const emptyForm = {
  full_name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip_code: '',
  cnic: '',
  notes: '',
};

export default function CustomerFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        setFetching(true);
        const { data } = await api.get(`/customers/${id}/`);
        setForm({
          full_name: data.full_name || data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          city: data.city || '',
          state: data.state || '',
          zip_code: data.zip_code || '',
          cnic: data.cnic || '',
          notes: data.notes || '',
        });
      } catch (err) {
        toast.error('Failed to load customer');
        navigate('/erp/customers');
      } finally {
        setFetching(false);
      }
    })();
  }, [id, isEdit, navigate]);

  const validate = () => {
    const errs = {};
    if (!form.full_name.trim()) errs.full_name = 'Name is required';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      if (isEdit) {
        await api.put(`/customers/${id}/`, form);
        toast.success('Customer updated');
      } else {
        await api.post('/customers/', form);
        toast.success('Customer created');
      }
      navigate('/erp/customers');
    } catch (err) {
      const detail = err.response?.data;
      if (typeof detail === 'object' && detail !== null) {
        const fieldErrors = {};
        Object.entries(detail).forEach(([key, msgs]) => {
          fieldErrors[key] = Array.isArray(msgs) ? msgs.join(', ') : msgs;
        });
        setErrors(fieldErrors);
      }
      toast.error(err.response?.data?.detail || `Failed to ${isEdit ? 'update' : 'create'} customer`);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  const fields = [
    { name: 'full_name', label: 'Full Name', icon: User, required: true, type: 'text' },
    { name: 'email', label: 'Email', icon: Mail, type: 'email' },
    { name: 'phone', label: 'Phone', icon: Phone, required: true, type: 'tel' },
    { name: 'address', label: 'Address', icon: Building, type: 'text' },
    { name: 'city', label: 'City', icon: MapPin, type: 'text' },
    { name: 'state', label: 'State', icon: MapPin, type: 'text' },
    { name: 'zip_code', label: 'Zip Code', icon: MapPin, type: 'text' },
    { name: 'cnic', label: 'CNIC', icon: User, type: 'text' },
  ];

  return (
    <div>
      <PageHeader
        title={isEdit ? 'Edit Customer' : 'New Customer'}
        breadcrumbs={[
          { label: 'ERP', to: '/erp' },
          { label: 'Customers', to: '/erp/customers' },
          { label: isEdit ? 'Edit' : 'New' },
        ]}
      />

      <div className="max-w-2xl mx-auto animate-fade-in-up">
        <div className="bg-surface rounded-2xl border border-border shadow-sm">
          <div className="p-6 border-b border-border flex items-center gap-3">
            <button
              onClick={() => navigate('/erp/customers')}
              className="p-2 rounded-lg hover:bg-border transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-text-muted" />
            </button>
            <div>
              <h2 className="text-lg font-semibold text-text-main font-display">
                {isEdit ? 'Edit Customer' : 'Create Customer'}
              </h2>
              <p className="text-sm text-text-muted">Fill in the details below</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {fields.map(({ name, label, icon: Icon, required, type }) => (
                <div key={name} className={name === 'address' || name === 'cnic' ? 'md:col-span-2' : ''}>
                  <div className="relative">
                    <input
                      type={type}
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      placeholder=" "
                      className={`peer w-full px-4 pt-6 pb-2 bg-bg border rounded-xl text-sm text-text-main placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
                        errors[name]
                          ? 'border-red-400 focus:ring-red-20 focus:border-red-400'
                          : 'border-border focus:border-primary'
                      }`}
                    />
                    <label className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-text-muted/70 peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-text-muted transition-all duration-200 flex items-center gap-1.5">
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                      {label}{required && <span className="text-red-400">*</span>}
                    </label>
                  </div>
                  {errors[name] && <p className="text-xs text-red-500 mt-1.5 ml-1">{errors[name]}</p>}
                </div>
              ))}
            </div>

            {/* Notes */}
            <div>
              <div className="relative">
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder=" "
                  rows={3}
                  className="peer w-full px-4 pt-6 pb-2 bg-bg border border-border rounded-xl text-sm text-text-main placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none"
                />
                <label className="absolute left-4 top-4 text-sm text-text-muted/70 peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-text-muted transition-all duration-200">
                  Notes
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/erp/customers')}
                className="px-5 py-2.5 text-sm font-medium text-text-main bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-primary to-primary-light rounded-xl hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isEdit ? 'Update Customer' : 'Create Customer'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}