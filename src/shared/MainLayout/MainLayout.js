import React from 'react'

import './MainLayout.scss'
import { useNavigate } from 'react-router-dom'

const MainLayout = (props) => {
    const navigate = useNavigate()
    return (
        <div className='wrapper'>
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
                                    Главная
                                </a>
                            </li>
                            <li className='menu_item'>
                                <a
                                    className='menu_link'
                                    onClick={() => {
                                        navigate('/support')
                                    }}
                                >
                                    Обратная связь
                                </a>
                            </li>
                            <li className='menu_item'>
                                <a
                                    className='menu_link'
                                    onClick={() => {
                                        navigate('/cart')
                                    }}
                                >
                                    Корзина
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className='content'>{props.children}</div>
            <footer className='footer'>
                <div className='footer__container'>
                    <div className='footer__copy'>©2022</div>
                    <div className='footer__social social'>
                        <a href='https://github.com/igor-veselkov' className='social__item'>
                            GitHub
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default MainLayout
