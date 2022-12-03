import { createSlice } from '@reduxjs/toolkit'
import product from '../pages/Product/Product'

const initialState = {
    products: [],
    isLoading: false,
    cartProducts: [],
}

export const slice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        addProductToCart: (state, action) => {
            //передаем id родукта в payload, по которому ищем товар в общем списке и добавлем ео в корзину
            const addedProduct = state.products.find((product) => product.id === action.payload)
            state.cartProducts.push(addedProduct)
        },
        removeProductFromCart: (state, action) => {
            state.cartProducts = state.cartProducts.filter(
                (product) => product.id !== action.payload
            )
        },
    },
})

export const { setProducts, setIsLoading, addProductToCart, removeProductFromCart } = slice.actions

export default slice.reducer
