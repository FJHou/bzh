<template>
	<div class="floatlayer" :class="isShow ? 'open' : 'close'" >
		<div class="floatlayer-content">
			<img src="../../assets/img/floatlayer.png" >
			<div class="float-close">
				<i class="close-circled" @click="closeFloat()">x</i>
			</div>
			<div class="float-text">
				<h2>在 线 评 估</h2>
				<h3>为 您 定 制 私 人 方 案</h3>
				<p>伯 仲 会 已 为<span> {{number}} </span> 位 用 户 免 费 评 估</p>
			</div>	
			<div class="float-injoin">
				<ul class="float-injoin-text" @click="gotoJoin()">
					<li>参</li>
					<li>与</li>
					<li>评</li>
					<li>估</li>
				</ul>
			</div>
		</div>	
		
	</div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      number: '100020',
      isShow: true
    }
  },
  methods: {
    gotoJoin () {
      alert(1)
    },
    closeFloat () {
      this.isShow = false
    }
  },
  computed: {}
}
</script>

<style lang="less">
	.floatlayer{
		position:absolute;
		top:30%;
		padding:0 0.73rem;
		.floatlayer-content{
			img{
				width:100%;
				display:block;
			}
			.float-close{
				width:100%;
				position:absolute;
				top:0.2rem;
				left:0;
				i{
					display:block;
					width:0.3rem;
					height:0.3rem;
					text-align:center;
					line-height:1;
					background:#ccc;
					color:#fff;
					border-radius:50%;
					position:absolute;
					right:1.2rem;
					font-size:.15rem;
				}
			}
			.float-text{
				width:100%;
				position:absolute;
				top:.48rem;
				left:0;
				text-align:center;
				h2{
						font-size:0.46rem;
						color:#60acf7;
				}
				h3{
						margin-top:.2rem;
						font-size:0.34rem;
						color:#333;
				}
				p{
						margin-top:.2rem;
						font-size:0.24rem;
						color:#666;
				}
			}
			.float-injoin{
				position:absolute;
				width:100%;
				height:1.283rem;
				top:2.8rem;
				left:0;
				.float-injoin-text{
					width: .7rem;
			    height: .7rem;
			    position: absolute;
			    top: 50%;
			    left: 50%;
			    margin-left: -0.55rem;
			    margin-top: -0.55rem;
			    padding: .2rem;
			    border-radius: 50%;
					li{
						font-size:0.24rem;
						float:left;
						width:50%;
						height:50%;
						text-align:center;
						line-height:1;
						color:#ea852a;
					}
				}
			}
		}
	}
	.open{
		display:block;
	}
	.close{
		display:none;
	}
</style>