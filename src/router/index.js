import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Detail from '../views/Detail.vue'
import Login from '../views/Login.vue'
import Class from '../views/Class.vue'
import ClassDetail from '../views/ClassDetail.vue'
import Search from '../views/Search.vue'
import Bookcase from '../views/Bookcase.vue'
import User from '../views/User.vue'
import Top from '../views/Top.vue'
import NewBook from '../views/NewBook.vue'
import Done from '../views/Done.vue'
import Vip from '../views/Vip.vue'
import Message from '../views/Message.vue'
import Help from '../views/Help.vue'
import Safe from '../views/Safe.vue'
import Problem from '../views/Problem.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Index',
    component: Index
}, {
    path: '/detail:id?',
    name: 'Detail',
    component: Detail,
}, {
    path: '/login',
    name: 'Login',
    component: Login
}, {
    path: '/class',
    name: 'Class',
    component: Class
}, {
    path: '/classdetail:id?',
    name: 'ClassDetail',
    component: ClassDetail
}, {
    path: '/search',
    name: 'Search',
    component: Search
}, {
    path: '/bookcase',
    name: 'Bookcase',
    meta: true,
    component: Bookcase
}, {
    path: '/user',
    name: 'User',
    meta: true,
    component: User
}, {
    path: '/top',
    name: 'Top',
    component: Top
}, {
    path: '/newbook',
    name: 'NewBook',
    component: NewBook
}, {
    path: '/done',
    name: 'Done',
    component: Done
}, {
    path: '/vip',
    name: 'Vip',
    meta: true,
    component: Vip
}, {
    path: '/message',
    name: 'Message',
    meta: true,
    component: Message
}, {
    path: '/help',
    name: 'Help',
    meta: true,
    component: Help
}, {
    path: '/safe',
    name: 'Safe',
    meta: true,
    component: Safe
}, {
    path: '/problem',
    name: 'Problem',
    meta: true,
    component: Problem
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// router.beforeEach((to, from, next) => {
//     console.log(to, from)
//     next()
// })

export default router