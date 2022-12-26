export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_GAID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
const pageview = (url) => {
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
        window?.gtag("config", GA_TRACKING_ID, {
            page_path: url,
        });
    }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
const event = (name, { ...rest }) => {
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
        window?.gtag("event", name, {
            ...rest,
        });
    }
};

export { event, pageview };
