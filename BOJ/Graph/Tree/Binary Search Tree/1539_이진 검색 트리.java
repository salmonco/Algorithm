/* 자바 코드 씀 */
import java.util.Scanner;
import java.util.ArrayList;

public class Main{
	public static int i, n, h[];
	public static ArrayList<Integer> list = new ArrayList<>();
	public static void main(String[] args) throws Exception {
		Scanner sc = new Scanner(System.in);

		long sum = 0;
		n = sc.nextInt(); h = new int[n];
		for(i=0;i<n;i++) sum += getHeight(sc.nextInt());
		System.out.println(sum);

		sc.close();
	}

	private static int lowerBound(ArrayList<Integer> al, int front, int rear, int key){
		while(front<rear){
			int mid = (front + rear) >>> 1;
			if(al.get(mid)<key) front = mid + 1;
			else rear = mid;
		}
		return rear;
	}

	private static int getHeight(int node){
		int lb, left, right, size = list.size();

		lb = lowerBound(list, 0, size, node);
		left = lb>0 ? h[list.get(lb-1)] : 0;
		right = lb<size ? h[list.get(lb)] : 0;

		h[node] = Math.max(left, right)+1;
		list.add(lb, node);

		return h[node];
	}
}

/* 2차 시도 */
// const input = require("fs")
//   .readFileSync("/dev/stdin")
//   .toString()
//   .trim()
//   .split("\n")
//   .map(Number);
// const N = input[0];
// const list = [];
// const h = [];

// const lowerBound = (arr, key) => {
//     let front = 0
//     let rear = arr.length
//   while (front < rear) {
//     const mid = Math.floor((front + rear) / 2);
//     if (arr[mid] < key) front = mid + 1;
//     else rear = mid;
//   }
//   return rear;
// };

// const getHeight = (node) => {
//   const lb = lowerBound(list, node);
//   const left = lb > 0 ? h[list[lb - 1]] : 0;
//   const right = lb < list.length ? h[list[lb]] : 0;
//   h[node] = Math.max(left, right) + 1;
//   list.splice(lb, 0, node); // N만큼 걸려서 실패 -> logN으로 개선해야 함
//   return h[node];
// };

// let sum = 0;
// for (let i = 0; i < N; i++) {
//   sum += getHeight(input[i + 1]);
// }
// console.log(sum);

/* 1차 시도 */
// class Node {
//     constructor(v) {
//         this.v = v
//         this.left = null
//         this.right = null
//     }
// }

// class BinarySearchTree {
//     constructor() {
//         this.root = null
//     }
//     insert(x) {
//         const newNode = new Node(x)
//         if (this.root === null) {
//             this.root = newNode
//             return 1
//         }
//         let current = this.root
//         let height = 1
//         while (true) {
//             height++
//             if (x < current.v) {
//                 if (current.left) {
//                     // V가 왼쪽 자식이 있으면
//                     current = current.left
//                 } else {
//                     // V의 왼쪽 자식을 새로 만들고, 그 곳에 X를 저장함
//                     current.left = newNode
//                     return height
//                 }
//             } else {
//                 if (current.right) {
//                     // V가 오른쪽 자식이 있으면
//                     current = current.right
//                 } else {
//                     // V의 오른쪽 자식을 새로 만들고, 그 곳에 X를 저장함
//                     current.right = newNode
//                     return height
//                 }
//             }
//         }
//     }
// }

// const bst = new BinarySearchTree()
// let sum = 0
// for (let i = 0; i < N; i++) {
//     sum += bst.insert(input[i+1])
// }
// console.log(sum)

/*
N과, 배열 P에 있는 수가 주어졌을 때, P로 이진 검색 트리를 만들었을 때, 모든 노드의 높이의 합을 출력하는 프로그램을 작성하시오.
트리의 높이는 루트에서 부터의 거리 + 1이다.
N은 250,000보다 작거나 같은 자연수이다.
-> 노드, BST 클래스 구현해서 시뮬레이션 돌리기 -> 18%에서 시간초과
-> 편향이진트리 때문에 N^2이라 시간초과 발생

다른사람풀이: lower bound
-> 시간초과. js 코드로 변환하는 과정에서, js의 splice에서 n
-> 삽입,삭제에서 logN만큼 걸리는 자료구조를 써야 함
-> Balanced Binary Search Tree (예: AVL Tree, Red-Black Tree)
-> 근데 js에서 구현하려면 복잡함. 그냥 자바 코드 씀
https://blog.naver.com/occidere/221133866451

inorder 순회시 오름차순으로 정렬된 list를 띄고 있으므로 set, map을 사용해 문제를 해결할 수 있다.
높이 값은 들어온 value의 바로 직전 left값과 right값을 비교해 더 큰 값 + 1을 해주면 된다(계속해서 깊어지는 형태를 가지므로)
*/
