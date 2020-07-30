# Box 布局容器

栅格化布局容器，`css`中仅提供了常规的`12`列布局方案，但作为`react`组件，我实现了动态计算，可以实现`n`列布局

## 源码逻辑分析
1. 本组件由三部分构成，盒子(`Box`)->行(`Row`)->`Col`
2. `Box`中可以嵌套`Row`，而在`Row`中必须嵌套`Col`，`Row`可以进行单独使用
3. `Box`栅格界限划分
    | 名称 | 大小 |
    | :-   | :-  |
    | `xs` | `<=575px`|
    | `sm` | `>=576px` && `<=767px`|
    | `md` | `>=768px` && `<=991px`|
    | `lg` | `>=992px` && `<=1199px`|
    | `xl` | `>=1200px`&& `<=1599px`|
    | `vl` | `>=1600px`|
4. `Row`中默认`12`列，使用`css`定义，不等于默认值时，使用js动态计算，进行布局
5. `Col`会计算列与列之间的间距值

## Box
通过用于表示一个全屏盒子或者容器, 用于布局, 其响应`css`中特定的媒体查询断点

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| :-   | :-   |:- | :- |  :-: |
| className | 容器样式类名 | Number | 16 |
| gutter | 列的间隔值 | Number | 16 |
| style | 容器内联样式 | Object | null |

## Row
用来表示盒子容器里的一行
className, children, cols, dir, gutter, style, title,
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| :-   | :-   |:- | :- |  :-: |
| className | 行的样式类名 | String | undefined |
| cols | 本行可分割的最大份数`列的数量`,不等于默认值(`12`)时，将采用`JS`进行动态计算 | Number | 12 |
| dir | 行内的列走向，紧紧在支持`flex`盒子中有效 | String | 默认`ltr`, 可选值: `ltr`, `rtl`, `ttr`, `rtt` |
| gutter | 列的间距，默认从`Box`上继承 | Number | 16 |
| style | 行的内联样式 | Object | null |

## Col
用来表示行内被分割出的块（列） 
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| :-   | :-   |:- | :- |  :-: | 
| className | 列的样式类名 | String | undefined |
| gutter | 列的样式类名 | String | undefined |
| span | 当前列的宽度 | Number | 1 |
| move | 当前列的位移 | Number | 0, 可以为负数 |
| style | 列的内联样式 | Object | null |

## Example
```js
    import React, { useState } from 'react';
    import { Box, Radio } from '@writ/react';
    import forTo from '@writ/utils/for-to';
    export function ExampleBox() {
        const dirs = ['ltr', 'rtl', 'ttr', 'rtt'];
        const [dir, setDir] = useState(dirs[0]);
        const style = {
            backgroundColor: '#007bff',
            color: '#fff'
        };

        return (
            <>
                <p>
                    列的走向：{
                        <Radio.Group name='dir' onChange={i => setDir(dirs[i])}>{dirs.map(value => (
                            <Radio key={value} value={value} />
                        ))}</Radio.Group>
                    }
                </p>
                <Box>
                    <Box.Row dir={dir}>{forTo(1, 12, col => (
                        <Box.Col key={col} span={col}>
                            <p style={style}> {col}/{12} </p>
                        </Box.Col>
                    ))}</Box.Row>
                </Box>
            </>
        );
    }
```