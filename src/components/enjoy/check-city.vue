<template>
<div class="compselect-container" @click.stop="hideMask">
  <div class="compselectnav">
    <ul>
      <li v-for="(dicList, index) in dicLists"
          @click.stop="setDocType(index, dicList.ENTR_VAL)"
          :class="{compchecked:docTypeIndex == dicList.ENTR_VAL}"
          :key="index">
        {{dicList.ENTR_DESC}}
      </li>
    </ul>
  </div>
</div>
</template>
<script>
import dictionary from '../../assets/js/dictionary.js'
export default {
  name: 'compselect-container',
  props: ['docTypeIndex'],
  data () {
    return {
      dicLists: dictionary.cityName
    }
  },
  methods: {
    hideMask () {
      this.$emit('hideMask')
    },
    setDocType (index, val) {
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
	left: 0;
	width:33%;
	/* overflow: hidden; */
	background: #fff;
}
</style>
