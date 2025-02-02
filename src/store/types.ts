export interface User {
  id: string;
  uuid: string;
  name: string;
  email: string;
  phone: string;
}

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  // Add other state properties as needed
}
