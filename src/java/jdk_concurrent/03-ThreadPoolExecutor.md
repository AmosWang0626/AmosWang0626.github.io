---
title: 线程池
date: 2020-05-16
category:
  - JDK并发编程
order: 3
---

## 代码示例

```java
import com.google.common.util.concurrent.ThreadFactoryBuilder;

public class ThreadFactoryTest {

    public static void main(String [] args) {
        // 创建线程工厂,并设置线程名字格式
        ThreadFactory threadFactory = new ThreadFactoryBuilder().setNameFormat("thread-pool-%d").build();

        // if (corePoolSize > maximumPoolSize) throw IllegalArgumentException(非法调度Exception)
        ExecutorService singleThreadPool = new ThreadPoolExecutor(12, 24,
                0L, TimeUnit.MILLISECONDS,
                new LinkedBlockingQueue<>(1024), threadFactory, new ThreadPoolExecutor.AbortPolicy());

        singleThreadPool.execute(() -> System.out.println(Thread.currentThread().getName()));
        singleThreadPool.shutdown();
    }
}
```

## ThreadPoolExecutor 参数详解
> `ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, `
> `                   long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue, `
> `                   ThreadFactory threadFactory, RejectedExecutionHandler handler)`

- int corePoolSize 核心线程数。
    - 默认情况下核心线程会一直存活，即使处于闲置状态也不会受存keepAliveTime限制。
    - 除非将allowCoreThreadTimeOut设置为true。

- int maximumPoolSize 线程池所能容纳的最大线程数。
    - 超过这个数的线程将被阻塞。
    - 当任务队列为没有设置大小的LinkedBlockingDeque时，这个值无效。

- long keepAliveTime 非核心线程的闲置超时时间，超过这个时间就会被回收。

- TimeUnit unit 指定keepAliveTime的单位，如TimeUnit.SECONDS。
    - 当将allowCoreThreadTimeOut设置为true时对corePoolSize生效。

- `BlockingQueue<Runnable> workQueue` 线程池中的任务队列。
    - 常用的有三种队列，SynchronousQueue,LinkedBlockingDeque,ArrayBlockingQueue。

- ThreadFactory threadFactory 线程工厂，提供创建新线程的功能。
    - ThreadFactory是一个接口，只有一个方法。

- RejectedExecutionHandler handler 线程池对拒绝任务的处理策略。
    - 在 ThreadPoolExecutor 里面定义了 4 种 handler 策略，分别是:
        1. CallerRunsPolicy ：这个策略重试添加当前的任务，他会自动重复调用 execute() 方法，直到成功。
        2. AbortPolicy ：对拒绝任务抛弃处理，并且抛出异常。
        3. DiscardPolicy ：对拒绝任务直接无声抛弃，没有异常信息。
        4. DiscardOldestPolicy ：对拒绝任务不抛弃，而是抛弃队列里面等待最久的一个线程，然后把拒绝任务加到队列

### corePoolSize、maximumPoolSize
- 如果线程数量<=核心线程数量，那么直接启动一个核心线程来执行任务，不会放入队列中。

- 如果线程数量>核心线程数，但<=最大线程数，并且任务队列是LinkedBlockingDeque的时候，
超过核心线程数量的任务会放在任务队列中排队。

- 如果线程数量>核心线程数，但<=最大线程数，并且任务队列是SynchronousQueue的时候，线程池
会创建新线程执行任务，这些任务也不会被放在任务队列中。这些线程属于非核心线程，在任务完
成后，闲置时间达到了超时时间就会被清除。

- 如果线程数量>核心线程数，并且>最大线程数，当任务队列是LinkedBlockingDeque，会将超过
核心线程的任务放在任务队列中排队。也就是当任务队列是LinkedBlockingDeque并且没有大小
限制时，线程池的最大线程数设置是无效的，他的线程数最多不会超过核心线程数。

- 如果线程数量>核心线程数，并且>最大线程数，当任务队列是SynchronousQueue的时候，会因为
线程池拒绝添加任务而抛出异常。

