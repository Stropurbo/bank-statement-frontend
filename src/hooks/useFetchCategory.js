import React, { useEffect, useState } from 'react'
import ApiClient from '../services/api-client'

function useFetchCategory() {

    const [category, setCategory] = useState([])

    useEffect(() => {
        ApiClient.get('/category')
        .then(res => setCategory(res.data.results))
    }, [])

  return category
}

export default useFetchCategory

