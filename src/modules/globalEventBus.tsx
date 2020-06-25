import { EventEmitter } from "libs/events";

export default new EventEmitter<{
  ADD_TOAST: {
    text: string;
    cancelButton?: {
      text: string;
      onClick: () => void;
    };
  };
  SET_REQUEST_MANAGER_ERROR_INTERCEPTOR_ENABLED: boolean;
}>();
