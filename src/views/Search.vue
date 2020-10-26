<template>
  <div>
    <div class="search">
      <div class="top">
        <span class="iconfont icon-search"></span>
        <input type="text" id="ipt" v-on:input="search" v-model="txt" autofocus="autofocus" placeholder="搜索书名/作者">
      </div>
      <div class="cancel" @click="back">取消</div>
    </div>

    <!-- 书籍 -->
    <ul class="news thebooks-col" v-if="txt">
      <li class="new thebook-col" @click="goDetail(item.id)" v-for="(item, index) in books" :key="index">
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
              <div class="tag2">{{item.serial.split('|')[1] == '连载'? '连载中':'已完结'}}</div>
              <div class="tag3">{{item.serial.split('|')[0].split('字')[0]}}</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- 查找不到时 -->
    <div v-if="txt.length !=0 && len == 0" class="none">
      <p>暂无此书资源,</p>
      <p>过段时间再来试试吧!</p>
    </div>
    <!-- 大家都在搜 -->
    <div class="people" v-if="txt == ''">
      <p>大家都在搜</p>
      <div class="people-tags">
        <div class="people-tag" @click="remove" v-for="(item, index) in dajia" :key="index">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books:[],
      timeId:'',
      txt:'',
      len:1,
      dajia:['我家大佬不对劲儿','反派宿主是大佬','神卦宠妃','好想住你隔壁','许你万丈光芒好'],
      fangdou:(val) => {
        clearTimeout(this.timeId)
        this.timeId = setTimeout(() => {
          if(val != '') {
            this.axios.get('http://localhost:3000/search?txt='+val).then(res=> {
              this.len = res.data.data.length
              this.books = res.data.data
            }).catch(err=> {
              console.log(err)
            })
          }
        }, 1000)
      }
    }
  },
  // mounted(){
  // },
  methods:{
    search() {
      var ipt = document.getElementById('ipt');
      this.len = 1
      this.fangdou(ipt.value)
      if(this.txt == '') {
        this.books = []
      }
    },
    remove(e) {
      this.txt = e.target.innerHTML
      this.fangdou(this.txt)
    },
    back() {
      window.history.go(-1)
    },
    goDetail(i) {
      this.$router.push({path:'/detail?id='+i})
    },
  }
}
</script>

<style scoped>
  .search {
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .top {
    display: flex;
    width: 75%;
    height: 0.7rem;
    position: relative;
  }

  .top #ipt{
    width: 100%;
    height: 100%;
    border: 0;
    box-sizing: border-box;
    padding: 3px 3px 3px 30px;
  }

  .top .iconfont {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
  }

  .top .iconfont::before {
    color: #a0a0a0;
    font-size: 0.46rem;
  }

  .cancel {
    font-size: 0.33rem;
    color: red;
  }

  .thebooks-col {
    width: 100%;
  }

  .thebook-col {
  box-sizing: border-box;
  padding: 0.32rem;
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
.none {
  font-size: 0.36rem;
  color: #b0b0b0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.people {
  padding: 0 0.26rem;
  font-size: 0.36rem;
  color: #b0b0b0;
}

.people-tags {
  display: flex;
  flex-wrap: wrap;
  padding-top:0.3rem;
}

.people-tag {
  border: 1px solid #b0b0b0;
  padding: 0 8px;
  border-radius: 10px;
  margin: 0.1rem;
}

#ipt::placeholder {
  color: #b0b0b0;
}
</style>