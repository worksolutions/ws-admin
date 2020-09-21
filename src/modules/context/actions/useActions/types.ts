import { EventEmitter } from "libs/events";

export interface ActionInputDataInterface extends WithActionDiscardEventEmitterInterface {
  inputData: any;
  previousActionOutput?: any;
}

export type ActionDiscardEventEmitterEvents = { DISCARD: null };

interface WithActionDiscardEventEmitterInterface {
  discardEventEmitter: EventEmitter<ActionDiscardEventEmitterEvents>;
}
