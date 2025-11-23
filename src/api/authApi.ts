import api from './http';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export async function login(payload: LoginPayload) {
  const { data } = await api.post('/api/Auth/login', payload);
  return data;
}

export async function register(payload: RegisterPayload) {
  const { data } = await api.post('/api/Auth/register', payload);
  return data;
}