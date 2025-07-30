const baseSelect = document.getElementById("base");
const ratesTable = document.querySelector("#rates-table tbody");
const searchInput = document.getElementById("search");

const currencies = ["USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD", "CHF", "CNY", "SGD"];

currencies.forEach(curr => {
  const option = document.createElement("option");
  option.value = curr;
  option.textContent = curr;
  baseSelect.appendChild(option);
});

baseSelect.value = "USD";

function loadRates(base = "USD") {
  fetch(`/rates?base=${base}`)
    .then(res => res.json())
    .then(data => {
      displayRates(data.rates);
    });
}

function displayRates(rates) {
  ratesTable.innerHTML = "";
  Object.entries(rates).forEach(([currency, rate]) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${currency}</td><td>${rate.toFixed(4)}</td>`;
    ratesTable.appendChild(row);
  });
}

baseSelect.addEventListener("change", () => {
  loadRates(baseSelect.value);
});

searchInput.addEventListener("input", () => {
  const filter = searchInput.value.toUpperCase();
  for (let row of ratesTable.rows) {
    const currency = row.cells[0].textContent.toUpperCase();
    row.style.display = currency.includes(filter) ? "" : "none";
  }
});

loadRates("USD");
