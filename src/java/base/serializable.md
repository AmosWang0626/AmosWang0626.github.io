---
title: Java 序列化问题
date: 2018-11-04
category:
  - Java
tag:
  - 序列化
---

# Java 序列化问题 - serialVersionUID 排查指南

## 问题现象

```
java.io.InvalidClassException: local class incompatible: 
stream classdesc serialVersionUID = 1234567890, 
local class serialVersionUID = 9876543210
```

**原因**：未显式声明 `serialVersionUID`，JDK 自动生成的 ID 在不同环境不一致。

## 解决方案：从服务器提取 serialVersionUID

### 步骤 1：找到编译后的 class 文件

```bash
# 在服务器上查找
find /opt/app -name "KbsWebAuthenticationDetails.class"
```

### 步骤 2：提取 serialVersionUID

```bash
# 方法一：使用 serialver（推荐）
serialver -classpath /opt/app/WEB-INF/classes com.example.KbsWebAuthenticationDetails
# 输出：com.example.KbsWebAuthenticationDetails: static final long serialVersionUID = 1234567890L;

# 方法二：使用 javap
javap -verbose -classpath /opt/app/WEB-INF/classes com.example.KbsWebAuthenticationDetails | grep serialVersionUID
```

### 步骤 3：在代码中添加

```java
public class KbsWebAuthenticationDetails extends WebAuthenticationDetails {
    private static final long serialVersionUID = 1234567890L; // 从服务器提取的值
    private String extraInfo;
}
```

## 最佳实践

1. **始终显式声明**：所有实现 `Serializable` 的类都要声明 `serialVersionUID`
2. **使用有意义的值**：建议使用日期或版本号，如 `20240101L`
3. **父类子类都要声明**：即使父类已实现序列化，子类也需要自己的 ID
