import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{e as i,f as s,g as p,r as l,o as t}from"./app-BCtReGRE.js";const r={};function c(d,n){const a=l("bean");return t(),i("div",null,[n[0]||(n[0]=s(`<h2 id="_1、ioc和di" tabindex="-1"><a class="header-anchor" href="#_1、ioc和di"><span>1、IOC和DI</span></a></h2><blockquote><p>IOC是一个宽泛的概念，IOC包括依赖查找和依赖注入。<br> 　　依赖查找：JDNL，就是配置文件<br> 　　依赖注入：DI</p></blockquote><p>首先想说说IoC（Inversion of Control，控制反转），这是spring的核心，贯穿始终。 控制的什么被反转了？就是：获得依赖对象的方式反转了。</p><p>所谓IoC，对于spring框架来说，就是由spring来负责控制对象的生命周期和对象间的关系。这是什么意思呢，举个简单的例子，我们如何找工作呢？我们通常会去找中介，中介那里有很多工作资源，我们告诉中介要找的工作的类型等等细节，中介会想办法给我们找到。这个过程是复杂深奥的，我们必须自己设计和面对每个环节。传统的程序开发也是如此，在一个对象中，如果要使用另外的对象，就必须得到它（自己new一个，或者从JNDI中查询一个），使用完之后还要将对象销毁（比如Connection等），对象始终会和其他的接口或类藕合起来。</p><p>那么IoC是如何做的呢？有点像通过婚介找女朋友，在我和女朋友之间引入了一个第三者：婚姻介绍所。婚介管理了很多男男女女的资料，我可以向婚介提出一个列表，告诉它我想找个什么样的女朋友，长相、身高、胖瘦之类的，然后婚介就会按照我们的要求，提供一个MM，我们只需要去和她谈恋爱、结婚就行了。简单明了，如果婚介给我们的人选不符合要求，我们就会抛出异常。整个过程不再由我自己控制，而是有婚介这样一个类似容器的机构来控制。Spring所倡导的开发方式就是如此，所有的类都会在spring容器中登记，告诉spring你是个什么东西，你需要什么东西，然后spring会在系统运行到适当的时候，把你要的东西主动给你，同时也把你交给其他需要你的东西。所有的类的创建、销毁都由spring来控制，也就是说控制对象生存周期的不再是引用它的对象，而是spring。对于某个具体的对象而言，以前是它控制其他对象，现在是所有对象都被spring控制，所以这叫控制反转。</p><p>IoC的一个重点是在系统运行中，动态的向某个对象提供它所需要的其他对象。这一点是通过DI（Dependency Injection，依赖注入）来实现的。比如对象A需要操作数据库，以前我们总是要在A中自己编写代码来获得一个Connection对象，有了spring我们就只需要告诉spring，A中需要一个Connection，至于这个Connection怎么构造，何时构造，A不需要知道。在系统运行时，spring会在适当的时候制造一个Connection，然后像打针一样，注射到A当中，这样就完成了对各个对象之间关系的控制。A需要依赖Connection才能正常运行，而这个Connection是由spring注入到A中的，依赖注入的名字就这么来的。那么DI是如何实现的呢？</p><p>Java1.3之后一个重要特征是反射（reflection），它允许程序在运行的时候动态的生成对象、执行对象的方法、改变对象的属性，spring就是通过反射来实现注入的。关于反射的相关资料请查阅java doc。</p><hr><h2 id="_2-导入相关的jar包-spring各jar包详解" tabindex="-1"><a class="header-anchor" href="#_2-导入相关的jar包-spring各jar包详解"><span>2.导入相关的jar包，Spring各jar包详解</span></a></h2><blockquote><p>除了spring.jar 文件，Spring 还包括有其它21 个独立的jar 包，各自包含着对应的Spring组件，用户可以根据自己的需要来选择组合自己的jar包，而不必引入整个spring.jar的所有类文件。</p></blockquote><h3 id="_1-spring-aop" tabindex="-1"><a class="header-anchor" href="#_1-spring-aop"><span>1.spring-aop</span></a></h3><p>这个jar文件包含在应用中使用Spring 的AOP特性时所需的类和源码级元数据支持。<br> 使用基于AOP 的Spring特性，如声明型事务管理（Declarative Transaction Management），也要在应用里包含这个jar包。<br> 外部依赖spring-core， (spring-beans，AOP Alliance， CGLIB，Commons Attributes)。</p><p>关于org.springframework.asm,Spring独立的asm程序, Spring2.5.6的时候需要asmJar包，3.0开始提供他自己独立的asmJar。</p><h3 id="_2-spring-aspects-jar" tabindex="-1"><a class="header-anchor" href="#_2-spring-aspects-jar"><span>2.spring-aspects.jar</span></a></h3><p>提供对AspectJ的支持，以便可以方便的将面向方面的功能集成进IDE中，比如Eclipse AJDT。<br> 外部依赖。</p><h3 id="_3-spring-beans-jar" tabindex="-1"><a class="header-anchor" href="#_3-spring-beans-jar"><span>3.spring-beans.jar</span></a></h3><p>这个jar 文件是所有应用都要用到的，它包含访问配置文件、创建和管理bean 以及进行Inversion ofControl / Dependency Injection（IoC/DI）操作相关的所有类。如果应用只需基本的IoC/DI 支持，引入spring-core.jar 及spring-beans.jar 文件就可以了。<br> 外部依赖spring-core，(CGLIB)。</p><h3 id="_4-spring-context-jar" tabindex="-1"><a class="header-anchor" href="#_4-spring-context-jar"><span>4.spring-context.jar</span></a></h3><p>这个jar 文件为Spring 核心提供了大量扩展。可以找到使用Spring ApplicationContext特性时所需的全部类，JDNI 所需的全部类，instrumentation组件以及校验Validation 方面的相关类。<br> 外部依赖spring-beans, (spring-aop)。</p><h3 id="_5-spring-context-support-jar" tabindex="-1"><a class="header-anchor" href="#_5-spring-context-support-jar"><span>5.spring-context-support.jar</span></a></h3><p>包含支持缓存Cache（ehcache）、JCA、JMX、 邮件服务（Java Mail、COS Mail）、任务计划Scheduling（Timer、Quartz）方面的类。<br> 以前的版本中应该是这个：spring-support.jar这个jar 文件包含支持UI模版（Velocity，FreeMarker，JasperReports），邮件服务，脚本服务(JRuby)，缓存Cache（EHCache），任务计划Scheduling（uartz）方面的类。<br> 外部依赖spring-context, (spring-jdbc, Velocity,FreeMarker, JasperReports, BSH, Groovy,JRuby, Quartz, EHCache)</p><h3 id="_6-spring-core-jar" tabindex="-1"><a class="header-anchor" href="#_6-spring-core-jar"><span>6.spring-core.jar</span></a></h3><p>这个jar 文件包含Spring 框架基本的核心工具类。Spring 其它组件要都要使用到这个包里的类，是其它组件的基本核心，当然你也可以在自己的应用系统中使用这些工具类。<br> 外部依赖Commons Logging，(Log4J)。</p><h3 id="_7-spring-expression" tabindex="-1"><a class="header-anchor" href="#_7-spring-expression"><span>7.spring-expression</span></a></h3><p>Spring表达式语言。</p><h3 id="_8-spring-instrument" tabindex="-1"><a class="header-anchor" href="#_8-spring-instrument"><span>8.spring-instrument</span></a></h3><p>Spring3.0对服务器的代理接口。</p><h3 id="_9-spring-instrument-tomcat" tabindex="-1"><a class="header-anchor" href="#_9-spring-instrument-tomcat"><span>9. spring-instrument-tomcat</span></a></h3><p>Spring3.0对Tomcat的连接池的集成。</p><h3 id="_10-spring-jdbc-jar" tabindex="-1"><a class="header-anchor" href="#_10-spring-jdbc-jar"><span>10.spring-jdbc.jar</span></a></h3><p>这个jar 文件包含对Spring 对JDBC 数据访问进行封装的所有类。<br> 外部依赖spring-beans，spring-dao。</p><h3 id="_11-spring-jms-jar" tabindex="-1"><a class="header-anchor" href="#_11-spring-jms-jar"><span>11.spring-jms.jar</span></a></h3><p>这个jar包提供了对JMS 1.0.2/1.1的支持类。<br> 外部依赖spring-beans，spring-dao，JMS API。</p><p>此外，还有下面这些没用过的，以spring-j*开头的包：<br> spring-jmx.jar<br> 这个jar包提供了对JMX 1.0/1.2的支持类。外部依赖spring-beans，spring-aop， JMX API。<br> spring-jca.jar<br> 对JCA 1.0的支持。外部依赖spring-beans，spring-dao， JCA API。<br> spring-jdo.jar<br> 对JDO 1.0/2.0的支持。外部依赖spring-jdbc， JDO API， (spring-web)。<br> spring-jpa.jar<br> 对JPA 1.0的支持。外部依赖spring-jdbc， JPA API， (spring-web)。</p><h3 id="_12-spring-messaging" tabindex="-1"><a class="header-anchor" href="#_12-spring-messaging"><span>12.spring-messaging</span></a></h3><p>spring-messaging模块为集成messaging api和消息协议提供支持<br> 参考 <a href="http://www.cnblogs.com/davidwang456/p/4446796.html" target="_blank" rel="noopener noreferrer">http://www.cnblogs.com/davidwang456/p/4446796.html</a></p><h3 id="_13-spring-orm" tabindex="-1"><a class="header-anchor" href="#_13-spring-orm"><span>13. spring-orm</span></a></h3><p>包含Spring对DAO特性集进行了扩展，使其支持iBATIS、JDO、OJB、TopLink， 因为hibernate已经独立成包了，现在不包含在这个包里了。这个jar文件里大部分的类都要依赖spring-dao.jar里的类，用这个包时你需要同时包含spring-dao.jar包。</p><h3 id="_14-spring-oxm" tabindex="-1"><a class="header-anchor" href="#_14-spring-oxm"><span>14. spring-oxm</span></a></h3><p>Spring 对Object/XMl的映射支持,可以让Java与XML之间来回切换。</p><h3 id="_15-spring-test" tabindex="-1"><a class="header-anchor" href="#_15-spring-test"><span>15.spring-test</span></a></h3><p>对Junit等测试框架的简单封装。</p><h3 id="_16-spring-tx" tabindex="-1"><a class="header-anchor" href="#_16-spring-tx"><span>16.spring-tx</span></a></h3><p>以前是在这里org.springframework.transaction<br> 为JDBC、Hibernate、JDO、JPA、Beans等提供的一致的声明式和编程式事务管理支持。</p><h3 id="_17-spring-web-jar" tabindex="-1"><a class="header-anchor" href="#_17-spring-web-jar"><span>17.spring-web.jar</span></a></h3><p>这个jar 文件包含Web 应用开发时，用到Spring 框架时所需的核心类，包括自动载入Web ApplicationContext 特性的类、Struts 与JSF 集成类、文件上传的支持类、Filter 类和大量工具辅助类。<br> 外部依赖spring-context, Servlet API, (JSP API, JSTL,Commons FileUpload, COS)。</p><p>org.springframework.web.portlet<br> SpringMVC的增强。<br> org.springframework.web.servlet<br> 对J2EE6.0的Servlet3.0的支持。<br> org.springframework.web.struts<br> Struts框架支持，可以更方便更容易的集成Struts框架。</p><h3 id="_18-spring-webmvc-jar" tabindex="-1"><a class="header-anchor" href="#_18-spring-webmvc-jar"><span>18.spring-webmvc.jar</span></a></h3><p>这个jar 文件包含Spring MVC 框架相关的所有类。包括框架的Servlets，Web MVC框架，控制器和视图支持。当然，如果你的应用使用了独立的MVC框架，则无需这个JAR 文件里的任何类。外部依赖spring-web, (spring-support，Tiles，iText，POI)。</p><p>3.SpringMVC</p><p>要想创建一个SpringMVC项目，首先需要导入spring-webmvc.jar,它里边包含要在web.xml使用的DispatcherServlet的类。还要注意SpringMVC依赖的Apache Commons Logging组件，也就是commons-logging.jar,通常是所有jar的第一个（名字原因，哈哈）。</p><h2 id="构造器注入" tabindex="-1"><a class="header-anchor" href="#构造器注入"><span>构造器注入</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span>&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot;</span></span>
<span class="line"><span>	xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span>	xsi:schemaLocation=&quot;http://www.springframework.org/schema/beans  </span></span>
<span class="line"><span>           http://www.springframework.org/schema/beans/spring-beans-4.3.xsd&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;bean id=&quot;user&quot; class=&quot;pojo.User&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		&lt;!-- 构造器注入 --&gt;</span></span>
<span class="line"><span>		&lt;constructor-arg name=&quot;id&quot; value=&quot;1&quot; /&gt;</span></span>
<span class="line"><span>		&lt;constructor-arg name=&quot;name&quot; value=&quot;杜杜&quot; /&gt;</span></span>
<span class="line"><span>		&lt;constructor-arg name=&quot;age&quot; value=&quot;17&quot; /&gt;</span></span>
<span class="line"><span>		&lt;constructor-arg name=&quot;gender&quot; value=&quot;女&quot; /&gt;</span></span>
<span class="line"><span>		&lt;constructor-arg name=&quot;address&quot; ref=&quot;SimpleAddress&quot; /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;/bean&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;bean id=&quot;SimpleAddress&quot; class=&quot;pojo.Address&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		&lt;!-- 构造器注入 --&gt;</span></span>
<span class="line"><span>		&lt;constructor-arg name=&quot;city&quot; value=&quot;邓州·河南&quot; /&gt;</span></span>
<span class="line"><span>		&lt;constructor-arg name=&quot;lines&quot; value=&quot;新华中路&quot; /&gt;</span></span>
<span class="line"><span>		&lt;constructor-arg name=&quot;zipCode&quot; value=&quot;474171&quot; /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;/bean&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/beans&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="get-set方法注入" tabindex="-1"><a class="header-anchor" href="#get-set方法注入"><span>get set方法注入</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span>&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot;</span></span>
<span class="line"><span>	xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span>	xsi:schemaLocation=&quot;http://www.springframework.org/schema/beans  </span></span>
<span class="line"><span>           http://www.springframework.org/schema/beans/spring-beans-4.3.xsd&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;bean id=&quot;user&quot; class=&quot;pojo.User&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		&lt;!-- 配置依赖关系 控制反转 get/set方法注入 --&gt;</span></span>
<span class="line"><span>		&lt;property name=&quot;id&quot; value=&quot;1&quot; /&gt;</span></span>
<span class="line"><span>		&lt;property name=&quot;name&quot; value=&quot;杜杜&quot; /&gt;</span></span>
<span class="line"><span>		&lt;property name=&quot;age&quot; value=&quot;17&quot; /&gt;</span></span>
<span class="line"><span>		&lt;property name=&quot;gender&quot; value=&quot;女&quot; /&gt;</span></span>
<span class="line"><span>		&lt;property name=&quot;address&quot; ref=&quot;SimpleAddress&quot; /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;/bean&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;bean id=&quot;SimpleAddress&quot; class=&quot;pojo.Address&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		&lt;!-- 配置依赖关系 控制反转 get/set方法注入 --&gt;</span></span>
<span class="line"><span>		&lt;property name=&quot;city&quot; value=&quot;郑州·河南&quot; /&gt;</span></span>
<span class="line"><span>		&lt;property name=&quot;lines&quot; value=&quot;中原西路&quot; /&gt;</span></span>
<span class="line"><span>		&lt;property name=&quot;zipCode&quot; value=&quot;450000&quot; /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;/bean&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/beans&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="bean-的装配以及生命周期" tabindex="-1"><a class="header-anchor" href="#bean-的装配以及生命周期"><span>Bean 的装配以及生命周期</span></a></h2><pre><code>&lt;!-- scope(单例singleton/非单例prototype) --&gt;
&lt;bean id=&quot;user&quot; class=&quot;com.amos.entity.User&quot; scope=&quot;singleton&quot; /&gt;
</code></pre><p>三种方式：</p><p>1.初始化操作，该方式中的init/destroy对应class中的两个方法名字</p><pre><code>&lt;bean id=&quot;user&quot; class=&quot;com.amos.entity.User&quot; init-method=&quot;init&quot; destroy-method=&quot;destroy&quot; /&gt;
</code></pre><p>2.对所有的bean有效</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot;xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span>xsi:schemaLocation=&quot;http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-4.3.xsd&quot;</span></span>
<span class="line"><span>default-init-method=&quot;init&quot;</span></span>
<span class="line"><span>default-destroy-method=&quot;destory&quot;&gt;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>    &lt;!-- 上边那行你懂得 --&gt;</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>&lt;/beans&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.通过实现接口方法初始化以及销毁类</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>	public class User implements InitializingBean,DisposableBean{</span></span>
<span class="line"><span>		@Override</span></span>
<span class="line"><span>		public void destroy() throws Exception {</span></span>
<span class="line"><span>			// TODO Auto-generated method stub</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		@Override</span></span>
<span class="line"><span>		public void afterPropertiesSet() throws Exception {</span></span>
<span class="line"><span>			// TODO Auto-generated method stub</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>1、三种方式优先级：接口 &gt; bean配置 &gt; 默认全局（如果有前两种之一，默认全局也不会生效）</p><p>2、如果三种方式都使用了，则顺序是实现的接口，然后是bean里边的配置，全局的初始化未生效</p><p>3、如果beans里边的默认全局配置配置过了，但是在bean里边没有默认全局配置的方法，也不会报错</p><p>4、但是如果bean里边的配置了，class里边没有实现，则报错</p><ul><li>1、这个没有关闭的方法</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public class SpringUtil {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 简单单例模式</span></span>
<span class="line"><span>	private static ApplicationContext context = new ClassPathXmlApplicationContext(&quot;com/amos/resource/spring-ioc.xml&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	@SuppressWarnings(&quot;unchecked&quot;)</span></span>
<span class="line"><span>	public static &lt;T extends Object&gt; T getBean(String beanId) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		return (T) context.getBean(beanId);</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	public static &lt;T extends Object&gt; T getBean(Class\`&lt;T&gt;\` clazz) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		return context.getBean(clazz);</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>2、这个有关闭的方法</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public class SpringUtil {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 简单单例模式</span></span>
<span class="line"><span>	private static AbstractApplicationContext context;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	static {</span></span>
<span class="line"><span>		context = new ClassPathXmlApplicationContext(&quot;com/amos/resource/spring-config.xml&quot;);</span></span>
<span class="line"><span>		context.start();</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 得到上下文信息</span></span>
<span class="line"><span>	public static ApplicationContext getContext() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		return context;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 根据bean的id得到bean实例</span></span>
<span class="line"><span>	@SuppressWarnings(&quot;unchecked&quot;)</span></span>
<span class="line"><span>	public static &lt;T extends Object&gt; T getBean(String beanId) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		return (T) context.getBean(beanId);</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 根据bean的class得到bean实例</span></span>
<span class="line"><span>	public static &lt;T extends Object&gt; T getBean(Class\`&lt;T&gt;\` clazz) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		return context.getBean(clazz);</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	public static void close() {</span></span>
<span class="line"><span>		context.destroy();</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="aware" tabindex="-1"><a class="header-anchor" href="#aware"><span>Aware</span></a></h1><ul><li>ApplicationContextAware</li><li>BeanNameAware</li></ul><p>Spring 中提供了一些以Aware结尾的接口，<br> 实现Aware接口的bean在被初始化之后，可以获得相应的资源，<br> 通过Aware接口，可以对Spring中相应的一些资源进行操作。<br> （切记是bean初始化的时候就加载）</p><ol><li>配置信息</li></ol>`,76)),p(a,{id:"testAware",class:"com.amos.test.TestAware"}),n[1]||(n[1]=s(`<ol start="2"><li>TestAware类</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public class TestAware implements ApplicationContextAware, BeanNameAware {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	private String beanName;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 先获得bean的名字</span></span>
<span class="line"><span>	@Override</span></span>
<span class="line"><span>	public void setBeanName(String name) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		this.beanName = name;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		System.out.println(&quot;TestAware--setBeanName:&quot; + name);</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 通过名字获得bean,进而获得hashCode</span></span>
<span class="line"><span>	@Override</span></span>
<span class="line"><span>	public void setApplicationContext(ApplicationContext context) throws BeansException {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		int code = context.getBean(beanName).hashCode();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		System.out.println(&quot;TestAware--setApplicationContext:&quot; + code);</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>test方法</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>	public static void testBeanNameAware() {</span></span>
<span class="line"><span>		// 引入并加载配置文件</span></span>
<span class="line"><span>		int code = SpringUtil.getBean(&quot;testAware&quot;).hashCode();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		System.out.println(&quot;TestMain--getBean:&quot; + code);</span></span>
<span class="line"><span>	}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>自动装配</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span>&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot;</span></span>
<span class="line"><span>	xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span>	xsi:schemaLocation=&quot;http://www.springframework.org/schema/beans  </span></span>
<span class="line"><span>           http://www.springframework.org/schema/beans/spring-beans-4.3.xsd&quot;</span></span>
<span class="line"><span>	default-autowire=&quot;byType&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;bean id=&quot;userServiceImpl&quot; class=&quot;com.amos.service.UserServiceImpl&quot; /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;bean id=&quot;userDaoImpl&quot; class=&quot;com.amos.dao.UserDaoImpl&quot; /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/beans&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>public class UserServiceImpl implements UserService {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	private UserDaoImpl userDaoImpl;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	public void setUserDaoImpl(UserDaoImpl userDaoImpl) {</span></span>
<span class="line"><span>		this.userDaoImpl = userDaoImpl;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	@Override</span></span>
<span class="line"><span>	public void addUser(User user) {</span></span>
<span class="line"><span>		userDaoImpl.saveUser(user);</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>常用的有三种装配方式，一种是byName，一种是byType，最后一种是。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>两者都需要实现setUserDaoImpl(UserDaoImpl userDaoImpl){}方法</span></span>
<span class="line"><span></span></span>
<span class="line"><span>default-autowire=&quot;byName&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>它主要是根据名字，也就是根据其中的userDaoImpl，两者匹配才可以</span></span>
<span class="line"><span>&lt;bean id=&quot;userDaoImpl&quot; class=&quot;com.amos.dao.UserDaoImpl&quot; /&gt;</span></span>
<span class="line"><span>private UserDaoImpl userDaoImpl;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>default-autowire=&quot;byType&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>它则主要是根据class类型，与id无关，即使删掉也可以</span></span>
<span class="line"><span>&lt;bean class=&quot;com.amos.dao.UserDaoImpl&quot; /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>default-autowire=&quot;constructor&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	// 有参构造方法</span></span>
<span class="line"><span>	public UserServiceImpl(UserDaoImpl userDaoImpl) {</span></span>
<span class="line"><span>		System.out.println(&quot;有参构造UserServiceImpl()&quot;);</span></span>
<span class="line"><span>		this.userDaoImpl = userDaoImpl;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>它也是主要是根据class类型，与id无关，即使删掉也可以</span></span>
<span class="line"><span>&lt;bean class=&quot;com.amos.dao.UserDaoImpl&quot; /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>资源目录</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Resources：针对资源文件的统一接口</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    ResourcesLoder：Application中自带的获取资源方式</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    常见的如下四种方式：</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    classpath:***.xml		项目中配置的路径</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    file:D:\\***.xml			相对于电脑的路径</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    url:http:\\amos.com\\spring\\***.xml		网上的路径</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    ***.xml		相对于ApplicationContext配置后的路径</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># 注解方式</span></span>
<span class="line"><span></span></span>
<span class="line"><span>几个比较有针对性的注解</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Repository		通常用于注解Dao类，即持久层</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Service			通常用于注解Service类，即服务层</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Controller		通常用于注解Controller类，即控制层(MVC)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;context:annotation-config&gt; 和 &lt;context:component-scan&gt;的区别</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;context:annotation-config&gt; 是用于激活那些已经在spring容器里注册过的bean。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;context:component-scan&gt;除了具有&lt;context:annotation-config&gt;的功能之外,&lt;context:component-scan&gt;还可以在指定的package下扫描以及注册bean.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;context:component-scan&gt;,还具有自动将带有@component,@service,@Repository等注解的对象注册到spring容器中的功能。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>当&lt;context:annotation-config /&gt;和 &lt;context:component-scan&gt;同时存在的时候,前者会被忽略。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Required注解适用于bean属性的setter方法（不常用）</span></span>
<span class="line"><span>这个注解仅仅表示，受影响的bean属性必须在配置时被填充，通过在bean定义或通过自动装配一个明确的属性值</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Autowired可以通过“传统”的setter方法，也可以用于成员变量或构造器（常用）</span></span>
<span class="line"><span>默认情况下，如果找不到合适的bean就会抛出异常，当然可以通过下边的方式避免</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Autowired(required=false)</span></span>
<span class="line"><span>但是，每个类中只能有一个构造器被标记为required=true</span></span>
<span class="line"><span>此时，@Autowired的必要属性，建议使用@Required注解</span></span>
<span class="line"><span></span></span>
<span class="line"><span>对于@Autowired还有自动装配到相应的\`List&lt;BeanInter&gt;\`,或者\`Map&lt;String,BeanInter&gt;\`.</span></span>
<span class="line"><span>此时，还可以进行Order排序,这个只对\`List&lt;BeanInter&gt;\`有效</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Map遍历</span></span>
<span class="line"><span></span></span>
<span class="line"><span>for (\`Map.Entry&lt;String, BeanInter&gt;\` entry : map.entrySet()) {</span></span>
<span class="line"><span>		System.out.println(entry.getKey() + &quot;   &quot; + entry.getValue().getClass().getName());</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    \`Map.Entry&lt;K,V&gt;\` 是map集合中的一个Map实体，包括key,value;</span></span>
<span class="line"><span>    map.entrySer() 的返回值是map的集合。</span></span>
<span class="line"><span>    map.keySet() 返回的是所有的key集合</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    Object get(Object key): 获得与关键字key相关的值，并且返回与关键字key相关的对象，</span></span>
<span class="line"><span>    如果没有在该映像中找到该关键字，则返回null;</span></span>
<span class="line"><span>    boolean containsKey(Object key): 判断映像中是否存在关键字key;</span></span>
<span class="line"><span>    boolean containsValue(Object value): 判断映像中是否存在值value;</span></span>
<span class="line"><span>    int size(): 返回当前映像中映射的数量;</span></span>
<span class="line"><span>    boolean isEmpty(); 如果Map集合对象不包含任何内容，则返回true，否则返回false;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Autowired</span></span>
<span class="line"><span>@Qualifier(&quot;beanOne&quot;) // 缩小bean查找范围</span></span>
<span class="line"><span>private BeanInter beanInter;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if (beanInter != null) {</span></span>
<span class="line"><span>	System.out.println(&quot;测试@Qualifier(&#39;beanOne&#39;):&quot; + beanInter.getClass().getName());</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>	System.out.println(&quot;BeanInter beanInter is null!&quot;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@Qualifier(&quot;beanOne&quot;)</span></span>
<span class="line"><span>当指定的bean范围比较广,对应的有多个实例的时候,</span></span>
<span class="line"><span>这时就通过@Qualifier来缩小范围,指定更精确的bean。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Spring 加载.properties配置文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>项目的目录结构</span></span>
<span class="line"><span></span></span>
<span class="line"><span>AOP</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;beans&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;!-- Spring AOP 中的标签必须按照顺序 --&gt;</span></span>
<span class="line"><span>	&lt;!-- &lt;aop:config&gt; 可以包含pointcut,advisor,aspect --&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;bean id=&quot;entry&quot; class=&quot;com.amos.main.Entry&quot; /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;bean id=&quot;entryService&quot; class=&quot;com.amos.main.EntryService&quot; /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;!-- ..代表当前包下所有的||...代表当钱包下以及子包下所有的 --&gt;</span></span>
<span class="line"><span>	&lt;aop:config&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		&lt;aop:pointcut expression=&quot;execution(* com.amos.main.*Service.*(..))&quot;</span></span>
<span class="line"><span>			id=&quot;entryPointcut&quot; /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		&lt;aop:aspect id=&quot;entryAOP&quot; ref=&quot;entry&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>			&lt;aop:before method=&quot;before&quot; pointcut-ref=&quot;entryPointcut&quot; /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		&lt;/aop:aspect&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;/aop:config&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/beans&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># AOP核心概念</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 1、横切关注点</span></span>
<span class="line"><span></span></span>
<span class="line"><span>对哪些方法进行拦截，拦截后怎么处理，这些关注点称之为横切关注点</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 2、切面（aspect）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>类是对物体特征的抽象，切面就是对横切关注点的抽象</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 3、连接点（joinpoint）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>被拦截到的点，因为Spring只支持方法类型的连接点，所以在Spring中连接点指的就是被拦截到的方法，实际上连接点还可以是字段或者构造器</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 4、切入点（pointcut）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>对连接点进行拦截的定义</span></span>
<span class="line"><span></span></span>
<span class="line"><span>一组基于正则表达式的表达式,它会选取程序中有我们关注的程序执行点,或者执行点的集合。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 5、通知（advice）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>所谓通知指的就是指拦截到连接点之后要执行的代码，通知分为前置、后置、异常、最终、环绕通知五类</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 6、目标对象</span></span>
<span class="line"><span></span></span>
<span class="line"><span>代理的目标对象</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 7、织入（weave）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>将切面应用到目标对象并导致代理对象创建的过程</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 8、引入（introduction）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>在不修改代码的前提下，引入可以在运行期为类动态地添加一些方法或字段</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>注意一下，在讲解之前，说明一点：使用Spring AOP，要成功运行起代码，只用Spring提供给开发者的jar包是不够的，请额外上网下载两个jar包：</span></span>
<span class="line"><span>    1、aopalliance.jar</span></span>
<span class="line"><span>    2、aspectjweaver.jar</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6))])}const u=e(r,[["render",c],["__file","spring-base.html.vue"]]),m=JSON.parse('{"path":"/java/spring/spring-base.html","title":"框架相关 spring","lang":"zh-CN","frontmatter":{"title":"框架相关 spring","date":"2019-01-01T00:00:00.000Z","category":["框架相关"],"tag":["spring"],"description":"1、IOC和DI IOC是一个宽泛的概念，IOC包括依赖查找和依赖注入。 依赖查找：JDNL，就是配置文件 依赖注入：DI 首先想说说IoC（Inversion of Control，控制反转），这是spring的核心，贯穿始终。 控制的什么被反转了？就是：获得依赖对象的方式反转了。 所谓IoC，对于spring框架来说，就是由spring来负责控制对...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/java/spring/spring-base.html"}],["meta",{"property":"og:site_name","content":"JAVA技术学习笔记"}],["meta",{"property":"og:title","content":"框架相关 spring"}],["meta",{"property":"og:description","content":"1、IOC和DI IOC是一个宽泛的概念，IOC包括依赖查找和依赖注入。 依赖查找：JDNL，就是配置文件 依赖注入：DI 首先想说说IoC（Inversion of Control，控制反转），这是spring的核心，贯穿始终。 控制的什么被反转了？就是：获得依赖对象的方式反转了。 所谓IoC，对于spring框架来说，就是由spring来负责控制对..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-04-16T08:46:21.000Z"}],["meta",{"property":"article:tag","content":"spring"}],["meta",{"property":"article:published_time","content":"2019-01-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2026-04-16T08:46:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"框架相关 spring\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-01-01T00:00:00.000Z\\",\\"dateModified\\":\\"2026-04-16T08:46:21.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Amos Wang\\",\\"url\\":\\"https://github.com/AmosWang0626\\"}]}"]]},"git":{"createdTime":1776317325000,"updatedTime":1776329181000,"contributors":[{"name":"dorian","username":"dorian","email":"daoyuan0626@gmail.com","commits":3,"url":"https://github.com/dorian"}]},"readingTime":{"minutes":14.48,"words":4344},"filePathRelative":"java/spring/spring-base.md","localizedDate":"2019年1月1日","excerpt":"<h2>1、IOC和DI</h2>\\n<blockquote>\\n<p>IOC是一个宽泛的概念，IOC包括依赖查找和依赖注入。<br>\\n　　依赖查找：JDNL，就是配置文件<br>\\n　　依赖注入：DI</p>\\n</blockquote>\\n<p>首先想说说IoC（Inversion of Control，控制反转），这是spring的核心，贯穿始终。    控制的什么被反转了？就是：获得依赖对象的方式反转了。</p>\\n<p>所谓IoC，对于spring框架来说，就是由spring来负责控制对象的生命周期和对象间的关系。这是什么意思呢，举个简单的例子，我们如何找工作呢？我们通常会去找中介，中介那里有很多工作资源，我们告诉中介要找的工作的类型等等细节，中介会想办法给我们找到。这个过程是复杂深奥的，我们必须自己设计和面对每个环节。传统的程序开发也是如此，在一个对象中，如果要使用另外的对象，就必须得到它（自己new一个，或者从JNDI中查询一个），使用完之后还要将对象销毁（比如Connection等），对象始终会和其他的接口或类藕合起来。</p>","autoDesc":true}');export{u as comp,m as data};
