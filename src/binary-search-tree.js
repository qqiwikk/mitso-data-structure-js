import { NotImplementedError } from "../extensions/index.js";
import { Node } from '../extensions/list-tree.js';

export default class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    if (this.rootNode === null) {
      this.rootNode = new Node(data);
    } else {
      this.addNode(this.rootNode, data);
    }
  }

  addNode(node, data) {
    if (data < node.data) {
      if (node.left === null) {
        node.left = new Node(data);
      } else {
        this.addNode(node.left, data);
      }
    } else {
      if (node.right === null) {
        node.right = new Node(data);
      } else {
        this.addNode(node.right, data);
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    return this.findNode(this.rootNode, data);
  }

  findNode(node, data) {
    if (node === null) return null;
    
    if (data === node.data) return node;
    if (data < node.data) return this.findNode(node.left, data);
    return this.findNode(node.right, data);
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data);
  }

  removeNode(node, data) {
    if (node === null) return null;

    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
    } else {
    
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

     
      let minRight = node.right;
      while (minRight.left !== null) {
        minRight = minRight.left;
      }
      node.data = minRight.data;
      node.right = this.removeNode(node.right, minRight.data);
    }
    
    return node;
  }

  min() {
    if (this.rootNode === null) return null;
    
    let current = this.rootNode;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (this.rootNode === null) return null;
    
    let current = this.rootNode;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }
}