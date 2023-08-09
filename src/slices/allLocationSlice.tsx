import {createSlice} from '@reduxjs/toolkit';
import {Location} from '../types.tsx';

type stateProps = {
    value: Location[];
}

const initialState:stateProps = {
    value: [],
};

const allLocationSlice = createSlice({
    name: 'allLocations',
    initialState,
    reducers: {
        setLocations: (state, action:{type:string, payload:Location[]}) => {
            state.value = action.payload;
        },
        addLocation: (state, action:{type:string, payload:Location}) => {
            state.value = [...state.value, action.payload];
        },
        removeLocation: (state, action:{type:string, payload:string}) => {
            state.value = state.value.filter(location => location.lid !== action.payload);
        },
        editLocation: (state, action:{type:string, payload:Location}) => {
            state.value = state.value.map((location:Location) => { 
                return(
                    location.lid === action.payload.lid ?
                    action.payload :
                    location
                )
            })
        }
    }
})

export const {addLocation, setLocations, removeLocation, editLocation} = allLocationSlice.actions;
export const selectLocations = state => state.allLocations.value;
export default allLocationSlice.reducer;