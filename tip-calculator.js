document.addEventListener('DOMContentLoaded', () => {
    const billInput = document.querySelector('.money-input1');
    const peopleInput = document.querySelector('.money-input2');
    const tipAmountInput = document.querySelector('.money-input3');
    const totalAmountInput = document.querySelector('.money-input4');
    const resetButton = document.querySelector('.RESET');
    let selectedTip = 0;

    // Handle tip button clicks
    document.querySelectorAll('.button1 button, .button2 button').forEach(button => {
        button.addEventListener('click', () => {
            selectedTip = parseFloat(button.getAttribute('data-tip')) || 0;
            document.querySelectorAll('.button1 button, .button2 button').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            if (button.classList.contains('customise')) {
                const customTip = prompt('Enter custom tip percentage:');
                selectedTip = parseFloat(customTip) || 0;
                button.textContent = `${selectedTip}%`;
                button.setAttribute('data-tip', selectedTip);
            }
            calculate();
        });
    });

    // Calculate tip and total amounts
    function calculate() {
        const bill = parseFloat(billInput.value) || 0;
        const people = parseFloat(peopleInput.value) || 0;

        if (people <= 0) {
            alert("Can't be zero");
            tipAmountInput.value = '';
            totalAmountInput.value = '';
            return;
        }

        const tipAmount = (bill * (selectedTip / 100)) / people;
        const totalAmount = (bill + bill * (selectedTip / 100)) / people;

        tipAmountInput.value = tipAmount.toFixed(2);
        totalAmountInput.value = totalAmount.toFixed(2);
    }

    // Listen to input changes
    billInput.addEventListener('input', calculate);
    peopleInput.addEventListener('input', calculate);

    // Reset button functionality
    resetButton.addEventListener('click', () => {
        billInput.value = '';
        peopleInput.value = '';
        tipAmountInput.value = '';
        totalAmountInput.value = '';
        selectedTip = 0;
        document.querySelectorAll('.button1 button, .button2 button').forEach(button => button.classList.remove('selected'));
    });
});
