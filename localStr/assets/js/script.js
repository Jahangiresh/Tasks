let productParent = document.querySelector(".main__container__row");

const basketButton = document.querySelector(".horse__cart");
const lines = document.querySelector(".lines");
const basket = document.querySelector(".basket");
basketButton.addEventListener("click", function () {
  basket.classList.add("basket-active");
});
lines.addEventListener("click", function () {
  basket.classList.remove("basket-active");
});

getProductsFromApi();
showCount();

function getProductsFromApi() {
  fetch("https://api.escuelajs.co/api/v1/products ")
    //   https://fakestoreapi.com/products
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let myTitle;
      let html;

      for (let i = 0; i < data.length; i++) {
        if (data[i].title.length >= 20) {
          myTitle = data[i].title.slice(0, 20) + "...";
        } else {
          myTitle = data[i].title + "...";
        }

        html = `
        <div class="col-lg-4 main__container__row__product">
        <div class="main__container__row__product__img">
          <img
            src=${data[i].images[0]}
            alt=""
          />
        </div>
        <div class="main__container__row__product__title">
          <h3 class="title" >${myTitle}</h3>
          <p class="description">${data[i].description.slice(0, 20)}</p>
          <span class="price">${data[i].price} AZN</span>
          <br>
          <button class="addBtn">add to cart</button>
        </div>
      </div>`;
        productParent.innerHTML += html;
      }
      createProduct();
    });
  if (JSON.parse(localStorage.getItem("products")) == null) {
    localStorage.setItem("products", JSON.stringify([]));
  }
}

function showCount() {
  let count = document.querySelector(".horse__cart__span");
  let basket = JSON.parse(localStorage.getItem("products"));
  count.innerHTML = basket.length;
}

function createProduct() {
  let id = 0;
  let addBtn = document.querySelectorAll(".addBtn");
  let products = JSON.parse(localStorage.getItem("products"));
  for (let j = 0; j < addBtn.length; j++) {
    const btn = addBtn[j];
    btn.addEventListener("click", function () {
      let product = {
        id: id++,
        name: this.parentElement.children[0].textContent,
        description: this.parentElement.children[1].textContent,
        price: this.parentElement.children[2].textContent,
        image: this.parentElement.previousElementSibling.children[0].src,
      };

      products.push(product);
      localStorage.setItem("products", JSON.stringify(products));
      showCount();
      //   let existProd = products.find((x) => x.id === id);
      //   console.log(existProd);
      //   if (existProd == undefined) {
      //   }

      basket.innerHTML += `  <div class="basket__product">
  <div class="row">
  
    <div class="col-3">
    <img src="${this.parentElement.previousElementSibling.children[0].src}" alt="">
    </div>
    <div class="col-9">
      <span class="prod__name">product name: ${this.parentElement.children[0].textContent}</span>
      <span class="prod__price">product price: ${this.parentElement.children[2].textContent}</span>
    </div>
  </div>
</div>`;
    });
  }
}
