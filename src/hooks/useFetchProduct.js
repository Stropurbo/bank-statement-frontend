import React, { useEffect, useState } from 'react'
import ApiClient from '../services/api-client'

function useFetchProduct(currentPage, selectedCategory, searchQuery, sortOrder) {
	const [myproduct, setProduct] = useState([])
	const [isloading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [totalpage, setTotalPage] = useState(0)

	useEffect(() => {
		const fetchProduct = async () => {
			setLoading(true)

			const params = {
				page: currentPage,
				ordering: sortOrder,
			}

			if (selectedCategory) params.category_id = selectedCategory
			if (searchQuery) params.search = searchQuery

			try {
				const res = await ApiClient.get('products/', { params })
				const products = res.data.results

				const updateProduct = await Promise.all(
					products.map(async (product) => {
						try {
							const review = await ApiClient.get(`products/${product.id}/review/`)
							return {
								...product,
								reviews: review.data.results,
							}
						} catch (error) {
							console.log(error)
							return {
								...product,
								reviews: false,
							}
						}
					}),
				)
				setProduct(updateProduct)
				setTotalPage(Math.ceil(res.data.count / 10))
			} catch (error) {
				setError(error.message || 'Something went wrong')
			} finally {
				setLoading(false)
			}
		}

		fetchProduct()
	}, [currentPage, selectedCategory, searchQuery, sortOrder])

	return { myproduct, isloading, error, totalpage }
}

export default useFetchProduct
