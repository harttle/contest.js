export class ListNode<T = number> {
  value: T | undefined
  next: ListNode<T> | null
  constructor (val: T | undefined = undefined, next = null) {
    this.value = val
    this.next = next
  }
}
export class Queue<T=number> {
  lead: ListNode<T>
  tail: ListNode<T>
  #size: number
  constructor (collection: T[] = []) {
    this.lead = new ListNode<T>()
    this.tail = this.lead
    this.#size = 0
    for (const item of collection) this.push(item)
  }

  size (): number {
    return this.#size
  }

  push (value: T): void {
    this.tail = this.tail.next = new ListNode(value)
    this.#size++
  }

  back (): T {
    return this.tail.value!
  }

  shift (): T | undefined {
    if (!this.#size) return undefined
    const first = this.lead.next!
    this.lead.next = first.next
    this.#size--
    if (this.#size === 0) this.tail = this.lead
    return first.value
  }

  front (): T | undefined {
    if (!this.#size) return undefined
    return this.lead.next!.value
  }

  * values (): Generator<T, void, void> {
    let node = this.lead.next
    while (node) {
      yield node.value!
      node = node.next
    }
  }
}
