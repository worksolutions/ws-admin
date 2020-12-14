import { Injectable } from "@nestjs/common";

@Injectable()
export class ErrorService {
  handleError(msg, errors = {}) {
    return {
      success: false,
      message: msg,
      errors,
    };
  }
}
