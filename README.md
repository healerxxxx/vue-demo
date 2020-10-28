# relottery-h5

> 红彩数据工程，主要用于客户端赛事详情tab下的数据模块，以及H5购买点卡，PRVIP充值服务；
> 使用 v-tap 处理点击事件
> 使用 stylus 编写样式
> 使用 vuex 管理数据
> 路由模式采用History模式，由服务端进行了相关配置。

## 关于精准比分马甲包适配

* 将新建一个jzbf的分支，进行颜色适配以及敏感词的修改，勿删掉该分支。

## 功能模块

> 数据
> https://test.hongcai.163.com/vuehtml/data/1000000000125503
>
> 情报
> https://test.hongcai.163.com/vuehtml/report/1000000000125503
>
> 直播
> https://test.hongcai.163.com/vuehtml/live/1000000000125503
>
> 指数 > 欧赔/亚盘
> https://test.hongcai.163.com/vuehtml/zhishu/odds/1000000000125503
>
> 指数 > 大小球
> https://test.hongcai.163.com/vuehtml/zhishu/ball/1000000000125503
>
> 指数 > 欧赔/亚盘 详情页
> https://test.hongcai.163.com/vuehtml/zhishu/odds/detail/1000000000125503/0
>
> 指数 > 大小球 详情页
> https://test.hongcai.163.com/vuehtml/zhishu/ball/detail/1000000000125503/0

## 关于页面适配

* 整体页面css单位采用了rem，按照750的比例缩放，1rem=100px，375设计稿的话，整体乘以2

## Build Setup

``` bash
# 安装依赖
npm install

# 启动开发服务
npm run dev

# 构建
npm run build

# 上传CDN

npm run upload

```