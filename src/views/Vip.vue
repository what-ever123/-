<template>
  <div class="vip">
    <!-- 顶部返回栏 -->
    <div class="back">
      <div class="back-title" @click="back"><span class="arrow">◂</span><span class="title">会员中心</span></div>
      <div>
        <span class="iconfont icon-search" @click="searchGo"></span>
        <span class="iconfont icon-shouye" @click="indexGo"></span>  
      </div>
    </div>
    <!-- 当前用户vip等级 -->
    <div class="user_level" style="padding-top:1.5rem">
      <p class="icon">♛</p>
      <p class="now">当前VIP等级</p>
      <p class="num">VIP{{level}}</p>
    </div>
    <!-- 等级特权 -->
    <div class="banner">等级特权</div>
    <!-- 等级特权ctt -->
    <ul class="list level_good">
      <li class="item">订阅价格优惠</li>
      <li class="item">每月赠送免费月票</li>
      <li class="item">每月VIP专享免费阅读</li>
      <li class="item">更多推荐/订阅票等</li>
    </ul>
    <!-- 等级说明 -->
    <div class="banner">等级说明</div>
    <!-- 等级说明ctt -->
    <ul class="list level_good">
      <li class="item">升级累计消费有价阅币按照过往12个自然月（计算方法如下）动态计算。</li>
      <li class="item">本月前11个自然月消费总额+当前月消费总额</li>
      <li class="item">累计消费金额的情况包括：使用有价阅币订阅、打赏、参与网站活动、购买道具等计入消费（仅限Android客户端、M站、PC平台）。</li>
      <li class="item">升级后可享受订阅优惠以及获赠更多的推荐票。</li>
    </ul>

  </div>
</template>

<script>
export default {
  data() {
    return {
      level:0
    }
  },
  mounted(){
    if(localStorage.getItem('admin')) {
      // console.log(localStorage.getItem('admin'))
      this.axios.get('http://localhost:3000/user/bookcase?user='+localStorage.getItem('admin')).then(res=> {
        // console.log(res.data.data[0])
        this.level = res.data.data[0].vip?res.data.data[0].vip:0
      })
    }
  },
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

  .user_level {
    text-align: center;
  }

  .user_level .icon {
    font-size: 1.3rem;
    color: #eaceb3;
  }

  .user_level .now {
    color: #333;
    font-size: 0.36rem;
    margin-bottom: 0.2rem;
  }
  .user_level .num {
    font-size: 0.65rem;
    font-weight: bold;
    color: #eaceb3;
  }

  .banner {
    padding: 0.26rem;
    font-size: 0.36rem;
    font-weight: bold;
    color: #333;
  }

  .list {
    padding: 0 0.26rem;
    font-size: 0.3rem;
    color: #a0a0a0;
    /* list-style: ; */
  }
  .list .item {
    padding: 0.1rem 0.2rem;
  }
</style>