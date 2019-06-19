# transform 遇上 position: fixed

最近遇到一个有意思的现象，以下 demo 中 fixed 的元素没有相对 viewport 定位，而是相对于它的父元素进行定位。

```
<html>
    <head>
        <style>
            .parent {
                width: 200px;
                height: 300px;
                background: yellow;
                transform: scale(1);
            }
            .fixed {
                position: fixed;
                left: 0;
                right: 0;
                bottom: 0;
                background: red;
            }
        </style>
    </head>
    <body>
        <div class='parent'>
            parent
            <div class='fixed'>fixed</div>
        </div>
    </body>
</html>
```

![demo][1]

在 w3c 中对 position: fixed 的[定义](https://www.w3.org/TR/css-position/#fixed-pos)如下：

```
Fixed positioning is similar to absolute positioning. The only difference is that for a fixed positioned box, the containing block is established by the viewport. 
```

大概意思就是，fixed 元素的块级格式上下文 Block Formatting Context（BFC） 由 viewport 创建，也就是fixed 元素的 BFC 包含在根元素的 BFC 里。

那以上 demo 的表现就说不过去了。为什么呢🤔。谷歌一下，原来是父元素的 transform 在捣乱。

再看看 w3c 对 transform 的[定义]()：

```
For elements whose layout is governed by the CSS box model, any value other than none for the transform property also causes the element to establish a containing block for all descendants. Its padding box will be used to layout for all of its absolute-position descendants, fixed-position descendants, and descendant fixed background attachments.
```

大概意思就是，transform 属性使元素创建了**新的 BFC，所有**的子元素都被包含在这个新的 BFC 内。那么设置了 position: fixed 的子元素 BFC 被包含在了  transform 元素的 BFC 里。

BFC 和定位有什么关系呢，继续翻 w3c，有段关于 BFC 的[定义](https://www.w3.org/TR/css-position/#def-cb)：

```
The position and size of an element’s box(es) are sometimes computed relative to a certain rectangle, called the containing block of the element. 
```

元素的位置和尺寸是相对于一个确定的 BFC 计算的。

所以 demo 展示的 fixed 元素位置是根据它所在的 BFC 计算的。

[1]: https://github.com/lerhxx/practice/blob/master/css/transform-fixed/demo.png
