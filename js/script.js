(function miniInternetStore() {
let admin = document.querySelector('#admin');
let client = document.querySelector('#client');
let table = document.querySelector('.table');
let clientCard = document.querySelector('.client-wrapper');
let adminCard = document.querySelector('.admin-wrapper');
let code = document.querySelector('#code');
let price = document.querySelector('#price');
let checkbox = document.querySelector('#checkbox');
let url = document.querySelector('#url');
let description = document.querySelector('#description');
let save = document.querySelector('.save');
let name = document.querySelector('#name');
let add = document.querySelector('.add');
let form = document.querySelector('#add-form');
let goods = document.querySelector('.goods');
let basket = document.querySelector('.basket');
let sum = document.querySelector('.sum');
let basketBody = document.querySelector('.basket-body');

let edit = false;
let product = {};
let index = null;


class Product {
    constructor(code, name, description, price, available, imageUrl) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.price = price;
        this.available = available;
        this.imageUrl = imageUrl;
  }
};

const notebook = new Product(1,
  "Apple",
  "Панель Touch Bar Touch Bar with Touch ID Цвет корпуса: Silver Дисплей 13.3-дюйма (2560x1600) IPS Процессор 2-ядерный Intel Core i5 3.1GHz Оперативная память 8GB (2133MHz LPDDR3) Накопитель 512GB PCIe SSD Графика Intel Iris Plus Graphics 650 Встроенные порты 4 порта Thunderbolt 3 (USB-C) Автономность До 10 часов",
  1000,
  true,
  'img/apple.jpg');
console.log(notebook);

const smartfone = new Product(2,
  "Samsung Galaxy A7",
  "Экран (5.7\", Super AMOLED, 1920x1080)/ Samsung Exynos 7880 (1.9 ГГц)/ основная камера: 16 Мп, фронтальная камера: 16 Мп/ RAM 3 ГБ/ 32 ГБ встроенной памяти + microSD/SDHC (до 256 ГБ)/ 3G/ LTE/ GPS/ ГЛОНАСС/ поддержка 2х SIM-карт (Nano-SIM)/ Android 6.0 (Marshmallow)/ 3600 мА*ч",
  700,
  true,
  "img/samsung.jpg");
console.log(smartfone);

const tablet = new Product(3,
  "Lenovo Tab 3 Plus",
  "Экран 10\" IPS (1920x1200) MultiTouch / MediaTek MT8735 (1.3 ГГц) / RAM 2 ГБ / 32 ГБ встроенной памяти + microSD / 3G / LTE / Wi-Fi / Bluetooth 4.0 / основная камера 8 Мп, фронтальная - 5 Мп / GPS / ГЛОНАСС / Android 6.0 (Marshmallow) / 509 г / черный",
  600,
  true,
  "img/lenovo.jpg");

const fridge = new Product(4,
  "BOSCH KGN39VI35",
  "Цвет: Нержавеющая сталь, Полезный объем холодильной камеры: 279 л, Тип холодильника: Двухкамерный, Полезный объем морозильной камеры: 87 л ,Количество компрессоров: 1 ,Тип управления: Электронное ,Габариты (ВхШхГ): 203x60x66 см, Вес: 80 кг",
  1200,
  true,
  "img/bosch.jpg");

function setToLocalStorage() {
    if (!localStorage.getItem('products')) {
        const products = [];

        products.push(notebook);
        products.push(smartfone);
        products.push(tablet);
        products.push(fridge);
        console.log(products);
        let obj = {
        "arr": products
        }
        localStorage.setItem('products', JSON.stringify(obj));
      }
};

setToLocalStorage();

function makeAdminTable() {
    while (table.firstChild) {
        table.removeChild(table.firstChild);
      }
    let tableHeader = document.createElement('tr');
    table.appendChild(tableHeader);
    tableHeader.innerHTML = '<th>code</th><th>name</th><th>description</th><th>price</th><th>available</th><th>imageUrl</th><th>actions</th>'
    let line;
    let obj1 = JSON.parse(localStorage.getItem('products'));
    let products = obj1["arr"];
    for (let i = 0; i < products.length; i++) {
        line = document.createElement('tr');
        table.appendChild(line);
        let cell1 = document.createElement('td');
        line.appendChild(cell1);
        cell1.textContent = products[i].code;
        let cell2 = document.createElement('td');
        line.appendChild(cell2);
        cell2.textContent = products[i].name;
        let cell3 = document.createElement('td');
        line.appendChild(cell3);
        cell3.textContent = products[i].description;
        let cell4 = document.createElement('td');
        line.appendChild(cell4);
        cell4.textContent = products[i].price;
        let cell5 = document.createElement('td');
        line.appendChild(cell5);
        cell5.textContent = products[i].available;
        let cell6 = document.createElement('td');
        line.appendChild(cell6);
        cell6.textContent = products[i].imageUrl;
        let cell7 = document.createElement('td');
        cell7.classList.add("table-button");
        line.appendChild(cell7);
        cell7.innerHTML = '<button type="button" class="delete" > X </button><button type="button" class="edit">edit</button>';
      }
};
makeAdminTable();

function makeClientList() {
    while (goods.firstChild) {
        goods.removeChild(goods.firstChild);
      }
    let obj1 = JSON.parse(localStorage.getItem('products'));
    let products = obj1["arr"];
    products.forEach(function(item, index, arr) {
    if ((products[index]).available == true) {
        let productCard = document.createElement('div');
        productCard.classList.add("product-card");
        productCard.innerHTML = `<div><p>${item.name}</p></div><div class="main-content"><div><img src="${item.imageUrl}" alt="product"></div><div><p class="description">${item.description}</p></div></div><p>${item.price}</p><div><button class="buy">buy</button></div>`;
        goods.appendChild(productCard);
    }
  })
};

makeClientList();

function showClientList() {
  adminCard.style.display = "none";
  clientCard.style.display = "block";
}

function showAdminList() {
  adminCard.style.display = "block";
  clientCard.style.display = "none";
};


client.addEventListener('click', showClientList);
admin.addEventListener('click', showAdminList);

function addProductAndEdit() {
  if (edit === false) {
    if (code.value.length && name.value.length && description.value.length && price.value.length && url.value.length) {
      const product = new Product(code.value, name.value, description.value, price.value, checkbox.checked, url.value);
      let obj = JSON.parse(localStorage.getItem('products'));
      console.log(obj);
      let products = obj["arr"];
      products.push(product);
      localStorage.setItem('products', JSON.stringify(obj));
      makeAdminTable();
      makeClientList();
    }
  } else {
    console.log(product);
    console.log(index);
    const product1 = new Product(code.value, name.value, description.value, price.value, checkbox.checked, url.value);
    let obj = JSON.parse(localStorage.getItem('products'));
    let products = obj["arr"];
    products.splice(index, 1, product1);
    localStorage.setItem('products', JSON.stringify(obj));
    makeAdminTable();
    makeClientList();
    edit = false;
    code.value = '';
    name.value = '';
    description.value = '';
    price.value = '';
    checkbox.checked = false;
    url.value = '';
  }
};
save.addEventListener('click', addProductAndEdit);

function showAdd() {
  table.style.display = "none";
  form.style.display = "block";
};

function closeAdd() {
  table.style.display = "block";
  form.style.display = "none";
};

add.addEventListener('click', showAdd);
save.addEventListener('click', closeAdd);


document.addEventListener('click', function(e) {
  if (event.target.classList.contains('delete')) {
    let searchProduct = (((e.target).parentNode).parentNode).childNodes[1];
    console.log(searchProduct.textContent);
    let obj = JSON.parse(localStorage.getItem('products'));
    let products = obj["arr"];
    products.forEach(function(item, i, arr) {
      if (searchProduct.textContent == products[i].name) {
        console.log(products[i]);
        products.splice(i, 1);
        console.log(products);
        localStorage.setItem('products', JSON.stringify(obj));
      }
    })
    makeAdminTable();
    makeClientList();
  }
});

document.addEventListener('click', function(e) {
  if (event.target.classList.contains('edit')) {
    edit = true;
    let searchProduct = (((e.target).parentNode).parentNode).childNodes[1];

    console.log(searchProduct.textContent);
    let obj = JSON.parse(localStorage.getItem('products'));
    let products = obj["arr"];
    products.forEach(function(item, i, arr) {
      if (searchProduct.textContent == products[i].name) {
        console.log(products[i]);
        product = products[i];
        index = i;
        showAdd();
        code.value = products[i].code;
        name.value = products[i].name;
        price.value = products[i].price;
        url.value = products[i].imageUrl;
        if (products[i].available == true) {
          checkbox.checked = true;
        }
        description.value = products[i].description;

      }
    })
  }
});
let arrBasket = [];
let sumArr = [];
document.addEventListener('click', function(e) {
  if (event.target.classList.contains('buy')) {
    let searchProduct = ((e.target).parentNode).parentNode;
    console.log(searchProduct);
    let buyObj = {};
    buyObj.title = searchProduct.childNodes[0].textContent;
    buyObj.productPrice = searchProduct.childNodes[2].textContent;
    console.log(buyObj);
    arrBasket.push(buyObj);
    for (let i = 0; i < arrBasket.length; i++) {
      let div = document.createElement('div');
      basketBody.appendChild(div);
      div.innerHTML = `<p>${arrBasket[i].title}</p> <p class="productPrice">${arrBasket[i].productPrice}</p>`
      sumArr.push(Number(arrBasket[i].productPrice));
      arrBasket.shift();
    }
    console.log(sumArr);
    let result = sumArr.reduce(function(accum, current) {
      return accum + current;
    })
    console.log(result);
    sum.textContent = result;
  }
});
let showBasket = false;
basket.addEventListener('click', function() {
  if (showBasket === false) {
    showBasket = true;
    basketBody.style.display = "block";
  } else if (showBasket === true) {
    showBasket = false;
    basketBody.style.display = "none";
  }
});
})();
