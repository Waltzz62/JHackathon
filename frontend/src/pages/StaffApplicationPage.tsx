import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { staffApplicationsApi } from '../lib/api';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/auth';

export function StaffApplicationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    apply_bio: '',
    apply_speacial: '',
    apply_age: '',
    apply_address: '',
  });

  const mutation = useMutation({
    mutationFn: staffApplicationsApi.create,
    onSuccess: () => {
      alert('Application submitted successfully!');
      navigate('/');
    },
    onError: (error: any) => {
      console.error('Application error:', error);
      alert(error.message || 'Application failed');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.getUser();
    if (!user) {
      alert('Please login first');
      navigate('/login');
      return;
    }
    
    console.log('Submitting application:', {
      user_id: parseInt(user.id),
      apply_bio: formData.apply_bio,
      apply_speacial: formData.apply_speacial,
      apply_age: parseInt(formData.apply_age),
      apply_address: formData.apply_address,
    });
    
    mutation.mutate({
      user_id: parseInt(user.id),
      apply_bio: formData.apply_bio,
      apply_speacial: formData.apply_speacial,
      apply_age: parseInt(formData.apply_age),
      apply_address: formData.apply_address,
    });
  };



  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply to be an Instructor</h1>
      <p className="text-gray-600 mb-8">Share your expertise and teach Thai cooking!</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age *
          </label>
          <input
            type="number"
            required
            value={formData.apply_age}
            onChange={(e) => setFormData({ ...formData, apply_age: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address *
          </label>
          <textarea
            required
            value={formData.apply_address}
            onChange={(e) => setFormData({ ...formData, apply_address: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Your full address..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Biography *
          </label>
          <textarea
            required
            value={formData.apply_bio}
            onChange={(e) => setFormData({ ...formData, apply_bio: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Tell us about yourself and your background..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Skills *
          </label>
          <textarea
            required
            value={formData.apply_speacial}
            onChange={(e) => setFormData({ ...formData, apply_speacial: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="What special skills or expertise do you have?"
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full py-3 px-4 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
        >
          {mutation.isPending ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}