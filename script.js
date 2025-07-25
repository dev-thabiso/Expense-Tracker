const form = document.getElementById("expense-form");
  const descriptionInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");
  const typeSelect = document.getElementById("type");
  const expenseList = document.getElementById("expense-list");
  const balanceEl = document.getElementById("balance");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  function updateUI() {
    expenseList.innerHTML = "";
    let balance = 0;

    expenses.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.description}: $${item.amount.toFixed(2)}`;
      li.className = item.type === "income" ? "income" : "expense";

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.style.marginLeft = "10px";
      deleteBtn.onclick = () => {
        expenses.splice(index, 1);
        saveAndUpdate();
      };

      li.appendChild(deleteBtn);
      expenseList.appendChild(li);

      balance += item.type === "income" ? item.amount : -item.amount;
    });

    balanceEl.textContent = `Balance: $${balance.toFixed(2)}`;
  }

  function saveAndUpdate() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    updateUI();
  }

  form.onsubmit = function (e) {
    e.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;

    if (description && !isNaN(amount) && amount > 0) {
      expenses.push({ description, amount, type });
      saveAndUpdate();

      descriptionInput.value = "";
      amountInput.value = "";
      typeSelect.value = "expense";
    } else {
      alert("Please enter valid description and positive amount");
    }
  };

  // Initialize UI
  updateUI();