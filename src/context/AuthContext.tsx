import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => { success: boolean; message: string };
  register: (name: string, email: string, pass: string, avatar?: string) => { success: boolean; message: string };
  demoLogin: (email?: string, name?: string) => void;
  logout: () => void;
  toggleFavorite: (toolId: string) => void;
  addRecentTool: (toolId: string) => void;
  updateProfile: (data: Partial<User>) => void;
  registeredUsersCount: number;
}

const STORAGE_KEY_AUTH = 'megatools_auth_user';
const STORAGE_KEY_USERS_DB = 'megatools_registered_users_db';

const DEFAULT_USERS = [
  {
    id: 'user_ramesh',
    name: 'Ramesh Pandey',
    email: 'pandeyramesh69223@gmail.com',
    password: 'password123',
    avatar: '👨‍💻',
    plan: 'PRO' as const,
    joinedAt: '2026-01-15',
    favorites: ['image-to-pdf', 'pdf-to-word', 'video-downloader', 'excel-spreadsheet', 'qr-code-generator'],
    recentTools: ['image-to-pdf', 'video-downloader', 'excel-spreadsheet']
  },
  {
    id: 'user_demo',
    name: 'Demo Pro User',
    email: 'demo@megatools.com',
    password: 'password123',
    avatar: '🚀',
    plan: 'PRO' as const,
    joinedAt: '2026-03-01',
    favorites: ['image-to-pdf', 'qr-code-generator'],
    recentTools: []
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AUTH);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved auth', e);
    }
    return null;
  });

  const [usersDb, setUsersDb] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USERS_DB);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_USERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(usersDb));
    } catch (e) {
      console.error(e);
    }
  }, [usersDb]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY_AUTH);
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const login = (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = usersDb.find((u: any) => u.email.toLowerCase() === cleanEmail);

    if (!existing) {
      return { success: false, message: 'ईमेल नहीं मिला! कृपया पहले रजिस्टर करें (Account not found. Please register).' };
    }

    if (existing.password !== pass) {
      return { success: false, message: 'गलत पासवर्ड! कृपया पुनः प्रयास करें (Invalid password).' };
    }

    const authUser: User = {
      id: existing.id,
      name: existing.name,
      email: existing.email,
      avatar: existing.avatar || '⚡',
      plan: existing.plan || 'PRO',
      joinedAt: existing.joinedAt || new Date().toISOString().split('T')[0],
      favorites: existing.favorites || [],
      recentTools: existing.recentTools || []
    };

    setUser(authUser);
    return { success: true, message: `स्वागत है, ${existing.name}! Logged in successfully!` };
  };

  const register = (name: string, email: string, pass: string, avatar: string = '✨') => {
    const cleanEmail = email.trim().toLowerCase();
    if (!name.trim()) {
      return { success: false, message: 'कृपया अपना नाम दर्ज करें (Please enter your name).' };
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, message: 'कृपया वैध ईमेल दर्ज करें (Please enter a valid email).' };
    }
    if (pass.length < 4) {
      return { success: false, message: 'पासवर्ड कम से कम 4 अक्षरों का होना चाहिए (Password min 4 chars).' };
    }

    const existing = usersDb.find((u: any) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, message: 'यह ईमेल पहले से पंजीकृत है! कृपया लॉगिन करें (Email already registered. Please login).' };
    }

    const newUser = {
      id: 'user_' + Date.now(),
      name: name.trim(),
      email: cleanEmail,
      password: pass,
      avatar: avatar || '🌟',
      plan: 'PRO' as const,
      joinedAt: new Date().toISOString().split('T')[0],
      favorites: ['image-to-pdf', 'pdf-to-word', 'excel-spreadsheet', 'video-downloader'],
      recentTools: ['image-to-pdf']
    };

    const updated = [...usersDb, newUser];
    setUsersDb(updated);

    const authUser: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
      plan: newUser.plan,
      joinedAt: newUser.joinedAt,
      favorites: newUser.favorites,
      recentTools: newUser.recentTools
    };

    setUser(authUser);
    return { success: true, message: 'सफलतापूर्वक खाता बना! (Account created successfully!)' };
  };

  const demoLogin = (email = 'pandeyramesh69223@gmail.com', name = 'Ramesh Pandey') => {
    const existing = usersDb.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setUser({
        id: existing.id,
        name: existing.name,
        email: existing.email,
        avatar: existing.avatar,
        plan: existing.plan,
        joinedAt: existing.joinedAt,
        favorites: existing.favorites,
        recentTools: existing.recentTools
      });
    } else {
      const guest: User = {
        id: 'user_ramesh',
        name: name,
        email: email,
        avatar: '👨‍💻',
        plan: 'PRO',
        joinedAt: new Date().toISOString().split('T')[0],
        favorites: ['image-to-pdf', 'pdf-to-word', 'video-downloader', 'excel-spreadsheet', 'qr-code-generator'],
        recentTools: ['image-to-pdf', 'video-downloader']
      };
      setUser(guest);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const toggleFavorite = (toolId: string) => {
    if (!user) return;
    const isFav = user.favorites.includes(toolId);
    const updatedFavs = isFav
      ? user.favorites.filter(id => id !== toolId)
      : [...user.favorites, toolId];

    const updatedUser = { ...user, favorites: updatedFavs };
    setUser(updatedUser);

    setUsersDb((prev: any[]) =>
      prev.map(u => (u.id === user.id ? { ...u, favorites: updatedFavs } : u))
    );
  };

  const addRecentTool = (toolId: string) => {
    if (!user) return;
    const filtered = (user.recentTools || []).filter(id => id !== toolId);
    const updatedRecent = [toolId, ...filtered].slice(0, 8);

    const updatedUser = { ...user, recentTools: updatedRecent };
    setUser(updatedUser);

    setUsersDb((prev: any[]) =>
      prev.map(u => (u.id === user.id ? { ...u, recentTools: updatedRecent } : u))
    );
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);

    setUsersDb((prev: any[]) =>
      prev.map(u => (u.id === user.id ? { ...u, ...data } : u))
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        demoLogin,
        logout,
        toggleFavorite,
        addRecentTool,
        updateProfile,
        registeredUsersCount: usersDb.length
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
