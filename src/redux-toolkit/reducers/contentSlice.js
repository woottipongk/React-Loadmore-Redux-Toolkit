import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    contents: [],
    isLoading: false,
    error: null,
    success: false
}

export const fetchContent = createAsyncThunk(
    'content/fetchContent',
    async () => {
        const result = await fetch(`https://jsonplaceholder.typicode.com/photos`).then((response) => response.json());
        return result
    }
)

export const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchContent.pending, (state) => {
            state.isLoading = true
            state.success = false
        })
        builder.addCase(fetchContent.fulfilled, (state, action) => {
            state.isLoading = false
            state.success = true
            state.contents = action.payload
        })
        builder.addCase(fetchContent.rejected, (state, action) => {
            state.isLoading = false
            state.success = false
            state.error = action.error.message
        })
    },
})

export default contentSlice.reducer