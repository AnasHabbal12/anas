<template>
  <div class="budass-tudo">
    <div class="title has-text-centered">
      badass todo
    </div>
    <form @submit.prevent="addTodo">
      <div class="field is-grouped mb-5">
        <div class="control">
          <input v-model="newTodoContent" class="input" type="text" placeholder="Add todo">
        </div>
        <div class="control">
          <button class="button is-info" :disabled="!newTodoContent">
            add
          </button>
        </div>
      </div>
    </form>

    <div
    v-for="todo in todos"
    class="card mb-5" :class="{'has-background-success-light' : todo.done}">
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column"
            :class="{'has-text-success line-through' : todo.done }">
              {{ todo.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button class="button "
              :class="todo.done ? 'is-success' : 'is-light'"
              @click="toggleDone(todo.id)"
              >&check;</button>
              <button
              @click="deleteTodo(todo.id)"
              class="button is-danger ml-2">&cross;</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script setup>
/* 
imports
*/
import { ref, onMounted } from 'vue'
import { collection, onSnapshot, addDoc, deleteDoc, updateDoc, doc, query, orderBy } from 'firebase/firestore'
import { db } from '@/firebase'

/**
 * firebase refs
 */
const todoCollection = collection(db, 'todos')
const todosOrder = query(todoCollection, orderBy("date", 'desc'))

/* 
todos
*/
const todos = ref([
  // {
  // id: 'id1',
  // content: 'Shave my butt', 
  // done: false
  // },
  // {
  // id: 'id2',
  // content: 'Shave my ass', 
  // done: true
  // },
  // {
  // id: 'id3',
  // content: 'Shave my dick', 
  // done: false
  // }
])

/**
 * get Data
 */
onMounted(() => {
  // const querySnapshot = await getDocs(collection(db, 'todos'));
  // let fbTodos = []
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.id, " => ", doc.data())
  //   const todo = {
  //     id: doc.id,
  //     content: doc.data().content,
  //     done: doc.data().done
  //   }
  //   fbTodos.push(todo);
  // })
  // todos.value = fbTodos
  onSnapshot(todosOrder, (querySnapshot) => {
  const fbTodos = [];
  querySnapshot.forEach((doc) => {
    const todo = {
      id: doc.id,
      content: doc.data().content,
      done: doc.data().done
    }
    fbTodos.push(todo);
  })
  todos.value = fbTodos
})
})
/*
todo function
*/
const newTodoContent = ref('') 
const addTodo = () => {
  // const newTodo = {
  //   id: uuidv4(),
  //   content: newTodoContent.value, 
  //   done: false
  // }
  // todos.value.unshift(newTodo);
  addDoc(todoCollection, {
    content: newTodoContent.value,
    done: false,
    date: Date.now()
})

  newTodoContent.value = '';
}
/**
 * delete Todo
 */
const deleteTodo = id => {
  //todos.value = todos.value.filter(todo => todo.id !== id)
  deleteDoc(doc(db, "todos", id))
}
/**
 * toggle done
 */
const toggleDone = iv => {
  const index = todos.value.findIndex(todo => todo.id === iv)
  //todos.value[index].done = !todos.value[index].done;
  const washingtonRef = doc(db, "todos", iv);
  updateDoc(washingtonRef, {
    done: !todos.value[index].done
  });
}
</script>

<style>
@import 'bulma\css\bulma.min.css';

.budass-tudo {
  max-width: 500px;
  padding: 20px;
  margin: 0 auto;
}
.line-through {
  text-decoration: line-through;
}
</style>
