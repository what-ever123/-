<template>
  <div class="index">
    <!-- 顶部 -->
    <div class="top">
      <div class="logo"><img src="https://qidian.gtimg.com/readnovelm/img/logo-rnm-a6ba5ab624.svg" alt=""></div>
      <div class="top-r">
        <div class="user"><span class="iconfont icon-geren" @click="userGo"></span></div>
        <div class="books"><span class="iconfont icon-bookrack" @click="bookcaseGo"></span></div>
      </div>
    </div>
    <!-- 轮播区域 -->
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in arr2" :key="index">
              <img :src="item.img" alt="" width="100%">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
    </div>
    <!-- 搜索 -->
    <div class="search" @click="searchGo">
      <div>
        <span class="iconfont icon-search"></span>
        <span>建设大时代</span>
      </div>
    </div>
    <!-- tabs -->
    <ul class="tabs">
      <li class="tab" @click="fenleiGo">
        <span class="iconfont icon-leimupinleifenleileibie"></span>
        <p>分类</p>
      </li>
      <li class="tab" @click="paihangGo">
        <span class="iconfont icon-paixingbang"></span>
        <p>排行榜</p>
      </li>
      <!-- <li class="tab" @click="fuliGo">
        <span class="iconfont icon-liwu-"></span>
        <p>福利</p>
      </li> -->
      <li class="tab" @click="xinshuGo">
        <span class="iconfont icon-xinshutuijian"></span>
        <p>新书</p>
      </li>
      <li class="tab" @click="wanbenGo">
        <span class="iconfont icon-shu"></span>
        <p>完本</p>
      </li>
    </ul>
    <!-- 本期强推 -->
    <div class="banner" style="margin-top:0;">
      <div class="left">
        <div class="shu"></div>
      <div class="h1">本期强推</div>
      </div>
    </div>
    <!-- 强推 -->
    <ul class="goods thebooks">
      <li class="thebook" @click="goDetail(item.id)" v-for="(item, index) in arr1" :key="index">
        <img :src="item.img">
        <div class="title">{{item.title.length > 8?item.title.substr(0,8)+'..':item.title}}</div>
        <div class="author">{{item.author.length > 3?item.author.substr(0,3)+'..':item.author}}</div>
      </li>
    </ul>
    <!-- 新书抢鲜 -->
    <div class="banner">
      <div class="left">
        <div class="shu"></div>
        <div class="h1">新书抢鲜</div>
      </div>
      <div class="more" @click="xinshuGo">更多></div>
    </div>
    <!-- 新书抢鲜 -->
    <ul class="news thebooks-col">
      <li class="new thebook-col" @click="goDetail(item.id)" v-for="(item, index) in arr3" :key="index">
        <img :src="item.img" alt="">
        <div class="book-cell">
          <h4 class="title">{{item.title}}</h4>
          <div class="desc">{{item.introduce}}</div>
          <div class="tag">
            <div class="tag-left">
              <span class="iconfont icon-geren tag-geren"></span>
              <span class="author">{{item.author}}</span>
            </div>
            <div class="tag-right">
              <div class="tag1">{{item.class.split('/')[0]}}</div>
              <div class="tag2">{{item.serial.split('|')[1] == '连载'? '连载中':'已完结'}}</div>
              <div class="tag3">{{item.serial.split('|')[0].split('字')[0]}}</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
     <!-- 限时免费 -->
    <div class="banner">
      <div class="left">
        <div class="shu"></div>
        <div class="h1">限时免费</div>
      </div>
      <div class="time">
        <div class="time-day thetime">{{day}}</div>
        <div class="time-hour thetime">{{hour}}</div>
        <div class="time-minute thetime">{{min}}</div>
        <div class="time-second thetime">{{second}}</div>
      </div>
    </div>
    <!-- 限时免费 -->
    <ul class="goods thebooks">
      <li class="thebook" @click="goDetail(item.id)" v-for="(item, index) in arr4" :key="index">
        <div class="mianfei">
          <div class="mf">限免</div>
          <img :src="item.img">
        </div>
        <div class="title">{{item.title.length > 8?item.title.substr(0,8)+'..':item.title}}</div>
        <div class="author">{{item.author.length > 3?item.author.substr(0,3)+'..':item.author}}</div>
      </li>
    </ul>
    <!-- 编辑推荐 -->
    <div class="banner">
      <div class="left">
        <div class="shu"></div>
      <div class="h1">编辑推荐</div>
      </div>
    </div>
    <!-- 编辑推荐 -->
    <ul class="goods thebooks">
      <li class="thebook" @click="goDetail(item.id)" v-for="(item, index) in arr5" :key="index">
        <img :src="item.img">
        <div class="title">{{item.title.length > 8?item.title.substr(0,8)+'..':item.title}}</div>
        <div class="author">{{item.author.length > 3?item.author.substr(0,3)+'..':item.author}}</div>
      </li>
    </ul>
    <!-- 排行榜 -->
    <div class="banner">
      <div class="left">
        <div class="shu"></div>
        <div class="h1">排行榜</div>
      </div>
      <div class="more" @click="paihangGo">更多></div>
    </div>
    <!-- 排行榜tab -->
    <ul class="tab-col">
      <li class="tab-item" v-for="(item, index) in paihang_arr" :key="index" @click="paihang_tab(index)" :class="{'tab-item-active':index == paihang}">{{item}}</li>
    </ul>
    <!-- 排行榜内容 -->
    <ul class="goods thebooks">
      <li class="thebook" @click="goDetail(item.id)" v-for="(item, index) in paihang_ctt" :key="index">
        <img :src="item.img">
        <div class="title">{{item.title.length > 8?item.title.substr(0,8)+'..':item.title}}</div>
        <div class="author">{{item.author.length > 3?item.author.substr(0,3)+'..':item.author}}</div>
      </li>
    </ul>
    <!-- 分类推荐 -->
    <div class="banner">
      <div class="left">
        <div class="shu"></div>
        <div class="h1">分类推荐</div>
      </div>
      <div class="more" @click="fenleiGo">更多></div>
    </div>
    <!-- 分类推荐tab1 -->
    <ul class="tab-col">
      <li class="tab-item" v-for="(item, index) in fenlei1_arr" :key="index" :class="{'tab-item-active':fenlei1 == index}" @click="fenlei1_tab(index)">{{item}}</li>
    </ul>
    <!-- 分类推荐内容1 -->
    <ul class="goods thebooks">
      <li class="thebook" @click="goDetail(item.id)" v-for="(item, index) in feilei1_ctt" :key="index">
        <img :src="item.img">
        <div class="title">{{item.title.length > 8?item.title.substr(0,8)+'..':item.title}}</div>
        <div class="author">{{item.author.length > 3?item.author.substr(0,3)+'..':item.author}}</div>
      </li>
    </ul>
    <div style="width:100%;height:0.2rem;"></div>
    <!-- 分类推荐tab2 -->
    <ul class="tab-col">
      <li class="tab-item" v-for="(item, index) in fenlei2_arr" :key="index" :class="{'tab-item-active':fenlei2 == index}" @click="fenlei2_tab(index)">{{item}}</li>
    </ul>
    <!-- 分类推荐内容2 -->
    <ul class="goods thebooks">
      <li class="thebook" @click="goDetail(item.id)" v-for="(item, index) in feilei2_ctt" :key="index">
        <img :src="item.img">
        <div class="title">{{item.title.length > 8?item.title.substr(0,8)+'..':item.title}}</div>
        <div class="author">{{item.author.length > 3?item.author.substr(0,3)+'..':item.author}}</div>
      </li>
    </ul>
    <!-- 人气完本 -->
    <div class="banner">
      <div class="left">
        <div class="shu"></div>
        <div class="h1">人气完本</div>
      </div>
      <div class="more" @click="wanbenGo">更多></div>
    </div>
    <!-- 人气完本 -->
    <ul class="news thebooks-col">
      <li class="new thebook-col" @click="goDetail(item.id)" v-for="(item, index) in arr6" :key="index">
        <img :src="item.img" alt="">
        <div class="book-cell">
          <h4 class="title">{{item.title}}</h4>
          <div class="desc">{{item.introduce}}</div>
          <div class="tag">
            <div class="tag-left">
              <span class="iconfont icon-geren tag-geren"></span>
              <span class="author">{{item.author}}</span>
            </div>
            <div class="tag-right">
              <div class="tag1">{{item.class.split('/')[0]}}</div>
              <div class="tag2">{{item.serial.split('|')[1] == '连载'? '连载中':'已完结'}}</div>
              <div class="tag3">{{item.serial.split('|')[0].split('字')[0]}}</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- 底部 -->
    <div class="floor">
      <ul class="floor-tabs">
        <li class="floor-tab" @click="bookcaseGo">书架</li>
        <li class="floor-tab" @click="vipGo">VIP</li>
        <li class="floor-tab" @click="helpGo">帮助</li>
        <li class="floor-tab">客户端</li>
      </ul>
      <p class="floor-desc">copyright © 2002-2020 m.readnovel.com</p>
    </div>




  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  data() {
    return {
      arr1:[],//强推
      arr2:[],//轮播图
      arr3:[],//新书抢鲜
      arr4:[],//限时免费
      arr5:[],//编辑推荐
      // arr6:[],//人气完本
      day: '00',
      hour: '00',
      min: '00',
      second: '00',
      countTime: 172800,
      interval: '',
      toLiveBtn: '计时点击事件',
      paihang:0,
      fenlei1:0,
      fenlei2:0,
      paihang_arr:['热销榜','点击榜','新书榜','完本榜'],
      fenlei1_arr:['现代言情','古代言情','豪门总裁','玄幻言情'],
      fenlei2_arr:['穿越架空','仙侠奇缘','青春灵异','科幻网游'],
      all:[],
    }
  },
  mounted() {
    // 获取轮播图片
    this.axios.get('http://localhost:3000/index-img').then(res=> {
      // console.log(res.data.data);
      this.arr2 = res.data.data;
    }).catch(err=> {
      console.log(err)
    });
    setTimeout(function() {
      new Swiper('.swiper-container', {
              autoplay: 4000,//可选选项，自动滑动
              pagination:'.swiper-pagination',
              // direction : 'horizontal',
              loop:true,
          })
    },200);

    // 全部
    this.axios.get('http://localhost:3000/index/all').then(res=> {
      this.all = res.data.data;
      // console.log(111,this.all);
    }).catch(err=> {
      console.log(err)
    });

    // 本期强推
    this.axios.get('http://localhost:3000/index/qiangtui').then(res=> {
      // console.log(res.data.data);
      this.arr1 = res.data.data
    }).catch(err=> {
      console.log(err)
    });
    
    // 新书抢鲜
    this.axios.get('http://localhost:3000/index/xinshu').then(res=> {
      // console.log(res.data.data);
      this.arr3 = res.data.data
    }).catch(err=> {
      console.log(err)
    });

    // 限时免费
    this.axios.get('http://localhost:3000/index/mianfei').then(res=> {
      // console.log(res.data.data);
      this.arr4 = res.data.data
    }).catch(err=> {
      console.log(err)
    });

    // 编辑推荐
    this.axios.get('http://localhost:3000/index/bianji').then(res=> {
      // console.log(res.data.data);
      this.arr5 = res.data.data
    }).catch(err=> {
      console.log(err)
    });

   this.countdown()
  },
  methods:{
      fenleiGo() {
        this.$router.push({path:'/class'})
      },
      paihangGo() {
        this.$router.push({path:'/top'})
      },
      fuliGo() {
        this.$router.push({path:'/class'})
      },
      xinshuGo() {
        this.$router.push({path:'/newbook'})
      },
      wanbenGo() {
        this.$router.push({path:'/done'})
      },
      searchGo() {
        this.$router.push({path:'/search'})
      },
      bookcaseGo() {
        this.$router.push({path:'/bookcase'})
      },
      userGo() {
        this.$router.push({path:'/user'})
      },
      helpGo() {
        this.$router.push({path:'/help'})
      },
      vipGo() {
        this.$router.push({path:'/vip'})
      },
      // 倒计时事件
      countdown() {
        const that = this
        that.interval = setInterval(() => {
          if(that.countTime == 0) {
              // 计时结束，清除缓存
              clearInterval(that.interval)
            } else {
              that.countTime--
              let day = parseInt(that.countTime / 60 / 60 / 24)
              let hr = parseInt(that.countTime / 60 / 60 % 24)
              let min = parseInt(that.countTime / 60 % 60)
              let sec = parseInt(that.countTime % 60)

              this.day = day > 9 ? day : '0' + day
              this.hour = hr > 9 ? hr : '0' + hr
              this.min = min > 9 ? min : '0' + min
              this.second = sec > 9 ? sec : '0' + sec
            }
        }, 1000);
      },
      fenlei1_tab(index) {
        this.fenlei1 = index
      },
      fenlei2_tab(index) {
        this.fenlei2 = index
      },
      paihang_tab(index) {
        this.paihang = index
      },
      goDetail(i) {
        this.$router.push({path:'/detail?id='+i})
      }
  },
  computed:{
    // 首页分类1
    paihang_ctt() {
      let text = this.paihang == 0? '热销榜':this.paihang == 1?'点击榜':this.paihang == 2?'新书榜':'完本榜'
      return this.all.filter(item=> {
        return (item.ranking == text)
      })
    },
    // 首页分类1
    feilei1_ctt() {
      let text = this.fenlei1 == 0? '现代言情':this.fenlei1 == 1?'古代言情':this.fenlei1 == 2?'豪门世家':'玄幻言情'
      return this.all.filter(item=> {
        return (item.first == text || item.second == text)
      })
    },
    // 首页分类2
    feilei2_ctt() {
      let text2 = this.fenlei2 == 0? '时空穿梭':this.fenlei2 == 1?'仙侠奇缘':this.fenlei2 == 2?'都市异能':'游戏竞技'
      return this.all.filter(item=> {
        return (item.first == text2 || item.second == text2)
      })
    },
    // 人气完本
    arr6() {
      let aaa = this.all.filter((item)=> {
        return item.serial.split('|')[1] == '完结'
      });
      return aaa.filter((item, index)=> {
        return index < 4
      })
    }
  }
}
</script>

<style scoped>
  .top {
    width: 100%;
    height: 1.08rem;
    padding: 0.22rem 0 0.2rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: -0.3rem;
    margin-bottom: 0.1rem;
  }

  .logo {
    padding: 0 0.32rem;
  }

  .logo img {
    width: 1.8rem;
    height: 0.36rem;
  }

  .top-r {
    display: flex;
  }

  .top-r .books {
    margin: 0 0.3rem 0 0.36rem;
  }

  .iconfont::before {
    color: #ff455f;
    font-size: 0.36rem;
  }
  
.swiper-container {
  width: 7rem;
  height:  2.72rem;
  /* margin-bottom: 0.2rem; */
  border-radius: 0.1rem;
}

.swiper-container img{
  display: block;
  margin: 0 auto;
  width: 99.5%;
  height:  100%;
  border-radius: 0.1rem;
}

/deep/ .swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction {
  bottom: -0.1rem;
}

/deep/ .swiper-pagination-bullet {
  width:0.1rem;
  height: 0.1rem;
}

/deep/ .swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet {
  margin: 0 0.1rem;
}

/deep/ .swiper-pagination-bullet-active {
  background: #ff455f;
}

.search {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0.12rem 0rem 0.12rem;
  height: 0.64rem;
}

.search div {
  display: flex;
  align-items: center;
  font-size: 0.26rem;
  color: #808080;
}

.icon-search::before {
  margin-right: 0.1rem;
  font-size: 0.26rem;
  color: #808080;
}

.tabs {
  box-sizing: border-box;
  padding: 0 0.2rem;
  width: 100%;
  height: 1.04rem;
  display: flex;
}

.tab {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}

.tab span,.tab p {
  width: 100%;
  text-align: center;
  font-size: 0.24rem;
  color:#1a1a1a;
}

.tab .iconfont::before {
  font-size: 0.5rem;
}

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

.banner .more {
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 0.26rem;
  color:#808080;
  align-self: flex-end;
}

.thebook {
  width: 1.64rem;
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
  flex-wrap: nowrap;
  overflow: auto;
  padding-left: 0.16rem;
}

.thebooks::-webkit-scrollbar{
	display:none
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

.banner .time {
  display: flex;
  align-items: center;
}

.time .thetime {
    width: 0.38rem;
    height: 0.38rem;
    line-height: 0.38rem;
    text-align: center;
    color: #ffffff;
    background: #d8d8d8;
    border-radius: 0.06rem;
    position: relative;
    margin-left: 0.12rem;
    font-size: 0.24rem;
}

.time-hour::before, .time-minute::before, .time-second::before {
    content: '';
    position: absolute;
    width: 0.02rem;
    height: 0.04rem;
    border-radius: 0.02rem;
    background-color: grey;
    top: 0;
    bottom: 0;
    margin: auto;
    left: -0.06rem;
    box-shadow: 0 0.1rem grey;
    transform: translateY(-0.06rem);
}

.mianfei {
  position: relative;
  overflow: hidden;
}

.mf {
    width: 1rem;
    height: 0.28rem;
    line-height: 0.28rem;
    text-align: center;
    font-size: 0.24rem;
    position: absolute;
    top: 0.08rem;
    left: -0.24rem;
    background: #4284ee;
    transform: rotate(-42deg);
    color: #ffffff;
}

.tab-col {
  display: flex;
  width: 92%;
  margin: 0 auto;
}

.tab-item {
  width: 25%;
  /* box-sizing: border-box; */
  text-align: center;
  border: 0.02rem solid #ff3955;
  border-left:0;
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.26rem;
  color: #ff3955;
}


.tab-col .tab-item:first-child {
  border-left: 0.02rem solid #ff3955;
  border-radius: 0.1rem 0 0 0.1rem;
}

.tab-col .tab-item:last-child {
  border-radius: 0 0.1rem 0.1rem 0;
}

.tab-item-active {
  background: #ff3955;
  color:#ffffff;
}

.floor {
  margin-top: 0.4rem;
}

.floor-tabs {
  display: flex;
  justify-content: space-evenly;
}

.floor-tab {
  color: #1a1a1a;
  font-size: 0.28rem;
}

.floor-desc {
  color: #808080;
  font-size: 0.24rem;
  width: 100%;
  text-align: center;
  margin: 0.3rem 0;
}

.tag-left {
  margin-top: -0.5rem;
}
</style>