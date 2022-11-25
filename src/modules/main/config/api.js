import axios from 'axios'

const fetchProducts = async () => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products')
        return response.data
    } catch (e) {
        console.log(e)
    }
}

const api = { fetchProducts }

export default api
