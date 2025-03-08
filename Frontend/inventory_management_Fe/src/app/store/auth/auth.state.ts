export interface AuthState {
    user: { email: string } | null;
    isAuthenticated: boolean;
  }
  
  export const initialAuthState: AuthState = {
    user: null,
    isAuthenticated: false,
  };
  