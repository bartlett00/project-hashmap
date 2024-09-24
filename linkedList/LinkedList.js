import Node from "./Node.js";
export default function LinkedList() {
  let pointer;
  let headNode = null;
  const append = (value) => {
    let newNode = Node(value);
    if (headNode == null) {
      headNode = newNode;
    } else {
      pointer = headNode;
      while (pointer.nextNode !== null) {
        pointer = pointer.nextNode;
      }
      pointer.nextNode = newNode;
    }
  };

  const prepend = (value) => {
    let newNode = Node(value);
    newNode.nextNode = headNode;
    headNode = newNode;
  };

  const size = () => {
    let size = 1;
    pointer = headNode;
    if (headNode == null) {
      size = 0;
      return size;
    }
    while (pointer.nextNode !== null) {
      size++;
      pointer = pointer.nextNode;
    }
    return size;
  };

  const head = () => {
    return headNode;
  };

  const tail = () => {
    pointer = headNode;
    while (pointer.nextNode !== null) {
      pointer = pointer.nextNode;
    }
    return pointer;
  };

  const at = (index) => {
    pointer = headNode;
    for (let i = 0; i < index - 1; i++) {
      pointer = pointer.nextNode;
    }
    return pointer;
  };

  const pop = () => {
    pointer = headNode;
    while (pointer.nextNode.nextNode !== null) {
      pointer = pointer.nextNode;
    }
    pointer.nextNode = null;
    console.log(pointer);
  };

  const contains = (value) => {
    pointer = headNode;
    while (pointer.nextNode !== null) {
      if (pointer.value === value) {
        return true;
      } else {
        pointer = pointer.nextNode;
      }
    }
    if (pointer.value === value) {
      return true;
    } else {
      return false;
    }
  };

  const find = (value) => {
    pointer = headNode;
    let index = 0;
    while (pointer.nextNode !== null) {
      if (pointer.value == value) {
        return index;
      }
      index++;
      pointer = pointer.nextNode;
    }
    if (pointer.value == value) {
      return index;
    } else {
      return null;
    }
  };

  const toString = () => {
    let string = "";
    pointer = headNode;
    while (pointer.nextNode !== null) {
      string = string + `( ${pointer.value} ) -> `;
      pointer = pointer.nextNode;
    }
    string = string + `( ${pointer.value} ) -> `;
    pointer = pointer.nextNode;
    if (pointer == null) {
      string = string + "null";
    }
    return string;
  };

  return {
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    toString,
  };
}
