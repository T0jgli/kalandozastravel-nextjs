export default function customToLocaleDateString(date) {
    const months = ["jan", "febr", "márc", "ápr", "máj", "jún", "júl", "aug", "szept", "okt", "nov", "dec"];

    const day = date.getDate();
    const month = months?.[date.getMonth()];
    const year = date.getFullYear();

    return `${month}. ${day}.`;
}
