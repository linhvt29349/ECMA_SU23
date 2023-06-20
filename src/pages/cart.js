import { useEffect, useState } from "../lib"

const cart = function () {
    const [item, setItem] = useState([]);
    useEffect(function () {
        fetch("http://localhost:3000/cart")
            .then(res => res.json())
            .then((elememt) => {
                setItem(elememt);
                console.log(elememt);
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

        const sum = () => {
            const total = item.reduce((acc, num) => acc + +(num.list_price * num.quantity), 0);
            return total;
        };
        document.querySelector('.sum').innerHTML = sum();

    })
    const deleteProduct = function (id) {
        fetch(`http://localhost:3000/cart/${id}`, { method: "DELETE" })
            .then(res => res.json())
            .then(() => {
                const newProduct = item.filter((product) => product.id !== +id);
                setItem(newProduct);
            })
    }


    return `<div class="overflow-x-auto">
    <table class="min-w-[80%] m-auto divide-y-2 divide-gray-200 bg-white text-sm">
      <thead class="ltr:text-left rtl:text-right">
        <tr>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 ">
            Image
          </th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
           Name
          </th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Price
          </th>
          <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            Quantity
          </th>
          <th class="px-4 py-2"></th>
        </tr>
      </thead>
  
      <tbody class="divide-y divide-gray-200 ">
      ${item.map(function (ele) {

        return `<tr class="text-center">
        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        <img
        src="${ele?.images?.[0]}"
        alt=""
        class=" imageProduct object-cover w-[180px] rounded aspect-square border-2 hover:border-blue-400 p-[5px] h-[180px]"
        />
        </td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700">${ele.name}</td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700">${ele.list_price}</td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700">${ele.quantity}</td>
        <td class="whitespace-nowrap px-4 py-2">
         <button class=" btn-delete inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 " data-id="${ele.id}" >Xóa </button>
          
        </td>
      </tr>
      
      `;
    }).join("")}
  
        
      </tbody>
    </table>
    <div class=" m-auto border-indigo-500  border-b-4 w-[80%] mb-[20px]"></div>
    <div class="">
          <div class="w-[80%] m-auto max-w-lg space-y-4">
            <dl class="space-y-0.5 text-sm text-gray-700">
              <div class="flex justify-between !text-base font-medium">
                <dt>Total</dt>
                <dd class="sum"></dd>
              </div>
            </dl>


            <div class="flex justify-end">
              <a
                href="#"
                class="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
              >
                Thanh toán
              </a>
            </div>
          </div>
        </div>
      </div>
  </div>`;
}
export default cart