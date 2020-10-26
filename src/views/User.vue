<template>
  <div class="user">
    <!-- 顶部返回栏 -->
    <div class="back">
      <div class="back-title" @click="back"><span class="arrow">◂</span><span class="title">个人中心</span></div>
      <div>
        <span class="iconfont icon-search" @click="searchGo"></span>
        <span class="iconfont icon-shouye" @click="indexGo"></span>  
      </div>
    </div>
    <!-- user -->
    <div class="top">
      <div class="img">
        <img v-if="img == null || img == ''" src="../assets/img/default.jpg" alt="" style="width:100%;height:100%;border-radius:50%">
        <img v-else :src="img" alt="" style="width:100%;height:100%;border-radius:50%">
      </div>
      <div class="user-id">小阅书友: <span>{{(userName == null || userName == '') ? id :userName}}</span><span @click="changeName" class="iconfont icon-gaiming"></span></div>
    </div>
    <!-- 功能列表 -->
    <ul class="list">
      <li class="item" v-for="(item, index) in list" :key="index" @click="moreGo(index)">
        <div class="left">
          <span class="iconfont icon-geren"></span>
          <div class="title">{{item}}</div>
        </div>
        <span style="color:#b0b0b0">></span>
      </li>
    </ul>
    <div class="login-out" @click="loginOut">退出登陆</div>
    <!-- mask -->
    <div class="mask" v-if="showName">
      <!-- 更改用户名 -->
      <div class="changeName" v-if="showName">
        <div class="box-ipt">
          <input class="ipt" id="nameipt" type="text">
        </div>
        <div class="box-btn">
          <div class="btn" @click="cancelName">取消</div>
          <div class="btn" @click="okName">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list:['会员中心','消息中心','安全中心','帮助中心','问题反馈'],
      id:null,
      img:'',
      userName:null,
      showName:false
    }
  },
  mounted(){
    this.id = localStorage.getItem('admin')
    if(localStorage.getItem('admin')) {
      // console.log(localStorage.getItem('admin'))
      this.axios.get('http://localhost:3000/user/bookcase?user='+localStorage.getItem('admin')).then(res=> {
        // console.log(res.data.data[0])
        this.img = res.data.data[0].img
        this.userName = res.data.data[0].name
        // console.log(this.userName,666)
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
    loginOut() {
      localStorage.setItem('admin','')
      localStorage.setItem('password','')
      this.$router.push({path:'/'})
    },
    moreGo(index) {
      // console.log(index)
      index == 0 ? this.$router.push('/vip') : index == 1 ? this.$router.push('/message') : index == 2 ? this.$router.push('/safe') : index == 3 ? this.$router.push('/help') : this.$router.push('/problem')
    },
    changeName() {
      this.showName = true
    },
    cancelName() {
      this.showName = false
    },
    okName() {
      var ipt = document.getElementById('nameipt')
      // var reg = /^' '+/
      if(ipt.value.length <= 8 && ipt.value.length > 0) {
        // console.log('ok')
        this.axios.get('http://localhost:3000/user/changename?user='+localStorage.getItem('admin')+'&name='+ipt.value)
        this.userName = ipt.value
        this.showName = false
      }else if(ipt.value.length > 8){
        ipt.value = '昵  称 不 能  超 过 8 个 字 符'
      }else {
        ipt.value = '昵 称 不 能 为 空'
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
  }

  .back .iconfont {
    margin: 0 0.1rem;
  }

   .back .iconfont::before {
    font-size: 0.36rem;
    color:#fff;
  }

  .back-title {
    display: flex;
    align-items: center;
    color: #fff;
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
    color:#fff;
  }

  .user {
    background: #ff3955;
  }

  .top {
    height: 3.3rem;
    display: flex;
    /* flex-wrap: wrap; */
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }

  .img {
    width: 1.3rem;
    height: 1.3rem;
    background: rgba(0, 0, 0, .6);
    border-radius: 50%;
  }

  .user-id {
    font-size: 0.36rem;
    color: #fff;
    vertical-align: middle;
  }

  .list {
    padding: 0.26rem;
    width: 100%;
    box-sizing: border-box;
    font-size: 0.3rem;
    background: #fff;
    margin-bottom: 1rem;
  }

  .item {
    padding: 0.4rem 0.26rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .item .title {
    margin-left: 0.2rem;
    font-weight: bold;
  }

  .item .left {
    display: flex;
    align-items: center;
  }

  .item .iconfont::before {
    font-size: 0.45rem;
    color: #ff3955;
  }

  .login-out {
    font-size: 0.3rem;
    font-weight: bold;
    height: 1rem;
    line-height: 1rem;
    color: red;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ccc;
    text-align: center;
  }

  .icon-gaiming {
    margin-left: 0.2rem;
    font-size: 0.28rem;
    vertical-align: middle;
    color: rgba(0, 0, 0, .6);
  }

  .changeName {
    width: 5.5rem;
    height: 1.8rem;
    border: 1px solid #b0b0b0;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #ffffff;
    border-radius: 15px;
  }

  .box-ipt {
    box-sizing: border-box;
    /* padding: 0.4rem 0; */
    align-items: center;
    height: 60%;
    display: flex;
    justify-content: center;
  }

  .box-ipt .ipt {
    box-sizing: border-box;
    padding: 3px 8px;
    height: 25px;
    flex: 0;
  }

  .box-btn {
    color: #1a1a1a;
    height: 40%;
    display: flex;
    justify-content: space-evenly;
    font-size: 0.3rem;
    align-items: center;
  }

  .mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background:rgba(0, 0, 0, .85);
  }
</style>