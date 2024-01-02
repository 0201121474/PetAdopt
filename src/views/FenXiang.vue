<template>
  <div  style="display: grid;justify-items: center;">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="宠物相册" style="width: 500px;">
        <div>
          <el-upload
            ref="upload"
            multiple
            list-type="picture"
            :auto-upload="false"
            :http-request="uploadFile"
            action="http://localhost:8081/file/uploads">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </div>
        <div style="margin-top: 10px; margin-left: -10px;">
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </div>
      </el-form-item>
      <el-form-item label="分享标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="分享内容" prop="introduce">
        <el-input
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 10}"
          placeholder="请输入内容"
          v-model="ruleForm.introduce">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="info" round>返回</el-button>
        <el-button type="success" round>保存</el-button>
        <el-button type="primary" @click="onSubmit('ruleForm')" round>发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'FenXiang',
  data () {
    return {
      input: '',
      fileList: '',
      username: '',
      ruleForm: {
        title: '',
        introduce: '',
        images: '',
        userId: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, message: '标题不少于3个字', trigger: 'blur' }
        ],
        introduce: [
          {required: true, message: '请输入内容', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    onSubmit (formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        console.log(_this.ruleForm)
        if (valid) {
          this.$axios.post('http://localhost:8081/petBlog/insert', _this.ruleForm).then(function (resp) {
            console.log(resp)
            if (resp.data === 'success') {
              _this.$alert('《' + _this.ruleForm.title + '》' + '分享成功', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$message({
                    showClose: true,
                    type: 'success',
                    message: `添加成功`
                  })
                }
              })
              _this.$router.push({
                path: '/',
                query: {
                  username: _this.username
                }
              })
            } ;
          })
        } else {
          return false
        }
      })
    },
    uploadFile (file) {
      this.formData.append('files', file.file)
    },
    submitUpload () {
      this.formData = new FormData()
      this.$refs.upload.submit()
      this.formData.append('WS_CODE', '12133')
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post('http://localhost:8081/file/uploads', this.formData, config).then(res => {
        this.ruleForm.images = res.data.message
        if (res.data.success === true) {
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        }
      }).catch(reason => {
        console.log(reason)
      })
    }
  },
  created () {
    this.username = this.$route.query.username
    this.ruleForm.userId = this.$route.query.id
  }
}
</script>

<style scoped>

</style>
