import { hasUToken } from 'assets/js/utils'

export const checkLogin = {
  methods: {
    checkLogin () {
      if (!hasUToken()) {
        this.$store.commit('SHOW_LOGIN_VIEW', true)
        return false
      }

      return true
    }
  }
}
