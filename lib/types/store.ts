export interface User {
  name: string;
  email: string;
}

export interface UserStore {
  user: User | null;
}
