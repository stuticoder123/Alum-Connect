import Peer from 'peerjs';

interface CallOptions {
  video: boolean;
  audio: boolean;
}

interface PeerConnection {
  peer: Peer;
  call?: any;
  stream?: MediaStream;
}

class WebRTCService {
  private peer: Peer | null = null;
  private localStream: MediaStream | null = null;
  private remoteStream: MediaStream | null = null;
  private currentCall: any = null;
  private isInitialized = false;

  async initialize(userId: string): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      // Initialize PeerJS
      this.peer = new Peer(userId, {
        host: 'localhost', // Replace with your PeerJS server
        port: 9000,
        path: '/peerjs',
        debug: 2
      });

      this.peer.on('open', (id) => {
        console.log('PeerJS connection opened with ID:', id);
        this.isInitialized = true;
      });

      this.peer.on('error', (error) => {
        console.error('PeerJS error:', error);
      });

      this.peer.on('call', (call) => {
        this.handleIncomingCall(call);
      });

    } catch (error) {
      console.error('Error initializing WebRTC:', error);
      throw error;
    }
  }

  async getLocalStream(options: CallOptions): Promise<MediaStream> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: options.video,
        audio: options.audio
      });
      
      this.localStream = stream;
      return stream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      throw error;
    }
  }

  async makeCall(targetPeerId: string, options: CallOptions): Promise<void> {
    if (!this.peer) {
      throw new Error('Peer not initialized');
    }

    try {
      const stream = await this.getLocalStream(options);
      const call = this.peer.call(targetPeerId, stream);
      
      this.currentCall = call;

      call.on('stream', (remoteStream: MediaStream) => {
        this.remoteStream = remoteStream;
        this.onRemoteStream?.(remoteStream);
      });

      call.on('close', () => {
        this.endCall();
      });

      call.on('error', (error: any) => {
        console.error('Call error:', error);
        this.onCallError?.(error);
      });

    } catch (error) {
      console.error('Error making call:', error);
      throw error;
    }
  }

  async answerCall(call: any, options: CallOptions): Promise<void> {
    try {
      const stream = await this.getLocalStream(options);
      call.answer(stream);
      
      this.currentCall = call;

      call.on('stream', (remoteStream: MediaStream) => {
        this.remoteStream = remoteStream;
        this.onRemoteStream?.(remoteStream);
      });

      call.on('close', () => {
        this.endCall();
      });

    } catch (error) {
      console.error('Error answering call:', error);
      throw error;
    }
  }

  endCall(): void {
    if (this.currentCall) {
      this.currentCall.close();
      this.currentCall = null;
    }

    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }

    if (this.remoteStream) {
      this.remoteStream.getTracks().forEach(track => track.stop());
      this.remoteStream = null;
    }

    this.onCallEnded?.();
  }

  toggleMute(): boolean {
    if (this.localStream) {
      const audioTrack = this.localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        return !audioTrack.enabled; // Return true if muted
      }
    }
    return false;
  }

  toggleVideo(): boolean {
    if (this.localStream) {
      const videoTrack = this.localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        return videoTrack.enabled; // Return true if video is on
      }
    }
    return false;
  }

  private handleIncomingCall(call: any): void {
    this.onIncomingCall?.(call);
  }

  // Event handlers (to be set by the component)
  onIncomingCall?: (call: any) => void;
  onRemoteStream?: (stream: MediaStream) => void;
  onCallEnded?: () => void;
  onCallError?: (error: any) => void;

  destroy(): void {
    this.endCall();
    
    if (this.peer) {
      this.peer.destroy();
      this.peer = null;
    }
    
    this.isInitialized = false;
  }

  getLocalStream(): MediaStream | null {
    return this.localStream;
  }

  getRemoteStream(): MediaStream | null {
    return this.remoteStream;
  }

  isInCall(): boolean {
    return this.currentCall !== null;
  }
}

export const webRTCService = new WebRTCService();
export default WebRTCService;