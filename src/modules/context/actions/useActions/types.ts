import { EventEmitter } from "libs/events";
import { BaseError } from "libs/BaseError";

export interface ActionInputDataInterface extends WithActionEventEmitterInterface {
  inputData: any;
  previousActionOutput?: any;
}

export type ActionEventEmitterEvents = { DISCARD: null; PROGRESS: number; ERROR: BaseError };

interface WithActionEventEmitterInterface {
  eventEmitter: EventEmitter<ActionEventEmitterEvents>;
}
