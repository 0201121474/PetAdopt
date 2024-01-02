<template>
  <div style="display: flex;justify-content: space-around;">
    <!--左边-->
    <div class="blog-left">
      <!--社区分享-->
      <div style="display: flex;justify-content: space-between;margin-bottom: -10px;">
        <!--社区分享-->
        <div>
          <el-link icon="el-icon-s-home" :underline="false" @click="removeIndex()">社区主页</el-link>
          <el-link icon="el-icon-s-grid" :underline="false" @click="removePetCircle()">领养中心</el-link>
        </div>
        <div>
          <el-link icon="el-icon-s-promotion" :underline="false">分享</el-link>
        </div>
      </div>
      <el-divider></el-divider>
      <!--标题-->
      <div style="text-align: initial;margin-top: -15px">
        <h2>{{blog.title}}</h2>
      </div>
      <!--博主信息-->
      <div class="blog-user">
        <!--头像和用户信息-->
        <div class="block" v-if="blog.user" style="display:flex;">
          <el-avatar :size="50" shape="square" :src="blog.user.avatar"></el-avatar>
          <div style="text-align: initial;margin-left: 10px;">
            <div v-if="blog.user" class="blog-user-name">
              <span>{{blog.user.name }}</span>
            </div>
            <div class="blog-user-time">时间: {{blog.dateTime}} <i class="el-icon-time"/></div>
          </div>
        </div>
        <!--浏览信息-->
        <div class="blog-user-icon">
          <div><i class="el-icon-view" style="margin-left: 5px;"></i><span style="margin-left: 5px;">0</span></div>
          <div style="margin-left: 10px;"><i class="el-icon-s-comment" style="margin-left: 5px;"></i><span style="margin-left: 5px;">0</span></div>
        </div>
      </div>
      <!--宠物内容-->
      <div>
        <div>
          <el-divider content-position="left"><h3>宠物相册</h3></el-divider>
          <el-carousel height="500px">
            <el-carousel-item v-for="(image,index) in blog.images" :key="index">
              <img  :src="image" style="width: 100%;height: 100%;"/>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div style="margin-top: 30px">
          <el-divider content-position="left"><h3>说说内容</h3></el-divider>
          <div style="text-align: start;margin-left: 20px;">
            <p>{{blog.introduce}}</p>
          </div>
        </div>
        <div style="margin-top: 90px">
          <el-divider content-position="left"><h3>评论区</h3></el-divider>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            :autosize="{ minRows: 3, maxRows: 6}"
            v-model="textarea">
          </el-input>
        </div>
      </div>
    </div>
    <!--右边-->
    <div style="display: flex;justify-content: space-around;;">
      <div style="width: 300px;">
        <div style="text-align: left"><h3>最新文章</h3></div>
        <el-divider></el-divider>
        <div  v-for="(pet,index) in petBlog" :key="index"  v-if="index<5">
          <div @click="toPetXiangQing(pet.id)" class="blog-title">
            <div style="display: flex">
              <div v-if="pet.user"><img :src="pet.user.avatar" style="width: 48px;height: 48px" alt=""></div>
              <div v-if="pet.user" style="margin-left: 10px;text-align: left">
                <a title="上海母猫绝育大概什么价格"  style="text-decoration: none;color: #029789;">{{pet.user.name}}</a>
                <a title="上海母猫绝育大概什么价格"  style="text-decoration: none;margin-top: 10px"><div style="font-size: xx-small;color: #888">{{pet.title}}</div></a>
              </div>
            </div>
            <div style="font-size: x-small;text-overflow: ellipsis;text-align: left" class="p-overflow"><p>{{pet.introduce}}</p></div>
          </div>
          <div style="margin-top: -20px">
            <el-divider></el-divider>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PetXiangQing',
  data () {
    return {
      username: '',
      textarea: '',
      circleUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      petBlog: [
        {
          id: '',
          title: '',
          introduce: '',
          images: '',
          petuser: {
            name: '',
            avatar: ''
          }
        }
      ],
      blog: {
        introduce: '',
        images: [],
        title: '',
        bloguser: {
          name: ''
        }
      }
    }
  },
  methods: {
    toPetXiangQing (id) {
      this.$router.push({
        path: '/petxiangqing',
        query: {
          id: id,
          username: this.username
        }
      })
    },
    removeIndex () {
      this.$router.push({
        path: '/',
        query: {
          username: this.username
        }
      })
    },
    removePetCircle () {
      this.$router.push({
        path: '/shouyangpet',
        query: {
          username: this.username
        }
      })
    }
  },
  created () {
    this.username = this.$route.query.username
    const _this = this
    this.$axios.get('http://localhost:8081/petBlog/queryAll').then(function (resp) {
      _this.petBlog = resp.data
    })
    this.$axios.get('http://localhost:8081/petBlog/queryById/' + _this.$route.query.id).then(function (resp) {
      _this.blog = resp.data
      _this.blog.images = resp.data.images.split(';')
      console.log(_this.blog.images)
    })
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .p-overflow{
    font-size: x-small;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp: 2;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .blog-title:hover{
    cursor: pointer;
  }
  .blog-left{
    width: 55%;
    background-color: white;
    padding: 10px;
    margin-left: 60px;
  }
  .blog-user-name{
    font-size: 18px;
    line-height: 23px;
    color: #333;
  }
  .blog-user-time{
    color: #999;
    font-size: 14px;
    margin-top: 5px;
  }
  .blog-user-icon{
    display: flex;
    font-size: 15px;
    color: rgb(151, 159, 168);
    margin-top: 5px;
  }
  .blog-user{
    display: flex;
    margin-left: 20px;
    justify-content: space-between;
    margin-bottom: 35px;
  }
</style>
