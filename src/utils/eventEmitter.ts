type EventCallback = () => void;

class EventEmitter {
  private events: { [key: string]: EventCallback[] } = {};

  on(event: string, callback: EventCallback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event: string) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback());
    }
  }
}

const eventEmitter = new EventEmitter();
export default eventEmitter;
