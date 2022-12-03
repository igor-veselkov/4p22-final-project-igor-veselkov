import React from 'react'
import s from './CartItem.module.scss'
import { useDispatch } from 'react-redux'
import { removeProductFromCart } from '../../../../store/slice'

const CartItem = (props) => {
    const { id, title, image, price } = props

    const dispatch = useDispatch()

    const onDeleteCartItem = () => {
        dispatch(removeProductFromCart(id))
    }

    return (
        <div className={s.root}>
            <img src={image} alt='' />
            <div className={s.title}>{title}</div>
            <div className={s.price}>{price}$</div>
            <button onClick={onDeleteCartItem}>Delete</button>
        </div>
    )
}

export default CartItem
