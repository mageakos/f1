// declare new methods for arrays
export module ArrayExt {
  Array.prototype.contains = function(item) {
    let length = this.length;
    while (length--) {
      if (this[length] === item) return true;
    }
    return false;
  };

  Array.prototype.unique = function() {
    var arr = [];
    const length = this.length;
    for (var i = 0; i < length; i++) {
      if (!arr.contains(this[i])) {
        arr.push(this[i]);
      }
    }
    return arr;
  };
}