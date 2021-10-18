<template>
  <div class="addTodo">
    <el-input
      placeholder="请输入内容"
      prefix-icon="el-icon-plus"
      v-model="todoTitle"
    >
    </el-input>
    <span class="setTomato">
      <span class="el-icon-timer"></span>
      <el-input-number
        v-model="tomatoSum"
        @change="handleChange"
        controls-position="right"
        style="border-width: 0px"
        :min="1"
        :max="100"
        label="描述文字"
      ></el-input-number>
    </span>

    <template v-if="isDateTag">
      <el-select v-model="selectedTag" placeholder="#标签">
        <el-option
          v-for="(tag) in $store.state.tags"
          :key="tag.name"
          :label="tag.name"
          :value="tag.name"
        ></el-option>
      </el-select>
    </template>
    <template v-else>
      <div class="block">
      
      <el-date-picker
        v-model="date"
        type="date"
        placeholder="选择日期"
        :disabled-date="disabledDate"
        :shortcuts="shortcuts"
    >  
    </el-date-picker>
    </div>
      
    </template>
  </div>
</template>

<script>
export default {
  name: "addTodo",
  data() {
    return {
      selectedTag: "",
      tomatoSum: 3,
      todoTitle: "dsad",
      date: null,
      disabledDate(time) {
        const now = new Date();
        now.setHours(0,0,0,0);
        return time.getTime() < now.getTime();
      },
      shortcuts: [
        {
          text: "今天",
          value: new Date(),
        },
        {
          text: "明天",
          value: () => {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24);
            return date;
          },
        },
        {
          text: "最近",
          value: () => {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
            return date;
          },
        },
      ],
    };
  },
  methods: {
    add() {
      const obj =  {
        id: this.$store.state.todos.length,
        title: this.todoTitle,
        done: false,
        focusTime: 0,
        targetTime: this.tomatoSum * this.$store.state.tomato * 60,
        tag: "#",
        targetDate: this.date ? this.date.setHours(0,0,0,0) : 0,
        priority: 0,
      }
      
      if(["today", "tomorrow", "recent", "undecided"].indexOf(this.tagNow) != -1){
        obj.tag += this.selectedTag;
        const today = (new Date()).setHours(0,0,0,0);
        const oneday =  3600 * 1000 * 24;
        if(this.tagNow == "today"){
          obj.targetDate = today;
        }else if(this.tagNow == "tomorrow"){
          obj.targetDate = today + oneday;
        }else if(this.tagNow == "recent"){
           obj.targetDate = today + oneday * 7;
        }else if(this.tagNow == "undecided"){
           obj.targetDate = 0;
        }
      }else{
        obj.tag += this.tagNow;
      }
      this.$store.commit("addTodo",  obj);
    },
  },
  computed: {
    tagNow(){
      //console.log(this.$store.state.tagNow)
      return this.$store.state.tagNow
    },
    
  },
  
  mounted() {
    const plus = document.getElementsByClassName("el-icon-plus")[0];
    plus.addEventListener("click", () => {
      if(this.todoTitle === "") return;
      this.add();
      this.todoTitle = "";
    });
  },
};
</script>

<style scoped>
.addTodo {
  display: flex;
}

.setTomato {
  display: inline-block;
  position: relative;
}

.setTomato .el-icon-timer {
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
  z-index: 1;
  font-size: 20px;
  color: darkorange;
}

.setTomato input {
  vertical-align: center;
  border: aqua;
  background-color: black;
}

.el-input__icon {
  width: 50px;
}
</style>