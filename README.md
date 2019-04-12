# connect()

## Overview

## 回顾

The connect() function connects a React component to a Redux store.

connect() 函数用于连接 React 组件和 Redux store。

It provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store.

它为连接的组件提供所需的 store 数据，以及能够调度 action 的函数。

It does not modify the component class passed to it; instead, it returns a new, connected component class that wraps the component you passed in.

它不会改变所传递的组件类，而是返回一个新的，经过封装后的已连接组件类。

```
function connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)
```

The mapStateToProps and mapDispatchToProps deals with your Redux store’s state and dispatch, respectively. state and dispatch will be supplied to your mapStateToProps or mapDispatchToProps functions as the first argument.

mapStateToProps 和 mapDispatchToProps 分别处理 Redux store 中的 state 和 dispatch。state 和 dispatch 将作为第一个参数分别提供给 mapStateToProps 和 mapDispatchToProps 函数.

The returns of mapStateToProps and mapDispatchToProps are referred to internally as stateProps and dispatchProps, respectively. They will be supplied to mergeProps, if defined, as the first and the second argument, where the third argument will be ownProps. The combined result, commonly referred to as mergedProps, will then be supplied to your connected component.

mapStateToProps 和 mapDispatchToProps 的返回值在组件内部分别作为 stateProps 和 dispatchProps。如果有定义 mergeProps，这两个返回值将会作为该方法的第一和第二参数，ownProps 为第三参数。该函数最终得到 mergedProps，并提供给所连接的组件。

## connect() Parameters

## connect() 参数

connect accepts four different parameters, all optional. By convention, they are called:

connect 接受四个可选参数。通常称为：

- mapStateToProps?: Function
- mapDispatchToProps?: Function | Object
- mergeProps?: Function
- options?: Object

## mapStateToProps?: (state, ownProps?) => Object

If a mapStateToProps function is specified, the new wrapper component will subscribe to Redux store updates. This means that any time the store is updated, mapStateToProps will be called. The results of mapStateToProps must be a plain object, which will be merged into the wrapped component’s props. If you don't want to subscribe to store updates, pass null or undefined in place of mapStateToProps.

如果指定了 mapStateToProps 函数，封装后的组件将会订阅 Redux store 的更新。这意味着 store 每次更新，mapStateToProps 都会被调用。mapStateToProps 的返回值将会合并到组件的 props 属性中，因此必须为纯对象。在 mapStateToProps 的位置上传递 null 或 undefined 将不会订阅 store的更新。

### Parameters

### 参数

- state: Object
- ownProps?: Object

A mapStateToProps function takes a maximum of two parameters. The number of declared function parameters (a.k.a. arity) affects when it will be called. This also determines whether the function will receive ownProps. See notes here.

一个 mapStateToProps 函数最多需要两个参数。声明函数的参数个数将影响到它合适被调用。这也决定了函数是否接收到 ownProps 参数。

#### state

If your mapStateToProps function is declared as taking one parameter, it will be called whenever the store state changes, and given the store state as the only parameter.

如果声明的 mapStateToProps 函数中只带有一个参数，store stote 每次改变都会调用它，并且该函数只会有 store state 唯一参数。

```
const mapStateToProps = state => ({ todos: state.todos })
```

#### ownProps

If your mapStateToProps function is declared as taking two parameters, it will be called whenever the store state changes or when the wrapper component receives new props (based on shallow equality comparisons). It will be given the store state as the first parameter, and the wrapper component's props as the second parameter.

如果声明的 mapStateProps 函数带有两个参数，当 store state 有变化或者封装组件接收到新的 props（ 浅比较 ）时都会被调用。store state 将作为第一个参数，封装组件的 props 作为第二个参数。

The second parameter is normally referred to as ownProps by convention.

第二个参数通常称为 ownProps。

```
const mapStateToProps = (state, ownProps) => ({
  todo: state.todos[ownProps.id]
})
```

#### Returns

#### 返回值

Your mapStateToProps functions are expected to return an object. This object, normally referred to as stateProps, will be merged as props to your connected component. If you define mergeProps, it will be supplied as the first parameter to mergeProps.

mapStatetoProps 应返回一个对象。该对象称为 stateProps，将会被合并到所连接组件的 props 中。如果定义了 mergeProps，它将作为 merProps 的第一个参数。

The return of the mapStateToProps determine whether the connected component will re-render (details here).

mapStateToProps 的返回值决定了所连接的组件何时会别重新渲染。

For more details on recommended usage of mapStateToProps, please refer to our guide on using mapStateToProps.

```
You may define mapStateToProps and mapDispatchToProps as a factory function, i.e., you return a function instead of an object. In this case your returned function will be treated as the real mapStateToProps or mapDispatchToProps, and be called in subsequent calls. You may see notes on Factory Functions or our guide on performance optimizations.

可能你将 mapStateToProps 和 mapDispatchToProps 定义为工厂函数。例如，你返回的是一个函数而不是对象。这种情况下，返回的函数将会被视为真正的 mapStateProps 或者 mapDispatchToProps，在后续被调用。
```

## mapDispatchToProps?: Object | (dispatch, ownProps?) => Object

Conventionally called mapDispatchToProps, this second parameter to connect() may either be an object, a function, or not supplied.

通常 connect() 的第二个参数被称为 mapDispatchToProps，可以是对象，函数或者不提供。

Your component will receive dispatch by default, i.e., when you do not supply a second parameter to connect():

当你未提供第二个参数给 connect() 时，组件默认会接收 dispatch：

```
connect()(MyComponent)
connect(mapState)(MyComponent)
connect(
  mapState,
  null,
  mergeProps,
  options
)(MyComponent)
```

If you define a mapDispatchToProps as a function, it will be called with a maximum of two parameters.

如果定义了 mapDispatchToProps 函数，它最多可接收两个参数。

### Parameters

### 参数

- dispatch: Function

- ownProps?: Object

#### dispatch

If your mapDispatchToProps is declared as a function taking one parameter, it will be given the dispatch of your store.

如果声明的 mapDispatchToProps 函数只带有一个参数，store 将得到 dispatch。

```
const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
    reset: () => dispatch({ type: 'RESET' })
  }
}
```

#### ownProps

If your mapDispatchToProps function is declared as taking two parameters, it will be called with dispatch as the first parameter and the props passed to the wrapper component as the second parameter, and will be re-invoked whenever the connected component receives new props.

如果声明的 mapDispatchToProps 函数带有两个参数，它被调用时 dispatch 将作为第一个参数，封装组件的 props 作为第二个参数，当已连接的组件接收到新的 props 时将会被再次调用。

The second parameter is normally referred to as ownProps by convention.

第二个参数通常称为 ownProps。

```
 <button onClick={() => this.props.toggleTodo(this.props.todoId)} />
 
 const mapDispatchToProps = (dispatch, ownProps) => {
  toggleTodo:() => dispatch(toggleTodo(ownProps.todoId))
 }
```

The number of declared function parameters of mapDispatchToProps determines whether they receive ownProps. 

声明函数参数个数决定了 mapDispatchToProps 是否会接收 ownProps。

#### Returns

#### 返回值

Your mapDispatchToProps functions are expected to return an object. Each fields of the object should be a function, calling which is expected to dispatch an action to the store.

mapDispatchToProps 函数应返回一个对象。对象的每一个属性都应该是一个函数，调用时应向 store 调度 action。

The return of your mapDispatchToProps functions are regarded as dispatchProps. It will be merged as props to your connected component. If you define mergeProps, it will be supplied as the second parameter to mergeProps.

mapDispatchToProps 的返回值被视为 dispatchProps。它将会合并到已连接组件的 props。如果定义了 mergePorps，它将会作为 mergePorps 的第二个入参。

```
const createMyAction = () => ({ type: 'MY_ACTION' })
const mapDispatchToPtops = (dispatch, ownProps) => {
  const boundActions = bindActionCreators({ createMyAction }, dispatch)
  return {
    dispatchPlainObject: () => dispatch({ type: 'MY_ACTION' }),
    dispatchActionCreatedByActionCreator: () => dispatch(createMyAction()),
    ...boundActions,
    // 你可以在这里返回 dispatch
    dispatch
  }
}
```

```
You may define mapStateToProps and mapDispatchToProps as a factory function, i.e., you return a function instead of an object. In this case your returned function will be treated as the real mapStateToProps or mapDispatchToProps, and be called in subsequent calls. You may see notes on Factory Functions or our guide on performance optimizations.

你可以将 mapStateToProps 和 mapDispatchToProps 定义为工厂函数，例如，你的返回值是一个函数而不是一个对象。这种情况下，返回的函数将作为真正的 mapStateToProps 或者 mapdispatchToProps，在后续被调用。
```

### Object Shorthand Form

### 对象速记表

mapDispatchToProps may be an object where each field is an action creator.

mapDispatchToProps 可能是一个所含属性均为一个 action creator 的对象。

```
import { addTodo, deleteTodo, toggleTodo } from './actionCreators'

const mapDispatchToProps = {
  addTodo,
  deleteTodo,
  toggleTodo
}

export default connect {
  null,
  mapDispatchToProps
}(TodoApp)
```

In this case, React-Redux binds the dispatch of your store to each of the action creators using bindActionCreators. The result will be regarded as dispatchProps, which will be either directly merged to your connected components, or supplied to mergeProps as the second argument.

这种情况下，React-Redux 会使用 bindActionCreators 将 store 的 dispatch 绑定到每一个 action creators。返回值会被视为 dispatchProps，直接合并到已连接的组件，或者作为 mergeProps 的第二个入参。

```
bindActionCreators(mapDispatchToProps, dispatch)
```

## mergeProps?: (stateProps, dispatchProps, ownProps) => Object

If specified, defines how the final props for your own wrapped component are determined. If you do not provide mergeProps, your wrapped component receives { ...ownProps, ...stateProps, ...dispatchProps } by default.

如果指定了该参数，就决定了封装的组件最终的 props。如果未提供 mergeProps，封装组件默认接收 { ...ownProps, ...stateProps, ...dispatchProps }。


### Parameters

### 参数

mergeProps should be specified with maximum of three parameters. They are the result of mapStateToProps(), mapDispatchToProps(), and the wrapper component's props, respectively:

mergeProps 最多可接收三个参数。分别是 mapStateToProps()、mapDispatchTo

- stateProps

- dispatchProps

- ownProps

The fields in the plain object you return from it will be used as the props for the wrapped component. You may specify this function to select a slice of the state based on props, or to bind action creators to a particular variable from props.

返回的简单对象中的属性将会作为封装组件的 props。通过这个函数你可以基于 props 选择部分 state，或者从 props 中绑定 action creator 到特定的变量。

### Returns

### 返回值

The return value of mergeProps is referred to as mergedProps and the fields will be used as the props for the wrapped component.

mergeProps 的返回值被称为 mergedProps，它的属性将作为封装组件的 props 被使用。

## options?: Object

```
{
  context?: Object,
  pure?: boolean,
  areStatesEqual? Function,
  areOwnPropsEqual? Function,
  areStatePropsEqual? Function,
  areMergedPropsEqual?: Function,
  forwardRef?: boolean,
}
```

### context: Object

```
注意：>= v6.0 版本才支持该参数
```

React-Redux v6 allows you to supply a custom context instance to be used by React-Redux. You need to pass the instance of your context to both <Provider /> and your connected component. You may pass the context to your connected component either by passing it here as a field of option, or as a prop to your connected component in rendering.

React-Redux v6 允许使用自定义的 context 示例。你需要将这个示例传递给 <Provider /> 和已连接的组件。你可以通过属性选项或者在已连接组件渲染中传递 context。

```
// const MyContext = React.createContext();
connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { context: MyContext }
)(MyComponent)
```

### pure: boolean

- default value: _true_

Assumes that the wrapped component is a “pure” component and does not rely on any input or state other than its props and the selected Redux store’s state.

假设封装组件是一个“pure”组件，并且没有依赖任何的输入或 state，只依赖 props 和 Redux store 的state。

When options.pure is true, connect performs several equality checks that are used to avoid unnecessary calls to mapStateToProps, mapDispatchToProps, mergeProps, and ultimately to render. These include areStatesEqual, areOwnPropsEqual, areStatePropsEqual, and areMergedPropsEqual. While the defaults are probably appropriate 99% of the time, you may wish to override them with custom implementations for performance or other reasons.

当 options.pure 为 true 时，_connect_ 会执行多次相等检查以避免不必要的 mapStateToProps，mapDispatchToProps，MergeProps 调用及渲染。其中包括了 areStatesEqual，areOwnPropsEqual，areStatePropsEqual 和 areMergedPropsEqual。虽然 99% 的情况默认值是够用的，但你可能为了性能或者其他原因，希望重载它们。

We provide a few examples in the following sections.

在以下部分提供了一些例子。

### areStatesEqual: (next: Object, prev: Object) => boolean

default value: strictEqual: (next, prev) => prev === next

- 默认值：_strictEqual: (next, prev) => prev === next_

When pure, compares incoming store state to its previous value.

当 pure 为 true 时，会比较传入的 store state 与它先前的值。

_示例1_

```
const areStatesEqual = (next, prev) =>
  prev.entities.todos === next.entities.todos
```

You may wish to override areStatesEqual if your mapStateToProps function is computationally expensive and is also only concerned with a small slice of your state. The example above will effectively ignore state changes for everything but that slice of state.

如果你的 mapStateToProps 函数开销很高并且只涉及到小部分 state，你可能希望重载 areStateEqual。以上的例子能够有效的忽略除指定 state 以外的所有东西。


_示例2_

If you have impure reducers that mutate your store state, you may wish to override areStatesEqual to always return false:

如果你有 impure reducer 变更 store state，可能会希望重载 areStatesEqual，总是返回 false：

```
const areStatesEqual = () => false
```

This would likely impact the other equality checks as well, depending on your mapStateToProps function.

这可能会影响到其他的检查，取决于你的 mapStateToProps 函数。

###  areOwnPropsEqual: (next: Object, prev: Object) => boolean

default value: shallowEqual: (objA, objB) => boolean ( returns true when each field of the objects is equal )

- 默认值：shallowEqual: (objA, objB) => boolean（）

When pure, compares incoming props to its previous value.

当 pure 为 true 时，会比较传入的 props 和它先前的值。

You may wish to override areOwnPropsEqual as a way to whitelist incoming props. You'd also have to implement mapStateToProps, mapDispatchToProps and mergeProps to also whitelist props. (It may be simpler to achieve this other ways, for example by using recompose's mapProps.)

你可能希望重载 areOwnPropsEqual，将传入的 props 列入白名单。那么你必须同时在 mapStateToProps，mapDispatchToProps 和 mergeProps 中执行白名单。（使用 recompose 的 mapProps 能够更简单的实现）。

### areStatePropsEqual: (next: Object, prev: Object) => boolean

- 类型: 函数
- 默认值: shallowEqual

When pure, compares the result of mapStateToProps to its previous value.

当 pure 为 true 时，会比较 mapStateToProps 的返回值和它先前的值

### areMergedPropsEqual: (next: Object, prev: Object) => boolean

- default value: shallowEqual

When pure, compares the result of mergeProps to its previous value.

当 pure 为 true 时，会比较 mergeProps 的返回值和它先前的值。

You may wish to override areStatePropsEqual to use strictEqual if your mapStateToProps uses a memoized selector that will only return a new object if a relevant prop has changed. This would be a very slight performance improvement, since would avoid extra equality checks on individual props each time mapStateToProps is called.

如果你的 mapStateToProps 使用了可记忆的 selector，即只有相关的 prop 改变的才会返回新对象时，你可能希望使用 strictEqual 重载 areStatePropsEqual。这样做将会带来极少的性能提升，因为每次调用 mapStateToProps 都会避免自身 props 的额外检查。

You may wish to override areMergedPropsEqual to implement a deepEqual if your selectors produce complex props. ex: nested objects, new arrays, etc. (The deep equal check may be faster than just re-rendering.)

如果你的 selector 会产生符合 prop，例如：嵌套对象，新数组等等，你可能希望重载 areMergePropsEqual 以实现 deepEqual 。（深比较检查可能会比冲渲染更快。）

###  forwardRef: boolean

```
Note: This parameter is supported in >= v6.0 only
注意：注意：>= v6.0 版本才支持该参数
```

If {forwardRef : true} has been passed to connect, adding a ref to the connected wrapper component will actually return the instance of the wrapped component.

如果 _{forwardRef: true}_ 传递给 _connect_。会添加 ref 到已链接的封装组件，将得到封装组件的示例。

## connect() Returns

## connect() 返回值

The return of connect() is a wrapper function that takes your component and returns a wrapper component with the additional props it injects.

connect() 的返回值是一个接收组件，返回一个注入了其他 props 的封装组件的封装函数。

```
import { login, logout } from './actionCreators'

const mapState = state => state.user
const mapDispatch = { login, logout }

// first call: returns a hoc that you can use to wrap any component
// 第一次调用：返回一个可以嵌套任何组件的 hoc
const connectUser = connect(
  mapState,
  mapDispatch
)

// second call: returns the wrapper component with mergedProps
// you may use the hoc to enable different components to get the same behavior
// 第二次调用：返回带有 mergedProps 的封装组件
// 你可以使用这个 hoc 创建不同的组件以获得相同的行为
const ConnectedUserLogin = connectUser(Login)
const ConnectedUserProfile = connectUser(Profile)
```



