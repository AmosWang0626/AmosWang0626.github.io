---
title: 并发包内容
date: 2020-05-16
category:
  - JDK并发编程
order: 2
---

## CAS 与 AQS

## 1. CAS是什么

Compare-and-Swap 或者 Compare-and-Set 简称 CAS。

**CAS操作是原子性的**，CAS指令需要有三个操作数，分别是内存位置（在Java中可以简单地理解为变量的内存地址，用V表示）、旧的预期值（用A表示）和准备设置的新值（用B表示）。CAS指令执行时，当且仅当V符合A时，处理器才会用B更新V的值，否则它就不执行更新。

在 JDK 5之后，Java类库中才开始使用CAS操作，该操作由`sun.misc.Unsafe`类里面的`compareAndSwapInt()`和`compareAndSwapLong()`等几个方法包装提供。`HotSpot`虚拟机在内部对这些方法做了特殊处理，即时编译出来的结果就是一条平台相关的处理器CAS指令，没有方法调用的过程，或者可以认为是无条件内联进去了。不过由于Unsafe类在设计上就不是提供给用户程序调用的类【`Unsafe::getUnsafe()`的代码中限制了只有启动类加载器（`Bootstrap ClassLoader`）加载的Class才能访问它】，因此在`JDK 9`之前只有Java类库可以使用CAS，譬如`J.U.C`包里面的整数原子类，其中的`compareAndSet()`和`getAndIncrement()`等方法都使用了Unsafe类的CAS操作来实现。而如果用户程序也有使用CAS操作的需求，那要么就采用反射手段突破`Unsafe`的访问限制，要么就只能通过Java类库API来间接使用它。直到`JDK 9`之后，Java类库才在`VarHandle`类里开放了面向用户程序使用的`CAS`操作。

[JDK 8 使用 Unsafe.compareAndSwapInt() 示例](https://github.com/AmosWang0626/chaos/blob/master/chaos-advanced/src/main/java/com/amos/advanced/java/UnsafeCasStudy.java)

## 2. AQS是什么

基本结构：状态位 state + Node 双向链表；

获取锁：通过 CAS 修改 state（state + 1）；要是没获取到锁，就放进双向链表里边；

释放锁：释放锁，修改 state（state - 1）。当 state = 0，操作队列，解锁队首。

```java
private transient volatile Node head; // 队首
private transient volatile Node tail; // 队尾
private volatile int state; // 状态位

static final class Node {
    volatile int waitStatus; // 等待状态
    volatile Node prev; // 前
    volatile Node next; // 后
    volatile Thread thread; // 当前线程
}
```

## 3. ReentrantLock

> 针对的问题，jdk1.6之前，只要加上 synchronized，不管有没有并发，都会加上重量级锁，导致性能低下。
>
> Doug Lea 大神开发了JUC包，给出了加锁第二方案。

[子路老师：JUC AQS ReentrantLock源码分析（一）](https://blog.csdn.net/java_lyvee/article/details/98966684)
> 偷个懒，把子路老师的文章放这了。
>还有一个原因就是子路老师说的，不要会一点技术，还没理解全面，就往博客上写，间接导致了博客泛滥，误人子弟。

## 4. 其他并发集合

- CountDownLatch 类似计数器，都执行完成时退出。
- Semaphore 类似停车位，有进有出，满需等待。
- CyclicBarrier 类似发令枪，线程都就绪时，并发执行。
- ReentrantReadWriteLock 读写锁。
