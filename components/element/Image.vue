<template>
  <img
    class="socar-image"
    :alt="alt"
    :src="imageSrc"
    :style="`{width:${width};height:${height}}`"
    @error="setDefaultImage"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
const defaultImage = require('~/assets/images/common/no_connection.png')

@Component
export default class Image extends Vue {
  @Prop({ default: '' }) public alt!: string
  @Prop({ default: '' }) public src!: string
  @Prop({ default: '' }) public errSrc!: string
  @Prop({ default: '100%' }) public height!: string
  @Prop({ default: '100%' }) public width!: string
  public imageSrc: string = this.src

  public created() {
    this.setErrorSrc()
  }

  public setErrorSrc() {
    if (this.src) return
    if (this.errSrc) {
      this.imageSrc = this.errSrc
    } else {
      this.setDefaultImage()
    }
  }

  public setDefaultImage() {
    this.imageSrc = defaultImage
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/index';
</style>
