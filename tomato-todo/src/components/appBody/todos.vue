<template>
  <ul class="undone-todos">
    <li v-for="todo in undoneTodos" :key="todo.id">
      <span
        id="todos-done"
        class="el-icon-circle-check"
        @click="doneTodo(todo)"
      ></span>
      <span
        id="todos-focus"
        :class="[
          todo == $store.state.focusingTodo
            ? 'el-icon-timer'
            : 'el-icon-video-play',
        ]"
        :style="todo == $store.state.focusingTodo ? 'color: orange' : ''"
        @click="focus(todo)"
      ></span>
      <span id="todos-title">{{ todo.title }}</span>
      <span id="todos-date">{{ getDate(todo.targetDate) }}</span>
    </li> 
  </ul>
  <div class="button-show-done" @click="() => show = !show">
    <span v-if="show">隐藏</span>
    <span v-else>显示</span>已完成任务
    <sapn class="triangle" :style="show ? 'transform: rotate(180deg)' : ''"></sapn>
    </div>
    
  <ul class="done-todos" v-if="show">
     <li v-for="todo in doneTodos" :key="todo.id">
      <span
        id="todos-done"
        class="el-icon-circle-check"
        @click="doneTodo(todo)"
      ></span>
      <span
        id="todos-focus"
        :class="[
          todo == $store.state.focusingTodo
            ? 'el-icon-timer'
            : 'el-icon-video-play',
        ]"
        :style="todo == $store.state.focusingTodo ? 'color: orange' : ''"
        @click="focus(todo)"
      ></span>
      <span id="todos-title">{{ todo.title }}</span>
      <span id="todos-date">{{ getDate(todo.targetDate) }}</span>
    </li>
  </ul>
  <!--
  <p>已经完成任务</p>
  <ul class="doneTodos">
    <li v-for="todo in doneTodos" :key="todo.id">
    </li>
  </ul>
  -->
</template>
<script>
export default {
  name: "todos",
  
  data() {
    return {
      show: false
    };
  },
  methods: {
    focus(todo) {
      this.$store.commit("focusingTodo", todo);
    },
    doneTodo(todo) {
      this.$store.commit("doneTodo", todo);
    },
    getDate(date) {
      const today = new Date();

      today.setHours(0, 0, 0, 0);
      const dis = date - today.getTime();
      const oneDay = 1000 * 24 * 60 * 60;
      if (dis == 0) {
        return "今天";
      } else if (dis > 0 && dis <= oneDay) {
        return "明天";
      } else if (dis > oneDay) {
        return `${(new Date(date)).getMonth() + 1}月${(new Date(date)).getDate()}日`;
      } else {
        return date;
      }
    },
  },
  computed: {
    Todos(){
      if(this.$store.state.tagNow === "done"){
        return this.doneTodos();
      }else{
        return this.undoneTodos();
      }
    },
    undoneTodos() {
      return this.$store.getters
        .getTodosByTag(this.$store.state.tagNow)
        .filter((todo) => todo.done == false);
    },
    doneTodos(){
      return this.$store.getters
        .getTodosByTag(this.$store.state.tagNow)
        .filter((todo) => todo.done == true);
    }
  },
};
</script>

<style scoped>

li {
  display: flex;
  background: #fff;
  margin-top: 5px;
  padding: 0 10px;
  height: 35px;
  line-height: 35px;
  border-radius: 5px;
  text-align: left;
}
li span {
  display: inline-block;
  flex: 0 0;
  margin: 0 5px;
  height: 35px;
  line-height: 35px;
  font-size: 20px;
}

li span:nth-child(3) {
  flex: 1 1;
}

#todos-date {
  display: inline-block;
  font-size: 15px;
  flex-basis: 100px;
  text-align: right;
  padding-right: 5px;
}

.button-show-done {
  position: relative;
  width: 130px;
  height: 30px;
  line-height: 30px;
  text-align: left;
  margin:20px  auto;
  padding: 0 10px;
  background: black;
}



.button-show-done .triangle {
  
  position: absolute;
  right: 10px;
  top: 50%;;
  transform: translateY(-25%);
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-top-color: white;
  transform-origin: center 10%;
  transition: 0.25s linear;
  
}


</style>