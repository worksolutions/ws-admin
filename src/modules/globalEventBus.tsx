import { EventEmitter } from "libs/events";

export default new EventEmitter<{
  ADD_TOAST: BaseToastInterface;
  SET_REQUEST_MANAGER_ERROR_INTERCEPTOR_ENABLED: boolean;
}>();

export interface BaseToastInterface {
  text: string;
  error?: boolean;
  cancelButton?: {
    text: string;
    onClick: () => void;
  };
}
