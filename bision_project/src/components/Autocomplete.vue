<template>
    <div class="autocomplete">
        <input type="text"  v-model="search" @input="onChange"/>
        <ul class="autocomplete-results">
        <li 
            v-for="(result, i) in results"
            :key="i"
            @click="setResult(result)"
            class="autocomplete-result"
        >
        </li>
        </ul>
  </div>
</template>

<script>
import './Autocomplete.css'

export default {
    name : 'Autocomplete',
    data() {
        return {
            search: '',
            results: [],
            isOpen: false,
        }
    },
    props: {
        items: {
            type: Array,
            requried: false,
            default: () => [],
        },
    },
    mounted() {
        // console.log(this.items)
    },
    methods: {
        onChange() {
            this.isOpen = true,
            this.filterResults()
        },
        filterResults() {
            this.results = this.items.filter( item => {
                if ( item.name_kor.includes(this.search)
                    || item.name_eng.toLowerCase().match(this.search.toLowerCase()) 
                    || item.nation_kor.includes(this.search)
                    || item.city_kor.includes(this.search)
                    || item.city_eng.includes(this.search)
                    || item.code.toLowerCase().includes(this.search.toLowerCase())
                    ) {
                    return item
                }
            })
            console.log(this.results)
        },
        setResult() {
            this.search = result
            this.isOpen = false
        },
    },
}
</script>