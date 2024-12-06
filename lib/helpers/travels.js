const groupByYearAndMonth = (data) => {
    const groupedData = {};
    data.forEach((item) => {
        const date = new Date(item?.startingDate);
        const year = date.getFullYear();
        const month = date.getMonth();

        if (!groupedData[year]) {
            groupedData[year] = {};
        }
        if (!groupedData[year][month]) {
            groupedData[year][month] = [];
        }

        groupedData?.[year]?.[month]?.push(item);
    });

    return groupedData;
};

export const sortAndGroupData = (data) => {
    const sortedData = data.sort((a, b) => new Date(a?.startingDate) - new Date(b?.startingDate));
    return groupByYearAndMonth(sortedData);
};

export const getErrorMessage = (array, field) => {
    if (array.length === 0) return;

    const index = array?.findIndex((er) => er.path === field);

    if (index === -1) return;

    return <span>{array[index]?.msg}</span>;
};

export const isWrongField = (array, field) => array?.findIndex((er) => er.path === field) !== -1;
