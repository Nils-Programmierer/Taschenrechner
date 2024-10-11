document.addEventListener("DOMContentLoaded", () => {
    const button0 = document.getElementById("button0");
    const button1 = document.getElementById("button1");
    const button2 = document.getElementById("button2");
    const button3 = document.getElementById("button3");
    const button4 = document.getElementById("button4");
    const button5 = document.getElementById("button5");
    const button6 = document.getElementById("button6");
    const button7 = document.getElementById("button7");
    const button8 = document.getElementById("button8");
    const button9 = document.getElementById("button9");


    const invoiceDiv = document.querySelector(".invoice");
    const endDiv = document.querySelector(".end");

    const plus = document.getElementById("button+");
    const minus = document.getElementById("button-");
    const mal = document.getElementById("button*");
    const teilen = document.getElementById("button/");

    const gleich = document.getElementById("button=");
    const komma = document.getElementById("button,");

    const C = document.getElementById("buttonC");
    const buttondelete = document.getElementById("buttondelete");


    const buttonKlammerZu = document.getElementById("button)");
    const buttonKlammerAuf = document.getElementById("button(");
    const buttonHoch2 = document.getElementById("button²");
    const buttonWurzel = document.getElementById("buttonWurzel");



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
                        let expression = currentText.replace(/×/g, '*').replace(/÷/g, '/').replaceAll("²", "^2").replaceAll(/√/g, 'sqrt(');

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



    button0.addEventListener("click", () => {
        updateInvoiceText("0");
    });

    button1.addEventListener("click", () => {
        updateInvoiceText("1");
    });

    button2.addEventListener("click", () => {
        updateInvoiceText("2");
    });

    button3.addEventListener("click", () => {
        updateInvoiceText("3");
    });

    button4.addEventListener("click", () => {
        updateInvoiceText("4");
    });

    button5.addEventListener("click", () => {
        updateInvoiceText("5");
    });

    button6.addEventListener("click", () => {
        updateInvoiceText("6");
    });

    button7.addEventListener("click", () => {
        updateInvoiceText("7");
    });

    button8.addEventListener("click", () => {
        updateInvoiceText("8");
    });

    button9.addEventListener("click", () => {
        updateInvoiceText("9");
    });





    plus.addEventListener("click", () => {
        updateInvoiceText("+");
    });

    minus.addEventListener("click", () => {
        updateInvoiceText("-");
    });

    mal.addEventListener("click", () => {
        updateInvoiceText("×");
    });

    teilen.addEventListener("click", () => {
        updateInvoiceText("÷");
    });




    gleich.addEventListener("click", () => {
        updateInvoiceText("=");
    });

    komma.addEventListener("click", () => {
        updateInvoiceText(".");
    });

    buttonKlammerZu.addEventListener("click", () => {
        updateInvoiceText(")");
    });

    buttonKlammerAuf.addEventListener("click", () => {
        updateInvoiceText("(");
    });

    buttonHoch2.addEventListener("click", () => {
        updateInvoiceText("²");
    });

    buttonWurzel.addEventListener("click", () => {
        updateInvoiceText("√");
    });


    C.addEventListener("click", () => {
        invoiceDiv.textContent = "";
        endDiv.textContent = "0";
    });


    buttondelete.addEventListener("click", () => {
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
    });
});