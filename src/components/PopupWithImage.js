import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupImgSelector, popupDescriptionSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(popupImgSelector);
    this._description = this._popup.querySelector(popupDescriptionSelector);
  }

  openPopup(link, description) {
    this._image.src = link;
    this._image.alt = description;
    this._description.textContent = description;
    super.openPopup();
  }
}
