<template>
  <div>
    <ScoreBord
      v-if="this.question"
      :winCount="this.winCount"
      :loseCount="this.loseCount"
    />

    <template v-if="this.question">
      <h1 v-html="this.question"></h1>

      <template v-for="(answer, index) in this.answers" :key="index">
        <input
          :disabled="this.answerSubmiteed"
          type="radio"
          name="options"
          :value="answer"
          v-model="this.chosenAnswer"
        />
        <label v-html="answer"></label> <br />
      </template>

      <button
        v-if="!this.answerSubmiteed"
        class="send"
        @click="submitAnswer()"
        type="button"
      >
        Send
      </button>

      <section class="result" v-if="this.answerSubmiteed">
        <h4
          v-if="this.correctAnswer === this.chosenAnswer"
          v-html="
            '✅ Great! You got it right. The correct answer is: ' +
            correctAnswer
          "
        ></h4>

        <h4
          v-else-if="this.correctAnswer !== this.chosenAnswer"
          v-html="'❌ I am sorry. The correct answer is: ' + correctAnswer"
        ></h4>

        <button
          v-if="this.answerSubmiteed"
          class="send"
          type="button"
          @click="fetchQuestion()"
        >
          Next question
        </button>
      </section>
    </template>
  </div>
</template>

<script>
import ScoreBord from "./components/ScoreBord.vue";

export default {
  name: "App",
  components: {
    ScoreBord,
  },

  data() {
    return {
      question: undefined,
      incorrectAnswers: undefined,
      correctAnswer: undefined,
      chosenAnswer: undefined,
      answerSubmiteed: false,
      winCount: 0,
      loseCount: 0,
    };
  },
  computed: {
    answers() {
      var answers = [...this.incorrectAnswers];
      answers.splice(
        Math.floor(Math.random() * (answers.length + 1)),
        0,
        this.correctAnswer
      );
      return answers;
    },
  },

  methods: {
    async fetchQuestion() {
      let results = [];

      while (results.length === 0) {
        try {
          const response = await this.axios.get(
            "https://opentdb.com/api.php?amount=1&category=18"
          );
          results = response.data.results;

          if (Array.isArray(results) && results.length > 0) {
            this.answerSubmiteed = false;
            this.chosenAnswer = undefined;
            this.question = results[0].question;
            this.incorrectAnswers = results[0].incorrect_answers;
            this.correctAnswer = results[0].correct_answer;
            console.log("Pergunta obtida com sucesso");
            break;
          }
        } catch (error) {
          if (!error.response && error.code === "ERR_NETWORK") {
            alert("Erro de rede");
            break;
          } else {
            console.error("Erro ao buscar a pergunta: ", error);
          }
        }
      }
    },

    submitAnswer() {
      if (!this.chosenAnswer) {
        alert("Pick an answer");
      } else {
        this.answerSubmiteed = true;
        if (this.chosenAnswer === this.correctAnswer) {
          this.winCount++;
        } else {
          this.loseCount++;
        }
      }
    },
  },

  created() {
    this.fetchQuestion();
  },
};
</script>

<style lang="scss"></style>
