import Vue from 'vue'
import Router from 'vue-router'
import CotizacionDollar from '@/components/CotizacionDollar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CotizacionDollar',
      component: CotizacionDollar
    }
  ]
})
