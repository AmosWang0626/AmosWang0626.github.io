---
title: ArrayList源码解析
index: true
icon: laptop-code
date: 2025-03-05
category:
  - JDK基础源码
order: 1
---

## 概述

ArrayList 是基于数组实现的动态列表，支持自动扩容。

优点：高效的随机访问O(1)、动态扩容、内存连续

缺点：插入/删除性能较差O(n)、扩容开销较大、内存浪费（预留空间）

适合的场景：随机访问多、数据量变化小的场景。如果频繁插入/删除，推荐使用 LinkedList。

是否线程安全：ArrayList是线程不安全的，如果需要线程安全，可使用 CopyOnWriteArrayList 或 Collections.synchronizedList。


## 源码解析

> 本文结合 JDK 17 的源码展开，与其他版本相比变化不大。

### 1. 构造方法

```java
// 指定初始化容量，推荐使用。
// 但不推荐指定0，指定0之后前5次 add 都需要扩容。
public ArrayList(int initialCapacity) {
    if (initialCapacity > 0) {
        this.elementData = new Object[initialCapacity];
    } else if (initialCapacity == 0) {
        this.elementData = EMPTY_ELEMENTDATA;
    } else {
        throw new IllegalArgumentException("Illegal Capacity: "+
                                            initialCapacity);
    }
}

// 无参构造方法
// 不会初始化容量，首次 add 才会初始化容量为10。
public ArrayList() {
    this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
}

// 指定集合的构造方法
public ArrayList(Collection<? extends E> c) {
    // 浅Copy，底层调用native方法 java.lang.System.arraycopy
    Object[] a = c.toArray();
    if ((size = a.length) != 0) {
        if (c.getClass() == ArrayList.class) {
            elementData = a;
        } else {
            elementData = Arrays.copyOf(a, size, Object[].class);
        }
    } else {
        // replace with empty array.
        elementData = EMPTY_ELEMENTDATA;
    }
}
```

### 2. 添加元素

```java
public boolean add(E e) {
    modCount++; // 供迭代器使用，避免并发修改等
    add(e, elementData, size); // add元素到数组末尾
    return true; // 始终为 true
}

// 先判断数组长度，满了就先扩容，扩容完就把元素加到size位置
private void add(E e, Object[] elementData, int s) {
    if (s == elementData.length)
        elementData = grow(); // 数组满了就扩容
    elementData[s] = e;
    size = s + 1;
}

// 添加元素到指定位置，同样也会先判断要不要扩容，如果插入中间会涉及移动后边的元素位置
public void add(int index, E element) {
    rangeCheckForAdd(index);
    modCount++;
    final int s;
    Object[] elementData;
    if ((s = size) == (elementData = this.elementData).length)
        elementData = grow();
    // 下边这行其实可以优化下，index != s 时再执行
    System.arraycopy(elementData, index,
                      elementData, index + 1,
                      s - index);
    elementData[index] = element;
    size = s + 1;
}
```

### 3. 扩容

```java
private Object[] grow() {
    return grow(size + 1); // 扩容，并指定最小的容量 size+1
}

private Object[] grow(int minCapacity) {
    int oldCapacity = elementData.length;
    if (oldCapacity > 0 || elementData != DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        int newCapacity = ArraysSupport.newLength(oldCapacity,
                minCapacity - oldCapacity, /* 最小增长 */
                oldCapacity >> 1           /* 首选增长 */);
        return elementData = Arrays.copyOf(elementData, newCapacity);
    } else {
        return elementData = new Object[Math.max(DEFAULT_CAPACITY, minCapacity)]; // 类似懒加载，首次扩容。add、addAll、ensureCapacity（手动扩容）
    }
}

// 附 Arrays.copyOf() 源码，底层还是掉 native 方法 System.arraycopy 实现。
public static <T> T[] copyOf(T[] original, int newLength) {
    return (T[]) copyOf(original, newLength, original.getClass());
}

public static <T,U> T[] copyOf(U[] original, int newLength, Class<? extends T[]> newType) {
    T[] copy = ((Object)newType == (Object)Object[].class)
        ? (T[]) new Object[newLength]
        : (T[]) Array.newInstance(newType.getComponentType(), newLength);
    System.arraycopy(original, 0, copy, 0,
                      Math.min(original.length, newLength));
    return copy;
}

```

### 4. 删除

```java
// 删除指定 index 元素
public E remove(int index) {
    Objects.checkIndex(index, size);
    final Object[] es = elementData;

    @SuppressWarnings("unchecked") E oldValue = (E) es[index];
    fastRemove(es, index);

    return oldValue;
}

// 删除指定元素
public boolean remove(Object o) {
    final Object[] es = elementData;
    final int size = this.size;
    int i = 0;
    // Label标签的写法，在Java中并不常用。
    // found 是标签名称，{} 是代码块。break found 使得程序控制直接跳出这个代码块。类似 C/C++ goto 的写法。
    found: {
        if (o == null) {
            for (; i < size; i++)
                if (es[i] == null)
                    break found;
        } else {
            for (; i < size; i++)
                if (o.equals(es[i]))
                    break found;
        }
        return false;
    }
    fastRemove(es, i);
    return true;
}

// 删除中奖元素需移动位置，并将最后一个元素置空置
private void fastRemove(Object[] es, int i) {
    modCount++;
    final int newSize;
    if ((newSize = size - 1) > i)
        System.arraycopy(es, i + 1, es, i, newSize - i);
    es[size = newSize] = null;
}
```

### 5. 迭代器

ArrayList 内部有两个迭代器

- iterator()：简单、轻量，适合单向遍历和删除。
- listIterator()：功能强大，支持双向遍历、修改、添加，适合复杂操作。

#### 5.1 迭代器1：iterator()

```java
// 通过游标的移动，实现数据的遍历。
// 迭代器执行的过程中，通过 modCount、elementData.length 来校验是否有并发修改。
private class Itr implements Iterator<E> {
    int cursor;       // index of next element to return
    int lastRet = -1; // index of last element returned; -1 if no such
    int expectedModCount = modCount;

    // prevent creating a synthetic constructor
    Itr() {}

    public boolean hasNext() {
        return cursor != size;
    }

    @SuppressWarnings("unchecked")
    public E next() {
        checkForComodification();
        int i = cursor;
        if (i >= size)
            throw new NoSuchElementException();
        Object[] elementData = ArrayList.this.elementData;
        if (i >= elementData.length)
            throw new ConcurrentModificationException();
        cursor = i + 1;
        return (E) elementData[lastRet = i];
    }

    public void remove() {
        if (lastRet < 0)
            throw new IllegalStateException();
        checkForComodification();

        try {
            ArrayList.this.remove(lastRet);
            cursor = lastRet;
            lastRet = -1;
            expectedModCount = modCount;
        } catch (IndexOutOfBoundsException ex) {
            throw new ConcurrentModificationException();
        }
    }

    @Override
    public void forEachRemaining(Consumer<? super E> action) {
        Objects.requireNonNull(action);
        final int size = ArrayList.this.size;
        int i = cursor;
        if (i < size) {
            final Object[] es = elementData;
            if (i >= es.length)
                throw new ConcurrentModificationException();
            for (; i < size && modCount == expectedModCount; i++)
                action.accept(elementAt(es, i));
            // update once at end to reduce heap write traffic
            cursor = i;
            lastRet = i - 1;
            checkForComodification();
        }
    }

    final void checkForComodification() {
        if (modCount != expectedModCount)
            throw new ConcurrentModificationException();
    }
}
```

#### 5.2 迭代器2：listIterator()

```java
public ListIterator<E> listIterator() {
    return new ListItr(0);
}

// 指定迭代的起点
public ListIterator<E> listIterator(int index) {
    rangeCheckForAdd(index);
    return new ListItr(index);
}

private class ListItr extends Itr implements ListIterator<E> {
    ListItr(int index) {
        super();
        cursor = index;
    }

    public boolean hasPrevious() {
        return cursor != 0;
    }

    public int nextIndex() {
        return cursor;
    }

    public int previousIndex() {
        return cursor - 1;
    }

    @SuppressWarnings("unchecked")
    public E previous() {
        checkForComodification();
        int i = cursor - 1;
        if (i < 0)
            throw new NoSuchElementException();
        Object[] elementData = ArrayList.this.elementData;
        if (i >= elementData.length)
            throw new ConcurrentModificationException();
        cursor = i;
        return (E) elementData[lastRet = i];
    }

    public void set(E e) {
        if (lastRet < 0)
            throw new IllegalStateException();
        checkForComodification();

        try {
            ArrayList.this.set(lastRet, e);
        } catch (IndexOutOfBoundsException ex) {
            throw new ConcurrentModificationException();
        }
    }

    public void add(E e) {
        checkForComodification();

        try {
            int i = cursor;
            ArrayList.this.add(i, e);
            cursor = i + 1;
            lastRet = -1;
            expectedModCount = modCount;
        } catch (IndexOutOfBoundsException ex) {
            throw new ConcurrentModificationException();
        }
    }
}
```
