---
title: String.matches() 性能测试
date: 2022-05-02
categories: Java
---

# String.matches() 性能测试

> 测试机：Mac Pro 16GB 2667 MHz DDR4; 2.6GHz 六核Intel Core i7

- String.matches("[0-9]+") 1亿次 19880毫秒
- Pattern.compile("[0-9]+").matcher("[0-9]+").matches() 1亿次 4390毫秒

结论：String.matches() 的性能远不如正常的正则表达式。

```java
public class Test {

    @Test
    public void isNumber() {
        String keyword = "1223323";
        final long startTime = System.currentTimeMillis();
        for (int i = 0; i < 100000000; i++) {
            isNumber(keyword);
        }
        System.out.println("耗时: " + (System.currentTimeMillis() - startTime));
        System.out.println(keyword + " 是纯数字: " + isNumber(keyword));
    }

    /**
     * 纯数字(正整数)
     */
    private static final Pattern POSITIVE_NUMBER = Pattern.compile("[0-9]+");

    public static boolean isNumber(String keyword) {
        if (Objects.isNull(keyword)) {
            return false;
        }
        // 就换这两行代码测试
//        return POSITIVE_NUMBER.matcher("[0-9]+").matches();
        return keyword.matches("[0-9]+");
    }
}
```
