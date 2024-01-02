<template>
  <div>
    {{this.$store.state.name}}
    <button @click="changeName" value="更名">更名</button>
  </div>
</template>

<script>
export default {
  name: 'test',
  computed: {
    getName () {
      return this.$store.state.name
    }
  },
  methods: {
    changeName () {
      this.$store.commit('updateName')
    }
  }
}
</script>

<style scoped>

</style>
