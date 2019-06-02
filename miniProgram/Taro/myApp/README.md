# 基于 taro 的组件

## wrapper

为添加组件 isHide 内部变量，用于判断组件是否已卸载、被隐藏，是则不进行某些会占用前台性能的操作。

## utils

throttle.ts: 函数节流，覆盖 Taro 的路由 API，防止页面短时间多次出入栈。
request.ts: 请求封装。