<template>
  <div class="login">
    <!-- 顶部背景 -->
    <div class="top">
      <img src="../assets/img/login.png" alt="" />
    </div>
    <!-- logo -->
    <div class="logo">
      <div class="img">
        <img
          src="https://sta.gtimg.com/mobile/static/images/xy_icon.png"
          alt=""
        />
      </div>
    </div>
    <!-- tabs -->
    <div class="tabs">
      <div :class="['tab', { active: num == 1 }]" @click="tab(1)">登陆阅文</div>
      <div :class="['tab', { active: num == 2 }]" @click="tab(2)">注册阅文</div>
    </div>
    <!-- 登陆 -->
    <div class="denglu" v-if="num == 1">
      <!-- input部分 -->
      <div class="ipts">
        <div class="ipt">
          <span class="iconfont icon-geren"></span>
          <input id="login1" type="text" placeholder="请输入账号" />
          <span class="iconfont icon-yanjing" id="no"></span>
        </div>
        <div class="ipt">
          <span class="iconfont icon-geren"></span>
          <input id="pass" type="password" placeholder="请输入密码" />
          <span class="iconfont icon-yanjing2" @click="eye" id="eye"></span>
        </div>
      </div>
      <!-- 忘记密码 -->
      <div class="forget" @click="forget">忘记密码</div>
      <!-- 登陆按钮 -->
      <div class="btn" id="btn1" @click="login">登陆</div>
    </div>

    <!-- 注册 -->
    <div class="zhuce" v-if="num == 2">
      <!-- input部分 -->
      <div class="ipts">
        <div class="ipt">
          <span class="iconfont icon-geren"></span>
          <input id="registered1" type="text" placeholder="请输入6位数字账号" />
          <span class="iconfont icon-yanjing" id="no"></span>
        </div>
        <div class="ipt">
          <span class="iconfont icon-geren"></span>
          <input id="registered2" type="password" placeholder="请输入6位密码" />
          <span class="iconfont icon-yanjing2" id="no"></span>
        </div>
      </div>
      <!-- 忘记密码 -->
      <div class="forget">注册要求: 账号密码均为6位数字</div>
      <!-- 登陆按钮 -->
      <div class="btn" id="btn2" @click="registered">注册</div>
    </div>
    <!-- 提示 -->
    <div class="warning" id="w1">账号或密码错误</div>
    <div class="warning" id="w2">账号已存在</div>
    <div class="warning" id="w3">请按照注册要求填写</div>
    <div class="warning" id="w4">注册成功!</div>
    <div class="warning" id="w5">已清除!</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 1,
      flag: true,
      arr:[]
    };
  },
  mounted() {
    // users
    this.axios.get('http://localhost:3000/user').then(res=> {
      // console.log(res.data.data)
      this.arr = res.data.data
    }).catch(err=> {
      console.log(err)
    })
    // 自动输入
    if(localStorage.getItem('admin')) {
      var ipt1 = document.getElementById('login1')
      var ipt2 = document.getElementById('pass')
      ipt1.value = localStorage.getItem('admin')
      ipt2.value = localStorage.getItem('password')
    }
  },
  methods: {
    tab(i) {
      this.num = i;
      // console.log(i);
    },
    eye() {
      var e = document.getElementById("eye");
      var ipt2 = document.getElementById("pass");
      if (this.flag) {
        this.flag = false;
        e.classList.remove("icon-yanjing2");
        e.classList.add("icon-yanjing");
        ipt2.type = "text";
      } else {
        this.flag = true;
        ipt2.type = "password";
        e.classList.remove("icon-yanjing");
        e.classList.add("icon-yanjing2");
      }
    },
    // 注册按钮
    registered() {
      var reg = /^\d{6}$/
      var ipt1 = document.getElementById("registered1");
      var ipt2 = document.getElementById("registered2");

      var flag =  this.arr.some((item)=> item.user == ipt1.value)
      console.log(flag)

      // 验证
      if(flag) {
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
      }else if(reg.test(ipt1.value) == false || reg.test(ipt2.value) == false){
        var w3 = document.getElementById('w3')
        // 出现
        w3.style.display = 'block';
        setTimeout(function() {
          w3.style.opacity = '1'
        },1);
        // 消失
        setTimeout(function() {
          w3.style.opacity = '0'
        },1500);
        // 删除
        setTimeout(function() {
          w3.style.display = 'none'
        },2000)
      }else{
        this.axios.get(`http://localhost:3000/user/add?user=${ipt1.value}&password=${ipt2.value}`)
        // users
        this.axios.get('http://localhost:3000/user').then(res=> {
          // console.log(res.data.data)
          this.arr = res.data.data
        }).catch(err=> {
          console.log(err)
        })
        var w4 = document.getElementById('w4')
        // 出现
        w4.style.display = 'block';
        setTimeout(function() {
          w4.style.opacity = '1'
        },1);
        // 消失
        setTimeout(function() {
          w4.style.opacity = '0'
        },1500);
        // 删除
        setTimeout(function() {
          w4.style.display = 'none'
        },2000)
      }
      ipt1.value = null;
      ipt2.value = null;
    },
    // 登陆按钮
    login() {
      var ipt1 = document.getElementById("login1");
      var ipt2 = document.getElementById("pass");
      // 账号是否存在
      var flag = null
      for(var i = 0;i<this.arr.length;i++) {
        if(ipt1.value == this.arr[i].user && ipt2.value == this.arr[i].password) {
          flag = true
          // console.log(flag)
          break
        }else {
          flag = false
          // console.log(flag)
          // break
        }
      }

      if(flag) {
        localStorage.setItem('admin',ipt1.value);
        localStorage.setItem('password',ipt2.value);
        // console.log(this.$route)
        if(this.$route.query.return) {
          this.$router.push({ path: this.$route.query.return });
        }else {
          this.$router.push({ path: '/' });
        }
      }else {
        ipt1.value = null
        ipt2.value = null
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
        // console.log("账号或密码错误");
      }
    },
    forget() {
      localStorage.setItem('admin','')
      localStorage.setItem('password','')
      var w5 = document.getElementById('w5')
      // 出现
      w5.style.display = 'block';
      setTimeout(function() {
        w5.style.opacity = '1'
      },1);
      // 消失
      setTimeout(function() {
        w5.style.opacity = '0'
      },1500);
      // 删除
      setTimeout(function() {
        w5.style.display = 'none'
      },2000)
    }
  },
};
</script>

<style scoped>
.top {
  width: 100%;
  height: 1.66rem;
  z-index: -1;
}

.top img {
  width: 100%;
  height: 100%;
}

.logo {
  width: 100%;
  border-radius: 8px;
  background: #fff;
  margin-top: -7px;
  position: relative;
}

.logo .img {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 0.9rem;
  padding: 0.46rem 0;
}
.logo img {
  width: 0.9rem;
  height: 0.9rem;
}

.tabs {
  display: flex;
  /* height: 1.2rem; */
  justify-content: center;
  margin-bottom: 0.6rem;
}

.tabs .tab {
  font-size: 0.32rem;
  color: #222;
  margin: 0 0.2rem;
  position: relative;
}

.tabs .active::before {
  content: "";
  display: block;
  position: absolute;
  width: 30%;
  height: 2px;
  background: #ff3655;
  bottom: -0.1rem;
  left: 50%;
  transform: translateX(-50%);
}

.ipts {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.ipt {
  height: 50px;
  display: flex;
  align-items: center;
}

.ipt input {
  margin-left: 0.2rem;
  margin-right: 0.2rem;
  height: 0.7rem;
  width: 4.8rem;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  outline-style: none;
  box-sizing: border-box;
  padding: 5px;
}

.ipt input::placeholder {
  color: #b0b0b0;
}

.ipt .iconfont::before {
  font-size: 0.4rem;
  color: #ccc;
}

#no::before {
  color: transparent;
}

.forget {
  color: #0091de;
  font-size: 0.3rem;
  margin-left: 0.8rem;
}

.btn {
  font-size: 0.36rem;
  width: 4.9rem;
  height: 0.85rem;
  color: #fff;
  background: #ff3655;
  margin: 0.4rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
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
</style>