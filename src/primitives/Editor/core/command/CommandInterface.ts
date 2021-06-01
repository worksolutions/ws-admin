export interface CommandInterface {
  execute(...args: any): void;
  destroy(...args: any): void;
  refresh(...args: any): void;
}
