import React from 'react'
import { LogoIcon } from 'assets/images'

import './MainLayout.scss'
import { useNavigate } from 'react-router-dom'

const MainLayout = (props) => {
    const navigate = useNavigate()
    return (
        <div>
            <header>
                <div className='header_container'>
                    <div className='header_logo_container'>
                        <a
                            className='header_logo'
                            onClick={() => {
                                navigate('/')
                            }}
                        >
                            Store
                        </a>
                        <LogoIcon />
                    </div>

                    <nav className='header_menu'>
                        <ul className='menu_list'>
                            <li className='menu_item'>
                                <a
                                    className='menu_link'
                                    onClick={() => {
                                        navigate('/')
                                    }}
                                >
                                    Home
                                </a>
                            </li>
                            <li className='menu_item'>
                                <a
                                    className='menu_link'
                                    onClick={() => {
                                        navigate('/support')
                                    }}
                                >
                                    Feedback
                                </a>
                            </li>
                            <li className='menu_item'>
                                <a
                                    className='menu_link'
                                    onClick={() => {
                                        navigate('/cart')
                                    }}
                                >
                                    Cart
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className='content'>{props.children}</div>
        </div>
    )
}

export default MainLayout
