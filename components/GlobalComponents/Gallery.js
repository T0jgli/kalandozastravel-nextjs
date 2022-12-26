import React from "react";
import galleryJSON from "../../lib/gallery.json";
import ImageGallery from "react-image-gallery";

const Gallery = () => {
    return (
        <div className="max-w-5xl px-3 md:px-0 mx-auto my-32 gallery">
            <ImageGallery
                items={galleryJSON}
                slideInterval={5000}
                autoPlay={true}
                showFullscreenButton={true}
                thumbnailPosition="left"
                showPlayButton={false}
            />
        </div>
    );
};

export default Gallery;
