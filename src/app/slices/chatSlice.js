import { createSlice } from "@reduxjs/toolkit";

export const detailSlice = createSlice({
    name: 'chat',
    initialState: {
        detail: {}
    },
    reducers: {
        addDetail: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        removeDetail: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
})

export const { addDetail, removeDetail } = detailSlice.actions

export const detailData = (state) => state.detail

export default detailSlice.reducer