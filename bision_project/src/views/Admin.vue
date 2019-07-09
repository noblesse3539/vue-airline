<template>
    <div class="Admin">
        <h1>admim</h1>
        <button @click="getCommits" style="width: 50px; height: 50px; background: black;"></button>
    </div>
</template>

<script>
export default {
    name: "Admin",
    data() {
        return {
            
        }
    },
    methods: {
        getCommits() {
            
            const baseUrl = "https://lab.ssafy.com/api/v4/projects/6071/repository/commits"
            const headers = {
                'PRIVATE-TOKEN' : '1xktvym3Jy8E75hPJf7D'
            }

            this.$http.get(baseUrl, {headers})
                .then( res => {
                    console.log(res)
                })

        },
    },
    
}
</script>