import { useState, useEffect } from '../lib'
import Header from '../components/header'
import Footers from '../components/footer'
import { addProduct } from './addProducts'
import updateProduct from './updateProduct'
const Dashboard = function () {
    const [data, setData] = useState([])
    useEffect(function () {
        fetch("http://localhost:3000/books")
            .then(function (data) {
                return data.json()
            })
            .then(function (data) {
                setData(data)
            })
    }, [])

    useEffect(function () {

        const btn_delete = document.querySelectorAll('.btn-delete');
        btn_delete.forEach((ele) => {
            ele.addEventListener('click', function () {
                const id = ele.dataset.id;
                return confirm('Bạn chắc muốn xóa không!') ? deleteProduct(id) : '';

            })
        })
    },)
    const deleteProduct = function (id) {
        fetch(`http://localhost:3000/books/${id}`, { method: "DELETE" })
            .then(res => res.json())
            .then(() => {
                const newProduct = data.filter((product) => product.id !== +id);
                setData(newProduct);
            })
    }
    return `
        ${Header()}
        <div>
            <div class=" ">
            <a href="/admin/product/add"><button class=" btn-add inline-block  mt-[10px] ml-[110px] rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700" >Add Product</button> </a>
            

                <table class="m-w-[90%] m-auto  divide-y-2 divide-gray-200 bg-white text-sm text-[20px]">
                    <thead class="ltr:text-left rtl:text-right w-[60px] h-[60px]">
                        <tr>
                        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Name
                        </th>
                        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 ">
                            Image
                        </th>
                        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Rating-average
                        </th>
                        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Price
                        </th>
                        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"> Active</th>
                        </tr>
                    </thead>

            <tbody class="divide-y divide-gray-200">
            ${data.map(function (dt) {
        return `
            <tr class="text-center">
                <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                    ${dt.name}
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700 w-[150px] h-[150px]">
                <img src="${dt.images[0]}" alt="" >
                </td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">${dt.rating_average ? dt.rating_average : 0}</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">${dt.list_price}</td>
                <td class="whitespace-nowrap px-4 py-2">
                <a href="/admin/product/update/${dt.id}"><button class=" btn-update inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 " data-id=${dt.id} >Chỉnh sửa</button> </a>
                <button class=" btn-delete inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 "  data-id=${dt.id} >Xóa</button> 
            </td>
        </tr>`;


    }).join("")}   
            </tbody>
            </table>
            </div>
        </div>
        ${Footers()}
        `
}



export {
    Dashboard
}