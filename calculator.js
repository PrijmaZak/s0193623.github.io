document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    const quantityInput = document.getElementById('quantity');
    const productSelect = document.getElementById('product');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');
    const totalCostSpan = document.getElementById('totalCost');
    const quantityError = document.getElementById('quantityError');
    const priceInfo = document.getElementById('priceInfo');
    const numberRegex = /^\d+$/;
    productSelect.addEventListener('change', function() {
        const selectedOption = productSelect.options[productSelect.selectedIndex];
        const price = selectedOption.value;
        const productName = selectedOption.text.split(' - ')[0];
        priceInfo.textContent = `Цена: ${price} руб.`;
    });
    function validateInput() {
        const value = quantityInput.value.trim();
        if (value === '' || !numberRegex.test(value)) {
            quantityError.style.display = 'block';
            return false;
        }
        const quantity = parseInt(value, 10);
        if (quantity <= 0) {
            quantityError.style.display = 'block';
            return false;
        }
        quantityError.style.display = 'none';
        return true;
    }
    function calculateTotalCost() {
        if (!validateInput()) {
            resultDiv.style.display = 'none';
            return;
        }

        const quantity = parseInt(quantityInput.value.trim(), 10);
        const price = parseInt(productSelect.value, 10);
        const totalCost = quantity * price;

        // Отображение результата
        totalCostSpan.textContent = totalCost.toLocaleString('ru-RU');
        resultDiv.style.display = 'block';
    }
    quantityInput.addEventListener('input', function() {
        validateInput();
    });
    calculateBtn.addEventListener('click', calculateTotalCost);
    quantityInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            calculateTotalCost();
        }
    });
    const selectedOption = productSelect.options[productSelect.selectedIndex];
    const initialPrice = selectedOption.value;
    priceInfo.textContent = `Цена: ${initialPrice} руб.`;
});