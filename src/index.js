import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

import { Login, Registration } from './modules/account/pages'
import { Main, Product, Cart, Support } from './modules/main/pages'
import { Page404 } from './shared'

import './index.css'
import 'assets/styles/global.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<Main />} />
            <Route path={'/product'} element={<Product />} />
            <Route path={'/support'} element={<Support />} />
            <Route path={'/cart'} element={<Cart />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/registration'} element={<Registration />} />
            <Route path={'*'} element={<Page404 />} />
        </Routes>
    </BrowserRouter>
)
