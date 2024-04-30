<template>
  <form @submit.prevent="submit">
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="firstName.value.value"
            :counter="10"
            :error-messages="firstName.errorMessage.value"
            label="First Name"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="lastName.value.value"
            :counter="10"
            :error-messages="lastName.errorMessage.value"
            label="Last Name"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            label="E-mail"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
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

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="phone.value.value"
            :counter="10"
            :error-messages="phone.errorMessage.value"
            label="Phone Number"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="age.value.value"
            :counter="2"
            :error-messages="age.errorMessage.value"
            label="Age"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-select
            v-model="specialist.value.value"
            :items="[
              'Whole Body',
              'Head',
              'Liver',
              'Chest',
              'Stomach',
              'Surgery',
              'Accident',
              'Ortho',
              'Dental',
              'Skin',
            ]"
            :error-messages="specialist.errorMessage.value"
            label="Specialist"
          ></v-select>
        </v-col>

        <v-col>
          <v-btn class="me-4 bg-success-subtle" type="submit"> Register </v-btn>
          <v-btn @click="handleReset"> clear </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </form>
</template>
<script setup>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const showPassword = ref(false);
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    firstName(value) {
      if (value?.length >= 2) return true;

      return "First name needs to be at least 2 characters.";
    },
    lastName(value) {
      if (value?.length >= 2) return true;

      return "Last name needs to be at least 2 characters.";
    },
    email(value) {
      if (/^[a-z0-9.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

      return "Must be a valid e-mail.";
    },
    password(value) {
      if (/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(value)) return true;

      return "Password must be at least 6 characters long and contain both letters and numbers.";
    },
    phone(value) {
      if (value?.length === 10 && /[0-9]/.test(value)) return true;

      return "Phone number needs to be 10 digits.";
    },
    age(value) {
      if (value >= 25) return true;

      return "Age must be greater than 24";
    },
    specialist(value) {
      if (value) return true;

      return "Select an speciality.";
    },
  },
});
const firstName = useField("firstName");
const lastName = useField("lastName");
const phone = useField("phone");
const email = useField("email");
const password = useField("password");
const specialist = useField("specialist");
const age = useField("age");

const submit = handleSubmit(async (values) => {
  const data = {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    password: values.password,
    phone: values.phone,
    age: values.age,
    specialist: values.specialist,
  };
  try {
    const response = await axios.post(
      `${process.env.VUE_APP_API_URL}/Doctors/signup`,
      data
    );
    console.log(response);
    router.push("/Admin");
  } catch (error) {
    console.log(error);
  }
});
</script>
