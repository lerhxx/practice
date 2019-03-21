# 访问 Store

React Redux 为组件调度 action 和订阅 store 数据更新提供了 API。

其中，React Redux 抽象了 store 的使用细节，具体了 store 的交互处理。通常，你的组件不需要关心这些细节，也不需要直接引用 store。默认下， React Redux 内部对 store 和 state 传递到 connected 组件的过程进行了处理。

然而，可能有时候你需要自定义 store 和 state 如何传递到 connected 组件，或者直接访问 store。这里有些例子。

## 理解 context 的用法

React Redux 内部使用了 React 的 “context” 特性，使得 Redux store 能够深度嵌套到 connected 组件。在 React Redux v6 中，有个默认的、由 React.createContext() 生成的 context 对象实例，称为 ReactReduxContext。

React Redux 的 Provider 组件利用 ReactReduxContext.Provider 将 Redux store 和当前的 store state 存储到 context，connect 利用 ReactReduxContext.Consumer 读取、更新这些值。

## 提供自定义 Context

你可以使用自定义的 context 替代 React Redux 默认的 context。

```
<Provider context={myContext} store={store} >
  <App />
</Provider>
```


如果你提供了自定义的 context，React Redux 会使用这个自定义的 context 替代原有的 context。

一旦你在 <Provider /> 中提供 context，你需要为所有的，希望使用同一 store 的 connected 组件提供这个 context。

```
// 你可以将 context 作为 option 传递给 connect
export default connect(
  mapState,
  mapDispatch,
  null,
  {context: MyContext}
)(MyComponent);

// 或者，正常调用 connect
const ConnectedComponent = connect(
  mapStore,
  mapDispatch
)(MyComponent);

// 最后，将自定义的 context 作为 prop 传递给 connected 组件
<ConnectedComponent context={MyContext} />
```

当在 context 中找不到 store 时会发生下面的运行时错误。例如：

- 你向 <Provider /> 提供了自定义的 context，而没有为 connected 组件提供相同的实例（或者根本没有提供）。

- 你向 connected 组件提供了自定义的 context，而没有为 <Provider /> 提供相同的实例（或者根本没有提供）。

```
Invariant Violation

Could not find "store" in the context of "Connect(MyComponent)". Either wrap the root component in a <Provider>, or pass a custom React context provider to <Provider> and the corresponding React context consumer to Connect(Todo) in connect options.
```

## 多个 store

Redux 是设计为单一 store 的。然而，如果你不得不需要使用多个 store，使用 v6 你可以通过提供多个自定义 context 达到目的。不同的 context 为 store 提供了自然隔离的环境。

```
const ContextA = React.createContext();
const ContextB = React.createContext();

// 假设 reducerA 和 reducerB 都是适当的 reducer 方法
const storeA = createStore(reducerA);
const storeB = createStore(reducerB);

// 为 Provider 提供 context
function App() {
  return (
    <Provider store={storeA} context={ContextA} >
      <Provider store={storeB} context={ContextB} >
        <RootModule />
      </Provider>
    </Provider>
  ) ;
}

// 在 connected 组件中使用相应的 store
// 你需要使用对应的 context
connect(mapStateA, null, null, { context: ContextA })(MyComponentA)

// 也可以直接向 connected 组件传递备用的 context
<ConnectedMyComponentA context={ContextA} />

// 可以链式使用 connect()
// 这里 MyComponent 将会接收包含这些 store 的 props
compose(
  connect(mapStateA, null, null, { context: ContextA }),
  connect(mapStateB, null, null, { context: ContextB })
)(MyComponent);
```

## 直接使用 ReactReduxContext


在极少例子中，你可能需要在组件中直接访问 Redux store。你可以在适当的 context 的消费者中跳过 context 访问 store 里的值。

```
import { ReactReduxContext } from 'react-redux'

function MyConnectedComponent() {
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        ...
      }}
    </ReactReduxContext.Consumer>
  )
}