---
title: LinkedHashMap源码解析
index: true
icon: laptop-code
date: 2025-03-15
category:
  - JDK基础源码
order: 5
---

## 概述

LinkedHashMap 是 Java 中基于哈希表和双向链表实现的有序 Map，它继承自 HashMap，支持按插入顺序或访问顺序（如 LRU 缓存）遍历元素。

## **一、核心数据结构**

### **1. 节点结构（Entry）**

LinkedHashMap 的节点继承自 `HashMap.Node`，并扩展了双向链表的前驱（`before`）和后继（`after`）指针：
```java
static class Entry<K,V> extends HashMap.Node<K,V> {
    Entry<K,V> before, after; // 双向链表指针
    Entry(int hash, K key, V value, Node<K,V> next) {
        super(hash, key, value, next);
    }
}
```

### **2. 链表属性**
- `head` 和 `tail`：分别指向双向链表的头节点和尾节点。
- `accessOrder`：标记链表顺序模式（`true` 为访问顺序，`false` 为插入顺序，默认）。

```java
transient LinkedHashMap.Entry<K,V> head; // 链表头
transient LinkedHashMap.Entry<K,V> tail; // 链表尾
final boolean accessOrder; // 顺序模式标志
```

---

## **二、插入逻辑与顺序维护**

### **1. 覆盖 `newNode` 方法**
插入新节点时，除了哈希表逻辑，还会将节点链接到链表尾部：
```java
Node<K,V> newNode(int hash, K key, V value, Node<K,V> e) {
    LinkedHashMap.Entry<K,V> p = new Entry<>(hash, key, value, e);
    linkNodeLast(p); // 将新节点链接到链表尾部
    return p;
}

private void linkNodeLast(Entry<K,V> p) {
    Entry<K,V> last = tail;
    tail = p; // 更新尾节点
    if (last == null) {
        head = p; // 链表为空时，头尾均指向新节点
    } else {
        p.before = last; // 新节点前驱指向原尾节点
        last.after = p;  // 原尾节点后继指向新节点
    }
}
```

### **2. 插入后回调（`afterNodeInsertion`）**
插入完成后，触发 `afterNodeInsertion` 方法，用于 LRU 缓存淘汰策略：
```java
void afterNodeInsertion(boolean evict) {
    Entry<K,V> first;
    // 若开启淘汰策略且链表头存在，检查是否需要移除最旧节点
    if (evict && (first = head) != null && removeEldestEntry(first)) {
        K key = first.key;
        removeNode(hash(key), key, null, false, true); // 移除头节点
    }
}

protected boolean removeEldestEntry(Map.Entry<K,V> eldest) {
    return false; // 默认不淘汰，可重写以实现 LRU
}
```

---

## **三、访问顺序调整**

### **1. `get` 方法覆盖**
当 `accessOrder=true` 时，访问节点会触发 `afterNodeAccess`，将其移至链表尾部：
```java
public V get(Object key) {
    Node<K,V> e;
    if ((e = getNode(hash(key), key)) == null) return null;
    if (accessOrder) afterNodeAccess(e); // 若为访问顺序，调整节点位置
    return e.value;
}

void afterNodeAccess(Node<K,V> e) {
    Entry<K,V> last;
    if (accessOrder && (last = tail) != e) { // 仅当节点不是尾节点时调整
        Entry<K,V> p = (Entry<K,V>)e, b = p.before, a = p.after;
        p.after = null; // 断开当前节点
        
        // 调整前驱节点的后继指针
        if (b == null) head = a;
        else b.after = a;
        
        // 调整后继节点的前驱指针
        if (a != null) a.before = b;
        else last = b;
        
        // 将当前节点链接到尾部
        if (last == null) head = p;
        else {
            p.before = last;
            last.after = p;
        }
        tail = p; // 更新尾节点
        modCount++;
    }
}
```

---

## **四、删除逻辑与链表维护**

### **覆盖 `afterNodeRemoval` 方法**
删除节点时，从双向链表中移除该节点的引用：
```java
void afterNodeRemoval(Node<K,V> e) {
    Entry<K,V> p = (Entry<K,V>)e, b = p.before, a = p.after;
    p.before = p.after = null; // 断开节点连接
    
    // 调整前驱节点的后继指针
    if (b == null) head = a;
    else b.after = a;
    
    // 调整后继节点的前驱指针
    if (a == null) tail = b;
    else a.before = b;
}
```

---

## **五、迭代器实现**

LinkedHashMap 的迭代器直接遍历双向链表，而非哈希表桶数组，保证顺序性：
```java
abstract class LinkedHashIterator {
    Entry<K,V> next;    // 下一个节点
    Entry<K,V> current; // 当前节点
    int expectedModCount;

    LinkedHashIterator() {
        next = head; // 从头节点开始遍历
        expectedModCount = modCount;
        current = null;
    }

    public final boolean hasNext() {
        return next != null;
    }

    final Entry<K,V> nextNode() {
        Entry<K,V> e = next;
        if (modCount != expectedModCount) throw new ConcurrentModificationException();
        if (e == null) throw new NoSuchElementException();
        current = e;
        next = e.after; // 通过后继指针遍历
        return e;
    }
}
```

---

## **六、LRU 缓存实现示例**

通过重写 `removeEldestEntry` 方法，可轻松实现固定大小的 LRU 缓存：
```java
public class LRUCache<K, V> extends LinkedHashMap<K, V> {
    private final int maxCapacity;

    public LRUCache(int maxCapacity) {
        super(maxCapacity, 0.75f, true); // 启用访问顺序模式
        this.maxCapacity = maxCapacity;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > maxCapacity; // 超出容量时移除最旧节点
    }
}
```

---

## **七、性能与对比**

| **操作**      | **时间复杂度** | **说明**                              |
|---------------|----------------|---------------------------------------|
| 插入（put）   | O(1)           | 哈希表插入 + 链表维护                 |
| 访问（get）   | O(1)           | 哈希表访问 + 链表调整（若需移动）     |
| 删除（remove）| O(1)           | 哈希表删除 + 链表调整                 |
| 遍历          | O(n)           | 按链表顺序遍历                        |

---

## **八、总结**

- **双向链表维护顺序**：通过 `before` 和 `after` 指针，记录插入或访问顺序。
- **钩子方法扩展**：覆盖 `afterNodeAccess`、`afterNodeInsertion` 和 `afterNodeRemoval`，实现链表动态调整。
- **LRU 支持**：结合 `accessOrder` 和 `removeEldestEntry`，实现缓存淘汰策略。
- **高效迭代**：直接遍历双向链表，保证顺序性，时间复杂度 O(n)。

LinkedHashMap 在保持 HashMap 高效查找的基础上，通过双向链表实现了有序性，适用于需要维护顺序或实现缓存的场景。