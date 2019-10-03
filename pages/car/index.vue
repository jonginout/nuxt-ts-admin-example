<template>
  <div class="container">
    <socar-table :request-url="requestUrl" :row-color-data="rowColorData">
      <template slot="search" slot-scope="props">
        <el-row :gutter="24">
          <el-col :span="4">
            <el-form-item label="차량번호">
              <el-input
                v-model="props.item.carNums"
                type="textarea"
                :rows="1"
                placeholder="차량번호를 입력하세요."
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="상태">
              <el-select
                v-model="props.item.state"
                placeholder="상태"
                clearable
              >
                <el-option
                  v-for="(state, index) in CarConst.State.toArray()"
                  :key="index"
                  :label="state.name"
                  :value="state.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="생성일">
              <socar-date-range-picker
                v-model="props.item"
                :separate-response="true"
                @change="
                  (range) => {
                    props.item.startDate = range.startDate
                    props.item.endDate = range.endDate
                  }
                "
              />
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <template slot="tbody">
        <socar-table-column column="createdAt" label="등록일" />
        <socar-table-column type="datetime" column="createdAt" label="등록일" />
        <socar-table-column
          type="select"
          column="state"
          label="상태"
          :option="{
            elements: CarConst.State.toArray()
          }"
        />
      </template>
    </socar-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SocarTable from '~/components/element/Table.vue'
import SocarTableColumn from '~/components/element/TableColumn.vue'
import SocarDateRangePicker from '~/components/element/DateRangePicker.vue'
import { Car, IEnums } from '~/constants'

@Component({
  components: {
    SocarTable,
    SocarTableColumn,
    SocarDateRangePicker
  }
})
export default class CarPage extends Vue {
  public readonly requestUrl: string = '/car'
  public readonly CarConst = Car as IEnums
  public readonly rowColorData = [
    {
      column: 'type',
      value: this.CarConst.Type.GASOLINE.value,
      color: 'green'
    },
    {
      column: 'state',
      value: this.CarConst.State.INACTIVE.value,
      color: 'gray'
    }
  ]
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/index';
</style>
