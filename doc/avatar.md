# Avatar 头像
用于表示用户或事物，支持图片、图标或字符展示。

## 源码逻辑分析
1. 首先这是一个受控组件，用于输出展示标志性事物，`Avatar`图像（`src`）会执行懒加载
2. `src`懒加载流程
  * 图像加载是一个异步过程，因此，根据过程可分为 `before(加载前)->(success[加载成功]/fail[加载失败])`
  * 在本组件中，我内置了一个默认的图像，用于图像区域占位（称之为`defaultSrc`）
  * 在`src`加载前，图像区总会展示`defaultSrc`
  * 当`src`加载成功时，图像区替换成`src`
  * 当`src`加载失败时，图像区替换成开发人员提供的错误占位图(称之为`errorSrc`)
  * 当`errorSrc`不存在时，图像区替换为`defaultSrc`
3. 除过展示图像，本组件中还可以展示一个`ReactNode`类型的`Icon`，它的优先级低于`src`
4. 对于图像展示，当提供图像的`srcSet`属性时，组件将会将`src`设置到一个`img`元素上，同时支持`draggable`
5. 如果提供组件的子元素，那么组件将会渲染子元素，从而脱离`src`可控, 我称之为`children-text`
6. 将`src`设置到背景图中，同时使用响应`background-size:cover`属性，我称之为`cover-img`
7. `icon`, `srcSet`, `children-text`, `cover-img`的加载优先级依次递减

## API
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| :-  | :-   |:- | :- |  :-: |
| alt | 图像无法显示时的替代文本（被`defaultSrc或errorSrc`所覆盖，当二者不存在时使用`alt`）| String | undefined |
| className | 样式类名 | String | undefined |
| defaultSrc | 默认的加载占位图像 | String | undefined |
| draggable | 图像可拖拽 | boolean | false |
| errorSrc | `src`加载失败时的占位图像 | String | undefined |
| height | 高度 | String/Number | undefined |
| icon | 以自定义图标替换头像图形区 | ReactNode | undefined |
| onError | 图片加载失败时的处理，默认切为占位图(`defaultSrc`) | function | undefined |
| onClick | 点击图像执行的函数 | function | undefined |
| radius | 圆角尺寸 | String/Number | 50% |
| size | 大小, 配置项可选范围同`设备断点名称` | String | `md` |
| src | 图像的 URL, 当不提供此项时,可通过子元素来提供表示的对象 | String | undefined |
| style | 内联样式 | Object | undefined |
| width | 宽度 | String/Number | undefined |
---

## Example
```js
    import React from 'react';
    import { Avatar,Icon } from '@writ/react';
    import AvatarSVG from '@path/default-avatar.svg';

    // 用法一
    React.render(
        <Avatar className='my-avatar' src={defaultAvatar} />,
        document.querySelector('#avatar_1')
    );

    // 用法二
    React.render(
        <Avatar className='my-avatar'>
            <Icon type='user'/>
        </Avatar>,
        document.querySelector('#avatar_2')
    );
```