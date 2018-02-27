<template>
	<div class="e-result">
		<Bhead :titles="title"></Bhead>
		<div class="e-result-text">
			<p class="e-result-img"><i ><img src="../../assets/img/smiling_face.png" style="color:#fff;"></i></p>
			<p class="e-result-s"><span>适合您的国家：<b>{{state}}</b></span></p>
			<p><span>谢谢参与!</span></p>
			<p><span>我们的规划师将与您联系!</span></p>
		</div>
	</div>
</template>

<script>
import Bhead from 'base/head/head'
export default{
  data () {
    return {
      title: '评估结果'
    }
  },
  props: {
    state: {
      type: String,
      default: '美国'
    }
  },
  components: {
    Bhead
  }
}
</script>
<style lang="less">
	.e-result{
    position: fixed;
    z-index: 3;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    overflow: hidden;
		.e-result-text{
			width:100%;
			background:#fff;
			text-align:center;
			p{
				font-size:0.3rem;
				padding-bottom:.1rem;
				color:#333;
			}
			.e-result-img{
				padding-top:0.92rem;
				padding-bottom:.4rem;
				img{
					width:0.94rem;
				}

			}
			.e-result-s{
				color:#7ba5de;
			}
		}
	}
</style>
