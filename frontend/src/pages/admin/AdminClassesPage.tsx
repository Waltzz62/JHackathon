import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { classesApi } from '../../lib/api';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useState } from 'react';

export function AdminClassesPage() {
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);
  const [formData, setFormData] = useState({
    class_title: '',
    class_description: '',
    class_duration: 120,
    class_price: 50,
    max_student: 10,
    class_image: '',
  });

  const { data: classes, isLoading } = useQuery({
    queryKey: ['admin-classes'],
    queryFn: () => classesApi.getAll(),
  }) as { data: any, isLoading: boolean };

  const createMutation = useMutation({
    mutationFn: classesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-classes'] });
      setIsCreating(false);
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: any) => classesApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-classes'] });
      setEditingClass(null);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: classesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-classes'] });
    },
  });

  const resetForm = () => {
    setFormData({
      class_title: '',
      class_description: '',
      class_duration: 120,
      class_price: 50,
      max_student: 10,
      class_image: '',
    });
  };

  const handleEdit = (cls: any) => {
    setEditingClass(cls);
    setFormData({
      class_title: cls.class_title,
      class_description: cls.class_description,
      class_duration: cls.class_duration,
      class_price: cls.class_price,
      max_student: cls.max_student,
      class_image: cls.class_image || '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClass) {
      updateMutation.mutate({ id: editingClass.class_id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  if (isLoading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Classes</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
        >
          <Plus className="h-5 w-5" />
          Add Class
        </button>
      </div>

      {(isCreating || editingClass) && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingClass ? 'Edit Class' : 'Create New Class'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.class_title}
                  onChange={(e) => setFormData({ ...formData, class_title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                <input
                  type="number"
                  required
                  value={formData.class_duration}
                  onChange={(e) => setFormData({ ...formData, class_duration: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <input
                  type="number"
                  required
                  value={formData.class_price}
                  onChange={(e) => setFormData({ ...formData, class_price: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Students</label>
                <input
                  type="number"
                  required
                  value={formData.max_student}
                  onChange={(e) => setFormData({ ...formData, max_student: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.class_image}
                  onChange={(e) => setFormData({ ...formData, class_image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                required
                value={formData.class_description}
                onChange={(e) => setFormData({ ...formData, class_description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50"
              >
                {editingClass ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingClass(null);
                  resetForm();
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {(classes?.data || classes)?.map((cls: any) => (
          <div key={cls.class_id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{cls.class_title}</h3>
                <p className="text-gray-600 mt-1">{cls.class_description}</p>
                <div className="flex gap-4 mt-3 text-sm text-gray-500">
                  <span>⏱ {cls.class_duration} min</span>
                  <span>💰 ${cls.class_price}</span>
                  <span>👥 Max {cls.max_student}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(cls)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('Delete this class?')) {
                      deleteMutation.mutate(cls.class_id);
                    }
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}