# [Currency-Converter](https://kartick-basak.github.io/Currency-Converter/)
Currency Converter
This is a simple, modern, and responsive currency converter web application. It fetches the latest exchange rates from a public API to provide accurate, real-time conversions between a selection of common world currencies.


## Features
- ⏳ **Real-Time Rates:** Fetches up-to-date exchange rates from a free, public API (open.er-api.com).

- 🚥 **Responsive Design:** Optimized for a seamless experience on both desktop and mobile devices using Tailwind CSS.

- 🤖 **Intuitive Interface:** A clean and easy-to-use interface with a simple amount input and currency dropdowns.

- 🔄 **Swap Functionality:** A convenient button to quickly swap the "From" and "To" currencies.

- 🫧 **Lightweight:** Built with vanilla HTML, CSS, and JavaScript, with minimal dependencies.


## Built With:
- <img src="https://github.com/Kartick-Basak/Project1/blob/main/Logo/html.webp" alt="logo" width="25" height="25"> HTML
- <img src="https://github.com/Kartick-Basak/Project1/blob/main/Logo/css.svg" alt="logo" width="25" height="25"> CSS
- <img src="https://github.com/Kartick-Basak/Project1/blob/main/Logo/Java%20Script.png" width="25" height="25"> Javascript


## How It Works
The application's core logic is handled by the Javascript file:

- 🎬 **Initialization:** When the page loads, the script fetches the latest currency exchange rates from the API.

- 💰 **Currency Population:** It populates the "From" and "To" dropdown menus with a predefined list of common currencies.

- 💵 **Conversion Logic:**

    - All currency conversions are based on a Base USD rate provided by the API.

    - To convert from Currency A to Currency B, the script first calculates the value of Currency A in USD, then converts that USD amount to Currency B.

    - Event Handling: The application listens for changes in the amount input or currency selections, automatically updating the conversion result in real-time.

### Here is the webpage:
[Currency Converter](https://kartick-basak.github.io/Currency-Converter/)
![Alt Text](https://github.com/Kartick-Basak/Currency-Converter/blob/main/Currency%20SS.png)
