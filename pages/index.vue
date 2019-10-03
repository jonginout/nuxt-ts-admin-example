<template>
  <section class="container">
    <div>
      {{ message }}
    </div>
  </section>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'

export default class IndexPage extends Vue {
  public message: string = 'Hello Reddy!'
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/index';
</style>
