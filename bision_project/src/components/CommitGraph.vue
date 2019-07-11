<template>
    <canvas id="gitGraph"></canvas>
</template>

<script>
import "./CommitGraph.css"

export default {
    name: "CommitGraph",
    data() {
        return {
            commitLogs: []
        }
    },
    beforeMount() {
        this.getCommits()
    },
    methods: {
        getCommits() {
            
            const baseUrl = "https://lab.ssafy.com/api/v4/projects/6071/repository/commits?all=true&with_stats=true&per_page=100"
            const headers = {
                'PRIVATE-TOKEN' : '1xktvym3Jy8E75hPJf7D',
            }

            this.$http.get(baseUrl, {headers})
                .then( res => {
                    console.log(res.data)
                    this.commitLogs = res.data
                })
                .then( () => {
                    this.drawCommitGraph()
                })

        },
        drawCommitGraph() {

            let graphConfig = new GitGraph.Template({
                branch: {
                    color: "#000000",
                    lineWidth: 3,
                    spacingX: 25,
                    mergeStyle: "bezier",
                    showLabel: true,                // display branch names on graph
                    labelFont: "normal 10pt Arial",
                    labelRotation: 0,
            },
                commit: {
                    spacingY: -25,
                    dot: {
                        size: 8,
                        strokeColor: "#000000",
                        strokeWidth: 10
                    },
                    tag: {
                        font: "normal 10pt Arial",
                        color: "yellow"
                    },
                    message: {
                        color: "black",
                        font: "normal 12pt Arial",
                        displayAuthor: false,
                        displayBranch: false,
                        displayHash: false,
                    }
                },
                arrow: {
                    size: 12,
                    offset: 3
                }
            });

            let gitgraph = new GitGraph({
                reverseArrow: false,
                orientation: 'vertical',
                mode: 'extended',
                template: graphConfig
            });

            // Gitlab Commits API 이용 그래프 그리는 부분
            // this.commitLogs
            const masterCode   = "44a98fb3"
            const branchHash   = {
                // 마스터 == 이민교
                 minkyo : '0',
                 mozziCheek : '0',
                'mozzichecck' : '0',
                '이민교' : '0',
                'goodminkyo' : '0',

                // 정관
                '류정관' : '1',

                // 병석
                'opalcat' : '2',

                // 세민
                '정세민' : '3',
                'redcar' : '3',

                // 혜리
                'Hyeri' : '4',
            }

            const branches = new Array(5)   // 브랜치 저장용 배열
            const master   = gitgraph.branch({name: 'Master'})
            master.commit("initial commit")

            this.commitLogs.forEach( (commit, index) => {
                
                const title    = commit.title
                const name     = commit.author_name
                let branchName = ''
                let isMerge    = false
                title.slice(0, 5) === 'Merge' ? isMerge=true : isMerge=false
                
                // commit메세지에서 branch 이름 분리
                for (let i=0; i < title.length; i++) {
                    if (title.charAt(i) == '|') {
                        break
                    } else {
                        branchName += title.charAt(i)
                    }
                }
                const branchesIndex = branchHash[branchName]
                
                let targetMerge = ''
                if ( isMerge == true ) {

                    let isQuote = false
                    let counter = 0

                    for (let i=0; i < title.length; i++) {
                        if (counter == 2) {
                            break
                        }
                        if (title.charAt(i) == "'") {
                            isQuote = true
                            counter += 1
                        }
                        if (isQuote == true && title.charAt(i) !== "'") {
                            targetMerge += title.charAt(i)
                        }
                    }

                    branches[branchHash[targetMerge]].merge(master)
                    return
                }

                // 해당 브렌치 이름 해쉬 통하여 배열 내 위치 알아내기
                if (branchHash[branchesIndex] != 0) {
                    branches[branchesIndex] = gitgraph.branch({name: name})
                    branches[branchesIndex].commit(title)
                } else {
                    branches[branchesIndex].commit(title)
                }

                return
            })
        },
    },
}
</script>