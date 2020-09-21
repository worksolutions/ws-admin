import { EventEmitter } from "libs/events";

export interface ActionInputDataInterface extends WithActionEventEmitterInterface {
  inputData: any;
  previousActionOutput?: any;
}

export type ActionEventEmitterEvents = { DISCARD: null; PROGRESS: number };

interface WithActionEventEmitterInterface {
  eventEmitter: EventEmitter<ActionEventEmitterEvents>;
}
