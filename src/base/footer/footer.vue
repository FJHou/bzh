<template>
	<div class="footer-container">
		<div class="footer-nav">
			<router-link to="/index">
				<i class="fonticon icon-nav-hot"></i>
        <i>热门精选</i>
      </router-link>
      <router-link to="/enjoy">
      	<i class="fonticon icon-nav-life"></i>
        <i>乐享生活</i>
      </router-link>
      <router-link  to="/global">
      	<i class="fonticon icon-nav-assets"></i>
        <i>资产配置</i>
      </router-link>
      <router-link to="/mine">
      	<i class="fonticon icon-my-personal"></i>
        <i>个人中心</i>
      </router-link>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'footer-container',
  methods: {

  },
  computed: {

  }
}
</script>

<style lang="less">

.footer-container{
	width: 100%;
	height: 1.0rem;
	background: #fff;
	position: fixed;
	bottom: 0;
  right: 0;
	left: 0;
  z-index: 1;
  // box-shadow: 0 1px 1px 1px #e9e9e9;
	.footer-nav{
		display: flex;
		// padding-top: 5px;
		height: 100%;
	  a{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: #bcbcbc;
			i:first-child{
				line-height: 1;
				font-size: .6rem;
			}
			i:last-child{
				flex: 1;
				font-size: 0.26rem;
			}
		}
		.router-link-active {
		    color: #90bbef;
		}
	}
}

</style>
