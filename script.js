
const status = document.querySelector("#AddRemove");
const submitBTN = document.querySelector("#submitBTN");
const addDescription = document.querySelector(".addDescription");
const addValue = document.querySelector(".addValue");
// income items div and expenses items div
const incomeItems = document.querySelector(".incomeItems");
const expensiveItems = document.querySelector(".expensiveItems");
// delete button
const deleteBTN = document.querySelectorAll(".far")
// bubble down to the delete button from incomeExpensive
const incomeExpensive = document.querySelector(".incomeExpensive")
// variable to keep track of the income and the expenses
const incomeNumber = document.querySelector("#incomeNumber");
const expensiveNumbers = document.querySelector("#expensiveNumbers");
// current date variable
let currentDate = document.querySelector("#currentDate");
// budget left
const budgetDisplay = document.querySelector("#budget");
const budgetLeft = document.querySelector("#budgetLeft");
let totalIncome = 0;
let totalExpenses = 0;
// prompting to get the budget

let budget = NaN;
// keep prompting the user if their input is not a number
do {
    budget = parseInt((prompt("Please Input a NUMBER--What is your budget for this month?")));
} while (isNaN(budget))

let totalBudgetLeft = 0;
budgetDisplay.textContent = budget;
budgetLeft.textContent = 0;

let date = new Date();

// add the current date
currentDate.innerHTML = `

${date.getMonth() > 9 ? "" : "0"}${date.getMonth()}/
${date.getDate() > 9 ? "" : "0"}${date.getDate()}/
${date.getFullYear()}
`
submitBTN.addEventListener("click", function () {

    // check if the user wants to add income
    if (status.value === "positive" && addDescription.value !== "" && addValue.value !== "") {

        incomeItems.innerHTML +=
            `
            <li id="item">${addDescription.value} <span id="costItem"> ${addValue.value}</span><i class="far fa-trash-alt"></i></li> 
        `
        // update the total income
        totalIncome += parseInt(addValue.value);
        incomeNumber.textContent = totalIncome;
        // budget left by adding the total income
        totalBudgetLeft = totalBudgetLeft + parseInt(addValue.value);
        budgetLeft.textContent = totalBudgetLeft;

        // check if the user wants to add expenses
    } else if (status.value === "negative" && addDescription.value !== "" && addValue.value !== "") {
        expensiveItems.innerHTML +=
            `
          <li id="item">${addDescription.value} <span id="costItem"> ${addValue.value}</span><i class="far fa-trash-alt"></i></li> 
        `
        // update the total expenses
        totalExpenses += parseInt(addValue.value);
        expensiveNumbers.textContent = totalExpenses;
        // subtract the value from the total budget left
        totalBudgetLeft = totalBudgetLeft - parseInt(addValue.value);
        budgetLeft.textContent = totalBudgetLeft;

    }
    // change the color of the total income on condition
    if (totalBudgetLeft > 0) {
        budgetLeft.classList.remove("negative");
        budgetLeft.classList.remove("neutral");
        budgetLeft.classList.add("positive")

    }
    else if (totalBudgetLeft < 0) {
        budgetLeft.classList.remove("positive");
        budgetLeft.classList.remove("neutral");
        budgetLeft.classList.add("negative");
    } else {
        budgetLeft.classList.remove("positve");
        budgetLeft.classList.remove("negative");
        budgetLeft.classList.add("neutral");
    }
    // alert if the budget is going to be surpass
    if ((totalBudgetLeft + budget) < 0) {
        alert(`You will surpass your budget with this purchase by: ${totalBudgetLeft + budget}`);
    }
});

// delete element by going down the DOM tree
incomeExpensive.addEventListener("click", function (e) {
    // check if the delete delete button is being clicked
    if (e.target.classList.contains("far")) {
        // update the income only if the parent of the delete button is equal to the class name
        if (e.target.parentElement.parentElement.classList.contains("incomeItems")) {
            // get the value of the item and update it to the total income
            totalIncome = totalIncome - e.target.previousElementSibling.innerText;
            incomeNumber.textContent = totalIncome;
            // update the total budget left when it is deleted:Here I subtract the income
            totalBudgetLeft = totalBudgetLeft - parseInt(e.target.previousElementSibling.innerText);
            budgetLeft.textContent = totalBudgetLeft;
        } else {
            // get the value of the item and update it to the total expenses
            totalExpenses = totalExpenses - e.target.previousElementSibling.innerText;
            expensiveNumbers.textContent = totalExpenses;
            // update the total budget left when it is deleted:Here I add to the Expenses when it is deleted
            totalBudgetLeft = totalBudgetLeft + parseInt(e.target.previousElementSibling.innerText);
            budgetLeft.textContent = totalBudgetLeft;
        }
        // delete the parent of the trash
        e.target.parentElement.remove();
    }
});