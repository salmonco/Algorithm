const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const N = +input[0];

class Node {
  constructor(v = "") {
    this.value = v;
    this.children = {};
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }
  insert(path) {
    const arr = path.split("\\");
    let currentNode = this.root;
    for (let v of arr) {
      if (!currentNode.children[v]) {
        currentNode.children[v] = new Node(currentNode.value + v);
      }
      currentNode = currentNode.children[v];
    }
  }
  print(length = 0, currentNode = this.root) {
    const keys = Object.keys(currentNode.children).sort();
    for (let child of keys) {
      console.log(" ".repeat(length) + child);
      this.print(length + 1, currentNode.children[child]);
    }
  }
}

const trie = new Trie();
for (let i = 0; i < N; i++) {
  const path = input[i + 1];
  trie.insert(path);
}
trie.print();

/*
트라이 자료구조
*/
