const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" "));
const N = +input[0][0];
const tree = {};
for (let i = 0; i < N; i++) {
  const [root, leftChild, rightChild] = input[i + 1];
  tree[root] = [leftChild, rightChild];
}

let result = "";

const preorderTraversal = (node) => {
  if (node === ".") return;
  const [left, right] = tree[node];
  result += node; // root
  preorderTraversal(left); // left
  preorderTraversal(right); // right
};

const inorderTraversal = (node) => {
  if (node === ".") return;
  const [left, right] = tree[node];
  inorderTraversal(left); // left
  result += node; // root
  inorderTraversal(right); // right
};

const postorderTraversal = (node) => {
  if (node === ".") return;
  const [left, right] = tree[node];
  postorderTraversal(left); // left
  postorderTraversal(right); // right
  result += node; // root
};

preorderTraversal("A");
result += "\n";
inorderTraversal("A");
result += "\n";
postorderTraversal("A");
console.log(result);

// const preorderTraversal = (node) => {
//     const newTree = JSON.parse(JSON.stringify(tree))
//     const ans = []
//     const queue = [node]
//     let head = 0
//     const visited = Array.from({ length: N }, () => false)
//     while (queue.length > head) {
//         // console.log(queue, head, ans)
//         if (ans.length === N) break
//         const root = queue[head++]
//         if (!visited[root]) ans.push(root)
//         visited[root] = true
//         const [leftChild, rightChild] = newTree[root]
//         if (leftChild !== '.') {
//             queue.push(leftChild)
//             newTree[root][0] = '.'
//         } else if (rightChild !== '.') {
//             queue.push(rightChild)
//             newTree[root][1] = '.'
//         } else {
//             queue.pop()
//             head -= 2
//         }
//     }
//     return ans
// }

// const inorderTraversal = (node) => {
//     const newTree = JSON.parse(JSON.stringify(tree))
//     const ans = []
//     const queue = [node]
//     let head = 0
//     const visited = Array.from({ length: N }, () => false)
//     while (queue.length > head) {
//         // console.log(queue, head, ans)
//         if (ans.length === N) break
//         const root = queue[head++]
//         const [leftChild, rightChild] = newTree[root]
//         // start
//         if (leftChild === '.' && rightChild === '.') {
//             if (!visited[root]) ans.push(root)
//             visited[root] = true
//         }
//         // end
//         if (leftChild !== '.') {
//             queue.push(leftChild)
//             newTree[root][0] = '.'
//         } else if (rightChild !== '.') {
//             // start
//             if (!visited[root]) ans.push(root)
//             visited[root] = true
//             // end
//             queue.push(rightChild)
//             newTree[root][1] = '.'
//         } else {
//             queue.pop()
//             head -= 2
//         }
//     }
//     return ans
// }

// const postorderTraversal = (node) => {
//     const newTree = JSON.parse(JSON.stringify(tree))
//     const ans = []
//     const queue = [node]
//     let head = 0
//     const visited = Array.from({ length: N }, () => false)
//     while (queue.length > head) {
//         // console.log(queue, head, ans)
//         if (ans.length === N) break
//         const root = queue[head++]
//         const [leftChild, rightChild] = newTree[root]
//         // start
//         if (leftChild === '.' && rightChild === '.') {
//             if (!visited[root]) ans.push(root)
//             visited[root] = true
//         }
//         // end
//         if (leftChild !== '.') {
//             queue.push(leftChild)
//             newTree[root][0] = '.'
//         } else if (rightChild !== '.') {
//             queue.push(rightChild)
//             newTree[root][1] = '.'
//         } else {
//             queue.pop()
//             head -= 2
//         }
//     }
//     return ans
// }

// const preorder = preorderTraversal('A')
// console.log(preorder.join(''))

// const inorder = inorderTraversal('A')
// console.log(inorder.join(''))

// const postorder = postorderTraversal('A')
// console.log(postorder.join(''))

/*
이진 트리를 입력받아 전위 순회(preorder traversal), 중위 순회(inorder traversal), 후위 순회(postorder traversal)한 결과를 출력
- 전위 순회한 결과 : ABDCEFG // (루트) (왼쪽 자식) (오른쪽 자식)
- 중위 순회한 결과 : DBAECFG // (왼쪽 자식) (루트) (오른쪽 자식)
- 후위 순회한 결과 : DBEGFCA // (왼쪽 자식) (오른쪽 자식) (루트)

트리의 순회
처음 시도: 큐
다른 사람 풀이: 재귀
*/
