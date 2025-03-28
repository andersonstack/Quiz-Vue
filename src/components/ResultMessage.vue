<template>
  <section class="result">
    <h4
      v-if="correct"
      v-html="'✅ Great! The correct answer is: ' + correctAnswer"
    ></h4>
    <h4
      v-else
      v-html="'❌ I am sorry. The correct answer is: ' + correctAnswer"
    ></h4>
    <button class="send" type="button" @click="$emit('next')">
      Next question
    </button>
  </section>
</template>

<script>
export default {
  name: "ResultMessage",
  props: {
    correct: Boolean,
    correctAnswer: String,
  },
};
</script>

<style lang="css">
@import "../styles/style.css";
</style>
