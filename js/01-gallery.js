import { galleryItems } from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".gallery"),
};

function createItem({ preview, original, description }) {
  return `
    <li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
`;
}

function galleryMarkup(object) {
  return object.map((item) => createItem(item)).join("");
}

refs.gallery.innerHTML = galleryMarkup(galleryItems);

refs.gallery.addEventListener("click", onClickImageModalZoom);

function onClickImageModalZoom(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  const bigImageUrl = event.target.dataset.source;
  const sizeByWidth = window.innerWidth - 20;

  const instance = basicLightbox.create(
    `
      <div class="modal" >
          <img
            width=${sizeByWidth}
            src="${bigImageUrl}"
              />
              </div>
              `,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", onEscapeCloseModal);
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", onEscapeCloseModal);
      },
    }
  );

  function onEscapeCloseModal(event) {
    if (event.code === "Escape") {
      instance.close();
    }
  }
  instance.show();

  const modalImage = document.querySelector(".modal img");
  modalImage.addEventListener("click", onClickCloseModal);

  function onClickCloseModal() {
    instance.close();
  }
}
