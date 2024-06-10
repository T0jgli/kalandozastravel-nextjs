export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_GAID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
const pageview = (url) => {
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
        try {
            window?.gtag("config", GA_TRACKING_ID, {
                page_path: url,
            });
        } catch (error) {
            console.log(error);
            return;
        }
    }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
const event = (name, { ...rest }) => {
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
        try {
            window?.gtag("event", name, {
                ...rest,
            });
        } catch (error) {
            console.log(error);
            return;
        }
    }
};

export { event, pageview };
