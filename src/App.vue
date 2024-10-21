<template>
  <div>
    <template v-if="this.question">

      <h1 v-html="this.question"></h1>

        <template v-for="(answer, index) in this.answers" :key="index">
          <input 
            type="radio" 
            name="options" 
            value="answer">
          <label v-html="answer"></label> <br>
        </template> 

      <button class ="send" type="button">Send</button>

    </template>
  </div>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      question: undefined,
      incorrectAnswers: undefined,
      correctAnswer: undefined,
    }
  },
  computed: {
    answers() {
      var answers = [...this.incorrectAnswers];
      answers.splice(Math.floor(Math.random() * (answers.length + 1)), 0, this.correctAnswer);
      return answers;
    }
  },

  methods: {
    async fetchQuestion() {
      const maxRetries = 5;
      let attempts = 0;

      while (attempts < maxRetries) {
        try {
          const response = await this.axios.get('https://opentdb.com/api.php?amount=1&category=18');
          this.question = response.data.results[0].question;
          this.incorrectAnswers = response.data.results[0].incorrect_answers;
          this.correctAnswer = response.data.results[0].correct_answer;

          if (this.question && this.incorrectAnswers && this.correctAnswer) {
            break;
          }
        } catch (error) {
          console.error('Erro ao buscar a pergunta:', error);
        }
        attempts++;
      }

      if (attempts === maxRetries) {
        console.error('Número máximo de tentativas atingido.');
      }
    }
  },

  created() {
    this.fetchQuestion();
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 960px;

  input[type="radio"] {
    margin: 10px;
  }

  button[type="button"] {
    margin-top: 12px;
    height: 40px;
    min-width: 120px;
    padding: 0 16px;
    color: #fff;
    background-color: #1867c0;
    border: 1px #1867c0 solid;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: #2c3e50;
    };
    transition: background-color 0.5s ease, border-color 0.10s ease;
}
}
</style>
