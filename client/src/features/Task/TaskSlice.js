import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
    const response = await fetch("http://localhost:5000/api/tasks");
    return response.json();
});

export const createTask = createAsyncThunk("tasks/createTask", async (tasksData) => {
    const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tasksData),
    });
    return response.json();
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (taskId) => {
    await fetch(`http://localhost:5000/api/tasks/${taskId}`, { method: "DELETE" });
    return taskId;
});
export const toggleTask = createAsyncThunk("tasks/toggleTask",async (taskId)=>{
    const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/toggle`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"}
    });
    return await response.json();
})
export const updateTask = createAsyncThunk("tasks/updateTask", async ({ taskId, taskData }) => {
    const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
    });
    return response.json();
});

const tasksSlice = createSlice({
    name: "tasks",
    initialState: { items: [], status: "idle", error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.items = state.items.filter(task => task._id !== action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.items.findIndex(task => task._id === action.payload._id);

                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(toggleTask.fulfilled,(state,action)=>{
                const index = state.items.findIndex(task =>task._id === action.payload._id);
                if(index !== -1){
                    state.items[index].completed = action.payload.completed;
                }
            })
    }
});
export default tasksSlice.reducer;