import React, { Suspense, useEffect, useRef, useState } from "react";
import images from "../../lib/gallery.json";
import ImageGallery from "react-image-gallery";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { clsx } from "clsx/lite";

// const Gallery = () => {
//     return (
//         <Suspense>
//             <div className="max-w-5xl px-3 md:px-0 mx-auto my-32 gallery">
//                 <ImageGallery
//                     items={galleryJSON}
//                     slideInterval={5000}
//                     autoPlay={true}
//                     showFullscreenButton={true}
//                     thumbnailPosition="left"
//                     showPlayButton={false}
//                     lazyLoad={true}
//                 />
//             </div>
//         </Suspense>
//     );
// };

const Gallery = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const imagesRef = useRef([]);
    const allImagesRef = useRef(false);
    const imageRef = useRef(false);

    const scroll = (index) => {
        // var myElement = document.getElementById("galleryimage " + index);
        // myElement.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        // imagesRef.current[index].scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        console.log(imagesRef.current[index].scrollTop);
        allImagesRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "center",
        });
    };

    const handlePrev = () => {
        const index = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(index);
        scroll(index);
    };

    const handleNext = () => {
        const index = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(index);
        scroll(index);
    };

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
        scroll(index);
    };

    return (
        <Suspense>
            <div className="max-w-5xl px-3 md:px-0 mx-auto my-32 gallery flex flex-col-reverse justify-center gap-8 items-center">
                <div className="flex overflow-y-hidden overflow-x-hidden items-center justify-center flex-wrap gap-2 mt-4" ref={allImagesRef}>
                    {images.map((image, index) => (
                        <img
                            key={index}
                            ref={(el) => (imagesRef.current[index] = el)}
                            src={image?.thumbnail}
                            id={"galleryimage " + index}
                            alt={`Thumbnail ${index + 1}`}
                            className={clsx(
                                "w-20 mx-1 cursor-pointer transition duration-300 border-2 hover:opacity-100 h-20 object-cover",
                                index === currentIndex ? "opacity-100 border-yellow-700" : "opacity-60 border-transparent"
                            )}
                            onClick={() => handleThumbnailClick(index)}
                        />
                    ))}
                </div>

                <div className="relative">
                    <button
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-4 cursor-pointer text-4xl"
                        onClick={handlePrev}
                    >
                        <HiChevronLeft />
                    </button>
                    <img
                        src={images[currentIndex]?.thumbnail}
                        alt={`Image ${currentIndex + 1}`}
                        ref={imageRef}
                        className="w-full transition duration-300 object-cover h-[600px] "
                    />
                    <button
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-4 cursor-pointer text-4xl"
                        onClick={handleNext}
                    >
                        <HiChevronRight />
                    </button>
                </div>
            </div>
        </Suspense>
    );
};

export default Gallery;
