import { io, Socket } from 'socket.io-client';

interface ChatUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen: Date;
  role: 'student' | 'alumni' | 'admin';
}

interface ChatMessage {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'code' | 'system';
  threadId?: string;
  isPinned?: boolean;
  reactions: { [emoji: string]: string[] };
  mentions: string[];
}

class SocketService {
  private socket: Socket | null = null;
  private isConnected = false;

  connect(userId: string, userInfo: { name: string; email: string; avatar?: string }) {
    if (this.socket) {
      this.disconnect();
    }

    // In production, replace with your actual server URL
    this.socket = io(process.env.NODE_ENV === 'production' ? 'wss://your-server.com' : 'ws://localhost:3001', {
      auth: {
        userId,
        userInfo
      },
      transports: ['websocket']
    });

    this.socket.on('connect', () => {
      console.log('Connected to chat server');
      this.isConnected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from chat server');
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Message events
  sendMessage(message: Omit<ChatMessage, 'id' | 'timestamp'>) {
    if (this.socket && this.isConnected) {
      this.socket.emit('send_message', message);
    }
  }

  onNewMessage(callback: (message: ChatMessage) => void) {
    if (this.socket) {
      this.socket.on('new_message', callback);
    }
  }

  onMessageReaction(callback: (data: { messageId: string; emoji: string; userId: string; action: 'add' | 'remove' }) => void) {
    if (this.socket) {
      this.socket.on('message_reaction', callback);
    }
  }

  addReaction(messageId: string, emoji: string) {
    if (this.socket && this.isConnected) {
      this.socket.emit('add_reaction', { messageId, emoji });
    }
  }

  removeReaction(messageId: string, emoji: string) {
    if (this.socket && this.isConnected) {
      this.socket.emit('remove_reaction', { messageId, emoji });
    }
  }

  // User presence events
  onUserJoined(callback: (user: ChatUser) => void) {
    if (this.socket) {
      this.socket.on('user_joined', callback);
    }
  }

  onUserLeft(callback: (userId: string) => void) {
    if (this.socket) {
      this.socket.on('user_left', callback);
    }
  }

  onUsersOnline(callback: (users: ChatUser[]) => void) {
    if (this.socket) {
      this.socket.on('users_online', callback);
    }
  }

  // Thread events
  createThread(thread: { title: string; topic: string; tags: string[] }) {
    if (this.socket && this.isConnected) {
      this.socket.emit('create_thread', thread);
    }
  }

  onThreadCreated(callback: (thread: any) => void) {
    if (this.socket) {
      this.socket.on('thread_created', callback);
    }
  }

  // Live session events
  joinLiveSession(sessionId: string) {
    if (this.socket && this.isConnected) {
      this.socket.emit('join_live_session', { sessionId });
    }
  }

  leaveLiveSession(sessionId: string) {
    if (this.socket && this.isConnected) {
      this.socket.emit('leave_live_session', { sessionId });
    }
  }

  onLiveSessionUpdate(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('live_session_update', callback);
    }
  }

  // Voice/Video call events
  initiateCall(targetUserId: string, type: 'audio' | 'video') {
    if (this.socket && this.isConnected) {
      this.socket.emit('initiate_call', { targetUserId, type });
    }
  }

  acceptCall(callId: string) {
    if (this.socket && this.isConnected) {
      this.socket.emit('accept_call', { callId });
    }
  }

  rejectCall(callId: string) {
    if (this.socket && this.isConnected) {
      this.socket.emit('reject_call', { callId });
    }
  }

  endCall(callId: string) {
    if (this.socket && this.isConnected) {
      this.socket.emit('end_call', { callId });
    }
  }

  onIncomingCall(callback: (data: { callId: string; from: ChatUser; type: 'audio' | 'video' }) => void) {
    if (this.socket) {
      this.socket.on('incoming_call', callback);
    }
  }

  onCallAccepted(callback: (data: { callId: string; peer: ChatUser }) => void) {
    if (this.socket) {
      this.socket.on('call_accepted', callback);
    }
  }

  onCallRejected(callback: (data: { callId: string }) => void) {
    if (this.socket) {
      this.socket.on('call_rejected', callback);
    }
  }

  onCallEnded(callback: (data: { callId: string }) => void) {
    if (this.socket) {
      this.socket.on('call_ended', callback);
    }
  }

  // Bot events
  sendBotCommand(command: string) {
    if (this.socket && this.isConnected) {
      this.socket.emit('bot_command', { command });
    }
  }

  onBotResponse(callback: (response: any) => void) {
    if (this.socket) {
      this.socket.on('bot_response', callback);
    }
  }

  // Typing indicators
  startTyping(threadId?: string) {
    if (this.socket && this.isConnected) {
      this.socket.emit('start_typing', { threadId });
    }
  }

  stopTyping(threadId?: string) {
    if (this.socket && this.isConnected) {
      this.socket.emit('stop_typing', { threadId });
    }
  }

  onUserTyping(callback: (data: { userId: string; threadId?: string }) => void) {
    if (this.socket) {
      this.socket.on('user_typing', callback);
    }
  }

  onUserStoppedTyping(callback: (data: { userId: string; threadId?: string }) => void) {
    if (this.socket) {
      this.socket.on('user_stopped_typing', callback);
    }
  }

  getConnectionStatus() {
    return this.isConnected;
  }
}

export const socketService = new SocketService();
export default SocketService;