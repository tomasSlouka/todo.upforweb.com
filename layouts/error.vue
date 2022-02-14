<template>
    <div id='layout_error'>
        <div id='used-layout'> Layout - error </div>
        <div class='grid col-1 auto align-items-center'>
          <div v-if="error.statusCode === 404">
            <h1>404 - Page not found</h1>
            <p>{{ error.message }}</p>
          </div>
            <h1 v-else>An error occurred</h1>
        </div>
    </div>
</template>

<style scoped>
  h1 {
    text-align: center;
    font-size: 30px;
    font-weight: 400;
  }
  p {
    text-align: center;
  }


  div.grid {
    height: 100vh;
  }
</style>

<script>
export default {
  props: ['error'],
  layout: 'error-default' // you can set a custom layout for the error page
}
</script>