import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import Navbar from '../Components/Header/navbar/Navbar.tsx';
export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <Navbar/>
      <main>
        <Outlet />
      </main>
    </React.Fragment>
  )
}
