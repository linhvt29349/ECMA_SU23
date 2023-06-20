import Header from "../components/header"
import { useState, useEffect } from "../lib"
import Footers from "../components/footer";
import Nav from "../components/nav";


const HomePage = function () {

    const [data, setData] = useState([])
    useEffect(function () {
        fetch("http://localhost:3000/books")
            .then(function (data) {
                return data.json()
            })
            .then(function (data) {
                setData(data)
            })
    }, []);


    useEffect(function () {
        function compareValues(key, order = 'asc') {
            return function (a, b) {
                if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                    return 0;
                }
                const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
                const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
                let comparison = 0;
                if (varA > varB) {
                    comparison = 1
                } else if (varA < varB) {
                    comparison = -1;
                }
                return ((order == 'desc') ? (comparison * -1) : comparison)
            }
        }

        const sortList = (x1 = '', sortPrice) => {
            const show = () => {
                return `
            
                <div>
                    
                    <div class="grid grid-cols-4 gap-3 gap-[10px]">
                    ${x1.sort(sortPrice).map(function (book) {
                    return /*html*/`
                    
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
                            <p class="mt-1 text-[20px] text-red-700 font-[500]">${book.list_price}đ</p>
                            </div>
                        </a>      
                        `
                }).join("")}
                    </div>  
                `
            };
            return /*html*/`
            ${Nav(show())}
        `
        }

        const showCategory = (element) => {
            return `
        
            <div>
                
                <div class="flex gap-[10px]">
                ${element.map(function (book) {
                return /*html*/`
                
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
                        <p class="mt-1 text-[20px] text-red-700 font-[500]">${book.list_price}đ</p>
                        </div>
                    </a>      
                    `
            }).join("")}
                </div>  
            `
        };

        const showProductsList = () => {

            `
          <div>
              <div class="flex gap-[10px]">
              ${data.map(function (book) {
                return /*html*/`
              
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
                      <p class="mt-1 text-[20px] text-red-700 font-[500]">${book.list_price}đ</p>
                      </div>
                  </a>      
                  `
            }).join("")}
              </div>  
          `;

        };

        document.querySelector('#minPrice').addEventListener('click', () => {

            document.querySelector('#showList').innerHTML = sortList(data, compareValues('list_price', 'asc'));
        });
        document.querySelector('#maxPrice').addEventListener('click', () => {
            document.querySelector('#showList').innerHTML = sortList(data, compareValues('list_price', 'desc'));
        });
        document.querySelector('#populur').addEventListener('click', () => {
            document.querySelector('#showList').innerHTML = sortList(data, compareValues('quantity_sold', 'desc'));
        });
        document.querySelector('#rating').addEventListener('click', () => {
            const arr = [];
            const a = data.filter((element) => {
                return element.quantity_sold?.value > 30;
            });
            document.querySelector('#showList').innerHTML = sortList(a, compareValues('rating_average', 'asc'));
        });
        document.querySelector('#novel').addEventListener('click', () => {
            const showNovel = data.filter((element) => {
                return element.category === "Novel";
            });
            document.querySelector('#showList').innerHTML = showCategory(showNovel);
        });
        document.querySelector('#social').addEventListener('click', () => {
            const showSocial = data.filter((element) => {
                return element.category === "Social";
            });
            document.querySelector('#showList').innerHTML = showCategory(showSocial);
        });
        document.querySelector('#business').addEventListener('click', () => {
            const showBusiness = data.filter((element) => {
                return element.category === "Business";
            });
            document.querySelector('#showList').innerHTML = showCategory(showBusiness);
        });
        document.querySelector('#comic').addEventListener('click', () => {
            const showComic = data.filter((element) => {
                return element.category === "Comic";
            });
            document.querySelector('#showList').innerHTML = showCategory(showComic);
        });



    })


    return /*html*/`
            ${Header()}
<div class="gap-[20px] grid grid-cols-5 w-[85%] m-auto relativea ">
    <div>
        <h2 class="font-[500] py-[10px] hi "  >DANH MỤC SẢN PHẨM</h2>
        <div>
 
</div>
        <div class=" relative" id="tabss">
            <p id="novel" class=" opacity-100 hover:cursor-pointer py-[12px] text-[20px]  text-[#c23564] bg-[#fff] rounded  w-[150px] hover:bg-[rgba(194, 53, 100, 0.05)] backdrop-opacity-100">
                Tiểu thuyết
            </p>
            <p id="social" class="hover:cursor-pointer   opacity-100  py-[12px] text-[20px]  text-[#c23564] bg-[#fff] rounded  w-[150px] hover:bg-[rgba(194, 53, 100, 0.05)]">
                
                 Sách đời sống
            </p>
                <p id="business" class=" hover:cursor-pointer opacity-100   py-[12px] text-[20px]  text-[#c23564] bg-[#fff] rounded  w-[150px] hover:bg-[rgba(194, 53, 100, 0.05)]">
               
                Sách kinh doanh
            </p>
                <p id="comic" class=" hover:cursor-pointer opacity-100  py-[12px] text-[20px]  text-[#c23564] bg-[#fff] rounded  w-[150px] hover:bg-[rgba(194, 53, 100, 0.05)]">
               
                Truyện tranh
            </p>
           
        </div>
            
    </div>
    <div class="col-span-4 ">
        <h2 class="font-[600] text-[25px] py-[20px]" id="tir">Nhà Sách Tiki</h2>
        <div>
            <img src="https://salt.tikicdn.com/cache/w1080/ts/tikimsp/d6/a4/d6/9622794874dbe8d8ccb6d25653e88152.png.webp" alt="" class="h-[280px] w-[90%]">
        </div>
      
        <div class=" flex gap-[20px]" id="tabss" relativea>   
                <p class=" tab-item opacity-100 hover:opacity-100  py-[12px] text-[20px] hover:cursor-pointer text-[#c23564] bg-[#fff] rounded  ease-[all (0.2s)] hover:bg-[rgba(194, 53, 100, 0.05)]" id="rating">
            
                Bán chạy
            </p>
                
                <p class=" tab-item opacity-100 hover:opacity-100  py-[12px] text-[20px] hover:cursor-pointer text-[#c23564] bg-[#fff] rounded  ease-[all (0.2s)] hover:bg-[rgba(194, 53, 100, 0.05)]" id="populur">
            
                Phổ biến
            </p>
            <p class=" tab-item opacity-100 hover:opacity-100  py-[12px] text-[20px] hover:cursor-pointer text-[#c23564] bg-[#fff] rounded  ease-[all (0.2s)] hover:bg-[rgba(194, 53, 100, 0.05)]" id="minPrice">
            
            Giá thấp
        </p>
                <p class=" tab-item opacity-100 hover:opacity-100 py-[12px] text-[20px] hover:cursor-pointer text-[#c23564] bg-[#fff] rounded  ease-[all (0.2s)] hover:bg-[rgba(194, 53, 100, 0.05)]" id="maxPrice">
            
               Giá cao
            </p>
       
        </div>
        <div id="showList"> 
            <div class="grid grid-cols-4 gap-[10px]">
            ${data.map(function (book) {
        return /*html*/`
            
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
                        class="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4 h-[90px]"
                    >
                        ${book.name}
                    </h3>
                    <p class="mt-1 text-[20px] text-red-700 font-[500]">${book.list_price}đ</p>
                   
                    </div>
                </a>      
                `
    }).join("")
        }
            </div>  
          
        </div >
        
      </div >
  </div >
            
</div ></div >
        </div >
    ${Footers()}
`

}
export {
    HomePage
}