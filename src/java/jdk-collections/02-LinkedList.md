---
title: LinkedList源码解析
index: true
icon: laptop-code
date: 2025-03-12
category:
  - JDK基础源码
order: 2
---

---

## **概述**

**LinkedList** 是 Java 集合框架中基于 **双向链表** 实现的列表，支持高效的头部和尾部操作，同时实现了 `List` 和 `Deque` 接口，可作为动态列表、队列或双端队列使用。

## **一、数据结构**

### **1. 节点结构（Node）**
每个节点包含数据（`item`）、前驱指针（`prev`）和后继指针（`next`）：
```java
private static class Node<E> {
    E item;         // 节点存储的数据
    Node<E> next;   // 指向下一个节点
    Node<E> prev;   // 指向前一个节点

    Node(Node<E> prev, E element, Node<E> next) {
        this.item = element;
        this.next = next;
        this.prev = prev;
    }
}
```

### **2. 链表属性**
- **头尾指针**：维护链表的首尾节点。
- **长度**：记录链表当前元素数量。
```java
transient Node<E> first; // 头节点
transient Node<E> last;  // 尾节点
transient int size = 0;  // 链表长度
```

---

## **二、核心方法实现**

### **1. 添加元素**
- **尾部添加（`add(E e)` / `addLast(E e)`）**：  
  时间复杂度 **O(1)**，直接操作尾节点。
  ```java
  void linkLast(E e) {
      final Node<E> l = last;           // 原尾节点
      final Node<E> newNode = new Node<>(l, e, null);
      last = newNode;                   // 更新尾节点为新节点
      if (l == null)                    // 原链表为空
          first = newNode;              // 新节点同时为头节点
      else
          l.next = newNode;             // 原尾节点指向新节点
      size++;
  }
  ```

- **头部添加（`addFirst(E e)`）**：  
  时间复杂度 **O(1)**，直接操作头节点。
  ```java
  void linkFirst(E e) {
      final Node<E> f = first;          // 原头节点
      final Node<E> newNode = new Node<>(null, e, f);
      first = newNode;                  // 更新头节点为新节点
      if (f == null)                    // 原链表为空
          last = newNode;               // 新节点同时为尾节点
      else
          f.prev = newNode;             // 原头节点前驱指向新节点
      size++;
  }
  ```

- **中间插入（`add(int index, E element)`）**：  
  时间复杂度 **O(n)**，需遍历到目标位置。
  ```java
  public void add(int index, E element) {
      checkPositionIndex(index);        // 检查索引合法性
      if (index == size)                // 插入尾部
          linkLast(element);
      else                              // 插入中间
          linkBefore(element, node(index)); // 找到目标节点并在其前插入
  }

  // 查找索引对应的节点
  Node<E> node(int index) {
      if (index < (size >> 1)) {        // 索引在前半部分，从头遍历
          Node<E> x = first;
          for (int i = 0; i < index; i++)
              x = x.next;
          return x;
      } else {                          // 索引在后半部分，从尾遍历
          Node<E> x = last;
          for (int i = size - 1; i > index; i--)
              x = x.prev;
          return x;
      }
  }

  void linkBefore(E e, Node<E> succ) {
      final Node<E> pred = succ.prev;   // 目标节点的前驱
      final Node<E> newNode = new Node<>(pred, e, succ);
      succ.prev = newNode;              // 目标节点前驱指向新节点
      if (pred == null)                 // 插入到头部
          first = newNode;
      else
          pred.next = newNode;          // 原前驱的后继指向新节点
      size++;
  }
  ```

### **2. 删除元素**
- **头部删除（`removeFirst()`）**：  
  时间复杂度 **O(1)**，直接操作头节点。
  ```java
  public E removeFirst() {
      final Node<E> f = first;
      if (f == null)
          throw new NoSuchElementException();
      return unlinkFirst(f);
  }

  private E unlinkFirst(Node<E> f) {
      final E element = f.item;
      final Node<E> next = f.next;      // 原头节点的后继
      f.item = null;                    // 清除数据以帮助 GC
      f.next = null;                    // 断开原头节点
      first = next;                     // 更新头节点
      if (next == null)                 // 链表为空
          last = null;
      else
          next.prev = null;            // 新头节点前驱置空
      size--;
      return element;
  }
  ```

- **尾部删除（`removeLast()`）**：  
  时间复杂度 **O(1)**，直接操作尾节点。
  ```java
  public E removeLast() {
      final Node<E> l = last;
      if (l == null)
          throw new NoSuchElementException();
      return unlinkLast(l);
  }

  private E unlinkLast(Node<E> l) {
      final E element = l.item;
      final Node<E> prev = l.prev;      // 原尾节点的前驱
      l.item = null;
      l.prev = null;                    // 断开原尾节点
      last = prev;                      // 更新尾节点
      if (prev == null)                 // 链表为空
          first = null;
      else
          prev.next = null;             // 新尾节点后继置空
      size--;
      return element;
  }
  ```

- **中间删除（`remove(int index)`）**：  
  时间复杂度 **O(n)**，需遍历到目标位置。
  ```java
  public E remove(int index) {
      checkElementIndex(index);         // 检查索引合法性
      return unlink(node(index));       // 找到节点并删除
  }

  E unlink(Node<E> x) {
      final E element = x.item;
      final Node<E> next = x.next;      // 目标节点的后继
      final Node<E> prev = x.prev;      // 目标节点的前驱

      if (prev == null)                 // 目标节点是头节点
          first = next;
      else
          prev.next = next;            // 前驱的后继指向目标节点的后继

      if (next == null)                 // 目标节点是尾节点
          last = prev;
      else
          next.prev = prev;            // 后继的前驱指向目标节点的前驱

      x.item = null;                    // 清除数据
      x.next = null;
      x.prev = null;
      size--;
      return element;
  }
  ```

---

## **三、性能分析**

| **操作**             | **时间复杂度** | **说明**                              |
|----------------------|----------------|---------------------------------------|
| 头部插入/删除        | O(1)           | 直接操作头节点                        |
| 尾部插入/删除        | O(1)           | 直接操作尾节点                        |
| 中间插入/删除        | O(n)           | 需遍历到目标位置                      |
| 随机访问（`get`）    | O(n)           | 需遍历链表                            |
| 迭代器遍历           | O(n)           | 支持双向遍历（`ListIterator`）        |

---

## **四、与 ArrayList 对比**

| **特性**            | **LinkedList**                      | **ArrayList**                     |
|---------------------|-------------------------------------|------------------------------------|
| **数据结构**        | 双向链表                            | 动态数组                           |
| **随机访问**        | O(n)（需遍历）                     | O(1)（直接索引）                  |
| **头部插入/删除**   | O(1)                               | O(n)（需移动元素）                |
| **尾部插入/删除**   | O(1)                               | O(1)（若未扩容）                  |
| **内存占用**        | 较高（每个节点需存储前后指针）      | 较低（仅存储数据）                 |
| **适用场景**        | 频繁增删，尤其是头尾操作            | 频繁随机访问或尾部操作             |

---

## **五、关键设计细节**

1. **双向链表优势**：  
   支持双向遍历，适合频繁的插入和删除操作，尤其是头尾操作。

2. **迭代器支持**：  
   `ListIterator` 提供双向遍历能力，且支持在迭代中修改链表（通过 `modCount` 检测并发修改）。

3. **序列化优化**：  
   通过 `writeObject` 和 `readObject` 方法定制序列化，仅保存元素数据，反序列化时重建链表结构。

4. **线程不安全**：  
   多线程环境下需外部同步或使用 `Collections.synchronizedList`。

---

## **六、总结**

**LinkedList** 通过双向链表实现高效的头部和尾部操作，适合频繁增删但较少随机访问的场景。其核心在于节点间的指针操作，确保增删的时间复杂度为 O(1)（头尾）或 O(n)（中间）。与 `ArrayList` 相比，各有优劣，需根据实际需求选择。