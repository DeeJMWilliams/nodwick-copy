import {createSlice} from '@reduxjs/toolkit';
import {Item} from '../types.tsx';

type stateProps = {
    value: Item[]
}

const initialState:stateProps = {
    value: [],
}

const locationItemSlice = createSlice({
    name: 'locationItems',
    initialState,
    reducers: {
        setLocationItems: (state, action:{type:string, payload:Item[]}) => {
            state.value = action.payload
        },
        addLocationItem: (state, action:{type:string, payload:Item}) => {
            state.value = [...state.value, action.payload];
        },
        removeItem: (state, action:{type:string, payload:string}) => {
            state.value = state.value.filter(item => item.iid !== action.payload);
        }
    }
})

export const {setLocationItems, addLocationItem, removeItem} = locationItemSlice.actions;
export const selectLocationItems = state => state.locationItems.value;
export default locationItemSlice.reducer;