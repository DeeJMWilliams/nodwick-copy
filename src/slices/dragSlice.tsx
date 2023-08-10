import {createSlice} from '@reduxjs/toolkit';
import {Item} from '../types.js';

type stateProps = {
    value: Item;
}

const initialState:stateProps = {
    value: {
        gid: '',
        lid: '',
        iid: '',
        name: '',
        type: '',
    }
}

const dragSlice = createSlice({
    name: 'draggedItem',
    initialState,
    reducers: {
        setDraggedItem: (state, action:{type:string, payload:Item}) => {
            state.value = action.payload;
        },
        resetDraggedItem: (state) => {
            state.value = initialState.value;
        }
    }
})

export const {setDraggedItem, resetDraggedItem} = dragSlice.actions;
export const selectDraggedItem = (state) => state.draggedItem.value;
export default dragSlice.reducer;