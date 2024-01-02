<template>
  <div style="display: flex;justify-content: space-around; height: 630px;">
    <!--左边-->
    <div>
      <!--城市-->
      <!--<div style="text-align: left;font-size: large">城市:</div>
      <div>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group :max="1" v-model="checkedCities" @change="handleCheckedCitiesChange" class="checkbox">
          <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
        </el-checkbox-group>
      </div>-->
      <!--领养博客-->
      <div style="height: 550px;">
        <div style="text-align: left">
          <h3>最新领养</h3>
        </div>
        <el-divider></el-divider>
        <!--eslint-disable-next-line-->
        <div v-for="blog in blogs" style="width: 600px;">
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
      </div>
      <!--分页-->
      <div style="margin-bottom: 20px;">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size=3
          :total="total"
          :current-page="currentPage"
          @current-change="handlerPageChange">
        </el-pagination>
      </div>
    </div>
    <!--右边-->
    <!--<div>
      &lt;!&ndash;最新文章&ndash;&gt;
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
    </div>-->
  </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳', '保定', '长春', '成都', '重庆', '长沙', '常州', '东莞', '大连', '佛山', '福州', '南通', '揭阳', '普宁', '惠来', '惠州', '澳门', '香港']
export default {
  name: 'ShouYangPet',
  data () {
    return {
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
      currentPage: 1,
      total: null,
      blogs: [
        {
          id: '',
          address: '',
          datetime: '',
          title: '',
          images: [],
          introduce: ''
        }
      ],
      petBlog: [
        {
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
    handleCheckAllChange (val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    blogdetails (id, userId) {
      this.$router.push({
        path: '/xiangqing',
        query: {
          id: id,
          userId: userId,
          username: this.$route.query.username
        }
      })
    },
    toPetXiangQing (id) {
      this.$router.push({
        path: '/petxiangqing2',
        query: {
          id: id,
          username: this.$route.query.username
        }
      })
    },
    handlerPageChange (currentPage) {
      this.currentPage = currentPage
      this.getData(currentPage)
    },
    getData (currentPage) {
      const _this = this
      this.$axios.get('http://localhost:8081/blog/findAll/' + currentPage + '/3').then(function (resp) {
        _this.blogs = resp.data.records
        for (let i = 0; i < resp.data.records.length; i++) {
          _this.blogs[i].images = resp.data.records[i].images.split(';')
        }
        _this.total = resp.data.total
        console.log(resp)
      })
    }
  },
  created () {
    this.getData(this.currentPage)
    const _this = this
    this.$axios.get('http://localhost:8081/petBlog/queryAll').then(function (resp) {
      _this.petBlog = resp.data
    })
  }
}
</script>

<style scoped>
  .checkbox{
       display: table;
       width: 500px;
       white-space: pre-wrap;
       word-wrap: break-word;
     }
  .blog-title:hover{
    cursor: pointer;
  }
  .p-overflow{
    font-size: x-small;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp: 2;
  }
  .border-blog{
    background-color: white;
    padding: 10px;
    border-style: groove;
    border-color: #ddd;
    border: 10px solid #00000000;
  }
</style>
