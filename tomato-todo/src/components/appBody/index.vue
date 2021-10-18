<template>
  <el-container class="body">
    <el-header>
      <h1 @click="$router.push('about')">{{ getTag }}</h1>
      <div class="sort">
           <el-dropdown>
        <span class="el-dropdown-link sortButton ">
          <i class="el-icon-sort"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu >
            <el-dropdown-item>按清单排序</el-dropdown-item>
            <el-dropdown-item>按到期日排序</el-dropdown-item>
            <el-dropdown-item>按优先级排序</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      </div>
    </el-header>
    <today-info>
    </today-info>
    <add-todo v-if="$store.state.tagNow != 'done'"></add-todo>
    <todos ></todos>
    <div>
    </div>
  </el-container>
</template>

<script>
//import TodayInfo from './todayInfo.vue';
import todayInfo from "./info.vue"
import addTodo from "./addTodo.vue"
import todos from "./todos.vue"

export default {
  name: "appBody",
  components: {todayInfo, addTodo, todos},
  data() {
    return {
      tagNow: 4,
    };
  },
  computed: {
    getTag() {
      const tag = this.$store.state.tagNow;
      const map = new Map([
        ["today", "今天"],
        ["tomorrow", "明天"],
        ["undecided", "待定"],
        ["recent", "最近"],
        ["done", "已完成"]
      ])
      if(map.has(tag)){
        return map.get(tag);
      }else{
        return tag;
      }
    },
  },
};
</script>


<style scoped>
.body {
  background-color: skyblue;
  height: 100%;
  margin: 20px;
  
}

h1 {
    float: left;
    font-size: 30px;
}
.sort {
    float: right;
}

.sortButton {
  display: inline-block;
  width: 40px;
  height: 30px;
  border-radius: 1%;
  line-height: 30px;
  font-size: 20px;
  background-color: #0075c1;
}

 .el-icon-sort {
     font-size:  100%;
 }

.el-header {
    margin:15px 0;
}



</style>
    TodayInfo