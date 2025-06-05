let lastResult = 0;
const invoiceDiv = document.querySelector(".invoice");
const endDiv = document.querySelector(".end");



function updateInvoiceText(buttonValue) {
    const currentText = invoiceDiv.textContent;
    const lastChar = currentText[currentText.length - 1];

    if (buttonValue === "=" && lastChar === "=") {
        invoiceDiv.textContent = "";
        endDiv.textContent = "0";
    } else {
        if (lastChar === "=") {
            invoiceDiv.textContent = buttonValue;
        } else {
            if (buttonValue === "=") {
                try {
                    let expression = currentText.replaceAll(/×/g, '*').replaceAll(/÷/g, '/').replaceAll("²", "^2").replaceAll(/√/g, 'sqrt(').replaceAll("Ans", lastResult).replaceAll("π", math.pi);

                    let openBrackets = (expression.match(/\(/g) || []).length;
                    let closeBrackets = (expression.match(/\)/g) || []).length;

                    while (openBrackets > closeBrackets) {
                        expression += ')';
                        closeBrackets++;
                    }

                    const result = math.evaluate(expression);
                    let finalResult = math.format(result, { precision: 64 });

                    finalResult = finalResult.replace(/[\[\]]/g, '');

                    if (finalResult === "Infinity" || finalResult === "undefined") {
                        finalResult = "Fehler!";
                    }

                    endDiv.textContent = finalResult;
                    lastResult = finalResult;
                    invoiceDiv.textContent = currentText + buttonValue;
                } catch (error) {
                    endDiv.textContent = "Fehler!";
                }
            } else {
                invoiceDiv.textContent = currentText + buttonValue;
            }
        }
    }
}


function disableButtons() {
    const buttons = [
        document.getElementById('buttonAns'),
        document.getElementById('button0'),
        document.getElementById('button,'),
        document.getElementById('button+'),
        document.getElementById('button3'),
        document.getElementById('button2'),
        document.getElementById('button1'),
        document.getElementById('button-'),
        document.getElementById('button4'),
        document.getElementById('button5'),
        document.getElementById('button6'),
        document.getElementById('button*'),
        document.getElementById('button7'),
        document.getElementById('button8'),
        document.getElementById('button9'),
        document.getElementById('button/'),
        document.getElementById('button²'),
        document.getElementById('button)'),
        document.getElementById('button('),
        document.getElementById('buttonWurzel'),
        document.getElementById('buttonPi'),
        document.getElementById('button=')
    ];
    const content = invoiceDiv.innerHTML;

    if (content.length > 30) {
        buttons.forEach(button => {
            button.disabled = true;
        });
        endDiv.textContent = "Die Rechnung ist zu lang!";
        endDiv.style.textAlign = "center";
    } else {
        buttons.forEach(button => {
            button.disabled = false;
        });
    }
}

setInterval(disableButtons, 200);


function AC() {
    invoiceDiv.textContent = "";
    endDiv.textContent = "0";
}


function DEL() {
    let currentText = invoiceDiv.textContent;
    const lastChar = currentText.slice(-1);

    if (lastChar === ' ' && currentText.length > 1) {
        currentText = currentText.slice(0, -2);
    } else if (['+', '-', '×', '÷', '0'].includes(lastChar)) {
        currentText = currentText.slice(0, -1);
    } else {
        currentText = currentText.slice(0, -1);
    }

    invoiceDiv.textContent = currentText;

    if (currentText === "") {
        endDiv.textContent = "0";
    }
}


function toggleMenu() {
    const menu = document.getElementById("dropdownMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}


document.addEventListener("click", function(event) {
    const menu = document.getElementById("dropdownMenu");
    const icon = document.querySelector(".menu-icon");

    if (!menu.contains(event.target) && !icon.contains(event.target)) {
        menu.style.display = "none";
    }
});


function GoTo(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
