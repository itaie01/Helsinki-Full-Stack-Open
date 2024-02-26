import { createSlice } from '@reduxjs/toolkit';

const initialState = "";

const notificationrSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        showNotficiation(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return '';
        },
    }
})

export const setNotification = (message, duration) => {
    return dispatch => {
        dispatch(showNotficiation(message))
        setTimeout(() => {
            dispatch(removeNotification())
        }, duration * 1000)
    }
}

export const { showNotficiation, removeNotification } = notificationrSlice.actions
export default notificationrSlice.reducer;