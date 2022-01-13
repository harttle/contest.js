var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateWrapper = (obj, member, setter, getter) => {
  return {
    set _(value) {
      __privateSet(obj, member, value, setter);
    },
    get _() {
      return __privateGet(obj, member, getter);
    }
  };
};
var _size;
class CircularDeque {
  constructor(N) {
    this.prev = this.next = null;
    this.begin = this.end = 0;
    this.empty = true;
    this.data = Array(N);
  }
  isFull() {
    return this.end === this.begin && !this.empty;
  }
  isEmpty() {
    return this.empty;
  }
  push(val) {
    if (this.isFull())
      return false;
    this.empty = false;
    this.data[this.end] = val;
    this.end = (this.end + 1) % this.data.length;
    return true;
  }
  front() {
    return this.isEmpty() ? void 0 : this.data[this.begin];
  }
  back() {
    return this.isEmpty() ? void 0 : this.data[this.end - 1];
  }
  pop() {
    if (this.isEmpty())
      return void 0;
    const value = this.data[this.end - 1];
    this.end = (this.end - 1) % this.data.length;
    if (this.end < 0)
      this.end += this.data.length;
    if (this.end === this.begin)
      this.empty = true;
    return value;
  }
  unshift(val) {
    if (this.isFull())
      return false;
    this.empty = false;
    this.begin = (this.begin - 1) % this.data.length;
    if (this.begin < 0)
      this.begin += this.data.length;
    this.data[this.begin] = val;
    return true;
  }
  shift() {
    if (this.isEmpty())
      return void 0;
    const value = this.data[this.begin];
    this.begin = (this.begin + 1) % this.data.length;
    if (this.end === this.begin)
      this.empty = true;
    return value;
  }
  *values() {
    if (this.isEmpty())
      return void 0;
    let i = this.begin;
    do {
      yield this.data[i];
      i = (i + 1) % this.data.length;
    } while (i !== this.end);
  }
}
class Deque {
  constructor(collection = []) {
    __privateAdd(this, _size, void 0);
    this.head = new CircularDeque(128);
    this.tail = new CircularDeque(128);
    this.tail.empty = this.head.empty = false;
    this.tail.prev = this.head;
    this.head.next = this.tail;
    __privateSet(this, _size, 0);
    for (const item of collection)
      this.push(item);
  }
  size() {
    return __privateGet(this, _size);
  }
  push(val) {
    let last = this.tail.prev;
    if (last.isFull()) {
      const inserted = new CircularDeque(128);
      this.tail.prev = inserted;
      inserted.next = this.tail;
      last.next = inserted;
      inserted.prev = last;
      last = inserted;
    }
    last.push(val);
    __privateWrapper(this, _size)._++;
  }
  back() {
    if (__privateGet(this, _size) === 0)
      return;
    return this.tail.prev.back();
  }
  pop() {
    if (this.head.next === this.tail)
      return void 0;
    const last = this.tail.prev;
    const value = last.pop();
    if (last.isEmpty()) {
      this.tail.prev = last.prev;
      last.prev.next = this.tail;
    }
    __privateWrapper(this, _size)._--;
    return value;
  }
  unshift(val) {
    let first = this.head.next;
    if (first.isFull()) {
      const inserted = new CircularDeque(128);
      this.head.next = inserted;
      inserted.prev = this.head;
      inserted.next = first;
      first.prev = inserted;
      first = inserted;
    }
    first.unshift(val);
    __privateWrapper(this, _size)._++;
  }
  shift() {
    if (this.head.next === this.tail)
      return void 0;
    const first = this.head.next;
    const value = first.shift();
    if (first.isEmpty()) {
      this.head.next = first.next;
      first.next.prev = this.head;
    }
    __privateWrapper(this, _size)._--;
    return value;
  }
  front() {
    if (__privateGet(this, _size) === 0)
      return void 0;
    return this.head.next.front();
  }
  *values() {
    let node = this.head.next;
    while (node !== this.tail) {
      for (const value of node.values())
        yield value;
      node = node.next;
    }
  }
}
_size = new WeakMap();
export {
  CircularDeque,
  Deque
};
