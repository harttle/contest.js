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
class ListNode {
  constructor(val = void 0, next = null) {
    this.value = val;
    this.next = next;
  }
}
class Queue {
  constructor(collection = []) {
    __privateAdd(this, _size, void 0);
    this.lead = new ListNode();
    this.tail = this.lead;
    __privateSet(this, _size, 0);
    for (const item of collection)
      this.push(item);
  }
  size() {
    return __privateGet(this, _size);
  }
  push(value) {
    this.tail = this.tail.next = new ListNode(value);
    __privateWrapper(this, _size)._++;
  }
  back() {
    return this.tail.value;
  }
  shift() {
    if (!__privateGet(this, _size))
      return void 0;
    const first = this.lead.next;
    this.lead.next = first.next;
    __privateWrapper(this, _size)._--;
    if (__privateGet(this, _size) === 0)
      this.tail = this.lead;
    return first.value;
  }
  front() {
    if (!__privateGet(this, _size))
      return void 0;
    return this.lead.next.value;
  }
  *values() {
    let node = this.lead.next;
    while (node) {
      yield node.value;
      node = node.next;
    }
  }
}
_size = new WeakMap();
export {
  ListNode,
  Queue
};
