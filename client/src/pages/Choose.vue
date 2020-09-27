<template>
  <div class="choose">
    <v-container>
      <v-text-field type="number" label="Age" v-model="age" class="input"></v-text-field>
      <v-range-slider
        v-model="preferAge.range"
        :max="preferAge.max"
        :min="preferAge.min"
        hide-details
        label="Prefer Age"
        class="align-center"
      >
        <template #prepend>
          <v-text-field
            :value="preferAge.range[0]"
            class="mt-0 pt-0"
            single-line
            type="number"
            style="width: 60px"
            @change="$set(range, 0, $event)"
          ></v-text-field>
        </template>
        <template #append>
          <v-text-field
            :value="preferAge.range[1]"
            class="mt-0 pt-0"
            single-line
            type="number"
            style="width: 60px"
            @change="$set(preferAge.range, 1, $event)"
          ></v-text-field>
        </template>
      </v-range-slider>
      <v-select label="Gender" :items="genders" v-model="gender" class="input"></v-select>
      <v-select label="Prefer Gender" :items="genders" v-model="preferGender" class="input"></v-select>
      <v-btn :disabled="eneableButton" color="primary" @click="joinSearch">Start</v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Choose',
  data: () => ({
    age: 15,
    preferAge: {
      range: [0, 60],
      min: 12,
      max: 60
    },
    eneableButton: false,
    gender: 'both',
    preferGender: 'both',
    genders: [
      'Male',
      'Female',
      'both'
    ]
  }),
  mounted() {
    const searchParams = sessionStorage.getItem('searchParams')
    if (searchParams) {
      const { age, preferAge, gender, preferGender } = JSON.parse(searchParams)
      this.age = age
      this.preferGender = preferGender
      this.preferAge.range = preferAge
      this.gender = gender
    }
  },
  methods: {
    joinSearch() {
      sessionStorage.setItem('searchParams', JSON.stringify({
        age: this.age,
        preferAge: this.preferAge.range,
        gender: this.gender,
        preferGender: this.preferGender
      }))

      this.$router.replace({
        name: 'load',
        query: {
          age: this.age,
          preferAgeMin: this.preferAge.range[0],
          preferAgeMax: this.preferAge.range[1],
          gender: this.gender,
          preferGender: this.preferGender
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.choose {
  color: #000;
  min-height: 100vh;

  .input {
    display: block;
    margin: 0 0 10px;
  }
}

</style>
