import { createRouter, createWebHistory } from 'vue-router'
import AppLayOut from '@/components/layout/AppLayOut.vue'
import IndexView from '@/views/IndexView.vue'
import ErrorPageView from '@/views/ErrorPageView.vue'
import BaseMapView from '@/views/BaseMapView.vue'
import PathPlanningView from '@/views/PathPlanningView.vue'
import PositionPointsManagement from '@/views/PositionPointsManagement.vue'
import SoilRemove from '@/views/SoilRemove.vue'
import TasksManagement from '@/views/TasksManagement.vue'
import FeatureSelect from '@/views/FeatureSelect.vue'
import ImageSynthesis from '@/views/ImageSynthesis.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: AppLayOut,
      meta: { title: 'xx系统' },
      children: [
        {
          name: 'home',
          path: '',
          component: IndexView,
          meta: { title: '首页' },
        },
        {
          name: 'baseMap',
          path: '/baseMap',
          component: BaseMapView,
          meta: { title: '基础地图' },
        },
        {
          name: 'pathPlanning',
          path: '/pathPlanning',
          component: PathPlanningView,
          meta: { title: '路径规划' },
        },
        {
          name: 'imageSynthesis',
          path: '/imageSynthesis',
          component: ImageSynthesis,
          meta: { title: '原始图像合成' },
        },
        {
          name: 'positionPoints',
          path: '/positionPoints',
          component: PositionPointsManagement,
          meta: { title: '坐标点管理' },
        },
        {
          name: 'tasksManagement',
          path: '/tasksManagement',
          component: TasksManagement,
          meta: { title: '任务管理' },
        },
        {
          name: 'soilRemove',
          path: '/soilRemove',
          component: SoilRemove,
          meta: { title: '土壤去除' },
        },
        {
          name: 'featureSelect',
          path: '/featureSelect',
          component: FeatureSelect,
          meta: { title: '特征选取' },
        },
        {
          name: 'errorPage',
          path: '/:xxx(.*)*',
          component: ErrorPageView,
          meta: { title: '出错了' },
        },
        {
          name: 'about',
          path: '/about',
          component: () => import('../views/AboutView.vue'),
          meta: { title: '关于页' },
        },
      ],
    },
  ],
})

router.beforeEach(async to => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '系统'
  }
  //接下来写正常的路由守卫就可以了
})

export default router
