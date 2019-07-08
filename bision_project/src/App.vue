<template>
  <div id="app">
    <Header></Header>
    <v-content>
				<router-view/>
		</v-content>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

export default {
  name: 'app',
  components: {
    Header,
    Footer
  }
}
</script>
