import db from "../../lib/firebase";
import logger from "../../lib/helpers/Logger";

export default async (req, res) => {
    if (req.method === "GET") {
        try {
            const today = new Date().toISOString().split("T")[0];

            const faqs = await db.collection("faqs").orderBy("timestamp", "desc").get();
            const travels = await db.collection("travels").where("startingDate", ">=", today).orderBy("startingDate").orderBy("timestamp").get();

            const parsedTravels = travels.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            const parsedFaqs = faqs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

            res.status(200).json({ faqs: parsedFaqs, travels: parsedTravels });
        } catch (error) {
            logger("error", error);
            res.status(500).json({
                error: "Internal server error",
            });
        }
    } else res.send("Rossz helyen jarsz");
    res.end();
};
