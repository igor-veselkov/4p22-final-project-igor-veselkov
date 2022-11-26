import React from 'react'
import s from './CartItem.module.scss'
import product from '../../../Product/Product'

const CartItem = (props) => {
    const { id, title, image, price, cartProducts, setCartProducts } = props

    const onDeleteCartItem = () => {
        setCartProducts(cartProducts.filter((product) => product.id !== id))
    }

    return (
        <div className={s.root}>
            <img src={image} />
            <div className={s.title}>{title}</div>
            <div>{price}$</div>
            <button onClick={onDeleteCartItem}>Delete</button>
        </div>
    )
}

export default CartItem
