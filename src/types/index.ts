export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  status: 'active' | 'inactive';
  role: 'admin' | 'editor' | 'viewer';
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export type PageType = 'login' | 'register' | 'dashboard' | 'analytics' | 'users';

