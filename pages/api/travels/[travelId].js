import db from "../../../lib/firebase";
import logger from "../../../lib/helpers/Logger";

export default async (req, res) => {
    if (req.method === "GET") {
        const { travelId } = req.query;
        try {
            const travel = await db.collection("travels").doc(travelId).get();

            if (travel?.exists) {
                const parsedTravel = { ...travel.data(), id: travel.id };
                res.status(200).json({ travel: parsedTravel });
            } else {
                res.json({ error: "404 not found" });
            }
        } catch (error) {
            logger("error", error);
            res.status(500).json({
                error: "Internal server error",
            });
        }
    } else {
        res.send("Rossz helyen jarsz");
    }
    res.end();
};
