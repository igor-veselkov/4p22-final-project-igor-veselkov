import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { MainLayout } from 'shared'
import api from '../../config/api'

import s from './Product.module.scss'

const Product = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [productInfo, setProductInfo] = useState([])
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        api.fetchProduct(params.productId).then((data) => {
            setProductInfo(data)
            setIsLoading(false)
        })
    }, [params])

    const addToCart = () => {
        console.log(productInfo.id)
    }

    return (
        <MainLayout>
            <div className={s.root}>
                <button onClick={() => navigate('/')}>Back</button>
                {isLoading ? (
                    <h1>Loading...</h1>
                ) : productInfo ? (
                    <>
                        <h2 className={s.title}>{productInfo.title}</h2>
                        <img className={s.image} src={productInfo.image} alt='' />
                        <h1 className={s.price}>{productInfo.price}$</h1>
                        <div className={s.description}>{productInfo.description}</div>
                    </>
                ) : (
                    'No Product'
                )}
                <button onClick={addToCart}>Add to cart</button>
            </div>
        </MainLayout>
    )
}

export default Product
