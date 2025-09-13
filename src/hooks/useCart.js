import React, { useCallback, useEffect, useState } from 'react'
import AuthApiClient from '../services/auth-api-client'

function useCart() {
	const [cart, setCart] = useState(null)
	const [cartId, setCartId] = useState(() => localStorage.getItem('cartId'))
	const [loading, setLoading] = useState(false)

	const createOrGetCart = useCallback(async () => {
		setLoading(true)
		try {
			const response = await AuthApiClient.post('/carts/')
			if (!cartId) {
				localStorage.setItem('cartId', response.data.id)
				setCartId(response.data.id)
			}
			setCart(response.data)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}, [cartId])

	// add items to cart
	const AddCartItem = useCallback(
		async (product_id, quantity) => {
			setLoading(true)
			if (!cartId) await createOrGetCart()
			try {
				const response = await AuthApiClient.post(`/carts/${cartId}/items/`, {
					product_id,
					quantity,
				})

				const updatedCart = await AuthApiClient.get(`/carts/${cartId}/`)
				setCart(updatedCart.data)

				return response.data
			} catch (error) {
				console.log(error)
				throw error
			} finally {
				setLoading(false)
			}
		},
		[cartId, createOrGetCart],
	)

	// update item quantity
	const updateCartItemQuantity = useCallback(
		async (itemId, quantity) => {
			try {
				await AuthApiClient.patch(`/carts/${cartId}/items/${itemId}/`, {
					quantity,
				})
			} catch (error) {
				console.log(error)
			}
		},
		[cartId],
	)

	// delete cart item
	const deleteCartItem = useCallback(
		async (itemId) => {
			try {
				await AuthApiClient.delete(`/carts/${cartId}/items/${itemId}/`)
			} catch (error) {
				console.log(error)
			}
		},
		[cartId],
	)

	useEffect(() => {
		const initCart = async () => {
			setLoading(true)

			const token = localStorage.getItem('authTokens')
			if (token) {
				await createOrGetCart()
			} else {
				console.warn('No auth token found, skipping cart fetch.')
			}

			setLoading(false)
		}
		initCart()
	}, [createOrGetCart])

	return {
		cart,
		createOrGetCart,
		AddCartItem,
		updateCartItemQuantity,
		loading,
		deleteCartItem,
		cartId,
	}
}

export default useCart
