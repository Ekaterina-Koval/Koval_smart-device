'use strict';

const ESC_KEYCODE = 27;

const body = document.querySelector('.page__body');
const header = body.querySelector('.page-header');
const promo = body.querySelector('.promo');
const form = body.querySelector('.form');
const userName = document.querySelector('#user-name');
const userPhone = document.querySelector('#user-phone');
const popupOpen = document.querySelector('.contacts__callback-button');
const popup = document.querySelector('.popup');
const popupClose = popup.querySelector('.popup__close');
// const popupUserName = popup.querySelector('.popup__username');

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

const showPopup = (evt) => {
  evt.preventDefault();
  popup.classList.remove('visually-hidden');
  // popupUserName.focus();
};

const closePopup = (evt) => {
  evt.preventDefault();
  popup.classList.add('visually-hidden');
  popupClose.removeEventListener('click', closePopup);
};

const escClose = (evt) => {
  if (evt.keyCode === ESC_KEYCODE) {
    if (!popup.classList.contains('vishually-hidden')) {
      evt.preventDefault();
      popup.classList.add('visually-hidden');
      document.removeEventListener('keydown', escClose);
    }
  }
};
/*
const clickClose = () => {
  popup.classList.add('visually-hidden');
  document.removeEventListener('click', clickClose);
};
*/
popupClose.addEventListener('click', closePopup);
document.addEventListener('keydown', escClose);
// document.addEventListener('click', clickClose);
popupOpen.addEventListener('click', showPopup);

/*


feedbackForm.addEventListener('submit', function (event) {
  if (!userName.value || !eMail.value || !feedbackText.value) {
    event.preventDefault();
    modal.classList.remove('modal-error');
    modal.offsetWidth = modal.offsetWidth;
    modal.classList.add('modal-error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem('username', userName.value);
      localStorage.setItem('email', eMail.value);
    }
  }
});

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

*/
