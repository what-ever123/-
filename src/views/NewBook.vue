<template>
  <div class="new-book">
    <!-- 顶部返回栏 -->
    <div class="back">
      <div class="back-title" @click="back"><span class="arrow">◂</span><span class="title">新书</span></div>
      <div>
        <span class="iconfont icon-search" @click="searchGo"></span>
        <span class="iconfont icon-shouye" @click="indexGo"></span>  
      </div>
    </div>
    <!-- 书籍 -->
    <ul class="news thebooks-col">
      <li class="new thebook-col" @click="goDetail(item.id)" v-for="(item, index) in news" :key="index">
        <img :src="item.img" alt="">
        <div class="book-cell">
          <h4 class="title">{{item.title}}</h4>
          <div class="desc">{{item.introduce}}</div>
          <div class="tag">
            <div class="tag-left">
              <span class="iconfont icon-geren tag-geren"></span>
              <span class="author">{{item.author.length>3?item.author.slice(0,3)+'..':item.author}}</span>
            </div>
            <div class="tag-right">
              <div class="tag1">{{item.class.split('/')[0]}}</div>
              <div class="tag2">{{item.serial.split('|')[1] == '连载'? '新书':'已完结'}}</div>
              <div class="tag3">{{item.serial.split('|')[0].split('字')[0]}}</div>
            </div>
          </div>
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
    this.axios.get('http://localhost:3000/index/all').then(res=> {
      this.books = res.data.data
    }).catch(err=> {
      console.log(err)
    })
  },
  computed: {
    // 人气完本
    news() {
      let aaa = this.books.filter((item)=> {
        return item.tabs1 == '新书抢鲜'
      });
      return aaa
    }
  },
   methods:{
    back() {
      window.history.go(-1)
    },
    goDetail(i) {
      this.$router.push({path:'/detail?id='+i})
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
  margin-top: 0.32rem;
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

  .thebooks-col {
    width: 100%;
  }

  .thebook-col {
  box-sizing: border-box;
  padding: 0.1rem 0.26rem;
  display: flex;
}

.thebook-col img {
  width: 1.32rem;
  height: 1.76rem;
  margin-right: 0.16rem;
  display: block;
}

.thebook-col .book-cell {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.book-cell .title{
  font-size: 0.32rem;
}

.thebook-col .desc {
  color: #808080;
  font-size: 0.26rem;
  text-align: justify;
  height: 0.72rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.thebook-col .tag-geren::before {
  color: #808080;
  font-size: 0.28rem;
  margin-right: 0.06rem;
}

.thebook-col .author {
  font-size: 0.24rem;
  color: #808080;
}

.tag {
  display: flex;
  justify-content: space-between;
}

.tag-right {
  display: flex;
  align-items: center;
  font-size: 0.24rem;
  transform: scale(0.8);
}

.tag1,.tag2,.tag3 {
  border: 0.02rem solid;
  padding: 0 0.04rem;
  border-radius: 0.04rem;
  margin-left: 0.1rem;
}

.tag1 {
  border-color: #ffa100aa;
  color: #ffa100;
}

.tag2 {
  border-color: #ff3955aa;
  color: #ff3955;
}

.tag3 {
  border-color: #4284eeaa;
  color: #4284ee;
}

.tag-left {
  margin-top: -0.5rem;
}

.news {
  padding-top: 1.3rem;
}
</style>