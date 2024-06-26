const groupByYearAndMonth = (data) => {
    const groupedData = {};
  console.log(data)
    data.forEach(item => {
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
