let totalAmount = document.querySelector("#total-amount");
let userAmount = document.querySelector("#user-amount");
const checkAmountButton = document.querySelector("#check-amount");
const totalAmountButton = document.querySelector("#total-amount-button");
const productTitle = document.querySelector("#product-title");
const errorMessage = document.querySelector("#budget-error");
const productTitleError = document.querySelector("#product-title-error");
const productCostError = document.querySelector("#product-cost-error");
const amount = document.querySelector("#amount");
const expenditureValue = document.querySelector("#expenditure-value");
const balanceValue = document.querySelector("#balance-amount");
const list = document.querySelector("#list");
let tempAmount = 0;



//Set Budget
totalAmountButton.addEventListener("click", () => {
    tempAmount = totalAmount.value;
    //console.log(tempAmount);
    if (tempAmount === "" || tempAmount < 0) {
        errorMessage.classList.remove("hide");
    } 
    else {
        errorMessage.classList.add("hide");
        //set budget
        amount.innerHTML = tempAmount;
        //set balance
        balanceValue.innerText = tempAmount - expenditureValue.innerText;    
        //clear input box
        totalAmount.value = "";
    }
});
//funtion to disable edit and delete button
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
      element.disabled = bool;
    });
  };

//function to modify list elements
const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if (edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }
    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount); 
    parentDiv.remove();
};

//function to create a list
const listCreator = (expenseName, expenseValue) => {
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.fontSize = "24px";
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true)
    });
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");

    deleteButton.style.fontSize = "24px";
    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton);
    })
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.querySelector("#list").appendChild(sublistContent);
};

//function to add expense
checkAmountButton.addEventListener("click", () => {
    //empty check
    if(!userAmount.value || !productTitle.value) {
        productTitleError.classList.remove("hide");
        return false;
    }
    //enable buttons
    disableButtons(false);
    //expense
    let expenditure = parseInt(userAmount.value);
    //total expense (existing + new)
    let sum = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum;
    //total balance(budget - total expense)
    const totalBalance = tempAmount - sum;
    balanceValue.innerText = totalBalance;
    //create list
    listCreator(productTitle.value, userAmount.value);
    //empty inputs
    productTitle.value = "";
    userAmount.value = "";
});