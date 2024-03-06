import rateLimit from "express-rate-limit";
import { initMiddleware } from "./middlewares";

const getIP = (request) => request.headers["x-forwarded-for"];

export const getRateLimitMiddlewares = ({ limit = 10, windowMs = 60 * 1000 } = {}) => [
    rateLimit({ keyGenerator: getIP, windowMs, max: limit, standardHeaders: true, legacyHeaders: false }),
];

const middlewares = getRateLimitMiddlewares();

async function applyRateLimit(request, response) {
    await Promise.all(middlewares.map(initMiddleware).map((middleware) => middleware(request, response)));
}

export default applyRateLimit;
