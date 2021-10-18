<template>
  <div :class="[smallTimer ? 'smallTimer' : 'bigTimer']" :style="(smallTimer && !focusingTodo) ? 'width: 150px': ''">
    <span :class="['el-icon-copy-document',smallTimer ? 'small-trigger' : 'big-trigger']" @click="smallTimer = !smallTimer"></span>
      <el-progress
        :class="smallTimer ? 'small-progress' : 'big-progress'"
        type="circle"
        :percentage="getPercentage"
        :width="smallTimer ? '50' : '500'"
        :stroke-width="smallTimer ? '3' : '20'"
        color="red"
      >
        <span>{{lastTime}}</span>
      </el-progress>
      <span v-if="focusingTodo">{{ focusingTodo.title }}</span>
      <div :class="smallTimer ? 'small-button' : 'big-button'">
        <div v-if="isStopped">
          <span class="el-icon-video-play" @click="start()"></span>
        </div>
        <div v-else-if="isPaused && !isRest">
          <span class="el-icon-video-play" @click="start()"></span>
          <span class="el-icon-error" @click="stop()"></span>
        </div>
        <div v-else-if="!isRest">
          <span class="el-icon-video-pause" @click="pause()"></span>
        </div>
        <div v-else>
          <span class="el-icon-success" @click="success()"></span>
        </div>
      </div>
    </div>
   

</template>

<script>
export default {
  name: "timer",
  data() {
    return {
      isRest: false,
      timer: null,
      smallTimer: true,
      usedTime: 0,
      isStopped: false,
      isPaused: false,
    };
  },
  methods: {
    start() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        this.usedTime++;

      }, 1000);
      if(!this.isRest){
        this.$store.dispatch("focus");
      }
      this.isStopped = false;
      this.isPaused = false;
    },
    stop() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.isStopped = true;
      if(this.isRest)
        this.$store.commit("stopTimer");
    },
    pause() {
      if (this.timer) {
        clearInterval(this.timer);
      }

      this.isPaused = true;
      this.$store.commit("stopTimer");
    },
    success() {
      if (this.timer) {
        clearInterval(this.timer);
        this.isRest = !this.isRest;
        this.usedTime = 0;
      }
    }
  },
  computed: {
    targetTime() {
      if(this.isRest){
        return this.$store.state.rest * 60 
      }else{
        return this.$store.state.tomato * 60 ;
      }
    },
    focusingTodo() {
      return this.$store.state.focusingTodo;
    },
    lastTime() {
      const min =  Math.floor((this.targetTime - this.usedTime) / 60);
      const s = (this.targetTime - this.usedTime) % 60;
      return `${min} : ${s != 0 ? s : '00'}`

    },
    getPercentage() {
      return Math.floor((this.usedTime / this.targetTime) * 100);
    },
  },
  watch: {
    focusingTodo(newTodo, oldTodo) {
      if (newTodo && newTodo != oldTodo) {
        this.smallTimer = false;
        this.start();
      }
    },
    usedTime(nowUsed){
      if(nowUsed >= this.targetTime){
        this.usedTime = 0;
        this.stop();
        this.isRest = !this.isRest;
       
      }
    }
  },
};
</script>

<style scoped>
.smallTimer {
  position: fixed;
  bottom: 10px;
  left: 50%;
  height: 55px;
  width: 300px;
  border-radius: 5px;
  line-height: 55px;
  padding: 0 5px 0 0;
  background-color: orange;
}

.bigTimer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background-color: orange;
}

.small-trigger {
  float: left;
  font-size: 2px;
}

.big-trigger {
  float: left;
  margin: 10px;
  font-size: 30px;
}
.small-progress {
  margin-left: 20px;
  position: absolute;
  top: 50%;
  left: 2px;
  transform: translateY(-50%);
}
.small-button {
  float: right;
  font-size: 30px;
}
.small-button span {
  padding: 0 2px;
}

.big-button {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  font-size: 70px;
}
.big-progress {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
  
}
</style>