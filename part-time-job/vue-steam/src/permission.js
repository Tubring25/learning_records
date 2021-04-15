import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })

const whiteList = ['/','/detail','list']

router.beforeEach(async(to, from, next) => {
  console.log('router', to)
  // start progress bar
  NProgress.start()
  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    next()
    NProgress.done()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next('/')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
