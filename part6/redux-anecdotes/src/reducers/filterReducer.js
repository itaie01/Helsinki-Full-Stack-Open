import { createSlice } from '@reduxjs/toolkit';

const initialState = "";

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        filterAnecdotes(state, action) {
            return action.payload;
        }
    }
})

// const reducer = (state = initialState, action) => {
//     return action.type === 'FILTERED' ? action.payload : state
// }

// export const filterAnecdotes = text => {
//     return {
//         type: 'FILTERED',
//         payload: text
//     }
// }

export const { filterAnecdotes } = filterSlice.actions
export default filterSlice.reducer;