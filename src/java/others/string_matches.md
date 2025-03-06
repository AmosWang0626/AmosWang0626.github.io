---
title: 字符串正则匹配性能对比
index: true
icon: laptop-code
category:
  - Java技术
---

> 测试机：Mac Pro 16GB; 2.6GHz 六核 Intel Core i7

- String.matches("[0-9]+") 1亿次 13,345ms（性能最差!）
- Pattern.compile("[0-9]+").matches() 1亿次 8,828ms
- Character.isDigit(...) 11ms（性能最佳!）

```java
public class MatchTest {

    /*
     * 判读一个字符串是否是纯数字，试了如下两种方式，以为会快点
     * 还有一种方式更快，那就是 Character.isDigit 那种
     */
    private static final Integer TEST_COUNT = 100000000;
    private static final String TEST_STR = String.valueOf(Long.MAX_VALUE);

    /**
     * 测试结果: true, 耗时: 13345ms
     */
    @Test
    public void stringMatches() {
        long startTime = System.currentTimeMillis();
        for (int i = 0; i < TEST_COUNT; i++) {
            TEST_STR.matches("[+0-9]");
        }
        System.out.printf("测试结果: %s, 耗时: %sms\n",
                TEST_STR.matches("[0-9]+"),
                (System.currentTimeMillis() - startTime));
    }

    /**
     * 测试结果: true, 耗时: 8828ms
     */
    @Test
    public void patternMatches() {
        long startTime = System.currentTimeMillis();
        Pattern number = Pattern.compile("[0-9]+");
        for (int i = 0; i < TEST_COUNT; i++) {
            number.matcher(TEST_STR).matches();
        }
        System.out.printf("测试结果: %s, 耗时: %sms\n",
                number.matcher(TEST_STR).matches(),
                (System.currentTimeMillis() - startTime));
    }

    /**
     * 测试结果: true, 耗时: 11ms
     */
    @Test
    public void isDigitMatches() {
        long startTime = System.currentTimeMillis();
        for (int i = 0; i < TEST_COUNT; i++) {
            isNumber(TEST_STR);
        }
        System.out.printf("测试结果: %s, 耗时: %sms\n",
                isNumber(TEST_STR),
                (System.currentTimeMillis() - startTime));
    }

    private static boolean isNumber(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        for (int i = 0, len = str.length(); i < len; i++) {
            if (!Character.isDigit(str.charAt(i))) {
                return false;
            }
        }
        return true;
    }
}
```