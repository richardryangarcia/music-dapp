export const groupBy = (colCount, array) => {
    let groupedElements = [];
    let rowElements=[];

    //loop through array
    for (let i = 0; i < array.length; i++){
      if (rowElements.length < 3) {
        rowElements.push(array[i]);
      } else {
        groupedElements.push(rowElements);
        rowElements = [];
        rowElements.push(array[i]);
      }
    }

    if (rowElements.length === 1) {
      rowElements.push(null);
      rowElements.push(null);
    } else if (rowElements.length === 2){
      rowElements.push(null);
    }

    groupedElements.push(rowElements);

  return groupedElements
}