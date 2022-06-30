
<template>
  <div id="editor"></div>
</template>

<script>
import Vue from 'vue'
// import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
//  components: { Editor, Toolbar },
  data() {
      return {
          
      }
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      const editor = new wangEditor(`#editor`);
      console.log(editor)
      editor.config.onchange = (newHtml) => {
        this.editorData = newHtml;
        this.editorData = val;
        editor.create();
        this.editor = editor;
        this.editor.txt.html(val);
      };
    },
  },
};
</script>