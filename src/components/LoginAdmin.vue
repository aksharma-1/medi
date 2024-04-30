<template>
  <v-container id="adminForm" class="bg-light text-center">
    <h2 class="mb-5 bg-success-subtle p-3">Admin Login</h2>
    <form @submit.prevent="submit">
      <v-row class="justify-content-center">
        <v-col cols="6">
          <v-text-field
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            label="E-mail"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="justify-content-center">
        <v-col cols="6">
          <v-text-field
            v-model="password.value.value"
            :error-messages="password.errorMessage.value"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="
              showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
            "
            @click:append-inner="togglePasswordVisibility"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-btn class="me-4 bg-success-subtle" type="submit"> Login </v-btn>

      <v-btn @click="handleReset"> clear </v-btn>
    </form>
  </v-container>
</template>
    
<script setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import { useRouter } from "vue-router";

const router = useRouter();

const showPassword = ref(false);
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    email(value) {
      if (/^[a-z0-9.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

      return "Must be a valid e-mail.";
    },
    password(value) {
      if (/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(value)) return true;

      return "Please enter valid password";
    },
  },
});
const email = useField("email");
const password = useField("password");

const submit = handleSubmit(() => {
  const email1 = email.value.value;
  const password1 = password.value.value;

  const adminToken = "dfgh654456ukcd534567ugvhgf";
  const adminEmail = process.env.VUE_APP_ADMIN_EMAIL;
  const adminPassword = process.env.VUE_APP_ADMIN_PASSWORD;

  if (email1 === adminEmail && password1 === adminPassword) {
    localStorage.setItem("adminToken", adminToken);

    router.push("/admin");
  } else {
    alert("Wrong details");
  }
});
</script>