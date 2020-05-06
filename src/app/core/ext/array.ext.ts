// declare new methods for arrays
// tslint:disable-next-line:no-namespace
export namespace ArrayExt {
  Array.prototype.contains = function (item) {
    let length = this.length;
    while (length--) {
      if (this[length] === item) {
        return true;
      }
    }
    return false;
  };

  Array.prototype.unique = function () {
    const arr = [];
    const length = this.length;
    for (let i = 0; i < length; i++) {
      if (!arr.contains(this[i])) {
        arr.push(this[i]);
      }
    }
    return arr;
  };
}
