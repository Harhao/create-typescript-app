/**
 * event
 */

type Listener = (...args: any[]) => void;

export class EventEmitter {
  private events: Record<string, Listener[]> = {};

  on(eventName: string, listener: Listener): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  emit(eventName: string, ...args: any[]): void {
    if (this.events[eventName]) {
      this.events[eventName].forEach(listener => {
        listener.apply(null, args);
      });
    }
  }

  off(eventName: string, listener?: Listener): void {
    if (this.events[eventName]) {
      if (listener) {
        this.events[eventName] = this.events[eventName].filter(l => l !== listener);
      } else {
        delete this.events[eventName];
      }
    }
  }
}

export const eventEmitter = new EventEmitter();

// case:
// eventEmitter.on('event', function (arg1, arg2) {
//   console.log('event triggered with arguments:', arg1, arg2);
// });
// eventEmitter.emit('event', 'hello', 'world');
// eventEmitter.off('event');
