import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  formData: {
    title: '',
    description: '',
    date: '',
    priority: ''
  },
  storage : []
}

// Priority Queue class to sort tasks by priority and due date
class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  // Compare tasks by priority and due date
  compare(taskA, taskB) {
    if (taskA.priority === taskB.priority) {
      return new Date(taskA.date) - new Date(taskB.date); // Compare by due date if priority is the same
    }
    return taskA.priority - taskB.priority; // Compare by priority
  }

  // Insert task into the queue
  enqueue(task) {
    this.queue.push(task);
    this.queue.sort(this.compare); // Sort the queue after inserting the task
  }

  // Get the sorted tasks
  getTasks() {
    return this.queue;
  }
}

export const getDataSlice = createSlice({
  name: 'getData',
  initialState,
  reducers: {
    // function to get user input in form
    updateFormData: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },

    // function to reset the form
    resetFormData: (state) => {
      state.formData =  state.formData ;
    },

    // function to store data
    storeData: (state,action) => {

      const { title, priority } = state.formData;

      // Check if the title or priority already exists in the storage
      const isDuplicate = state.storage.some(
        (item) => item.title === title || item.priority === priority
      );

      if (isDuplicate) {
        alert('Please enter unique title or priority value');
        return; // Do not add the duplicate task
      }

      // Create a priority queue instance
      const priorityQueue = new PriorityQueue()

      // Enqueue all existing tasks into the priority queue
      state.storage.forEach(task => priorityQueue.enqueue(task))

      // Add new form data to the priority queue
      priorityQueue.enqueue({ ...state.formData })

      // Retrieve the sorted tasks from the priority queue
     state.storage = priorityQueue.getTasks()
    },
    
    // delete the data
    deleteData: (state, action) => {
      state.storage = state.storage.filter((_, index) => index !== action.payload); // Delete the task by index
    },

    // update the list data
    updateData: (state, action) => {
      const { id, updatedData } = action.payload;
      state.storage[id] = updatedData; // Update the specific task data at the given index
    },
    // Update the status of a task
    updateStatus: (state, action) => {
      const { id, newStatus } = action.payload;
      state.storage[id].status = newStatus;
    },

  },
})

// Action creators are generated for each case reducer function
export const { updateFormData,resetFormData, storeData, deleteData ,updateData, updateStatus} = getDataSlice.actions

export default getDataSlice.reducer