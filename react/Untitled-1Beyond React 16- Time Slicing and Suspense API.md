# Beyond React 16: Time Slicing and Suspense API

# React 16 的未来：Time Slicing and Suspense API

```
原文：https://auth0.com/blog/time-slice-suspense-react16/
```

Learn what's coming to ReactJS. Get a sneak peek of the powerful features that will grace ReactJS soon.

学习 ReactJs 即将发生的改变。一睹为 ReactJs 锦上添花的强大特性。

```
TL;DR: ReactJS is a UI library that's a very powerful tool amongst frontend developers in building JavaScript applications. In this article, I'll introduce you to a few features coming to ReactJS.

长话短说：ReactJs 是一个 UI 库，一个前端开发者构建 JavaScript 应用时的一个非常强大的工具。本文，我将会向你介绍 ReactJs 即将到来的一些特性。
```

ReactJS is a JavaScript library, built and maintained by Facebook. As of today, it powers so many popular web and mobile platforms such as Twitter, Airbnb, Lyft, Dropbox, Pinterest, Whatsapp and Instagram. The latest release of ReactJS which is React 16 ships with a lot of features such as Error Boundaries, Custom DOM Attributes definition, Fragments as return types, Portals and many others.

ReactJs 是一个由 Facebook 创建和维护的 JavaScript 库。从今天起，他应用于许多流行的网站和移动平台例如 Twitter，Airbnb，Lyft，Dropbox，Pinterest，Whatsapp 和 Instagram。ReactJS 最新版本 React 16 有许多的特性例如Error Boundaries，自定义 DOM 属性，Fragments 返回类型，Portals 等等。

However, the ReactJS team is not slacking. They are hard at work looking for new ways to make React a highly performant library in UI component development. A sneak peek into new features coming to React was demoed by the creator of Redux and React core team member, Dan Abramov at JSConf Iceland, 2018. If you haven't watched Dan's talk, here is the demo.

然而，ReactJs 团队并没有懈怠。他们致力于使 React 成为高性能的 UI 组件开发库。Redux 和 React 的核心成员 [Dan Abramov](https://twitter.com/dan_abramov) 在 __2018 年冰岛 JSConf__ 中，演示了 React 即将到来的新特性。如果你还没看过 Dan 的演讲，[戳这里](https://www.facebook.com/react/videos/1552821821462886/)。

## What's coming to ReactJS?
## ReactJS 将有什么变化？

Making it easier for developers to build great user experiences using ReactJS has always been the goal of the ReactJS team. Building for great user experiences involves splitting the attention of developers into two distinct categories:

让开发者通过 ReactJS 构建更好的用户体验始终是 ReactJS 团队的目标。构建更好的用户体验，开发者的注意力应分为两大类：

- Computing Power
- Network Speed

- 计算计能力
- 网络速度

With these categories spelt out, you start asking the following questions:

分出这些类别后，开始回答以下问题：

- Are the users on a slow network? If so, how's the user experience? Can we (developers) control the loading states?

- 用户是否处于慢网速？如果是，用户体验如何？开发者能够控制 loading 状态吗？

- Are the users on a low-end device (devices with low CPU power)? If so, is using the app still a memorable experience effectively?

- 用户使用的是否为低端设备（CPU 性能差的设备）吗？如果是，使用这个 app 的体验依然高效难忘吗？

- Are the users on a fast network? If so, is the experience seamless? No janky UI.

- 用户是否处于快网速？如果是，体验是连续的吗？拒绝复杂的用户界面。

- Are the users on a high-end device (devices with high CPU power)? If so, is the rendering flawless?

- 用户使用的是否为高端设备（CPU 性能好的设备）？如果是，渲染表现完美吗？

These are valid questions that need answers. Let's explore how Time Slicing and Suspense in ReactJS can help deliver the best user experience for everyone.

这些都是需要解决的问题。让我们探索 ReactJS 的 Time Slicing 和 Suspense 如何提升所有用户的体验。

## Time Slicing

In Dan's talk, he said: "We’ve built a generic way to ensure that high-priority updates like user input don’t get blocked by rendering low-priority updates". What does this mean? The ReactJS team named this concept Time Slicing. Let me explain in simpler terms.

Dan 的演讲中提到：“我们将会构建一个通用方式确保用户输入等高优先级更新不会被渲染等低优先级更新阻断。” 这是什么意思？ReactJs 团队将这个方式称为 Time Slicing。让我简单说下。

ReactJS is concerned about a device's CPU power. While rendering, ReactJS ensures that it doesn't block the thread thus causing the app to freeze.

ReactJs 关心设备的 CPU 性能。渲染时，ReactJS 确保不会阻塞线程导致应用程序卡顿。

Time-slicing allows ReactJS, which now runs on React Fiber, to split computations of updates on children components into chunks during idle callbacks and rendering work is spread out over multiple frames. Now, during the process of asynchronous rendering, it ensures that if a user's device is very fast, updates within the app feel synchronous and if a user's device is slow, the app feels responsive. No freezing, No janky UI experience!

Time-slicing 让运行在 React Fiber 的 ReactJS 能够将子组件的更新分配到 chunks 中等待空闲时调用，渲染工作被分散到多个帧。现在，在异步渲染进程中，保证了如果用户的设备运行快，应用程序的更新就像同步一样，如果用户设备运行慢，应用程序就像响应式的。没有卡顿，没有糟糕的用户体验。



