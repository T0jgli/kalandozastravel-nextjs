import firestore from "../firebase";
import logger from "./Logger";
import { doc, getDocs, where, query, collection, orderBy, getDoc } from "@firebase/firestore/lite";

export async function getAllTravels() {
    try {
        const today = new Date().toISOString().split("T")[0];
        const q = query(collection(firestore, "travels"), where("startingDate", ">=", today), orderBy("startingDate"), orderBy("timestamp"));

        const querySnapshot = await getDocs(q);
        const parsedTravels = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            timestamp: new Date(doc.data().timestamp?.toDate()).toString(),
            lastupdate: new Date(doc.data().lastupdate?.toDate()).toString(),
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
        const qFaqs = query(collection(firestore, "faqs"), orderBy("timestamp", "desc"));
        const faqSnapshot = await getDocs(qFaqs);

        const qTravels = query(collection(firestore, "travels"), where("startingDate", ">=", today), orderBy("startingDate"), orderBy("timestamp"));
        const travelsSnapshot = await getDocs(qTravels);

        const parsedTravels = travelsSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            timestamp: new Date(doc.data().timestamp?.toDate()).toString(),
            lastupdate: new Date(doc.data().lastupdate?.toDate()).toString(),
        }));
        const parsedFaqs = faqSnapshot.docs.map((doc) => ({
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
        const docRef = doc(firestore, "travels", travelId);
        const travel = await getDoc(docRef);

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
}
