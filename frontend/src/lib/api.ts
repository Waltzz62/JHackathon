const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('API Error:', {
      status: response.status,
      statusText: response.statusText,
      data: data
    });
    throw new Error(data.message || data.error || "Something went wrong");
  }

  // Handle backend response format {message, data} or {success, data, message}
  return data.data || data;
}

// Auth API
export const authApi = {
  register: (data: any) =>
    fetchApi("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  login: (data: any) =>
    fetchApi("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  staffLogin: (data: any) =>
    fetchApi("/auth/staff/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getProfile: () => fetchApi("/auth/profile"),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Classes API
export const classesApi = {
  getAll: () => fetchApi("/class/classes"),
  create: (data: any) =>
    fetchApi("/class/create", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    fetchApi(`/class/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchApi(`/class/delete/${id}`, {
      method: "DELETE",
    }),
};

// Schedules API
export const schedulesApi = {
  getAll: () => fetchApi("/schedule/schedules"),
  getByClassId: (classId: string) => fetchApi(`/schedule/schedule/${classId}`),
  create: (data: any) =>
    fetchApi("/schedule/create", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    fetchApi(`/schedule/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchApi(`/schedule/delete/${id}`, {
      method: "DELETE",
    }),
};

// Bookings API
export const bookingsApi = {
  create: (data: any) =>
    fetchApi("/booking/create", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getAll: () => fetchApi("/booking/bookings"),
  getByUserId: (userId: string) => fetchApi(`/booking/booking/${userId}`),
  update: (id: string, data: any) =>
    fetchApi(`/booking/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchApi(`/booking/delete/${id}`, {
      method: "DELETE",
    }),
};

// Staff API
export const staffApi = {
  getAll: () => fetchApi("/staff/staffs"),
  update: (id: string, data: any) =>
    fetchApi(`/staff/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchApi(`/staff/delete/${id}`, {
      method: "DELETE",
    }),
};

// Staff Applications API (Apply)
export const staffApplicationsApi = {
  create: (data: any) =>
    fetchApi("/apply/create", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getAll: () => fetchApi("/apply/applies"),
  updateStatus: (id: string, data: any) =>
    fetchApi(`/apply/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};

// Users API
export const usersApi = {
  getAll: () => fetchApi("/user/users"),
  create: (data: any) =>
    fetchApi("/user/create", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    fetchApi(`/user/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    fetchApi(`/user/delete/${id}`, {
      method: "DELETE",
    }),
};

// Chat API
export const chatApi = {
  getRecipe: (data: any) =>

    fetchApi("/chat/get-recipe", {
      method: "POST",
      body: JSON.stringify(data),
    }),
    
    
};
