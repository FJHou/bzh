<template>
  <transition name="city-slide-zoom">
    <div class="compselect-container" @click.stop="hideMask">
      <div class="compselectnav">
        <ul>
          <li v-for="(dicList,index) in dicLists" :class="{compchecked:cationIndex == dicList.ENTR_VAL}"  @click.stop="setDocType(index, dicList.ENTR_VAL)">{{dicList.ENTR_DESC}}</li>
        </ul>
      </div>
    </div>
  </transition>
</template>
<script>
import dictionary from '../../assets/js/dictionary.js'
export default {
  name: 'compselect-container',
  props: ['cationIndex'],
  data () {
    return {
      dicLists: dictionary.cationName
    }
  },
  methods: {
    hideMask () {
      this.$emit('hideMask')
    },
    setDocType: function (index, val) {
      this.$emit('confirmSelect', index, this.dicLists, val)
    }
  }
}
</script>
<style lang="css" scoped>
@import './check.css';

.compselectnav{
	position: absolute;
	z-index: 999;
	top:0;
	left: 33%;
	width: 33%;
	/* overflow: hidden; */
	background: #fff;
}

.city-slide-zoom-enter-active, .city-slide-zoom-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform .5s cubic-bezier(0.23, 1, 0.32, 1) .1s, 
              opacity .3s cubic-bezier(0.23, 1, 0.32, 1) .1s;
  transform-origin: center top;  
}
.city-slide-zoom-enter, .city-slide-zoom-leave-active {
  opacity: 0;
  transform: scaleY(0);  
}
</style>
