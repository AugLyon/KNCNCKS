import * as React from 'react'
import { Outlet, createRootRoute, useLocation } from '@tanstack/react-router'
import Navbar from '../Components/Header/navbar/Navbar.tsx';
export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register', '/forgot-password','reset-password','/404'];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
  return (
    <React.Fragment>
      {!shouldHideNavbar && <Navbar/>}
      <main>
        <Outlet />
      </main>
    </React.Fragment>
  )
}
