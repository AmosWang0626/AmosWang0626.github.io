import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{e as a,h as n,o as t}from"./app-CTaHH0qe.js";const h={};function l(e,s){return t(),a("div",null,s[0]||(s[0]=[n(`<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h2><p>常用的 <code>Set</code> 实现类包括 <strong><code>HashSet</code></strong>、<strong><code>LinkedHashSet</code></strong> 和 <strong><code>TreeSet</code></strong>，它们基于不同的底层数据结构实现。</p><h2 id="一、hashset" tabindex="-1"><a class="header-anchor" href="#一、hashset"><span>一、HashSet</span></a></h2><h3 id="实现原理" tabindex="-1"><a class="header-anchor" href="#实现原理"><span><strong>实现原理</strong></span></a></h3><ul><li><strong>底层数据结构</strong>：基于 <code>HashMap</code> 实现，元素作为 <code>HashMap</code> 的键存储，值统一为 <code>PRESENT</code>（一个静态占位对象）。</li><li><strong>无序性</strong>：元素的存储和遍历顺序不固定。</li><li><strong>允许 <code>null</code></strong>：允许存储一个 <code>null</code> 元素。</li></ul><h3 id="源码核心" tabindex="-1"><a class="header-anchor" href="#源码核心"><span><strong>源码核心</strong></span></a></h3><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> HashSet</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">E</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> extends</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> AbstractSet</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">E</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> implements</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Set</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">E</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> transient</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> HashMap</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">E</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Object</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> map</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Object</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> PRESENT </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> Object</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> HashSet</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        map </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> HashMap</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;&gt;(); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 默认初始容量16，负载因子0.75</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> boolean</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> add</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">E</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> e</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        return</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> map</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">put</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(e, PRESENT) </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">; </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 直接调用HashMap的put方法</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> boolean</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> remove</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Object</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> o</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        return</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> map</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">remove</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(o) </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">==</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> PRESENT;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="特点" tabindex="-1"><a class="header-anchor" href="#特点"><span><strong>特点</strong></span></a></h3><ul><li><strong>时间复杂度</strong>：<code>add</code>、<code>remove</code>、<code>contains</code> 操作平均为 <strong>O(1)</strong>，最坏情况（哈希冲突严重）退化为 <strong>O(n)</strong>。</li><li><strong>适用场景</strong>：快速去重、无需顺序的场景。</li></ul><hr><h2 id="二、linkedhashset" tabindex="-1"><a class="header-anchor" href="#二、linkedhashset"><span>二、LinkedHashSet</span></a></h2><h3 id="实现原理-1" tabindex="-1"><a class="header-anchor" href="#实现原理-1"><span><strong>实现原理</strong></span></a></h3><ul><li><strong>底层数据结构</strong>：继承自 <code>HashSet</code>，但内部通过 <code>LinkedHashMap</code> 实现，维护了一个 <strong>双向链表</strong> 记录插入顺序或访问顺序。</li><li><strong>有序性</strong>：遍历顺序与插入顺序一致（或按访问顺序，需配置）。</li></ul><h3 id="源码核心-1" tabindex="-1"><a class="header-anchor" href="#源码核心-1"><span><strong>源码核心</strong></span></a></h3><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> LinkedHashSet</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">E</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> extends</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> HashSet</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">E</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> implements</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Set</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">E</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> LinkedHashSet</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">        super</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">16</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0.75f</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 调用HashSet的特定构造方法</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // HashSet中的构造方法（包私有）</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    HashSet</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> initialCapacity</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">float</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> loadFactor</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">boolean</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> dummy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        map </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> LinkedHashMap</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;&gt;(initialCapacity, loadFactor);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="特点-1" tabindex="-1"><a class="header-anchor" href="#特点-1"><span><strong>特点</strong></span></a></h3><ul><li><strong>时间复杂度</strong>：与 <code>HashSet</code> 相同（双向链表仅增加少量指针维护开销）。</li><li><strong>适用场景</strong>：需要维护插入/访问顺序的去重集合（如 LRU 缓存）。</li></ul><hr><h2 id="三、treeset" tabindex="-1"><a class="header-anchor" href="#三、treeset"><span>三、TreeSet</span></a></h2><h3 id="实现原理-2" tabindex="-1"><a class="header-anchor" href="#实现原理-2"><span><strong>实现原理</strong></span></a></h3><ul><li><strong>底层数据结构</strong>：基于 <code>TreeMap</code> 实现，元素作为 <code>TreeMap</code> 的键存储，值统一为 <code>PRESENT</code>。</li><li><strong>有序性</strong>：元素按自然顺序或自定义 <code>Comparator</code> 排序。</li><li><strong>搜索能力</strong>：实现了 <code>NavigableSet</code> 接口，提供了较多搜索相关的API，例如查找最接近某个元素的元素、获取子集、逆序遍历等。</li></ul><h3 id="源码核心-2" tabindex="-1"><a class="header-anchor" href="#源码核心-2"><span><strong>源码核心</strong></span></a></h3><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> TreeSet</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">E</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> extends</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> AbstractSet</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">E</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> implements</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> NavigableSet</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">E</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> transient</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> NavigableMap</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">E</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Object</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> map</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    private</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> final</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Object</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> PRESENT </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> Object</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> TreeSet</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        map </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> TreeMap</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;&gt;(); </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 默认自然排序</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> boolean</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> add</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">E</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> e</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        return</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> map</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">put</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(e, PRESENT) </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">; </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// 调用TreeMap的put方法</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="特点-2" tabindex="-1"><a class="header-anchor" href="#特点-2"><span><strong>特点</strong></span></a></h3><ul><li><strong>时间复杂度</strong>：<code>add</code>、<code>remove</code>、<code>contains</code> 操作均为 <strong>O(log n)</strong>（红黑树高度平衡）。</li><li><strong>允许 <code>null</code></strong>：仅在未设置 <code>Comparator</code> 且自然排序支持时允许 <code>null</code>。</li><li><strong>适用场景</strong>：需要有序或范围查询（如 <code>subSet()</code>, <code>headSet()</code>）的去重集合。</li></ul><hr><h2 id="四、对比总结" tabindex="-1"><a class="header-anchor" href="#四、对比总结"><span>四、对比总结</span></a></h2><table><thead><tr><th><strong>特性</strong></th><th><strong>HashSet</strong></th><th><strong>LinkedHashSet</strong></th><th><strong>TreeSet</strong></th></tr></thead><tbody><tr><td><strong>底层数据结构</strong></td><td>HashMap</td><td>LinkedHashMap</td><td>TreeMap（红黑树）</td></tr><tr><td><strong>元素顺序</strong></td><td>无序</td><td>插入/访问顺序</td><td>自然排序或自定义排序</td></tr><tr><td><strong>允许 <code>null</code></strong></td><td>是（1个）</td><td>是（1个）</td><td>取决于 Comparator</td></tr><tr><td><strong>时间复杂度</strong></td><td>O(1) 平均</td><td>O(1) 平均</td><td>O(log n)</td></tr><tr><td><strong>线程安全</strong></td><td>否</td><td>否</td><td>否</td></tr><tr><td><strong>适用场景</strong></td><td>快速去重</td><td>维护插入/访问顺序</td><td>有序集合、范围查询</td></tr></tbody></table><hr><h2 id="五、源码设计关键点" tabindex="-1"><a class="header-anchor" href="#五、源码设计关键点"><span>五、源码设计关键点</span></a></h2><ol><li><p><strong>代码复用</strong><br><code>HashSet</code> 和 <code>LinkedHashSet</code> 通过复用 <code>HashMap</code> 和 <code>LinkedHashMap</code> 的代码，减少冗余逻辑。例如：</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// HashSet的add方法直接委托给HashMap</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> boolean</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> add</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">E</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> e) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> map</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">put</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(e, PRESENT)</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> ==</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>排序机制</strong><br><code>TreeSet</code> 依赖 <code>TreeMap</code> 的红黑树排序，通过 <code>Comparator</code> 或 <code>Comparable</code> 接口实现元素比较：</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">// TreeMap的put方法内部比较逻辑</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Comparator</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD;">?</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> super</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> K</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> cpr </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> comparator</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">if</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> (cpr </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">!=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">) {</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    do</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">        parent </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> t</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">        cmp </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> cpr</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">compare</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(key, </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">t</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">key</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">        // ...</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">    } </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">while</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> (t </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">!=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> null</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><strong>双向链表维护（LinkedHashSet）</strong><br><code>LinkedHashMap</code> 通过 <code>Entry</code> 类扩展 <code>HashMap.Node</code>，添加 <code>before</code> 和 <code>after</code> 指针维护顺序：</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">static</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Entry</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">K</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">V</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> extends</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> HashMap</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Node</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">K</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">V</span><span style="--shiki-light:#C18401;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">    Entry</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">K</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">V</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> before</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> after</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    Entry</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> hash</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">K</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> key</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">V</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> value</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Node</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">K</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">V</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; </span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">next</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">        super</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(hash, key, value, next);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><hr><h2 id="六、选择建议" tabindex="-1"><a class="header-anchor" href="#六、选择建议"><span>六、选择建议</span></a></h2><ul><li><strong>需要快速查找且不关心顺序</strong> → <strong><code>HashSet</code></strong>。</li><li><strong>需要维护插入/访问顺序</strong> → <strong><code>LinkedHashSet</code></strong>。</li><li><strong>需要元素有序或范围查询</strong> → <strong><code>TreeSet</code></strong>。</li><li><strong>线程安全需求</strong> → 使用 <code>Collections.synchronizedSet()</code> 包装或并发集合（如 <code>ConcurrentSkipListSet</code>）。</li></ul>`,34)]))}const d=i(h,[["render",l],["__file","08-Set.html.vue"]]),r=JSON.parse('{"path":"/java/jdk_base/08-Set.html","title":"Set相关源码解析","lang":"zh-CN","frontmatter":{"title":"Set相关源码解析","index":true,"icon":"laptop-code","date":"2025-03-16T00:00:00.000Z","category":["JDK基础源码"],"order":8,"description":"概述 常用的 Set 实现类包括 HashSet、LinkedHashSet 和 TreeSet，它们基于不同的底层数据结构实现。 一、HashSet 实现原理 底层数据结构：基于 HashMap 实现，元素作为 HashMap 的键存储，值统一为 PRESENT（一个静态占位对象）。 无序性：元素的存储和遍历顺序不固定。 允许 null：允许存储一个...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/java/jdk_base/08-Set.html"}],["meta",{"property":"og:site_name","content":"JAVA技术学习笔记"}],["meta",{"property":"og:title","content":"Set相关源码解析"}],["meta",{"property":"og:description","content":"概述 常用的 Set 实现类包括 HashSet、LinkedHashSet 和 TreeSet，它们基于不同的底层数据结构实现。 一、HashSet 实现原理 底层数据结构：基于 HashMap 实现，元素作为 HashMap 的键存储，值统一为 PRESENT（一个静态占位对象）。 无序性：元素的存储和遍历顺序不固定。 允许 null：允许存储一个..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-16T14:41:54.000Z"}],["meta",{"property":"article:published_time","content":"2025-03-16T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-16T14:41:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Set相关源码解析\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2025-03-16T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-16T14:41:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Amos Wang\\",\\"url\\":\\"https://github.com/AmosWang0626\\"}]}"]]},"git":{"createdTime":1742136114000,"updatedTime":1742136114000,"contributors":[{"name":"amos.wang","username":"amos.wang","email":"1833063210@qq.com","commits":1,"url":"https://github.com/amos.wang"}]},"readingTime":{"minutes":3.24,"words":973},"filePathRelative":"java/jdk_base/08-Set.md","localizedDate":"2025年3月16日","excerpt":"<h2>概述</h2>\\n<p>常用的 <code>Set</code> 实现类包括 <strong><code>HashSet</code></strong>、<strong><code>LinkedHashSet</code></strong> 和 <strong><code>TreeSet</code></strong>，它们基于不同的底层数据结构实现。</p>\\n<h2>一、HashSet</h2>\\n<h3><strong>实现原理</strong></h3>\\n<ul>\\n<li><strong>底层数据结构</strong>：基于 <code>HashMap</code> 实现，元素作为 <code>HashMap</code> 的键存储，值统一为 <code>PRESENT</code>（一个静态占位对象）。</li>\\n<li><strong>无序性</strong>：元素的存储和遍历顺序不固定。</li>\\n<li><strong>允许 <code>null</code></strong>：允许存储一个 <code>null</code> 元素。</li>\\n</ul>","autoDesc":true}');export{d as comp,r as data};
