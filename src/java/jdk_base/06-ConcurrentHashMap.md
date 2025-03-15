---
title: ConcurrentHashMap源码解析
index: true
icon: laptop-code
date: 2025-03-10
category:
  - JDK基础源码
order: 6
---

## **概述**

`ConcurrentHashMap` 是 Java 并发编程中最重要的数据结构之一，其通过 **CAS + synchronized 锁细化** 和 **多线程协同扩容** 实现了高效的线程安全。


1. JDK 1.7 的分段锁（Segment）

    数据结构：
    - 将整个哈希表分成多个 Segment（默认 16 个），每个 Segment 是一个独立的哈希表，继承自 ReentrantLock。
    - 每个 Segment 内部结构与 HashMap 类似（数组 + 链表）。

    并发控制：
    - 锁分离：不同 Segment 的写操作互不干扰，锁粒度更细。
    - 读操作无锁：使用 volatile 保证可见性，读操作无需加锁。

2. JDK 1.8 的 CAS + synchronized

    数据结构：
    - 与 HashMap 类似，使用 数组 + 链表/红黑树。
    - Node 节点：链表节点使用 volatile 修饰 next 指针，保证可见性。

    并发控制：
    - CAS 操作：插入、删除时使用 CAS 保证原子性。
    - synchronized 锁单个桶：仅在哈希冲突时对链表头或树根加锁，锁粒度更细。

## **一、核心数据结构**

### **1. Node 节点**
```java
static class Node<K,V> implements Map.Entry<K,V> {
    final int hash;
    final K key;
    volatile V val;       // volatile 保证可见性
    volatile Node<K,V> next; // volatile 保证可见性
    // ...
}
```
- `val` 和 `next` 用 `volatile` 修饰，确保读操作无需加锁。
- 支持链表结构，冲突时以链表形式存储。

### **2. TreeNode（红黑树节点）**
```java
static final class TreeNode<K,V> extends Node<K,V> {
    TreeNode<K,V> parent;  
    TreeNode<K,V> left;
    TreeNode<K,V> right;
    TreeNode<K,V> prev;    // 删除时需断链
    boolean red;
    // ...
}
```
- **触发条件**：链表长度 ≥ 8 且表容量 ≥ 64 时，链表转为红黑树。
- **优势**：将链表查询的 O(n) 时间复杂度优化为 O(logn)。

### **3. ForwardingNode（扩容标记节点）**
```java
static final class ForwardingNode<K,V> extends Node<K,V> {
    final Node<K,V>[] nextTable;
    ForwardingNode(Node<K,V>[] tab) {
        super(MOVED, null, null, null); // hash 标记为 MOVED
        this.nextTable = tab;
    }
}
```
- 在扩容期间，旧表的某个桶迁移完成后，会被替换为 `ForwardingNode`，指向新表。
- 其他线程检测到 `ForwardingNode` 后，会协助迁移数据。

---

## **二、线程安全的核心实现**

### **1. 初始化表（initTable）**
```java
private final Node<K,V>[] initTable() {
    Node<K,V>[] tab; int sc;
    while ((tab = table) == null || tab.length == 0) {
        if ((sc = sizeCtl) < 0) // sizeCtl < 0 表示其他线程正在初始化
            Thread.yield(); // 让出 CPU，等待初始化完成
        else if (U.compareAndSwapInt(this, SIZECTL, sc, -1)) { // CAS 竞争初始化权
            try {
                // 实际初始化逻辑（设置表大小和阈值）
                if ((tab = table) == null || tab.length == 0) {
                    int n = (sc > 0) ? sc : DEFAULT_CAPACITY;
                    Node<K,V>[] nt = (Node<K,V>[])new Node<?,?>[n];
                    table = tab = nt;
                    sc = n - (n >>> 2); // 计算阈值（0.75n）
                }
            } finally {
                sizeCtl = sc; // 恢复 sizeCtl 为阈值
            }
            break;
        }
    }
    return tab;
}
```
- **CAS 竞争**：通过 `sizeCtl` 状态标记，确保只有一个线程执行初始化。

### **2. putVal：插入逻辑**
```java
final V putVal(K key, V value, boolean onlyIfAbsent) {
    if (key == null || value == null) throw new NullPointerException();
    int hash = spread(key.hashCode()); // 计算哈希
    int binCount = 0;
    for (Node<K,V>[] tab = table;;) {
        Node<K,V> f; int n, i, fh;
        if (tab == null || (n = tab.length) == 0)
            tab = initTable(); // 懒初始化
        else if ((f = tabAt(tab, i = (n - 1) & hash)) == null) {
            // CASE 1: 目标桶为空，CAS 插入新节点
            if (casTabAt(tab, i, null, new Node<K,V>(hash, key, value)))
                break;
        } else if ((fh = f.hash) == MOVED)
            // CASE 2: 当前桶正在扩容，协助迁移
            tab = helpTransfer(tab, f);
        else {
            // CASE 3: 桶非空且未扩容，锁住链表头或树根
            V oldVal = null;
            synchronized (f) {
                if (tabAt(tab, i) == f) { // 再次确认节点未被修改
                    if (fh >= 0) { // 处理链表
                        binCount = 1;
                        for (Node<K,V> e = f;; ++binCount) {
                            K ek;
                            if (e.hash == hash && ((ek = e.key) == key || (ek != null && key.equals(ek)))) {
                                oldVal = e.val;
                                if (!onlyIfAbsent)
                                    e.val = value;
                                break;
                            }
                            Node<K,V> pred = e;
                            if ((e = e.next) == null) { // 插入到链表尾部
                                pred.next = new Node<K,V>(hash, key, value);
                                break;
                            }
                        }
                    } else if (f instanceof TreeBin) { // 处理红黑树
                        // ... 树节点插入逻辑 ...
                    }
                }
            }
            if (binCount != 0) {
                if (binCount >= TREEIFY_THRESHOLD) // 链表转树
                    treeifyBin(tab, i);
                if (oldVal != null)
                    return oldVal;
                break;
            }
        }
    }
    addCount(1L, binCount); // 更新元素计数
    return null;
}
```
- **CAS 无锁插入**：桶为空时直接 CAS 插入，避免锁竞争。
- **synchronized 锁细化**：仅锁住冲突桶的头节点，其他桶可并行操作。

### **3. get：读操作无锁**
```java
public V get(Object key) {
    Node<K,V>[] tab; Node<K,V> e, p; int n, eh; K ek;
    int h = spread(key.hashCode());
    if ((tab = table) != null && (n = tab.length) > 0 &&
        (e = tabAt(tab, (n - 1) & h)) != null) { // 无锁访问桶头节点
        if ((eh = e.hash) == h) {
            if ((ek = e.key) == key || (ek != null && key.equals(ek)))
                return e.val; // 直接命中头节点
        } else if (eh < 0) // 处理 ForwardingNode 或 TreeBin
            return (p = e.find(h, key)) != null ? p.val : null;
        while ((e = e.next) != null) { // 遍历链表
            if (e.hash == h && ((ek = e.key) == key || (ek != null && key.equals(ek))))
                return e.val;
        }
    }
    return null;
}
```
- **无锁设计**：依赖 `volatile` 保证可见性，读操作无需同步。

---

## **三、多线程协同扩容**

### **1. transfer：数据迁移**
```java
private final void transfer(Node<K,V>[] tab, Node<K,V>[] nextTab) {
    int n = tab.length, stride;
    // 计算每个线程处理的桶区间（步长 stride）
    if ((stride = (NCPU > 1) ? (n >>> 3) / NCPU : n) < MIN_TRANSFER_STRIDE)
        stride = MIN_TRANSFER_STRIDE; // 最小步长为 16
    if (nextTab == null) { // 初始化新表
        // ...
    }
    int nextn = nextTab.length;
    ForwardingNode<K,V> fwd = new ForwardingNode<K,V>(nextTab); // 标记节点
    boolean advance = true;
    boolean finishing = false; // 迁移完成标志

    // 分片迁移逻辑
    for (int i = 0, bound = 0;;) {
        Node<K,V> f; int fh;
        while (advance) {
            // 分配任务区间 [bound, i)
            if (--i >= bound || finishing)
                advance = false;
            else if ((nextIndex = transferIndex) <= 0) {
                i = -1;
                advance = false;
            } else if (U.compareAndSwapInt(this, TRANSFERINDEX, nextIndex,
                      nextBound = (nextIndex > stride ? nextIndex - stride : 0))) {
                bound = nextBound;
                i = nextIndex - 1;
                advance = false;
            }
        }
        // 处理单个桶
        if (i < 0 || i >= n || i + n >= nextn) {
            // ... 检查是否全部迁移完成 ...
        } else if ((f = tabAt(tab, i)) == null)
            advance = casTabAt(tab, i, null, fwd); // 标记空桶为 ForwardingNode
        else if ((fh = f.hash) == MOVED)
            advance = true; // 已迁移，跳过
        else {
            synchronized (f) { // 锁住桶头节点
                // 迁移链表或树到新表
                if (tabAt(tab, i) == f) {
                    Node<K,V> ln, hn;
                    if (fh >= 0) { // 链表迁移
                        // ... 拆分链表到高位桶和低位桶 ...
                        setTabAt(nextTab, i, ln);
                        setTabAt(nextTab, i + n, hn);
                        setTabAt(tab, i, fwd); // 标记旧桶
                    } else if (f instanceof TreeBin) { // 树迁移
                        // ... 树拆分逻辑 ...
                    }
                }
            }
        }
    }
}
```
- **任务分片**：通过 `transferIndex` 动态分配迁移区间，多线程并行处理。
- **锁住桶头**：仅锁住当前桶，其他桶可继续迁移。

### **2. helpTransfer：协作迁移**
```java
final Node<K,V>[] helpTransfer(Node<K,V>[] tab, Node<K,V> f) {
    Node<K,V>[] nextTab; int sc;
    if (tab != null && (f instanceof ForwardingNode) &&
        (nextTab = ((ForwardingNode<K,V>)f).nextTable) != null) {
        int rs = resizeStamp(tab.length);
        while (nextTab == nextTable && table == tab && (sc = sizeCtl) < 0) {
            // 判断是否需要协助
            if ((sc >>> RESIZE_STAMP_SHIFT) != rs || sc == rs + MAX_RESIZERS || transferIndex <= 0)
                break;
            if (U.compareAndSwapInt(this, SIZECTL, sc, sc + 1)) { // 增加线程数
                transfer(tab, nextTab); // 参与迁移
                break;
            }
        }
        return nextTab;
    }
    return table;
}
```
- **协作机制**：线程通过 CAS 增加 `sizeCtl` 中的线程计数，加入迁移任务。

---

## **四、高效计数（addCount）**
```java
private final void addCount(long x, int check) {
    CounterCell[] as; long b, s;
    if ((as = counterCells) != null || // 使用 CounterCell 分散竞争
        !U.compareAndSwapLong(this, BASECOUNT, b = baseCount, s = b + x)) {
        // 更新 baseCount 失败，使用 CounterCell
        CounterCell a; long v; int m;
        boolean uncontended = true;
        if (as == null || (m = as.length - 1) < 0 ||
            (a = as[ThreadLocalRandom.getProbe() & m]) == null ||
            !(uncontended = U.compareAndSwapLong(a, CELLVALUE, v = a.value, v + x))) {
            fullAddCount(x, uncontended); // 初始化或扩容 CounterCell
            return;
        }
        if (check <= 1)
            return;
        s = sumCount(); // 汇总 baseCount 和所有 CounterCell 的值
    }
    // 检查是否需要扩容
    if (check >= 0) {
        // ... 触发扩容逻辑 ...
    }
}
```
- **分散竞争**：类似 `LongAdder`，通过 `baseCount` + `CounterCell[]` 减少 CAS 竞争。
- **精确计数**：`size()` 方法返回 `sumCount()` 的近似值。

---

## **五、与 HashMap 的关键区别**

| **特性**            | **ConcurrentHashMap**                          | **HashMap**               |
|---------------------|-----------------------------------------------|---------------------------|
| **线程安全**        | 是（CAS + synchronized 锁细化）               | 否                        |
| **Null 支持**       | 不允许键或值为 null                           | 允许                      |
| **迭代器**          | 弱一致性（不抛异常）                          | 快速失败（可能抛异常）     |
| **扩容机制**        | 多线程协同迁移（transfer + helpTransfer）      | 单线程扩容                |
| **数据结构**        | 链表 + 红黑树（支持并发安全转换）              | 链表 + 红黑树             |
| **性能**            | 高并发下读几乎无锁，写锁细化                  | 无锁，但线程不安全         |

---

## **六、总结**

`ConcurrentHashMap` 的高效线程安全源于以下设计：
1. **CAS 无锁化操作**：初始化、计数、空桶插入等场景减少锁竞争。
2. **synchronized 锁细化**：仅锁冲突桶，最大化并发度。
3. **多线程协作扩容**：动态分片迁移任务，缩短扩容时间。
4. **分散计数（CounterCell）**：避免单一计数器瓶颈。
