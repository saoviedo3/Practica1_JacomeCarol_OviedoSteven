class ImageGallery extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Lista de nombres de archivos de imágenes
        this.images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
        this.currentIndex = 0;

        // Crear el HTML para la galería de imágenes
        this.shadowRoot.innerHTML = `
            <style>
                @import 'gallery-component.css';
            </style>
            <div class="gallery">
                <button id="prev">Anterior</button>
                <img id="mainImage" src="${this.images[this.currentIndex]}">
                <button id="next">Siguiente</button>
                <div id="thumbnails">
                   <img class="thumbnail img1" src="${this.images[0]}" data-index="0">
                   <img class="thumbnail img2" src="${this.images[1]}" data-index="1">
                   <img class="thumbnail img3" src="${this.images[2]}" data-index="2">
                </div>
            </div>
        `;

        // Agregar eventos de clic a los botones y miniaturas
        this.shadowRoot.querySelector('#prev').addEventListener('click', () => this.changeImage(-1));
        this.shadowRoot.querySelector('#next').addEventListener('click', () => this.changeImage(1));
        this.shadowRoot.querySelectorAll('.img1').forEach(img =>
            img.addEventListener('click', (e) => this.changeImage(Number(e.target.dataset.index) - this.currentIndex))
        );
    }

    changeImage(diff) {
        this.currentIndex = (this.currentIndex + diff + this.images.length) % this.images.length;
        this.shadowRoot.querySelector('#mainImage').src = this.images[this.currentIndex];
    }
}

customElements.define('image-gallery', ImageGallery);
