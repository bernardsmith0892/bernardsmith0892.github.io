var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Each index is linked between the two lists
var officerPromotionTimeline = {
    "Career YOS": [0, 1.5, 4, 10, 16, 22],
    "Grade": ["O-1", "O-2", "O-3", "O-4", "O-5", "O-6"] // Grade Promoted To
};
function calculateInterest(P, r, n, t) {
    return P * Math.pow((1 + (r / n)), (n * t));
}
function depositsNeeded(goalFunds, startFunds, annualReturnRate, years) {
    var months = years * 12;
    var monthlyReturnRate = annualReturnRate / 12;
    if (monthlyReturnRate == 0) {
        return (goalFunds - startFunds) / months;
    }
    else {
        return (monthlyReturnRate * (goalFunds - startFunds * Math.pow((1 + monthlyReturnRate), months))) / (Math.pow((1 + monthlyReturnRate), months) - 1);
    }
}
function annualGains(startFunds, annualReturnRate) {
    return calculateInterest(startFunds, annualReturnRate, 12, 1);
}
function monthsDifference(startDate, endDate) {
    return (endDate.getFullYear() * 12 + endDate.getUTCMonth()) - (startDate.getFullYear() * 12 + startDate.getUTCMonth());
}
function addMonths(startDate, months) {
    return new Date(startDate.getFullYear(), startDate.getUTCMonth() + months, startDate.getUTCDate());
}
function getCurrentGrade(yearsOfService, promotionTimeline) {
    var currentGrade = '';
    for (var i = 0; i < promotionTimeline["Career YOS"].length; ++i) {
        if (yearsOfService >= promotionTimeline["Career YOS"][i]) {
            currentGrade = promotionTimeline["Grade"][i];
        }
        else {
            break;
        }
    }
    return currentGrade;
}
function getCurrentPay(yearsOfService, payGrade, payscale) {
    var currentStep = 0;
    for (var i = 0; i < payscale.years.length; ++i) {
        if (yearsOfService >= payscale.years[i]) {
            currentStep = i;
        }
        else {
            break;
        }
    }
    return payscale[payGrade][currentStep];
}
function getBAH(payGrade, dependents, bah) {
    if (dependents) {
        return bah[payGrade]["With Dependents"];
    }
    else {
        return bah[payGrade]["Without Dependents"];
    }
}
function getBAS(payGrade, bas) {
    if (payGrade[0] == "O" || payGrade[0] == "W") {
        return bas.O;
    }
    else if (payGrade[0] == "E") {
        return bas.E;
    }
    return -1;
}
function retirementLength(funds, annualReturnRate, annualWithdrawal, colaRate, startMonth, verbose) {
    if (startMonth === void 0) { startMonth = 0; }
    if (verbose === void 0) { verbose = false; }
    var months = 0;
    var monthlyWithdrawal = annualWithdrawal / 12;
    var monthlyReturnRate = annualReturnRate / 12;
    if (verbose) {
        console.log("Months,Funds,Change,Withdrawal");
    }
    while (funds > 0 && funds != Infinity) {
        months += 1;
        if ((months + startMonth) % 12 == 0) {
            monthlyWithdrawal *= (1 + colaRate);
        }
        if (verbose) {
            console.log(months + "," + (funds - monthlyWithdrawal).toFixed(2) + "," + funds.toFixed(2) + "," + monthlyWithdrawal.toFixed(2));
        }
        funds = calculateInterest(funds - monthlyWithdrawal, monthlyReturnRate, 1, 1);
    }
    if (funds == Infinity) {
        return Infinity;
    }
    else {
        return months / 12;
    }
}
function requiredSavings(yearsRequired, annualWithdrawal, annualReturnRate, colaRate, accuracy, startMonth, verbose) {
    if (accuracy === void 0) { accuracy = 1.0; }
    if (startMonth === void 0) { startMonth = 0; }
    if (verbose === void 0) { verbose = false; }
    var upperLimit = annualWithdrawal * yearsRequired;
    if (colaRate != 0) {
        upperLimit = (annualWithdrawal * (1 - Math.pow((1 + colaRate), yearsRequired))) / (1 - (1 + colaRate)); // Sum of finite exponential series
    }
    var lowerLimit = 0;
    var funds = upperLimit / 2;
    var calculatedYears = 0;
    while ((calculatedYears < yearsRequired || calculatedYears > yearsRequired + accuracy) && Math.abs(upperLimit - lowerLimit) > 0.00001) {
        calculatedYears = retirementLength(funds, annualReturnRate, annualWithdrawal, colaRate, startMonth);
        if (verbose) {
            console.log("$" + funds + " - " + calculatedYears + "(" + upperLimit + ", " + lowerLimit + ")");
        }
        if (calculatedYears > yearsRequired + accuracy) {
            upperLimit = funds;
            funds = (upperLimit + lowerLimit) / 2;
        }
        else if (calculatedYears < yearsRequired) {
            lowerLimit = funds;
            funds = (upperLimit + lowerLimit) / 2;
        }
    }
    return funds;
}
function predictPay(startDate, endDate, eadDate, payDate, annualRaiseRate, promotionTimeline, payscale, bah, bas, verbose) {
    if (verbose === void 0) { verbose = false; }
    var currentDate = startDate;
    var last36 = [];
    var predictedPay = [];
    var careerYOS = monthsDifference(eadDate, currentDate) / 12;
    annualRaiseRate += 1;
    if (verbose) {
        console.log("Date,Career YOS,Pay YOS,Grade,Base Pay,Bonuses,COLA Increase");
    }
    while (currentDate <= endDate) {
        careerYOS = monthsDifference(eadDate, currentDate) / 12;
        var payYOS = monthsDifference(payDate, currentDate) / 12;
        var currentRaise = Math.pow(annualRaiseRate, (currentDate.getFullYear() - startDate.getFullYear()));
        var grade = getCurrentGrade(careerYOS, promotionTimeline);
        var basePay = getCurrentPay(payYOS, grade, payscale) * currentRaise;
        var bonuses = (getBAH(grade, true, bah) + getBAS(grade, bas)) * currentRaise;
        if (verbose) {
            console.log(currentDate.toLocaleDateString() + "," + careerYOS.toFixed(2) + "," + payYOS.toFixed(2) + "," + grade + ",$" + basePay.toFixed(2) + ",$" + bonuses.toFixed(2) + "," + currentRaise.toFixed(2));
        }
        predictedPay.push({
            "Date": currentDate,
            "Career YOS": careerYOS,
            "Pay YOS": payYOS,
            "Grade": grade,
            "Base Pay": basePay,
            "Bonuses": bonuses,
            "COLA": currentRaise
        });
        currentDate = addMonths(currentDate, 1);
        // Add pay to last 36 and remove the oldest pay if there's more than 36 periods recorded
        if (last36.push(basePay) > 36) {
            last36.shift();
        }
    }
    var sum = 0;
    for (var i in last36) {
        sum += last36[i];
    }
    var high3 = sum / last36.length;
    var pension = high3 * careerYOS * 0.02;
    return {
        "Predicted Pay": predictedPay,
        "High 3": high3,
        "Monthly Pension": pension
    };
}
function equivalentRetirement(targetSavings, years, annualReturnRate, predictedPay, colaRate, verbose) {
    if (verbose === void 0) { verbose = false; }
    var monthlyDeposit = depositsNeeded(targetSavings, 0, annualReturnRate, years);
    var startDate = predictedPay[0]["Date"];
    var currentPrediction;
    var savingsPlan = [];
    if (verbose) {
        console.log("Date,Monthly Civ Pay,Monthly Savings,Annual Civ Pay,Annual Savings,COLA");
    }
    for (var month = 0; month < years * 12; ++month) {
        // Check if we've run past our current predictions.
        //  If so, just use the last base pay and do COLA increases.
        if (month >= predictedPay.length) {
            // Add a month to the current date
            currentPrediction["Date"] = addMonths(currentPrediction["Date"], 1);
            // COLA increase for pay and bonuses
            currentPrediction["Base Pay"] /= currentPrediction["COLA"];
            currentPrediction["Bonuses"] /= currentPrediction["COLA"];
            currentPrediction["COLA"] = Math.pow((1 + colaRate), (currentPrediction["Date"].getFullYear() - startDate.getFullYear()));
            currentPrediction["Base Pay"] *= currentPrediction["COLA"];
            currentPrediction["Bonuses"] *= currentPrediction["COLA"];
        }
        else {
            currentPrediction = predictedPay[month];
        }
        var civilianMonthlyPay = currentPrediction["Base Pay"] + currentPrediction["Bonuses"] + monthlyDeposit;
        var civilianAnnualPay = civilianMonthlyPay * 12;
        savingsPlan.push({
            "Date": currentPrediction["Date"],
            "Grade": currentPrediction["Grade"],
            "Mil Monthly": currentPrediction["Base Pay"] + currentPrediction["Bonuses"],
            "Civ Monthly": civilianMonthlyPay,
            "Monthly Deposit": monthlyDeposit,
            "Civ Annual": civilianAnnualPay,
            "Annual Deposit": monthlyDeposit * 12,
            "COLA": currentPrediction["COLA"]
        });
        if (verbose) {
            console.log(currentPrediction["Date"].toLocaleDateString() + ",$" + civilianMonthlyPay.toFixed(2) + ',$' + monthlyDeposit.toFixed(2) + ',$' + civilianAnnualPay.toFixed(2) + ',$' + (monthlyDeposit * 12).toFixed(2) + "," + currentPrediction["COLA"].toFixed(2));
        }
    }
    return savingsPlan;
}
// ***************************
// ** DOM Modification Code **
// ***************************
function validateInput(id, min, max) {
    var value = document.getElementById(id).valueAsNumber;
    value = value < min ? min : value;
    value = value > max ? max : value;
    document.getElementById(id).value = value.toString();
}
function createSavingsTable(savingsPlan) {
    // Date, Grade, Annual Pay, Required Savings, Required Civilian Annual Pay
    var tableOutput = "";
    // Add table header
    tableOutput += "<thead><tr>\n                    <th scope='col'>Date</th>\n                    <th scope='col'>Pay Grade</th>\n                    <th scope='col'>Military Pay</th>\n                    <th scope='col'>Required Monthly Savings</th>\n                    <th scope='col'>Required Annual Civilian Pay</th>\n                    </tr></thead>\n                    <tbody>";
    // Add table rows
    var moneyStyle = { style: "currency", currency: "USD" };
    for (var i in savingsPlan) {
        tableOutput += "<tr>";
        tableOutput += "<th scope='row'>" + savingsPlan[i]["Date"].toLocaleDateString("en-US", { month: 'short', year: 'numeric', timeZone: 'UTC' }) + "</th>";
        tableOutput += "<td>" + savingsPlan[i]["Grade"] + "</td>";
        tableOutput += "<td>" + savingsPlan[i]["Mil Monthly"].toLocaleString("en-US", moneyStyle) + "</td>";
        tableOutput += "<td>" + savingsPlan[i]["Monthly Deposit"].toLocaleString("en-US", moneyStyle) + "</td>";
        tableOutput += "<td>" + savingsPlan[i]["Civ Annual"].toLocaleString("en-US", moneyStyle) + "</td>";
        tableOutput += "</tr>";
    }
    tableOutput += "</tbody></table>";
    return tableOutput;
}
function createSavingsChart(savingsPlan, id, returnRate) {
    // Destroy current chart if it exists
    // @ts-ignore
    if (Chart.getChart(id) != null) {
        // @ts-ignore
        Chart.getChart(id).destroy();
    }
    var ctx = document.getElementById(id).getContext('2d');
    var data = {
        // Labels are months
        labels: [],
        datasets: [
            {
                label: 'Mil Monthly',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                order: 2
            },
            {
                label: 'Monthly Deposit',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                order: 2
            },
            {
                label: 'Savings',
                data: [],
                borderWidth: 4,
                borderColor: 'rgb(0, 102, 204)',
                type: 'line',
                yAxisID: 'y1',
                pointRadius: 0,
                pointHitRadius: 5,
                order: 1
            }
        ]
    };
    var monthlyReturnRate = returnRate / 12;
    var savings = 0;
    for (var i in savingsPlan) {
        savings *= (1 + monthlyReturnRate);
        savings += savingsPlan[i]["Monthly Deposit"];
        data.labels.push(savingsPlan[i]["Date"].toLocaleDateString("en-US", { month: 'short', year: 'numeric', timeZone: 'UTC' }));
        data.datasets[0].data.push(savingsPlan[i]["Mil Monthly"]);
        data.datasets[1].data.push(savingsPlan[i]["Monthly Deposit"]);
        data.datasets[2].data.push(savings);
    }
    // @ts-ignore
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true
                },
                y1: {
                    position: 'right'
                }
            }
        }
    });
}
function createWithdrawalTableAndChart(startFunds, monthlyWithdrawal, startDate, endDate, colaRate, interestRate, chartId) {
    // Date, Balance, Withdrawal, Change in Balance 
    var tableOutput = "";
    // Destroy current chart if it exists
    // @ts-ignore
    if (Chart.getChart(chartId) != null) {
        // @ts-ignore
        Chart.getChart(chartId).destroy();
    }
    var ctx = document.getElementById(chartId).getContext('2d');
    var red = 'rgba(255, 99, 132, 0.6)';
    var green = 'rgba(75, 192, 192, 0.6)';
    var data = {
        labels: [],
        datasets: [
            {
                label: "Savings Balance",
                data: [],
                borderWidth: 4,
                borderColor: 'rgb(75, 192, 192)',
                type: 'line',
                pointRadius: 0,
                pointHitRadius: 5,
                order: 1,
                yAxisID: 'y'
            },
            {
                label: "Change in Balance",
                data: [],
                backgroundColor: [],
                borderColor: [],
                yAxisID: 'y1',
                barPercentage: 1,
                categoryPercentage: 1,
                order: 2
            }
        ]
    };
    // Add table header
    tableOutput += "<thead><tr>\n                    <th scope='col'>Date</th>\n                    <th scope='col'>Savings Balance</th>\n                    <th scope='col'>Pension / Withdrawal</th>\n                    <th scope='col'>Balance Change</th>\n                    </tr></thead>\n                    <tbody>";
    // Add table rows
    var moneyStyle = { style: "currency", currency: "USD" };
    var months = 0;
    var totalMonths = monthsDifference(startDate, endDate);
    var balance = startFunds;
    var lastBalance = startFunds;
    for (var months_1 = 0; months_1 < totalMonths; ++months_1) {
        var currentDate = addMonths(startDate, months_1);
        if (currentDate.getUTCMonth() == 0) {
            monthlyWithdrawal *= (1 + colaRate);
        }
        tableOutput += "<tr>";
        tableOutput += "<th scope='row'>" + currentDate.toLocaleDateString("en-US", { month: 'short', year: 'numeric', timeZone: 'UTC' }) + "</th>";
        tableOutput += "<td>" + balance.toLocaleString("en-US", moneyStyle) + "</td>";
        tableOutput += "<td>" + monthlyWithdrawal.toLocaleString("en-US", moneyStyle) + "</td>";
        tableOutput += "<td>" + (balance - lastBalance).toLocaleString("en-US", moneyStyle) + "</td>";
        tableOutput += "</tr>";
        data.labels.push(currentDate.toLocaleDateString("en-US", { month: 'short', year: 'numeric', timeZone: 'UTC' }));
        data.datasets[0].data.push(balance);
        data.datasets[1].data.push(balance - lastBalance);
        if (balance - lastBalance >= 0) {
            data.datasets[1].backgroundColor.push(green);
        }
        else {
            data.datasets[1].backgroundColor.push(red);
        }
        lastBalance = balance;
        balance = calculateInterest(balance - monthlyWithdrawal, interestRate / 12, 1, 1);
    }
    // @ts-ignore
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            scales: {
                y1: {
                    position: 'right'
                }
            }
        }
    });
    tableOutput += "</tbody></table>";
    return tableOutput;
}
function calculateRetirementPlan() {
    return __awaiter(this, void 0, void 0, function () {
        var payscale, bah2, bas, etsDate, milTotalYOS, civRetireOffset, birthday, lifeExpectancy, eadDate, payDate, colaRate, savingsReturnRate, retirementSystem, milRetireDate, civRetireDate, lifeExpectancyDate, savingsTime, retirementLength, predictions, monthlyPension, annualPension, adjustedPension, reqSavings, savingsPlan, moneyStyle, monthlyDeposit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Start spinner icon
                    document.getElementById("calcSpinner").setAttribute("class", "spinner-border");
                    return [4 /*yield*/, fetch("./2021_payscale.json")];
                case 1: return [4 /*yield*/, (_a.sent()).json()];
                case 2:
                    payscale = _a.sent();
                    return [4 /*yield*/, fetch("./2021_bah2.json")];
                case 3: return [4 /*yield*/, (_a.sent()).json()];
                case 4:
                    bah2 = _a.sent();
                    bas = { "O": 266.18, "E": 386.50 };
                    etsDate = document.getElementById("etsDate").valueAsDate;
                    milTotalYOS = document.getElementById("milRetireYOS").valueAsNumber;
                    civRetireOffset = document.getElementById("civRetireOffset").valueAsNumber;
                    birthday = document.getElementById("birthday").valueAsDate;
                    lifeExpectancy = document.getElementById("lifeExpectancy").valueAsNumber;
                    eadDate = document.getElementById("eadDate").valueAsDate;
                    payDate = document.getElementById("payDate").valueAsDate;
                    colaRate = document.getElementById("colaRate").valueAsNumber / 100;
                    savingsReturnRate = document.getElementById("savingsReturnRate").valueAsNumber / 100;
                    retirementSystem = parseFloat(document.getElementById("retireSystem").value);
                    milRetireDate = addMonths(eadDate, milTotalYOS * 12);
                    civRetireDate = addMonths(milRetireDate, civRetireOffset * 12);
                    lifeExpectancyDate = addMonths(birthday, lifeExpectancy * 12);
                    savingsTime = civRetireDate.getFullYear() - etsDate.getFullYear();
                    retirementLength = lifeExpectancyDate.getFullYear() - civRetireDate.getFullYear();
                    predictions = predictPay(etsDate, milRetireDate, eadDate, payDate, colaRate, officerPromotionTimeline, payscale, bah2, bas);
                    monthlyPension = predictions["High 3"] * milTotalYOS * retirementSystem;
                    annualPension = predictions["High 3"] * milTotalYOS * retirementSystem * 12;
                    adjustedPension = annualPension * Math.pow((1 + colaRate), civRetireOffset);
                    reqSavings = requiredSavings(retirementLength, adjustedPension, savingsReturnRate, colaRate, 1, civRetireDate.getUTCMonth());
                    savingsPlan = equivalentRetirement(reqSavings, savingsTime, savingsReturnRate, predictions["Predicted Pay"], colaRate);
                    moneyStyle = { style: "currency", currency: "USD" };
                    monthlyDeposit = depositsNeeded(reqSavings, 0, savingsReturnRate, savingsTime);
                    document.getElementById("pension").innerHTML = "" + annualPension.toLocaleString("en-US", moneyStyle) + (civRetireOffset != 0 ? " (" + adjustedPension.toLocaleString("en-US", moneyStyle) + ")" : "");
                    document.getElementById("requiredSavings").innerHTML = reqSavings.toLocaleString("en-US", moneyStyle);
                    document.getElementById("monthlySavings").innerHTML = monthlyDeposit.toLocaleString("en-US", moneyStyle);
                    document.getElementById("annualSavings").innerHTML = (monthlyDeposit * 12).toLocaleString("en-US", moneyStyle);
                    document.getElementById("retireTable").innerHTML = createSavingsTable(savingsPlan);
                    createSavingsChart(savingsPlan, "savingsChart", savingsReturnRate);
                    document.getElementById("withdrawalTable").innerHTML = createWithdrawalTableAndChart(reqSavings, adjustedPension / 12, civRetireDate, lifeExpectancyDate, colaRate, savingsReturnRate, "withdrawalChart");
                    // Stop spinner icon and reveal tabs
                    document.getElementById("calcSpinner").setAttribute("class", "");
                    document.getElementById("myTab").removeAttribute("hidden");
                    return [2 /*return*/];
            }
        });
    });
}
