import { Navigate, useRoutes } from 'react-router-dom';
import FullLayout from './layouts/FullLayout';
import NavLayout from './layouts/NavLayout';
import AboutPage from './pages/AboutPage';
import ErrorPage from './pages/ErrorPage';
//
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PollCreatePage from './pages/PollCreatePage';
import PollsPage from './pages/PollsPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';
import TrendingPage from './pages/TrendingPage';
import SettingsPage from './pages/SettingsPage';
import PollDetailPage from './pages/PollDetailPage';

export default function Router() {
  // The useRoutes hook is the functional equivalent of <Routes>, but it uses JavaScript objects instead of <Route> elements to define your routes. These objects have the same properties as normal <Route> elements, but they don't require JSX.
  return useRoutes([
    {
      path: '/users',
      element: <FullLayout />,
      children: [
        { path: 'signup', element: <SignupPage /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'profile/:userId', element: <ProfilePage /> },
        { path: 'settings', element: <SettingsPage /> },
      ],
    },
    {
      path: '/polls',
      element: <NavLayout />,
      children: [
        { path: '', element: <PollsPage /> },
        { path: ':type', element: <PollsPage /> },
        { path: 'create', element: <PollCreatePage /> },
      ],
    },
    {
      path: '/poll',
      element: <FullLayout />,
      children: [{ path: ':id', element: <PollDetailPage /> }],
    },
    {
      path: '/settings',
      element: <NavLayout />,
      children: [{ path: '', element: <SettingsPage /> }],
    },
    {
      path: '/about',
      element: <FullLayout />,
      children: [{ path: '', element: <AboutPage /> }],
    },
    {
      path: '/error',
      element: <ErrorPage />,
    },
    {
      path: '/',
      element: <NavLayout />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: 'trending', element: <TrendingPage /> },
      ],
    },
    { path: '*', element: <Navigate to="/error" replace /> },
  ]);
}
