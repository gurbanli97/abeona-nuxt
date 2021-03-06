import { resolve } from 'path'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Abeona-Nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  router: {
    linkActiveClass: 'link-active',
    linkExactActiveClass: 'exact-active',
  },

  // server: {
  //   port: 3000,
  //   host: '192.168.0.189'
  // },

  // loading: '~/components/Loading.vue',
  loading: {
    color: '#00D68F',
    height: '3px'
  },


  alias: {
    'images': resolve(__dirname, './assets/images'),
    'icons': resolve(__dirname, './assets/images/icons'),
    'style': resolve(__dirname, './assets/styles'),
  },


  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/scss/style.scss"
  ],

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        if (type === 'script' || type === 'style') {
          return true
        }
        if (type === 'font') {
          // only preload woff2 fonts
          return /\.woff2$/.test(file)
        }
      }
    }
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/helpers' },
    { src: '~/plugins/axios' },
    { src: '~/plugins/global-components'},
    { src: "~/plugins/vue-select" },
    { src: "~/plugins/vClickOutside" },
    { src: "~/plugins/vue-scrollto" },
    { src: "~/plugins/vuelidate" },
    { src: '~/plugins/full-calendar', ssr: false},
    { src: "~/plugins/vue-ellipse",mode: 'client'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'cookie-universal-nuxt',
    '@nuxtjs/moment',
    '@nuxtjs/toast',
    'vue-scrollto/nuxt',
  ],

  axios: {
    // Do away with the baseUrl when using proxy
    proxy: true,
    baseURL: 'https://stg.abeona.pickvisa.com'
   },
   proxy: {
     // Simple proxy
     "/api/": {
       target: "https://stg.abeona.pickvisa.com",
       pathRewrite: { "^api/": "" }
     }
   },

   auth: {
    localStorage: false,
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          maxAge: 60 * 60 * 24 * 30,
          type: 'Token'
        },
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: { url: 'api/v1/login', method: 'post' },
          logout: false,
          user: false
        },
       
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    }
  },

  toast: {
    position: "top-right",
    keepOnHover: true,
    duration: 3000
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
