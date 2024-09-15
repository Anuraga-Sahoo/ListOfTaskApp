import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, BrowserRouter as Router } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home.jsx'
import { Provider } from 'react-redux'
import { store } from './redux store/store.js'
import ListUpdate from './components/ListUpdate.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<Layout/>}>
      <Route path='' element ={<Home/>}/>
      <Route path='app' element={<App/>}/>
      <Route path='edit/:id' element={<ListUpdate/>}/>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>

    {/* <App /> */}
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
