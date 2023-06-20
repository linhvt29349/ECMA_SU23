import { router, useEffect, useState } from "../lib";
import axios from 'axios';
import Joi from 'joi';


const addProduct = function () {
    useEffect(function () {
        const form = document.querySelector('#form');
        const showError = document.querySelector('.showError');
        const imageupload = document.querySelector('#upload-img');

        const updateShima = Joi.object({
            name: Joi.string().required(),
            list_price: Joi.number().required(),
            images: Joi.array().required(),
            rating_average: Joi.number().required(),
            category: Joi.string().required(),
            quantity_sold: Joi.number().required(),
            description: Joi.string().required(),
        })
        form.onsubmit = async function (event) {
            event.preventDefault();

            const urls = await uploadFiles(imageupload.files);
            const newData = new FormData(form);

            const book = {
                name: newData.get("name"),
                list_price: newData.get("list_price"),
                images: urls,
                rating_average: newData.get("rating_average"),
                category: newData.get("category"),
                quantity_sold: newData.get("quantity_sold"),
                description: newData.get("description"),
            }
            const { error } = updateShima.validate(book);
            if (!error) {

                fetch("http://localhost:3000/books", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(book)
                }).then(() => {
                    alert('Thêm mới thành công!');
                    router.navigate("/admin");
                })

            } else {
                alert(error.message)
            }

        }
        const uploadFiles = async function (fileS) {
            const cloud_name = "ds9c5mkzx";
            const preset_name = "upload-ecma";
            const folder_name = "ECMA";
            const urls = [];
            const api = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

            const formData = new FormData();
            formData.append("upload_preset", preset_name);
            formData.append("folder", folder_name);
            for (let test of fileS) {
                formData.append("file", test);
                const response = await axios
                    .post(api, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                urls.push(response.data.secure_url)
            }

            return urls;

        }
    })

    return `

    <section class="relative flex flex-wrap lg:h-screen lg:items-center">
      <div class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
      <h1 class="text-2xl font-bold sm:text-3xl">Thêm sản phẩm mới!</h1>
        <form action="" class="mx-auto mb-0 mt-8 max-w-md space-y-4" id="form">
          <div>
                <label for="text" class=" p-b-[30px]">Name</label>
                <div class="relative">
                    <input
                        type="text" name="name"
                        class="w-full rounded-lg border-gray-300 border-2 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Name............" 
                    />
                </div>
                <span class="showError text-red-500 "></span>
          </div>
    
          <div>
                <label for="text" class="">Price</label>
                <div class="relative">
                <input
                    type="number" name="list_price"
                    class="w-full rounded-lg border-gray-300 border-2 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Price.............."
                />
                </div>
          </div>
          <div>
                <label for="text" class="">Image</label>
                <div class="relative">
                <input
                    type="file" name="images" multiple id="upload-img"
                    class="w-full rounded-lg border-gray-300 border-2 p-4 pe-12 text-sm shadow-sm "
                    placeholder="Image.........."
                />
                </div>
          </div>
          <div>
                <label for="text" class="">Rating </label>
                <div class="relative ">
                <input
                    type="number" name="rating_average"
                    class="w-full rounded-lg border-gray-300 border-2 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Rating_average............"
                />
                </div>
          </div>
          <div>
                <label for="text" class="">Category </label>
                <div class="relative ">
                <input
                    type="text" name="category"
                    class="w-full rounded-lg border-gray-300 border-2 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Category............"
                />
                </div>
          </div>
          <div>
                <label for="text" class="">Quantity_sold </label>
                <div class="relative ">
                <input
                    type="number" name="quantity_sold"
                    class="w-full rounded-lg border-gray-300 border-2 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Quantity_sold............"
                />
                </div>
          </div>
          <div>
                <label for="text" class="">Description</label>
                <div class="">
                <textarea name="description" id="" cols="60" rows="4" placeholder="Description............" class=" bborder-gray-300 border-2"></textarea>
                </div>
          </div>
    
          <div class="flex items-center justify-between">
                <button type="submit" class="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white" >
                    Update
                </button>
          </div>
        </form>
      </div>
    
      <div class="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="Welcome"
          src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          class="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
        `;

}
export {
    addProduct
}