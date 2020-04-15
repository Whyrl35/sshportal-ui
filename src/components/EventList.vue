<template>
  <div style="padding-top: 60px">
    <section id="events" class="p-5">
      <mdb-row>
        <mdb-col xl="12" lg="12" md="12" class="mb-r">
          <h1>Events list</h1>
        </mdb-col>
        <mdb-col xl="12" lg="12" md="12" class="mt-4">
          <mdb-datatable-2 v-model="data" :columns="columns" :rows="rows" striped bordered arrows/>
        </mdb-col>
      </mdb-row>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
            columns: [],
            rows: []
    };
  },
  computed: {
    data() {
      return {
            columns: this.columns,
            rows: this.rows
      }
    }
  },
  mounted() {
    let col = [
      {
        label: "Name",
        field: "name",
        sort: true
      },
      {
        label: "Position",
        field: "position",
        sort: true
      }
    ];
    let rows = (rows = [
      {
        name: "Tiger Nixon",
        position: "System Architect"
      },
      {
        name: "Garrett Winters",
        position: "Accountant"
      }
    ]);

    this.columns = col;
    this.rows = rows;
  }
};
</script>
