import Vue from 'vue'
import Router from 'vue-router'
// import { wxInit } from 'assets/js/wx.config'
import { wxConfig } from 'assets/js/wx.config'
// 登录
// const Login = (resolve) => {
//   import('components/login/login').then((module) => {
//     resolve(module)
//   })
// }

// 精选
const Index = (resolve) => {
  import('components/index/index').then((module) => {
    resolve(module)
  })
}

// 乐享生活
const Enjoy = (resolve) => {
  import('components/enjoy/enjoy').then((module) => {
    resolve(module)
  })
}

// 全球资产配置
const Global = (resolve) => {
  import('components/global/global').then((module) => {
    resolve(module)
  })
}

const GlobalDetail = (resolve) => {
  import('components/global/detail').then((module) => {
    resolve(module)
  })
}

const MigrationPlanning = (resolve) => {
  import('components/global/migration').then((module) => {
    resolve(module)
  })
}

const LifePlanning = (resolve) => {
  import('components/global/lifeplan').then((module) => {
    resolve(module)
  })
}

const Assess = (resolve) => {
  import('components/global/assess').then((module) => {
    resolve(module)
  })
}

const Reports = (resolve) => {
  import('components/global/report-view').then((module) => {
    resolve(module)
  })
}

// const ChildEducation = (resolve) => {
//   import('components/global/education').then((module) => {
//     resolve(module)
//   })
// }

// 我的
const Mine = (resolve) => {
  import('components/mine/mine').then((module) => {
    resolve(module)
  })
}

const Focus = (resolve) => {
  import('components/mine/focus').then((module) => {
    resolve(module)
  })
}

const Booking = (resolve) => {
  import('components/mine/booking').then((module) => {
    resolve(module)
  })
}

const UserInfo = (resolve) => {
  import('components/mine/info').then((module) => {
    resolve(module)
  })
}

const More = (resolve) => {
  import('components/mine/more').then((module) => {
    resolve(module)
  })
}

const Membership = (resolve) => {
  import('components/mine/membership').then((module) => {
    resolve(module)
  })
}

const Question = (resolve) => {
  import('components/mine/question').then((module) => {
    resolve(module)
  })
}

const ContactUs = (resolve) => {
  import('components/mine/contactUs').then((module) => {
    resolve(module)
  })
}

const AboutUs = (resolve) => {
  import('components/mine/aboutUs').then((module) => {
    resolve(module)
  })
}

// 乐享生活详情
const enjoyDetail = (resolve) => {
  import('components/enjoy/enjoydetail').then((module) => {
    resolve(module)
  })
}
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {
        title: '热门精选'
      }
    },
    {
      path: '/enjoy',
      name: 'enjoy',
      component: Enjoy,
      meta: {
        title: '乐享生活'
      },
      children: [
        {
          path: 'enjoydetail',
          name: 'enjoydetail',
          component: enjoyDetail,
          meta: {
            title: '乐享生活详情'
          }
        }
      ]
    },
    {
      path: '/global',
      name: 'global',
      component: Global,
      meta: {
        title: '全球资产配置'
      },
      children: [
        {
          path: 'detail',
          name: 'detail',
          meta: {
            title: '资产配置详情'
          },
          component: GlobalDetail
        },
        {
          path: 'migration/:id',
          // path: 'migration/:id',
          name: 'migration',
          meta: {
            title: '全球资产配置'
          },
          component: MigrationPlanning
        },
        {
          path: 'life',
          name: 'life',
          meta: {
            title: '生命规划'
          },
          component: LifePlanning
        },
        {
          path: 'assess',
          name: 'assess',
          meta: {
            title: '在线评估'
          },
          component: Assess
        },
        {
          path: 'reports',
          name: 'reports',
          meta: {
            title: '资产报告'
          },
          component: Reports
        }
      ]
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine,
      meta: {
        title: '个人中心'
      },
      children: [
        {
          path: 'focus',
          name: 'focus',
          component: Focus,
          meta: {
            title: '我的关注'
          }
        },
        {
          path: 'booking',
          name: 'booking',
          component: Booking,
          meta: {
            title: '我的预约'
          }
        },
        {
          path: 'info',
          name: 'info',
          component: UserInfo,
          meta: {
            title: '修改个人信息'
          }
        },
        {
          path: 'more',
          name: 'more',
          component: More,
          meta: {
            title: '更多'
          }
        },
        {
          path: 'membership',
          name: 'membership',
          component: Membership,
          meta: {
            title: '会员制度'
          }
        },
        {
          path: 'question',
          name: 'question',
          component: Question,
          meta: {
            title: '常见问题'
          }
        },
        {
          path: 'contactUs',
          name: 'contactUs',
          component: ContactUs,
          meta: {
            title: '联系客服'
          }
        },
        {
          path: 'aboutUs',
          name: 'aboutUs',
          component: AboutUs,
          meta: {
            title: '关于我们'
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  wxConfig(to.fullPath)
  next()
  // wxInit(to.fullPath)
})

export default router
