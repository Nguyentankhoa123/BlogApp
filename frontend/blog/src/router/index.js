import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import BlogCard from '../components/BlogCard.vue'
import Post from '../components/Post.vue'
import ViewBlog from '../components/ViewBlog.vue'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import EditPost from '../components/Edit.vue'
import PostOfUser from '../components/PostUser.vue'
import Category from '../components/Category.vue'
import Profile from '../components/Profile.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Blogs',
    name: 'BlogCard',
    component: BlogCard,
  },
  {
    path: '/Post',
    name: 'Post',
    component: Post,
  },
  {
    path: '/View-blog/:id',
    name: 'ViewBlog',
    component: ViewBlog,
    props: true,
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Edit/:id',
    name: 'EditPost',
    component: EditPost,
    props: true,
  },
  {
    path: '/posts',
    name: 'PostOfUser',
    component: PostOfUser,
    props: (route) => ({ id: route.query.user }),
  },
  {
    path: '/posts',
    name: 'Category',
    component: Category,
    props: (route) => ({ category: route.query.category }),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
