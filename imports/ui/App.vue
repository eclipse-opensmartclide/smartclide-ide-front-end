<template>
  <div class="container">
    <header>
      <h1>SmartCLIDE IDE</h1>
    </header>
    <ul>
      <Home/>
<!--      <Task-->
<!--          v-for="task in getTasks()"-->
<!--          v-bind:key="task._id"-->
<!--          v-bind:task="task"-->
<!--      />-->
    </ul>
  </div>
</template>

<script>
import Task from "./components/_old/Task.vue";
import Hello from "/imports/ui/components/_old/Hello.vue"
import Home from "/imports/ui/components/Home"
export default {
  components: {
    Task,
    Hello,
    Home
  },
  data() {
    return {};
  },
  methods: {
    getTasks() {
      return [
        { _id: 1, text: "This is task 1" },
        { _id: 2, text: "This is task 2" },
        { _id: 3, text: "This is task 3" }
      ];
    }
  }
};
</script>

