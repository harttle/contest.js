class TrieNode {
  constructor() {
    this.count = 0;
    this.countPrefix = 0;
    this.children = {};
  }
}
;
class Trie {
  constructor() {
    this.trie = new TrieNode();
  }
  insert(str, count = 1) {
    var _a, _b;
    let cur = this.trie;
    for (const char of str) {
      (_b = (_a = cur.children)[char]) != null ? _b : _a[char] = new TrieNode();
      cur = cur.children[char];
      cur.countPrefix += count;
    }
    cur.count += count;
  }
  traverse(str, callbackfn, thisArg) {
    let cur = this.trie;
    for (let i = 0; i < str.length; i++) {
      const retChar = callbackfn.call(thisArg, str[i], i, cur);
      const tmp = cur.children[retChar];
      if (!tmp || tmp.countPrefix <= 0)
        return;
      cur = tmp;
    }
  }
  count(str) {
    let ans = 0;
    this.traverse(str, (char, idx, node) => {
      const nextNode = node.children[char];
      if (idx === str.length - 1 && nextNode) {
        ans = nextNode.count;
      }
      return char;
    });
    return ans;
  }
  countPrefix(str) {
    let ans = 0;
    this.traverse(str, (char, idx, node) => {
      var _a;
      const nextNode = node.children[char];
      ans += (_a = nextNode == null ? void 0 : nextNode.countPrefix) != null ? _a : 0;
      return char;
    });
    return ans;
  }
}
;
export {
  Trie,
  TrieNode
};
