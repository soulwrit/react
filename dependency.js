// 交互性状态: 主要，成功，信息，警告，错误，危险，致命，轻淡，柔和，暗黑
export const theme = [
   'primary' /* 主要 */,
   'success' /* 成功 */,
   'info'    /* 信息 */,
   'warning' /* 警告 */,
   'error'   /* 错误 */,
   'danger'  /* 危险 */,
   'fatal'   /* 致命 */,
   'light'   /* 轻柔 */,
   'muted'   /* 柔和 */,
   'dark'    /* 暗黑 */,
   'none',
   undefined
];

// 媒体查询断点
export const MQ_BreakpointsMap = {
   auto: 'xs',
   small: 'sm',
   middle: 'md',
   larger: 'lg',
   huger: 'xl',
   hugest: 'vl',
};

// 媒体查询断点
export const MQ_Breakpoints = [
   'xs' /* 0-575 */,
   'sm' /* 576- 767 */,
   'md' /* 768- 991 */,
   'lg' /* 992-1199 */,
   'xl' /* 1200-1599 */,
   'vl' /* 1600-max */,
   'none',
   undefined
];

// 位置
// 布局方向
export const dirs = ['ltr', 'rtl', 'ttr', 'rtt'];
export const directories = ['vertical', 'horizontal'];
export const placements = ['top', 'left', 'bottom', 'right'];

// 组件配置
export const CSSUtil = {
   join(...args) {
      return args.filter(v => !!v).join('-');
   },

   // 禁用类
   disable(disabled) {
      return disabled ? 'disabled' : '';
   },

   // 选中
   check(checked) {
      return checked ? 'checked' : '';
   },

   // 当前
   activate(active, className) {
      return active ? 'active' || className : '';
   },

   // 开关
   switch(hover) {
      return hover ? 'on' : '';
   },

   // 显示
   show(is, ...args) {
      return Object.assign({
         display: is ? 'initial' : 'none'
      }, ...args);
   },

   // 组件的css类名列表
   avatar: 'ava',       // 头像
   accordion: 'acc',    // 手风琴
   cover: 'cov',        // 封面
   crumb: 'cmb',        // 面包屑
   divider: 'ddr',      // 分割线
   dropdown: 'dp',      // 下拉菜单
   card: 'car',         // 卡片卡牌
   box: 'box',          // box类
   highSelect: 'hslt',  // 高阶下拉框
   editable: 'dipt',    // 可编辑区域
   elegantEditor: 'eed',// elegant Editor 编辑器
   row: 'row',          // box行
   col: 'col',          // box列
   flex: 'fx',          // flex类
   form: 'fom',         // 表单
   input: 'ipt',        // 输入框
   button: 'btn',       // 按钮
   checkbox: 'chk',     // 复选框
   select: 'slt',       // 下拉框
   radio: 'rdo',        // 单选框
   grid: 'g',           // 格子
   list: 'ls',          // 列表
   loading: 'lod',      // loading过载器
   menu: 'meu',         // 菜单
   mask: 'msk',         // 遮罩层
   modal: 'mdl',        // 模态框
   pager: 'pag',        // 分页
   progressBar: 'pgs',  // 进度条
   tab: 'tab',          // 标签页，选项卡
   table: 'tbe',        // 表格
   tag: 'tag',          // 标签
   text: 'txt',         // 文本
   tooltips: 'ttip',    // 工具提示条
   toast: 'tat',        // 提示性浮层工具
   tree: 'tree',        // 树
   autoComplete: 'aoc', // 自动补全
   icon: 'ico',         // 图标,
   upload: 'upd',       // 上传控件,
};