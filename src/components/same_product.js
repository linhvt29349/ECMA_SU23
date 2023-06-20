import { useState, useEffect } from "../lib";


const Same = (value) => {
    const [books, setBooks] = useState([])

    useEffect(function () {
        fetch('http://localhost:3000/books')
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                setBooks(data)
            })
    })
    const showSame = books.filter((element) => {
        return element.type === value;
    });

    return `
    
        <div>
            
            <div class="flex gap-[10px]">
            ${books.map(function (book) {
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
                    <p class="mt-1 text-[20px] text-red-700 font-[500]">${book.original_price}đ</p>
                    </div>
                </a>      
                `
    }).join("")}
            </div>  

        `

};



export {
    Same
}