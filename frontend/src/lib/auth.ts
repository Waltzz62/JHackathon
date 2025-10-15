export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'staff' | 'admin';
}

export const auth = {
  getToken: () => localStorage.getItem('token'),
  setToken: (token: string) => localStorage.setItem('token', token),
  removeToken: () => localStorage.removeItem('token'),
  
  getUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
  setUser: (user: User) => localStorage.setItem('user', JSON.stringify(user)),
  removeUser: () => localStorage.removeItem('user'),
  
  logout: () => {
    auth.removeToken();
    auth.removeUser();
    window.location.href = '/login';
  },
  
  isAuthenticated: () => {
    const token = auth.getToken();
    if (!token) return false;
    
    try {
      // ตรวจสอบว่า token หมดอายุหรือไม่
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      if (payload.exp < currentTime) {
        auth.logout();
        return false;
      }
      
      return true;
    } catch {
      auth.logout();
      return false;
    }
  },
  
  hasRole: (roles: string[]) => {
    const user = auth.getUser();
    return user ? roles.includes(user.role) : false;
  },
  
  // ตรวจสอบสิทธิ์เฉพาะ role
  isUser: () => auth.hasRole(['user']),
  isStaff: () => auth.hasRole(['staff']),
  isAdmin: () => auth.hasRole(['admin']),
  isStaffOrAdmin: () => auth.hasRole(['staff', 'admin']),
};