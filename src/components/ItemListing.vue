<template>
  <div>
    <section id="events" class="p-5">
      <mdb-row>
        <mdb-col xl="12" lg="12" md="12" class="mb-r">
          <h1>{{title}} list</h1>
          <small>click on row to view details</small>
        </mdb-col>
        <mdb-col xl="12" lg="12" md="12" class="mt-4">
          <!-- scrollY :maxHeight="xxx" -->
          <mdb-datatable
            id="mytable"
            name="mytable"
            v-on:selectRow="viewDetails"
            :data="tableData"
            striped
            bordered
            responsive
            hover
            hoverColor="red"
            selectColor="red"
            :selected="2"
            :borderless="true"
            :display="3"
            :tfoot="false"
          />
        </mdb-col>
      </mdb-row>
    </section>
  </div>
</template>
<script>
export default {
  props: {
    tableData: Object,
    title: String,
  },
  data() {
    return {};
  },
  comupted: {
    tableData: function() {
      return this.tableData;
    }
  },
  methods: {
    viewDetails(row) {
      this.$emit('details', row);
    }
  }
};
</script>
