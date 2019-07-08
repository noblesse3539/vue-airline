<template>
    <div class="markdown-box">
        <div class="markdown-title">
            <p>Title</p>
            
            <input class="markdown-title-input" v-model="titleInput"/>
        </div>
        
        <div class="markdown-body">
            <p>Content</p>
            <markdown-editor v-model="input" ref="markdownEditor"></markdown-editor>
            <div class="write-btn-box">
                <router-link to="/portfolio"><v-btn color="info" class="write-btn">Write</v-btn></router-link>
                <router-link to="/portfolio"><v-btn color="success" class="write-btn">Revise</v-btn></router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import markdownEditor from 'vue-simplemde/src/markdown-editor'

    export default {
        name: 'PortfolioWriter',
        comopnents: {
            markdownEditor
        },
        data: function() {
            return {
                input: 'Tell your story!',
                titleInput: "Let's give a nice title!"
            }
        },
        
    }

</script>
<style>
  @import '~simplemde/dist/simplemde.min.css';

  .markdown-title {
      font-size: 3rem;
      font-family: Roboto;
      font-weight: bolder;
  }

  .markdown-title-input {
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid #ddd;
      width: 100%;
  }

  .markdown-box {
      margin-top: 120px;
      margin-right: 5vw;
      margin-left: 5vw;
  }

  .markdown-body {
      font-size: 2rem;
      font-weight: bolder;
      margin-top: 2%;
      margin-bottom: 7%;
  }

  .write-btn:nth-child(0) {
      margin-left: auto;
      display: block;
  }

  .write-btn-box {
      display: flex;
      justify-content: flex-end;
      margin-top: 2%;
  }
</style>