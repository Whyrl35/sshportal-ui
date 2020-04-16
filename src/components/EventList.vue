<template>
  <div style="padding-top: 60px">
    <section id="events" class="p-5">
      <mdb-row>
        <mdb-col xl="12" lg="12" md="12" class="mb-r">
          <h1>Events list</h1>
        </mdb-col>
        <mdb-col xl="12" lg="12" md="12" class="mt-4">
          <mdb-datatable :data="tableData" v-model="tableData" striped bordered arrows :display="3" :tfoot="false" />
        </mdb-col>
      </mdb-row>
    </section>
  </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: {
                columns: [],
                rows: []
            },
        }
    },
    comupted: {
        tableData: function() {
            return this.tableData;
        },
    },
    methods: {
      filterData(dataArr, keys) {
        let data = dataArr.map(entry => {
          let filteredEntry = {};
          keys.forEach(key => {
            if (key in entry) {
              filteredEntry[key] = entry[key];
            }
          });
          return filteredEntry;
        });
        return data;
      }
    },
    mounted() {
        this.$http
        .get(process.env.VUE_APP_API_URL + "/v1/events")
        .then(response => {
            let data = response.data.reverse()
            let keys = Object.keys(data[0])
            let entries = this.filterData(data, keys);

            keys.map(key =>
                this.tableData.columns.push( {
                    label: key.toUpperCase(),
                    field: key,
                    sort: true
                }))
            entries.map(entry => this.tableData.rows.push(entry));
        })
        .catch(err => {
            this.movies = []
            console.log(err);
        });
    }
};
</script>
