export type ToolCategory =
  | 'pdf'
  | 'image'
  | 'media'
  | 'excel'
  | 'security'
  | 'text'
  | 'calculator';

export interface ToolDefinition {
  id: string;
  name: string;
  hindiName?: string;
  category: ToolCategory;
  description: string;
  badge?: 'POPULAR' | 'HOT' | 'NEW' | 'PRO' | 'FAST';
  color: string; // Tailwind gradient classes
  bgLight: string;
  iconName: string;
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: 'PRO' | 'FREE' | 'VIP';
  joinedAt: string;
  favorites: string[];
  recentTools: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
