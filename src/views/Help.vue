<template>
  <div class="help">
     <!-- 顶部返回栏 -->
    <div class="back">
      <div class="back-title" @click="back"><span class="arrow">◂</span><span class="title">帮助中心</span></div>
      <div>
        <span class="iconfont icon-search" @click="searchGo"></span>
        <span class="iconfont icon-shouye" @click="indexGo"></span>  
      </div>
    </div>
    <div class="banner"></div>
    <!-- 帮助栏 -->
    <div class="helps" v-for="(item, index) in list" :key="index">
      <div class="title" @click="showCtt(index,item.desc.length)">{{item.title}}<span class="h-arrow" :style="'transform: translateY(-50%) rotate('+item.r+'deg);'">▾</span></div>
      <ul class="list" :style="'height:'+item.h+';'">
        <li class="item" v-for="(item2, index2) in item.desc" :key="index2">{{item2}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list:[{
        title:'小说阅读网账号体系更新公告',
        desc:['小说阅读网账号体系更新公告'],
        h:0,
        r:0
      },{
        title:'账户',
        desc:['为什么登录不成功？','为什么找回密码提示用户名不存在？','为什么选择手机短信登录后我的资产都没有了？','为什么我的账号变了？','为什么我的昵称不能修改？','收不到手机短信验证码怎么办？'],
        h:0,
        r:0
      },{
        title:'阅读',
        desc:['为什么我正在看的书看不了了？','为什么阅读VIP章节都要订阅？','章节内容显示不全？','为什么书架上的书找不到？'],
        h:0,
        r:0
      },{
        title:'充值',
        desc:['Android如何充值阅币？','iOS如何充值阅币？','阅币与人民币汇率？','充值阅币不到账怎么办？','什么是小阅阅币赠币？','如何查询小阅阅币赠币以及使用期限？','小阅阅币赠币的使用范围？'],
        h:0,
        r:0
      },{
        title:'订阅',
        desc:['订阅收费标准','订阅失败','阅币与人民币汇率？','什么是自动订阅下一章？'],
        h:0,
        r:0
      },{
        title:'赠送礼物',
        desc:['什么是赠送礼物？','赠送礼物规则'],
        h:0,
        r:0
      },{
        title:'月票',
        desc:['什么是月票？','如何获得月票？','月票的使用方法？','月票有有效期吗？','月票使用有数量限制吗？','月票的监管规则？'],
        h:0,
        r:0
      },{
        title:'推荐票',
        desc:['什么是推荐票？','推荐票如何获得？','推荐票的使用方法？','推荐票有有效期吗？','推荐票有使用数量限制吗？','推荐票的监管规则？'],
        h:0,
        r:0
      },{
        title:'VIP等级',
        desc:['什么是VIP等级？','VIP等级用户有哪些特权？','如何提升VIP等级？'],
        h:0,
        r:0
      },{
        title:'迷妹等级',
        desc:['什么是迷妹值？','迷妹值如何晋级？','迷妹值等级与称号','迷妹榜'],
        h:0,
        r:0
      },{
        title:'如何成为作家',
        desc:['如何成为作家'],
        h:0,
        r:0
      },{
        title:'会员业务',
        desc:['会员业务'],
        h:0,
        r:0
      },{
        title:'联系客服',
        desc:['联系客服'],
        h:0,
        r:0
      },{
        title:'如何申请发票',
        desc:['如何申请发票'],
        h:0,
        r:0
      }],
      show:-1,
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
    showCtt(i,len) {
      var rem = len * 0.6 + 'rem'
      // console.log(rem)
      if(this.show != i) {
        this.show = i
        this.list[i].h = rem
        this.list[i].r = 180
      }else {
        this.show = -1
        this.list[i].h = 0
        this.list[i].r = 0
      }
    }
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

  .banner {
    width: 100%;
    height: 1.3rem;
  }

  .helps {
    width: 100%;
    box-sizing: border-box;
    padding: 0.26rem 0.4rem;
  }

  .helps .title {
    font-size: 0.3rem;
    color: #1a1a1a;
    font-weight: bold;
    position: relative;
    overflow: hidden;
  }

  .helps .h-arrow {
    width: 10px;
    height: 10px;
    font-size: 0.36rem;
    color: #b0b0b0;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%) rotate(0deg);
    transition: all 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .h-arrow-active {
    transform: translateY(-50%) rotate(180deg);
  }

  .list {
    font-size: 0.3rem;
    color: #1a1a1a;
    padding: 0 0.2rem;
    height: 0;
    overflow: hidden;
    transition: all 0.25s;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}

  .list .item {
    padding: 0.1rem 0;
    height: 0.3rem;
    color: #4284ee;
  }
</style>