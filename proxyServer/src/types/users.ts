import { FileInterface } from './files';

export interface UserInterface {
  id: number;
  name: string;
  surname: string;
  email: string;
  position: string;
  active: boolean;
  image: FileInterface;
}
