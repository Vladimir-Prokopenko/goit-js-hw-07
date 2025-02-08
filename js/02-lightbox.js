import { galleryItems } from "./gallery-items.js";
// Change code below this line

const refs = {
  galleryRefs: document.querySelector(".gallery"),
};

function creatingGalleryMarkup(arry) {
  return arry.reduce(
    (acc, { preview, original, description }) =>
      acc +
      `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        alt="${description}"
      />
    </a>
  </li>`,
    ""
  );
}

refs.galleryRefs.innerHTML = creatingGalleryMarkup(galleryItems);

refs.galleryRefs.addEventListener("click", onClickSimpleLightbox);

function onClickSimpleLightbox(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
  });
}
