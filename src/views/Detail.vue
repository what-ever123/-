<template>
<div>
  <!-- 顶部返回栏 -->
  <div class="back">
    <div class="back-title" @click="back"><span class="arrow">◂</span><span class="title">{{book.title}}</span></div>
    <div>
      <span class="iconfont icon-search" @click="searchGo"></span>
      <span class="iconfont icon-shouye" @click="indexGo"></span>  
    </div>
  </div>
  <!-- 书籍介绍部分 -->
  <div class="thebook" style="padding-top:1.3rem;">
    <img class="back-img" :src="book.img">
    <img class="img" :src="book.img" alt="">
    <div class="detail">
      <div class="title">{{book.title == undefined? '' :book.title.length>11?book.title.slice(0,11)+'..':book.title}}</div>
      <div class="author">{{book.author}}</div>
      <div class="class">{{book.class}}</div>
      <div class="serial">{{book.serial}}</div>
    </div>
  </div>
  <!-- 按钮组 -->
  <div class="choose">
    <!-- <div class="btn free">免费试读</div> -->
    <!-- <div class="btn">VIP订阅</div> -->
    <div class="btn free" @click="addbook" style="width:100%;text-align:center;" v-if="flag == '无书籍' || flag == false">加书架</div>
    <div class="btn free" @click="delbook" style="width:100%;text-align:center;" v-else>从书架移除</div>
    <!-- <div class="btn">加书单</div> -->
  </div>
  <!-- 简介 -->
  <div id="introduce" @click="introduce" v-html="ctt"></div>
  <!-- 目录横幅 -->
  <div class="banner">
    <div class="text">目录</div>
    <div class="more">
      <div class="mulu">最新章节</div>
      <div class="right">></div>
    </div>
  </div>
  <!-- 月票礼物 -->
  <ul class="gives">
    <li class="give">
      <div><span class="iconfont icon-yuepiao"></span></div>
      <div class="title">月票</div>
      <div class="desc">106票</div>
    </li>
    <li class="give">
      <div><span class="iconfont icon-yuepiao"></span></div>
      <div class="title">推荐票</div>
      <div class="desc">25票</div>
    </li>
    <li class="give">
      <div><span class="iconfont icon-liwu-"></span></div>
      <div class="title">礼物</div>
      <div class="desc">本周0人次</div>
    </li>
    <li class="give">
      <div><span class="iconfont icon-ren"></span></div>
      <div class="title">迷妹</div>
      <div class="desc">3人</div>
    </li>
  </ul>
  <!-- 书评横幅 -->
  <div class="banner">
    <div class="text">书评区</div>
  </div>
  <!-- 书评区 -->
  <div class="talk">
    <div class="none">暂无书评</div>
  </div>
  <!-- 版权信息横幅 -->
  <div class="banner">
    <div class="text">版权信息</div>
  </div>
  <!-- 版权信息 -->
  <div class="copyright" v-html="book.copyright"></div>
  <!-- 登陆 -->
  <div class="login" v-if="!user">
    <span class="login1">登录后获得更多特色功能 </span>·
    <span class="login2" @click="loginGo">立即登陆</span>
  </div>
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
    <!-- 提示 -->
    <div class="warning" id="w1">添加成功~</div>
    <div class="warning" id="w2">移除成功~</div>



</div>
</template>

<script>
export default {
  data() {
    return {
      book:[],
      user:'',
      flag:null
    }
  },
  mounted() {
    this.axios.get('http://localhost:3000/detail?id='+this.$route.query.id).then(res=> {
      // console.log(res)
      this.book=res.data.data[0]
    }).catch(err=> {
      console.log(err)
    });
    if(localStorage.getItem('admin')) {
      this.user = true
      this.axios.get('http://localhost:3000/user/bookcase?user='+localStorage.getItem('admin')).then(res=> {
        var u = res.data.data[0]
        // console.log(u.star,123)
        this.flag = u.star ? u.star.split(','):'无书籍'
        if(this.flag != '无书籍') {
          for(var i = 0;i<this.flag.length;i++) {
            this.flag = this.flag.some(item=> item == this.$route.query.id)
          }
        }
        // console.log(this.flag,'fff')
        // console.log(this.$route.query.id,'id')
      })
    }else {
      this.flag = false
    }
    
  },
  // watch:{
  //   $route: {
  //     handler(to,from) {
  //       // console.log(to,from)
  //       console.log('to:',to)
  //       console.log('from:',from)
  //     },
  //     immediate:true
  //   }
  // },
  computed: {
    ctt() {
      if(this.book.introduce) {
        var txt = this.book.introduce.replace(/\s+/g,'<br>')
      }
      return txt
    }
  },
  methods:{
    introduce() {
      var c = document.getElementById('introduce')
      if(c.style.height == 'auto') {
        c.style.height = '1.3rem'
      }else{
        c.style.height = 'auto'
      }
    },
    back() {
      window.history.go(-1)
    },
    loginGo() {
      this.$router.push({path:'/login?return=/detail?id='+this.$route.query.id})
    },
    searchGo() {
      this.$router.push({path:'/search'})
    },
    indexGo() {
      this.$router.push({path:'/'})
    },
    bookcaseGo() {
      this.$router.push({path:'/bookcase'})
    },
    vipGo() {
      this.$router.push({path:'/vip'})
    },
    helpGo() {
      this.$router.push({path:'/help'})
    },
    addbook() {
      var id = this.$route.query.id
      var s = null
      // console.log(id)
      if(localStorage.getItem('admin')) {
        var user = localStorage.getItem('admin')
        // 查询已加入书架的书
        this.axios.get('http://localhost:3000/user/bookcase?user='+user).then(res=> {
          // 如果书架没有书籍
          if(res.data.data[0].star == null || res.data.data[0].star == '') {
            this.flag = true
            this.axios.get(`http://localhost:3000/user/addbook?user=${user}&s=${id}`)
            // console.log('添加了')
            var w1 = document.getElementById('w1')
            // 出现
            w1.style.display = 'block';
            setTimeout(function() {
              w1.style.opacity = '1'
            },1);
            // 消失
            setTimeout(function() {
              w1.style.opacity = '0'
            },1500);
            // 删除
            setTimeout(function() {
              w1.style.display = 'none'
            },2000)
          } else if(res.data.data[0].star.split(',').every(item=>item != id)) {
            // 如果书架已经有书籍
            this.flag = true
            s = res.data.data[0].star + ',' + id
            this.axios.get(`http://localhost:3000/user/addbook?user=${user}&s=${s}`)
            // console.log('添加了')
            w1 = document.getElementById('w1')
            // 出现
            w1.style.display = 'block';
            setTimeout(function() {
              w1.style.opacity = '1'
            },1);
            // 消失
            setTimeout(function() {
              w1.style.opacity = '0'
            },1500);
            // 删除
            setTimeout(function() {
              w1.style.display = 'none'
            },2000)
          }
          // else {
         
          // }
        }).catch(err=> {
          console.log(err)
        })

      }
      if(localStorage.getItem('admin') == null || localStorage.getItem('admin') == '') {
        this.$router.push({path:'/login?return='+this.$route.path + '?id='+this.$route.query.id })
      }
    },
    delbook() {
      var id = this.$route.query.id
      var u = localStorage.getItem('admin')
      this.axios.get('http://localhost:3000/user/bookcase?user='+localStorage.getItem('admin')).then(res=> {
        // console.log(res.data.data[0])
        var arr = res.data.data[0].star.split(',')
        var index = arr.indexOf(id)
        arr.splice(index,1)
        this.axios.get(`http://localhost:3000/user/addbook?user=${u}&s=${arr}`)
      })
      this.flag = false
         var w2 = document.getElementById('w2')
            // 出现
            w2.style.display = 'block';
            setTimeout(function() {
              w2.style.opacity = '1'
            },1);
            // 消失
            setTimeout(function() {
              w2.style.opacity = '0'
            },1500);
            // 删除
            setTimeout(function() {
              w2.style.display = 'none'
            },2000)
    }
  }
}
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
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

  .thebook {
    display: flex;
    padding:0.26rem;
  }

  .detail {
    color: #1a1a1a;
    font-size: 0.28rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    box-sizing: border-box;
    padding: 0.2rem;
  }

  .thebook .img {
    width: 1.95rem;
    height: 2.58rem;
  }

  .detail .title {
    width: 100%;
    font-size: 0.37rem;
    color: #1a1a1a;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .detail .author {
    font-size: 0.30rem;
  }

  .choose {
    display: flex;
    justify-content: space-between;
    padding: 0 0.26rem;
    margin-top: 0.2rem;
  }

  .choose .btn {
    font-size: 0.3rem;
    border: 1px solid #cccccc;
    padding:5px 5px;
    border-radius: 2px;
    color: #1a1a1a;
  }

  .choose .free {
    color:#fff;
    background: #ff3955;
    border: 1px solid transparent;
  }

  #introduce {
    font-size: 0.33rem;
    padding: 0 0.26rem;
    color: #1a1a1a;
    text-align: justify;
    text-indent: 0.66rem;
    overflow: hidden;
    height: 1.3rem;
    /* transition: all 0.5s; */
    margin: 0.2rem 0;
  }

  .banner {
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.26rem;
    height: 0.9rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.2rem 0;
  }

  .banner .text {
    font-size: 0.37rem;
    color: #1a1a1a;
    font-weight: bold;
  }

  .banner .more {
    font-size: 0.32rem;
    color: #b0b0b0;
    display: flex;
    align-items: center;
  }

  .banner .right {
    margin-left: 0.1rem;
  }

  .gives {
    display: flex;
    /* padding: 0 0.26rem; */
    box-sizing: border-box;
  }

  .give {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: 0.3rem;
  }

  .give .iconfont::before {
    font-size: 0.5rem;
    color: #ff3955;
  }

  .give .desc {
    font-size: 0.2rem;
    color: #b0b0b0;
  }

  .talk {
    padding: 0 0.26rem;
    box-sizing: border-box;
    min-height: 1.2rem;
  }
  .none {
    width: 100%;
    height: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #b0b0b0;
    font-size: 0.26rem;
  }

  .copyright {
    font-size: 0.28rem;
    color: #808080;
    padding: 0 0.26rem;
    line-height: 0.43rem;
  }

  .login {
    width: 100%;
    font-size: 0.3rem;
    text-align:center;
    margin: 0.5rem 0;
  }

  .login1 {
    font-weight: bold;
  }

  .login2 {
    color: #4284ee;
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

.warning {
  font-size: 0.33rem;
  background: rgba(0, 0, 0, .75);
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%,-50%);
  transition: all .5s;
  display: none;
  padding: 3px 8px;
  border-radius: 10px;
  color: #fff;
  opacity: 0;
}

.thebook {
  position: relative;
}

.back-img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  filter: blur(30px);
  z-index: -1;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>