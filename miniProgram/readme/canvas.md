# 小程序踩坑之旅 —— canvas

[文档](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.createOffscreenCanvas.html)

接口基本和 HTML5 的对应

### 层级

小程序中 canvas 属于原生组件

#### 限制

- 原生组件层级是最高的
- 其他组件无法覆盖
- 无法使用 CSS 动画
- 无法定义 position: fixed
- 不能在父级节点使用 overflow: hidden 来裁剪原生组件的显示区域

#### cover-view 与 cover-image

可以使用这两个组件解决层级问题，它们也属于原生组件，通过限制有所不同。

### 注意

自定义组件中，wx.canvasToTempFilePath、wx.canvasGetImageData 等需要传入第二个参数：this

drawImage 需为网络图片，下载（需配置 downloadFile 域名）成功后再调用，不然会渲染不了。