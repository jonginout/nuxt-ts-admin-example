<template>
  <section>
    <!-- 필터 -->
    <el-row>
      <el-row class="text-right">
        <div class="search-show-btn-group pointer" @click="toggleSearch">
          <i v-if="!search.show" class="material-icons">
            search
          </i>
          <i v-else class="material-icons">
            keyboard_arrow_up
          </i>
        </div>
      </el-row>
      <transition name="slide-anim">
        <el-row v-show="search.show" class="space-up-mini">
          <div>
            <el-form ref="search" status-icon label-position="top">
              <!-- 필터 form 슬롯 -->
              <div class="headr-slot">
                <slot name="search" :item="search.data" />
              </div>
              <div class="search-btn-group text-right space-down-mini">
                <el-button
                  icon="el-icon-delete"
                  type="info"
                  plain
                  size="mini"
                  @click="resetSearch"
                >
                  reset
                </el-button>
                <el-button
                  icon="el-icon-search"
                  type="info"
                  plain
                  size="mini"
                  @click="setRoute(search.data)"
                >
                  search
                </el-button>
              </div>
            </el-form>
          </div>
        </el-row>
      </transition>
    </el-row>

    <!-- 테이블 -->
    <el-row class="table">
      <el-row class="space-down">
        <el-col :span="4">
          {{ `${pagination.totalElements} 건` }}
        </el-col>
      </el-row>
      <el-table
        v-loading="table.loading"
        header-row-class-name="header-row"
        :data="table.rows"
        :row-class-name="tableRowClassName"
        style="width: 100%"
        border
      >
        <slot name="tbody" />
      </el-table>
    </el-row>

    <!-- 페이지네이션 -->
    <el-row class="table-pagination">
      <el-pagination
        class="pagination"
        background
        :layout="'prev, pager, next'"
        :page-size="pagination.pageSize"
        :total="pagination.totalElements"
        :current-page.sync="pagination.page"
        @current-change="changePage"
      />
    </el-row>
  </section>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'
import Pagination from '~/components/mixins/Pagination.vue'

@Component
export default class Table extends Mixins(Pagination) {
  public table: ITabe = {
    columns: {},
    rows: [],
    loading: false
  }

  public search: ISearch = {
    data: {},
    show: true
  }

  @Prop({ default: '' }) public requestUrl!: string
  @Prop() public rowColorData?: Array<IRowColorData>

  public beforeMount() {
    this.fetchRows()
  }

  /**
   * @name toggleSearch
   * @summary 필터 토글
   */
  toggleSearch() {
    this.search.show = !this.search.show
  }

  /**
   * @name resetSearch
   * @summary 필터 리셋, url도 리셋
   */
  resetSearch() {
    this.search.data = {}
    this.$router.push({})
    this.$nuxt.$emit('resetSearch')
  }

  /**
   * @name tableRowClassName
   * @summary 한 열의 색을 정하는 함수
   */
  public tableRowClassName({ row }: { row: any }) {
    if (!this.rowColorData) return ''
    for (const data of this.rowColorData) {
      if (row[data.column] === data.value) return data.color
    }
    return ''
  }

  /**
   * @name fetchRows
   * @summary fetch
   */
  public async fetchRows() {
    try {
      this.table.loading = true

      const { data } = await this.$axios.get(
        this.$qsUrl(this.requestUrl, this.$route.query)
      )

      this.pagination.totalElements = data.page.totalElements
      this.pagination.page = data.page.number + 1
      this.pagination.pageSize = data.page.size
      this.table.rows = data._embedded ? data._embedded.content : []
    } catch (error) {
      this.$notifyError('리스트 불러오기 실패')
      console.error(error)
    } finally {
      this.table.loading = false
    }
  }
}

interface ISearch {
  data: object
  show: boolean
}

interface ITabe {
  columns: object
  rows: Array<object>
  loading: boolean
}

interface IRowColorData {
  column: string
  value: string
  color: string
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/index';
@include anim-slideY-fade(0.1s);
.search-show-btn-group {
  display: inline-block;
  padding: 7px;
}
.search-btn-group {
  .el-button {
    border-radius: 0px !important;
  }
}
</style>
