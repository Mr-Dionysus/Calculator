let firstNum = 0;
let secondNum = 0;
let operation = "";

function add(num1, num2) {
    return num1 + num2;
}

function substract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(firstNum, operation, secondNum) {
    switch (true) {
        case operation === "+":
            return add(firstNum, secondNum);
        case operation === "-":
            return substract(firstNum, secondNum);
        case operation === "*":
            return multiply(firstNum, secondNum);
        case operation === "/":
            return divide(firstNum, secondNum);
    }
}

const buttons = document.querySelectorAll("button");
const screen = document.querySelector(".calc-upper-side p");
let multiplyOrDivide = "";
let displayValue = "";
let finalAnswer = "";

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        screen.style.color = "black";
        let checkPreviousOperation = displayValue.split(" ").slice(-2);

        if (screen.innerText.includes(" = ")) {
            displayValue = "";
            finalAnswer = "";
        }

        switch (true) {
            case button.value === " + ":
                if (
                    (checkPreviousOperation[0] === "+" &&
                        checkPreviousOperation[1] === "") ||
                    (checkPreviousOperation[0] === "-" &&
                        checkPreviousOperation[1] === "") ||
                    (checkPreviousOperation[0] === "*" &&
                        checkPreviousOperation[1] === "") ||
                    (checkPreviousOperation[0] === "/" &&
                        checkPreviousOperation[1] === "")
                ) {
                    displayValue = displayValue.slice(0, -3);
                    break;
                }

            case button.value === " - ":
                if (
                    (checkPreviousOperation[0] === "+" &&
                        checkPreviousOperation[1] === "") ||
                    (checkPreviousOperation[0] === "-" &&
                        checkPreviousOperation[1] === "") ||
                    (checkPreviousOperation[0] === "*" &&
                        checkPreviousOperation[1] === "") ||
                    (checkPreviousOperation[0] === "/" &&
                        checkPreviousOperation[1] === "")
                ) {
                    displayValue = displayValue.slice(0, -3);
                    break;
                }

            case button.value === " * ":
                if (
                    (checkPreviousOperation[0] === "+" &&
                        checkPreviousOperation[1] === "") ||
                    (checkPreviousOperation[0] === "-" &&
                        checkPreviousOperation[1] === "") ||
                    (checkPreviousOperation[0] === "*" &&
                        checkPreviousOperation[1] === "") ||
                    (checkPreviousOperation[0] === "/" &&
                        checkPreviousOperation[1] === "")
                ) {
                    displayValue = displayValue.slice(0, -3);
                    break;
                }

            case button.value === " / ":
                if (
                    (checkPreviousOperation[0] === "+" &&
                        checkPreviousOperation[1] === "") ||
                    (checkPreviousOperation[0] === "-" &&
                        checkPreviousOperation[1] === "") ||
                    (checkPreviousOperation[0] === "*" &&
                        checkPreviousOperation[1] === "") ||
                    (checkPreviousOperation[0] === "/" &&
                        checkPreviousOperation[1] === "")
                ) {
                    displayValue = displayValue.slice(0, -3);
                    break;
                }
        }

        switch (true) {
            case button.value === " = ":
                displayValue = displayValue.split(" ");

                for (let i = 0; i < 100; i++) {
                    if (
                        displayValue.indexOf("*") === -1 &&
                        displayValue.indexOf("/") === -1
                    ) {
                        break;
                    }

                    if (
                        displayValue.indexOf("/") !== -1 &&
                        displayValue.indexOf("*") !== -1
                    ) {
                        multiplyOrDivide = "*";
                    } else if (
                        displayValue.indexOf("*") === -1 &&
                        displayValue.indexOf("/") !== -1
                    ) {
                        multiplyOrDivide = "/";
                    } else if (
                        displayValue.indexOf("/") === -1 &&
                        displayValue.indexOf("*") !== -1
                    ) {
                        multiplyOrDivide = "*";
                    }

                    operation =
                        displayValue[displayValue.indexOf(multiplyOrDivide)];
                    firstNum =
                        displayValue[
                            displayValue.indexOf(multiplyOrDivide) - 1
                        ];
                    secondNum =
                        displayValue[
                            displayValue.indexOf(multiplyOrDivide) + 1
                        ];
                    displayValue.splice(
                        displayValue.indexOf(multiplyOrDivide) - 1,
                        3,
                        operate(+firstNum, operation, +secondNum)
                    );
                }

                for (let i = 0; i < 100; i++) {
                    if (
                        displayValue.indexOf("+") === -1 &&
                        displayValue.indexOf("-") === -1
                    ) {
                        break;
                    }

                    if (
                        displayValue.indexOf("+") === -1 &&
                        displayValue.indexOf("-") !== -1
                    ) {
                        multiplyOrDivide = "-";
                    } else if (
                        displayValue.indexOf("-") === -1 &&
                        displayValue.indexOf("+") !== -1
                    ) {
                        multiplyOrDivide = "+";
                    } else if (
                        displayValue.indexOf("-") !== -1 &&
                        displayValue.indexOf("+") !== -1
                    ) {
                        multiplyOrDivide = "+";
                    }

                    operation =
                        displayValue[displayValue.indexOf(multiplyOrDivide)];
                    firstNum =
                        displayValue[
                            displayValue.indexOf(multiplyOrDivide) - 1
                        ];
                    secondNum =
                        displayValue[
                            displayValue.indexOf(multiplyOrDivide) + 1
                        ];
                    displayValue.splice(
                        displayValue.indexOf(multiplyOrDivide) - 1,
                        3,

                        operate(+firstNum, operation, +secondNum)
                    );
                }
                displayValue = displayValue.join(" ");
                screen.innerText = finalAnswer + " = " + displayValue;
                break;

            case button.value === "clear":
                screen.innerText = "0123456789+-*/=";
                screen.style.color = "rgba(0, 0, 0, 0.695)";
                displayValue = "";
                finalAnswer = "";
                break;
        }

        if (button.value !== " = " && button.value !== "clear") {
            finalAnswer = displayValue;
            displayValue += button.value;
            finalAnswer += button.value;
            screen.innerText = displayValue;
        }
    });
});

const equal = document.querySelector(`button[value=" = "]`);
// equal.addEventListener("click", () => {});
