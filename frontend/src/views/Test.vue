<template>
  <div class="cp-page">
    <el-table
      :data="tableData"
      stripe="true"
      highlight-current-row="true"
      style="width: 100%">
      <el-table-column
        prop="key"
        label="ID"
        width="100">
      </el-table-column>
      <el-table-column
        prop="red_1"
        label="Red"
        class-name="c_red"
        width="50">
      </el-table-column>
      <el-table-column
        prop="red_2"
        label="Red"
        class-name="c_red"
        width="50">
      </el-table-column>
      <el-table-column
        prop="red_3"
        label="Red"
        class-name="c_red"
        width="50">
      </el-table-column>
      <el-table-column
        prop="red_4"
        label="Red"
        class-name="c_red"
        width="50">
      </el-table-column>
      <el-table-column
        prop="red_5"
        label="Red"
        class-name="c_red"
        width="50">
      </el-table-column>
      <el-table-column
        prop="red_6"
        label="Red"
        class-name="c_red"
        width="50">
      </el-table-column>
      <el-table-column
        prop="blue"
        label="Blue"
        class-name="c_blue"
        width="50">
      </el-table-column>
      <el-table-column
        prop="caculate.sum"
        label="Sum"
        class-name="c_green"
        width="60">
      </el-table-column>
      <el-table-column
        prop="caculate.average"
        label="Average"
        class-name="c_green"
        width="80">
      </el-table-column>
      <el-table-column
        prop="caculate.prime_len"
        label="Prime"
        width="60">
      </el-table-column>
      <el-table-column
        prop="date"
        label="Date"
        class-name="c_green"
        width="150">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import request from '../request';
export default {
  data() {
    return {
      tableData: []
    }
  },
  async mounted() {
    const list = await request.getSsqList();
    this.tableData = list;
    console.log(list[0])
  },
}
</script>
<style lang="scss">
.cp-page{
  .c_red{
    color: red;
  }
  .c_blue{
    color: blue;
  }
  .c_green{
    color: green;
  }
}
</style>


