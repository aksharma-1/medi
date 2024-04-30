<template>
  <form @submit.prevent="submit">
    <v-container fluid >
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
          <v-select
            v-model="age.value.value"
            :items="['0-17', '18-29', '30-54', '54+']"
            :error-messages="age.errorMessage.value"
            label="Select age"
          ></v-select>
        </v-col>
    
        <v-col cols="12" sm="6">
          <v-select
            v-model="checkUp.value.value"
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
            :error-messages="checkUp.errorMessage.value"
            label="check Up"
          ></v-select>
        </v-col>
    
        <v-col cols="12" sm="6">
            <v-text-field readonly>
              <VueDatePicker
                :format="formatDate"
                v-model="date"
                :enable-time-picker="false"
                auto-apply
                :disabled-week-days="[0]"
                :minDate="new Date()"
                placeholder="Select Date"
              />
            </v-text-field>
    
        </v-col>
    
        <v-col cols="12" sm="6">
            <v-text-field readonly>
              <VueDatePicker
                v-model="time"
                time-picker
                auto-apply
                placeholder="Select Time"
              />
            </v-text-field>
        </v-col>

        <v-col>
          <v-btn class="me-4 bg-success-subtle" type="submit"> Book </v-btn>  
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

const date = ref(new Date());
const time = ref(new Date());

const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const formatTime = (time) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    firstName(value) {
      if (value?.length >= 2) return true;

      return "First Name needs to be at least 2 characters.";
    },
    lastName(value) {
      if (value?.length >= 2) return true;

      return "Last Name needs to be at least 2 characters.";
    },
    age(value) {
      if (value) return true;

      return "Select an age.";
    },
    checkUp(value) {
      if (value) return true;

      return "Select a check Up.";
    },
  },
});
const firstName = useField("firstName");
const lastName = useField("lastName");
const age = useField("age");
const checkUp = useField("checkUp");

const submit = handleSubmit(async (values) => {
  values.date = formatDate(date.value);
  values.time = formatTime(time.value);

  const data = {
    firstName: values.firstName,
    lastName: values.lastName,
    age: values.age,
    checkUp: values.checkUp,
    date: values.date,
    time: values.time,
  };

  try{
      const response = await axios.post(`${process.env.VUE_APP_API_URL}/Appoinments`,data);
      console.log(response);
      
      router.push('/Admin');
  }catch(error){
    console.log(error);
  }
})
</script>

<style scoped>
</style>