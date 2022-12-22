export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_GAID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
const pageview = (url) => {
    if (typeof window !== "undefined") {
        window.gtag("config", GA_TRACKING_ID, {
            page_path: url,
        });
    }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
const event = ({ action, category, label, value, ...rest }) => {
    if (typeof window !== "undefined") {
        window.gtag("event", action, {
            event_category: category,
            event_label: label,
            value: value,
            ...rest,
        });
    }
};

export { event, pageview };
