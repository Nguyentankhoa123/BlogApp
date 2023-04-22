import moment from 'moment/dist/moment'
import vi from 'moment/dist/locale/vi'
moment.locale('vi', vi)

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle'
import './assets/main.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
  faBars,
  faCamera,
  faCameraRetro,
  faClock,
  faHome,
  faPen,
  faPencil,
  faSignIn,
  faSignInAlt,
  faSignOut,
  faTrash,
  faUserSecret,
} from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(
  faUserSecret,
  faBars,
  faClock,
  faSignOut,
  faUser,
  faPencil,
  faTrash,
  faHome,
  faPen,
  faSignInAlt,
  faCamera
)

const pinia = createPinia()

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .use(pinia)
  .mount('#app')
