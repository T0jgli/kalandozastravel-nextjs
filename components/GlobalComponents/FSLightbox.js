import Lightbox from "react-18-image-lightbox";

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

export default Fslightbox;
