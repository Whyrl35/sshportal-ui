<template>
<div>
  <section id="dashboard" class="p-5">
    <section>
      <mdb-row>
        <mdb-col xl="3" lg="4" md="6" sm="12" class="mb-r">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="user" class="primary-color" />
              <div class="data">
                <h2 class="grey-text">Users</h2>
                <h4>
                  <strong>{{ users }}</strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
            </mdb-card-body>
            <mdb-card-footer class="small primary-color text-center white-text border-0 hover">
              <router-link :to="{ name: 'home' }" class="white-text">More info <mdb-icon icon="arrow-circle-right pl-2"/></router-link>
            </mdb-card-footer>
          </mdb-card>
        </mdb-col>
        <mdb-col xl="3" lg="4"  md="6" sm="12" class="mb-r">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="key" class="warning-color" />
              <div class="data">
                <h2 class="grey-text">Keys</h2>
                <h4>
                  <strong>{{ keys }}</strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
            </mdb-card-body>
            <mdb-card-footer class="small warning-color text-center white-text border-0 hover">
              <router-link :to="{ name: 'home' }" class="white-text">More info <mdb-icon icon="arrow-circle-right pl-2"/></router-link>
            </mdb-card-footer>
          </mdb-card>
        </mdb-col>
        <mdb-col xl="3" lg="4" md="6" sm="12" class="mb-r">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="server" class="light-blue lighten-1" />
              <div class="data">
                <h2 class="grey-text">Hosts</h2>
                <h4>
                  <strong>{{ hosts }}</strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
            </mdb-card-body>
            <mdb-card-footer class="small light-blue lighten-1 text-center white-text border-0 hover">
              <router-link :to="{ name: 'home' }" class="white-text">More info <mdb-icon icon="arrow-circle-right pl-2"/></router-link>
            </mdb-card-footer>
          </mdb-card>
        </mdb-col>
        <mdb-col xl="3" lg="4" md="6" sm="12" class="mb-r">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="shield-alt" class="red accent-2" />
              <div class="data">
                <h2 class="grey-text">Acls</h2>
                <h4>
                  <strong>{{ acls }}</strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
            </mdb-card-body>
            <mdb-card-footer class="small red accent-2 text-center white-text border-0 hover">
              <router-link :to="{ name: 'acls' }" class="white-text">More info <mdb-icon icon="arrow-circle-right pl-2"/></router-link>
            </mdb-card-footer>
          </mdb-card>
        </mdb-col>
        <mdb-col xl="3" lg="4" md="6" sm="12" class="mb-r">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="ethernet" class="default-color" />
              <div class="data">
                <h2 class="grey-text">Sessions</h2>
                <h4>
                  <strong>{{ sessions }}</strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
            </mdb-card-body>
            <mdb-card-footer class="small default-color lighten-1 text-center white-text border-0 hover">
              <router-link :to="{ name: 'sessions' }" class="white-text">More info <mdb-icon icon="arrow-circle-right pl-2"/></router-link>
            </mdb-card-footer>
          </mdb-card>
        </mdb-col>
        <mdb-col xl="3" lg="4" md="6" sm="12" class="mb-r">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="list-alt" class="secondary-color-dark" />
              <div class="data">
                <h2 class="grey-text">Events</h2>
                <h4>
                  <strong>{{ events }}</strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
            </mdb-card-body>
            <mdb-card-footer class="small secondary-color-dark lighten-1 text-center white-text border-0 hover">
              <router-link :to="{ name: 'events' }" class="white-text">More info <mdb-icon icon="arrow-circle-right pl-2"/></router-link>
            </mdb-card-footer>
          </mdb-card>
        </mdb-col>
      </mdb-row>
    </section>
  </section>
</div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cascading-admin-card {
  margin: 20px 0;
}
.cascading-admin-card .admin-up {
  margin-left: 4%;
  margin-right: 4%;
  margin-top: -20px;
}
.cascading-admin-card .admin-up .fas,
.cascading-admin-card .admin-up .far {
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.2), 0 2px 13px 0 rgba(0, 0, 0, 0.19);
  padding: 1.7rem;
  font-size: 2rem;
  color: #fff;
  text-align: left;
  margin-right: 1rem;
  border-radius: 3px;
}
.cascading-admin-card .admin-up .data {
  float: right;
  margin-top: 2rem;
  text-align: right;
}
.admin-up .data p {
  color: #999999;
  font-size: 18px;
}
.classic-admin-card .card-body {
  color: #fff;
  margin-bottom: 0;
  padding: 0.9rem;
}
.classic-admin-card .card-body p {
  font-size: 13px;
  opacity: 0.7;
  margin-bottom: 0;
}
.classic-admin-card .card-body h4 {
  margin-top: 10px;
}
</style>

<script>
export default {
    data() {
        return {
            users: 0,
            keys: 0,
            hosts: 0,
            acls: 0,
            sessions: 0,
            events: 0,
        }
    },
    mounted() {
        this.$http.get(process.env.VUE_APP_API_URL + "/v1/statistics").then(response => {
            this.users = response.data.users.count
            this.keys = response.data.keys.count
            this.hosts = response.data.hosts.count
            this.acls = response.data.acls.count
            this.sessions = response.data.sessions.count
            this.events = response.data.events.count
        }).catch(err => {
            this.$bvToast.toast(err.message, {
                title: "Error when getting statistics",
                autoHideDelay: 15000,
                variant: "danger",
                solid: true,
                appendToast: true
            });
        });
    }
}
</script>