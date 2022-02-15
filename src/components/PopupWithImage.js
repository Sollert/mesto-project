import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor({ data }, popupSelector) {
    super(popupSelector);
    this._image = data.link;
    this._description = data.name;
  }

  openPopup(cardPopupImage, cardPopupDescription) {
    cardPopupImage.src = this._image;
    cardPopupDescription.textContent = this._description;

    super.openPopup();
  }
}
