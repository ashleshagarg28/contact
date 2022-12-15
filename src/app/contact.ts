export class Contact {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  category: ContactCategory;
  image: string;
}
export enum ContactCategory {
  FRIEND = 'Friend',
  FAMILY = 'Family',
}
