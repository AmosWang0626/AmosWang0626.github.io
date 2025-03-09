---
title: HashMap源码解析
index: true
icon: laptop-code
date: 2025-03-07
category:
  - JDK基础源码
---

## 概述

HashMap 是基于数组 + 链表/红黑树实现的，支持自动扩容。

优点：高效的查找/插入(平均O(1)，最差O(n))、动态扩容、支持null键和null值	

缺点：哈希冲突可能影响性能、线程不安全、内存占用较高

适合的场景：适合单线程高频查询场景

是否线程安全：HashMap是线程不安全的，如果需要线程安全，推荐使用 ConcurrentHashMap。用 Collections synchronizedMap() 也可以实现线程安全。

## 源码解析

### 1. 核心数据结构

> 本文结合 JDK 17 的源码展开，与 JDK 1.8 之前的版本有差异（数组+链表实现，同时头插法并发操作有死循环的风险）

HashMap 默认以 Node<K,V>[] table 数组存储数据，每个桶（bucket）是链表或红黑树。

- 链表长度超过 8 且数组容量 ≥ 64 时，链表转为红黑树（时间复杂度优化为 O(log n)）。

- 红黑树节点数 ≤ 6 时退化为链表。

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

```java
public class HashMap<K, V> extends AbstractMap<K, V>
        implements Map<K, V>, Cloneable, Serializable {

    /* 默认初始化容量 16，也即数组的长度 - 必须是两个倍数。 */
    static final int DEFAULT_INITIAL_CAPACITY = 1 << 4; // aka 16

    /* 最大容量 1073741824 Integer.MAX_VALUE 的一半  */
    static final int MAXIMUM_CAPACITY = 1 << 30;

    /* 默认负载因子 */
    static final float DEFAULT_LOAD_FACTOR = 0.75f;

    /* 树化阈值（链表 to 红黑树） */
    static final int TREEIFY_THRESHOLD = 8;

    /* 取消树化阈值（红黑树 to 链表） */
    static final int UNTREEIFY_THRESHOLD = 6;

    /* 如果容量小于 64，链表是不会转为红黑树的 */
    static final int MIN_TREEIFY_CAPACITY = 64;

    /** 核心数组 */
    transient Node<K,V>[] table;

    /** entrySet() 结果的缓存 */
    transient Set<Map.Entry<K,V>> entrySet;

    /** HashMap中元素数量 */
    transient int size;

    /** 避免并发修改等，出现并发读写会抛异常 ConcurrentModificationException */
    transient int modCount;

    /** 当前阈值，达到阈值会触发扩容 */
    int threshold;

    /** 当前负载因子 */
    final float loadFactor;

}
```

## 3. 核心方法

### 3.1 构造方法

```java
// 无参构造方法，初始化时不会扩容
public HashMap() {
    this.loadFactor = DEFAULT_LOAD_FACTOR; // 负载因子默认为 0.75
}

// 指定容量 capacity，也就是数组的长度
public HashMap(int initialCapacity) {
    this(initialCapacity, DEFAULT_LOAD_FACTOR);
}

// 指定容量、负载因子
public HashMap(int initialCapacity, float loadFactor) {
    if (initialCapacity < 0)
        throw new IllegalArgumentException("Illegal initial capacity: " +
                                            initialCapacity);
    if (initialCapacity > MAXIMUM_CAPACITY)
        initialCapacity = MAXIMUM_CAPACITY;
    if (loadFactor <= 0 || Float.isNaN(loadFactor))
        throw new IllegalArgumentException("Illegal load factor: " +
                                            loadFactor);
    this.loadFactor = loadFactor;
    this.threshold = tableSizeFor(initialCapacity);
}

// 根据其他 Map 对象初始化
public HashMap(Map<? extends K, ? extends V> m) {
    this.loadFactor = DEFAULT_LOAD_FACTOR;
    putMapEntries(m, false);
}
```

### 3.2 哈希计算

HashMap 使用 key.hashCode() 计算哈希值，并通过扰动函数减少哈希冲突。

高 16 位与低 16 位异或，让低16位同时保持高16位的特征，增加哈希值的随机性。

```java
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

### 3.3 插入元素（put）

插入逻辑：

- 计算键的哈希值。

- 根据哈希值找到数组索引。

- 如果该位置为空，直接插入。

- 如果该位置不为空，遍历链表或红黑树：

- 如果找到相同键，更新值。

- 如果未找到，插入新节点。

- 检查是否需要扩容。

```java
public V put(K key, V value) {
    return putVal(hash(key), key, value, false, true);
}

final V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict) {
    Node<K,V>[] tab; Node<K,V> p; int n, i;
    if ((tab = table) == null || (n = tab.length) == 0)
        n = (tab = resize()).length; // 初始化并扩容
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
        resize(); // put完，就会触发扩容
    return null;
}
```

### 3.4 扩容（resize）

当元素数量超过 容量 * 负载因子 时，触发扩容。

扩容逻辑：

- 创建新数组（容量为原来的 2 倍）。

- 将旧数组中的元素重新分配到新数组。

```java
final Node<K,V>[] resize() {
    Node<K,V>[] oldTab = table;
    int oldCap = (oldTab == null) ? 0 : oldTab.length; // 旧容量，数组长度
    int oldThr = threshold; // 旧阈值
    int newCap, newThr = 0;
    if (oldCap > 0) {
        if (oldCap >= MAXIMUM_CAPACITY) {
            threshold = Integer.MAX_VALUE;
            return oldTab;
        }
        else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY && // 新容量=旧容量*2
                 oldCap >= DEFAULT_INITIAL_CAPACITY)
            newThr = oldThr << 1; // 新阈值=旧阈值*2
    }
    else if (oldThr > 0) // oldCap = 0 && oldThr > 0，可能只有remove之后会遇到
        newCap = oldThr;
    else { // 初始化逻辑
        newCap = DEFAULT_INITIAL_CAPACITY;
        newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
    }
    if (newThr == 0) {
        float ft = (float)newCap * loadFactor;
        newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
                  (int)ft : Integer.MAX_VALUE);
    }
    threshold = newThr;
    Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap]; // 扩容
    table = newTab;
    if (oldTab != null) {
        for (int j = 0; j < oldCap; ++j) {
            Node<K,V> e;
            if ((e = oldTab[j]) != null) {
                oldTab[j] = null;
                if (e.next == null)
                    newTab[e.hash & (newCap - 1)] = e;
                else if (e instanceof TreeNode) // 红黑树扩容
                    // 扩容后，红黑树类似链表的处理，也是拆成两个。还会判断要不要转成链表
                    ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
                else { // 链表扩容
                    Node<K,V> loHead = null, loTail = null;
                    Node<K,V> hiHead = null, hiTail = null;
                    Node<K,V> next;
                    do {
                        next = e.next;
                        if ((e.hash & oldCap) == 0) { // 因为每次扩容都是前一次的2倍，通过高位与运算0/1判断节点放高位还是低位，避免rehash，提高性能
                            if (loTail == null)
                                loHead = e;
                            else
                                loTail.next = e; // 尾插法
                            loTail = e;
                        } else {
                            if (hiTail == null)
                                hiHead = e;
                            else
                                hiTail.next = e; // // 尾插法
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

### 3.5 查找元素（get）

查找逻辑：

- 计算键的哈希值。

- 根据哈希值找到数组索引。

- 遍历链表或红黑树，查找目标键。

```java
public V get(Object key) {
    Node<K,V> e;
    return (e = getNode(hash(key), key)) == null ? null : e.value;
}

final Node<K,V> getNode(int hash, Object key) {
    Node<K,V>[] tab; Node<K,V> first, e; int n; K k;
    if ((tab = table) != null && (n = tab.length) > 0 &&
        (first = tab[(n - 1) & hash]) != null) { // 根据hash定位数组中的位置，且该位置不为空
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

### 3.6 数组长度计算(始终为2的倍数)

```java
// JDK 17，通过使用 Integer.numberOfLeadingZeros 减少了多次位移运算。
// Integer.numberOfLeadingZeros 本身可能被JVM优化，如果不优化就用自身的逻辑。
static final int tableSizeFor(int cap) {
    int n = -1 >>> Integer.numberOfLeadingZeros(cap - 1);
    return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
}

// JDK 8 的实现，通过位移运算，将最高位以下都覆盖为1，最后+1来实现size始终为2的倍数
static final int tableSizeFor(int cap) {
    int n = cap - 1;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
}

// Integer.numberOfLeadingZeros(int) 计算最高位前边有多少个0
@IntrinsicCandidate // 该注解意味着JVM在执行字节码时可能会用特定于硬件或特别优化的代码来替换该方法的实现，以提高性能。
public static int numberOfLeadingZeros(int i) {
    // HD, Count leading 0's
    if (i <= 0)
        return i == 0 ? 32 : 0;
    int n = 31;
    if (i >= 1 << 16) { n -= 16; i >>>= 16; }
    if (i >= 1 <<  8) { n -=  8; i >>>=  8; }
    if (i >= 1 <<  4) { n -=  4; i >>>=  4; }
    if (i >= 1 <<  2) { n -=  2; i >>>=  2; }
    return n - (i >>> 1);
}
```