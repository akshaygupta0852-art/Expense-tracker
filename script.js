let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let getIncome = localStorage.getItem("income") || 50000;
let x = 1;
const today = new Date();
const table = document.querySelector("table");
const savings = document.querySelector("#savings");
const income = document.querySelector("#totalIncome");
const incomeBtn = document.querySelector("#updateIncome");
const totalExpense = document.querySelector("#totalExpense");
const incomeDialog = document.querySelector("#incomeDialog");
const saveIncomeBtn = document.querySelector("#saveIncomeBtn");
const addNewExpenseBtn = document.querySelector("#addExpense");
const expenseDialog = document.querySelector("#expenseDialog");
const saveNewExpense = document.querySelector("#cnfrmExpense");
const saveIncomeinput = document.querySelector("#updatedIncome");
const clsIncomeDialog = document.querySelector("#clsIncomeDilog");
const clsExpenseDialog = document.querySelector("#clsExpenseDialog");

function updateX() {
  if ((expenses.length = 0)) {
    x = 1;
    return x;
  } else {
    x = expenses.length + 1;
    return x;
  }
}

function setData() {
  income.innerText = "Rs. ";
  totalExpense.innerText = "Rs. ";
  savings.innerHTML = "Rs. ";
  if (getIncome) {
    income.innerText += Number(getIncome);
  }
  const totalExpenseSum = expenses.reduce(
    (acc, curr) => acc + Number(curr.monthlyCharge),
    0,
  );
  totalExpense.innerText = `Rs. ${totalExpenseSum}`;

  // Compute dynamic remainder balance

  const remainingSavings = getIncome - totalExpenseSum;
  savings.innerText = `Rs. ${remainingSavings}`;
}

function getLastDay(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function totalSpent(type, amount) {
  if (type == "per month") {
    return amount;
  } else if (type == "per week") {
    return amount * 4;
  } else if (type == "per day") {
    return amount * getLastDay(today.getFullYear(), today.getMonth());
  }
}

incomeBtn.addEventListener("click", () => {
  incomeDialog.showModal();
});
clsIncomeDialog.addEventListener("click", () => {
  incomeDialog.close();
});
addNewExpenseBtn.addEventListener("click", () => {
  expenseDialog.showModal();
});
clsExpenseDialog.addEventListener("click", () => {
  expenseDialog.close();
});
saveNewExpense.addEventListener("click", (e) => {
  e.preventDefault();
  const typeValue = document.querySelector("#typeSelect").value;
  const amountReason = document.querySelector("#expenseReasonInput").value;
  const amountValue = document.querySelector("#expenseAmount").value;

  const expenseData = {
    amount: amountValue,
    reason: amountReason,
    createdAt:
      today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear(),
    type: typeValue,
    monthlyCharge: totalSpent(typeValue, amountValue),
  };
  expenses.push(expenseData);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  expenseDialog.close();

  loadExpenses();
  document.querySelector("#expenseReasonInput").value = "";
  document.querySelector("#expenseAmount").value = "";
  location.reload();
});

saveIncomeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const incomeValue = saveIncomeinput.value;
  localStorage.setItem("income", incomeValue);
  incomeDialog.close();
  saveIncomeinput.value = "";
  setData();
  location.reload();
});

setData();

function loadExpenses() {
  table.innerHTML += expenses
    .map((ex) => {
      return `<tr>
        <td class='expenseName'>${ex.reason}</td>
        <td class='type'>Rs. ${ex.amount}<br>${ex.type}</td>
        <td class='total amountTotal'>Rs. ${ex.monthlyCharge}</td>
        </tr>`;
    })
    .join("");
}

const totalExpenseCalculation = document.querySelectorAll(".total");
console.log(totalExpenseCalculation);
loadExpenses();
