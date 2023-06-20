import { useState, useEffect } from './lib'
import { router, render } from './lib'
import '../style.css'
import { HomePage } from './pages/home'
import NotFoundPage from './pages/notFound'
import { Dashboard } from './pages/dashboard'
import { ProductDetail } from './pages/productDetail'
import { addProduct } from './pages/addProducts'
import updateProduct from './pages/updateProduct'
import cart from './pages/cart'





const app = document.querySelector("#app");

//{ linksSelector: "a", hash: true }
// Router

router.on({
  "/": () => {
    //app.innerHTML = HomePage();
    render(HomePage, app)
  },
  "/admin": () => {
    render(Dashboard, app)
  },
  "/admin/product/add": () => {
    render(addProduct, app)
  },

});
router.on('/cart', () => {
  render(cart, app)
})
router.on('/product/:id', ({ data }) => render(() =>
  ProductDetail(data), app

))
router.on('/admin/product/update/:id', (data) => render(() =>
  updateProduct(data), app
))

router.notFound(function () {
  render(NotFoundPage, app)
})

router.resolve()
