# node_learn
Node.js 的单线程 非阻塞I/O 事件驱动
node适合处理数据密集型服务，不适合做cpu密集型服务，但是因为node单线程，无法利用多核多cpu，
所以那种计算量很大的任务他不擅长。node处理复杂计算会一直占着线程


## 非阻塞I/O（input/output）
进行I/O操作的时候异步执行，接受回调函数
#### libuv跨平台异步IO库

#### ？？child_process.fork()生成子进程。主进程是什么？？
#### ？？cluster模块允许共享套接字（sockets）,什么是套接字？？cluster模块是做什么的？？

## 事件驱动
```
const events = require('events');
const EventEmitter = new events.EventEmitter();

//发布-订阅
EventEmitter.on('toParent',function(data){
    console.log('接收到了这个发布事件')
    console.log(data)//'发送的数据'
})
setTimeout(function(){
    console.log('开始发布...')
    EventEmitter.emit('toParent','发送的数据')
},2000)

//事件驱动获取数据（异步）
const fs = require('fs');
const events = require('events')

const EventEmitter = new events.EventEmitter();
function getMine(){
    fs.readFile('mime.json',function(err,data){
        EventEmitter.emit('getmine',data)
    })
}
getMine();
EventEmitter.on('getmine',function(mimedata){
    console.log(mimedata)
})
```

## 时间循环机制

```
   ┌───────────────────────────┐
┌─>│           timers          │定时器：本阶段执行已经被 setTimeout() 和 setInterval() 的调度回调函数
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │待定回调：执行延迟到下一个循环迭代的 I/O 回调。
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │仅内部系统使用
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 
│  │           poll（轮询）    │<─────┤  connections, │setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │检测
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │关闭的回调函数
   └───────────────────────────┘
````
`
每个阶段都有一个 FIFO 队列来执行回调  

`


