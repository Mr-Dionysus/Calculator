let firstNum = -1;
let secondNum = -1;
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
    if (+num2 === 0) {
        screen.innerText = "You can't divide on 0!";
        secondNum = -1;
        displayValue = "";
    }

    if (num1 % num2 === 0) {
        return num1 / num2;
    } else {
        return (num1 / num2).toFixed(4);
    }
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
let checkPreviousOperation = displayValue.split(" ").slice(-2);
let finalAnswer = "";

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        screen.style.color = "black";
        if (displayValue.length > 1) {
            checkPreviousOperation = displayValue.split(" ").slice(-2);
        }

        if (
            screen.innerText.includes(" = ") ||
            screen.innerText === "You can't divide on 0!"
        ) {
            displayValue = "";
            finalAnswer = "";
        }

        switch (true) {
            case displayValue.length === 1 && button.value === " = ":
                break;

            case screen.innerText ===
                "Sorry you wrote too much symbols, try again!":
                screen.innerText = "";
                break;

            case screen.innerText.length === 182:
                screen.innerText =
                    "Sorry you wrote too much symbols, try again!";
                displayValue = "";
                finalAnswer = "";
                break;

            case button.value === "delete":
                if (
                    displayValue.split("").slice(-2)[0] === "+" ||
                    displayValue.split("").slice(-2)[0] === "-" ||
                    displayValue.split("").slice(-2)[0] === "*" ||
                    displayValue.split("").slice(-2)[0] === "/"
                ) {
                    displayValue = displayValue.slice(0, -3);
                    finalAnswer = displayValue;
                    screen.innerText = displayValue;
                } else {
                    displayValue = displayValue.slice(0, -1);
                    finalAnswer = displayValue;
                    screen.innerText = displayValue;
                }
                break;

            case button.value === " = " && displayValue !== "":
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

                if (+secondNum !== 0 && +secondNum !== -1) {
                    displayValue = displayValue.join(" ");
                    screen.innerText = finalAnswer + " = " + displayValue;
                }
                break;

            case button.value === "clear":
                screen.innerText = "0123456789+-*/=";
                screen.style.color = "rgba(0, 0, 0, 0.695)";
                displayValue = "";
                finalAnswer = "";
                break;
        }

        switch (true) {
            case displayValue.length === 1 && button.value === " = ":
                break;

            case displayValue === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " * " ||
                    button.value === " / " ||
                    button.value === "." ||
                    button.value === " = "):
                break;

            case displayValue.length > 1 &&
                displayValue.split("").slice(-3).includes(".") &&
                displayValue.split(" ")[0].slice(-1) === "." &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " * " ||
                    button.value === " / " ||
                    button.value === "."):
                break;

            case (displayValue.length > 1 &&
                displayValue.split("").slice(-3).includes(".") &&
                button.value === ".") ||
                (displayValue.length > 1 &&
                    displayValue.split("").slice(-4).slice(-1)[0] === "." &&
                    (button.value === " + " ||
                        button.value === " - " ||
                        button.value === " * " ||
                        button.value === " / " ||
                        button.value === ".")):
                break;

            case checkPreviousOperation[0] === "+" &&
                checkPreviousOperation[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " * " ||
                    button.value === " / " ||
                    button.value === "."):
                break;

            case checkPreviousOperation[0] === "-" &&
                checkPreviousOperation[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " * " ||
                    button.value === " / " ||
                    button.value === "."):
                break;

            case checkPreviousOperation[0] === "*" &&
                checkPreviousOperation[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " * " ||
                    button.value === " / " ||
                    button.value === "."):
                break;

            case checkPreviousOperation[0] === "/" &&
                checkPreviousOperation[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " * " ||
                    button.value === " / " ||
                    button.value === "."):
                break;

            case displayValue.length > 1 &&
                displayValue.split(" ").slice(-1)[0][0] === "0" &&
                displayValue.split(" ").slice(-1)[0][1] !== "." &&
                button.value === "0":
                break;

            case button.value !== " = " &&
                button.value !== "clear" &&
                button.value !== "delete" &&
                screen.innerText !==
                    "Sorry you wrote too much simbols, try again!":
                finalAnswer = displayValue;
                displayValue += button.value;
                finalAnswer += button.value;
                screen.innerText = displayValue;
                break;
        }
    });
});
