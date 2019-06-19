# 基于 taro 的组件

## wrapper

为添加组件 isHide 内部变量，用于判断组件是否已卸载、被隐藏，是则不进行某些会占用前台性能的操作。

## utils

### throttle.ts

函数节流，覆盖 Taro 的路由 API，防止页面短时间多次出入栈。


### request.ts

请求封装。

### navigation.ts

防止页面栈溢出。

#### APP 中只存在两个页面互跳

只判断对当前页（current）和上一页（prev)，与目标页（target）进行对比。如果 current === target，重定向；如果 prev === target，回退。target 在页面栈其他位置也存在，考虑到返回时会导致部分页面丢失，暂时只判断 current 和 prev。

#### APP 中只存在两个以上页面互跳

把 prev === target 改为遍历页面栈与 target 对比，再回退即可。

