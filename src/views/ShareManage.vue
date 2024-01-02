<template>
  <div style="height: 630px;">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="title" label="博客标题" width="360">
      </el-table-column>
      <el-table-column prop="dateTime" label="发布时间" width="360">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="getBlog(scope.row) " type="text" size="small">修改</el-button>
          <el-dialog title="修改博客" :visible.sync="dialogFormVisible" :append-to-body="true">
            <el-form :model="form" ref="form">
              <el-form-item label="博客标题" :label-width="formLabelWidth">
                <el-input v-model="form.title" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="宠物相册" :label-width="formLabelWidth">
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
              <el-form-item label="博客内容" :label-width="formLabelWidth">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 6, maxRows: 10}"
                  placeholder="请输入内容"
                  v-model="form.introduce">
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button @click="updateBlog('form')" type="primary">确 定</el-button>
            </div>
          </el-dialog>
          <el-button @click="deleteBlog(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size=5
        :total="total"
        :current-page="currentPage"
        @current-change="handlerPageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ShareManage',
  data () {
    return {
      userid: '',
      username: '',
      tableData: [
        {
          id: '',
          title: '',
          dateTime: '',
          introduce: '',
          images: '',
          time: '',
          userId: ''
        }
      ],
      formLabelWidth: '100px',
      dialogFormVisible: false,
      currentPage: 1,
      total: null,
      form: {
        title: '',
        introduce: '',
        images: ''
      }
    }
  },
  methods: {
    handlerPageChange (currentPage, userid) {
      userid = this.userid
      this.getData(currentPage, userid)
    },
    getData (currentPage, userid) {
      const _this = this
      this.$axios.get('http://localhost:8081/petBlog/queryAll/' + currentPage + '/5' + '/' + _this.$route.query.id).then(function (resp) {
        console.log(resp)
        _this.tableData = resp.data.records
        _this.total = resp.data.total
      }).catch(function (error) {
        console.log(error)
      })
    },
    getBlog (row) {
      this.dialogFormVisible = true
      const _this = this
      this.$axios.get('http://localhost:8081/petBlog/queryById/' + row.id).then(function (resp) {
        _this.form = resp.data
      })
    },
    updateBlog (formName) {
      // this.form.userId = this.userid
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.put('http://localhost:8081/petBlog/update', _this.form).then(function (resp) {
            if (resp.data === 'success') {
              _this.$alert('《' + _this.form.title + '》', '修改成功', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$message({
                    showClose: true,
                    type: 'success',
                    message: `修改成功`
                  })
                }
              })
              _this.$router.push({
                path: '/',
                query: {
                  userid: _this.userid
                }
              })
            } ;
          })
        } else {
          return false
        }
      })
    },
    deleteBlog (row) {
      const _this = this
      this.$axios.delete('http://localhost:8081/petBlog/delete/' + row.id).then(function (resp) {
        if (resp.data === 'success') {
          _this.$alert('《' + row.title + '》', '删除成功', {
            confirmButtonText: '确定',
            callback: action => {
              _this.$message({
                showClose: true,
                type: 'success',
                message: `删除成功`
              })
              _this.$router.go(0)
            }
          })
        } ;
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
        this.form.images = res.data.message
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
    this.getData(this.currentPage)
    this.userid = this.$route.query.id
    this.username = this.$route.query.username
  }
}
</script>

<style scoped>

</style>
