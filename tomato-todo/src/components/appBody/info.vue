<template>
  <section class="info">
      <div><p>{{predictTime}}</p><p>预计时间(h)</p></div>
      <div><p>{{undoneSum}}</p><p>待完成任务</p></div>
      <div><p>{{focusedTime}}</p><p>已专注时间(h)</p></div>
      <div><p>{{doneSum}}</p><p>已完成任务</p></div>
  </section>
</template>

<script>
export default {
  name: "info",
  data(){
      return {

      }
  },
  computed: {
      predictTime(){
          let s = 0;
          for(const todo of this.$store.getters.getTodosByTag(this.$store.state.tagNow)){
              s += todo.targetTime;
          }
          return (s / 60 / 60).toFixed(1);
      },
      undoneSum(){
          let sum = 0;
          for(const todo of this.$store.getters.getTodosByTag(this.$store.state.tagNow)){
              if(!todo.done){
                  sum++;
              }
          }
          return sum;
      },
      focusedTime(){
          let s = 0;
          for(const todo of this.$store.getters.getTodosByTag(this.$store.state.tagNow)){
              s += todo.focusTime;
          }
          return (s / 60 / 60).toFixed(1);
      },
      doneSum(){
          let sum = 0;
          for(const todo of this.$store.getters.getTodosByTag(this.$store.state.tagNow)){
              if(todo.done){
                  sum++;
              }
          }
          return sum;
          
      }
  }
  
};
</script>

<style scoped>
.info {
    display: flex;
    height: 100px;
    border-radius: 5px;

    background-color:aqua;
}

.info>div {
    flex: 1 1;
    height: 100px;
}

div>p:first-child {
    padding-top: 10px;
    height: 40px;
    font-size:40px;
    line-height:normal;
}

div>p:first-child+p {
    margin-top: 10px;
    height: 30px;
    line-height: 30px;
}


</style>