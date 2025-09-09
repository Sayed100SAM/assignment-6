const getId = (id) => document.getElementById(id);
const categoryList = getId("category-list");
const cardContainer = getId("card-container");
const detailsModal = getId("details_modal");
const addCartContainer = getId("add-cart-container");
const totalPriceContainer = getId("total-price-container");
const totalPrice = getId("total-price");

let cartArr = [];
let sum = 0;

//  loading spinner
const loadingSpinner = (id, loadStatus) => {
    getId(id).innerHTML = ` <div class="text-center col-span-full my-[50px]  ${loadStatus ? "block" : "hidden"
        }">
            <span class="loading loading-bars loading-xl bg-secondary"></span>
          </div>`;
};

// Load All categories from api
const loadAllCategories = () => {
    loadingSpinner("category-list", true);
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((data) => {
            displayAllCategories(data.categories);
        })
        .catch((err) => {
            console.log("problem is", err);
            categoryList.innerHTML = `<p class="text-gray-400 text-center col-span-full md:text-left">Category list not found.Please try  again later.</p>`;
        });
};

// display all categories
const displayAllCategories = (category) => {
    loadingSpinner("category-list", false);
    category.forEach((cat) => {
        categoryList.innerHTML += `
        
        <li id="${cat.id}" onclick="loadPlantsByCategories(${cat.id})" class="hover:bg-secondary border md:border-none border-[#15803D] hover:text-white px-2.5 rounded-md py-2.5 sm:py-1.5 cursor-pointer text-sm sm:text-base category-name">${cat.category_name}</li>

        `;
    });

    categoryList.addEventListener("click", (e) => {
        const categoryName = document.getElementsByClassName("category-name");

        for (const category of categoryName) {
            category.classList.remove("bg-secondary", "text-white");
        }

        if (e.target.localName === "li") {
            e.target.classList.add("bg-secondary", "text-white");
        }
    });
};

// load all plants using async await for practise
const loadAllPlants = async () => {
    try {
        loadingSpinner("card-container", true);
        const res = await fetch("https://openapi.programming-hero.com/api/plants");
        const data = await res.json();
        displayAllPlants(data.plants);
    } catch (error) {
        console.log(error);
        cardContainer.innerHTML = `<p class="text-gray-400 text-center font-semibold text-2xl col-span-full">All plants not found.Please try  again later !</p>`;
    }
};

// display all plants
const displayAllPlants = (plants) => {
    cardContainer.innerHTML = "";

    plants.forEach((plant) => {
        cardContainer.innerHTML += `
        
         <section id="${plant.id
            }" class="bg-white p-5 sm:p-3 xl:p-4 rounded-lg space-y-3 h-[515px] sm:h-[455px] lg:h-[380px] xl:h-[455px]">
                        <img src="${plant.image ? plant.image : "--"}" alt="${plant.name
            } image"
                            class="h-[300px] sm:h-[250px] lg:h-[180px] xl:h-[250px] object-cover object-center rounded-lg bg-[#EDEDED] w-full" />
                        <h3 onclick="loadPlantDetails(${plant.id
            })" class="text-sm font-semibold cursor-pointer hover:underline inline-block">
                           ${plant.name ? plant.name : "--"}
                        </h3>
                        <p class="text-xs h-8 overflow-hidden">
                            ${plant.description ? plant.description : "--"}
                        </p>

                        <div class="flex justify-between items-center">
                            <div
                                class="badge badge-soft badge-success bg-[#DCFCE7] text-secondary rounded-3xl text-sm lg:text-xs xl:text-sm font-medium xl:font-medium lg:font-normal py-3.5">
                                ${plant.category ? plant.category : "--"}
                            </div>
                            <p class="text-sm lg:text-xs xl:text-sm font-semibold lg:font-normal xl:font-semibold"><i
                                    class="fa-solid fa-bangladeshi-taka-sign text-sm lg:text-[9px] xl:text-sm"></i><span>${plant.price ? plant.price : "--"
            }</span></p>
                        </div>

                        <button
                            class="btn outline-none border-none w-full bg-secondary text-base rounded-3xl text-white shadow-none font-medium hover:bg-[#FDEC15] hover:text-secondary">
                            Add to Cart
                        </button>
                    </section>

        `;
    });
};

// load plants by categories
const loadPlantsByCategories = async (id) => {
    try {
        loadingSpinner("card-container", true);
        const res = await fetch(
            `https://openapi.programming-hero.com/api/category/${id}`
        );
        const data = await res.json();
        displayPlantsByCategories(data.plants);
    } catch (error) {
        console.log(error);
        cardContainer.innerHTML = `<p class="text-gray-400 text-center font-semibold text-2xl col-span-full">plants not found.Please try  again later !</p>`;
    }
};

// display plants by categories
const displayPlantsByCategories = (trees) => {
    cardContainer.innerHTML = "";
    trees.forEach((plant) => {
        cardContainer.innerHTML += `
       
        <section id="${plant.id
            }" class="bg-white p-5 sm:p-3 xl:p-4 rounded-lg space-y-3 h-[500px] sm:h-[450px] ">
                        <img src="${plant.image ? plant.image : "--"}" alt="${plant.name
            } image"
                            class="h-[300px] sm:h-[250px] object-cover object-center rounded-lg bg-[#EDEDED] w-full" />
                        <h3 onclick="loadPlantDetails(${plant.id
            })" class="text-sm font-semibold cursor-pointer hover:underline inline-block">
                           ${plant.name ? plant.name : "--"}
                        </h3>
                        <p class="text-xs h-8 overflow-hidden">
                            ${plant.description ? plant.description : "--"}
                        </p>

                        <div class="flex justify-between items-center">
                            <div
                                class="badge badge-soft badge-success bg-[#DCFCE7] text-secondary rounded-3xl text-sm lg:text-xs xl:text-sm font-medium xl:font-medium lg:font-normal py-3.5">
                                ${plant.category ? plant.category : "--"}
                            </div>
                            <p class="text-sm lg:text-xs xl:text-sm font-semibold lg:font-normal xl:font-semibold"><i
                                    class="fa-solid fa-bangladeshi-taka-sign text-sm lg:text-[9px] xl:text-sm"></i><span>${plant.price ? plant.price : "--"
            }</span></p>
                        </div>

                        <button
                            class="btn outline-none border-none w-full bg-secondary text-base rounded-3xl text-white shadow-none font-medium hover:bg-[#FDEC15] hover:text-secondary">
                            Add to Cart
                        </button>
                    </section>


       `;
    });
};

// load Plants Detail
const loadPlantDetails = async (id) => {
    try {
        const res = await fetch(
            `https://openapi.programming-hero.com/api/plant/${id}`
        );
        const data = await res.json();
        displayPlantDetails(data.plants);
    } catch (error) {
        console.log(error);
    }
};

//display plant details
const displayPlantDetails = (plant) => {
    detailsModal.innerHTML = `

  <div id="details_loading" class="modal-box space-y-3 max-w-[650px]">

  <h3 class="text-xl font-semibold">${plant.name ? plant.name : "--"}</h3>

  <img src="${plant.image ? plant.image : "--"}" alt="${plant.name
        } image" class="w-full h-[350px] object-cover object-center bg-[#EDEDED] rounded-xl">

  <p><Strong class="font-semibold">Category : </Strong>${plant.category ? plant.category : "--"
        }</p>

   <p><Strong class="font-semibold">Price : </Strong><i class="fa-solid fa-bangladeshi-taka-sign text-sm"></i><span>${plant.price ? plant.price : "--"
        }</span> </p>

   <p><strong class="font-semibold">Description : </strong> ${plant.description ? plant.description : "--"
        }</p>

    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>

    `;

    detailsModal.showModal();
};

// add to the card
cardContainer.addEventListener("click", (e) => {
    if (e.target.innerText === "Add to Cart") {
        const treeName = e.target.parentElement.children[1].innerText;
        const treePrice = Number(
            e.target.parentElement.children[3].children[1].children[1].innerText
        );
        const treeId = e.target.parentElement.id;
        let treeCount = 1;

        const found = cartArr.find((tree) => tree.treeId === treeId);

        if (found) {
            found.treeCount += 1;
        } else {
            cartArr.push({
                treeName,
                treePrice,
                treeId,
                treeCount,
            });
        }

        alert(`${treeName} added to the cart.`);

        if (cartArr.length > 0) {
            totalPriceContainer.classList.replace("hidden", "flex");
        } else {
            totalPriceContainer.classList.replace("flex", "hidden");
        }

        displayCart(cartArr);
        totalPriceFunc(cartArr);
    }
});

// display cart
const displayCart = (carts) => {
    addCartContainer.innerHTML = "";
    carts.forEach((cart) => {
        addCartContainer.innerHTML += `

  <div id="${cart.treeId}" class="flex justify-between items-center bg-[#F0FDF4] p-4 lg:p-2 rounded-lg">
                            <div class="space-y-2">
                                <h4 class="text-sm font-semibold">${cart.treeName}</h4>
                                <div class="text-sm text-gray-500">
                                    <i class="fa-solid fa-bangladeshi-taka-sign"></i><span >${cart.treePrice}</span> x <span>${cart.treeCount}</span>
                                </div>
                            </div>
                            <div onclick="removeCartFunc('${cart.treeId}')" class="text-sm text-gray-500 hover:text-black cursor-pointer ">
                                <i class="fa-solid fa-xmark remove-cart-btn"></i>
                            </div>
                        </div>

`;
    });
};

// total price
const totalPriceFunc = (items) => {
    sum = 0;
    for (const element of items) {
        sum = sum + element.treePrice * element.treeCount;
    }
    totalPrice.innerText = sum;
};

// remove from cart
const removeCartFunc = (id) => {
    const filteredCartArr = cartArr.filter((e) => {
        return e.treeId !== id;
    });

    cartArr = filteredCartArr;
    displayCart(cartArr);
    totalPriceFunc(cartArr);

    if (cartArr.length > 0) {
        totalPriceContainer.classList.replace("hidden", "flex");
    } else {
        totalPriceContainer.classList.replace("flex", "hidden");
    }
};

loadAllPlants();
loadAllCategories();
