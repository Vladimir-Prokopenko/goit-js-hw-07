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

function createAllgallery(object) {
  return object.map((item) => createItem(item)).join("");
}

refs.gallery.innerHTML = createAllgallery(galleryItems);

refs.gallery.addEventListener("click", onClickImageModelZoom);

function onClickImageModelZoom(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
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
              `
  );

  instance.show();

  window.addEventListener("keydown", instanceCloseModal);

  function instanceCloseModal(event) {
    if (event.code === "Escape") {
      instance.close();
      window.removeEventListener("keydown", instanceCloseModal);
    }
  }
}
