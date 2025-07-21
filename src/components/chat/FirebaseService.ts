import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  where,
  updateDoc,
  doc,
  serverTimestamp,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

interface ChatMessage {
  id?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: any;
  type: 'text' | 'image' | 'file' | 'code' | 'system';
  threadId?: string;
  isPinned?: boolean;
  reactions: { [emoji: string]: string[] };
  mentions: string[];
  edited?: boolean;
  editedAt?: any;
}

interface ChatThread {
  id?: string;
  title: string;
  topic: string;
  createdBy: string;
  createdAt: any;
  messageCount: number;
  lastActivity: any;
  isPinned: boolean;
  tags: string[];
  participants: string[];
}

interface UserPresence {
  userId: string;
  userName: string;
  userAvatar?: string;
  isOnline: boolean;
  lastSeen: any;
  role: 'student' | 'alumni' | 'admin';
  contributions: number;
}

class FirebaseService {
  // Messages
  async sendMessage(message: Omit<ChatMessage, 'id' | 'timestamp'>) {
    try {
      const docRef = await addDoc(collection(db, 'messages'), {
        ...message,
        timestamp: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  subscribeToMessages(threadId: string | null, callback: (messages: ChatMessage[]) => void) {
    let q;
    if (threadId) {
      q = query(
        collection(db, 'messages'),
        where('threadId', '==', threadId),
        orderBy('timestamp', 'asc'),
        limit(100)
      );
    } else {
      q = query(
        collection(db, 'messages'),
        where('threadId', '==', null),
        orderBy('timestamp', 'asc'),
        limit(100)
      );
    }

    return onSnapshot(q, (snapshot) => {
      const messages: ChatMessage[] = [];
      snapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() } as ChatMessage);
      });
      callback(messages);
    });
  }

  async addReaction(messageId: string, emoji: string, userId: string) {
    try {
      const messageRef = doc(db, 'messages', messageId);
      await updateDoc(messageRef, {
        [`reactions.${emoji}`]: arrayUnion(userId)
      });
    } catch (error) {
      console.error('Error adding reaction:', error);
      throw error;
    }
  }

  async removeReaction(messageId: string, emoji: string, userId: string) {
    try {
      const messageRef = doc(db, 'messages', messageId);
      await updateDoc(messageRef, {
        [`reactions.${emoji}`]: arrayRemove(userId)
      });
    } catch (error) {
      console.error('Error removing reaction:', error);
      throw error;
    }
  }

  async pinMessage(messageId: string, isPinned: boolean) {
    try {
      const messageRef = doc(db, 'messages', messageId);
      await updateDoc(messageRef, {
        isPinned
      });
    } catch (error) {
      console.error('Error pinning message:', error);
      throw error;
    }
  }

  // Threads
  async createThread(thread: Omit<ChatThread, 'id' | 'createdAt' | 'lastActivity' | 'messageCount'>) {
    try {
      const docRef = await addDoc(collection(db, 'threads'), {
        ...thread,
        createdAt: serverTimestamp(),
        lastActivity: serverTimestamp(),
        messageCount: 0
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating thread:', error);
      throw error;
    }
  }

  subscribeToThreads(callback: (threads: ChatThread[]) => void) {
    const q = query(
      collection(db, 'threads'),
      orderBy('lastActivity', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
      const threads: ChatThread[] = [];
      snapshot.forEach((doc) => {
        threads.push({ id: doc.id, ...doc.data() } as ChatThread);
      });
      callback(threads);
    });
  }

  async updateThreadActivity(threadId: string) {
    try {
      const threadRef = doc(db, 'threads', threadId);
      await updateDoc(threadRef, {
        lastActivity: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating thread activity:', error);
      throw error;
    }
  }

  // User Presence
  async updateUserPresence(userId: string, userData: Omit<UserPresence, 'userId'>) {
    try {
      const userRef = doc(db, 'presence', userId);
      await updateDoc(userRef, {
        ...userData,
        lastSeen: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating user presence:', error);
      throw error;
    }
  }

  subscribeToOnlineUsers(callback: (users: UserPresence[]) => void) {
    const q = query(
      collection(db, 'presence'),
      where('isOnline', '==', true)
    );

    return onSnapshot(q, (snapshot) => {
      const users: UserPresence[] = [];
      snapshot.forEach((doc) => {
        users.push({ userId: doc.id, ...doc.data() } as UserPresence);
      });
      callback(users);
    });
  }

  // File Upload
  async uploadFile(file: File, path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  // Leaderboard
  async updateUserContributions(userId: string, increment: number = 1) {
    try {
      const userRef = doc(db, 'leaderboard', userId);
      await updateDoc(userRef, {
        contributions: increment,
        lastContribution: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating contributions:', error);
      throw error;
    }
  }

  subscribeToLeaderboard(callback: (users: any[]) => void) {
    const q = query(
      collection(db, 'leaderboard'),
      orderBy('contributions', 'desc'),
      limit(10)
    );

    return onSnapshot(q, (snapshot) => {
      const users: any[] = [];
      snapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      callback(users);
    });
  }

  // Live Sessions
  async createLiveSession(session: any) {
    try {
      const docRef = await addDoc(collection(db, 'liveSessions'), {
        ...session,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating live session:', error);
      throw error;
    }
  }

  subscribeToLiveSessions(callback: (sessions: any[]) => void) {
    const q = query(
      collection(db, 'liveSessions'),
      orderBy('scheduledAt', 'asc')
    );

    return onSnapshot(q, (snapshot) => {
      const sessions: any[] = [];
      snapshot.forEach((doc) => {
        sessions.push({ id: doc.id, ...doc.data() });
      });
      callback(sessions);
    });
  }

  async joinLiveSession(sessionId: string, userId: string) {
    try {
      const sessionRef = doc(db, 'liveSessions', sessionId);
      await updateDoc(sessionRef, {
        participants: arrayUnion(userId)
      });
    } catch (error) {
      console.error('Error joining live session:', error);
      throw error;
    }
  }

  async leaveLiveSession(sessionId: string, userId: string) {
    try {
      const sessionRef = doc(db, 'liveSessions', sessionId);
      await updateDoc(sessionRef, {
        participants: arrayRemove(userId)
      });
    } catch (error) {
      console.error('Error leaving live session:', error);
      throw error;
    }
  }
}

export const firebaseService = new FirebaseService();
export default FirebaseService;