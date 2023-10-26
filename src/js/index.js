import './slider.js';

// let url = 'https://65367a0fbb226bb85dd2306e.mockapi.io/:endpoint';

fetch('https://65367a0fbb226bb85dd2306e.mockapi.io/wildberries')
  .then(response => response.json())
  .then(data => data.forEach(element => createCard(element.img, element.price, element.dateOfDelivery, element.title)))
 

  function generateSalePercent (){ //скидка от 1 до 30%
  let randomNumber = Math.random();
  let result = Math.floor(randomNumber * (30 - 2 + 1)) + 2;
  return result;
  }

  function createCard(imgSrc, priceProd, delDate, nameProd){
 
  const catalogWrap = document.getElementsByClassName('catalog-wrapper')[0];
  const cardItem = document.createElement('div');
  cardItem.className = 'card-item';
  const cardImg = document.createElement('div');
  cardImg.className = 'card-img';
  const img = document.createElement('img');
  
  img.src = imgSrc;

  cardImg.append(img);

  

  const cardText = document.createElement('div');
  cardText.className = 'card-text';
  const cardTextWrapLeft = document.createElement('div');
  cardTextWrapLeft.className = 'card-text-wrap left';
  const price = document.createElement('span');
  price.className = 'price';
  const delivery = document.createElement('span');
  delivery.className = 'deliveryDate';

  const cardTextWrapRight = document.createElement('div');
  cardTextWrapRight.className = 'card-text-wrap right';
  const sale = document.createElement('span');
  sale.className = 'sale';
  const oldPrice = document.createElement('span');
  oldPrice.className = 'new-price';


  // price.innerHTML = `${priceProd} руб`;
  
  delivery.innerHTML = delDate;

  cardTextWrapLeft.append(price, delivery);


  let saleNumber = generateSalePercent()
  sale.innerHTML =  `${saleNumber}% `;
  price.innerHTML = `${Number(priceProd  - (priceProd * saleNumber / 100))} руб` ;
  oldPrice.innerHTML = priceProd;
  oldPrice.style.textDecoration = 'line-through';

  cardTextWrapRight.append(sale, oldPrice);

  cardText.append(cardTextWrapLeft, cardTextWrapRight);

const cardName = document.createElement('div');
cardName.className = 'card-name';
const itemName = document.createElement('span');
itemName.className = 'item-name';

itemName.innerHTML = nameProd;

cardName.append(itemName);

const btn = document.createElement('button');
btn.classList = 'buy';
btn.innerHTML = 'В корзину';

btn.addEventListener('click', () => {
  addToCart(itemName.innerHTML, priceProd, img, delivery.innerHTML);
});



cardItem.append(cardImg,cardText,cardName, btn);

catalogWrap.append(cardItem);

see(cardImg);
  }
  

  let cards = JSON.parse(localStorage.getItem('cards')) || [];

  function addToCart(title, price, img, deliver) {
    const item = { title, price, img, deliver };
    cards.push(item);
  
    localStorage.setItem('cards', JSON.stringify(cards));
    // alert('Товар добавлен в корзину');
  }



  function see(img){ //при наведении на картинку, появляется кнопка посмотреть подробнее
const btn_details = document.createElement('button');
btn_details.className = 'none-btn';
btn_details.innerHTML = 'Подробнее';
img.append(btn_details);
img.addEventListener('mouseenter', () =>{
  btn_details.className = 'details'
})
img.addEventListener('mouseleave', () => {
  btn_details.className = 'none-btn';
})

seeCard(btn_details)
  }


function seeCard(button){
  button.addEventListener('click', () => {

    const newCard = document.createElement('div');
    newCard.className = 'card-details';
    newCard.style.zIndex = '6';
    newCard.style.border = '2px solid black'


    const btn_done = document.createElement('button');
    btn_done.className = 'done';
    btn_done.innerHTML = 'X';

  
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
    priceElement.textContent = price;
    const titleElement = document.createElement('span');
    titleElement.textContent = title;

    textContainer.append(priceElement, titleElement)

    newCard.appendChild(imgElement);
    newCard.appendChild(textContainer);
    newCard.appendChild(btn_done);

    document.body.appendChild(newCard);

    btn_done.addEventListener('click', ()=>{
      document.body.removeChild(newCard)
    })
  });
}