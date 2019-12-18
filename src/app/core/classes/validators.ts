// validators class for core widgets and components
export class Valid {
  static isObject = obj => {
    console.warn('validating object');
    return typeof obj === 'object' && obj !== null;
  }

  static validator = (fn: any, val: string) => {
    console.warn('validating ');
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
