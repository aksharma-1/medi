<template>
  <v-container id="doctorForm" class="bg-light text-center">
    <h2 class="mb-5 bg-success-subtle p-3">Doctor Login</h2>
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
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

var doctorInfo = {};

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

const updateAvailability = async () => {
  try {
    const response = await axios.put(
      `${process.env.VUE_APP_API_URL}/Doctors/signup/${doctorInfo._id}`,
      {
        availability: "Available",
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const submit = handleSubmit(async () => {
  const data = {
    email: email.value.value,
    password: password.value.value,
  };

  try {
    const loginResponse = await axios.post(
      `${process.env.VUE_APP_API_URL}/Doctors/signin`,
      data
    );
    console.log("Login Respone -", loginResponse);
    if(loginResponse.data === 'User Cannot found'){
      alert('User Cannot found')
    }

    localStorage.setItem(
      "doctorInfo",
      JSON.stringify(loginResponse.data.existDoctor)
    );
    const storeData = localStorage.getItem("doctorInfo");
    doctorInfo = JSON.parse(storeData);

    localStorage.setItem("doctorToken", loginResponse.data.token);

    updateAvailability();
    router.push("/doctor");
  } catch (error) {
    console.log(error);
  }
});
</script>