'use strict';

const ESC_KEYCODE = 27;

const body = document.querySelector('.page__body');
const header = body.querySelector('.page-header');
const promo = body.querySelector('.promo');
const form = body.querySelector('.form');
const userName = document.querySelector('#user-name');
const userPhone = document.querySelector('#user-phone');
// const userText = document.querySelector('#user-text');
const popupOpen = document.querySelector('.contacts__callback-button');
const popupTemplate = body.querySelector('.feedback__wrapper');

// const popupUserName = popup.querySelector('.popup__username');

header.classList.remove('page-header--nojs');
promo.classList.remove('promo--nojs'); // loading *.webp

let isStorageSupport = true;
let storageName = '';
let storagePhone = '';
try {
  storageName = localStorage.getItem('user-name');
  storagePhone = localStorage.getItem('user-phone');
} catch (err) {
  isStorageSupport = false;
}

if (storageName) {
  userName.value = storageName;
}
if (storagePhone) {
  userPhone.value = storagePhone;
}

if (form) {
  form.addEventListener('submit', () => {
    if (isStorageSupport) {
      if (userPhone.value) {
        localStorage.setItem('user-phone', userPhone.value);
      }
      if (userName.value) {
        localStorage.setItem('user-name', userName.value);
      }
    }
  });
}

userPhone.addEventListener('input', () => {
  const userPhoneValue = userPhone.value;
  let regex = /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/;
  if (!userPhoneValue) {
    userPhone.setCustomValidity('Обязательное поле!');
  } else if (!regex.test(userPhoneValue)) {
    userPhone.setCustomValidity(`Введите корректный номер телефона!`);
  } else {
    userPhone.setCustomValidity('');
  }
  userPhone.reportValidity();
});

const showPopup = () => {
  const popup = document.createElement('section');
  const popupCloseBtn = document.createElement('button');
  const popupWrapper = popupTemplate.cloneNode(true);
  popup.className = 'popup';
  popupCloseBtn.className = 'popup__close-btn';

  popupWrapper.getElementsByTagName('h2')[0].textContent = 'Закажите звонок';
  popupWrapper.getElementsByTagName('legend')[0].textContent = 'Оставьте контакты, мы проконсультируем вас бесплатно в удобное время';
  popupWrapper.getElementsByClassName('form-feedback__button')[0].textContent = 'Oтправить';
  body.appendChild(popup);
  popup.appendChild(popupCloseBtn);
  popup.append(popupWrapper);

  popup.getElementsByClassName('form-feedback__input')[0].focus();

  // body.classList.add('not-available');

  const escClose = (evt) => {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.preventDefault();
      popup.remove();
      document.removeEventListener('keydown', escClose);
    }
  };

  const buttonClose = (evt) => {
    evt.preventDefault();
    popup.remove();
    popupCloseBtn.removeEventListener('click', buttonClose);
  };

  const clickClose = (evt) => {
    evt.preventDefault();
    if (!popup) {
      popup.remove();
      document.removeEventListener('click', clickClose);
    }
  };

  popupCloseBtn.addEventListener('click', buttonClose);
  document.addEventListener('keydown', escClose);
  document.addEventListener('click', clickClose);
};

popupOpen.addEventListener('click', showPopup);
