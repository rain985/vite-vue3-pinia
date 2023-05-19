import {
  Button,
  Popover,
  Slider,
  Tabs,
  Row,
  Col,
  Form,
  Input,
  Select,
  Upload,
  Space,
  Switch,
  Divider,
  InputNumber,
  Cascader,
  Radio,
  Checkbox,
  DatePicker,
  Rate,
  Layout,
  Badge,
  Menu,
  Breadcrumb,
  ConfigProvider,
  Tree,
  Table,
  Modal,
  TreeSelect,
  Steps,
  Collapse,
  Result,
  Tooltip,
  Tag,
  List,
  Spin,
  Drawer,
  Affix,
  Carousel,
  Pagination,
  Dropdown,
  Descriptions,
  Anchor,
  Avatar,
  Empty,
  Progress
} from 'ant-design-vue'
import { createFromIconfontCN } from '@ant-design/icons-vue'
const MyIcon = createFromIconfontCN({
  //scriptUrl: '//at.alicdn.com/t/font_2389546_gzxvcd1wsb9.js'
  //   scriptUrl: '/iconfont.js'
})
import * as icons from '@ant-design/icons-vue'
export default function registerComponent(vue) {
  vue.component('MyIcon', MyIcon)
  vue.use(Button)
  vue.use(Popover)
  vue.use(Slider)
  vue.use(Tabs)
  vue.use(Row)
  vue.use(Col)
  vue.use(Form)
  vue.use(Input)
  vue.use(Select)
  vue.use(Upload)
  vue.use(Space)
  vue.use(Switch)
  vue.use(Divider)
  vue.use(InputNumber)
  vue.use(Cascader)
  vue.use(Radio)
  vue.use(Checkbox)
  vue.use(DatePicker)
  vue.use(Rate)
  vue.use(Layout)
  vue.use(Badge)
  vue.use(Menu)
  vue.use(Breadcrumb)
  vue.use(ConfigProvider)
  vue.use(Tree)
  vue.use(Table)
  vue.use(Modal)
  vue.use(TreeSelect)
  vue.use(Steps)
  vue.use(Collapse)
  vue.use(Result)
  vue.use(Tooltip)
  vue.use(Tag)
  vue.use(List)
  vue.use(Spin)
  vue.use(Drawer)
  vue.use(Affix)
  vue.use(Carousel)
  vue.use(Pagination)
  vue.use(Dropdown)
  vue.use(Descriptions)
  vue.use(Anchor)
  vue.use(Avatar)
  vue.use(Empty)
  vue.use(Progress)
  for (const icon in icons) {
    vue.component(icon, icons[icon])
  }
}
