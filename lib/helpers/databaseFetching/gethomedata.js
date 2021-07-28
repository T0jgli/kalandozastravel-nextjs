import db from "../../firebase";
import logger from "../Logger";

export default async () => {
    try {
        const today = new Date().toISOString().split("T")[0];

        const faqs = await db.collection("faqs").orderBy("timestamp", "desc").get();
        const travels = await db.collection("travels").where("startingDate", ">=", today).orderBy("startingDate").orderBy("timestamp").get();

        const parsedTravels = travels.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            timestamp: new Date(doc.data().timestamp?.toDate()).toString(),
            lastupdate: new Date(doc.data().lastupdate?.toDate()).toString(),
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
};
