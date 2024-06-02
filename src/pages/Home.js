import React, { useEffect, useState } from 'react'
import axios from "axios"
import Navbar from '../components/Navbar'
import { useDispatch } from 'react-redux'
import { increment } from '../store/slices/cartSlice'

function Home() {

  const dispatch = useDispatch()
  const [data, setData] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    try {
      let response = await axios.get("http://localhost:9000/product/products")
      //console.log(response.data.data)
      setData(response.data.data)
    } catch (error) {
      console.log("Get All Products Error", error)
    }
  }

  return (
    <>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {
          data && data.map((product, key) => (
            <div key={key} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img
                  className="p-8 rounded-t-lg"
                  style={{ minHeight: "400px", maxHeight: "400px" }}
                  src={product.image}
                  alt="product image"
                />
              </a>
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {product.productName}
                  </h5>
                </a>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${product.price}
                  </span>
                  <button
                    onClick={() => dispatch(increment(product))}
                    className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>

          ))
        }
      </div>
    </>
  )
}

export default Home