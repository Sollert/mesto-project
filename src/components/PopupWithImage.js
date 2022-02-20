import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupImgSelector, popupDescriptionSelector) {
    super(popupSelector);
    this._image = document.querySelector(popupImgSelector);
    this._description = document.querySelector(popupDescriptionSelector);
  }

  openPopup(link, description) {
    this._image.src = link;
    this._image.alt = description;
    this._description.textContent = description;
    super.openPopup();
  }
}
