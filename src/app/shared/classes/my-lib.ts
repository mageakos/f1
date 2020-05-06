// validators class for core widgets and components
export class Valid {
  // keep my undefined variable, undefined
  private undefined;
  public readonly id = 'myLibUniqueIdentifier';

  public isObject = (obj) => {
    if (obj === this.undefined) {
      return true;
    }
    return typeof obj === 'object' && obj !== null;
  };

  public isNumber(val: any) {
    // tslint:disable-next-line:no-construct
    const x = new Number(val);
    return (
      typeof x === 'number' ||
      (typeof x === 'object' &&
        typeof x.valueOf() === 'number' &&
        !isNaN(x.valueOf()))
    );
  }

  public validate = (fn: any, val: string) => {
    if (typeof fn === 'function') {
      if (!fn()) {
        throw Error(val);
      }
    }
    if (!fn) {
      throw Error(val);
    }
    return true;
  };

  public validateId = (item) => {
    if (item && this.isObject(item)) {
      item[this.id] = this.getId();

      Object.keys(item).forEach((property) => {
        if (property && Array.isArray(property)) {
          property.forEach((p) => this.validateId(p));
        }
        if (property && this.isObject(property)) {
          this.validateId(property);
        }
      });
      return item[this.id];
    }
    return null;
  };

  public getId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // tslint:disable-next-line:no-bitwise
      const r = (Math.random() * 16) | 0;
      // tslint:disable-next-line:no-bitwise
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

export class MyLib {
  public static valid: Valid = new Valid();
}
