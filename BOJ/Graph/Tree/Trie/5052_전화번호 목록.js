const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const T = +input[0];

class Node {
  constructor(value = "") {
    this.value = value;
    this.children = {};
    this.isTerminal = false;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(arr) {
    let currentNode = this.root;

    for (let i = 0; i < arr.length; i++) {
      const v = arr[i];
      if (!currentNode.children[v]) {
        currentNode.children[v] = new Node(currentNode.value + v);
      }
      currentNode = currentNode.children[v];

      // If a prefix of the number is already a complete number
      if (currentNode.isTerminal) {
        return false;
      }
    }

    // If the number is a prefix of an existing number
    if (Object.keys(currentNode.children).length > 0) {
      return false;
    }

    currentNode.isTerminal = true;
    return true;
  }
}

let t = 0;
let i = 1;
while (t < T) {
  const N = +input[i];
  const trie = new Trie();
  let isNew = true;

  for (let j = 0; j < N; j++) {
    const num = input[i + j + 1];
    const arr = num.split("");
    if (!trie.insert(arr)) {
      isNew = false;
      break;
    }
  }
  if (isNew) console.log("YES");
  else console.log("NO");

  i += N + 1;
  t++;
}

/*
Trie 자료구조 = retrieval tree

insert할 때 children이 없는 마지막 노드가 있는지 확인

10%에서 실패
-> 전화번호를 숫자로 변환한 후 다시 문자열로 변환하는 과정에서, 선두의 '0'이 사라짐
-> 마지막 노드 조건 확인: If the number is a prefix of an existing number
*/
