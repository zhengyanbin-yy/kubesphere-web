<template>
  <div class="about">
      啊啊啊
      <el-form :model="form">
          <el-form-item label="用户名或者邮箱">
              <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
              <el-input v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>
<script>
    export default {
        data(){
            return{
                form:{
                    username:'',
                    password:''
                }
            }
        },
        methods:{
            encrypt(salt, str) {
                return this.mix(salt, window.btoa(str))
            },
            mix(salt, str) {
                if (str.length > salt.length) {
                    salt += str.slice(0, str.length - salt.length)
                }

                const ret = []
                const prefix = []
                for (let i = 0, len = salt.length; i < len; i++) {
                    const tomix = str.length > i ? str.charCodeAt(i) : 64
                    const sum = salt.charCodeAt(i) + tomix
                    prefix.push(sum % 2 === 0 ? '0' : '1')
                    ret.push(String.fromCharCode(Math.floor(sum / 2)))
                }

                return `${window.btoa(prefix.join(''))}@${ret.join('')}`
            },
            onSubmit(){
                const { username, password, ...rest } = this.form
                let submitData = {
                    username,
                    encrypt: this.encrypt('kubesphere', password),
                    ...rest,
                }
                debugger
                request.post('login', submitData).then(res=>{
                    
                })
                console.log(submitData)
            }
        }
    }
</script>
