export {};

declare global {
  interface Array<T> {
    unique(): Array<T>;
    contains(item: any): boolean;
  }
}
