import { createSlice } from '@reduxjs/toolkit';

const initialState = "";

const notificationrSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        showNotficiation(state, action) {
            return JSON.parse(JSON.stringify(action.payload));
        },
        removeNotification(state, action) {
            return '';
        }
    }
})

export const { showNotficiation, removeNotification } = notificationrSlice.actions
export default notificationrSlice.reducer;