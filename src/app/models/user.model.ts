export class User {
  uid: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  role: roles;
}

enum roles {
  customer = 'Customer',
  admin = 'Admin',
}
