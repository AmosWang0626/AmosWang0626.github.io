---
title: Hexo挂掉自动重启
icon: object-group
date: 2020-11-17
categories: 前端相关
tags:
- Node.js
---

使用hexo时，hexo进程总会无辜挂掉（可能是服务器内存不够），所以就需要一个能监控hexo挂掉，就自动重启的小工具。

`npm install pm2 -g`

## 1. pm2介绍

[https://github.com/Unitech/pm2](https://github.com/Unitech/pm2)

具有内置负载均衡的的Node.js应用进程管理器。

### 新增

```sh
pm2 start --name hexo /opt/hexo/auto-start-hexo.js
```

### 删除

```sh
$ delete|del <name|id|namespace|script|all|json|stdin...>
```

### 查询

```sh
$ pm2 list|ls|l|ps|status
$ pm2 logs
$ pm2 monit
$ pm2 describe <id|app_name>

$ pm2 stop     <app_name|namespace|id|'all'|json_conf>
$ pm2 restart  <app_name|namespace|id|'all'|json_conf>
$ pm2 delete   <app_name|namespace|id|'all'|json_conf>
```

## 2. 自动启动hexo脚本

```javascript
var exec = require('child_process').exec;
var cmd = 'cd /opt/hexo/hexoui && nohup hexo s &';

exec(cmd, function(error, stdout, stderr) {

  if(stdout){
      console.log('stdout: ' + stdout);
  }
  if(stderr){
      console.log('stderr: ' + stderr);
  }

  if(error) {
    console.info('start error!', error);
    process.exit(0);
  } else {
    console.info('start hexo-js success!')
    // process.exit(0);
  }
});
```

## 3. 用 pm2 执行如上脚本
> 找不到 pm2 命令？进入 node 安装目录下的 bin 目录

`pm2 start /app/hexo/hexo-auto.js`

`pm2 logs`

`pm2 list`