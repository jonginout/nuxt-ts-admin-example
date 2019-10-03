<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { pickBy, identify } from 'lodash'

interface IPagination {
  page: number
  pageSize: number
  totalElements: number
  totalPages?: number
}

@Component
export default class Pagination extends Vue {
  public pagination: IPagination = {
    page: 1,
    pageSize: 0,
    totalElements: 0,
    totalPages: 0
  }

  public changePage(page: number) {
    window.scroll(0, 0)
    --page
    this.setRoute({ page })
  }
  public setRoute(newQuery: object = {}) {
    this.$route.query.page = '0'
    const query = pickBy(
      Object.assign({}, this.$route.query, newQuery),
      identify
    )
    this.$router.push({ query })
  }
}
</script>
