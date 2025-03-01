let history = [];

function logOut() {
    alert("Logged out!");
    window.location.href = "/login";
}

function appendToDisplay(value) {
    document.getElementById("display").value += value;
}

function clearDisplay() {
    document.getElementById("display").value = '';
}

function calculateResult() {
    try {
        let expression = document.getElementById("display").value;

        if (expression.includes('!')) {
            expression = handleFactorial(expression);
        }

        expression = handleDegrees(expression);
        expression = handlePercentage(expression);

        let result = calculateExpression(expression);
        document.getElementById("display").value = result;
        history.push(expression + ' = ' + result);
        updateHistoryList();
    } catch (e) {
        document.getElementById("display").value = 'Error';
    }
}

function handleFactorial(expression) {
    const regex = /(\d+)!/g;
    return expression.replace(regex, (match, p1) => {
        return factorial(parseInt(p1));
    });
}

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

function backspace() {
    let display = document.getElementById("display").value;
    document.getElementById("display").value = display.slice(0, -1);
}

function toggleHistory() {
    let historyPopup = document.getElementById("historyPopup");
    historyPopup.style.display = (historyPopup.style.display === "block") ? "none" : "block";
}

function clearHistory() {
    history = [];
    updateHistoryList();
}

function updateHistoryList() {
    let historyList = document.getElementById("historyList");
    historyList.innerHTML = '';
    history.forEach(entry => {
        let li = document.createElement('li');
        li.textContent = entry;
        historyList.appendChild(li);
    });
}

function handleAdvanced() {
    let advancedPanel = document.getElementById("advancedPanel");
    advancedPanel.style.display = (advancedPanel.style.display === "block") ? "none" : "block";
}

function handleDegrees(expression) {
    expression = expression.replace(/(sin|cos|tan|sqrt)\s*(\d+)/g, '$1($2)');
    const regex = /deg\(([^)]+)\)/g;
    expression = expression.replace(regex, (match, p1) => {
        let radians = parseFloat(p1) * (Math.PI / 180);
        return radians;
    });

    expression = expression.replace(/sin\(([^)]+)\)/g, 'Math.sin($1)');
    expression = expression.replace(/cos\(([^)]+)\)/g, 'Math.cos($1)');
    expression = expression.replace(/tan\(([^)]+)\)/g, 'Math.tan($1)');
    expression = expression.replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)');
    expression = expression.replace(/pi/g, 'Math.PI');
    expression = expression.replace(/e/g, 'Math.E');
    expression = expression.replace(/\^/g, '**');

    return expression;
}

function handlePercentage(expression) {
    return expression.replace(/(\d+)%/g, (match, p1) => {
        return (parseFloat(p1) / 100);
    });
}

function calculateExpression(expression) {
    let allowedCharacters = /^[0-9+\-*/().^Math\s]+$/;
    
    if (!allowedCharacters.test(expression)) {
        throw new Error("Invalid characters in the expression");
    }

    try {
        expression = expression.replace(/\^/g, '**');
        let result = Function('"use strict"; return (' + expression + ')')();
        return result;
    } catch (error) {
        throw new Error("Error in calculation: " + error.message);
    }
}
