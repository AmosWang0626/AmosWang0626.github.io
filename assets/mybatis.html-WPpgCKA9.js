import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{e as a,f as e,o as i}from"./app-DpIefnkN.js";const t={};function l(p,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="mybatis-2017-5-16" tabindex="-1"><a class="header-anchor" href="#mybatis-2017-5-16"><span>MyBatis （2017.5.16）</span></a></h1><blockquote><p>MyBatis 主要是处理数据的持久化操作的一个轻量级框架，相对于Hibernate而言。</p></blockquote><hr><h2 id="实现数据持久化操作主要有两点" tabindex="-1"><a class="header-anchor" href="#实现数据持久化操作主要有两点"><span>实现数据持久化操作主要有两点：</span></a></h2><pre><code>1. 底层配置文件

2. *Mapper.xml

3. Dao层接口 ***Dao.java

4. Util类 DBAccess.java 向外部输出SQLSession

5. 控制层
</code></pre><hr><h2 id="mybatis-关键字" tabindex="-1"><a class="header-anchor" href="#mybatis-关键字"><span>MyBatis 关键字</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&quot;,&quot; &quot;=&quot; &quot;?&quot; &quot;||&quot; &quot;or&quot; &quot;&amp;&amp;&quot; &quot;and&quot; &quot;|&quot; &quot;bor&quot; &quot;^&quot; &quot;xor&quot; &quot;&amp;&quot; &quot;band&quot;</span></span>
<span class="line"><span>&quot;==&quot; &quot;eq&quot; &quot;!=&quot; &quot;neq&quot; &quot;&lt;&quot; &quot;lt&quot;&quot;&gt;&quot; &quot;gt&quot; &quot;&lt;=&quot; &quot;lte&quot; &quot;&gt;=&quot; &quot;gte&quot; &quot;in&quot;</span></span>
<span class="line"><span>&quot;not&quot; &quot;&lt;&lt;&quot; &quot;shl&quot; &quot;&gt;&gt;&quot; &quot;shr&quot; &quot;&gt;&gt;&gt;&quot; &quot;ushr&quot; &quot;+&quot; &quot;-&quot; &quot;*&quot; &quot;/&quot; &quot;%&quot; &quot;.&quot;</span></span>
<span class="line"><span>&quot;(&quot;&quot;instanceof&quot;  &quot;[&quot; &quot;]&quot; &lt;![CDATA[ &lt;= ]]&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-底层配置文件-configuration-xml" tabindex="-1"><a class="header-anchor" href="#_1-底层配置文件-configuration-xml"><span>1. 底层配置文件 Configuration.xml</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot; ?&gt;</span></span>
<span class="line"><span>&lt;!DOCTYPE configuration</span></span>
<span class="line"><span>    PUBLIC &quot;-//mybatis.org//DTD Config 3.0//EN&quot;</span></span>
<span class="line"><span>    &quot;http://mybatis.org/dtd/mybatis-3-config.dtd&quot;&gt;</span></span>
<span class="line"><span>&lt;configuration&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;typeAliases&gt;</span></span>
<span class="line"><span>		&lt;typeAlias alias=&quot;product&quot; type=&quot;com.amos.pojo.Product&quot; /&gt;</span></span>
<span class="line"><span>	&lt;/typeAliases&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;environments default=&quot;development&quot;&gt;</span></span>
<span class="line"><span>		&lt;environment id=&quot;development&quot;&gt;</span></span>
<span class="line"><span>			&lt;transactionManager type=&quot;JDBC&quot;&gt;</span></span>
<span class="line"><span>				&lt;property name=&quot;&quot; value=&quot;&quot; /&gt;</span></span>
<span class="line"><span>			&lt;/transactionManager&gt;</span></span>
<span class="line"><span>			&lt;dataSource type=&quot;UNPOOLED&quot;&gt;</span></span>
<span class="line"><span>				&lt;property name=&quot;driver&quot; value=&quot;com.mysql.jdbc.Driver&quot; /&gt;</span></span>
<span class="line"><span>				&lt;property name=&quot;url&quot;</span></span>
<span class="line"><span>					value=&quot;jdbc:mysql://127.0.0.1:3306/my_ssm?useUnicode=true&amp;amp;characterEncoding=UTF-8&quot; /&gt;</span></span>
<span class="line"><span>				&lt;property name=&quot;username&quot; value=&quot;root&quot; /&gt;</span></span>
<span class="line"><span>				&lt;property name=&quot;password&quot; value=&quot;root&quot; /&gt;</span></span>
<span class="line"><span>			&lt;/dataSource&gt;</span></span>
<span class="line"><span>		&lt;/environment&gt;</span></span>
<span class="line"><span>	&lt;/environments&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;mappers&gt;</span></span>
<span class="line"><span>		&lt;mapper resource=&quot;com/amos/resources/ProductMapper.xml&quot; /&gt;</span></span>
<span class="line"><span>	&lt;/mappers&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/configuration&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简介：</p><p>&lt;<code>typeAliases</code>&gt; 为sql映射文件中的类型指定别名，在下边的mapper中能用到</p><p>&lt;<code>plugins</code>&gt; 插件</p><p>&lt;<code>environments</code>&gt; 连接数据库的一些配置</p><p>&lt;<code>mappers</code>&gt; 也就是下边要说的，所有的mapper都要在这里注册</p><hr><h2 id="_2-mapper-xml-productmapper-xml" tabindex="-1"><a class="header-anchor" href="#_2-mapper-xml-productmapper-xml"><span>2. *Mapper.xml --&gt; ProductMapper.xml</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span>&lt;!DOCTYPE mapper PUBLIC &quot;-//mybatis.org//DTD Mapper 3.0//EN&quot;</span></span>
<span class="line"><span>    &quot;http://mybatis.org/dtd/mybatis-3-mapper.dtd&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;mapper namespace=&quot;com.amos.dao.ProductDao&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;resultMap type=&quot;product&quot; id=&quot;ProductResult&quot;&gt;</span></span>
<span class="line"><span>		&lt;id column=&quot;ID&quot; jdbcType=&quot;INTEGER&quot; property=&quot;id&quot; /&gt;</span></span>
<span class="line"><span>		&lt;result column=&quot;NAME&quot; jdbcType=&quot;VARCHAR&quot; property=&quot;name&quot; /&gt;</span></span>
<span class="line"><span>		&lt;result column=&quot;DESCRIPTION&quot; jdbcType=&quot;VARCHAR&quot; property=&quot;description&quot; /&gt;</span></span>
<span class="line"><span>		&lt;result column=&quot;PRICE&quot; jdbcType=&quot;VARCHAR&quot; property=&quot;price&quot; /&gt;</span></span>
<span class="line"><span>	&lt;/resultMap&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;insert id=&quot;addOne&quot; parameterType=&quot;product&quot;&gt;</span></span>
<span class="line"><span>		INSERT INTO PRODUCT</span></span>
<span class="line"><span>		(NAME,DESCRIPTION,PRICE)</span></span>
<span class="line"><span>		VALUES(#{name},#{description},#{price})</span></span>
<span class="line"><span>	&lt;/insert&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;insert id=&quot;addBatch&quot; parameterType=&quot;java.util.List&quot;&gt;</span></span>
<span class="line"><span>		INSERT INTO PRODUCT (NAME,DESCRIPTION,PRICE) VALUES</span></span>
<span class="line"><span>		&lt;foreach collection=&quot;list&quot; item=&quot;product&quot; separator=&quot;,&quot;&gt;</span></span>
<span class="line"><span>			(#{product.name},#{product.description},</span></span>
<span class="line"><span>			#{product.price})</span></span>
<span class="line"><span>		&lt;/foreach&gt;</span></span>
<span class="line"><span>	&lt;/insert&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;delete id=&quot;deleteOne&quot; parameterType=&quot;int&quot;&gt;</span></span>
<span class="line"><span>		DELETE FROM</span></span>
<span class="line"><span>		PRODUCT WHERE</span></span>
<span class="line"><span>		ID=#{_parameter}</span></span>
<span class="line"><span>	&lt;/delete&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;delete id=&quot;deleteBatch&quot; parameterType=&quot;java.util.List&quot;&gt;</span></span>
<span class="line"><span>		DELETE FROM PRODUCT WHERE ID IN(</span></span>
<span class="line"><span>		&lt;foreach collection=&quot;list&quot; item=&quot;item&quot; separator=&quot;,&quot;&gt;</span></span>
<span class="line"><span>			#{item}</span></span>
<span class="line"><span>		&lt;/foreach&gt;</span></span>
<span class="line"><span>		)</span></span>
<span class="line"><span>	&lt;/delete&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;update id=&quot;updateProductById&quot; parameterType=&quot;product&quot;&gt;</span></span>
<span class="line"><span>		UPDATE PRODUCT</span></span>
<span class="line"><span>		&lt;set&gt;</span></span>
<span class="line"><span>			&lt;if test=&quot;name!=null and !&amp;quot;&amp;quot;.equals(name.trim())&quot;&gt;</span></span>
<span class="line"><span>				NAME=#{name},</span></span>
<span class="line"><span>			&lt;/if&gt;</span></span>
<span class="line"><span>			&lt;if test=&quot;description!=null and !&amp;quot;&amp;quot;.equals(description.trim())&quot;&gt;</span></span>
<span class="line"><span>				DESCRIPTION=#{description},</span></span>
<span class="line"><span>			&lt;/if&gt;</span></span>
<span class="line"><span>			&lt;if test=&quot;price!=null and !&amp;quot;&amp;quot;.equals(price.trim())&quot;&gt;</span></span>
<span class="line"><span>				PRICE=#{price},</span></span>
<span class="line"><span>			&lt;/if&gt;</span></span>
<span class="line"><span>		&lt;/set&gt;</span></span>
<span class="line"><span>		WHERE ID=#{id}</span></span>
<span class="line"><span>	&lt;/update&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;select id=&quot;getProductCount&quot; resultType=&quot;int&quot;&gt;</span></span>
<span class="line"><span>		SELECT count(*) FROM</span></span>
<span class="line"><span>		PRODUCT order by ID</span></span>
<span class="line"><span>	&lt;/select&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;select id=&quot;getProductById&quot; parameterType=&quot;int&quot; resultType=&quot;product&quot;&gt;</span></span>
<span class="line"><span>		SELECT</span></span>
<span class="line"><span>		ID,NAME,DESCRIPTION,PRICE FROM PRODUCT</span></span>
<span class="line"><span>		&lt;where&gt;ID=#{id}&lt;/where&gt;</span></span>
<span class="line"><span>	&lt;/select&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	&lt;select id=&quot;getProductAll&quot; resultMap=&quot;ProductResult&quot;&gt;</span></span>
<span class="line"><span>		SELECT</span></span>
<span class="line"><span>		ID,NAME,DESCRIPTION,PRICE FROM PRODUCT</span></span>
<span class="line"><span>	&lt;/select&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/mapper&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意resultMap与resultType，当是多条数据的时候用前者;</p><p>有参时用parameterType;</p><p>&lt;<code>resultMap</code>&gt; 这个是避免数据库表中字段与实体类字段不一样</p><p>&lt;<code>result</code> column=&quot;COMMAND&quot; jdbcType=&quot;VARCHAR&quot; property=&quot;command&quot; /&gt;<br> 每一个result对应一个实体的属性，也对应这数据库表中的一个属性</p><p>增删改查操作<br> &lt;<code>insert</code>&gt;增加，批量增加，或者单条<br> &lt;<code>select</code>&gt;查询，查询全部，或者单条<br> &lt;<code>update</code>&gt;更新，单条更新<br> &lt;<code>delete</code>&gt;删除，批量删除，或者单条<br> &lt;<code>where</code>&gt; 省略了where关键字，会自动删除多余的and<br> &lt;<code>set</code>&gt; 省略set关键字，会自动删除多余的&quot;,&quot;<br> &lt;<code>if</code> test=&quot;&quot;&gt; 这个里边写法类似于java中的写法<br> command!=null and !&quot;&quot;;.equals(command.trim())<br> &lt;<code>foreach</code> collection=&quot;list&quot; item=&quot;product&quot; separator=&quot;,&quot;&gt;</p><pre><code>collection：对应传递过来的参数list
item：对应list中的每一个单项，起的一个别名
separator：批量增加或者删除是增补&quot;,&quot;
</code></pre><hr><h2 id="_3-获取数据库连接-dbaccess-java" tabindex="-1"><a class="header-anchor" href="#_3-获取数据库连接-dbaccess-java"><span>3.获取数据库连接 DBAccess.java</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 使用MyBatis时获取数据库连接</span></span>
<span class="line"><span>public class DBAccess {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	public static SqlSession getSqlSession() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		SqlSession sqlSession = null;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		try {</span></span>
<span class="line"><span>			Reader reader = Resources.getResourceAsReader(&quot;com/amos/resources/Configuration.xml&quot;);</span></span>
<span class="line"><span>			SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>			// 通过SqlSessionFactory打开一个SqlSession</span></span>
<span class="line"><span>			sqlSession = sqlSessionFactory.openSession();</span></span>
<span class="line"><span>		} catch (IOException e) {</span></span>
<span class="line"><span>			System.out.println(&quot;创建SqlSession失败!&quot;);</span></span>
<span class="line"><span>			e.printStackTrace();</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		return sqlSession;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="log4j-打印日志-2017-5-20" tabindex="-1"><a class="header-anchor" href="#log4j-打印日志-2017-5-20"><span>log4j 打印日志（2017.5.20）</span></a></h1><hr><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>一、注意root，所有的日志</span></span>
<span class="line"><span>    log4j.rootLogger=DEBUG, stdout</span></span>
<span class="line"><span></span></span>
<span class="line"><span>二、输出日志样式</span></span>
<span class="line"><span>    log4j.appender.stdout.layout=org.apache.log4j.PatternLayout</span></span>
<span class="line"><span></span></span>
<span class="line"><span>三、输出日志自定义样式</span></span>
<span class="line"><span>    log4j.appender.stdout.layout.ConversionPattern=%d [%t] %-5p....... </span></span>
<span class="line"><span></span></span>
<span class="line"><span>四、DEBUG INFO WARN ERROR</span></span>
<span class="line"><span>    等级依次增高，越来越严格</span></span>
<span class="line"><span></span></span>
<span class="line"><span>五、%d [%t] %-5p [%c] - %m%n</span></span>
<span class="line"><span>   %d{HH:mm:ss} %-5p [%F\\:%L] -- %m%n</span></span>
<span class="line"><span></span></span>
<span class="line"><span>六、特殊包个性化日志（root范围太广，所以下边也就是自定义样式不影响原生自带样式）</span></span>
<span class="line"><span>log4j.logger.org.apache=INFO</span></span>
<span class="line"><span></span></span>
<span class="line"><span>七、Log4J采用类似C语言中的printf函数的打印格式格式化日志信息，打印参数如下：</span></span>
<span class="line"><span>    # [] - 这些符号会原样输出</span></span>
<span class="line"><span>    # %m 输出代码中指定的消息，也就是输出自定义的信息</span></span>
<span class="line"><span>    # %p 输出优先级，即DEBUG,INFO,WARN,ERROR,FATAL </span></span>
<span class="line"><span>    # %r 输出自应用启动到输出该log信息耗费的毫秒数 </span></span>
<span class="line"><span>    # %c 输出所属的类目,通常就是所在类的全名 </span></span>
<span class="line"><span>    # %t 输出产生该日志事件的线程名 </span></span>
<span class="line"><span>    # %n 输出一个回车换行符，Windows平台为“\\r\\n”，Unix平台为“\\n” </span></span>
<span class="line"><span>    # %d 输出日志时间点的日期或时间，默认格式为ISO8601，也可以在其后指定格式 </span></span>
<span class="line"><span>    #    如：%d{yyyy年MM月dd日 HH:mm:ss,SSS}，输出类似：2012年01月05日 22:10:28,921 </span></span>
<span class="line"><span>    # %l 输出日志事件的发生位置，包括类目名、发生的线程，以及在代码中的行数 </span></span>
<span class="line"><span>    #    如：Testlog.main(TestLog.java:10) </span></span>
<span class="line"><span>    # %F 输出日志消息产生时所在的文件名称 </span></span>
<span class="line"><span>    # %L 输出代码中的行号 </span></span>
<span class="line"><span>    # %x 输出和当前线程相关联的NDC(嵌套诊断环境),像java servlets多客户多线程的应用中 </span></span>
<span class="line"><span>    # %% 输出一个&quot;%&quot;字符 </span></span>
<span class="line"><span>    # </span></span>
<span class="line"><span>    # 可以在%与模式字符之间加上修饰符来控制其最小宽度、最大宽度、和文本的对齐方式。如： </span></span>
<span class="line"><span>    #  %5p: 输出category名称，最小宽度是5，category&lt;5，默认的情况下右对齐,左边会有空格</span></span>
<span class="line"><span>    #  %-5p:输出category名称，最小宽度是5，category&lt;5，&quot;-&quot;号指定左对齐,右边会有空格 </span></span>
<span class="line"><span>    #  %.5p:输出category名称，最大宽度是5，category&gt;5，就会将左边多出的字符截掉，&lt;5不会有空格 </span></span>
<span class="line"><span>    #  %20.30p:category名称&lt;20补空格，并且右对齐，&gt;30字符，就从左边交远销出的字符截掉 </span></span>
<span class="line"><span></span></span>
<span class="line"><span>八、简单输出：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # Global logging configuration</span></span>
<span class="line"><span>    log4j.rootLogger=DEBUG,out</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # Console output...</span></span>
<span class="line"><span>    log4j.appender.out=org.apache.log4j.ConsoleAppender</span></span>
<span class="line"><span>    log4j.appender.out.layout=org.apache.log4j.PatternLayout</span></span>
<span class="line"><span>    log4j.appender.out.layout.ConversionPattern=%d{HH:mm:ss} %-5p [%F\\:%L] -- %m%n</span></span>
<span class="line"><span>    log4j.logger.org.apache=INFO</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,30)]))}const c=n(t,[["render",l],["__file","mybatis.html.vue"]]),r=JSON.parse('{"path":"/java/mybatis/mybatis.html","title":"框架相关 mybatis","lang":"zh-CN","frontmatter":{"title":"框架相关 mybatis","date":"2019-01-01T00:00:00.000Z","category":["框架相关"],"tag":["mybatis"],"description":"MyBatis （2017.5.16） MyBatis 主要是处理数据的持久化操作的一个轻量级框架，相对于Hibernate而言。 实现数据持久化操作主要有两点： MyBatis 关键字 1. 底层配置文件 Configuration.xml 简介： <typeAliases> 为sql映射文件中的类型指定别名，在下边的mapper中能用到 <plug...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/java/mybatis/mybatis.html"}],["meta",{"property":"og:site_name","content":"JAVA技术学习笔记"}],["meta",{"property":"og:title","content":"框架相关 mybatis"}],["meta",{"property":"og:description","content":"MyBatis （2017.5.16） MyBatis 主要是处理数据的持久化操作的一个轻量级框架，相对于Hibernate而言。 实现数据持久化操作主要有两点： MyBatis 关键字 1. 底层配置文件 Configuration.xml 简介： <typeAliases> 为sql映射文件中的类型指定别名，在下边的mapper中能用到 <plug..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-04-16T07:46:05.000Z"}],["meta",{"property":"article:tag","content":"mybatis"}],["meta",{"property":"article:published_time","content":"2019-01-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2026-04-16T07:46:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"框架相关 mybatis\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-01-01T00:00:00.000Z\\",\\"dateModified\\":\\"2026-04-16T07:46:05.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Amos Wang\\",\\"url\\":\\"https://github.com/AmosWang0626\\"}]}"]]},"git":{"createdTime":1776317325000,"updatedTime":1776325565000,"contributors":[{"name":"dorian","username":"dorian","email":"daoyuan0626@gmail.com","commits":2,"url":"https://github.com/dorian"}]},"readingTime":{"minutes":4.59,"words":1377},"filePathRelative":"java/mybatis/mybatis.md","localizedDate":"2019年1月1日","excerpt":"\\n<blockquote>\\n<p>MyBatis 主要是处理数据的持久化操作的一个轻量级框架，相对于Hibernate而言。</p>\\n</blockquote>\\n<hr>\\n<h2>实现数据持久化操作主要有两点：</h2>\\n<pre><code>1. 底层配置文件\\n\\n2. *Mapper.xml\\n\\n3. Dao层接口 ***Dao.java\\n\\n4. Util类 DBAccess.java 向外部输出SQLSession\\n\\n5. 控制层\\n</code></pre>\\n<hr>\\n<h2>MyBatis 关键字</h2>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>\\",\\" \\"=\\" \\"?\\" \\"||\\" \\"or\\" \\"&amp;&amp;\\" \\"and\\" \\"|\\" \\"bor\\" \\"^\\" \\"xor\\" \\"&amp;\\" \\"band\\"</span></span>\\n<span class=\\"line\\"><span>\\"==\\" \\"eq\\" \\"!=\\" \\"neq\\" \\"&lt;\\" \\"lt\\"\\"&gt;\\" \\"gt\\" \\"&lt;=\\" \\"lte\\" \\"&gt;=\\" \\"gte\\" \\"in\\"</span></span>\\n<span class=\\"line\\"><span>\\"not\\" \\"&lt;&lt;\\" \\"shl\\" \\"&gt;&gt;\\" \\"shr\\" \\"&gt;&gt;&gt;\\" \\"ushr\\" \\"+\\" \\"-\\" \\"*\\" \\"/\\" \\"%\\" \\".\\"</span></span>\\n<span class=\\"line\\"><span>\\"(\\"\\"instanceof\\"  \\"[\\" \\"]\\" &lt;![CDATA[ &lt;= ]]&gt;</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{c as comp,r as data};
