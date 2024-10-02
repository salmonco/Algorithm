const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const preorder = input.map(Number);

class Node {
  constructor(v) {
    this.v = v;
    this.leftChild = null;
    this.rightChild = null;
  }
}

class BST {
  constructor() {
    this.root = null;
    this.cnt = 0;
  }
  push(v) {
    const newNode = new Node(v);
    if (this.cnt === 0) {
      this.root = newNode;
      this.cnt++;
      return;
    }
    this.insertNode(newNode, this.root);
    this.cnt++;
  }
  insertNode(node, root) {
    if (!root) return node;
    if (node.v < root.v) {
      root.leftChild = this.insertNode(node, root.leftChild);
      return root;
    } else {
      root.rightChild = this.insertNode(node, root.rightChild);
      return root;
    }
  }
}

const bst = new BST();
preorder.forEach((v) => bst.push(v));
const ans = [];
const postorderTraverse = (node) => {
  if (node.leftChild) {
    postorderTraverse(node.leftChild);
  }
  if (node.rightChild) {
    postorderTraverse(node.rightChild);
  }
  ans.push(node.v);
};
postorderTraverse(bst.root);
console.log(ans.join("\n"));

/*
오래 걸림
값 push해서 BST 구현하는 거 알아두면 좋을 듯

전위 순회 결과를 주고, 후위 순회 결과를 출력하라.
-> 이진 트리 만들고 후위 순회하기

이전 값보다 값이 작으면, 왼쪽 자식 추가하기
값이 크면, 상위 노드로 올라가서 오른쪽 자식 추가하기

60이 52의 자식인지, 98의 자식인지 어떻게 알지?
아, 60은 98보다 작아서 오른쪽 자식이 될 수 없음

값이 크면, 상위 노드보다 큰지 확인하고
상위 노드보다 값이 크면 상위 노드로 올라가서 오른쪽 자식 추가하기
아니면 이전 값의 오른쪽 자식 추가하기
-> 이진 트리 만드는 거 왜 안되지? 왜 rightChild가 안 들어갈까

다른사람풀이1: 전위 순회 결과 상관 없이, 그냥 BST 구현해서 값 집어넣기

다른사람풀이2: 전위 순회 결과를 루트, 왼쪽 서브트리, 오른쪽 서브트리로 나누고,
왼쪽 서브트리, 오른쪽 서브트리, 루트 순으로 재귀 돌리기

*/
