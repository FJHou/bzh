<template>
  <div id="app">
    <transition name="main-silde">
      <router-view></router-view>
    </transition>
    <footerview></footerview>
    <Login></Login>
  </div>
</template>

<script>
import Login from 'components/login/login'
import footerview from 'base/footer/footer.vue'

export default {
  name: 'app',
  components: {
    Login,
    footerview
  }
}
</script>

<style lang="less">

@import '~vux/src/styles/reset.less';

.main-silde-enter-active, .main-silde-leave-active {
  transition: all .5s ease;
}

.main-silde-enter, .main-silde-leave-active {
  transform: translate3D(100%, 0, 0)
}
/* reset */
html,body,h1,h2,h3,h4,h5,h6,div,dl,dt,dd,ul,ol,li,p,blockquote,pre,hr,figure,table,caption,th,td,form,fieldset,legend,input,button,textarea,menu{margin:0;padding:0;}
header,footer,section,article,aside,nav,hgroup,address,figure,figcaption,menu,details{display:block;}
table{border-collapse:collapse;border-spacing:0;}
caption,th{text-align:left;font-weight:normal;}
html,body,fieldset,img,iframe,abbr{border:0;}
i,cite,var,address,dfn{font-style:normal;}
li{list-style:none;}
h1,h2,h3,h4,h5,h6,small{font-size:100%;}
sup,sub{font-size:83%;}
pre,code,kbd,samp{font-family:inherit;}
textarea{overflow:auto;resize:none;}
label,summary{cursor:default;}
a,button{cursor:pointer;}
h1,h2,h3,h4,h5,h6,em,strong,b{font-weight:bold;}
del,ins,a,a:hover{text-decoration:none;}
</style>
