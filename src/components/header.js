import { useState, useEffect } from "../lib"

const Header = function () {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/books/`)
      .then(function (data) {
        return data.json()
      })
      .then((data) => {
        setData(data)
      })
  }, [])
  useEffect(() => {
    const btnSearch = document.querySelector('.inputSearch');
    btnSearch.addEventListener('keyup', function (event) {
      const show = document.querySelector('.showProducts').classList.remove("hidden");
      const valueInput = event.target.value.trim().toLowerCase();
      const listproduct = document.querySelectorAll('.product');
      listproduct.forEach((element) => {
        if (element.innerText.toLowerCase().includes(valueInput)) {
          element.classList.remove("hidden");
        } else {
          element.classList.add("hidden");
          //document.querySelector('.showProducts').innerHTML = "Không có kết quả phù hợp!"
        }
        if (valueInput == '') {
          element.classList.add("hidden");
          document.querySelector('.showProducts').classList.add("hidden");
        }
      })

    })
  })
  return /*html*/`
    <div class="bg-white h-[100px] justify-center items-center gap-[30px] flex w-[85%] m-auto " id="header">

    <div>
    <img src="https://salt.tikicdn.com/ts/upload/e4/49/6c/270be9859abd5f5ec5071da65fab0a94.png" alt="" width="83px" height="63px">
    </div>
    <div class="flex gap-[10px] ">
      <input type="text" class=" inputSearch w-[626px] h-[40px] border-2 rounded border-[#0D5CB6] px-[20px] " placeholder="Tìm kiếm............" >
      
      <button id="" class=" flex w-[150px] h-[40px] bg-[#0D5CB6] items-center px-[20px] rounded " onclick="console.log(2);">
        <svg id="search_btn" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
          stroke="currentColor" class="w-[30px] ">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>Tìm kiếm</button>
    </div>
    
    <div class="flex items-center ">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person"
        viewBox="0 0 16 16">
        <path
          d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
      </svg>
      <div>
       
        <a href="/admin">Admin</a>
      </div>
    </div>
    <div class="flex  items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cart"
        viewBox="0 0 16 16">
        <path
          d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
      </svg>
      <a href="/cart">Giỏ hàng</a>
    </div>

    
  </div>
  <div class="hidden absolute showProducts w-[600px] bg-gray-200 px-[10px] py-[20px] ml-[320px]">
      ${data.map(function (dt) {
    return `
        <div class=" flex gap-[10px] py-[10px] product">
          <div class="">
          <a href="/product/${dt.id}" class="">
              <img src="${dt.images[0]}" alt=""
                  class="w-[100px] h-[100px]">
          </a>
          </div>
          <div class="py-[20px]">
              <h2 class="text-[20px]">${dt.name}</h2>
              <span class="">${dt.list_price}</span>
          </div>
      </div>`;
  }).join("")}
    </div>

        <nav class="bg-gray-400 px-[30px] w-[85%] m-auto">
            <ul class="flex  px-[20px] items-center">
                <li><a data-navigo class="hover:text-red-400  text-white text-[20px] " href="/">Home</a></li>
                
            </ul>
        </nav>
    `
}

export default Header