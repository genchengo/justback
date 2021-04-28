<template>
  <div class="bg">
    <div class="login_container">
      <p>药企内部管理平台</p>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        size="medium"
      >
        <el-form-item prop="phone">
          <el-input
            v-model="loginForm.phone"
            placeholder="请输入手机号码"
            prefix-icon="iconfont icon-mobile"
            class="c60"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            prefix-icon="iconfont icon-mail"
            ><el-button size="mini" type="text" plain slot="suffix"
              >发送验证码</el-button
            >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入登陆密码"
            prefix-icon="iconfont icon-password"
            class="lastInp"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="loginWidth" @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <el-button type="text" class="fogetPassword">忘记密码</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        phone: '13699678912',
        code: '123456',
        password: '123456'
      },
      loginFormRules: {
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 10, max: 11, message: '长度在 11 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 8, message: '长度在 4 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // eslint-disable-next-line no-undef
      if (!this.isMne) { return this.$message.error('手机号码或者密码错误！') }

      this.$refs.loginFormRef.validate(async valid => {
        // eslint-disable-next-line no-undef

        console.log(this.$refs.loginFormRef)
        // eslint-disable-next-line no-useless-return
        if (!valid) return
        // eslint-disable-next-line no-unused-vars
        const { data: res } = await this.$http.get(
          'login.json',
          this.loginForm
        )
        // console.log(res)
        if (res.meta.status !== 200) return this.$message.error('登录失败！')
        this.$message.success('登录成功')
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  },
  computed: {
    isMne () {
      if (
        this.loginForm.phone === '13699678912' &&
        this.loginForm.password === '123456'
      ) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="stylus" scoped>
.bg {
  background: url('bg.jpg') no-repeat fixed center;
  background-size: cover;
  height: 100%;
}

.login_container {
  width: 495px;
  height: 470px;
  background-color: #FFFAF0;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 4px 6px 6px #404040;
}

p {
  text-align: center;
  font-size: 36px;
  font-weight 800
  color: #0079FE;
}

.el-form
  width (335 / 495) * 100%;
  margin 0 auto;
  .el-form-item
    // 去除input之间的间隔
    margin-bottom: 0
    >>> .el-input__inner
      border-radius 0
      border-bottom 0
      height 50px
      line-height 50px
      padding-left 50px
    >>> .el-input__prefix
      top 4px
      left 10px
      .el-input__icon
        font-size 28px
        color black
    >>> .el-input__suffix
      top 6px
.lastInp
  border-bottom 1px #dcdfe6 solid
  box-sizing border-box

.loginWidth
  width 100%
  margin-top 35px

.fogetPassword
  margin 0 0 0 357px
</style>
