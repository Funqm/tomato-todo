import { createStore } from 'vuex'

export default createStore({
  state: {

    timerState: "small",
    focusingTodo: null,
    focusTimer: null,
    tagNow: "today",
    tomato: 1,
    rest: 5,
    internalTags: ["today", "tomorrow", "recent", "undecided", "done"],
    tags: [
      { name: "学习", color: "blue" },
      { name: "工作", color: "red" }
    ],
    todos: [
      // { id: 1, titile: "hellow", done: false, focusTime: 0, targetTime: 0, tag: "#学习", targetDate: "9/9/2017", priority: 0 }
    ]
  },
  getters: {


    getTodosByTag: state => (tag) => {

      const todos = state.todos;
      if (state.internalTags.indexOf(tag) != -1) {
        if (tag === "done") {
          return todos.filter((todo) => todo.done);
        }
        if (tag === "undecided") {
          return todos.filter((todo) => !todo.targetDate);
        }

        return todos.filter((todo) => {
          if (!todo.targetDate) {
            return false;
          }
          const today = (new Date()).setHours(0, 0, 0, 0);
          // const todoDate = (new Date(todo.targetDate)).setHours(0,0,0,0);
          const dayDis = (todo.targetDate - today) / 1000 / 60 / 60 / 24;


          if ((tag === "today" && dayDis === 0) || (tag === "tomorrow" && dayDis > 0 && dayDis <= 1) || (tag === "recent" && dayDis > 1 && dayDis <= 7)) {
            return true;
          } else {
            return false;
          }
        })

      } else {
        
        return todos.filter((todo) => {
          const tempTag = "#" + tag;
          
          return todo.tag.indexOf(tempTag) != -1
        })
      }


    },

  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push(Object(todo));

    },
    doneTodo(state, todo) {

      todo.done = true;
    },
    focusingTodo(state, todo) {
      state.focusingTodo = todo;
    },
    focus(state, todo, s = 1) {
      //console.log(todo.id);
      state.focusingTodo.focusTime += s;
    },
    stopTimer(state) {
      clearInterval(state.focusTimer);
    },
    setTagNow(state, tag) {
      state.tagNow = tag;
    }
  },
  actions: {
    focus(context, todo = this.state.focusingTodo) {
      if (!todo) {
        return;
      }
      if (context.state.focusTimer != null) {
        clearInterval(context.state.focusTimer);
      }

      context.state.focusTimer = setInterval(() => {

        if (todo.focusTime > todo.targetTime) {
          this.doneTodo(todo);
          clearInterval(context.state.focusTimer);
        }
        context.commit('focus', todo)
      }, 1000);
    }
  },

  modules: {
  }
})
