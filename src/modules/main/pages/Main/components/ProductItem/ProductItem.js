import React from 'react'
import './ProductItem.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { addProductToCart } from '../../../../store/slice'

const ProductItem = (props) => {
    const { id, image, title, price } = props
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const onAddToCart = (event) => {
        event.stopPropagation()
        dispatch(addProductToCart(id))
    }

    return (
        <div className='root' onClick={() => navigate(`/products/${id}`)}>
            <img className='image' src={image} alt='' />
            <div className='title'>{title}</div>
            <div className='price'>{price}$</div>
            <button onClick={onAddToCart}>Add to Cart</button>
        </div>
    )
}

export default ProductItem
