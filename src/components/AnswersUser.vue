<template>
  <div>
    <template v-for="(answer, index) in answers" :key="index">
      <input
        :disabled="disabled"
        type="radio"
        name="options"
        :value="answer"
        @change="updateAnswer(answer)"
        :checked="chosenAnswer === answer"
      />
      <label v-html="answer"></label><br />
    </template>
  </div>
</template>

<script>
export default {
  name: "AnswersUser",
  props: {
    answers: Array,
    chosenAnswer: String,
    disabled: Boolean,
  },
  methods: {
    updateAnswer(answer) {
      this.$emit("update:chosenAnswer", answer); // Emite o valor para o componente pai
    },
  },
};
</script>

<style lang="css">
@import "../styles/style.css";
</style>
