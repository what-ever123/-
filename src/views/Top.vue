<template>
  <div class="top">
    <!-- 顶部返回栏 -->
    <div class="back">
      <div class="back-title" @click="back"><span class="arrow">◂</span><span class="title">排行榜</span></div>
      <div>
        <span class="iconfont icon-search" @click="searchGo"></span>
        <span class="iconfont icon-shouye" @click="indexGo"></span>  
      </div>
    </div>
    <!-- 排行部分 -->
    <div class="top-ctt">
      <!-- tabs -->
      <ul class="class" style="width:0.7rem">
        <li :class="['class-item',{'class-active':index == tab}]" v-for="(item, index) in class1" :key="index" @click="tabChange(item,index)">{{item}}</li>
      </ul>
      <!-- 排行 -->
      <ul class="goods thebooks">
        <li class="thebook" @click="goDetail(item.id)" v-for="(item, index) in paihang_ctt" :key="index">
          <div class="mianfei">
            <div :class="['mf',{'the-one':index == 0},{'the-two':index == 1},{'the-three':index == 2}]" v-if="index < 3">{{index == 0? '第一名':index == 1?'第二名':'第三名'}}</div>
            <img :src="item.img">
          </div>
          <div class="left">
            <div class="title">{{item.title.length > 10?item.title.substr(0,10)+'..':item.title}}</div>
            <div class="author">{{item.author.length > 3?item.author.substr(0,3)+'..':item.author}}</div>
          </div>
          
        </li>
      </ul>
    </div>
    


  </div>
</template>

<script>
export default {
  data() {
    return {
      class1:['热销榜','点击榜','新书榜','完本榜'],
      text:'热销榜',
      tab:0,
      all:[]
    }
  },
  mounted() {
    this.axios.get('http://localhost:3000/index/all').then(res=> {
      // console.log(res)
      this.all = res.data.data
    })
  },
  methods:{
    tabChange(txt,i) {
      this.tab = i
      this.text = txt
    },
    back() {
      window.history.go(-1)
    },
    searchGo() {
      this.$router.push({path:'/search'})
    },
    indexGo() {
      this.$router.push({path:'/'})
    },
    goDetail(i) {
      this.$router.push({path:'/detail?id='+i})
    },
  },
  computed: {
    // 首页分类1
    paihang_ctt() {
      // let txt = this.text == 0? '热销榜':this.text == 1?'点击榜':this.text == 2?'新书榜':'完本榜'
      return this.all.filter(item=> {
        return (item.ranking == this.text)
      })
    },
  }
}
</script>

<style scoped>
  /*  */
.back {
    font-size: 0.4rem;
    box-sizing: border-box;
    padding: 0 0.26rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* border-bottom: 1px solid #cccccc; */
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

  .top-ctt {
    font-size: 0.3rem;
    font-weight: bold;
    padding-top: 0.26rem;
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 1rem;
    bottom: 0;
    overflow: hidden;
  }

  .class .class-item {
    padding: 0 0.26rem;
    margin:0 0 1rem 0;
    border-left: 2px solid transparent;
  }

  .class .class-active {
    border-left: 2px solid #ff3955;
  }

  /*  */
  .thebook {
  box-sizing: border-box;
  padding: 0.24rem 0.16rem 0.16rem;
  font-size: 0;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
}

.thebook img{
  width: 1.32rem;
  height: 1.76rem;
}

.thebook .title {
  font-size: 0.3rem;
  color: #1a1a1a;
  margin: 0.16rem 0 0.08rem;
  min-height: 0.68rem;
}

.thebook .author {
  font-size: 0.24rem;
  color: #808080;
}

.thebooks {
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  padding-left: 0.16rem;
}

.thebook .left {
  margin-left: 0.4rem;
}


/*  */
.mf {
  width: 2rem;
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: center;
  font-size: 0.24rem;
  position: absolute;
  top: 1.08rem;
  left: -0.3rem;
  background: #4284ee;
  /* transform: rotate(0deg); */
  color: #ffffff;
}

.mianfei {
  position: relative;
  overflow: hidden;
}

.the-one {
  background: #CC0000;
}
.the-two {
  background: #FF3333;
}
.the-three {
  background: #FF3366;
}
</style>