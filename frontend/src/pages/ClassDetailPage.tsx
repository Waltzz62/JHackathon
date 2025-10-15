import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { classesApi, bookingsApi, schedulesApi } from '../lib/api';
import { auth } from '../lib/auth';
import { Clock, Users } from 'lucide-react';
import { useState } from 'react';

export function ClassDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isAuthenticated = auth.isAuthenticated();
  
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [notes, setNotes] = useState('');

  const { data: classData, isLoading } = useQuery({
    queryKey: ['class', id],
    queryFn: () => classesApi.getAll().then((data: any) => (data?.data || data)?.find((c: any) => c.class_id === parseInt(id!))),
    enabled: !!id,
  }) as { data: any, isLoading: boolean };

  const { data: schedules } = useQuery({
    queryKey: ['schedules', id],
    queryFn: () => schedulesApi.getByClassId(id!),
    enabled: !!id,
  }) as { data: any };

  const bookingMutation = useMutation({
    mutationFn: bookingsApi.create,
    onSuccess: () => {
      setSelectedSchedule('');
      setNumberOfPeople(1);
      setNotes('');
      alert(`Booking created successfully!`);
      // Refresh the bookings cache
      window.location.href = '/my-bookings';
    },
    onError: (error: any) => {
      console.error('Booking error:', error);
      alert(`Booking failed: ${error.message || 'Please try again'}`);
    },
  });

  const handleBooking = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!selectedSchedule) {
      alert('Please select a schedule');
      return;
    }

    if (numberOfPeople < 1) {
      alert('Number of people must be at least 1');
      return;
    }

    const confirmMessage = `Confirm booking for ${numberOfPeople} ${numberOfPeople > 1 ? 'people' : 'person'}?\n\nClass: ${classData.class_title}\nTotal: $${classData.class_price * numberOfPeople}`;
    
    if (confirm(confirmMessage)) {
      const user = auth.getUser();
      bookingMutation.mutate({
        user_id: parseInt(user?.id || '1'),
        schedule_id: parseInt(selectedSchedule),
        nums_student: numberOfPeople,
        notes: notes.trim() || '',
      });
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="h-96 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mb-6">
            {classData.class_image ? (
              <img src={classData.class_image} alt={classData.class_title} className="w-full h-full object-cover rounded-lg" />
            ) : (
              <span className="text-white text-9xl">🍜</span>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{classData.class_title}</h1>
            </div>

            <p className="text-gray-600 leading-relaxed">{classData.class_description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="h-5 w-5 text-orange-600" />
                <span>{classData.class_duration} minutes</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Users className="h-5 w-5 text-orange-600" />
                <span>Max {classData.max_student} students</span>
              </div>
              <div className="text-2xl font-bold text-orange-600">
                ${classData.class_price}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Book This Class</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Schedule
              </label>
              <select
                value={selectedSchedule}
                onChange={(e) => setSelectedSchedule(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Choose a time slot</option>
                {(schedules?.data || schedules)?.map((schedule: any) => (
                  <option key={schedule.schedule_id} value={schedule.schedule_id}>
                    {new Date(schedule.start_time).toLocaleDateString()} - {new Date(schedule.start_time).toLocaleTimeString()} to {new Date(schedule.end_time).toLocaleTimeString()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of People
              </label>
              <input
                type="number"
                min="1"
                max={classData.max_student}
                value={numberOfPeople}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1;
                  setNumberOfPeople(Math.max(1, value));
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Any special requests or dietary restrictions?"
              />
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-semibold mb-4">
                <span>Total Price:</span>
                <span className="text-orange-600">${classData.class_price * numberOfPeople}</span>
              </div>

              <button
                onClick={handleBooking}
                disabled={bookingMutation.isPending}
                className="w-full py-3 px-4 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
              >
                {bookingMutation.isPending ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}