import Vue from 'vue'
import Router from 'vue-router'
import Error from '../view/Error'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'Error',
      component: Error,
      meta: {
        title: '404'
      }
    },
    {
      path: '/vuehtml/drawcard',
      name: 'DrawCard',
      component: () =>
        import(/* webpackChunkName: "card" */ '../view/DrawCard'),
      meta: {
        title: '点卡抽卡'
      }
    },
    {
      path: '/vuehtml/activatecard/:cardId',
      name: 'ActivateCard',
      component: () =>
        import(/* webpackChunkName: "card" */ '../view/ActivateCard'),
      meta: {
        title: '点卡激活'
      }
    },
    {
      path: '/vuehtml/macaustar',
      name: 'MacauStar',
      component: () =>
        import(/* webpackChunkName: "red" */ '../view/MacauStar'),
      meta: {
        title: '澳彩五星指数连红详情'
      }
    },
    {
      path: '/vuehtml/elored',
      name: 'EloRed',
      component: () => import(/* webpackChunkName: "red" */ '../view/EloRed'),
      meta: {
        title: '红彩指数连红详情'
      }
    },
    {
      path: '/vuehtml/sppay',
      name: 'SpPay',
      component: () => import(/* webpackChunkName: "sppay" */ '../view/SpPay'),
      meta: {
        title: '交叉盘支付'
      }
    },
    {
      path: '/vuehtml/zhishu/odds/:matchInfoId',
      name: 'ZhiShuOdds',
      component: () =>
        import(/* webpackChunkName: "zhishu" */ '../view/ZhiShu/Odds'),
      meta: {
        title: '指数列表'
      }
    },
    {
      path: '/vuehtml/zhishu/ball/:matchInfoId',
      name: 'ZhiShuBall',
      component: () =>
        import(/* webpackChunkName: "zhishu" */ '../view/ZhiShu/Ball'),
      meta: {
        title: '指数列表'
      }
    },
    {
      path: '/vuehtml/zhishu/odds/detail/:matchInfoId/:fcsCID/:fcsTab',
      name: 'ZhiShuOddsDetail',
      component: () =>
        import(/* webpackChunkName: "zhishu" */ '../view/ZhiShu/OddsDetail'),
      meta: {
        title: '赔率详情'
      }
    },
    {
      path: '/vuehtml/zhishu/ball/detail/:matchInfoId/:fcsCID',
      name: 'ZhiShuBallDetail',
      component: () =>
        import(/* webpackChunkName: "zhishu" */ '../view/ZhiShu/BallDetail'),
      meta: {
        title: '赔率详情'
      }
    },
    {
      path: '/vuehtml/data/:matchInfoId',
      name: 'Data',
      component: () => import(/* webpackChunkName: "data" */ '../view/Data'),
      meta: {
        title: '数据'
      }
    },
    {
      path: '/vuehtml/report/:matchInfoId',
      name: 'Report',
      component: () =>
        import(/* webpackChunkName: "report" */ '../view/Report'),
      meta: {
        title: '赛前分析'
      }
    },
    {
      path: '/vuehtml/lineup/:id',
      name: 'Lineup',
      component: () =>
        import(/* webpackChunkName: "lineup" */ '../view/Lineup'),
      meta: {
        title: '阵容'
      }
    },
    {
      path: '/vuehtml/playerstats/:matchInfoId/:teamId/:playerId',
      name: 'Playerstats',
      component: () =>
        import(/* webpackChunkName: "lineup" */ '../view/Playerstats'),
      meta: {
        title: '球员比赛数据'
      }
    },
    {
      path: '/vuehtml/player/:categoryId/:playerId',
      name: 'PlayerInfo',
      component: () =>
        import(/* webpackChunkName: "player" */ '../view/PlayerInfo'),
      meta: {
        title: '球员个人信息'
      }
    },
    {
      path: '/vuehtml/team/:teamId',
      name: 'TeamInfo',
      component: () =>
        import(/* webpackChunkName: "player" */ '../view/TeamInfo'),
      meta: {
        title: '球队主页'
      }
    },
    {
      path: '/vuehtml/rank',
      name: 'Rank',
      component: () => import(/* webpackChunkName: "rank" */ '../view/Rank'),
      meta: {
        title: '联赛积分'
      }
    }
  ]
})

router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})

export default router
