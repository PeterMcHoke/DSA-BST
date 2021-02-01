const BST = require('./BST')

//————————————————————————————————————————————————————————————

//4. 

//Alvaro, what is the runtime of this program?
//The program finds the sum of all of the values in a tree. 
//Can we talk about the keys and values in binary search trees? I'm not quite grasping why we need both.
//Will we hash the keys eventually so there is a system? What is there are two nodes with the same key?
function treeFunc(t) {
    if (!t) {
        return 0;
    }
    return treeFunc(t.left) + t.value + treeFunc(t.right)
}
//————————————————————————————————————————————————————————————

//5. Height of BST
const heightOfBST = (tree) => {
    const walks = []
    _distanceToLeaf(tree, 0, walks)
    return Math.max(...walks)
}

const _distanceToLeaf = (tree, count=0, arr) => {
    if (!tree) {
        arr.push(count)
    }
    else {
        count++;
        _distanceToLeaf(tree.left, count, arr)
        _distanceToLeaf(tree.right, count, arr)
    }
    return arr;
}
//————————————————————————————————————————————————————————————

//6. Is it a BST?

const isItBST = (tree) => {
    return _checkTree(tree) === undefined;
}

const _checkTree = (tree) => {
    if (tree.left) {
        if (tree.left.key > tree.key) {
            return false;
        }
        isItBST(tree.left);
    }
    if (tree.right) {
        if (tree.right.key < tree.key) {
            return false;
        }
        isItBST(tree.right);    
    }
}

//————————————————————————————————————————————————————————————


//7. 3rd largest node
const thirdLargeNode = (tree, max) => {
    if (tree.key > max[0] && tree.key < max[1]) {
        max[0] = tree.key;
    }
    else if (tree.key > max[1] && tree.key < max[2]) {
        max[0] = max[1];
        max[1] = tree.key;
    }
    else if (tree.key > max[2]) {
        max[0] = max[1];
        max[1] = max[2];
        max[2] = tree.key;
    }
    if (tree.right)
        thirdLargeNode(tree.right, max)
    if (tree.left)
        thirdLargeNode(tree.left, max)
    return max[0];
}

//————————————————————————————————————————————————————————————

//8.
const  _distanceToLeaf2 = (tree, count=0, arr=[]) => {
    if (tree)
        count++
    if (!tree.left && !tree.right)
        arr.push(count)
    if (tree.left) {
        _distanceToLeaf2(tree.left, count, arr)
    }
    if (tree.right) {
        _distanceToLeaf2(tree.right, count, arr)
    }
}

const isBalancedBST = (tree) => {
    const distances = [];
    _distanceToLeaf2(tree, 0, distances)
    const long = Math.max(...distances)
    const short = Math.min(...distances)
    return (long - short ) <= 1;
}
//————————————————————————————————————————————————————————————






//This main func is an example of an IIFE (Immediately Invoked Function Expression)
const main = (() => {
    const tree = new BST();
    const data = [3, 1, 4, 6, 9, 2, 5, 7];
    const data2 = [6,12,4,3,9,5];

    data2.forEach(num => {
        tree.insert(num, num)
    });
    const fakeTree = [1, 2, 4]
    //console.log(tree);
    //tree.printInOrder();
    // console.log(treeFunc(tree));
    // console.log(heightOfBST(tree));
    // console.log(isItBST(tree))
    console.log(thirdLargeNode(tree,Array(3).fill(0)))
    console.log(isBalancedBST(tree))
})();
