import { Enums } from './enums';

export class AccessLevel {
  static readonly USER = new AccessLevel('user');
  static readonly ADMIN = new AccessLevel('admin');

  private constructor(readonly accessLevel: string) {
    this.accessLevel = accessLevel;
  }

  static values(): AccessLevel[] {
    return [this.USER, this.ADMIN];
  }

  toLongString(): string {
    return `${Enums.ACCESS_LEVEL}.${this.accessLevel}`;
  }

  static fromLongString(accessLevelStr: string): AccessLevel | undefined {
    for (let accessLevel of AccessLevel.values()) {
      if (accessLevel.toLongString() === accessLevelStr) {
        return accessLevel;
      }
    }
    return undefined;
  }
}
