import './slider.js';
// import './like.js'
//получаю объект с сервера

fetch("https://65367a0fbb226bb85dd2306e.mockapi.io/wildberries")
.then((response) => {return response.json()})
.then((data) => {console.log(data);
data.forEach((element, index) => {
    createCard(element.img, element.price, element.title, element.dateOfDelivery, element.description, index)
});})


//функция создания элементов 

export function createCard(imgSrc, priceProd, nameProd, delDate, description, index){

  const cardItem = document.createElement('div'); //сама карточка
  cardItem.className = 'card-item';
  cardItem.id = index;

  const cardImg = document.createElement('div'); //картинка
  cardImg.className = 'card-img';
  const img = document.createElement('img');

  const like = document.createElement('span'); // избранное
  like.innerHTML = '<i class="fa-regular fa-heart"></i>';

cardImg.appendChild(like);

  const cardText = document.createElement('div'); //текст под картинкой
  cardText.className = 'card-text';

  const cardTextWrapLeft = document.createElement('div');
  cardTextWrapLeft.className = 'card-text-wrap left'; //левая часть текста
  const itemName = document.createElement('span');
  itemName.className = 'item-name'
const descr = document.createElement('p');
descr.className = 'description'

  const price = document.createElement('span');
  price.className = 'price';
  const delivery = document.createElement('span');
  delivery.className = 'deliveryDate';

  const cardTextWrapRight = document.createElement('div'); // правая часть текста
  cardTextWrapRight.className = 'card-text-wrap right';
  const sale = document.createElement('span');
  sale.className = 'sale';
  const oldPrice = document.createElement('span');
  oldPrice.className = 'new-price';

  const btn = document.createElement('button'); // кнопка в корзину
  btn.classList = 'buy';
  btn.innerHTML = 'В корзину'


 img.src = imgSrc;
 delivery.innerHTML = `Доставка: ${delDate}`;
 let saleNumber = getRandomArbitrary(1, 30); //скидка и новая цена
sale.innerHTML = `${Math.floor(saleNumber)}% `;
price.innerHTML = `${Math.floor(Number(priceProd - (priceProd * saleNumber / 100)))} руб`;
oldPrice.innerHTML = priceProd;
oldPrice.style.textDecoration = 'line-through';
itemName.innerHTML = nameProd;
descr.innerHTML = description

  cardImg.appendChild(img);
  cardTextWrapLeft.append(price,delivery, itemName, descr);
  cardTextWrapRight.append(sale, oldPrice);
  cardText.append(cardTextWrapLeft, cardTextWrapRight);
  cardItem.append(cardImg,cardText,  btn);

  const wrap = document.querySelector('.catalog-wrapper');
  wrap.append(cardItem);
  like.addEventListener('click', ()=>{
    setLikeLS(nameProd, description, priceProd, imgSrc, index);

  })
  btn.addEventListener('click', function() {
    const index = btn.closest('.card-item').id;
    console.log(index);
    setLS(nameProd, description, priceProd, imgSrc, index);
    showCartFromLocalStorage();
  });

  seeMore(cardImg)
}


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

//запись избранного в локал сторэдж

function setLikeLS(title, descr,price, img, id){
const like ={
  'title': title ,
    'description':descr,
    'price': price,
    'img': img,
    'id': id
}

let likes = localStorage.getItem("likes") ? JSON.parse(localStorage.getItem("likes")) : [];
likes.push(like);

localStorage.setItem("likes", JSON.stringify(likes))
}



//запись в локал сторэдж

function setLS (title, descr,price, img, id){

const card = {
  'title': title ,
  'description':descr,
  'price': price,
  'img': img,
  'id': id
  };

let cards = localStorage.getItem("cards") ? JSON.parse(localStorage.getItem("cards")) : [];
let flag = false;
cards.forEach(cardItem => {
  if(cardItem.id == card.id){
flag = true;
alert("Такой товар уже есть в корзине");
}
})

if(!flag){
cards.push(card); 
} 

localStorage.setItem('cards', JSON.stringify(cards));
}

//создание кнопки посмотреть подробнее при наведении на картинку

function seeMore(img){
   
    const btn_details = document.createElement('button');
    btn_details.className = 'none-btn';
    btn_details.innerHTML = 'Подробнее';

    img.append(btn_details);

     img.addEventListener('mouseenter', () => {
        btn_details.className = 'details';
    });
     img.addEventListener('mouseleave', () => {
        btn_details.className = 'none-btn';
    });

    seeCard(btn_details)
      
}

//создание окна с карточкой товара

function seeCard(button){ 
    button.addEventListener('click', () => {
  
      const newCard = document.createElement('div');
      newCard.className = 'card-details';
      const btn_done = document.createElement('button');
      btn_done.className = 'done';
  
      const img = button.parentElement.parentElement.querySelector('img');
      const price = button.parentElement.parentElement.querySelector('.price').innerHTML;
      const title = button.parentElement.parentElement.querySelector('.item-name').innerHTML;
      console.log(price, title);
  
      const imgElement = document.createElement('div');
      imgElement.className = 'imgElement'
      const imgElementContent = document.createElement('img');
      imgElementContent.src = img.src;
      imgElement.append(imgElementContent)
  
  
      const textContainer = document.createElement('div');
      textContainer.className = 'textContainer'
      const priceElement = document.createElement('span');
      priceElement.className = 'price-element';
      priceElement.innerHTML = `Цена ${price}`;
      const titleElement = document.createElement('span');
      titleElement.className = 'title-element';
      titleElement.innerHTML = ` ${title}`;
      const btn_cardDetails = document.createElement('button');
      btn_cardDetails.className = 'btn_cardDetails';
      btn_cardDetails.innerHTML = 'В корзину'
  
      textContainer.append(titleElement ,priceElement, btn_cardDetails)
  
      newCard.appendChild(imgElement);
      newCard.appendChild(textContainer);
      newCard.appendChild(btn_done);
  
      document.body.appendChild(newCard);
  
      btn_done.addEventListener('click', ()=>{
        document.body.removeChild(newCard)
      })

      btn_cardDetails.addEventListener('click', )
    });
  }

const cartC = document.querySelector('.cart-container');
const cartList = document.createElement('div');
cartList.className = 'cart-list';
cartC.append(cartList)
const button = document.createElement("button");
button.innerHTML = "Закрыть корзину";
cartC.append(button);


//посмотреть корзину
  function showCartFromLocalStorage() {
cartList.innerHTML = "";
cartC.classList.add('active');
const cards = localStorage.getItem('cards');
      if (cards) {
const cartItems = JSON.parse(cards);
if(cartItems.length == 0){
  cartList.innerHTML = `<p class ="cartlist-text">Корзина пуста</p>`;

}else{
cartItems.forEach(cardItem => {
const cartItem = document.createElement("div");
cartItem.className = "cart-item";
cartItem.id = cardItem.id;
const titleItem = document.createElement("span");
titleItem.className = "cart-item_title";
const deleteItem = document.createElement('span');
deleteItem.className = 'delete-item'
const priceItem = document.createElement("span");
priceItem.className = "cart-item_price";
const itemImg = document.createElement('img');
itemImg.className = 'item-img';
titleItem.innerHTML = `Товар ${cardItem.title}`;
priceItem.innerHTML = `Цена: ${cardItem.price}`;
itemImg.src = cardItem.img;
cartItem.append(itemImg, priceItem, titleItem, deleteItem);
cartList.append(cartItem);
  removefromLS (deleteItem, cartItem)
 }
 )}}
button.addEventListener("click",  () => {
  cartC.classList.remove('active');
    // console.log(button.parentElement);
    
  })
   
   }  
    
  function removefromLS (deleteItem, cartItem){
    deleteItem.addEventListener('click', function (){
      deleteItem.parentElement.remove(cartItem)
        console.log(deleteItem.parentElement);
        let cards = localStorage.getItem("cards") ? JSON.parse(localStorage.getItem("cards")) : [];
        cards.forEach((card, index) => {
          if(deleteItem.parentElement.id == card.id){
            cards.splice(index, index + 1);
            localStorage.setItem("cards", JSON.stringify(cards));
          }
        })
        localStorage.setItem("cards", JSON.stringify(cards));
        showCartFromLocalStorage();
    });
  }


  //посмотреть корзину при нажатии на корзину в хэдэре

  const cartlogo = document.querySelector('.fa-cart-shopping');
  cartlogo.addEventListener('click', showCartFromLocalStorage)


//поиск по названию и описанию
const input = document.querySelector('input');
input.addEventListener('input', search);

function search() {
  const searchTerm = input.value.toLowerCase();
  const cards = document.querySelectorAll('.card-item');

  cards.forEach(card => {
      const title = card.querySelector('.item-name').textContent.toLowerCase();
      const description = card.querySelector('.description').textContent.toLowerCase();
      
      if (title.includes(searchTerm) || description.includes(searchTerm)) {
          card.style.display = 'block';
      } else {
          card.style.display = 'none';
      }
  });
}


//общая сумма
function getSum(){
  let cards = localStorage.getItem("cards") ? JSON.parse(localStorage.getItem("cards")) : [];
  let sum = 0;
  cards.forEach((card) => {
    sum += Number(card.price);
    return sum;
  })
}