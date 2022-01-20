import {
  collection,
  CollectionReference,
  DocumentData,
  documentId,
  getDocs,
  query,
  Query,
  where,
} from 'firebase/firestore';
import { UserDto } from '../../types/auth/userDto';
import { FirestoreCollections } from '../core/firestoreCollections';
import { db } from '../core/initializeFirebase';
import { firestoreUserConverter } from './userConverter';

export async function getUser(userUid: string): Promise<UserDto | null> {
  const usersRef = collection(db, FirestoreCollections.users);
  let q: Query<DocumentData> | CollectionReference<DocumentData> = usersRef;
  q = query(q, where(documentId(), '==', userUid));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return firestoreUserConverter.fromFirestore(snapshot.docs[0]);
}
