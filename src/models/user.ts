export interface User extends UserBody {
  id?: string;
  clientId: string;
}

export interface UserBody extends UserCredentials {
  email: string;
  company: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}