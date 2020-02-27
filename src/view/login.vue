<template>
  <div>
    <van-row>
      <van-nav-bar title="登录后台" />
      <div class="body_content">
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px;">
            <van-button
              round
              block
              type="info"
              native-type="submit"
            >
              提交
            </van-button>
          </div>
        </van-form>
      </div>
    </van-row>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapMutations(['setToken']),
    onSubmit(values) {
      console.log(values);
      this.setToken({ token: values.username });
      this.$router.push({ path: "/user" });
      Toast('提交登录数据');
    }
  },
};
</script>

<style scoped>
.body_content {
  padding: 20px;
}
</style>