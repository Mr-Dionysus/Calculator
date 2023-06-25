let num1 = -1;
let num2 = -1;
let operator = "";

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
        num2 = -1;
        answer = "";
    }

    if (num1 % num2 === 0) {
        return num1 / num2;
    } else {
        return (num1 / num2).toFixed(4);
    }
}

function operate(num1, operator, num2) {
    switch (true) {
        case operator === "+":
            return add(num1, num2);
        case operator === "-":
            return substract(num1, num2);
        case operator === "*":
            return multiply(num1, num2);
        case operator === "/":
            return divide(num1, num2);
    }
}

const buttons = document.querySelectorAll("button");
const screen = document.querySelector(".calc-upper-side p");
let answer = "";
let lastOperator = answer.split(" ").slice(-2);
let textBeforeEqual = "";

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (screen.innerText !== "0123456789+-*/=") {
            screen.style.color = "black";
        }

        if (answer.length > 1) {
            lastOperator = answer.split(" ").slice(-2);
        }

        if (
            screen.innerText.includes(" = ") ||
            screen.innerText === "You can't divide on 0!"
        ) {
            answer = "";
            textBeforeEqual = "";
        }

        switch (true) {
            case answer.length === 1 && button.value === " = ":
                break;

            case screen.innerText ===
                "Sorry you wrote too much symbols, try again!":
                screen.innerText = "";
                break;

            case screen.innerText.length === 182:
                screen.innerText =
                    "Sorry you wrote too much symbols, try again!";
                answer = "";
                textBeforeEqual = "";
                break;

            case button.value === "delete":
                operator = answer.split("").slice(-2)[0];

                switch (true) {
                    case answer.length === 1:
                        answer = answer.slice(0, -1);
                        screen.innerText = "0123456789+-*/=";
                        textBeforeEqual = "0123456789+-*/=";
                        screen.style.color = "rgba(0, 0, 0, 0.695)";
                        break;

                    case operator === "+" ||
                        operator === "-" ||
                        operator === "*" ||
                        operator === "/":
                        answer = answer.slice(0, -3);
                        textBeforeEqual = answer;
                        screen.innerText = answer;
                        break;

                    case answer.length !== 0:
                        answer = answer.slice(0, -1);
                        textBeforeEqual = answer;
                        screen.innerText = answer;
                        break;
                }

                lastOperator[0] = "";
                break;

            case button.value === " = " &&
                answer !== "" &&
                answer.split(" ").slice(-1)[0] !== "":
                answer = answer.split(" ");

                for (let i = 0; i < 100; i++) {
                    if (
                        answer.indexOf("*") === -1 &&
                        answer.indexOf("/") === -1
                    ) {
                        break;
                    }

                    if (
                        answer.indexOf("/") !== -1 &&
                        answer.indexOf("*") !== -1
                    ) {
                        operator = "*";
                    } else if (
                        answer.indexOf("*") === -1 &&
                        answer.indexOf("/") !== -1
                    ) {
                        operator = "/";
                    } else if (
                        answer.indexOf("/") === -1 &&
                        answer.indexOf("*") !== -1
                    ) {
                        operator = "*";
                    }

                    num1 = answer[answer.indexOf(operator) - 1];
                    num2 = answer[answer.indexOf(operator) + 1];
                    answer.splice(
                        answer.indexOf(operator) - 1,
                        3,
                        operate(+num1, operator, +num2)
                    );
                }

                for (let i = 0; i < 100; i++) {
                    if (
                        answer.indexOf("+") === -1 &&
                        answer.indexOf("-") === -1
                    ) {
                        break;
                    }

                    if (
                        answer.indexOf("+") === -1 &&
                        answer.indexOf("-") !== -1
                    ) {
                        operator = "-";
                    } else if (
                        answer.indexOf("-") === -1 &&
                        answer.indexOf("+") !== -1
                    ) {
                        operator = "+";
                    } else if (
                        answer.indexOf("-") !== -1 &&
                        answer.indexOf("+") !== -1
                    ) {
                        operator = "+";
                    }

                    num1 = answer[answer.indexOf(operator) - 1];
                    num2 = answer[answer.indexOf(operator) + 1];
                    answer.splice(
                        answer.indexOf(operator) - 1,
                        3,
                        operate(+num1, operator, +num2)
                    );
                }

                if (+num2 !== 0 && +num2 !== -1) {
                    answer = answer.join(" ");
                    screen.innerText = textBeforeEqual + " = " + answer;
                }
                break;

            case button.value === "clear":
                screen.innerText = "0123456789+-*/=";
                screen.style.color = "rgba(0, 0, 0, 0.695)";
                answer = "";
                textBeforeEqual = "";
                break;
        }

        switch (true) {
            case answer.length === 1 && button.value === " = ":
                break;

            case answer === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " * " ||
                    button.value === " / " ||
                    button.value === "." ||
                    button.value === " = "):
                break;

            case answer.length > 1 &&
                answer.split("").slice(-3).includes(".") &&
                answer.split(" ")[0].slice(-1) === "." &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " * " ||
                    button.value === " / " ||
                    button.value === "."):
                break;

            case (answer.length > 1 &&
                answer.split("").slice(-3).includes(".") &&
                button.value === ".") ||
                (answer.length > 1 &&
                    answer.split("").slice(-4).slice(-1)[0] === "." &&
                    (button.value === " + " ||
                        button.value === " - " ||
                        button.value === " * " ||
                        button.value === " / " ||
                        button.value === ".")):
                break;

            case lastOperator[0] === "+" &&
                lastOperator[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " * " ||
                    button.value === " / " ||
                    button.value === "."):
                break;

            case lastOperator[0] === "-" &&
                lastOperator[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " * " ||
                    button.value === " / " ||
                    button.value === "."):
                break;

            case lastOperator[0] === "*" &&
                lastOperator[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " * " ||
                    button.value === " / " ||
                    button.value === "."):
                break;

            case lastOperator[0] === "/" &&
                lastOperator[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " * " ||
                    button.value === " / " ||
                    button.value === "."):
                break;

            case answer.length > 1 &&
                answer.split(" ").slice(-1)[0][0] === "0" &&
                answer.split(" ").slice(-1)[0][1] !== "." &&
                button.value === "0":
                break;

            case button.value !== " = " &&
                button.value !== "clear" &&
                button.value !== "delete" &&
                screen.innerText !==
                    "Sorry you wrote too much symbols, try again!":
                textBeforeEqual = answer;
                answer += button.value;
                textBeforeEqual += button.value;
                screen.innerText = answer;
                break;
        }
    });
});
