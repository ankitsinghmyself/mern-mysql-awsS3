import LoginForm from './components/Auth/Login/LoginForm';
import Register from './components/Auth/Register/RegisterForm';
import HomePage from './components/Home/HomePage';

var routers = [];

routers.push(
  { path: '/', element: <LoginForm /> },
  { path: '/signup', element: <Register /> },
  { path: '/home', element: <HomePage /> }
);
export default routers;
