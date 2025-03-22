document.addEventListener('DOMContentLoaded', function () {
  const result = document.getElementById('result');
  const buttons = document.querySelectorAll('.btn');
  let currentInput = '';
  let operator = '';
  let previousInput = '';
  let shouldResetInput = false;

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const value = this.textContent.trim();

      if (value === 'C') {
        currentInput = '';
        operator = '';
        previousInput = '';
        result.textContent = '0';
      } else if (value === 'X') {
        currentInput = currentInput.slice(0, -1);
        result.textContent = currentInput || '0';
      } else if (value === '=') {
        if (currentInput && previousInput && operator) {
          currentInput = eval(`${previousInput}${operator}${currentInput}`);
          if (operator === '*' || operator === '/') {
            currentInput = parseFloat(currentInput).toFixed(2);
          }
          result.textContent = currentInput;
          previousInput = '';
          operator = '';
          shouldResetInput = true;
        }
      } else if (['+', '-', '*', '/', '%'].includes(value)) {
        if (currentInput) {
          if (previousInput && operator) {
            currentInput = eval(`${previousInput}${operator}${currentInput}`);
            if (operator === '*' || operator === '/') {
              currentInput = parseFloat(currentInput).toFixed(2);
            }
            result.textContent = currentInput;
          }
          previousInput = currentInput;
          currentInput = '';
          operator = value;
          result.textContent = previousInput + ' ' + operator;
        }
      } else {
        if (shouldResetInput) {
          currentInput = '';
          shouldResetInput = false;
        }
        currentInput += value;
        result.textContent = previousInput + ' ' + operator + ' ' + currentInput;
      }
    });
  });
});
