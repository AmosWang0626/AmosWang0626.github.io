---
title: HashMap源码解析
index: true
icon: laptop-code
category:
  - JDK基础源码
---


HashMap 是 Java 中最常用的数据结构之一，基于哈希表实现，提供了高效的键值对存储和查找功能。以下是对其源码的详细分析：

## 1. 核心数据结构
HashMap 的核心是一个 Node<K,V>[] table 数组，每个数组元素是一个链表或红黑树的头节点。

### 1.1 Node 类
用于存储键值对，是 HashMap 的基本单元。

```java
static class Node<K,V> implements Map.Entry<K,V> {
    final int hash; // 键的哈希值
    final K key;    // 键
    V value;        // 值
    Node<K,V> next; // 下一个节点（链表结构）

    Node(int hash, K key, V value, Node<K,V> next) {
        this.hash = hash;
        this.key = key;
        this.value = value;
        this.next = next;
    }
}
```

### 1.2 红黑树节点（TreeNode）
当链表长度超过阈值（默认 8）时，链表会转换为红黑树，以提高查找性能。

TreeNode 是 Node 的子类，定义如下：

```java
static final class TreeNode<K,V> extends LinkedHashMap.Entry<K,V> {
    TreeNode<K,V> parent;  // 父节点
    TreeNode<K,V> left;    // 左子节点
    TreeNode<K,V> right;   // 右子节点
    TreeNode<K,V> prev;    // 前驱节点
    boolean red;           // 节点颜色（红/黑）
}
```

## 2. 核心参数

```
DEFAULT_INITIAL_CAPACITY = 16：默认初始容量。

MAXIMUM_CAPACITY = 1 << 30：最大容量。

DEFAULT_LOAD_FACTOR = 0.75f：默认负载因子。

TREEIFY_THRESHOLD = 8：链表转红黑树的阈值。

UNTREEIFY_THRESHOLD = 6：红黑树转链表的阈值。

MIN_TREEIFY_CAPACITY = 64：链表转红黑树的最小容量。
```

## 3. 核心方法

### 3.1 哈希计算
HashMap 使用 key.hashCode() 计算哈希值，并通过扰动函数减少哈希冲突。

```java
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

高 16 位与低 16 位异或，增加哈希值的随机性。

### 3.2 插入元素（put）

插入逻辑：

计算键的哈希值。

根据哈希值找到数组索引。

如果该位置为空，直接插入。

如果该位置不为空，遍历链表或红黑树：

如果找到相同键，更新值。

如果未找到，插入新节点。

检查是否需要扩容。

```java
public V put(K key, V value) {
    return putVal(hash(key), key, value, false, true);
}

final V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict) {
    Node<K,V>[] tab; Node<K,V> p; int n, i;
    if ((tab = table) == null || (n = tab.length) == 0)
        n = (tab = resize()).length; // 初始化或扩容
    if ((p = tab[i = (n - 1) & hash]) == null)
        tab[i] = newNode(hash, key, value, null); // 直接插入
    else {
        Node<K,V> e; K k;
        if (p.hash == hash && ((k = p.key) == key || (key != null && key.equals(k))))
            e = p; // 键相同，更新值
        else if (p instanceof TreeNode)
            e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value); // 红黑树插入
        else {
            for (int binCount = 0; ; ++binCount) {
                if ((e = p.next) == null) {
                    p.next = newNode(hash, key, value, null); // 链表插入
                    if (binCount >= TREEIFY_THRESHOLD - 1)
                        treeifyBin(tab, hash); // 链表转红黑树
                    break;
                }
                if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k))))
                    break; // 键相同，更新值
                p = e;
            }
        }
        if (e != null) { // 更新值
            V oldValue = e.value;
            if (!onlyIfAbsent || oldValue == null)
                e.value = value;
            return oldValue;
        }
    }
    ++modCount;
    if (++size > threshold)
        resize(); // 扩容
    return null;
}
```

### 3.3 扩容（resize）

当元素数量超过 容量 * 负载因子 时，触发扩容。

扩容逻辑：

创建新数组（容量为原来的 2 倍）。

将旧数组中的元素重新分配到新数组。

```java
final Node<K,V>[] resize() {
    Node<K,V>[] oldTab = table;
    int oldCap = (oldTab == null) ? 0 : oldTab.length;
    int oldThr = threshold;
    int newCap, newThr = 0;
    if (oldCap > 0) {
        if (oldCap >= MAXIMUM_CAPACITY) {
            threshold = Integer.MAX_VALUE;
            return oldTab;
        }
        else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY &&
                 oldCap >= DEFAULT_INITIAL_CAPACITY)
            newThr = oldThr << 1; // 双倍扩容
    }
    else if (oldThr > 0)
        newCap = oldThr;
    else {
        newCap = DEFAULT_INITIAL_CAPACITY;
        newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
    }
    if (newThr == 0) {
        float ft = (float)newCap * loadFactor;
        newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
                  (int)ft : Integer.MAX_VALUE);
    }
    threshold = newThr;
    Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
    table = newTab;
    if (oldTab != null) {
        for (int j = 0; j < oldCap; ++j) {
            Node<K,V> e;
            if ((e = oldTab[j]) != null) {
                oldTab[j] = null;
                if (e.next == null)
                    newTab[e.hash & (newCap - 1)] = e;
                else if (e instanceof TreeNode)
                    ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
                else {
                    Node<K,V> loHead = null, loTail = null;
                    Node<K,V> hiHead = null, hiTail = null;
                    Node<K,V> next;
                    do {
                        next = e.next;
                        if ((e.hash & oldCap) == 0) {
                            if (loTail == null)
                                loHead = e;
                            else
                                loTail.next = e;
                            loTail = e;
                        }
                        else {
                            if (hiTail == null)
                                hiHead = e;
                            else
                                hiTail.next = e;
                            hiTail = e;
                        }
                    } while ((e = next) != null);
                    if (loTail != null)
                        loTail.next = null;
                    newTab[j] = loHead;
                    if (hiTail != null)
                        hiTail.next = null;
                    newTab[j + oldCap] = hiHead;
                }
            }
        }
    }
    return newTab;
}
```

### 3.4 查找元素（get）
查找逻辑：

计算键的哈希值。

根据哈希值找到数组索引。

遍历链表或红黑树，查找目标键。

```java
public V get(Object key) {
    Node<K,V> e;
    return (e = getNode(hash(key), key)) == null ? null : e.value;
}

final Node<K,V> getNode(int hash, Object key) {
    Node<K,V>[] tab; Node<K,V> first, e; int n; K k;
    if ((tab = table) != null && (n = tab.length) > 0 &&
        (first = tab[(n - 1) & hash]) != null) {
        if (first.hash == hash && ((k = first.key) == key || (key != null && key.equals(k))))
            return first;
        if ((e = first.next) != null) {
            if (first instanceof TreeNode)
                return ((TreeNode<K,V>)first).getTreeNode(hash, key);
            do {
                if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k))))
                    return e;
            } while ((e = e.next) != null);
        }
    }
    return null;
}
```

## 4. 性能与优化

时间复杂度：

查找、插入、删除：平均 O(1)，最坏 O(log n)（红黑树）。

优化点：

预分配容量，减少扩容次数。

使用高效的哈希函数，减少冲突。

## 5. 线程安全问题
HashMap 不是线程安全的。多线程环境下，可以使用 Collections.synchronizedMap 或 ConcurrentHashMap。

## 总结

HashMap 通过哈希表、链表和红黑树的结合，实现了高效的键值对存储和查找。理解其源码有助于优化使用场景，如预分配容量、选择合适的哈希函数等。
