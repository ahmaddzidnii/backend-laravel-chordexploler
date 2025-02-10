export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  getAccessToken: () => string | null;
  setToken: (token: string) => void;
}

export type ApiResponseWithPaginationType<T> = {
  code: number;
  pagination: {};
  data: T[];
};

export type ApiResponseWithoutPaginationType<T> = {
  code: number;
  data: T;
};
