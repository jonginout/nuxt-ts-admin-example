<template tag="el-table-column">
  <el-table-column
    :label="label"
    :prop="column"
    :align="['menu', 'date-range', 'image'].includes(type) ? 'center' : align"
  >
    <template slot-scope="item">
      <!-- 일반 텍스트 -->
      <span v-if="type === 'text'">
        {{ value(item.row[column]) }}
      </span>
      <!-- datetime 텍스트 -->
      <span v-if="type === 'datetime'">
        {{ $datetime(item.row[column]) }}
      </span>
      <!-- 이미지 -->
      <span v-else-if="type === 'image'">
        <socar-image
          :alt="options.alt"
          :src="item.row[column]"
          :err-src="options.errorImageSrc"
          :height="options.height"
          :width="options.width"
          @click.native="options.event(item.row, column)"
        />
      </span>
      <!-- 셀렉트 박스 -->
      <span v-else-if="type === 'select'">
        <el-select
          v-model="item.row[column]"
          size="mini"
          @focus="onFocusSelectBoxForSaveOldValue(item.row[column])"
          @change="onChangeSelectBox(item, column)"
        >
          <el-option
            v-for="(element, i) in options.elements"
            :key="i"
            :disabled="
              item.row[column] == element.value ||
                !checkDisableSelectBoxOption(element.value, options)
            "
            :label="element.name"
            :value="element.value"
          />
        </el-select>
      </span>
      <!-- 메뉴 (드롭다운) -->
      <span v-else-if="type === 'menu'">
        <el-dropdown trigger="click" size="medium">
          <span class="el-dropdown-link">
            <i class="material-icons">
              more_vert
            </i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-if="item.row._links['update-self']"
              @click.native="
                popupEdit(item.row.id, item.row._links['update-self'].href)
              "
            >
              수정
            </el-dropdown-item>
            <el-dropdown-item
              v-for="(element, i) in options.elements"
              :key="i"
              @click.native="element.event(item.row, column)"
            >
              {{ element.text }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
      <!-- html -->
      <span
        v-else-if="type === 'html'"
        :inner-html.prop="value(item.row[column])"
      />
      <!-- enum -->
      <span v-else-if="type === 'enum'">
        {{ options.elements[item.row[column]] }}
      </span>
      <!-- 슬롯 -->
      <span v-else-if="type === 'slot'">
        <slot :item="item.row[column]" :row="item.row" />
      </span>
    </template>
  </el-table-column>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import SocarImage from '~/components/element/Image.vue'

interface IOptions {
  [index: string]: any
  alt?: string
  errorImageSrc?: string
  height?: number
  width?: number
  event?: Function
  disable?: string
  elements?: Array<any>
}

@Component({
  components: {
    SocarImage
  }
})
export default class TableColumn extends Vue {
  private options: IOptions = {}
  private selectBoxOldValue: string | null = null

  private mounted() {
    this.optionInit()
  }
  @Prop({ default: 'text' }) public type!: string
  @Prop({ default: '' }) public column!: string
  @Prop({ default: '' }) public label!: string
  @Prop({ default: 'left' }) public align!: string
  @Prop({ default: () => {} }) public option!: IOptions

  optionInit() {
    this.options = {}
    for (const key in this.option)
      if (key && this.option[key]) this.options[key] = this.option[key]
  }

  value(text: string) {
    return text || ''
  }

  popupEdit(id: string | number, href: string) {
    this.$popupOpen(`${this.$route.path}/${id}?action=${href}`, 800, 910)
  }

  onFocusSelectBoxForSaveOldValue(origin: string) {
    this.selectBoxOldValue = origin
  }

  onChangeSelectBox(item: any, column: string) {
    const rollback = () => {
      item.row[column] = this.selectBoxOldValue
      this.selectBoxOldValue = null
    }
    if (!this.checkDisableSelectBoxOption(item.row[column])) {
      alert('해당 값으로는 변경이 불가능 합니다.')
      rollback()
      return
    }
    if (this.options.event) {
      /**
       * @param row 해당 열의 정보 (object)
       * @param column 해당 컬럼명
       * @param link patch 요청 url
       * @param rollback 요청 실패시 롤백하기 위한 롤백 함수
       * @param rollback 요청 실패시 롤백하기 위한 롤백 함수
       */
      this.options.event(item.row, column, item.row._links, rollback)
    }
  }
  checkDisableSelectBoxOption(value: string) {
    if (value && this.options.disable && this.options.disable.length > 0) {
      for (const v of this.options.disable) if (v === value) return false
    }
    return true
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/index';
</style>
