<template>
  <div id="app">
    <Header></Header>
    <v-content>
      <v-app>
				<router-view/>
      </v-app>
		</v-content>
    <Footer style="z-index: 2000 !important;"></Footer>
  </div>
</template>

<script type="application/javascript" src="http://ipinfo.io/?format=jsonp&callback=getIP"></script>
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
