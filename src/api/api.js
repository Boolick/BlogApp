import axios from "axios";
import { createApi } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: async ({ url }) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/${url}`
    );

    return { data: response.data };
  },
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({ url: "posts" }),
    }),
    getComments: builder.query({
      query: (postId) => ({ url: `comments?postId=${postId}` }),
    }),
    getPhotos: builder.query({
      query: () => ({ url: "photos" }),
    }),
    getUsersPosts: builder.query({
      query: (userId) => ({ url: `users/${userId}/posts` }),
    }),
    getUsers: builder.query({
      query: () => ({ url: "users" }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetCommentsQuery,
  useGetPhotosQuery,
  useGetUsersPostsQuery,
  useGetUsersQuery,
} = api;

/* идеяЖ потом попробовать сократить код создать функцию для определения 
адреса и вот такой объект для выбора запроса:

const detectQueries = (path) =>{
const queries{
   getPosts :"/posts",
   getComments :"/comments",
   getAlbums :"/albums",
   getPhotos :"/photos",
   getTodos :"/todos",
   getUsers :"/users"
};
return queries[path]
} */
