import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebSocketDemoService {
  leakyStatus = signal('No connection');
  leakyMessages = signal<string[]>([]);
  properStatus = signal('No connection');
  properMessages = signal<string[]>([]);

  private leakySocket: WebSocket | null = null;
  private leakyInterval: number | null = null;
  private properSocket: WebSocket | null = null;
  private properInterval: number | null = null;

  connectLeaky() {
    this.connect(true);
  }

  connectProper() {
    this.connect(false);
  }

  private connect(isLeaky: boolean) {
    try {
      const socket = new WebSocket('wss://echo.websocket.org/');
      const prefix = isLeaky ? '❌ Leaky' : '✓ Proper';
      const msgPrefix = isLeaky ? 'Leaky' : 'Proper';
      const statusSignal = isLeaky ? this.leakyStatus : this.properStatus;
      const messagesSignal = isLeaky ? this.leakyMessages : this.properMessages;

      socket.onopen = () => {
        const status = isLeaky ? 'Connected (never closed!)' : 'Connected (will be closed)';
        statusSignal.set(status);
        console.log(`${prefix}: WebSocket connected`);
        let counter = 0;
        const interval = window.setInterval(() => {
          counter++;
          socket?.send(`${msgPrefix} message ${counter}`);
        }, 1000);
        if (isLeaky) {
          this.leakyInterval = interval;
          this.leakySocket = socket;
        } else {
          this.properInterval = interval;
          this.properSocket = socket;
        }
      };

      socket.onmessage = (event) => {
        const msgs = messagesSignal();
        messagesSignal.set([...msgs, `📩 ${event.data}`]);
        console.log(`${prefix} received:`, event.data);
      };

      socket.onclose = () => {
        statusSignal.set('Closed');
      };

      if (isLeaky) {
        this.leakySocket = socket;
      } else {
        this.properSocket = socket;
      }
    } catch (e) {
      const statusSignal = isLeaky ? this.leakyStatus : this.properStatus;
      statusSignal.set('Connection failed');
    }
  }

  closeProper() {
    if (this.properSocket) {
      this.properSocket.close();
      if (this.properInterval) {
        clearInterval(this.properInterval);
        this.properInterval = null;
      }
      console.log('✓ Closed: WebSocket connection closed');
      this.properStatus.set('Manually closed');
    }
  }

  cleanup() {
    if (this.properSocket) {
      this.properSocket.close();
      if (this.properInterval) {
        clearInterval(this.properInterval);
      }
      console.log('✓ Cleanup: WebSocket closed and messages stopped');
    }
  }
}
