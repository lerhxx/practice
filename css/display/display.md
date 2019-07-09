# display

定义元素的显示类型。包含两类基础特征：外部显示类型和内部显示类型：

- 外部显示类型：定于元素怎样参与流失布局的处理
- 内部显示类型：定于元素内子元素的布局方式

## 关键字类型

display 属性使用关键字取值来指定。

- outside
- inside
- listitem
- internal
- box
- legacy

![](https://github.com/lerhxx/practice/blob/master/css/display/display.jpeg)

### outside
- block
- inline
- run-in：即可以表现为 block 也可以表现为 inline，取决于周围的元素。如果内部包含了 block 子元素，则表现为 block；如果后面的兄弟元素是 block，则 run-in 元素表现为兄弟元素的第一个 inline 子元素。如果后面的兄弟元素是 inline，则表现为 block。（只有 ie 支持😂）

### inside

- flow: 布局取决于其他属性；是否创建 BFC 取决于其外部容器
- flow-root：生成块级容器，子元素为 flow 布局。创建 BFC
- table
- flex：太爱这个属性了
- grid：太爱这个属性了
- ruby：一般用于语言发音注释

__如果只指定了 inside 值，省略 outside 值，除了 ruby 的 表现为 inline，其他均默认为 block。__

### listitem

与 __list-style__ 搭配使用，生成指定 ‘::marker’ 伪元素

- list-item
- list-item block
- list-item inline
- list-item flow
- list-item flow-root
- list-item block flow
- list-item block flow-root
- flow list-item block

## internal

### box

### legacy

