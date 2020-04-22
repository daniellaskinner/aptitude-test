
/**
 * takes an array of objects- reduces the number of objects in the array based on search criteria, date criteria,
 * and score functions. The final array of results is then put into an object so it can be passed to the handlebars
 * function and output to the front-end.
 *
 * @param HBTemplate the handlebars template
 * @param resultArray an array full of objects of testee's info and scores
 */
async function searchAndFilter(HBTemplate, resultArray) {
    resultArray = searchByTextAndEmail(resultArray);
    resultArray = percentageFilter(resultArray);
    resultArray = dateFilter(resultArray);
    resultArray = testAllocatedFilter(resultArray);
    resultArray = splitArray(resultArray, 20);
    let pages = Array.from(resultArray.keys()).map(page => ({pageNumber: page + 1}));
    buttons = await getTemplateAjax('js/templates/paginationButtons.hbs');
    let template = Handlebars.compile(buttons);
    document.querySelector('.tableFoot').innerHTML = template({pages});
    printFilteredResultsToScreen(HBTemplate, resultArray[0]);
}

