import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    complaints: [],
}

const complaints = createSlice({
    name: 'complaints',
    initialState,
    reducers: {
        setComplaints: (state, action) => {
            state.complaints = action.payload
        },
        appendComplaints: (state, action) => {
            state.complaints = [...state.complaints, action.payload]
        },
    }
});

export const { setComplaints,appendComplaints } = complaints.actions
export default complaints.reducer;