export default interface FileInterface {
  link: string;
  name: string;
  bytes: number;
  rawFile?: File;
  loading?: boolean;
  error?: string | boolean;
}
