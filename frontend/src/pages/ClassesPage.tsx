import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { classesApi } from '../lib/api';
import { Clock, Users} from 'lucide-react';

export function ClassesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['classes'],
    queryFn: classesApi.getAll,
  }) as { data: any, isLoading: boolean };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Cooking Classes</h1>
        <p className="mt-2 text-gray-600">Discover our authentic Thai cooking experiences</p>
      </div>
      {isLoading ? (
        <div className="text-center py-12">Loading classes...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(data?.data || data)?.map((classItem: any) => (
            <Link
              key={classItem.class_id}
              to={`/classes/${classItem.class_id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                {classItem.class_image ? (
                  <img src={classItem.class_image} alt={classItem.class_title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-6xl">🍜</span>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-orange-600">${classItem.class_price}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{classItem.class_title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{classItem.class_description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{classItem.class_duration} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>Max {classItem.max_student}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
