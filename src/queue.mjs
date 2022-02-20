class ListNode {
  constructor(val = void 0, next = null) {
    this.value = val;
    this.next = next;
  }
}
class Queue {
  constructor(collection = []) {
    this.lead = new ListNode();
    this.tail = this.lead;
    this._size = 0;
    for (const item of collection)
      this.push(item);
  }
  size() {
    return this._size;
  }
  push(value) {
    this.tail = this.tail.next = new ListNode(value);
    this._size++;
  }
  back() {
    return this.tail.value;
  }
  shift() {
    if (!this._size)
      return void 0;
    const first = this.lead.next;
    this.lead.next = first.next;
    this._size--;
    if (this._size === 0)
      this.tail = this.lead;
    return first.value;
  }
  front() {
    if (!this._size)
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
export {
  ListNode,
  Queue
};
