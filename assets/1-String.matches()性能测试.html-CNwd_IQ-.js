import{_ as s,c as a,b as t,o as p}from"./app-DX-8M_Q1.js";const e={};function c(o,n){return p(),a("div",null,n[0]||(n[0]=[t(`<h1 id="string-matches-性能测试" tabindex="-1"><a class="header-anchor" href="#string-matches-性能测试"><span>String.matches() 性能测试</span></a></h1><blockquote><p>测试机：Mac Pro 16GB 2667 MHz DDR4; 2.6GHz 六核Intel Core i7</p></blockquote><ul><li>String.matches(&quot;[0-9]+&quot;) 1亿次 19880毫秒</li><li>Pattern.compile(&quot;[0-9]+&quot;).matcher(&quot;[0-9]+&quot;).matches() 1亿次 4390毫秒</li></ul><p>结论：String.matches() 的性能远不如正常的正则表达式。</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token annotation punctuation">@Test</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">isNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token class-name">String</span> keyword <span class="token operator">=</span> <span class="token string">&quot;1223323&quot;</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">final</span> <span class="token keyword">long</span> startTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100000000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">isNumber</span><span class="token punctuation">(</span>keyword<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;耗时: &quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> startTime<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>keyword <span class="token operator">+</span> <span class="token string">&quot; 是纯数字: &quot;</span> <span class="token operator">+</span> <span class="token function">isNumber</span><span class="token punctuation">(</span>keyword<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token doc-comment comment">/**</span>
<span class="line">     * 纯数字(正整数)</span>
<span class="line">     */</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Pattern</span> <span class="token constant">POSITIVE_NUMBER</span> <span class="token operator">=</span> <span class="token class-name">Pattern</span><span class="token punctuation">.</span><span class="token function">compile</span><span class="token punctuation">(</span><span class="token string">&quot;[0-9]+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> <span class="token function">isNumber</span><span class="token punctuation">(</span><span class="token class-name">String</span> keyword<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">isNull</span><span class="token punctuation">(</span>keyword<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        <span class="token comment">// 就换这两行代码测试</span></span>
<span class="line"><span class="token comment">//        return POSITIVE_NUMBER.matcher(&quot;[0-9]+&quot;).matches();</span></span>
<span class="line">        <span class="token keyword">return</span> keyword<span class="token punctuation">.</span><span class="token function">matches</span><span class="token punctuation">(</span><span class="token string">&quot;[0-9]+&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5)]))}const i=s(e,[["render",c],["__file","1-String.matches()性能测试.html.vue"]]),u=JSON.parse('{"path":"/backend/java/base/1-String.matches()%E6%80%A7%E8%83%BD%E6%B5%8B%E8%AF%95.html","title":"String.matches() 性能测试","lang":"zh-CN","frontmatter":{"title":"String.matches() 性能测试","date":"2022-05-02T00:00:00.000Z","categories":"Java"},"headers":[],"git":{"updatedTime":1739460467000,"contributors":[{"name":"amos.wang","username":"amos.wang","email":"1833063210@qq.com","commits":1,"url":"https://github.com/amos.wang"}]},"filePathRelative":"backend/java/base/1-String.matches()性能测试.md"}');export{i as comp,u as data};
