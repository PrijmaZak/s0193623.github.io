document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Элементы формы
    const quantityInput = document.getElementById('quantity');
    const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
    const optionsGroup = document.getElementById('optionsGroup');
    const optionsSelect = document.getElementById('options');
    const propertyGroup = document.getElementById('propertyGroup');
    const propertyCheckbox = document.getElementById('property');
    const resultDiv = document.getElementById('result');
    const totalCostSpan = document.getElementById('totalCost');
    const quantityError = document.getElementById('quantityError');

    // Базовая стоимость для каждого типа услуги
    const basePrices = {
        basic: 1000,
        premium: 2000,
        custom: 1500
    };

    // Функция для получения выбранного типа услуги
    function getSelectedServiceType() {
        for (const radio of serviceTypeRadios) {
            if (radio.checked) {
                return radio.value;
            }
        }
        return 'basic';
    }

    // Функция для обновления видимости дополнительных элементов
    function updateFormVisibility() {
        const serviceType = getSelectedServiceType();
        
        // Скрываем все дополнительные элементы
        optionsGroup.classList.add('hidden');
        propertyGroup.classList.add('hidden');
        
        // Показываем нужные элементы в зависимости от типа услуги
        switch (serviceType) {
            case 'premium':
                optionsGroup.classList.remove('hidden');
                break;
            case 'custom':
                propertyGroup.classList.remove('hidden');
                break;
            // Для 'basic' ничего не показываем
        }
    }

    // Функция валидации количества
    function validateQuantity() {
        const quantity = parseInt(quantityInput.value, 10);
        
        if (isNaN(quantity) || quantity < 1) {
            quantityError.style.display = 'block';
            return false;
        }
        
        quantityError.style.display = 'none';
        return true;
    }

    // Функция расчета общей стоимости
    function calculateTotalCost() {
        if (!validateQuantity()) {
            resultDiv.style.display = 'none';
            return;
        }

        const quantity = parseInt(quantityInput.value, 10);
        const serviceType = getSelectedServiceType();
        let totalCost = basePrices[serviceType] * quantity;

        // Добавляем стоимость опции для premium услуги
        if (serviceType === 'premium') {
            const optionCost = parseInt(optionsSelect.value, 10);
            totalCost += optionCost * quantity;
        }

        // Добавляем стоимость свойства для custom услуги
        if (serviceType === 'custom' && propertyCheckbox.checked) {
            const propertyCost = parseInt(propertyCheckbox.value, 10);
            totalCost += propertyCost * quantity;
        }

        // Отображение результата
        totalCostSpan.textContent = totalCost.toLocaleString('ru-RU');
        resultDiv.style.display = 'block';
    }

    // Обработчики событий
    quantityInput.addEventListener('input', calculateTotalCost);
    
    serviceTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateFormVisibility();
            calculateTotalCost();
        });
    });
    
    optionsSelect.addEventListener('change', calculateTotalCost);
    propertyCheckbox.addEventListener('change', calculateTotalCost);

    // Инициализация
    updateFormVisibility();
    calculateTotalCost();
});