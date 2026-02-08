import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.ts'
import { BrowserRouter } from 'react-router-dom'

const router = createRouter({
  routeTree,
})
declare module '@tanstack/react-router' {
  interface RegisterRouter {
    router: typeof router
  }
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <RouterProvider router={router}/>
    </BrowserRouter>
  </StrictMode>,
)
