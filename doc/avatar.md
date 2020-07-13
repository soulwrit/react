# Avatar 头像
用于表示用户或事物，支持图片、图标或字符展示。

## Example 用例
```js
    import React from 'react';
    import { Avatar,Icon } from '@writ/react';
    import defaultAvatar from '@path/default-avatar.svg';

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

## API 说明

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| :-   | :-   |:- | :- |  :-: |
| src  | 图像的 URL, 当不提供此项时,可通过子元素来提供表示的对象 | String | undefined | 
| size | 大小, 配置项可选范围同`设备断点名称` | String | `md` |
| radius | 圆角 | String/Number | 50% |
| width  | 宽度 | String/Number | undefined |
| height | 高度 | String/Number | undefined |
---
**注**: 支持元素所有可支持的 `props`