import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
  Query,
  CollectionReference,
  orderBy,
  limit,
  setDoc,
  doc,
  addDoc,
} from 'firebase/firestore';
import { StoryDto } from '../../types/content/storyDto';
import { AccessLevel } from '../../types/enum/accessLevel';
import { PublishStatus } from '../../types/enum/publishStatus';
import { FirestoreCollections } from '../core/firestoreCollections';
import { db } from '../core/initializeFirebase';
import { firestoreStoryConverter, formatDateString } from './storyConverter';
import { StoryFields } from './storyFields';

export const getStories = async (
  onlyFeatured: boolean = false,
  tag: string | null = null,
  fetchLimit: number | null = null,
  accessLevel: AccessLevel = AccessLevel.USER
): Promise<StoryDto[]> => {
  const thotsRef = collection(db, FirestoreCollections.thots);
  let q: Query<DocumentData> | CollectionReference<DocumentData> = thotsRef;
  if (tag) q = query(q, where(StoryFields.tags, 'array-contains', tag));
  if (onlyFeatured) q = query(q, where(StoryFields.featured, '==', true));
  q = fillQueryForAccessLevel(q, accessLevel);
  if (fetchLimit) q = query(q, limit(fetchLimit));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => firestoreStoryConverter.fromFirestore(doc));
};

export const getStoryBySlug = async (
  slug: string,
  accessLevel: AccessLevel = AccessLevel.USER
): Promise<StoryDto | null> => {
  console.log(slug, accessLevel);
  const thotsRef = collection(db, FirestoreCollections.thots);
  let q: Query<DocumentData> | CollectionReference<DocumentData> = thotsRef;
  q = fillQueryForAccessLevel(
    query(q, where(StoryFields.slug, '==', slug)),
    accessLevel
  );
  q = query(q, limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  return firestoreStoryConverter.fromFirestore(snapshot.docs[0]);
};

export const getStoriesBySlugIn = async (
  slugs: string[],
  accessLevel: AccessLevel = AccessLevel.USER
): Promise<StoryDto[]> => {
  const thotsRef = collection(db, FirestoreCollections.thots);
  let q: Query<DocumentData> | CollectionReference<DocumentData> = thotsRef;
  q = query(q, where(StoryFields.slug, 'in', slugs));
  q = fillQueryForAccessLevel(q, accessLevel);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => firestoreStoryConverter.fromFirestore(doc));
};

const fillQueryForAccessLevel = (
  q: Query<DocumentData>,
  accessLevel: AccessLevel
): Query<DocumentData> => {
  switch (accessLevel) {
    case AccessLevel.USER:
      return query(
        q,
        where(
          StoryFields.publishStatus,
          '==',
          PublishStatus.PUBLISHED.toLongString()
        ),
        where(StoryFields.publishDate, '<=', formatDateString(new Date())),
        orderBy(StoryFields.publishDate, 'desc')
      );
    case AccessLevel.ADMIN:
      return query(q, orderBy(StoryFields.publishDate, 'desc'));
    default:
      return q;
  }
};

export const saveStory = async (storyDto: StoryDto): Promise<string> => {
  if (!storyDto.id) {
    const docRef = await addDoc(
      collection(db, FirestoreCollections.thots),
      firestoreStoryConverter.toFirestore(storyDto)
    );
    return docRef.id;
  } else {
    await setDoc(
      doc(db, FirestoreCollections.thots, storyDto.id),
      firestoreStoryConverter.toFirestore(storyDto),
      { merge: true }
    );
    return storyDto.id;
  }
};
