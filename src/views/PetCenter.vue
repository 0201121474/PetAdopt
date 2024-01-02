<template>
  <div style="height: 630px;">
    <!--轮播图-->
<!--    <div>-->
<!--      <el-carousel  height="500px" autoplay>-->
<!--        <el-carousel-item v-for="item in imgList" :key="item.id">-->
<!--          <img :src="item.idView">-->
<!--        </el-carousel-item>-->
<!--      </el-carousel>-->
<!--    </div>-->
    <!--轮播图下面的内容-->
    <div style="display: flex;justify-content: space-around;; height: 570px;">
      <!--左边领养内容-->
      <div>
        <div style="text-align: left">
          <h3>最新领养</h3>
        </div>
        <el-divider></el-divider>
        <!--eslint-disable-next-line--><!--<div v-for="blog in blogs" style="width: 600px;">-->
        <div v-for="(blog, index) in blogs" v-if="index < 3" style="width: 600px;">
          <div style="display:flex;background-color: white;padding: 10px;margin-bottom: 10px;">
            <div style="margin-right: 10px;">
              <router-link :to="{path: '/xiangqing'}">
                <img :src="blog.images[0]" style="width: 100px;height: 110px;" alt="">
              </router-link>
            </div>
            <div>
              <div style="display: none;">{{blog.id}}</div>
              <div style="text-align: left;;margin-top: -15px;color: slategray;" @click="blogdetails(blog.id,blog.userId)" class="blog-title"><h4>{{blog.title}}</h4></div>
              <div style="display:flex;margin-top: -30px;">
                <p style="color: #999;">
                  <i class="el-icon-date"></i>{{blog.datetime}}
                  <i class="el-icon-location-outline"></i>{{blog.address}}
                </p>
              </div>
              <div style="text-align: initial;margin-top: -25px;"><p style="font-size: small;color: #999;font-size: medium;" class="p-overflow">{{blog.introduce}}</p></div>
            </div>
          </div>
        </div>
        <div>
          <router-link :to="{path:'/shouyangpet'}"><el-button type="success" round>查看更多<i class="el-icon-d-arrow-right el-icon--right"/></el-button></router-link>
        </div>
      </div>
      <!--右边宠物秀内容-->
      <div style="width: 300px;">
        <div style="text-align: left"><h3>最新文章</h3></div>
        <el-divider></el-divider>
        <div class="border-blog">
          <div  v-for="(pet,index) in petBlog" :key="index" v-if="index<5" style="margin-top:-10px">
            <div @click="toPetXiangQing(pet.id)" class="blog-title">
              <div style="display: flex">
                <div  v-if="pet.user"><img :src="pet.user.avatar" style="width: 48px;height: 48px" alt=""></div>
                <div  v-if="pet.user" style="margin-left: 10px;text-align: left">
                  <a style="text-decoration: none;color: #029789;">{{pet.user.name}}</a>
                  <a style="text-decoration: none;margin-top: 10px"><div style="font-size: xx-small;color: #888">{{pet.title}}</div></a>
                </div>
              </div>
              <div style="font-size: x-small;text-overflow: ellipsis;text-align: left;margin-top: -10px;" class="p-overflow"><p>{{pet.introduce}}</p></div>
            </div>
            <div style="margin-top: -20px">
              <el-divider></el-divider>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PetCenter',
  data () {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      input: '',
      // imgList: [
      //   {id: 0, idView: require('../assets/img/1.jpg')},
      //   {id: 1, idView: require('../assets/img/2.jpg')}
      // ],
      user: {
        username: '',
        name: '',
        avatar: '',
        telephone: '',
        email: ''
      },
      imgs: [],
      blogs: [
        {
          id: '',
          address: '',
          datetime: '',
          title: '',
          images: [],
          introduce: '',
          userId: ''
        }
      ],
      petBlog: [
        {
          id: '',
          title: '',
          introduce: '',
          images: '',
          petuser: {
            name: ''
          }
        }
      ]
    }
  },
  methods: {
    blogdetails (id, userId) {
      this.$router.push({
        path: '/xiangqing',
        query: {
          id: id,
          userId: userId,
          username: this.user.username
        }
      })
    },
    toPetXiangQing (id) {
      this.$router.push({
        path: '/petxiangqing',
        query: {
          id: id,
          username: this.user.username
        }
      })
    }
  },
  created () {
    this.user.username = this.$route.query.username
    const _this = this
    this.$axios.get('http://localhost:8081/blog/findAll').then(function (resp) {
      for (let i = 0; i < resp.data.length; i++) {
        _this.blogs[i] = resp.data[i]
        _this.blogs[i].images = resp.data[i].images.split(';')
      }
    })
    this.$axios.get('http://localhost:8081/user/select/' + _this.user.username).then(function (resp) {
      _this.user = resp.data
    })
    this.$axios.get('http://localhost:8081/petBlog/queryAll').then(function (resp) {
      _this.petBlog = resp.data
    })
  }
}
</script>

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
  .blog-title:hover{
    cursor: pointer;
  }
  .border-blog{
    background-color: white;
    padding: 10px;
    border-style: groove;
    border-color: #ddd;
    border: 10px solid #00000000;
  }
</style>
