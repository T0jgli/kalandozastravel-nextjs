import Lightbox from "react-18-image-lightbox";
import { HiChevronLeft, HiChevronRight, HiX } from "react-icons/hi";

const Fslightbox = ({ imgtoggler, setimgtoggler, data, gallery }) => {
    return (
        <>
            {imgtoggler.toggler && (
                <Lightbox
                    mainSrc={data[imgtoggler.slide]}
                    nextSrc={data[(imgtoggler.slide + 1) % data.length]}
                    prevSrc={data[(imgtoggler.slide + data.length - 1) % data.length]}
                    onCloseRequest={() => {
                        setimgtoggler({
                            ...imgtoggler,
                            toggler: false,
                        });
                    }}
                    onMovePrevRequest={() =>
                        setimgtoggler({
                            ...imgtoggler,
                            slide: (imgtoggler.slide + data.length - 1) % data.length,
                        })
                    }
                    onMoveNextRequest={() =>
                        setimgtoggler({
                            ...imgtoggler,
                            slide: (imgtoggler.slide + 1) % data.length,
                        })
                    }
                    imageCaption={imgtoggler.slide + 1 + "/" + data.length}
                    wrapperClassName="imgwrapper"
                />
            )}
        </>
    );
};

// const Fslightbox = ({ imgtoggler, setimgtoggler, data, gallery }) => {
//     return (
//         <div>
//             {imgtoggler.toggler && (
//                 <div
//                     // show={isOpen}
//                     // enter="transition-opacity duration-300"
//                     // enterFrom="opacity-0"
//                     // enterTo="opacity-100"
//                     // leave="transition-opacity duration-300"
//                     // leaveFrom="opacity-100"
//                     // leaveTo="opacity-0"
//                     className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
//                 >
//                     <div className="absolute top-0 flex justify-end text-4xl p-2 text-white w-full bg-black/40">
//                         <button
//                             onClick={() => {
//                                 setimgtoggler({
//                                     ...imgtoggler,
//                                     toggler: false,
//                                 });
//                             }}
//                         >
//                             <HiX />
//                         </button>
//                     </div>
//                     <button
//                         className="absolute left-0 top-1/2 p-2 text-4xl transform -translate-y-1/2 text-white bg-black/40"
//                         onClick={() =>
//                             setimgtoggler({
//                                 ...imgtoggler,
//                                 slide: (imgtoggler.slide + data.length - 1) % data.length,
//                             })
//                         }
//                     >
//                         <HiChevronLeft />
//                     </button>
//                     <div className="relative">
//                         <img src={data[imgtoggler.slide]} className="max-h-screen max-w-full" />
//                     </div>
//                     <button
//                         className="absolute right-0 top-1/2 p-2 text-4xl transform -translate-y-1/2 text-white bg-black/40"
//                         onClick={() =>
//                             setimgtoggler({
//                                 ...imgtoggler,
//                                 slide: (imgtoggler.slide + 1) % data.length,
//                             })
//                         }
//                     >
//                         <HiChevronRight />
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

export default Fslightbox;
