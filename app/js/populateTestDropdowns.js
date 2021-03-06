/**
 * populates the test dropdowns for the add user,
 * and test filter for table,
 * changes user duration based on test selected
 */
function populateTestDropdowns () {
    getData('test').then((testsObject) => {
        let testFieldValue;

        if (!testFieldValue) {
            testFieldValue = "1";
        }

        getTemplateAjax('js/templates/testDropdown.hbs').then((HBTemplate) => {
            let template = Handlebars.compile(HBTemplate);
            document.querySelector('#test_id').innerHTML = template(testsObject);
            document.querySelector('#linkToEditTestsBtn').setAttribute('href', `editTests.html#${testsObject.data[0].id}`);

            document.querySelectorAll(".test_options").forEach((test_option) => {
                populateUserDuration(test_option, testFieldValue);
            });
        });

        getTemplateAjax('js/templates/testAllocatedFilter.hbs').then((HBTemplate) => {
            let template = Handlebars.compile(HBTemplate);
            document.querySelector('#testAllocated').innerHTML = template(testsObject);
        });

        document.querySelector('#test_id').addEventListener('change', () => {
            testFieldValue = document.querySelector('#test_id').value;

            document.querySelectorAll(".test_options").forEach((test_option) => {
                populateUserDuration(test_option, testFieldValue);
            });
        });
    });
}