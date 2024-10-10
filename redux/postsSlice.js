import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
    addPost: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
      state.loading = false;
    },
  },
});

export const { setPosts, addPost } = postsSlice.actions;

export default postsSlice.reducer;
