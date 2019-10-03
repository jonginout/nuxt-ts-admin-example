<template>
  <section class="socar-date-range-picker-component-container">
    <el-date-picker
      v-model="range"
      :value-format="format"
      :default-value="new Date()"
      :separate-response="separateResponse"
      type="daterange"
      align="left"
      start-placeholder="시작일"
      end-placeholder="종료일"
      @change="change"
    />
    <slot />
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

interface IRangeResult {
  startDate: string
  endDate: string
}

@Component
export default class DateRangePicker extends Vue {
  private isArray: boolean = true
  private range: Array<string> = []
  private result: IRangeResult = {
    startDate: '',
    endDate: ''
  }
  @Prop({ default: 'yyyy-MM-dd' }) public format!: string
  @Prop({ default: true }) public separateResponse!: boolean
  @Prop({ default: () => [] }) public value!: any

  created() {
    if (typeof this.value === 'object' && this.separateResponse) {
      this.isArray = false
      this.init(this.value)
    } else {
      this.isArray = true
      this.range = this.value.length ? this.value : new Array(this.value)
    }
    this.$nuxt.$on('resetSearch', this.init)
  }

  init(obj: any) {
    if (!obj) {
      this.range = []
    } else {
      if (obj.startDate) {
        this.result.startDate = obj.startDate
        this.range[0] = this.result.startDate
      }
      if (obj.endDate) {
        this.result.endDate = obj.endDate
        this.range[1] = this.result.endDate
      }
    }
    this.change()
  }

  change() {
    if (this.isArray) {
      this.$emit('input', this.range)
    } else {
      this.setResult()
      this.$emit('change', this.result) // change는 오브젝트 형식을 반환
    }
  }

  setResult() {
    if (this.range && this.range.length >= 1) {
      this.result.startDate = this.range[0]
      this.result.endDate = this.range[1]
    } else {
      this.result.startDate = ''
      this.result.endDate = ''
    }
  }
}
</script>
