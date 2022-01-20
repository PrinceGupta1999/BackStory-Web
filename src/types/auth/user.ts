import { AccessLevel } from '../enum/accessLevel';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  accessLevel: AccessLevel;
}
