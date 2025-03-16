---
title: TreeMap源码解析
index: true
icon: laptop-code
date: 2025-03-16
category:
  - JDK基础源码
order: 7
---

**TreeMap** 是 Java 中基于 **红黑树（Red-Black Tree）** 实现的有序映射，支持自定义的排序规则。

不得不提，TreeMap 的代码读起来，既精简又优雅，很适合学习红黑树。

## **一、数据结构与节点定义**

### **1. 节点类（Entry）**

```java
static final class Entry<K,V> implements Map.Entry<K,V> {
    K key;                 // 键
    V value;               // 值
    Entry<K,V> left;       // 左子节点
    Entry<K,V> right;      // 右子节点
    Entry<K,V> parent;     // 父节点
    boolean color = BLACK; // 颜色标记（默认黑色）

    Entry(K key, V value, Entry<K,V> parent) {
        this.key = key;
        this.value = value;
        this.parent = parent;
    }
}
```

- **红黑树性质**： 
  1. 每个节点是红色或黑色。
  2. 根节点是黑色。
  3. 所有叶子节点（NIL）是黑色。
  4. 红色节点的子节点必须是黑色（不能有连续红节点）。
  5. 任一节点到叶子节点的路径上黑色节点数量相同。

---

## **二、核心方法解析**

### **1. 插入操作（put）**

```java
public V put(K key, V value) {
    return put(key, value, true);
}

private V put(K key, V value, boolean replaceOld) {
    Entry<K,V> t = root;
    if (t == null) { // 直接写根节点
        addEntryToEmptyMap(key, value);
        return null;
    }
    int cmp;
    Entry<K,V> parent;
    // ...省略一大段 if else，查找插入位置逻辑
    addEntry(key, value, parent, cmp < 0); // 基于排序放左子树，或者右子树
    return null;
}

private void addEntry(K key, V value, Entry<K, V> parent, boolean addToLeft) {
    Entry<K,V> e = new Entry<>(key, value, parent);
    if (addToLeft)
        parent.left = e;
    else
        parent.right = e;
    fixAfterInsertion(e); // 核心算法，维持红黑树平衡
    size++;
    modCount++;
}
```

### **2. 插入后调整（fixAfterInsertion）**
新版 JDK 通过 **工具方法** 简化颜色操作：

```java
private void fixAfterInsertion(Entry<K,V> x) {
    x.color = RED; // 新节点初始为红色
    while (x != null && x != root && x.parent.color == RED) {
        if (parentOf(x) == leftOf(parentOf(parentOf(x)))) {
            Entry<K,V> y = rightOf(parentOf(parentOf(x))); // 叔节点
            if (colorOf(y) == RED) { // 叔节点为红
                setColor(parentOf(x), BLACK);
                setColor(y, BLACK);
                setColor(parentOf(parentOf(x)), RED);
                x = parentOf(parentOf(x)); // 问题上移
            } else {
                // ... 旋转与颜色调整逻辑
            }
        } else {
            // ... 对称处理右子树 
        }
    }
    root.color = BLACK; // 根节点强制为黑
}
```

- **工具方法**：  
    ```java
    private static <K,V> boolean colorOf(Entry<K,V> p) {
        return (p == null ? BLACK : p.color);
    }

    private static <K,V> Entry<K,V> parentOf(Entry<K,V> p) {
        return (p == null ? null: p.parent);
    }

    private static <K,V> void setColor(Entry<K,V> p, boolean c) {
        if (p != null)
            p.color = c;
    }

    private static <K,V> Entry<K,V> leftOf(Entry<K,V> p) {
        return (p == null) ? null: p.left;
    }

    private static <K,V> Entry<K,V> rightOf(Entry<K,V> p) {
        return (p == null) ? null: p.right;
    }
    ```

---

## **三、删除操作与平衡调整**

### **1. 删除节点（deleteEntry）**

```java
public V remove(Object key) {
    Entry<K,V> p = getEntry(key);
    if (p == null)
        return null;

    V oldValue = p.value;
    deleteEntry(p);
    return oldValue;
}

private void deleteEntry(Entry<K,V> p) {
    size--;
    modCount++;
    // ... 省略较为复杂的实现
    if (p.color == BLACK) // 如果删除黑色节点
        fixAfterDeletion(replacement); // 调整平衡
}
```

### **2. 删除后调整（fixAfterDeletion）**

```java
private void fixAfterDeletion(Entry<K,V> x) {
    while (x != root && colorOf(x) == BLACK) {
        if (x == leftOf(parentOf(x))) {
            Entry<K,V> sib = rightOf(parentOf(x)); // 兄弟节点
            if (colorOf(sib) == RED) { // 情况1：兄弟为红
                setColor(sib, BLACK);
                setColor(parentOf(x), RED);
                rotateLeft(parentOf(x));
                sib = rightOf(parentOf(x));
            }
            // ... 处理其他情况
        } else {
            // 对称处理右子树 
        }
    }
    setColor(x, BLACK); // 确保根节点为黑
}
```
---

## **四、查询操作**

### **1. 查询节点（get）**

```java
public V get(Object key) {
    Entry<K,V> p = getEntry(key);
    return (p==null ? null : p.value);
}

final Entry<K,V> getEntry(Object key) {
    if (comparator != null)
        return getEntryUsingComparator(key); // 自定义排序规则的查找
    Comparable<? super K> k = (Comparable<? super K>) key; // 注意 key 要实现 Comparable 接口
    Entry<K,V> p = root;
    while (p != null) {
        int cmp = k.compareTo(p.key); // 默认compare逻辑
        if (cmp < 0)
            p = p.left; // 左子树继续查找
        else if (cmp > 0)
            p = p.right; // 右子树继续查找
        else
            return p; // 找到了就返回
    }
    return null;
}

final Entry<K,V> getEntryUsingComparator(Object key) {
    K k = (K) key;
    Comparator<? super K> cpr = comparator;
    if (cpr != null) {
        Entry<K,V> p = root;
        while (p != null) {
            int cmp = cpr.compare(k, p.key); // 自定义compare逻辑
            if (cmp < 0)
                p = p.left;
            else if (cmp > 0)
                p = p.right;
            else
                return p;
        }
    }
    return null;
}
```

### **2. 遍历操作（entrySet）**

迭代顺序：按红黑树中序遍历（升序）。

```java
// for-each 示例
 for (Map.Entry<Integer, String> entry : treeMap.entrySet()) {
    System.out.printf("%d: %s\t", entry.getKey(), entry.getValue());
}

// 编译器生成的等效代码
Iterator<Map.Entry<Integer, String>> iterator = treeMap.entrySet().iterator();
while (iterator.hasNext()) {
    Map.Entry<Integer, String> entry = iterator.next();
    System.out.printf("%d: %s\t", entry.getKey(), entry.getValue());
}
```

```java
public Set<Map.Entry<K,V>> entrySet() {
    EntrySet es = entrySet;
    return (es != null) ? es : (entrySet = new EntrySet());
}

class EntrySet extends AbstractSet<Map.Entry<K,V>> {
    public Iterator<Map.Entry<K,V>> iterator() {
        return new EntryIterator(getFirstEntry()); // 从最小节点开始遍历
    }
}

final Entry<K,V> getFirstEntry() {
    Entry<K,V> p = root;
    if (p != null)
        while (p.left != null)
            p = p.left;
    return p;
}

final class EntryIterator extends PrivateEntryIterator<Map.Entry<K,V>> {
    EntryIterator(Entry<K,V> first) { super(first); }
    public Map.Entry<K,V> next() { return nextEntry(); }
}

abstract class PrivateEntryIterator<T> implements Iterator<T> {
    public final boolean hasNext() {
        return next != null;
    }

    final Entry<K,V> nextEntry() {
        Entry<K,V> e = next;
        if (e == null) // 兜底保护
            throw new NoSuchElementException();
        if (modCount != expectedModCount) // 并法控制
            throw new ConcurrentModificationException();
        next = successor(e);
        lastReturned = e;
        return e;
    }
}

static <K,V> TreeMap.Entry<K,V> successor(Entry<K,V> t) {
    if (t == null)
        return null;
    else if (t.right != null) {
        Entry<K,V> p = t.right;
        while (p.left != null)
            p = p.left;
        return p;
    } else {
        Entry<K,V> p = t.parent;
        Entry<K,V> ch = t;
        while (p != null && ch == p.right) {
            ch = p;
            p = p.parent;
        }
        return p;
    }
}
```

---

## **五、与 HashMap 的对比**

| **特性**            | **TreeMap**                              | **HashMap**                     |
|---------------------|------------------------------------------|---------------------------------|
| **数据结构**        | 红黑树                                   | 数组 + 链表/红黑树              |
| **顺序性**          | 按键的自然或自定义顺序排序               | 无序                            |
| **时间复杂度**      | 插入/删除/查找 O(log n)                  | 平均 O(1)，最差 O(n)            |
| **线程安全**        | 非线程安全                               | 非线程安全                      |
| **允许 null 键**    | 不允许（除非 Comparator 支持）           | 允许                            |
| **适用场景**        | 需要有序遍历或范围查询                   | 快速查找，无需顺序              |

---

## **六、总结**

**TreeMap 的核心设计**：
1. **红黑树结构**：保证插入、删除、查找的时间复杂度为 **O(log n)**。
2. **自平衡机制**：通过旋转和颜色调整维护红黑树性质。
3. **有序性支持**：中序遍历实现按键排序，支持高效范围查询。

**使用场景**：
- 需要按顺序遍历键值对。
- 键的排序规则需自定义（通过 `Comparator`）。

**注意事项**：
- 键必须实现 `Comparable` 接口或提供 `Comparator`。
- 非线程安全，多线程环境下需外部同步或使用 `ConcurrentSkipListMap`。