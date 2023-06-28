let num1 = false;
let num2 = false;
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

function power(num1, num2) {
    return Math.pow(num1, num2);
}

function modular(num1, num2) {
    return num1 % num2;
}
//Check operator and use correct function
function operate(num1, operator, num2) {
    switch (true) {
        case operator === "+":
            return add(num1, num2);

        case operator === "-":
            return substract(num1, num2);

        case operator === "×":
            return multiply(num1, num2);

        case operator === "÷":
            return divide(num1, num2);

        case operator === "^":
            return power(num1, num2);

        case operator === "%":
            return modular(num1, num2);
    }
}
//Do operations with math order without parenthesises
function operationOrderWithoutParenthesis() {
    for (let i = 0; i < 100; i++) {
        if (answer.indexOf("^") === -1) {
            break;
        }

        if (answer.indexOf("^") !== -1) {
            operator = "^";
        }
        //Change nums with operator to answer
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
            answer.indexOf("×") === -1 &&
            answer.indexOf("÷") === -1 &&
            answer.indexOf("%") === -1
        ) {
            break;
        } else {
            switch (true) {
                case answer.indexOf("÷") !== -1 &&
                    answer.indexOf("×") !== -1 &&
                    answer.indexOf("%") !== -1:
                    operator = "×";
                    break;

                case answer.indexOf("×") === -1 &&
                    answer.indexOf("÷") !== -1 &&
                    answer.indexOf("%") !== -1:
                    operator = "÷";
                    break;

                case answer.indexOf("÷") === -1 &&
                    answer.indexOf("×") !== -1 &&
                    answer.indexOf("%") !== -1:
                    operator = "%";
                    break;

                case answer.indexOf("÷") !== -1 &&
                    answer.indexOf("×") !== -1 &&
                    answer.indexOf("%") === -1:
                    operator = "×";
                    break;

                case answer.indexOf("÷") === -1 &&
                    answer.indexOf("×") === -1 &&
                    answer.indexOf("%") !== -1:
                    operator = "%";
                    break;

                case answer.indexOf("÷") !== -1 &&
                    answer.indexOf("×") === -1 &&
                    answer.indexOf("%") === -1:
                    operator = "÷";
                    break;

                case answer.indexOf("÷") === -1 &&
                    answer.indexOf("×") !== -1 &&
                    answer.indexOf("%") === -1:
                    operator = "×";
                    break;

                case answer.indexOf("×") === -1 &&
                    answer.indexOf("÷") === -1 &&
                    answer.indexOf("%") === -1:
                    break;
            }
            //Change nums with operator to answer
            num1 = answer[answer.indexOf(operator) - 1];
            num2 = answer[answer.indexOf(operator) + 1];
            answer.splice(
                answer.indexOf(operator) - 1,
                3,
                operate(+num1, operator, +num2)
            );
        }
    }

    for (let i = 0; i < 100; i++) {
        console.log(`Test ${answer}`);
        if (answer.indexOf("+") === -1 && answer.indexOf("-") === -1) {
            break;
        }

        switch (true) {
            case answer.indexOf("+") === -1 && answer.indexOf("-") !== -1:
                operator = "-";
                break;
            case answer.indexOf("-") === -1 && answer.indexOf("+") !== -1:
                operator = "+";
                break;
            case answer.indexOf("-") !== -1 && answer.indexOf("+") !== -1:
                operator = "-";
                break;
        }
        //Change nums with operator to answer
        num1 = answer[answer.indexOf(operator) - 1];
        num2 = answer[answer.indexOf(operator) + 1];
        answer.splice(
            answer.indexOf(operator) - 1,
            3,
            operate(+num1, operator, +num2)
        );
    }
}

const buttons = document.querySelectorAll("button");
const ans = document.querySelector("button[value = 'ans']");
const screen = document.querySelector(".calc-upper-side p");
let answer = ""; //Num after =
let previousAnswer = "ans";
let lastOperator = answer.split(" ").slice(-2); //Find last operator
let textBeforeEqual = "";

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (screen.innerText !== "0123456789.+-×÷^%=") {
            screen.style.color = "black";
        }

        if (answer.length > 1) {
            lastOperator = answer.split(" ").slice(-2);
        }
        //Clear screen after use = or / on 0
        if (
            screen.innerText.includes(" = ") ||
            screen.innerText === "You can't divide on 0!"
        ) {
            answer = "";
            textBeforeEqual = "";
        }
        //Add animation after each use of button
        button.classList.add("animation");
        setTimeout(() => {
            button.classList.remove("animation");
        }, 100);

        switch (true) {
            //Stop if one num and use =
            case answer.length === 1 && button.value === " = ":
                break;
            //Clear screen if was too much symbols
            case screen.innerText ===
                "Sorry you wrote too much symbols, try again!":
                screen.innerText = "";
                break;
            //Check on symbols limit and clear vars
            case screen.innerText.length === 161:
                screen.innerText =
                    "Sorry you wrote too much symbols, try again!";
                answer = "";
                textBeforeEqual = "";
                break;

            case button.value === "ans":
                if (button.value === "ans") {
                    button.value = previousAnswer;
                }
                break;

            case button.value === "delete":
                operator = answer.split("").slice(-2)[0];

                switch (true) {
                    //Change screen on placeholder when delete last num
                    case answer.length === 1:
                        answer = answer.slice(0, -1);
                        screen.innerText = "0123456789.+-×÷^%=";
                        textBeforeEqual = "0123456789.+-×÷^%=";
                        screen.style.color = "rgba(0, 0, 0, 0.5)";
                        break;
                    //Delete operators with empty spaces around them
                    case operator === "+" ||
                        operator === "-" ||
                        operator === "×" ||
                        operator === "÷" ||
                        operator === "^" ||
                        operator === "%":
                        answer = answer.slice(0, -3);
                        textBeforeEqual = answer;
                        screen.innerText = answer;
                        break;
                    //Delete one num
                    case answer.length !== 0:
                        answer = answer.slice(0, -1);
                        textBeforeEqual = answer;
                        screen.innerText = answer;
                        break;
                }
                //Reset lastOperator [0] to default
                lastOperator[0] = "";
                break;

            //Use if not an empty screen
            case button.value === " = " &&
                answer !== "" &&
                answer.split(" ").slice(-1)[0] !== "":
                if (answer.indexOf("(") !== -1 || answer.indexOf(")") !== -1) {
                    answer = answer.split("");
                }

                let arrWithParenthesises = answer;

                for (let i = 0; i < 100; i++) {
                    switch (true) {
                        //Delete unused parenthesis if not have couple
                        case answer.indexOf("(") === -1 &&
                            answer.indexOf(")") !== -1:
                            answer.splice(answer.indexOf(")"), 1);
                            textBeforeEqual = answer.join("");
                            break;

                        case answer.indexOf(")") === -1 &&
                            answer.indexOf("(") !== -1:
                            answer.splice(answer.indexOf("("), 1);
                            textBeforeEqual = answer.join("");
                            break;
                        //Else use operations in parenthesises first
                        case answer.indexOf("(") !== -1 &&
                            answer.indexOf(")") !== -1:
                            let closeParenthesis = answer.indexOf(")");
                            answer = answer.slice(0, closeParenthesis + 1);
                            let openParenthesis = answer.lastIndexOf("(");
                            answer = answer.slice(
                                openParenthesis + 1,
                                closeParenthesis
                            );
                            answer = answer.filter(
                                (element) => element !== " "
                            );
                            operationOrderWithoutParenthesis();
                            arrWithParenthesises[
                                openParenthesis
                            ] = `${answer[0]}`;
                            arrWithParenthesises.splice(
                                openParenthesis + 1,

                                closeParenthesis
                            );
                            answer = arrWithParenthesises;
                    }
                }

                if (answer.includes("") === false) {
                    answer = answer.join("").split(" ");
                } else {
                    answer = answer.split(" ");
                }

                operationOrderWithoutParenthesis();
                //Use if not / on 0
                if (+num2 !== false && operator !== "÷") {
                    answer = answer.join(" ");
                    screen.innerText = textBeforeEqual + " = " + answer;
                }

                previousAnswer = answer;

                if (ans.value !== "ans") {
                    ans.value = "ans";
                }

                break;
            //Clear screen and change text to placeholder
            case button.value === "clear":
                screen.innerText = "0123456789.+-×÷^%=";
                screen.style.color = "rgba(0, 0, 0, 0.5)";
                answer = "";
                textBeforeEqual = "";
                break;
        }

        switch (true) {
            //Stop if no operators and click on equal
            case answer.length === 1 && button.value === " = ":
                break;

            //Stop if no nums and click on operators
            case answer === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " × " ||
                    button.value === " ÷ " ||
                    button.value === " ^ " ||
                    button.value === " % " ||
                    button.value === "." ||
                    button.value === " = "):
                break;

            //Stop if use operators after num with point in the end
            case answer.length > 1 &&
                answer.split("").slice(-3).includes(".") &&
                answer.split(" ")[0].slice(-1) === "." &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " × " ||
                    button.value === " ÷ " ||
                    button.value === " ^ " ||
                    button.value === " % " ||
                    button.value === "."):
                break;

            //Stop if try to use point again and operators after num with point in the end
            case (answer.length > 1 &&
                answer.split("").slice(-3).includes(".") &&
                button.value === ".") ||
                (answer.length > 1 &&
                    answer.split("").slice(-4).slice(-1)[0] === "." &&
                    (button.value === " + " ||
                        button.value === " - " ||
                        button.value === " × " ||
                        button.value === " ÷ " ||
                        button.value === " ^ " ||
                        button.value === " % " ||
                        button.value === ".")):
                break;

            //Stop if after + try to use operators
            case lastOperator[0] === "+" &&
                lastOperator[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " × " ||
                    button.value === " ÷ " ||
                    button.value === " ^ " ||
                    button.value === " % " ||
                    button.value === "."):
                break;

            //Stop if after + try to use operators
            case lastOperator[0] === "-" &&
                lastOperator[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " × " ||
                    button.value === " ÷ " ||
                    button.value === " ^ " ||
                    button.value === " % " ||
                    button.value === "."):
                break;

            //Stop if after + try to use operators
            case lastOperator[0] === "×" &&
                lastOperator[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " × " ||
                    button.value === " ÷ " ||
                    button.value === " ^ " ||
                    button.value === " % " ||
                    button.value === "."):
                break;

            //Stop if after + try to use operators
            case lastOperator[0] === "÷" &&
                lastOperator[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " × " ||
                    button.value === " ÷ " ||
                    button.value === " ^ " ||
                    button.value === " % " ||
                    button.value === "."):
                break;

            //Stop if after + try to use operators
            case lastOperator[0] === "^" &&
                lastOperator[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " × " ||
                    button.value === " ÷ " ||
                    button.value === " ^ " ||
                    button.value === " % " ||
                    button.value === "."):
                break;

            //Stop if after + try to use operators
            case lastOperator[0] === "%" &&
                lastOperator[1] === "" &&
                (button.value === " + " ||
                    button.value === " - " ||
                    button.value === " × " ||
                    button.value === " ÷ " ||
                    button.value === " ^ " ||
                    button.value === " % " ||
                    button.value === "."):
                break;

            //Stop if before point try to use multiple 0
            case answer.length > 1 &&
                answer.split(" ").slice(-1)[0][0] === "0" &&
                answer.split(" ").slice(-1)[0][1] !== "." &&
                button.value === "0":
                break;

            //Show manipulations on the screen
            case button.value !== " = " &&
                button.value !== "clear" &&
                button.value !== "delete" &&
                button.value !== "ans" &&
                screen.innerText !==
                    "Sorry you wrote too much symbols, try again!":
                textBeforeEqual = answer;
                answer += button.value;
                textBeforeEqual += button.value;
                screen.innerText = answer;
                break;
        }
    });

    //Add keyboard support
    window.addEventListener("keydown", (e) => {
        switch (true) {
            case e.code === "Digit0" && button.value === "0":
                button.click();
                break;

            case e.code === "Digit1" && button.value === "1":
                button.click();
                break;

            case e.code === "Digit2" && button.value === "2":
                button.click();
                break;

            case e.code === "Digit3" && button.value === "3":
                button.click();
                break;

            case e.code === "Digit4" && button.value === "4":
                button.click();
                break;

            case e.code === "Digit5" &&
                button.value === "5" &&
                e.shiftKey === false:
                button.click();
                break;

            case e.code === "Digit6" &&
                button.value === "6" &&
                e.shiftKey === false:
                button.click();
                break;

            case e.code === "Digit7" && button.value === "7":
                button.click();
                break;

            case e.code === "Digit8" &&
                button.value === "8" &&
                e.shiftKey === false:
                button.click();
                break;

            case e.code === "Digit9" && button.value === "9":
                button.click();
                break;

            case e.code === "Period" && button.value === ".":
                button.click();
                break;

            case e.code === "Enter" && button.value === " = ":
                button.click();
                break;

            case e.ctrlKey === true &&
                e.code === "Backspace" &&
                button.value === "clear":
                button.click();
                break;

            case e.code === "Backspace" && button.value === "delete":
                button.click();
                break;

            case e.code === "Equal" && button.value === " + ":
                button.click();
                break;

            case e.code === "Minus" && button.value === " - ":
                button.click();
                break;

            case e.shiftKey === true &&
                e.code === "Digit8" &&
                button.value === " × ":
                button.click();
                break;

            case e.code === "Slash" && button.value === " ÷ ":
                button.click();
                break;

            case e.shiftKey === true &&
                e.code === "Digit6" &&
                button.value === " ^ ":
                button.click();
                break;

            case e.shiftKey === true &&
                e.code === "Digit5" &&
                button.value === " % ":
                button.click();
                break;
        }
    });
});
