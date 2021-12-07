'use strict';

const body = document.querySelector('.page__body');
const form = body.querySelector('.form');
const userName = document.querySelector('input[name=username]');
const userPhone = document.querySelector('input[name=userphone]');

(() => {
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
})();

(() => {
  const formValidate = () => {
    if (userPhone.value.length === 0) {
      userPhone.value = '+7(';
      userPhone.selectionStart = userPhone.value.length;
    }
    userPhone.addEventListener('keypress', (evt) => {
      if (evt.keyCode < 47 || evt.keyCode > 57 || evt.key === 'Backspace') {
        evt.preventDefault();
        userPhone.setCustomValidity(`Телефон в формате +7(***)*******. Поле принимает к вводу только цифры!`);
      }
      if (evt.keyCode >= 47 || evt.keyCode <= 57 || evt.key !== 'Backspace') {
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
      } else {
        userPhone.setCustomValidity('');
      }
      userPhone.reportValidity();
    });
  };
  userPhone.addEventListener('focus', formValidate);
})();

(() => {
  const popupOpen = document.querySelector('.contacts__callback-button');
  const showPopup = () => {
    const popupTemplate = body.querySelector('#feedback').content.querySelector('.popup-feedback');
    const popup = popupTemplate.cloneNode(true);
    document.body.append(popup);
    const overlay = document.createElement('div');
    body.appendChild(overlay);
    overlay.classList.add('overlay');
    const popupCloseButton = body.querySelector('.popup-feedback__close-button');

    if (body.getElementsByClassName('popup-feedback').length > 0) {

      body.classList.add('not-available');

      const escClose = (evt) => {
        const escKeycode = 27;
        if (evt.keyCode === escKeycode) {
          evt.preventDefault();
          popup.remove();
          body.classList.remove('not-available');
          overlay.classList.remove('overlay');
          document.removeEventListener('keydown', escClose);
        }
      };

      const buttonClose = (evt) => {
        if (evt.target.className !== 'popup-feedback') {

          evt.preventDefault();
          popup.remove();
          body.classList.remove('not-available');
          overlay.classList.remove('overlay');
          popupCloseButton.removeEventListener('click', buttonClose);
        }
      };

      const clickClose = (evt) => {
        if (evt.target.className !== 'popup-feedback') {
          popup.remove();
          body.classList.remove('not-available');
          overlay.classList.remove('overlay');
          document.removeEventListener('click', clickClose);
        }
      };

      popupCloseButton.addEventListener('click', buttonClose);
      document.addEventListener('keydown', escClose);
      overlay.addEventListener('click', clickClose);
    }
  };
  popupOpen.addEventListener('click', showPopup);
})();
