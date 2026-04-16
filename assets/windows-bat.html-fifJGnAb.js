import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{e as a,f as e,o as i}from"./app-BCtReGRE.js";const l={};function p(d,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h2 id="去除文件夹名中的前缀" tabindex="-1"><a class="header-anchor" href="#去除文件夹名中的前缀"><span>去除文件夹名中的前缀</span></a></h2><blockquote><p>去除文件夹名字的<code>【价值千万XXX】</code>前缀</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Echo Off&amp;SetLocal ENABLEDELAYEDEXPANSION</span></span>
<span class="line"><span>FOR /f &quot;tokens=*&quot; %%i in (&#39;dir /a:d /b&#39;) do (</span></span>
<span class="line"><span>　　set &quot;name=%%i&quot;</span></span>
<span class="line"><span>　　set &quot;name=!name:【价值千万XXX】=!&quot;</span></span>
<span class="line"><span>　　ren &quot;%%i&quot; &quot;!name!&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>exit</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="去除文件名中的前缀" tabindex="-1"><a class="header-anchor" href="#去除文件名中的前缀"><span>去除文件名中的前缀</span></a></h2><blockquote><p>去除文件名<code>【价值千万XXX】</code>前缀</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Echo Off&amp;SetLocal ENABLEDELAYEDEXPANSION</span></span>
<span class="line"><span>FOR %%a in (*) do (</span></span>
<span class="line"><span>　　set &quot;name=%%a&quot;</span></span>
<span class="line"><span>　　set &quot;name=!name:【价值千万XXX】=!&quot;</span></span>
<span class="line"><span>　　ren &quot;%%a&quot; &quot;!name!&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>exit</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="去除文件名中的左右括号" tabindex="-1"><a class="header-anchor" href="#去除文件名中的左右括号"><span>去除文件名中的左右括号</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Echo Off&amp;SetLocal ENABLEDELAYEDEXPANSION</span></span>
<span class="line"><span>FOR %%a in (*) do (</span></span>
<span class="line"><span>　　set &quot;name=%%a&quot;</span></span>
<span class="line"><span>　　set &quot;name=!name:(=!&quot;</span></span>
<span class="line"><span>　　set &quot;name=!name:)=!&quot;</span></span>
<span class="line"><span>　　ren &quot;%%a&quot; &quot;!name!&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>exit</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="批处理命令详解" tabindex="-1"><a class="header-anchor" href="#批处理命令详解"><span>批处理命令详解</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Echo Off&amp;SetLocal ENABLEDELAYEDEXPANSION</span></span>
<span class="line"><span>::关闭回显,设置变量延迟</span></span>
<span class="line"><span>FOR %%a in (*) do (</span></span>
<span class="line"><span>::获取文件名</span></span>
<span class="line"><span>    set &quot;name=%%a&quot;</span></span>
<span class="line"><span>    ::把获取到的文件名赋值给 变量 name</span></span>
<span class="line"><span>    set &quot;name=!name: (=!&quot;</span></span>
<span class="line"><span>    ::使用 SET 命令的变量替换功能 把name中的 ( 替换为空,即 !name: (=!&quot;</span></span>
<span class="line"><span>    set &quot;name=!name:)=!&quot;</span></span>
<span class="line"><span>    ::同上一条命令类似</span></span>
<span class="line"><span>    ren &quot;%%a&quot; &quot;!name!&quot;</span></span>
<span class="line"><span>    ::把 刚才获取到的文件名修改为 set 命令替换后的文件名.</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>EXIT</span></span>
<span class="line"><span>::主要是使用 set 命令的变量替换功能. 修改一下就很好理解了:</span></span>
<span class="line"><span>set &quot;name=!name: (=左括号!&quot;</span></span>
<span class="line"><span>set &quot;name=!name:)=右括号!&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项"><span>注意事项</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>其中，感叹号其实就是变量百分号（%）的强化版。</span></span>
<span class="line"><span>之所以要用！而不用%，是因为在for循环中，当一个变量被多次赋值时，</span></span>
<span class="line"><span>%dd%所获取的仅仅是dd第一次被赋予的值；</span></span>
<span class="line"><span>要想刷新dd的值，</span></span>
<span class="line"><span>就必须首先通过命令&quot;setlocal enabledelayedexpansion&quot;来开启延迟变量开关，</span></span>
<span class="line"><span>然后用！dd！来获取dd的值。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>http://ttwang.iteye.com/blog/2017672</span></span>
<span class="line"><span>@echo off</span></span>
<span class="line"><span>关闭回显</span></span>
<span class="line"><span>@echo on</span></span>
<span class="line"><span>打开回显</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>如果字符串中有&amp;符号，可以使用 set c=&quot;abc&amp;def&quot; ，但是引号会带入变量，如果不想引号被带入变量就要使用 set &quot;c=abc^&amp;def&quot;。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set &quot;c=abc&amp;def&quot; ---- 错误</span></span>
<span class="line"><span>set c=abc&amp;def   ---- 错误</span></span>
<span class="line"><span>set c=abc^&amp;def  ---- 错误</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set c=&quot;abc&amp;def&quot; ---- 输出结果：&quot;abc&amp;def&quot;</span></span>
<span class="line"><span>set &quot;c=abc^&amp;def&quot; --- 输出结果：abc&amp;def</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="合并多个ts文件" tabindex="-1"><a class="header-anchor" href="#合并多个ts文件"><span>合并多个ts文件</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@echo off</span></span>
<span class="line"><span>:: 开启延迟变量</span></span>
<span class="line"><span>setlocal EnableDelayedExpansion</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:: 最终生成的文件名称（使用注意1）</span></span>
<span class="line"><span>set generate_file=amos.ts</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:: =======================</span></span>
<span class="line"><span>:: == 生成的文件默认在当前文件夹下 ==</span></span>
<span class="line"><span>:: =======================</span></span>
<span class="line"><span>:: 最终生成的文件全路径</span></span>
<span class="line"><span>:: %~dp0 表示当前文件夹</span></span>
<span class="line"><span>set generate_file_full_path=%~dp0%generate_file%</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:: 要合并文件数量（/a 表示数字）</span></span>
<span class="line"><span>set /a merge_count=0</span></span>
<span class="line"><span>:: 要合并的文件的前缀（使用注意2）</span></span>
<span class="line"><span>set old_file_prefix=a</span></span>
<span class="line"><span>:: 要合并的文件的后缀（使用注意3）</span></span>
<span class="line"><span>set old_file_suffix=.ts</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:: 文件已存在就删除</span></span>
<span class="line"><span>if exist %generate_file% del /f /q %generate_file%</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:: 遍历符合格式的文件</span></span>
<span class="line"><span>for /r %%i in (*.ts) do (</span></span>
<span class="line"><span>    set /a merge_count += 1</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:: 初始化空文件</span></span>
<span class="line"><span>cd &gt; %generate_file%</span></span>
<span class="line"><span>echo 开始合并文件······</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:: for 循环遍历所有文件</span></span>
<span class="line"><span>for /l %%i in (1, 1, %merge_count%) do (</span></span>
<span class="line"><span>    set &quot;temp_file_path=%~dp0%old_file_prefix%%%i%old_file_suffix%&quot;</span></span>
<span class="line"><span>    :: 拼接文件 copy generate_file + 当前遍历的file generate_file</span></span>
<span class="line"><span>    copy /b %generate_file_full_path% + !temp_file_path! %generate_file_full_path%</span></span>
<span class="line"><span>    if &quot;%%i&quot; neq &quot;%~f0&quot; echo =========================</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:: 结束语</span></span>
<span class="line"><span>echo 合并文件完成!</span></span>
<span class="line"><span>pause</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14)]))}const r=n(l,[["render",p],["__file","windows-bat.html.vue"]]),o=JSON.parse(`{"path":"/devops/windows/windows-bat.html","title":"系统相关 Windows 脚本","lang":"zh-CN","frontmatter":{"title":"系统相关 Windows 脚本","date":"2019-01-01T00:00:00.000Z","category":["系统相关"],"tag":["系统相关"],"description":"去除文件夹名中的前缀 去除文件夹名字的【价值千万XXX】前缀 去除文件名中的前缀 去除文件名【价值千万XXX】前缀 去除文件名中的左右括号 批处理命令详解 注意事项 合并多个ts文件","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/devops/windows/windows-bat.html"}],["meta",{"property":"og:site_name","content":"JAVA技术学习笔记"}],["meta",{"property":"og:title","content":"系统相关 Windows 脚本"}],["meta",{"property":"og:description","content":"去除文件夹名中的前缀 去除文件夹名字的【价值千万XXX】前缀 去除文件名中的前缀 去除文件名【价值千万XXX】前缀 去除文件名中的左右括号 批处理命令详解 注意事项 合并多个ts文件"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-04-16T05:28:45.000Z"}],["meta",{"property":"article:tag","content":"系统相关"}],["meta",{"property":"article:published_time","content":"2019-01-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2026-04-16T05:28:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"系统相关 Windows 脚本\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-01-01T00:00:00.000Z\\",\\"dateModified\\":\\"2026-04-16T05:28:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Amos Wang\\",\\"url\\":\\"https://github.com/AmosWang0626\\"}]}"]]},"git":{"createdTime":1776317325000,"updatedTime":1776317325000,"contributors":[{"name":"dorian","username":"dorian","email":"daoyuan0626@gmail.com","commits":1,"url":"https://github.com/dorian"}]},"readingTime":{"minutes":2.42,"words":727},"filePathRelative":"devops/windows/windows-bat.md","localizedDate":"2019年1月1日","excerpt":"<h2>去除文件夹名中的前缀</h2>\\n<blockquote>\\n<p>去除文件夹名字的<code>【价值千万XXX】</code>前缀</p>\\n</blockquote>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>@Echo Off&amp;SetLocal ENABLEDELAYEDEXPANSION</span></span>\\n<span class=\\"line\\"><span>FOR /f \\"tokens=*\\" %%i in ('dir /a:d /b') do (</span></span>\\n<span class=\\"line\\"><span>　　set \\"name=%%i\\"</span></span>\\n<span class=\\"line\\"><span>　　set \\"name=!name:【价值千万XXX】=!\\"</span></span>\\n<span class=\\"line\\"><span>　　ren \\"%%i\\" \\"!name!\\"</span></span>\\n<span class=\\"line\\"><span>)</span></span>\\n<span class=\\"line\\"><span>exit</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{r as comp,o as data};
