import db from "../firebase";
import logger from "./Logger";

function getThumbnails(travel) {
    const thumbnails =
        travel?.data()?.pictures?.length > 0
            ? travel
                  .data()
                  ?.pictures?.map(
                      (p, i) =>
                          "https://firebasestorage.googleapis.com/v0/b/" +
                          "kalandozastravel.appspot.com" +
                          "/o/" +
                          encodeURIComponent(`travels/${travel.id}/pictures/thumbnails/${i}_500x500`) +
                          "?alt=media&token=" +
                          p?.src?.split("&token=")?.[1]
                  )
            : [];
    return { thumbnails: thumbnails };
}

export async function getAllTravels() {
    try {
        const today = new Date().toISOString().split("T")[0];

        const travels = await db.collection("travels").where("startingDate", ">=", today).orderBy("startingDate").orderBy("timestamp").get();
        const parsedTravels = travels.docs.map((doc) => ({
            ...doc.data(),
            desc: "",
            id: doc.id,
            timestamp: new Date(doc.data().timestamp?.toDate()).toString(),
            lastupdate: new Date(doc.data().lastupdate?.toDate()).toString(),
            pictures: [doc.data()?.pictures?.length > 0 ? doc.data()?.pictures[0] : ""],
            thumbnailPictures: [],
            thumbnail: getThumbnails(doc).thumbnails[0],
        }));
        return {
            travels: parsedTravels,
        };
    } catch (error) {
        logger("error", error);
    }
}

export async function getHomeData() {
    try {
        const today = new Date().toISOString().split("T")[0];

        const faqs = await db.collection("faqs").orderBy("timestamp", "desc").get();
        const travels = await db.collection("travels").where("startingDate", ">=", today).orderBy("startingDate").orderBy("timestamp").get();

        const parsedTravels = travels.docs.map((doc) => ({
            ...doc.data(),
            desc: "",
            id: doc.id,
            timestamp: new Date(doc.data().timestamp?.toDate()).toString(),
            lastupdate: new Date(doc.data().lastupdate?.toDate()).toString(),
            pictures: [doc.data()?.pictures?.length > 0 ? doc.data()?.pictures[0] : ""],
            thumbnailPictures: [],
            thumbnail: getThumbnails(doc).thumbnails[0],
        }));
        const parsedFaqs = faqs.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            timestamp: new Date(doc.data().timestamp?.toDate()).toString(),
            lastupdate: new Date(doc.data().lastupdate?.toDate()).toString(),
        }));

        return {
            faqs: parsedFaqs,
            travels: parsedTravels,
        };
    } catch (error) {
        logger("error", error);
    }
}

export async function getOneTravel(travelId) {
    try {
        const travel = await db.collection("travels").doc(travelId).get();

        if (travel?.exists) {
            const parsedTravel = {
                ...travel.data(),
                id: travel.id,
                timestamp: new Date(travel.data().timestamp?.toDate()).toString(),
                lastupdate: new Date(travel.data().lastupdate?.toDate()).toString(),
                thumbnailPictures: [],
                ...getThumbnails(travel),
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
}

export async function getIDs() {
    try {
        //const today = new Date().toISOString().split("T")[0];

        const travels = await db.collection("travels").get();
        const ids = travels.docs.map((doc) => ({
            params: {
                id: doc.id,
            },
        }));
        return ids;
    } catch (error) {
        logger("error", error);
    }
}
