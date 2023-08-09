import {createSlice} from '@reduxjs/toolkit';
import {Item} from '../types.js';

type stateProps = {
    value: Item;
};

const initialState:stateProps = {
    value: {
        gid: '',
        lid: '',
        iid: '',
        name: '',
        type: '',
    }
}

const itemSlice = createSlice({
    name: 'activeItem',
    initialState,
    reducers: {
        setItem: (state, action:{type:string, payload:Item}) => {
            state.value = action.payload;
        },
        resetItem: (state) => {
            state.value = initialState.value;
        },

    }
})

export const {setItem, resetItem} = itemSlice.actions;
export const selectItem = (state) => state.activeItem.value;
export default itemSlice.reducer;