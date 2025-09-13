import React from 'react'
import CartContext from '../context/CartContext'

function useCartContext() {
  return useCartContext(CartContext)
}

export default useCartContext


