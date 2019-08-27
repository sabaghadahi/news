<template>
  <div>
    <div><navbar></navbar></div>
    <div><crousel></crousel></div>
    <div>
        <section class="section">
          <div class="container">
            <div class="columns is-multiline">
              <div
                class="column is-one-quarter"
                v-for="(article, index) in articles"
                :key="index">
                <a :href="article.url" target="_blank">
                  <div class="card">
                    <div class="card-image">
                      <figure class="image is-3by2">
                        <img :src="article.urlToImage" :alt="article.title">
                      </figure>
                    </div>
                    <div class="card-content">
                      <div class="content">{{ article.title }}</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
    </div>
  </div>
</template>

<script>
import navbar from '~/components/navbar.vue'
import crousel from '~/components/crousel.vue'
import firebase from 'firebase'
export default {
  components: {
      navbar,
      crousel
  },
    methods: {
        googleSignIn () {
            this.provider = new firebase.auth.GoogleAuthProvider()
            firebase.auth().signInWithPopup(this.provider).then(result => {
                // store the user ore wathever
                this.$router.push('/charts')
            }).catch(e => {
                this.$snotify.error(e.message)
                console.log(e)
            })
        }
    },
    async asyncData({ app }) {
        const { articles } = await app.$axios.$get(
            `https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=${
                process.env.API_KEY
            }`
        );

        return { articles };
    },
}
</script>

<style>

</style>
