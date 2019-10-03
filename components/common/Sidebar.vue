<template>
  <el-aside
    :class="{
      open: $store.state.sidebar,
      close: !$store.state.sidebar
    }"
  >
    <el-menu
      :collapse-transition="false"
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="!isSidebarOpen"
      background-color="#545c64"
      text-color="#fff"
    >
      <el-submenu
        v-for="(menu, index) in menus"
        :key="index"
        :index="`${index + 1}`"
      >
        <template slot="title" width="200px">
          <i :class="`el-icon-${menu.icon}`"></i>
          <span slot="title"> {{ menu.title }}</span>
        </template>
        <span v-for="(child, childIndex) in menu.children" :key="childIndex">
          <el-menu-item-group v-if="!child.children">
            <el-menu-item
              :index="`${index + 1}-${childIndex}`"
              @click="to(child.link)"
            >
              {{ child.title }}
            </el-menu-item>
          </el-menu-item-group>
          <el-submenu v-else :index="`${index + 1}-${childIndex}`">
            <span slot="title">{{ child.title }}</span>
            <el-menu-item
              v-for="(grandChild, grandChildIndex) in child.children"
              :key="grandChildIndex"
              :index="`${index + 1}-${childIndex}-${grandChildIndex}`"
              @click="to(grandChild.link)"
              >{{ grandChild.title }}</el-menu-item
            >
          </el-submenu>
        </span>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MENU from '~/constants/menu'

@Component
export default class Sidebar extends Vue {
  public isCollapse: boolean = false
  public menus: object = MENU

  get isSidebarOpen() {
    return this.$store.state.sidebar
  }
  set isSidebarOpen(val) {
    this.$store.commit('SET_SIDEBAR', val)
  }

  private to(link: string) {
    this.$router.push(link)
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/index';
.el-aside {
  height: calc(100vh);
  position: fixed;
  z-index: 1000;

  @include side-bar-transition();
  &.open {
    width: $open-side-bar-width !important;
  }
  &.close {
    width: $close-side-bar-width !important;
  }
}
</style>
