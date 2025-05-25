import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from "./app";
import Home from './home/home';
import TopicList from './topic/topic-list';
import TopicAdd from './topic/topic-add';
import TopicEdit from './topic/topic-edit';
import UserList from './user/user-list';
import UserAdd from './user/user-add';
import UserEdit from './user/user-edit';
import GuestList from './guest/guest-list';
import GuestAdd from './guest/guest-add';
import GuestEdit from './guest/guest-edit';
import Error from './error/error';


export default function AppRoutes() {
  const router = createBrowserRouter([
    {
      element: <App />,
      children: [
        { path: '', element: <Home /> },
        { path: 'topics', element: <TopicList /> },
        { path: 'topics/add', element: <TopicAdd /> },
        { path: 'topics/edit/:id', element: <TopicEdit /> },
        { path: 'users', element: <UserList /> },
        { path: 'users/add', element: <UserAdd /> },
        { path: 'users/edit/:id', element: <UserEdit /> },
        { path: 'guests', element: <GuestList /> },
        { path: 'guests/add', element: <GuestAdd /> },
        { path: 'guests/edit/:id', element: <GuestEdit /> },
        { path: 'error', element: <Error /> },
        { path: '*', element: <Error /> }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}
