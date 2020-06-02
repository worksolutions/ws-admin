import { useEffect, useRef } from "react";
import EE from "events";

export class EventEmitter<LIST_EVENTS_TYPES> {
  private eventEmitter: EE;

  constructor() {
    this.eventEmitter = new EE();
    this.eventEmitter.setMaxListeners(0);
  }

  emit<TYPE extends keyof LIST_EVENTS_TYPES>(type: TYPE, payload: LIST_EVENTS_TYPES[TYPE]) {
    this.eventEmitter.emit(type as string, payload);
  }

  removeListener<TYPE extends keyof LIST_EVENTS_TYPES>(
    event: TYPE,
    handler: (payload: LIST_EVENTS_TYPES[TYPE]) => void,
  ) {
    this.eventEmitter.removeListener(event as string, handler);
  }

  public on<TYPE extends keyof LIST_EVENTS_TYPES>(type: TYPE, handler: (payload: LIST_EVENTS_TYPES[TYPE]) => void) {
    this.eventEmitter.addListener(type as string, handler);
  }
}

export function useEventEmitter<EventsMap, Event extends keyof EventsMap>(
  eventEmitter: EventEmitter<EventsMap>,
  eventType: Event,
  handler: (payload: EventsMap[Event]) => void,
) {
  const previousHandlerRef = useRef<any>(null);
  useEffect(() => {
    const previousHandler = previousHandlerRef.current;
    previousHandler && eventEmitter.removeListener(eventType, previousHandler);
    eventEmitter.on(eventType, handler);
    previousHandlerRef.current = handler;
  }, [eventEmitter, eventType, handler]);

  useEffect(
    () => () => {
      eventEmitter.removeListener(eventType, previousHandlerRef.current);
    },
    [eventEmitter, eventType],
  );
}
