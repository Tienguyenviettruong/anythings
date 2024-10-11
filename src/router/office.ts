import { RouteRecordRaw } from 'vue-router'

const officeRoutes: RouteRecordRaw[] = [
  {
    path: '/office',
    name: 'Office',
    component: () => import('../views/office/Office.vue'),
    children: [
      {
        path: 'excel',
        name: 'Excel',
        component: () => import('../views/office/Excel.vue')
      },
      {
        path: 'ppt',
        name: 'PowerPoint',
        component: () => import('../views/office/PPT.vue')
    //   },
    //   {
    //     path: 'docx',
    //     name: 'Word',
    //     component: () => import('../views/office/Word.vue')
      }
    ]
  }
]

export default officeRoutes