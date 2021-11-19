'use strict';

const body = document.querySelector('.page__body');
const header = body.querySelector('.page-header');
const promo = body.querySelector('.promo');
const form = body.querySelector('.form');
const userName = document.querySelector('#user-name');
const userPhone = document.querySelector('#user-phone');

header.classList.remove('page-header--nojs');
promo.classList.remove('promo--nojs');


let isStorageSupport = true;
let storageName = '';
let storageTel = '';
try {
  storageName = localStorage.getItem('username');
  storageTel = localStorage.getItem('email');
} catch (err) {
  isStorageSupport = false;
}

if (storageName) {
  userName.value = storageName;
}
if (storageTel) {
  userPhone.value = storageTel;
}

if (form) {
  form.addEventListener('submit', () => {
    if (isStorageSupport) {
      if (userPhone.value) {
        localStorage.setItem('tel', userPhone.value);
      }
      if (userName.value) {
        localStorage.setItem('name', userName.value);
      }
    }
  });
}

userPhone.addEventListener('input', () => {
  const userPhoneValue = userPhone.value;
  let regex = /^\+?[\d()\- ]+$/;
  if (!userPhoneValue) {
    userPhone.setCustomValidity('Обязательное поле!');
  } else if (!regex.test(userPhoneValue)) {
    userPhone.setCustomValidity(`Введите корректный номер телефона!`);
  } else {
    userPhone.setCustomValidity('');
  }
  userPhone.reportValidity();
});
