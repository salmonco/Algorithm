const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const N = +input[0][0];

class Node {
  constructor(value = "") {
    this.value = value;
    this.children = [];
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(arr) {
    let currentNode = this.root;
    const words = arr;
    words.shift(); // 첫번째 요소(크기) 제거

    for (const word of words) {
      if (!currentNode.children[word]) {
        currentNode.children[word] = new Node(currentNode.value + word);
      }
      currentNode = currentNode.children[word];
    }
  }

  print(length = 0, curNode = this.root) {
    //   console.log(curNode.children, Object.keys(curNode.children))
    for (const child of Object.keys(curNode.children).sort()) {
      console.log("--".repeat(length) + child);
      this.print(length + 1, curNode.children[child]);
    }
  }
}

const trie = new Trie();
for (let i = 0; i < N; i++) {
  trie.insert(input[i + 1]);
}
trie.print();

/*
KIWI
--BANANA
--APPLE
APPLE
--APPLE
--BNANA
----KIWI

Trie 자료구조
: 트리 형태
: 문자열 탐색이 빠름 -> 문자열 길이만큼 노드 따라가면 됨. but 메모리 공간을 많이 씀
: 자동완성 기능, 사전 검색 등 문자열을 탐색하는데 특화되어있는 자료구조
*/
