import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index'
import PetCenter from '../views/PetCenter'
import ShouYangPet from '../views/ShouYangPet'
import SongYang from '../views/SongYang'
import Login from '../views/Login'
import XiangQing from '../views/XiangQing'
import Register from '../views/Register'
import MyIndex from '../views/MyIndex'
import BlogManage from '../views/BlogManage'
import MyInformation from '../views/MyInformation'
import Test from '../views/test'
import PetCircle from '../views/PetCircle'
import FenXiang from '../views/FenXiang'
import PetXiangQing from '../views/PetXiangQing'
import PetXiangQing2 from '../views/PetXiangQing2'
import MessageManage from '../views/MessageManage'
import ShareManage from '../views/ShareManage'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    redirect: '/petcenter',
    children: [
      {
        path: '/petcenter',
        name: 'PetCenter',
        meta: {isAuth: false},
        component: PetCenter
      },
      {
        path: '/shouyangpet',
        name: 'ShouYangPet',
        meta: {isAuth: false},
        component: ShouYangPet
      },
      {
        path: '/petcircle',
        name: 'PetCirCle',
        meta: {isAuth: false},
        component: PetCircle
      },
      {
        path: '/songyang',
        name: 'SongYang',
        meta: {isAuth: true},
        component: SongYang
      },
      {
        path: '/fenxiang',
        name: 'FenXiang',
        meta: {isAuth: true},
        component: FenXiang
      },
      {
        path: '/xiangqing',
        name: 'XiangQing',
        meta: {isAuth: false},
        component: XiangQing
      },
      {
        path: '/petxiangqing',
        name: 'PetXiangQing',
        meta: {isAuth: false},
        component: PetXiangQing
      },
      {
        path: '/petxiangqing2',
        name: 'PetXiangQing2',
        meta: {isAuth: false},
        component: PetXiangQing2
      },
      {
        path: '/myindex',
        name: 'MyIndex',
        component: MyIndex,
        redirect: '/myinformation',
        children: [
          {
            path: '/myinformation',
            name: '用户个人信息管理',
            meta: {isAuth: true},
            component: MyInformation
          },
          {
            path: '/blogmanage',
            name: '博客管理',
            meta: {isAuth: true},
            component: BlogManage
          },
          {
            path: '/messagemanage',
            name: '信息管理',
            meta: {isAuth: true},
            component: MessageManage
          },
          {
            path: '/sharemanage',
            name: '分享博客管理',
            meta: {isAuth: true},
            component: ShareManage
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {isAuth: false},
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    meta: {isAuth: false},
    component: Register
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  }
]
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
