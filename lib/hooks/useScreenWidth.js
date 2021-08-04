import { useEffect, useState } from "react";

function useScreenWidth(width) {
    const [isMobile, setMobile] = useState(false);
    useEffect(() => {
        const listener = () => {
            if (window.innerWidth <= width && !isMobile) {
                setMobile(true);
            } else setMobile(false);
        };
        listener();
        window.addEventListener("resize", listener);
        return () => window.removeEventListener("resize", listener);
    }, []);

    return [isMobile];
}

export default useScreenWidth;
