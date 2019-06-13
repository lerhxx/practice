## column

简单、方便，会先排第一列，在排第二列，加载数据是第二列会闪烁、改变
如果按顺序从左往右排，代码冗余
体验效果不理想

改 js 计算

1、图片宽高已知
根据宽高比算出图片相对高度，进行定位计算，在渲染（每次添加数据都需要重新计算）
保存每次计算后的列数 columns 高度

2、图片宽高未知
imgLoad


ps: scroll-view

快速上拉到底部不会触发 onScrollToLower，需要往回拉才触发。
还会导致页面不会触发 onPullDownRefresh，有自带的 onScrollToUpper，缺少动画，且一到顶部就会触发。