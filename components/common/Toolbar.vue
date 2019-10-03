<template>
  <el-header style="text-align: right; font-size: 12px">
    <div class="menu-toggle left" @click="$store.commit('TOGGLE_SIDEBAR')">
      <i class="material-icons">menu</i>
    </div>
    <span>
      <strong>김종인</strong>
      님 반갑습니다.
    </span>
    <el-dropdown class="user-menu" trigger="click" click="true" size="medium">
      <i class="el-icon-setting" />
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          문의하기
        </el-dropdown-item>
        <el-dropdown-item>
          로그아웃
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Toolbar extends Vue {}
</script>

<style lang="scss" scoped>
@import '~assets/scss/index';
.el-header {
  line-height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.5);
  .menu-toggle {
    cursor: pointer;
    font-size: 20px;
    vertical-align: middle;
    i {
      width: 31px !important;
      font-size: 30px;
      vertical-align: middle;
    }
  }
}
</style>
