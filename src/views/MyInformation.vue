<template>
  <div style="height: 630px;">
    <div style="width: 400px;margin-left: 35%;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="头像" prop="avatar">
          <el-upload
            action="http://localhost:8081/file/upload"
            list-type="picture"
            :show-file-list="false"
            :on-remove="handlePreview"
            :on-change="uploadSectionFile"
            :on-success="success"
            :limit="1"
            ref="businessLicense">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-image style="width: 100px; height: 100px" :src="ruleForm.avatar" ></el-image>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input v-model="ruleForm.telephone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" >
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="账户" prop="username">
          <el-input v-model="ruleForm.username" :readonly="true" style="color: gray;"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyInformation',
  data () {
    return {
      photoList: [{ url: '' }],
      dialogImageUrl: '',
      dialogVisible: false,
      id: '',
      ruleForm: {
        name: '',
        sex: '',
        telephone: '',
        email: '',
        username: '',
        password: '',
        avatar: ''
      },
      rules: {
        name: [
          { required: true, min: 1, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        telephone: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { min: 11, max: 11, message: '电话格式不正确', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        username: [
          { required: true, message: '请输入账户', trigger: 'blur' },
          { min: 5, message: '请输入不少于5个的账户', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '请输入不少于6个的密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    success (response, file) {
      console.log(response)
      if (response.success === true) {
        this.ruleForm.avatar = response.message
        sessionStorage.setItem('imgUrl', this.ruleForm.avatar)
      }
    },
    uploadSectionFile (file) {
      this.ruleForm.avatar = file.url
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension =
        testmsg === 'jpg' ||
        testmsg === 'JPG' ||
        testmsg === 'png' ||
        testmsg === 'PNG'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!extension) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return extension && isLt2M
    },
    handlePreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    submitForm (formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.ruleForm.avatar = sessionStorage.getItem('imgUrl')
          this.$axios.post('http://localhost:8081/user/update', _this.ruleForm).then(function (resp) {
            console.log(_this.ruleForm)
            if (resp.data === 'success') {
              _this.$alert('修改成功', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$message({
                    showClose: true,
                    type: 'success',
                    message: `修改成功`
                  })
                  _this.$router.go(0)
                }
              })
              _this.$router.push({
                path: '/myinformation',
                query: {
                  username: _this.ruleForm.username
                }
              })
            } ;
          })
        } else {
          return false
        }
      })
    }
  },
  created () {
    this.id = this.$route.query.id
    const _this = this
    this.$axios.get('http://localhost:8081/user/select/' + _this.$route.query.username).then(function (resp) {
      _this.ruleForm = resp.data
    })
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
