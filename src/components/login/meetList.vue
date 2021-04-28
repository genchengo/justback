/* eslint-disable no-undef */
/* eslint-disable no-undef */
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="queryInfo" clearable @clear="updateUserList">
          <el-button slot="append" icon="el-icon-search" @click="updateUserList"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="userlistCopy |search(queryInfo)| pagination(pageNum,pageSize)" border stripe :cell-style="{ textAlign: 'center' }" :header-cell-style="{textAlign: 'center'}">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="meetingname" label="会议名称"></el-table-column>
      <el-table-column prop="place" label="地点"></el-table-column>
      <el-table-column prop="time" label="时间"></el-table-column>
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">

          <!-- 删除按钮 -->
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">

      <el-form :model="addMeet" :rules="addMeetRules" ref="addMeetRef">
        <el-form-item label="会议名称" prop="meetingname">
          <el-input v-model="addMeet.meetingname"></el-input>
        </el-form-item>
        <el-form-item label="地点" prop="place">
          <el-input v-model="addMeet.place"></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="time">

          <el-date-picker v-model="addMeet.time" type="datetime" placeholder="选择日期时间" size="large">
          </el-date-picker>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMeetForm">确 定</el-button>
      </span>
    </el-dialog>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: '',
      userlist: [],
      userlistCopy: [],

      pageNum: 1,
      pageSize: 10,
      pageSizes: [1, 3, 5, 10], // select选项设置：条/页
      currentPage: 3,
      total: 21,
      addDialogVisible: false,
      addMeet: {
        // id: this.total + 1,
        meetingname: '',
        place: '',
        time: '1111'
      },
      addMeetRules: {
        meetingname: [
          { required: true, message: '请输入会议名称', trigger: 'blur' },
          { min: 2, message: '长度大于2个字符', trigger: 'blur' }
        ],
        place: [
          { required: true, message: '请输入会议地点', trigger: 'blur' },
          { min: 2, message: '长度大于2个字符', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '请输入会议时间', trigger: 'blur' }
        ]
      }
    }
  },
  filters: {
    // 实时搜索
    search (userlistCopy, queryInfo) {
      const search = queryInfo.trim()
      return userlistCopy.filter((item) => {
        if (item.meetingname.includes(search)) {
          return item
        }
      })
    },
    pagination (userlistCopy, pageNum, pageSize) {
      // this.total = userlistCopy.length
      const offset = (pageNum - 1) * pageSize // 当前页第一条的索引
      // eslint-disable-next-line no-undef
      const data =
        offset + pageSize >= userlistCopy.length
          ? userlistCopy.slice(offset, userlistCopy.length)
          : userlistCopy.slice(offset, offset + pageSize)
      return data
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('userlist.json')
      this.userlist = res.data.users
      // 浅拷贝不能解决问题
      this.userlistCopy = res.data.users
      // console.log(res.data.users)
    },
    updateUserList () {},
    handleSizeChange (newSize) {
      // 选择一页有几条
      // console.log(newSize)
      this.pageSize = newSize
      // eslint-disable-next-line no-template-curly-in-string
      console.log('当前一页有' + 'newSize')
    },
    handleCurrentChange (newPage) {
      // 第几页
      // console.log(newPage)
      this.pageNum = newPage
      // eslint-disable-next-line no-template-curly-in-string
      console.log(this.pageNum)
    },
    addDialogClosed () {
      this.$refs.addMeetRef.resetFields()
      // console.log(this.$refs)
    },
    addMeetForm () {
      this.$refs.addMeetRef.validate(valid => {
        if (!valid) return this.$message.error('添加会议信息失败')
      })
      this.addMeet.id = this.userlistCopy.length + 30

      // console.log(this.addMeet)
      this.userlistCopy.push(this.addMeet)
      this.addDialogVisible = false
      // console.log(this.userlistCopy)
      // this.$message.succuss('添加会议信息成功')
      // this.addDialogVisible = false
    },
    removeUserById (id) {
      console.log(id)
      // eslint-disable-next-line no-return-assign
      return this.userlistCopy = this.userlistCopy.filter(item => {
        if (item.id !== id) return item
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-table,.el-pagination
  margin-top 20px
</style>
