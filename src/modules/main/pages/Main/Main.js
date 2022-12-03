import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { MainLayout } from 'shared'
import api from '../../config/api'
import { ProductItem } from './components'
import { setIsLoading, setProducts } from '../../store/slice'

import s from './Main.module.scss'

const Main = () => {
    // Фильтрация ---> Redux
    //const [products, setProducts] = useState([])
    //const [isLoading, setIsLoading] = useState(false)
    const { products, isLoading } = useSelector((state) => state.mainReducer)
    const dispatch = useDispatch()

    // Фильтрация
    const [searchInput, setSearchInput] = useState('')
    const [foundProducts, setFoundProducts] = useState([])

    // Фильтр по категориям
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([])

    // Итоговые продукты
    const [totalProducts, setTotalProducts] = useState([])

    const searchButtonRef = useRef(null)

    // Первоначальная загрузка продуктов
    useEffect(() => {
        dispatch(setIsLoading(true))
        api.fetchProducts().then((data) => {
            dispatch(setProducts(data))
            setFoundProducts(data)
            setTotalProducts(data)

            setCategories(['', ...Array.from(new Set(data.map((item) => item.category)))])

            dispatch(setIsLoading(false))
        })
    }, [])

    // Обработчик события при нажатии кнопки Поиск
    const onSearch = () => {
        setFoundProducts(
            products.filter((product) =>
                product.title.toLowerCase().includes(searchInput.toLowerCase().trim())
            )
        )
    }

    // Фильтруем продукты по категории
    useEffect(() => {
        if (selectedCategory) {
            setFilteredProducts(products.filter((product) => product.category === selectedCategory))
        } else {
            setFilteredProducts(products)
        }
    }, [selectedCategory, products])

    // Устанавливаем итоговый список продуктов в зависимости от найденных и отфильтрованных продуктов
    useEffect(() => {
        if (filteredProducts.length !== products.length) {
            const totalProducts = foundProducts.filter(
                (product) => filteredProducts.indexOf(product) !== -1
            )
            setTotalProducts(totalProducts)
        } else {
            setTotalProducts(foundProducts)
        }
    }, [foundProducts, filteredProducts])

    return (
        <MainLayout>
            <div className={s.root}>
                <div className={s.search}>
                    <input
                        type='text'
                        value={searchInput}
                        onChange={(event) => {
                            setSearchInput(event.target.value)
                        }}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                searchButtonRef.current.click()
                            }
                        }}
                    />
                    <button type='button' onClick={onSearch} ref={searchButtonRef}>
                        Поиск
                    </button>
                    <select
                        name='select'
                        value={selectedCategory}
                        onChange={(event) => {
                            setSelectedCategory(event.target.value)
                        }}
                    >
                        {categories.map((category) => (
                            <option value={category} key={category}>
                                {category}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={() => {
                            setSearchInput('')
                            setSelectedCategory(' ')
                            setFoundProducts(products)
                        }}
                    >
                        Сброс
                    </button>
                </div>
                {!isLoading ? (
                    totalProducts.map((product) => (
                        <ProductItem
                            key={product.id}
                            id={product.id}
                            image={product.image}
                            title={product.title}
                            price={product.price}
                        />
                    ))
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
        </MainLayout>
    )
}

export default Main
