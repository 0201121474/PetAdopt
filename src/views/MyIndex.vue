<template>
  <div style="display: flex">
    <div>
      <el-menu
        style="height: 100%;"
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item index="1"  @click="userdetails(ruleForm.username)">
          <i class="el-icon-menu"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item index="2"  @click="blogdetails(ruleForm.username)">
          <i class="el-icon-menu"></i>
          <span slot="title">领养博客</span>
        </el-menu-item>
        <el-menu-item index="4"  @click="sharedetails(ruleForm.username)">
          <i class="el-icon-menu"></i>
          <span slot="title">分享博客</span>
        </el-menu-item>
        <el-menu-item index="3"  @click="messagedetails(ruleForm.username)">
          <i class="el-icon-menu"></i>
          <span slot="title">收养申请</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyIndex',
  data () {
    return {
      imageUrl: '',
      ruleForm: {
        id: '',
        username: ''
      },
      rules: {
        name: [
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        sex: [
          { message: '请选择性别', trigger: 'change' }
        ],
        address: [
          { message: '请输入住址', trigger: 'blur' }
        ],
        telephone: [
          { message: '请输入电话', trigger: 'blur' },
          { min: 11, max: 11, message: '电话格式不正确', trigger: 'blur' }
        ],
        email: [
          { message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        username: [
          { message: '请输入账户', trigger: 'blur' },
          { min: 5, message: '请输入不少于5个的账户', trigger: 'blur' }
        ],
        password: [
          { message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '请输入不少于6个的密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    messagedetails () {
      this.$router.push({
        path: '/messagemanage',
        query: {
          id: this.ruleForm.id,
          username: this.ruleForm.username
        }
      })
    },
    blogdetails () {
      this.$router.push({
        path: '/blogmanage',
        query: {
          id: this.ruleForm.id,
          username: this.ruleForm.username
        }
      })
    },
    sharedetails () {
      this.$router.push({
        path: '/sharemanage',
        query: {
          id: this.ruleForm.id,
          username: this.ruleForm.username
        }
      })
    },
    userdetails (username) {
      this.$router.push({
        path: '/myinformation',
        query: {
          username: username,
          id: this.ruleForm.id
        }
      })
    }
  },
  created () {
    this.ruleForm.username = this.$route.query.username
    this.ruleForm.id = this.$route.query.id
  }
}
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;

  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
    background-color: #00000033;
    margin-left: -150px;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
