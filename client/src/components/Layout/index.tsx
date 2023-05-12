import AppBar from 'components/AppBar';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
};

export default Layout;
