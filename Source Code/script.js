document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const resultText = document.getElementById('result-text');
    const lastUpdatedText = document.getElementById('last-updated');
    const fromSymbolSpan = document.getElementById('from-symbol');
    const toSymbolSpan = document.getElementById('to-symbol');
    const fromAmountSpan = document.getElementById('from-amount');
    const toAmountSpan = document.getElementById('to-amount');
    const swapButton = document.getElementById('swapCurrencies');
    const loadingIndicator = document.getElementById('loading');
    const converterApp = document.getElementById('converter-app');

    const API_URL = 'https://open.er-api.com/v6/latest/USD';
    let exchangeRates = {};

    const commonCurrencies = {
        'USD': 'United States Dollar',
        'EUR': 'Euro',
        'GBP': 'British Pound Sterling',
        'JPY': 'Japanese Yen',
        'AUD': 'Australian Dollar',
        'CAD': 'Canadian Dollar',
        'CHF': 'Swiss Franc',
        'CNY': 'Chinese Yuan',
        'SEK': 'Swedish Krona',
        'NZD': 'New Zealand Dollar',
        'MXN': 'Mexican Peso',
        'SGD': 'Singapore Dollar',
        'HKD': 'Hong Kong Dollar',
        'NOK': 'Norwegian Krone',
        'KRW': 'South Korean Won',
        'TRY': 'Turkish Lira',
        'RUB': 'Russian Ruble',
        'INR': 'Indian Rupee',
        'BRL': 'Brazilian Real',
        'ZAR': 'South African Rand'
    };

    const fetchRates = async () => {
        loadingIndicator.classList.remove('hidden');
        converterApp.classList.add('hidden');

        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.result === 'success') {
                exchangeRates = data.rates;
                populateCurrencySelects(Object.keys(exchangeRates));
                fromCurrencySelect.value = 'USD';
                toCurrencySelect.value = 'EUR';
                convertCurrency();
                const updateTime = new Date(data.time_last_update_unix * 1000).toLocaleString();
                lastUpdatedText.textContent = `Last updated: ${updateTime}`;
            } else {
                throw new Error('API request failed');
            }
        } catch (error) {
            console.error('Could not fetch currency rates:', error);
            resultText.textContent = 'Error fetching rates. Please try again later.';
            lastUpdatedText.textContent = '';
        } finally {
            loadingIndicator.classList.add('hidden');
            converterApp.classList.remove('hidden');
        }
    };

    const populateCurrencySelects = (rates) => {
        fromCurrencySelect.innerHTML = '';
        toCurrencySelect.innerHTML = '';
        const sortedCurrencies = Object.keys(commonCurrencies).sort();
        sortedCurrencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = `${currency} - ${commonCurrencies[currency]}`;
            const option2 = option.cloneNode(true);
            fromCurrencySelect.appendChild(option);
            toCurrencySelect.appendChild(option2);
        });
    };

    const convertCurrency = () => {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount) || amount <= 0) {
            resultText.textContent = 'Please enter a valid amount.';
            return;
        }

        if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
            resultText.textContent = 'Exchange rate data for selected currencies is not available.';
            return;
        }

        const amountInUSD = amount / exchangeRates[fromCurrency];
        const convertedAmount = amountInUSD * exchangeRates[toCurrency];
        fromSymbolSpan.textContent = fromCurrency;
        toSymbolSpan.textContent = toCurrency;
        fromAmountSpan.textContent = amount.toFixed(2);
        toAmountSpan.textContent = convertedAmount.toFixed(2);
    };

    const swapCurrencies = () => {
        const from = fromCurrencySelect.value;
        fromCurrencySelect.value = toCurrencySelect.value;
        toCurrencySelect.value = from;
        convertCurrency();
    };

    amountInput.addEventListener('input', convertCurrency);
    fromCurrencySelect.addEventListener('change', convertCurrency);
    toCurrencySelect.addEventListener('change', convertCurrency);
    swapButton.addEventListener('click', swapCurrencies);

    fetchRates();
});
