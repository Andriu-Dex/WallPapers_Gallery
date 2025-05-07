import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";

// GET POSTS paginados
export const getPosts = createAsyncThunk(
  "posts/get",
  async ({ page = 1, limit = 10 }, thunkAPI) => {
    try {
      const res = await api.getPosts(page, limit);
      return { data: res.data, page, limit };
    } catch (error) {
      return thunkAPI.rejectWithValue("Error al obtener las publicaciones");
    }
  }
);

// CREATE
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

// UPDATE
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

// DELETE
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

// LIKE
export const likePost = createAsyncThunk("posts/like", async (id, thunkAPI) => {
  try {
    const res = await api.likePost(id);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Error al dar like");
  }
});

// DISLIKE
export const dislikePost = createAsyncThunk(
  "posts/dislike",
  async (id, thunkAPI) => {
    try {
      const res = await api.dislikePost(id); // Llamada a la API para dislike
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error al dar dislike");
    }
  }
);

// SLICE
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    page: 1,
    limit: 10,
    hasMore: true,
  },
  reducers: {
    resetPosts(state) {
      state.posts = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET POSTS
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.loading = false;
        const { data, page, limit } = payload;
        if (page === 1) {
          state.posts = data;
        } else {
          state.posts.push(...data);
        }
        state.page = page;
        state.hasMore = data.length === limit;
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
      })

      // DISLIKE
      .addCase(dislikePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dislikePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(dislikePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPosts } = postsSlice.actions;
export default postsSlice.reducer;
