<template>
  <div class="container">
    <div>
      <ScoreBord
        v-if="this.question"
        :winCount="this.winCount"
        :loseCount="this.loseCount"
      />

      <template v-if="this.question">
        <h1 v-html="this.question"></h1>

        <AnswersUser
          :answers="answers"
          v-model:chosenAnswer="chosenAnswer"
          :disabled="answerSubmiteed"
          v-if="question"
        />

        <button
          v-if="!this.answerSubmiteed"
          class="send"
          @click="submitAnswer()"
          type="button"
        >
          Send
        </button>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <ResultMessage
          v-if="answerSubmiteed"
          :correct="correctAnswer === chosenAnswer"
          :correctAnswer="correctAnswer"
          @next="fetchQuestion"
        />
      </template>
    </div>
  </div>
</template>

<script>
import ScoreBord from "./components/ScoreBord.vue";
import AnswersUser from "./components/AnswersUser.vue";
import ResultMessage from "./components/ResultMessage.vue";

export default {
  name: "App",
  components: {
    ScoreBord,
    AnswersUser,
    ResultMessage,
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
      errorMessage: "",
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
        this.errorMessage = "You have to choose an option!";
      } else {
        this.errorMessage = "";
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

<style lang="css">
@import "./styles/style.css";
</style>
