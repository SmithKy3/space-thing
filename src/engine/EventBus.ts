type EventCallback = (data: any) => void;

export enum EventType {
  BodySelected,
  UpdateVelocity,
  UpdateOrbitElevation,
}

interface ISubscription {
  eventType: EventType;
  callback: EventCallback;
}

// A simple event bus i wrote primarily for passing data between engine files and react components
export namespace EventBus {
  const subscriptions = new Map<symbol, ISubscription>();

  export function subscribe(
    eventType: EventType,
    callback: EventCallback
  ): symbol {
    const id = Symbol();

    subscriptions.set(id, {
      eventType,
      callback,
    });

    return id;
  }

  export function unsubscribe(id: symbol): void {
    subscriptions.delete(id);
  }

  export function publish(eventType: EventType, data: any): void {
    [...subscriptions.values()].forEach((subscription) => {
      if (subscription.eventType === eventType) {
        subscription.callback(data);
      }
    });
  }
}
