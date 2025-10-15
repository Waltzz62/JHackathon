import { useQuery } from '@tanstack/react-query';
import { schedulesApi } from '../../lib/api';
import { Calendar, Users, Clock } from 'lucide-react';

export function StaffSchedulesPage() {
  const { data: schedules, isLoading } = useQuery({
    queryKey: ['staff-schedules'],
    queryFn: schedulesApi.getAll,
  }) as { data: any, isLoading: boolean };

  const statusBadge = (status: string) => {
    const colors = {
      'no start': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Teaching Schedule</h1>

      {(schedules?.data || schedules)?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No schedules assigned yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {(schedules?.data || schedules)?.map((schedule: any) => (
            <div key={schedule.schedule_id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Schedule #{schedule.schedule_id}
                  </h3>
                  <p className="text-gray-600 mt-1">Class ID: {schedule.class_id}</p>
                </div>
                <span className={`px-3 py-1 rounded text-sm font-medium ${statusBadge(schedule.status)}`}>
                  {schedule.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  <span>{new Date(schedule.start_time).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <span>
                    {new Date(schedule.start_time).toLocaleTimeString()} - {new Date(schedule.end_time).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="h-5 w-5 text-orange-600" />
                  <span>{schedule.current_student || 0} students</span>
                </div>
              </div>


            </div>
          ))}
        </div>
      )}
    </div>
  );
}