import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';
import { pickBy } from 'lodash';
import { User } from '../../types/auth/user';
import { UserDto } from '../../types/auth/userDto';
import { AccessLevel } from '../../types/enum/accessLevel';

export const firestoreUserConverter: FirestoreDataConverter<UserDto> = {
  toFirestore: (_: UserDto) => {
    throw 'Operation not allowed';
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions
  ): UserDto => {
    const data = snapshot.data(options);
    // removing undefined properties since they can't be serialized
    return pickBy(
      {
        uid: snapshot.id,
        accessLevel: data.accessLevel,
        email: data.emailAddress,
        displayName: data.displayName,
      },
      (v) => v !== undefined
    ) as UserDto;
  },
};

export const userDtoConverter = {
  fromDto: (userDto: UserDto): User => {
    return {
      ...userDto,
      accessLevel:
        AccessLevel.fromLongString(userDto.accessLevel) ?? AccessLevel.USER,
    };
  },
};
