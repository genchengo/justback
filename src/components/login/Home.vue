<template>

    <el-container class="height">
      <el-header >
        <div class="fontHeader">药企内部管理系统</div>
        <el-button plain @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu  background-color="#f2f2f2" text-color="#000" active-text-color="#108ee9" unique-opened router>
            <el-submenu v-for="item in menulist" :key="item.id" :index="item.id+''">
              <template slot="title">
                <i :class="iconsObj[item.id]"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item v-for="menitem in item.children" :key="menitem.id" :index="'/' + menitem.path" @click="saveNavState('/' + menitem.path)">
                <template slot="title">
                  <i></i>
                  <span>{{menitem.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

</template>
<script>
export default {
  data () {
    return {
      menulist: [],
      iconsObj: {
        101: 'iconfont icon-huiyi',
        201: 'iconfont icon-wuliao_wuzi'
      },
      activePath: ''
    }
  },
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList () {
      // eslint-disable-next-line no-undef
      const { data: res } = await this.$http.get('menus.json')
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
    },
    saveNavState () {
      // eslint-disable-next-line no-undef
      window.sessionStorage.setItem('activePath', activePath)
      // eslint-disable-next-line no-undef
      this.activePath = activePath
    }
  }
}
</script>
<style lang="stylus" scoped>
.height
  height 100%

.el-header
  display flex
  justify-content space-between
  align-items center
  background #0097fe
  .fontHeader
    color #fff
    font-size 24px

.el-aside
  background #fcfcfc

.el-menu
  span
    font-size 16px
  i
    color #000
    font-size 18px
.el-main
  background #fff

.iconfont
  margin-right 15px

.el-aside .el-menu
  border-right none

</style>
