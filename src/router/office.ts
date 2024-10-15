import { RouteRecordRaw } from 'vue-router'

const officeRoutes: RouteRecordRaw[] = [
  {
    path: '/office',
    name: 'Office',
    component: () => import('../views/office/Office.vue'),
    children: [
        {
            path: 'officehome',
            name: 'Office Home',
            component: () => import('../views/office/HomeOffice.vue')
        },
        {
        path: 'excel',
        name: 'Excel',
        component: () => import('../views/office/Excel.vue')
      },
      {
        path: 'ppt',
        name: 'PowerPoint',
        component: () => import('../views/office/PPT.vue'),
        meta: {
          icon: "ri:file-ppt-2-line",
          title: "PPT",
          keepAlive: true,
        }
      }
    ]
  }
]

export default officeRoutes