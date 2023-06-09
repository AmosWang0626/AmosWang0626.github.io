---
title: 万能的 HelloWorld
date: 2021-03-12 13:57
categories: Java
---

# 万能的 HelloWorld

有台服务器的时间不对，想验证下，就想到了 HelloWorld，轻松搞定。

## 相关命令
- `javac HelloWorld.java`
- `java HelloWorld`
- `java -Duser.timezone=GMT+08 HelloWorld`

```java
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

class HelloWorld {

    /**
     * 暂不考虑线程不安全问题
     */
    private static final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");

    public static void main(String[] args) {
        Date date = new Date();
        System.out.println("new Date(): " + date);
        System.out.println("new Date(): " + simpleDateFormat.format(date));

        Date calendarTime = Calendar.getInstance().getTime();
        System.out.println("Calendar.getInstance().getTime(): " + calendarTime);
        System.out.println("Calendar.getInstance().getTime(): " + simpleDateFormat.format(calendarTime));

        long currentTimeMillis = System.currentTimeMillis();
        System.out.println("System.currentTimeMillis(): " + currentTimeMillis);
        System.out.println("System.currentTimeMillis(): " + simpleDateFormat.format(currentTimeMillis));
    }
}
```
