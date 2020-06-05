
<template>
  <div>
    <mdb-modal size="lg" :show="showModal" @close="$emit('update-show', false)" info>
      <mdb-modal-header :color="$globalThemeColorDark">
        <mdb-modal-title>User details</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div class="d-flex flex-row pb-3">
          <div v-for="item in listInfo.badges" :key="item.title" class="flex-fill pr-1">
              <h3>
                <mdb-badge :color="item.color" class="w-100 p-2">{{item.title}}: {{item.value}}</mdb-badge>
              </h3>
          </div>
        </div>
        <div>
          <mdb-tbl responsive>
            <mdb-tbl-body>
              <tr v-for="item in listInfo.data" :key="item.title">
                <th :class="$globalThemeColor + ' text-center'" style="width: 100px">{{ item.title }}</th>
                <td v-if="item.links">
                  <div style="max-height:150px; overflow:auto;">
                    <div v-for="link in item.links" :key="link">
                        <a href="#">
                            {{ link }}
                            <mdb-icon icon="external-link-alt" />
                        </a>
                    </div>
                  </div>                  
                </td>
                <td v-else>{{item.value}}</td>
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="info" @click.native="$emit('update-show', false)">Close</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </div>
</template>
<script>
export default {
  props: {
    listInfo: Object,
    showModal: Boolean,
  },
  data() {
    return {
    };
  },
};
</script>
