<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      class=""
      style="
        background-image: linear-gradient(to right, #454955, #454955);
        color: #fff;
        border: 0px;
      "
    >
      <!-- Content of the drawer -->
      <div class="mt-3 p-3">
        <h1 class="m-3">Medico</h1>
        <router-link to="/admin/booking">
          <v-btn rounded color="#dee2e6" outlined @click="openDialog1"
            >Book Appoinment</v-btn
          >
        </router-link>        
      </div>
      <v-divider class="mx-10"></v-divider>

      <v-list density="compact" nav>
        <router-link to="/admin" class="router_link">
          <v-list-item
            prepend-icon="mdi-view-dashboard"
            title="Dashboard"
            value="Dashboard"
          ></v-list-item>
        </router-link>

        <router-link to="/admin/register-doctor" class="router_link">
          <v-list-item
            prepend-icon="mdi-doctor"
            title="Register Doctor"
            value="Dashboard"
          ></v-list-item>
        </router-link>
        
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      style="
        background-image: linear-gradient(to bottom, #454955, #454955);
        border: 0px;
        color: #fff;
      "
    >
      <!-- Toggle button for the sidebar -->
      <v-btn icon @click="toggleDrawer">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </v-btn>
      <v-toolbar-title>Medico</v-toolbar-title>

      <!-- Other app bar components go here -->
      <v-card-text>
        <v-text-field
          :loading="loading"
          density="compact"
          variant="solo"
          label="Search"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
        ></v-text-field>
      </v-card-text>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon id="menu-activator">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <v-menu activator="#menu-activator">
      <v-list class="text-center">
        <v-list-item><v-icon>mdi-account-circle  </v-icon> Akshay</v-list-item>
        <v-list-item>
            <v-btn class="bg-danger-subtle" @click="handleLogout">Logout</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    </v-app-bar>

    <!-- Main content area -->
    <v-main
      style="
        background-image: linear-gradient(to bottom right, #eef0eb, #eef0eb);
      "
    >
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
   
  </v-app>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  name: "Navbar",
  data() {
    return {
      loading: false,
      drawer: true,
      date: new Date(),
      menu: false,
      router: useRouter(),
      
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    openDialog1() {
      this.dialog1 = true;
    },
    allowedDates: (val) => {
      const day = new Date(val).getDate();
      return day;
    },
    handleLogout(){
      localStorage.clear();
      this.router.push('/')
    }
  },
};
</script>

<style scoped>
.router_link {
  text-decoration: none;
  color: #fff;
  margin: 20px;
}
v-app-bar {
  background-color: #3c6e71;
}
</style>