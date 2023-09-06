export interface User {
  id?: string;
  username: string;
  password: string;
  email: string;
  company: string;
}

export interface UserParams {
  username: string;
  password: string;
}