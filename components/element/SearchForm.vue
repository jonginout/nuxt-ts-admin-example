<template>
  <section></section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SearchFrom extends Vue {
  @Prop({ default: '' }) public alt!: string
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/index';
</style>
