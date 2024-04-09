import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chat: {}
    },
    reducers: {
        addChat: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        removeChat: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
})

export const { addChat, removeChat } = chatSlice.actions

export const chatData = (state) => state.chat

export default chatSlice.reducer