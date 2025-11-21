import api from './http';

export interface ContactDto {
  id?: number;
  name: string;
  email: string;
  phone: string;
}

export async function getContacts() {
  const { data } = await api.get<ContactDto[]>('/api/Contacts');
  return data;
}

export async function createContact(contact: ContactDto) {
  const { data } = await api.post<ContactDto>('/api/Contacts', contact);
  return data;
}

export async function updateContact(contact: ContactDto) {
  await api.put(`/api/Contacts/${contact.id}`, contact);
}

export async function deleteContact(id: number) {
  await api.delete(`/api/Contacts/${id}`);
}