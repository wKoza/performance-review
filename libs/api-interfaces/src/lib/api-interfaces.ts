export interface Message {
  message: string;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  roleType: number;
}

export enum Roles {
  admin = 1,
  employee
}
