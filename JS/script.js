// Global Variables
const items = ["Chair", "Recliner", "Table", "Umbrella"];
const prices = [25.50, 37.75, 49.95, 24.89];
const shippingCosts = { 1: 0, 2: 20, 3: 30, 4: 35, 5: 45, 6: 50 };
const taxRate = 0.15;

let cart = [];
let quantities = [];

// Initialize UI
document.getElementById("purchaseButton").addEventListener("click", makePurchase);
document.getElementById("shopAgainButton").addEventListener("click", resetApp);

function makePurchase() {
  while (true) {
    let item = prompt("What item would you like to buy today? Chair, Recliner, Table, or Umbrella?").toLowerCase();
    item = items.find((i) => i.toLowerCase() === item);

    if (!item) {
      alert("Invalid item. Please try again.");
      continue;
    }

    let quantity = parseInt(prompt(`How many ${item}s would you like to buy?`));
    if (isNaN(quantity) || quantity <= 0) {
      alert("Invalid quantity. Please try again.");
      continue;
    }

    cart.push(item);
    quantities.push(quantity);

    let continueShopping = prompt("Continue shopping? (y/n)").toLowerCase();
    if (continueShopping === "n") break;
  }

  let state = prompt("Please enter the two-letter state abbreviation for shipping:");
  if (!/^[A-Z]{2}$/i.test(state)) {
    alert("Invalid state abbreviation. Please try again.");
    return;
  }

  calculateInvoice(state.toUpperCase());
}

function calculateInvoice(state) {
  const shippingZone = Math.floor(Math.random() * 6) + 1; // Simulated zone lookup
  const shippingCost = shippingCosts[shippingZone];
  let itemTotal = 0;

  cart.forEach((item, index) => {
    const price = prices[items.indexOf(item)];
    itemTotal += price * quantities[index];
  });

  const subtotal = itemTotal + (itemTotal > 100 ? 0 : shippingCost);
  const tax = subtotal * taxRate;
  const invoiceTotal = subtotal + tax;

  displayInvoice(itemTotal, shippingCost, subtotal, tax, invoiceTotal, state);
}

function displayInvoice(itemTotal, shippingCost, subtotal, tax, invoiceTotal, state) {
  const tbody = document.querySelector("#invoiceTable tbody");
  tbody.innerHTML = "";

  cart.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item}</td>
      <td>${quantities[index]}</td>
      <td>${prices[items.indexOf(item)].toFixed(2)}</td>
      <td>${(prices[items.indexOf(item)] * quantities[index]).toFixed(2)}</td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("itemTotal").innerText = `$${itemTotal.toFixed(2)}`;
  document.getElementById("shippingCost").innerText = `$${shippingCost.toFixed(2)}`;
  document.getElementById("subtotal").innerText = `$${subtotal.toFixed(2)}`;
  document.getElementById("tax").innerText = `$${tax.toFixed(2)}`;
  document.getElementById("invoiceTotal").innerText = `$${invoiceTotal.toFixed(2)}`;

  document.getElementById("invoice").style.display = "block";
}

function resetApp() {
  cart = [];
  quantities = [];
  document.getElementById("invoice").style.display = "none";
}
