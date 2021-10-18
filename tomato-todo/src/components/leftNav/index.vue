<template>
  <div class="nav">
    <ul class="internalTags" @click="(event) => $store.commit('setTagNow', event.target.id)">
      <li id="today"><span class="el-icon-sunny" style="color:green"></span>今天</li>
      <li id="tomorrow"><span class="el-icon-sunrise" style="color:red"></span>明天</li>
      <li id="recent"><span class="el-icon-date el-" style="color:blue"></span>即将到来</li>
      <li id="undecided"><span class="el-icon-edit-outline" style="color:purple"></span>待定</li>
      <li id="done"><span class="el-icon-finished" style="color:grey"></span>已完成</li>
    </ul>
    <ul class="userTags" @click="(event) => $store.commit('setTagNow', event.target.id)">
      <li v-for="tag in $store.state.tags" :key="tag.name" :id="tag.name">{{ tag.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "leftNav",
};
</script>

<style scoped>
.nav {
  text-align: left;
  font-size: 20px;
}

.internalTags {
  margin: 0 10px ;
  padding: 10px 0 20px;
  border-bottom: 1px solid #f3f5f6;

}

.internalTags span{
  padding: 0 10px 0 0;
}

li {
  padding: 5px;
  cursor: pointer;
}

.userTags {
  margin: 0 10px ;
  padding: 10px 0 20px;
}
</style>