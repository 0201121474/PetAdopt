<template>
  <div style="height: 630px;">
  <el-container>
    <el-header style="background-color: #393D49;">
      <div class="header">
        <div class="header-left" style="margin-left: 100px">
          <div style="margin-right: 80px;margin-left: 30px;color: white">宠物领养系统</div>
          <div>
            <el-button icon="el-icon-s-home" style="margin: 0 0px;" size="small" @click="removeIndex"  round>主页</el-button>
            <el-button icon="el-icon-s-home" style="margin: 0 0px" @click="removeShouYang" size="small" round>领养</el-button>
            <el-button icon="el-icon-s-home" style="margin: 0 0px" @click="removePetCircle" size="small" round>宠物圈</el-button>
          </div>
        </div>
        <div class="header-right" style="margin-right: 120px">
          <!--<div>
            <el-input v-model="input" placeholder="请输入内容" suffix-icon="el-icon-search" indicator-position="outside" ></el-input>
          </div>-->
          <div style="margin-left: 20px;display: flex;">
            <div v-if="this.$store.state.token===''||this.user.avatar===null">
              <img :src="this.circleUrl" alt="touxiang" style="width: 30px;height: 30px;margin-top: 15px;border-radius: 50%" @click="userdetails()" class="blog-title">
            </div>
            <div v-if="this.$store.state.token!=''&&this.user.avatar!=null">
              <img :src="this.user.avatar" alt="touxiang" style="width: 30px;height: 30px;margin-top: 15px;border-radius: 50%" @click="userdetails()" class="blog-title">
            </div>
            <el-dropdown>
              <div style="display: flex;margin-left: 10px">
                <div style="color:white;">{{this.$store.state.token===''?'用户名':user .name}}<i class="el-icon-arrow-down el-icon--right"></i></div>
              </div>
              <el-dropdown-menu slot="dropdown">
                <router-link :to="{path: '/login'}"><el-dropdown-item v-if="this.$store.state.token===''"><el-button style="border-style: none">登录</el-button></el-dropdown-item></router-link>
                <el-dropdown-item v-if="this.$store.state.token!=''"><el-button style="border-style: none" @click="userdetails()">个人中心</el-button></el-dropdown-item>
                <el-dropdown-item v-if="this.$store.state.token!=''"><el-button style="border-style: none"  @click="removeSongYang" >发布送养</el-button></el-dropdown-item>
                <el-dropdown-item v-if="this.$store.state.token!=''"><el-button style="border-style: none"   @click="removeFenXiang">发布分享</el-button></el-dropdown-item>
                <el-dropdown-item v-if="this.$store.state.token!=''"><el-button style="border-style: none" @click="removeUser">注销用户</el-button></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div v-if="this.$store.state.token!=''">
              <el-button style="border-style: none"  type="text" @click="removeUser" round small>注销</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-container>
        <el-main style="background-color: #f1f2f4;">
          <router-view></router-view>
        </el-main>
        <el-footer height="" style="background: #273444;color: #8796A8;">
          <el-row class="footer">
          </el-row>
          <div class="footer-footer">
            <div class="footer-left"><p style="font-size: 12px"></p></div>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      input: '',
      user: {
        id: '',
        username: '',
        name: '',
        avatar: ''
      },
      imgList: [
        {id: 0, idView: require('../assets/img/1.jpg')},
        {id: 1, idView: require('../assets/img/2.jpg')}
      ]
    }
  },
  methods: {
    removeFenXiang () {
      this.$router.push({
        path: '/petcircle',
        query: {
          id: this.user.id,
          username: this.user.username
        }
      })
    },
    removePetCircle () {
      this.$router.push({
        path: '/petcircle',
        query: {
          id: this.user.id,
          username: this.user.username
        }
      })
    },
    userdetails () {
      this.$router.push({
        path: '/myindex',
        query: {
          id: this.user.id,
          username: this.user.username
        }
      })
    },
    removeSongYang () {
      this.$router.push({
        path: '/songyang',
        query: {
          id: this.user.id,
          username: this.user.username
        }
      })
    },
    removeShouYang () {
      this.$router.push({
        path: '/shouyangpet',
        query: {
          id: this.user.id,
          username: this.user.username
        }
      })
    },
    removeIndex () {
      this.$router.push({
        path: '/',
        query: {
          username: this.user.username
        }
      })
    },
    removeUser () {
      this.$store.commit('set_Token', '')
    }

  },
  created () {
    const _this = this
    this.$axios.get('http://localhost:8081/user/select/' + _this.$route.query.username).then(function (resp) {
      console.log(resp)
      _this.user = resp.data
    })
  }
}</script>

<style scoped>
  .header{
    display: flex;
    justify-content: space-between;
    justify-items: center;
  }
  .header-left{
    display: flex;
  }
  .header-right{
    display: flex;
  }
  .footer{
    display: flex;
    justify-content: space-around;
  }
  .footer-footer{
    display: flex;
    justify-content: center;
  }
  .p-overflow{
    font-size: x-small;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp: 2;
  }
  .footer-right{
    display: flex;
  }
  .footer-left{
    display: flex;
    text-align: center;
  }
  .el-divider--vertical {
    display: inline-block;
    width: 1px;
    height: 10em;
    margin: 0 8px;
    vertical-align: middle;
    position: relative;
  }
  /*<!--container-->*/
  .el-header {
    background-color: #ffffff;
    color: #333;
    line-height: 60px;
    text-align: center;
  }
  .el-footer{
    background: #363b384f;
    text-align: center;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 800px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  /*Layout*/
  /*走马灯*/
  /*下拉菜单*/
  .el-dropdown-link {
    color: #409EFF;
  }
  .el-icon-arrow-down {
  }
  .blog-title:hover{
    cursor: pointer;
  }
</style>
