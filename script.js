document.addEventListener('DOMContentLoaded', () => {

    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const swapButton = document.getElementById('swap-button');
    const resultDiv = document.getElementById('result');
    const rateDiv = document.getElementById('rate');
    const loadingDiv = document.getElementById('loading');

    //  API and Mock Data 
   
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    const mockApiResponse = {
        "result": "success",
        "base_code": "USD",
        "conversion_rates": {
            "USD": 1, "EUR": 0.93, "JPY": 131.5, "GBP": 0.82, "AUD": 1.47,
            "CAD": 1.35, "CHF": 0.92, "CNY": 6.89, "INR": 82.5, "BRL": 5.28,
            "RUB": 70, "AED": 3.67, "AFN": 87.9, "ALL": 103.5, "AMD": 401.5,
            "ANG": 1.79, "AOA": 825.2, "ARS": 177.3, "AWG": 1.79, "AZN": 1.7,
            "BAM": 1.83, "BBD": 2, "BDT": 103.5, "BGN": 1.83, "BHD": 0.376,
            "BIF": 2080, "BMD": 1, "BND": 1.34, "BOB": 6.88, "BSD": 1,
            "BTN": 82.5, "BWP": 12.8, "BYN": 2.52, "BZD": 2, "CDF": 2040,
            "CLP": 825, "COP": 4800, "CRC": 570, "CUP": 24, "CVE": 103,
            "CZK": 22.5, "DJF": 177.7, "DKK": 6.96, "DOP": 56.5, "DZD": 136.5,
            "EGP": 24.7, "ERN": 15, "ETB": 53.5, "FJD": 2.2, "FKP": 0.82,
            "FOK": 6.96, "GEL": 2.68, "GGP": 0.82, "GHS": 10.1, "GIP": 0.82,
            "GMD": 60, "GNF": 8600, "GTQ": 7.8, "GYD": 209, "HKD": 7.8,
            "HNL": 24.6, "HRK": 7.0, "HTG": 145, "HUF": 370, "IDR": 15600,
            "ILS": 3.5, "IMP": 0.82, "IQD": 1450, "IRR": 42000, "ISK": 142,
            "JEP": 0.82, "JMD": 152, "JOD": 0.709, "KES": 123, "KGS": 87,
            "KHR": 4100, "KID": 1.47, "KMF": 458, "KRW": 1260, "KWD": 0.306,
            "KYD": 0.83, "KZT": 460, "LAK": 17000, "LBP": 1507, "LKR": 365,
            "LRD": 154, "LSL": 17, "LYD": 4.8, "MAD": 10.3, "MDL": 19.2,
            "MGA": 4400, "MKD": 57, "MMK": 2100, "MNT": 3400, "MOP": 8,
            "MRU": 36, "MUR": 44, "MVR": 15.4, "MWK": 1020, "MXN": 19.4,
            "MYR": 4.4, "MZN": 63.8, "NAD": 17, "NGN": 445, "NIO": 36.2,
            "NOK": 9.8, "NPR": 132, "NZD": 1.58, "OMR": 0.384, "PAB": 1,
            "PEN": 3.8, "PGK": 3.5, "PHP": 55.5, "PKR": 226, "PLN": 4.38,
            "PYG": 7300, "QAR": 3.64, "RON": 4.58, "RSD": 109, "RWF": 1080,
            "SAR": 3.75, "SBD": 8.2, "SCR": 13.5, "SDG": 570, "SEK": 10.4,
            "SGD": 1.34, "SHP": 0.82, "SLE": 19.5, "SLL": 19500, "SOS": 570,
            "SRD": 32, "SSP": 980, "STN": 23, "SYP": 2512, "SZL": 17,
            "THB": 34.5, "TJS": 10.2, "TMT": 3.5, "TND": 3.1, "TOP": 2.3,
            "TRY": 18.7, "TTD": 6.7, "TVD": 1.47, "TWD": 30.7, "TZS": 2330,
            "UAH": 36.5, "UGX": 3700, "UYU": 39.5, "UZS": 11200, "VES": 17,
            "VND": 23500, "VUV": 118, "WST": 2.7, "XAF": 610, "XCD": 2.7,
            "XDR": 0.74, "XOF": 610, "XPF": 111, "YER": 250, "ZAR": 17,
            "ZMW": 18, "ZWL": 800
        }
    };


    //  Functions 

   
    async function setupConverter() {
        try {

            
            const data = await Promise.resolve(mockApiResponse);
            
            if (data.result === 'success') {
                const currencies = Object.keys(data.conversion_rates);
                populateCurrencyDropdowns(currencies);
                setInitialValues();
                setupEventListeners();
                convertCurrency();
            } else {
                showError('Could not fetch currency data.');
            }
        } catch (error) {
            showError('An error occurred. Please try again later.');
            console.error('Error fetching currency data:', error);
        } finally {
            loadingDiv.style.display = 'none';
            resultDiv.style.display = 'block';
            rateDiv.style.display = 'block';
        }
    }

    
    //  Populates the 'from' and 'to' currency dropdowns.
    /**
     * @param {string[]} currencies - it is an array of currency codes.
     */
    


    function populateCurrencyDropdowns(currencies) {
        const fragment = document.createDocumentFragment();
        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            fragment.appendChild(option);
        });
        fromCurrencySelect.appendChild(fragment.cloneNode(true));
        toCurrencySelect.appendChild(fragment);
    }

 
    // Sets the initial currency values (e.g., USD to EUR).
    
    function setInitialValues() {
        fromCurrencySelect.value = 'USD';
        toCurrencySelect.value = 'INR';
        updateFlag(fromCurrencySelect);
        updateFlag(toCurrencySelect);
    }

   
    // Sets up event listeners for user interactions.
    
    function setupEventListeners() {
        amountInput.addEventListener('input', convertCurrency);
        fromCurrencySelect.addEventListener('change', () => {
            updateFlag(fromCurrencySelect);
            convertCurrency();
        });
        toCurrencySelect.addEventListener('change', () => {
            updateFlag(toCurrencySelect);
            convertCurrency();
        });
        swapButton.addEventListener('click', swapCurrencies);
    }

    
    //  Performs the currency conversion and updates the UI.
     
    function convertCurrency() {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount) || amount <= 0) {
            resultDiv.textContent = '';
            rateDiv.textContent = '';
            return;
        }

        const rates = mockApiResponse.conversion_rates;
        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];

        if (fromRate && toRate) {
            const convertedAmount = (amount / fromRate) * toRate;
            const singleUnitRate = (1 / fromRate) * toRate;
            
            resultDiv.textContent = `${amount.toLocaleString()} ${fromCurrency} = ${convertedAmount.toLocaleString(undefined, {maximumFractionDigits: 2})} ${toCurrency}`;
            rateDiv.textContent = `1 ${fromCurrency} = ${singleUnitRate.toFixed(4)} ${toCurrency}`;
            rateDiv.classList.remove('error-message');
        } else {
            showError('Could not find rates for selected currencies.');
        }
    }
    
    /**
        Swaps the 'from' and 'to' currencies and reconverts.
     */

    function swapCurrencies() {
        [fromCurrencySelect.value, toCurrencySelect.value] = [toCurrencySelect.value, fromCurrencySelect.value];
        updateFlag(fromCurrencySelect);
        updateFlag(toCurrencySelect);
        convertCurrency();
    }

    /**
     * Updates the flag icon for the selected currency.
     * @param {HTMLSelectElement} selectElement - The dropdown element.
     */

    function updateFlag(selectElement) {
        const currencyCode = selectElement.value;
        let countryCode = currencyCode.substring(0, 2);
        
        const exceptions = {
            'EUR': 'EU', 'JPY': 'JP', 'GBP': 'GB', 'USD': 'US',
            'AUD': 'AU', 'CAD': 'CA', 'CHF': 'CH', 'CNY': 'CN',
            'INR': 'IN', 'RUB': 'RU',
        };

        if (exceptions[currencyCode]) {
            countryCode = exceptions[currencyCode];
        }
        
        const flagUrl = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`;
        selectElement.style.backgroundImage = `url(${flagUrl})`;

        // Fallback for flags that don't load
        const img = new Image();
        img.src = flagUrl;
        img.onerror = () => {
            selectElement.style.backgroundImage = 'none';
        };
    }

    /**
     * Displays an error message in the UI.
     * @param {string} message - The error message to display.
     */
    function showError(message) {
        resultDiv.textContent = '';
        rateDiv.textContent = message;
        rateDiv.classList.add('error-message');
    }

    // Initialization
    setupConverter();
});
