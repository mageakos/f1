// validators class for core widgets and components
export class Valid {
  undefined;
  static isObject = obj => {
    if (obj === undefined) { return true; }
    return typeof obj === 'object' && obj !== null;
  }

  static validator = (fn: any, val: string) => {
    if (typeof fn === 'function') {
      if (!fn()) {
        throw Error(val);
      }
    }
    if (!fn) {
      throw Error(val);
    }
  }
}
