import {createSlice} from '@reduxjs/toolkit';
import {Game} from '../types.jsx';

type stateProps = {
    value: Game[];
}

const initialState:stateProps = {
    value: []
}

const allGameSlice = createSlice({
    name: 'allGames',
    initialState,
    reducers: {
        addGame: (state, action:{type:string, payload:Game}) => {
            state.value = [...state.value, action.payload]
        },

        setGames: (state, action:{type:string, payload:Game[]}) => {
            state.value = action.payload;
        },
        removeGame: (state, action:{type:string, payload:string}) => {
            state.value = state.value.filter(game => game.gid !== action.payload)
        },
        updateGame: (state, action:{type:string, payload:Game}) => {
            state.value = state.value.map((game:Game) => {
                return(
                    action.payload.gid === game.gid ?
                    action.payload : 
                    game
                )
            })
        }
    }
})

export const {addGame, setGames, removeGame, updateGame} = allGameSlice.actions;
export const selectGames = state => state.allGames.value;
export default allGameSlice.reducer;