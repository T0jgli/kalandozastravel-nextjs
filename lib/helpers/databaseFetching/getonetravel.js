import db from "../../firebase";
import logger from "../Logger";

export default async (travelId) => {
    try {
        const travel = await db.collection("travels").doc(travelId).get();

        if (travel?.exists) {
            const parsedTravel = {
                ...travel.data(),
                id: travel.id,
                timestamp: new Date(travel.data().timestamp?.toDate()).toString(),
                lastupdate: new Date(travel.data().lastupdate?.toDate()).toString(),
            };
            return {
                travel: parsedTravel,
            };
        } else {
            return { error: "404 not found" };
        }
    } catch (error) {
        logger("error", error);
    }
};
