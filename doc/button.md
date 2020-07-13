# Button 按钮
用于响应用户表单中的提交或点击，采用`HTML`原生的`button`标签实现

## API
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| :-   | :-   |:- | :- |  :-: |
| size | 按钮的大小 | String | `xs` |
| status | 按钮的交互状态，即色彩表现 | String | `primary` |
| hollow | 是否反转按钮的交互状态 | Boolean | false |

---
**注**: 当提供按钮的`children`时, 将会忽略按钮的`value`