<template>
  <div class="message">
     <!-- 顶部返回栏 -->
    <div class="back">
      <div class="back-title" @click="back"><span class="arrow">◂</span><span class="title">问题反馈</span></div>
      <div>
        <span class="iconfont icon-search" @click="searchGo"></span>
        <span class="iconfont icon-shouye" @click="indexGo"></span>  
      </div>
    </div>
    <!-- 暂无消息 -->
    <div class="none">暂无内容</div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      window.history.go(-1)
    },
    searchGo() {
      this.$router.push({path:'/search'})
    },
    indexGo() {
      this.$router.push({path:'/'})
    },
  }
}
</script>

<style scoped>
  .back {
    font-size: 0.4rem;
    box-sizing: border-box;
    padding: 0 0.26rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    background: #fff;
    width: 100%;
    z-index: 10;
    border-bottom: 1px solid #e0e0e0;
    box-shadow: 0px -11px 20px 0px #9E9E9E;
}

  .back .iconfont {
    margin: 0 0.1rem;
  }

   .back .iconfont::before {
    font-size: 0.36rem;
    color:#ff3955;
  }

  .back-title {
    display: flex;
    align-items: center;
    color: #333;
  }

  .back-title .title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 4.4rem;
  }

  .back .arrow {
    font-size: 0.7rem;
    margin-right: 0.1rem;
    color:#ff3955;
  }

  .none {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 0.36rem;
    color: #b0b0b0;
  }
</style>