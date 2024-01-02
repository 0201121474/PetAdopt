<template>
  <div style="height: 630px;">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="title" label="领养标题" width="360">
      </el-table-column>
      <el-table-column prop="datetime" label="发布时间" width="360">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="getBlog(scope.row) " type="text" size="small">修改</el-button>
          <el-dialog title="修改领养" :visible.sync="dialogFormVisible" :append-to-body="true">
            <el-form :model="form" ref="form">
              <el-form-item label="博客标题" :label-width="formLabelWidth">
                <el-input v-model="form.title" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="宠物名称" :label-width="formLabelWidth">
                <el-input v-model="form.petname" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="宠物性别" prop="petsex" :label-width="formLabelWidth">
                <el-radio-group v-model="form.petsex">
                  <el-radio :label="1">雄</el-radio>
                  <el-radio :label="0">雌</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="宠物年龄" :label-width="formLabelWidth">
                <el-input v-model="form.petage" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="宠物品种" :label-width="formLabelWidth">
                <el-radio-group v-model="form.varieties" >
                  <el-radio-button label="1">猫</el-radio-button>
                  <el-radio-button label="0">狗</el-radio-button>
                  <el-radio-button label="2">其他</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否免费" :label-width="formLabelWidth">
                <el-radio-group v-model="form.free">
                  <el-radio :label="0">免费</el-radio>
                  <el-radio :label="1">有偿</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="宠物简介" :label-width="formLabelWidth">
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
export default {
  name: 'BlogManage',
  data () {
    return {
      userid: '',
      username: '',
      tableData: [
        {
          id: '',
          title: '',
          datetime: '',
          introduce: '',
          images: '',
          petname: '',
          petsex: '',
          petage: '',
          varieties: '',
          free: '',
          petadopt: '',
          time: '',
          user_id: ''
        }
      ],
      formLabelWidth: '100px',
      dialogFormVisible: false,
      currentPage: 1,
      total: null,
      form: {
        title: '',
        introduce: '',
        petname: '',
        petsex: '',
        petage: '',
        varieties: '',
        free: ''
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
      this.$axios.get('http://localhost:8081/blog/findAll/' + currentPage + '/5' + '/' + _this.$route.query.id).then(function (resp) {
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
      this.$axios.get('http://localhost:8081/blog/find/' + row.id).then(function (resp) {
        _this.form = resp.data
      })
    },
    updateBlog (formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('http://localhost:8081/blog/update', _this.form).then(function (resp) {
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
      this.$axios.delete('http://localhost:8081/blog/delete/' + row.id).then(function (resp) {
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
