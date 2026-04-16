---
title: Set相关源码解析
index: true
icon: laptop-code
date: 2025-03-16
category:
  - JDK基础源码
order: 7
---

## 概述

常用的 `Set` 实现类包括 **`HashSet`**、**`LinkedHashSet`** 和 **`TreeSet`**，它们基于不同的底层数据结构实现。

## 一、HashSet

### **实现原理**
- **底层数据结构**：基于 `HashMap` 实现，元素作为 `HashMap` 的键存储，值统一为 `PRESENT`（一个静态占位对象）。
- **无序性**：元素的存储和遍历顺序不固定。
- **允许 `null`**：允许存储一个 `null` 元素。

### **源码核心**
```java
public class HashSet<E> extends AbstractSet<E> implements Set<E> {
    private transient HashMap<E, Object> map;
    private static final Object PRESENT = new Object();

    public HashSet() {
        map = new HashMap<>(); // 默认初始容量16，负载因子0.75
    }

    public boolean add(E e) {
        return map.put(e, PRESENT) == null; // 直接调用HashMap的put方法
    }

    public boolean remove(Object o) {
        return map.remove(o) == PRESENT;
    }
}
```

### **特点**
- **时间复杂度**：`add`、`remove`、`contains` 操作平均为 **O(1)**，最坏情况（哈希冲突严重）退化为 **O(n)**。
- **适用场景**：快速去重、无需顺序的场景。

---

## 二、LinkedHashSet
### **实现原理**
- **底层数据结构**：继承自 `HashSet`，但内部通过 `LinkedHashMap` 实现，维护了一个 **双向链表** 记录插入顺序或访问顺序。
- **有序性**：遍历顺序与插入顺序一致（或按访问顺序，需配置）。

### **源码核心**
```java
public class LinkedHashSet<E> extends HashSet<E> implements Set<E> {
    public LinkedHashSet() {
        super(16, 0.75f, true); // 调用HashSet的特定构造方法
    }

    // HashSet中的构造方法（包私有）
    HashSet(int initialCapacity, float loadFactor, boolean dummy) {
        map = new LinkedHashMap<>(initialCapacity, loadFactor);
    }
}
```

### **特点**
- **时间复杂度**：与 `HashSet` 相同（双向链表仅增加少量指针维护开销）。
- **适用场景**：需要维护插入/访问顺序的去重集合（如 LRU 缓存）。

---

## 三、TreeSet
### **实现原理**
- **底层数据结构**：基于 `TreeMap` 实现，元素作为 `TreeMap` 的键存储，值统一为 `PRESENT`。
- **有序性**：元素按自然顺序或自定义 `Comparator` 排序。
- **搜索能力**：实现了 `NavigableSet` 接口，提供了较多搜索相关的API，例如查找最接近某个元素的元素、获取子集、逆序遍历等。

### **源码核心**
```java
public class TreeSet<E> extends AbstractSet<E> implements NavigableSet<E> {
    private transient NavigableMap<E, Object> map;
    private static final Object PRESENT = new Object();

    public TreeSet() {
        map = new TreeMap<>(); // 默认自然排序
    }

    public boolean add(E e) {
        return map.put(e, PRESENT) == null; // 调用TreeMap的put方法
    }
}
```

### **特点**
- **时间复杂度**：`add`、`remove`、`contains` 操作均为 **O(log n)**（红黑树高度平衡）。
- **允许 `null`**：仅在未设置 `Comparator` 且自然排序支持时允许 `null`。
- **适用场景**：需要有序或范围查询（如 `subSet()`, `headSet()`）的去重集合。

---

## 四、对比总结

| **特性**            | **HashSet**       | **LinkedHashSet**     | **TreeSet**           |
|----------------------|-------------------|-----------------------|-----------------------|
| **底层数据结构**     | HashMap           | LinkedHashMap         | TreeMap（红黑树）     |
| **元素顺序**         | 无序              | 插入/访问顺序         | 自然排序或自定义排序  |
| **允许 `null`**      | 是（1个）         | 是（1个）             | 取决于 Comparator     |
| **时间复杂度**       | O(1) 平均        | O(1) 平均            | O(log n)             |
| **线程安全**         | 否                | 否                    | 否                    |
| **适用场景**         | 快速去重          | 维护插入/访问顺序     | 有序集合、范围查询    |

---

## 五、源码设计关键点
1. **代码复用**  
   `HashSet` 和 `LinkedHashSet` 通过复用 `HashMap` 和 `LinkedHashMap` 的代码，减少冗余逻辑。例如：
   ```java
   // HashSet的add方法直接委托给HashMap
   public boolean add(E e) {
       return map.put(e, PRESENT) == null;
   }
   ```

2. **排序机制**  
   `TreeSet` 依赖 `TreeMap` 的红黑树排序，通过 `Comparator` 或 `Comparable` 接口实现元素比较：
   ```java
   // TreeMap的put方法内部比较逻辑
   Comparator<? super K> cpr = comparator;
   if (cpr != null) {
       do {
           parent = t;
           cmp = cpr.compare(key, t.key);
           // ...
       } while (t != null);
   }
   ```

3. **双向链表维护（LinkedHashSet）**  
   `LinkedHashMap` 通过 `Entry` 类扩展 `HashMap.Node`，添加 `before` 和 `after` 指针维护顺序：
   ```java
   static class Entry<K,V> extends HashMap.Node<K,V> {
       Entry<K,V> before, after;
       Entry(int hash, K key, V value, Node<K,V> next) {
           super(hash, key, value, next);
       }
   }
   ```

---

## 六、选择建议
- **需要快速查找且不关心顺序** → **`HashSet`**。
- **需要维护插入/访问顺序** → **`LinkedHashSet`**。
- **需要元素有序或范围查询** → **`TreeSet`**。
- **线程安全需求** → 使用 `Collections.synchronizedSet()` 包装或并发集合（如 `ConcurrentSkipListSet`）。
