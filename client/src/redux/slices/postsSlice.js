import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

// Thunks
export const getPosts = createAsyncThunk("posts/get", async (_, thunkAPI) => {
  try {
    const res = await api.getPosts();
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Error al obtener las publicaciones");
  }
});

export const createPost = createAsyncThunk(
  "posts/create",
  async (postData, thunkAPI) => {
    try {
      const res = await api.createPost(postData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error al crear la publicación");
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/update",
  async ({ id, updatedPost }, thunkAPI) => {
    try {
      const res = await api.updatePost(id, updatedPost);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error al actualizar la publicación");
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id, thunkAPI) => {
    try {
      await api.deletePost(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error al eliminar la publicación");
    }
  }
);

export const likePost = createAsyncThunk("posts/like", async (id, thunkAPI) => {
  try {
    const res = await api.likePost(id);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Error al dar like");
  }
});

// Slice
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET POSTS
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LIKE
      .addCase(likePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(likePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postsSlice.reducer;
