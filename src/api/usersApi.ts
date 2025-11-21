// src/api/usersApi.ts
import http from './http';

export interface UserDto {
  id: number;
  name: string;
  email: string;
}

export interface UpdateUserPayload {
  id: number;
  name: string;
  email: string;
  password?: string;
}

export async function getUsers(): Promise<UserDto[]> {
  // -> http://localhost:5000/api/users
  const response = await http.get<UserDto[]>('/api/users');
  return response.data;
}

export async function updateUser(payload: UpdateUserPayload): Promise<UserDto> {
  const { id, ...body } = payload;
  // -> http://localhost:5000/api/users/{id}
  const response = await http.put<UserDto>(`/api/users/${id}`, body);
  return response.data;
}
