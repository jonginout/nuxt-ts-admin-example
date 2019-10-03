<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <sidebar />
    <el-container
      class="el-container is-vertical main"
      :class="{
        open: $store.state.sidebar,
        close: !$store.state.sidebar
      }"
    >
      <toolbar />
      <el-main>
        <nuxt />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Sidebar from '~/components/common/Sidebar.vue'
import Toolbar from '~/components/common/Toolbar.vue'

@Component({
  components: {
    Sidebar,
    Toolbar
  }
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss" scoped>
@import '~assets/scss/index';
.el-container.is-vertical.main {
  @include side-bar-transition();
  &.open {
    margin-left: $open-side-bar-width;
  }
  &.close {
    margin-left: $close-side-bar-width;
  }
}
</style>
