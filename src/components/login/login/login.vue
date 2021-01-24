<template>
  <div class="login-wrap">
    <!--
      :label-position="top"是数据, abel-position="top"
      form组件提供了表单验证的功能,只需要通过rules属性入约定的验证规则,并将Form-Item的prop属性设置为需要校验的字段名

      获取表单的实例对象,通过实例对象访问resetFields, 调用这个函数,ruleForm表单的实例对象
      :rules="rules" 是验证规则对象

      el-form在表单中定义ref="ruleForm",在el-input中定义resetLogin这个方法，
      在绑定方法中,调用这个方法this.$refs.ruleForm.resetFields()
    -->
    <el-form
    class="login-from"
    label-position="top"
    label-width="80px"
    :model="fromdata"
    :rules="rules"
    ref="ruleForm"
    >
    <h2>用户登入</h2>
    <!-- 验证对象是加到el-form-item中的 -->
        <el-form-item label="用户名" prop="username">
          <!-- 给每个文本框,用v-model进行双向绑定,prop是验证规则 -->
            <el-input v-model="fromdata.username"  prefix-icon="el-icon-user-solid" type="text" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="fromdata.password"  prefix-icon="el-icon-lock" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
    <el-form-item  class="login-btn">
    <el-button
      @click.prevent="handleLogin()"
      type="primary" @click="login">登入</el-button> <!---->
    <el-button type="info" @click="resetLogin">重置</el-button>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      // 这是登录表单数据绑定对象
      fromdata: {
        username: 'admin',
        password: '123456'
      },
      // 验证规则
      rules: {
      // 验证用户名
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // 验证密码
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleLogin () {
      this.$http.post('login', this.fromdata).then(res => {
        const {
          data,
          meta: { msg, status }
        } = res.data
        console.log(data, res, msg, status)
        // const {
        //   data,
        //   meta:{ msg,status }
        // } = res.data

        // const {meta: { msg , status }} =
        // {meta:{msg: '11', status: 200}}
        // obj = {msg: '11', status:200}
        // => {
        //   msg,status
        // } = {msg: '11', status: 200}
        // =>
        // msg:11, status
        if (status === 200) {
          // 登入成功
          // 1.跳转home
          this.$router.push({ name: 'home' })
          // 2.提示成功
          this.$message.success(msg)
        } else {
          // 不成功
          // 1.提示信息
          this.$message.warning(msg)
        }
      })
    },
    // 点击重置按钮,重置登入表单
    resetLogin () {
      console.log(this)// 这里的this是指向当前组件的实例对象
      // $refs: {ruleForm: VueComponent}
      // this.refs.ruleForm是表单的实例对象
      this.$refs.ruleForm.resetFields()
    },
    login () {
      // this.$refs.ruleForm获取表单的引用对象
      this.$refs.ruleForm.validate(async valid => {
        console.log(valid) // false 不合法,不符合表单的验证规则
        // r如果返回的是promise对象,可以把登入的内容用async await来接受请求 result必须在async里面
        // const result = await this.$http.post('login', this.fromdata)
        // console.log(result)

        // 从返回的数据中,把data进行解构出来,然后赋值给data给res
        if (valid) {
          this.$message.success('登入成功')
          window.sessionStorage.setItem('token', 'login')
          this.$router.push('/home')
        } else {
          this.$message.console.error('登入失败')
        }
        // const { data: res } = await this.$http.post('login', this.fromdata)
        // // console.log(res)
        // if (res.meta.status !== 200) return this.$message.error('登入失败!')
        // this.$message.error('登入成功!')
        /*
         token 是服务器登入后颁发的令牌, 访问接口的时候携带token,才可以访问成功
          1.将登入成功之后的token,保存到客户端的sessionStorage中
           1.1 项目中除了登入之外的其他API接口,必须在登入之后才能访问
           2.2 token只应在当前网站打开期间生效,所以将token保存在seesionStorage中
           2.通过编程式导航跳转到后台主页,路由地址是/home

           为啥保存在seesionStorage而不是在localStorage中?
           seesionStorage是会话的期间的存储机制
           localStorage是持久化的存储机制
        */
        // 2.2 token只应在当前网站打开期间生效,所以将token保存在seesionStorage中
        // window.sessionStorage.setItem('token', res.data.token)

        // 2.通过编程式导航跳转到后台主页,路由地址是/home
        // this.$router.push('/home')
      }) // 接受回调函数,拿到结果
    }
  }
}
</script>

<style>
/*
body的下面是不是login-wrap, 而是#app
<template>
<div id='app'>

</div>
</template>
*/
.login-wrap {
height: 100%;
background-color: #324152;
display: flex;
justify-content: center;
align-items: center;
}

.login-wrap .login-from {
width: 400px;
background-color: #fff;
border-radius: 5px;
padding: 30px;
}

/* .login-wrap .login-btn {
width: 100%;
} */

/* .login-wrap .login-btn {
width: 20px;
} */
.login-btn {
  display: flex;
  flex-direction: row-reverse;
}
</style>
