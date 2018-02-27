<template>
  <div class="focus-view">
    <Bhead :titles="title"></Bhead>
    <article>
      <section>
        <p>伯仲会客服热线：<a href="tel:400-810-8888">400-810-8888</a></p> 
      </section>
    </article>
  </div>
</template>

<script>
import Bhead from 'base/head/head'

export default {
  data () {
    return {
      title: '联系我们'
    }
  },
  components: {
    Bhead
  }
}
</script>

<style lang="less">
.focus-view{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #f9f9f9;
  z-index: 2;
  article{
    margin-top: .1rem;
    padding: .5rem .2rem;
    background-color: #fff;
    > section > p {
      font-size: .35rem;
    }
  }
}
</style>
