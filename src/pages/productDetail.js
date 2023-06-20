import Footers from "../components/footer";
import Header from "../components/header";
import { router, useEffect, useState } from "../lib";


const ProductDetail = function (id) {
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  useEffect(function () {
    fetch("http://localhost:3000/books")
      .then(res => res.json())
      .then(data => setData(data))
  }, [])

  useEffect(function () {
    const showProducts = function () {
      data.map(function (book) {
        return `
                <a href="/product/${book.id}" class="block group">
                <div class="">
                  <img
                  src="${book.images[0]}"
                  alt=""
                  class="object-cover w-[180px] rounded aspect-square border-2 hover:border-blue-400 p-[5px] h-[180px]"
                  />
                </div>
                <div class="mt-3 w-[180px]">
                <h3
                    class="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4 h-[70px]"
                >
                    ${book.name}
                </h3>
                <p class="mt-1 text-[20px] text-red-700 font-[500]">${book.original_price}đ</p>
                </div>
            </a>     
                `;
      })
    };

    const test = Object.entries(id).forEach(([key, value]) => {
      const product1 = data.find(book => {
        return book.id === Number(id.id)
      });

      document.querySelector('.vie').innerHTML = ` 
            
      <div class="grid grid-cols-3 gap-[20px] w-[85%] m-auto ">
        <div class="product py-[20px]" >
          <img srcset="${product1?.images?.[0]}" alt=""  class=" rounded main-img w-[445px] h-[445px] p-[10px] mb-[10px] border-2 hover:border-2 hover:border-blue-400 main-img " >
          <div class="color flex gap-[20px]" id="color">
            <img srcset="${product1?.images?.[0]}" alt="" class=" w-[62px] h-[62px] border-2 hover:border-2 hover:border-blue-400 py-[5px] rounded">
            <img srcset="${product1?.images?.[1] || product1?.images?.[0]}" alt="" class="w-[62px] h-[62px] border-2 hover:border-2 hover:border-blue-400 py-[5px] rounded">
            <img srcset="${product1?.images?.[2] || product1?.images?.[1] || product1?.images?.[0]}" alt="" class="w-[62px] h-[62px] border-2 hover:border-2 hover:border-blue-400 py-[5px] rounded">
      
          </div>
        </div>
        <div id="info" class="col-span-2 py-[20px]">
         
          <span class="font-[30px] py-[10px] font-[600]">${product1?.name}</span>
          <div class="flex gap-[5px]">
            <span>Đánh giá: ${product1?.rating_average} </span>
            <span> ${product1?.quantity_sold?.text ? '|' + product1?.quantity_sold?.text : + product1?.quantity_sold + 'Đã bán'} </span>
            
          </div>
          <div class="border-2  rounded bg-[#FAFAFA] w-[479px] h-[103px] text-[32px] text-red-500 py-[25px] px-[10px] my-[20px]">
            <span>${product1?.list_price}</span>
          </div>
          <div >
            <span class="text-[20px] mb-[10px]">Số lượng</span>
            <div class="w-[100px] border-2 grid grid-cols-4 h-[30px]">
              <div class="items-center px-[8px]">
                <button class="deleteCount"> - </button>
              </div>
              <div class="col-span-2 border-x-2 ">
                <span class="count px-[10px]">${count}</span>
              </div>
              <div>
              <button class="addCount"> + </button>
              </div>
            </div>
        </div>
        <div></div>
          <div class="py-[20px]">
            <button class=" btn-cart rounded-[5px] text-white bg-[#FF3945] px-[150px] py-[10px]">Chọn mua</button>
          </div>
          </div>
          </div>
          <div class="filtering  w-[85%] m-auto mb-[20px]">
                <h2 class="text-[#38383D] text-[20px] font-semibold py-[20px] ">Sản phẩm khác</h2>
                <div class="flex gap-[10px]">
                   ${data.map(function (book) {
        return `
                        <a href="/product/${book.id}" class="block group">
                        <div class="">
                          <img
                          src="${book.images[0]}"
                          alt=""
                          class=" imageProduct object-cover w-[180px] rounded aspect-square border-2 hover:border-blue-400 p-[5px] h-[180px]"
                          />
                        </div>
                        <div class="mt-3 w-[180px]">
                        <h3
                            class=" nameProduct font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4 h-[90px]"
                        >
                            ${book.name}
                        </h3>
                        <p class=" priceProduct mt-1 text-[20px] text-red-700 font-[500]">${book.list_price}</p>
                        </div>
                    </a>     
                        `;
      }).join("")
        }
            </div>
            
                <h2 class="text-[#38383D] text-[20px] font-semibold py-[20px] ">Mô tả sản phẩm</h2> 
                  ${product1?.description}
                </div >
          </div > 

          </div >
      </div >
`;
    }
    )
    const listImg = document.querySelectorAll('#color>img');
    listImg.forEach(function (elememt) {
      elememt.onmouseover = function () {
        let mainImg = document.querySelector('.main-img');
        mainImg.srcset = this.srcset;
      }
    })

    const addCart = document.querySelector('.btn-cart');
    addCart.addEventListener('click', function () {
      const newProduct = data.find(item => item.id === Number(id.id));

      var item = { ...newProduct, quantity: count };
      fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
      })

      alert("Đã thêm vảo giỏ hàng!")

    })

    const deleteCount = document.querySelector('.deleteCount').addEventListener('click', function () {
      if (count <= 0) {
        return 0
      }
      setCount(count - 1);
    })
    const addCount = document.querySelector('.addCount').addEventListener('click', function () {
      setCount(count + 1);
    })
  })
  return /*html*/`
    ${Header()}
    <div class="vie relativea "></div>      
    ${Footers()}
`
}

export {
  ProductDetail
}