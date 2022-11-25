import React from 'react'
import s from './ProductItem.module.scss'

const ProductItem = (props) => {
    const { image, title, price } = props

    return (
        <div className={s.root}>
            <img className={s.image} src={image} />
            <div className={s.title}>{title}</div>
            <div className={s.price}>{price}$</div>
        </div>
    )
}

export default ProductItem
