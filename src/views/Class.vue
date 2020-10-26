<template>
  <div class="class">
    <!-- 顶部返回栏 -->
    <div class="back">
      <div class="back-title" @click="back"><span class="arrow">◂</span><span class="title">分类</span></div>
      <div>
        <span class="iconfont icon-search" @click="searchGo"></span>
        <span class="iconfont icon-shouye" @click="indexGo"></span>  
      </div>
    </div>
    <!-- 全部频道 -->
    <div class="banner">
      <div class="left">
        <div class="shu"></div>
      <div class="h1">全部频道</div>
      </div>
    </div>
    <!-- 全部频道 -->
    <ul class="list">
      <li class="item" v-for="(item, index) in books" :key="index" @click="GoClass(index)">
        <img :src="item.data[0].img" alt="">
        <div class="desc">
          <div class="title">{{item.data[0].first}}</div>
          <div class="count">{{item.count}}本</div>
        </div>
      </li>
    </ul>


  </div>
</template>

<script>
export default {
  data(){
    return {
      books:[],
    }
  },
  mounted(){
    var txt = ['yanqing','kehuan','gudai','xuanhuan','youxi','xianxia']
    for(var i = 0;i<txt.length;i++) {
      this.axios.get('http://localhost:3000/'+txt[i]).then(res=> {
          this.books.splice(i,1,{
            data:res.data.data,
            count:res.data.data.length
          })
      });
    }
    // console.log(this.books)
  },
  methods:{
    back() {
      window.history.go(-1)
    },
    GoClass(i) {
      this.$router.push({path:'/classdetail?id='+i})
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
  .banner {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 0 0.32rem;
  height: 0.88rem;
  /* margin-top: 0.32rem; */
  justify-content: space-between;
}

.banner .left {
  display: flex;
  align-items: center;
}

.banner .shu {
  width: 0.2rem;
  height: 0.3rem;
  border-left: 0.04rem solid #ff455f;
}

.banner .h1 {
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 0.32rem;
  font-weight: 600;
}
/*  */
.back {
    font-size: 0.4rem;
    box-sizing: border-box;
    padding: 0 0.26rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #cccccc;
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

  .list {
    width: 100%;
    padding: 0.26rem;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
  }

  .item {
    display: flex;
    width: 50%;
    margin-bottom: 0.4rem;
  }

  .item img{
  width: 1.32rem;
  height: 1.76rem;
}

.desc {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 0.2rem;
}

.item .title {
  font-size: 0.35rem;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 0.2rem;
}

.item .count {
  font-size: 0.3rem;
  color: #808080;
}
</style>