<template>
    <section class="score-bord">
        Player <span>{{ winCount }}</span> x <span>{{ loseCount }}</span> Computer
    </section>
</template>

<script>
    export default{
        props: ['winCount', 'loseCount']
    }
</script>

<style lang="scss" scoped>

    section.score-bord {
        font-size: 18px;
        border-bottom: 1px solid #000;
        padding: 24px;

        span {
            font-weight: bold;
            padding: 8px;
            border: 1px solid #000;
        }
    }

</style>