import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingsApi } from '../../lib/api';
import { Calendar, Users, Clock } from 'lucide-react';

export function AdminBookingsPage() {
  const queryClient = useQueryClient();

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: bookingsApi.getAll,
  }) as { data: any, isLoading: boolean };

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, data }: any) => bookingsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
    },
  });

  const statusBadge = (status: string) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'complete': 'bg-green-100 text-green-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    updateStatusMutation.mutate({ id: bookingId, data: { status: newStatus } });
  };

  if (isLoading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Bookings</h1>

      <div className="space-y-6">
        {(bookings?.data || bookings)?.map((booking: any) => (
          <div key={booking.booking_id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Booking #{booking.booking_id}
                </h3>
                <p className="text-gray-600">User ID: {booking.user_id}</p>
                <p className="text-gray-600">Schedule ID: {booking.schedule_id}</p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded text-sm font-medium ${statusBadge(booking.status)}`}>
                  {booking.status}
                </span>
                <div className="mt-2">
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking.booking_id, e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="complete">Complete</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Users className="h-5 w-5 text-orange-600" />
                <span>{booking.nums_student} students</span>
              </div>
              <div className="text-sm text-gray-600">
                Created: {new Date(booking.created_at).toLocaleDateString()}
              </div>
            </div>

            {booking.notes && (
              <div className="mt-4 p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600"><strong>Notes:</strong> {booking.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}