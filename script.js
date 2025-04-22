const amountInput = document.getElementById('amount'); // Input field for amount to convert
const fromCurrency = document.getElementById('from'); // Dropdown for selecting the currency to convert from
const toCurrency = document.getElementById('to');   // Dropdown for selecting the currency to convert to
const convertBtn = document.getElementById('convert');  // Button to trigger conversion
const resultDiv = document.getElementById('result'); // Div to display the result

// List of currencies to display
const currencyList = ["USD", "EUR", "GBP", "PKR", "INR", "CAD", "AUD", "JPY"];

// Populate dropdowns
currencyList.forEach(currency => { // Create option elements for each currency
  const option1 = document.createElement('option'); // Create option elements for each currency
  const option2 = document.createElement('option'); // Create option elements for each currency
  option1.value = option2.value = currency; // Set the value of the option
  option1.textContent = option2.textContent = currency; // Set the text content of the option
  fromCurrency.appendChild(option1); // Append option to fromCurrency dropdown
  toCurrency.appendChild(option2); // Append option to toCurrency dropdown
});

// Default selections
fromCurrency.value = "USD"; // Set default value for fromCurrency dropdown
toCurrency.value = "PKR"; // Set default value for toCurrency dropdown

convertBtn.addEventListener('click', () => { // Add event listener for the convert button
  const amount = parseFloat(amountInput.value); // Get the amount entered by the user
  const from = fromCurrency.value; // Get the selected currency to convert from
  const to = toCurrency.value; // Get the selected currency to convert to

  if (isNaN(amount) || amount <= 0) { // Validate the amount entered
    resultDiv.textContent = "Please enter a valid amount 💸";
    return;
  }

  const url = `https://api.exchangerate-api.com/v4/latest/${from}`; // API URL to fetch exchange rates

  fetch(url) // Fetch exchange rates from the API
    .then(response => response.json()) // Parse the response as JSON 
    .then(data => { // Process the data received from the API
      const rate = data.rates[to]; // Get the exchange rate for the selected currency 
      const converted = (amount * rate).toFixed(2); // Convert the amount using the exchange rate
      resultDiv.textContent = `${amount} ${from} = ${converted} ${to}`; // Display the result
    })
    .catch(error => {
      resultDiv.textContent = "Something went wrong. Please try again later.";
      console.error("Error fetching exchange rates:", error);
    });
});
