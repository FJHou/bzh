<template>
  <transition name="alert-fade">
  	<div class="alert-container">
  		<div class="alert-nav">
  			<p>{{alertTop }}</p>
  			<p class="alert-bottomline">{{ alertText}}</p>
  			<p class="alert-gone" @click="$emit('fireclose')">{{ alertBar}}</p>
  		</div>
  	</div>
  </transition>
</template>

<script>
export default {
  props: {
    alertTop: {
      type: String,
      required: false,
      default: function () {
        return ''
      }
    },
    alertText: {
      type: String,
      required: false,
      default: function () {
        return ''
      }
    },
    alertBar: {
      type: String,
      required: false,
      default: function () {
        return ''
      }
    }
  }
}
</script>
<style lang="less">

.alert-fade-enter-active, .alert-fade-leave-active {
  transition: all .3s ease;
}
.alert-fade-enter, .alert-fade-leave-active {
  opacity: 0;
}

.alert-container {
	z-index: 999;
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	font-size: .3rem;
	background-color: rgba(0, 0, 0, 0.3);
	.alert-nav {
		background: #fff;
		border-radius: 8px;
		position: absolute;
		left: 50%;
		top: 50%;
		width: 80%;
		height: 2.8rem;
		margin-left: -40%;
		margin-top: -2rem;
		p {
			text-align: center;
		}
		p:nth-child(1) {
			font-size: 0.28rem;
			font-weight: bold;
			color: #484848;
			margin-top: 0.5rem;
		}
		p:nth-child(2) {
			line-height: 0.88rem;
			font-size: 0.26rem;
		}
		.alert-gone {
			text-align: center;
			color: #f22f33;
			height: 0.68rem;
			line-height: 0.68rem;
		    background:#5aa5f0;
		    width: 1.5rem;
		    margin: 0 auto;
		    border-radius: 0.1rem;
		    color: #fff;
		    font-size: 0.26rem;
		}
	}
}
</style>
