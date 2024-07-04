import firebaseapp from "../firebase";
import logger from "./Logger";
import { getFirestore, collection, query, where, getDocs, orderBy, getDoc, doc } from "firebase/firestore";

const db = getFirestore(firebaseapp);

function getThumbnails(travel) {
    const isNew = new Date(travel?.data().timestamp?.toDate()) > new Date(2023, 5, 13);
    const pictureLocation = isNew ? "/thumbnails/pictures." : "/pictures/thumbnails/";
    const fileType = isNew ? ".webp" : "";
    const thumbnails =
        travel?.data()?.pictures?.length > 0
            ? travel
                  .data()
                  ?.pictures?.map(
                      (p, i) =>
                          "https://firebasestorage.googleapis.com/v0/b/" +
                          "kalandozastravel.appspot.com" +
                          "/o/" +
                          encodeURIComponent(`travels/${travel.id}${pictureLocation}${i}_500x500${fileType}`) +
                          "?alt=media&token=" +
                          p?.src?.split("&token=")?.[1]
                  )
            : [];
    return { thumbnails: thumbnails };
}

export async function getAllTravels() {
    try {
        const today = new Date().toISOString().split("T")[0];
        const travelsQuery = query(collection(db, "travels"), where("startingDate", ">=", today), orderBy("startingDate"), orderBy("timestamp"));
        const travels = await getDocs(travelsQuery);

        const parsedTravels = travels.docs.map((doc) => ({
            ...doc.data(),
            desc: "",
            id: doc.id,
            timestamp: new Date(doc.data().timestamp?.toDate()).toString(),
            lastupdate: new Date(doc.data().lastupdate?.toDate()).toString(),
            pictures: [doc.data()?.pictures?.length > 0 ? doc.data()?.pictures[0] : ""],
            thumbnailPictures: [],
            thumbnail: getThumbnails(doc).thumbnails[0] || null,
        }));

        const countries = new Set();

        parsedTravels.forEach((t) => countries.add(t?.country?.charAt(0)?.toUpperCase() + t?.country?.slice(1)));

        return {
            travels: parsedTravels,
            countries: Array.from(countries)?.sort(),
        };
    } catch (error) {
        logger("error", error);
    }
}

export async function getHomeData() {
    try {
        const today = new Date().toISOString().split("T")[0];
        const faqQuery = query(collection(db, "faqs"), orderBy("timestamp", "desc"));
        const faqs = await getDocs(faqQuery);

        const travelsQuery = query(collection(db, "travels"), where("startingDate", ">=", today), orderBy("startingDate"), orderBy("timestamp"));
        const travels = await getDocs(travelsQuery);

        const parsedTravels = travels.docs.map((doc) => ({
            ...doc.data(),
            desc: "",
            id: doc.id,
            timestamp: new Date(doc.data().timestamp?.toDate()).toString(),
            lastupdate: new Date(doc.data().lastupdate?.toDate()).toString(),
            pictures: [doc.data()?.pictures?.length > 0 ? doc.data()?.pictures[0] : ""],
            thumbnailPictures: [],
            thumbnail: getThumbnails(doc).thumbnails[0] || null,
        }));
        const parsedFaqs = faqs.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            timestamp: new Date(doc.data().timestamp?.toDate()).toString(),
            lastupdate: new Date(doc.data().lastupdate?.toDate()).toString(),
        }));

        const countries = new Set();

        parsedTravels.forEach((t) => {
            countries.add(t?.country?.charAt(0)?.toUpperCase() + t?.country?.slice(1));
        });

        return {
            faqs: parsedFaqs,
            travels: parsedTravels,
            countries: Array.from(countries)?.sort(),
        };
    } catch (error) {
        logger("error", error);
    }
}

export async function getOneTravel(travelId) {
    try {
        const travelDoc = doc(db, "travels", travelId);
        const travel = await getDoc(travelDoc);

        if (travel?.exists()) {
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
        const travelsQuery = query(collection(db, "travels"));
        const travels = await getDocs(travelsQuery);

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
