## 瀑布流

项目中需要展示瀑布流，第一反应就是希望通过 css 实现，方便且不需要太多的计算。可惜 float、flex 容易出现两列高度差相差大的情况，最后发现 css3 的 column。

## column

```
    column-width: 345px;
    column-count: 2;
    column-gap: 20rpx;
```

实现上简单、方便，浏览器会自动计算每列的宽度，平均排满所有列。但是是先排第一列，在排第二列。。。

如果数据没有顺序要求的话，这不是大问题。如果希望从左到右顺序排布，加多一个循环就可以实现，就是代码有点冗余，不好维护。

在开发者工具上表现很完美，但是！！真机测试，加载数据时第二列的图片会闪烁😂，而且当数据总数改变时，可能会改变原来已有的布局。

[代码](https://github.com/lerhxx/practice/tree/master/miniProgram/Taro/myApp/src/pages/water-fall/column)

真机体验非常糟，只能舍弃，改用 js 实现了😵

## js 实现

先考虑瀑布流中只有图片的情况，这又分为图片尺寸已知和未知。通过绝对定位布局。

### 图片宽高比已知
- 遍历数组，根据宽度和宽高比算出图片对应高度

```
  // 计算图片相对高度
  function calcImageHeight(dimensions, imgWidth=345) {
    if (!dimensions) {
        return 200
    }
    const sizes = dimensions.split('x')
    return  imgWidth / sizes[0] * sizes[1]
  }
```

- 计算出各个图片的位置

```
  const newList = list.map((item, i) => {
    const columns = Array.from({ length: 2 }, () => 0)
    const gap=20,                  // 图片左右间距
    const bottomGap = 20           // 图片上下间距
    const imgHeight = calcImageHeight(item.dimensions)
    const newItem = { ...item }
    const totalHieght = imgHeight + bottomGap
    const minHeight = Math.min.apply(null, columns) || 0
    let minIndex = 0

    minIndex = columns.indexOf(minHeight)
    columns[minIndex] += totalHieght
    newItem.top = minHeight
    newItem.left = (imgWidth + gap) * minIndex
    return newItem
   })
```

- 保存各列的总高度（添加数据时，只需计算新数据的位置）
- 渲染

[代码](https://github.com/lerhxx/practice/tree/master/miniProgram/Taro/myApp/src/pages/water-fall/calc)

### 图片宽高比未知

图片宽高比未知的情况下，只能等图片加载完获取比例，再计算位置了。在小程序里，渲染层和逻辑层是两个不同的线程，缺少浏览器里的 DOM API，不过没关系，官方提供了获取节点信息的 API：[wx.createSelectorQuery](https://developers.weixin.qq.com/miniprogram/dev/api/wxml/wx.createSelectorQuery.html)

```
wx.createSelectorQuery()
    .selectAll('.water-fall__item')
    .boundingClientRect()
    .exec(res => {
        // 更新图片信息
    })
```

##### 尝试1

通过触发 onLoad 事件，重新计算瀑布流。但是因为图片是并发下载的，每 onLoad 一次，重新计算列表布局，容易造成数据污染，布局计算失败。

##### 尝试2
如果等所有图片加载完再计算，那么在这之前，页面布局混乱，网速差的情况体验非常不好。

##### 尝试3
将 onLoad 事件串联执行，待续。

#### 展开 & 收起

通过变量 `isShow` 控制是否显示全部。需要在更新 isShow 之后，重新计算布局。将数据保存在 state 中，确保布局计算在更新 isShow 之后执行。


## 列表优化

### 分 tab 显示

每次当前 tab 的数据，一个 tab 含5页
下拉，判断当前 tab 已满，翻到下一个 tab，滚动条置顶；未满且还有未请求数据，请求下一页数据并填充当前 tab。

上拉，边界判断，返回上一个 tab。
问题：
- 滚动条置底会触发下拉，
- 滚动条置于底部上方，需获取滚动条底部位置
    - 通过 wx.createSelectorQuery 获取列表父元素高度，但是列表项子元素绝对定位，父元素高度为0

### 分页显示

每次显示5页数据

下拉，判断下一页数据已缓存，截取数据，未缓存，请求数据

上拉，边界判断

难点：
- 上页、下页 页数判断: 保存起始、结尾页数下标
- 滚动条位置判断，渲染前判断相对 index 的位置，会有误差；准确滚得的话，需重渲染后，获取对应 index
