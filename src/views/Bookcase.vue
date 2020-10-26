<template>
  <div class="bookcase">
    <!-- 顶部返回栏 -->
    <div class="back">
      <div class="back-title" @click="back"><span class="arrow">◂</span><span class="title">我的书架</span></div>
      <div>
        <span class="iconfont icon-search" @click="searchGo"></span>
        <span class="iconfont icon-shouye" @click="indexGo"></span>  
      </div>
    </div>
    <!-- 书架 -->
    <ul class="goods thebooks" style="padding-top:1rem;">
      <li class="thebook" @click="goDetail(item.id)" v-for="(item, index) in books" :key="index">
        <img :src="item.img">
        <div class="title">{{item.title.length > 8?item.title.substr(0,8)+'..':item.title}}</div>
        <div class="author">{{item.author.length > 3?item.author.substr(0,3)+'..':item.author}}</div>
      </li>
    </ul>
    <div class="none" v-if="books.length == 0">
      <p>书架还没有书籍哦~</p>
      <p>快去添加喜欢的书吧~</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user:null,
      data:[],
      books:[]
    }
  },
  mounted(){
    this.user = localStorage.getItem('admin');
    this.axios.get('http://localhost:3000/user/bookcase?user='+this.user).then(res=> {
      // console.log(res.data.data[0].star,666)
      // this.users = res.data.data
      this.data = res.data.data
      if(this.data[0].star) {
        // console.log(this.data[0].star)
        var id = this.data[0].star.split(',')

        for(var i = 0;i<id.length;i++) {
        this.axios.get('http://localhost:3000/detail?id='+id[i]).then(res=> {
          // console.log(res.data.data[0],333)
          this.books.push(res.data.data[0])
        })
      }
      }
      // console.log(id)
      
      // console.log(this.books)
    }).catch(err=> {
      console.log(err)
    })
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

  /*  */
  .thebook {
  width: 25%;
  box-sizing: border-box;
  padding: 0.24rem 0.16rem 0.16rem;
  font-size: 0;
}

.thebook img{
  width: 1.32rem;
  height: 1.76rem;
}

.thebook .title {
  font-size: 0.26rem;
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
  /* justify-content: space-evenly; */
  flex-wrap: wrap;
  /* overflow: auto; */
  padding-left: 0.16rem;
}

.thebooks::-webkit-scrollbar{
	display:none
}

.none {
  font-size: 0.36rem;
  color: #b0b0b0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
}
</style>