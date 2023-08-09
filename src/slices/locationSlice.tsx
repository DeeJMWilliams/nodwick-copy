import {createSlice} from '@reduxjs/toolkit';
import {Location} from '../types.js';

type stateProps = {
    value: Location,
}

const initialState:stateProps = {
    value: {
        'lid': '',
        'type': '',
        'timestamp': '',
        'name': '',
        'item_ids': [],
        'gid': ''
    }
}

const locationSlice = createSlice({
    name: 'activeLocation',
    initialState,
    reducers: {
        setLocation: (state, action:{type:string, payload:Location}) => {
            state.value = action.payload;
        },
        resetLocation: (state) => {
            state.value = initialState.value;
        }
    }
})

export const {setLocation, resetLocation} = locationSlice.actions;
export const selectLocation = (state) => state.activeLocation.value;
export default locationSlice.reducer;