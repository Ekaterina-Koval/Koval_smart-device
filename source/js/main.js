'use strict';

const ESC_KEYCODE = 27;

const body = document.querySelector('.page__body');
const header = body.querySelector('.page-header');
const promo = body.querySelector('.promo');
const form = body.querySelector('.form');
const userName = document.querySelector('#user-name');
const userPhone = document.querySelector('#user-phone');
const popupOpen = document.querySelector('.contacts__callback-button');
const popupTemplate = body.querySelector('.feedback__wrapper');

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

userPhone.addEventListener('focus', () => {
  userPhone.value = '+7(';
});

userPhone.addEventListener('keypress', (evt) => {
  if (evt.keyCode < 47 || evt.keyCode > 57 || evt.key === 'Backspace') {
    evt.preventDefault();
  } else if (evt.keyCode >= 47 || evt.keyCode <= 57 || evt.key !== 'Backspace') {
    userPhone.setCustomValidity(`Введите 10 цифр номера телефона!`);
  } else {
    userPhone.setCustomValidity('');
  }
  userPhone.reportValidity();
});

userPhone.addEventListener('keydown', () => {
  let old = 0;
  const userPhoneLength = userPhone.value.length;
  if (userPhoneLength < old) {
    old--;
    return;
  }
  if (userPhoneLength === 6) {
    userPhone.value = userPhone.value + ')';
  }
  old++;
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
