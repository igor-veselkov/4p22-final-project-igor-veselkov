import React, { useEffect, useRef, useState } from 'react'

import { MainLayout } from 'shared'
import api from '../../config/api'
import { ProductItem } from './components'

import s from './Main.module.scss'

const Main = () => {
    // Фильтрация
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    // Фильтрация
    const [searchInput, setSearchInput] = useState('')
    const [foundProducts, setFoundProducts] = useState([])

    // Фильтр по категориям
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [filteredProducts, setFilteredProducts] = useState([])

    // Итоговые продукты
    const [totalProducts, setTotalProducts] = useState([])
    const [isDirty, setIsDirty] = useState(false)

    const searchButtonRef = useRef(null)

    // Первоначальная загрузка продуктов
    useEffect(() => {
        setIsLoading(true)
        api.fetchProducts().then((data) => {
            setProducts(data)
            setIsLoading(false)
            setFoundProducts(data)
            setTotalProducts(data)

            setCategories(['', ...Array.from(new Set(data.map((item) => item.category)))])
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
                            if (!isDirty) {
                                setIsDirty(true)
                            }
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
                            if (!isDirty) {
                                setIsDirty(true)
                            }
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
                            setIsDirty(false)
                            setSearchInput('')
                            setSelectedCategory(' ')
                            setFoundProducts(products)
                        }}
                    >
                        Сброс
                    </button>
                </div>
                {!isLoading ? (
                    isDirty ? (
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
                        products.map((product) => (
                            <ProductItem
                                key={product.id}
                                id={product.id}
                                image={product.image}
                                title={product.title}
                                price={product.price}
                            />
                        ))
                    )
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
        </MainLayout>
    )
}

export default Main
