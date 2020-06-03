import { EventEmitter } from "libs/events";

export default new EventEmitter<{
  ADD_TOAST: {
    text: string;
    cancelButton?: {
      text: string;
      onClick: () => void;
    };
  };
}>();
