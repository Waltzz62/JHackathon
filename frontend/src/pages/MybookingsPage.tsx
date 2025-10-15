import { useQuery } from '@tanstack/react-query';
import { bookingsApi } from '../lib/api';
import { auth } from '../lib/auth';
import { Users } from 'lucide-react';

export function MyBookingsPage() {
  const user = auth.getUser();
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['myBookings', user?.id],
    queryFn: () => bookingsApi.getByUserId(user?.id || '1'),
    enabled: !!user?.id,
  }) as { data: any, isLoading: boolean };

  const statusBadge = (status: string) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'complete': 'bg-green-100 text-green-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading bookings...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

      {!bookings || (bookings?.data || bookings)?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No bookings yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {(bookings?.data || bookings)?.map((booking: any, index: number) => (
            <div key={booking.booking_id || index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {booking.schedule?.class?.class_title || 'Class Booking'}
                  </h3>
                  <p className="text-sm text-gray-500">User ID: {booking.user_id}</p>
                </div>
                <span className={`px-3 py-1 rounded text-sm font-medium ${statusBadge(booking.status || 'pending')}`}>
                  {booking.status || 'pending'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="h-5 w-5 text-orange-600" />
                  <span>{booking.nums_student} students</span>
                </div>
                {booking.schedule && (
                  <div className="text-sm text-gray-600">
                    Schedule: {new Date(booking.schedule.start_time).toLocaleDateString()} {new Date(booking.schedule.start_time).toLocaleTimeString()}
                  </div>
                )}
              </div>

              {booking.schedule?.class && (
                <div className="mt-4 p-3 bg-blue-50 rounded">
                  <p className="text-sm text-gray-600">
                    <strong>Duration:</strong> {booking.schedule.class.class_duration} minutes | 
                    <strong> Price:</strong> ${booking.schedule.class.class_price}
                  </p>
                </div>
              )}

              {booking.notes && (
                <div className="mt-4 p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600"><strong>Notes:</strong> {booking.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}