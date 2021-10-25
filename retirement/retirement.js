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
var payscale;
var bah2;
// Average promotion timeline for officers. YOS is based on AFCS career.
// Each index is linked between the two lists
var promotionTimeline = {
    "Career YOS": [0, 1.5, 4, 10, 16, 22],
    "Grade": ["O-1", "O-2", "O-3", "O-4", "O-5", "O-6"] // Grade Promoted To
};
var enlistedPromotionTimeline = {
    "Career YOS": [0, .333, 0.5, 1.5, 3,
        5, 8, 12, 18, 22],
    "Grade": ["E-1 <4 Mon", "E-1 >4 Mon", "E-2", "E-3", "E-4",
        "E-5", "E-6", "E-7", "E-8", "E-9"] // Grade Promoted To
};
var officerPromotionTimeline = {
    "Career YOS": [0, 1.5, 4, 10, 16, 22],
    "Grade": ["O-1", "O-2", "O-3", "O-4", "O-5", "O-6"] // Grade Promoted To
};
var techWarrantPromotionTimeline = {
    "Career YOS": [0, .333, 0.5, 1.5, 3,
        5, 8, 10, 12, 16, 20, 24],
    "Grade": ["E-1 <4 Mon", "E-1 >4 Mon", "E-2", "E-3", "E-4",
        "E-5", "E-6", "W-1", "W-2", "W-3", "W-4", "W-5"] // Grade Promoted To
};
var grades = [
    'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6', 'O-7', 'O-8', 'O-9', 'O-10',
    'W-1', 'W-2', 'W-3', 'W-4', 'W-5',
    'E-1 <4 Mon', 'E-1 >4 Mon', 'E-2', 'E-3', 'E-4',
    'E-5', 'E-6', 'E-7', 'E-8', 'E-9',
];
var COA;
(function (COA) {
    COA[COA["ActiveDuty"] = 0] = "ActiveDuty";
    COA[COA["Reserves"] = 1] = "Reserves";
    COA[COA["FullETS"] = 2] = "FullETS";
})(COA || (COA = {}));
/**
 * Compute compound interest.
 * @param P - Principal: Starting funds.
 * @param r - Interest rate in decimal. (0.05, not 5%)
 * @param t - Time period.
 * @param n - Number of times the interest is compounded per period.
 * @returns {number} Final value after the compound interest.
 */
function calculateInterest(P, r, t, n) {
    return P * Math.pow((1 + (r / n)), (n * t));
}
/**
 * Determines how much your monthly deposit must be to reach a savings goal within
 *  a specified time period.
 * @param goalFunds - The target savings goal.
 * @param startFunds - Savings available at the start of the period.
 * @param annualReturnRate - Annual interest rate in decimal. (0.05, not 5%)
 * @param years - Savings time period. Accepts fractional years. (1.5 years === 18 months)
 * @returns {number} Monthly deposit needed to reach the savings goal.
 */
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
/**
 * Calculates how much your savings will be worth given periodic deposits
 * @param startFunds
 * @param monthlyDeposits
 * @param annualReturnRate
 * @param months
 * @returns
 */
function savingsAfterDeposits(startFunds, monthlyDeposits, annualReturnRate, months) {
    var monthlyReturnRate = annualReturnRate / 12;
    return startFunds * (Math.pow((1 + monthlyReturnRate), (months))) + monthlyDeposits * (Math.pow((1 + monthlyReturnRate), (months)) - 1) / monthlyReturnRate;
}
/**
 * Wrapper to calculate compound interest for a single year.
 * @param startFunds - Funds at the start of the period.
 * @param annualReturnRate - Annual return rate in decimal. (0.05, not 5%)
 * @returns {number} Final value after a year of compound interest.
 */
function annualGains(startFunds, annualReturnRate) {
    return calculateInterest(startFunds, annualReturnRate, 1, 12);
}
/**
 * Calculate the difference in months between two dates.
 * @param startDate - Starting date.
 * @param endDate - Ending date.
 * @returns {number} The months difference between the two dates.
 */
function monthsDifference(startDate, endDate) {
    return (endDate.getFullYear() * 12 + endDate.getUTCMonth()) - (startDate.getFullYear() * 12 + startDate.getUTCMonth());
}
/**
 * Adds months to a given date. Performs all calculations on the months value.
 *  (e.g. 2-Feb-2020 + 2 months = 2-Apr-2020)
 * @param startDate - Starting date.
 * @param months - How many months to add on.
 * @returns {Date} The resulting date after adding on the months.
 */
function addMonths(startDate, months) {
    return new Date(startDate.getFullYear(), startDate.getUTCMonth() + months, startDate.getUTCDate());
}
/**
 * Determines the correct grade based on a given promotion timeline.
 * @param yearsOfService - Current career years of service.
 * @param promotionTimeline - Timeline to calculate grade from.
 * @returns {string} Current paygrade.
 */
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
/**
 * Determines current base pay based on years of service and paygrade.
 * @param yearsOfService
 * @param payGrade
 * @param payscale
 * @returns {number} Current base pay.
 */
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
/**
 * Determines BAH2-entitlement based on paygrade and dependent status.
 * @param payGrade
 * @param dependents
 * @param bah
 * @returns {number} BAH2 entitlement
 */
function getBAH2(payGrade, dependents, bah) {
    if (dependents) {
        return bah[payGrade]["With Dependents"];
    }
    else {
        return bah[payGrade]["Without Dependents"];
    }
}
/**
 * Determines BAS-entitlement based on officer/enlisted status.
 * @param payGrade
 * @param bas
 * @returns {number} BAS entitlement
 */
function getBAS(payGrade, bas) {
    if (payGrade[0] == "O" || payGrade[0] == "W") {
        return bas.O;
    }
    else if (payGrade[0] == "E") {
        return bas.E;
    }
    return -1;
}
/**
 * Calculate how many years a given amount of funds will last in retirement.
 * @param funds - Starting retirement funds.
 * @param annualReturnRate - Annual return rate in decimal. (0.05, not 5%)
 * @param annualWithdrawal - Total funds withdrawn from savings every year. Will be divided into monthly withdrawals.
 * @param colaRate - Rate of annual cost-of-living adjustments in decimal. (0.03, not 3%) Used to increase withdrawals to compensate for inflation.
 * @param {number} [startMonth=0] - The 0-indexed month retirement will start. Used to determine correct time for COLA increases.
 * @param {[number,number]} [reduction=null] - Defined if we're calculating for a reserves retirement. [0] is how many months before reaching full retirement. [1] is the reserves pension.
 * @param {boolean} [verbose=false] - Print value of funds over time to the console.
 * @returns {number} How many months the funds will last.
 */
function retirementLength(funds, annualReturnRate, annualWithdrawal, colaRate, startMonth, reduction, verbose) {
    if (startMonth === void 0) { startMonth = 0; }
    if (reduction === void 0) { reduction = null; }
    if (verbose === void 0) { verbose = false; }
    var months = 0;
    var colaIncreases = 0;
    var monthlyWithdrawal = annualWithdrawal / 12;
    var monthlyReturnRate = annualReturnRate / 12;
    if (reduction != null && reduction[0] < 0) {
        monthlyWithdrawal -= reduction[1] / 12;
    }
    if (verbose) {
        console.log("Months,Funds,Change,Withdrawal");
    }
    while (funds > 0 && funds != Infinity) {
        months += 1;
        if ((months + startMonth) % 12 == 0) {
            monthlyWithdrawal *= (1 + colaRate);
            colaIncreases++;
        }
        // If we're calculating for a reserves retirement, account for the pension after reaching full retirement age
        if (reduction != null && months == reduction[0]) {
            monthlyWithdrawal -= (reduction[1] / 12) * Math.pow((1 + colaRate), colaIncreases);
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
/**
 * Performs a binary-search to determine how much savings are needed to sustain a specified withdrawal rate for a given number of years.
 * @param yearsRequired - How many years the savings need to last.
 * @param annualWithdrawal - How much will be withdrawn each year. Is divided into monthly withdrawals.
 * @param annualReturnRate - The annual return rate for the savings in decimal. (0.05, not 5%)
 * @param colaRate - Rate of annual cost-of-living adjustments in decimal. (0.03, not 3%) Used to increase withdrawals to compensate for inflation.
 * @param {number} [accuracy=1.0] - How many years above `yearsRequired` can the result be?
 * @param {number} [startMonth=0] - The 0-indexed month retirement will start. Used to determine correct time for COLA increases.
 * @param {[number,number]} [reduction=null] - Defined if we're calculating for a reserves retirement. [0] is how many months before reaching full retirement. [1] is the reserves pension.
 * @param {boolean} [verbose=false] - Print value of funds over time to the console.
 * @returns {number} Retirement savings needed.
 */
function requiredSavings(yearsRequired, annualWithdrawal, annualReturnRate, colaRate, accuracy, startMonth, reduction, verbose) {
    if (accuracy === void 0) { accuracy = 1.0; }
    if (startMonth === void 0) { startMonth = 0; }
    if (reduction === void 0) { reduction = null; }
    if (verbose === void 0) { verbose = false; }
    var upperLimit = annualWithdrawal * yearsRequired;
    if (colaRate != 0) {
        upperLimit = (annualWithdrawal * (1 - Math.pow((1 + colaRate), yearsRequired))) / (1 - (1 + colaRate)); // Sum of finite exponential series
    }
    var lowerLimit = 0;
    var funds = upperLimit / 2;
    var calculatedYears = 0;
    while ((calculatedYears < yearsRequired || calculatedYears > yearsRequired + accuracy) && Math.abs(upperLimit - lowerLimit) > 0.00001) {
        calculatedYears = retirementLength(funds, annualReturnRate, annualWithdrawal, colaRate, startMonth, reduction);
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
function calcReservesPension(startDate, endDate, startingPoints, retirementSystem, high3) {
    var percent = ((endDate.getUTCFullYear() - startDate.getUTCFullYear()) * 73 + startingPoints) / 360 * retirementSystem;
    return high3 * percent;
}
function calc401kContributionRate(contributionLimit) {
    return contributionLimit / 12;
}
/**
 * Generate a table showing pay for a person over their military career.
 * @param startDate - Date to begin predictions from. (e.g. ETS date or EAD date)
 * @param endDate - Date to stop predictions. (e.g. retirement date)
 * @param eadDate - Date this person entered active-duty.
 * @param payDate - Date that DFAS will use to determine pay for this person. Usually the same as their EAD date.
 * @param annualRaiseRate - Rate of annual raises used to offset inflation. Must be in decimal. (0.05, not 5%)
 * @param promotionTimeline - Expected timeline of this person's promotions.
 * @param payscale - Military payscale chart to use.
 * @param bah - Chart of BAH rates to use.
 * @param bas - Dictionary of BAS entitlements to use.
 * @param {boolean} [verbose=false] - Print table to the console.
 * @returns Dictionary of predicted pay over time, and calculated High-3.
 */
function predictPay(startDate, endDate, eadDate, payDate, annualRaiseRate, promotionTimeline, payscale, bah, bas, verbose) {
    if (verbose === void 0) { verbose = false; }
    var today = new Date();
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
        var currentRaise = Math.pow(annualRaiseRate, (currentDate.getFullYear() - today.getFullYear()));
        var grade = getCurrentGrade(careerYOS, promotionTimeline);
        var basePay = getCurrentPay(payYOS, grade, payscale) * currentRaise;
        var bonuses = (getBAH2(grade, true, bah) + getBAS(grade, bas)) * currentRaise;
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
        "High 3": high3
    };
}
/**
 * Generate a table showing how much civilian pay a person needs to both match military pay AND save enough to match the military pension after retirement.
 * @param targetSavings - Savings needed to match the military pension.
 * @param years - How many years spent saving.
 * @param annualReturnRate - Annual return rate for savings balance in decimal. (0.05, not 5%)
 * @param predictedPay - Table of predicted military pay over time.
 * @param colaRate - Rate of annual cost-of-living adjustments. Used to continue increasing final military pay if our savings period goes beyond the predicted pay table.
 * @param payAdjustment - The ratio to change active-duty pay by
 * @param {boolean} [verbose=false] - Print the table to the console.
 * @returns List of dictionaries containing the savings plan.
 */
function equivalentRetirement(targetSavings, years, annualReturnRate, predictedPay, colaRate, payAdjustment, endDate, verbose) {
    if (payAdjustment === void 0) { payAdjustment = 1.0; }
    if (endDate === void 0) { endDate = null; }
    if (verbose === void 0) { verbose = false; }
    var monthlyDeposit = depositsNeeded(targetSavings, 0, annualReturnRate, years);
    var startDate = predictedPay[0]["Date"];
    var currentPrediction = { "Date": startDate };
    var savingsPlan = [];
    if (verbose) {
        console.log("Date,Monthly Civ Pay,Monthly Savings,Annual Civ Pay,Annual Savings,COLA");
    }
    for (var month = 0; month < years * 12 && (endDate == null || currentPrediction["Date"] <= endDate); ++month) {
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
        var civilianMonthlyPay = (currentPrediction["Base Pay"] + currentPrediction["Bonuses"]) * payAdjustment + monthlyDeposit;
        var civilianAnnualPay = civilianMonthlyPay * 12;
        savingsPlan.push({
            "Date": currentPrediction["Date"],
            "Grade": currentPrediction["Grade"],
            "Mil Monthly": (currentPrediction["Base Pay"] + currentPrediction["Bonuses"]) * payAdjustment,
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
function removeChildNodes(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}
/**
 * Force the given HTML element to be within a specified range.
 * @param id - HTML element's ID.
 * @param min - Minimum value.
 * @param max - Maximum value.
 */
function validateInput(id, min, max) {
    var value = document.getElementById(id).valueAsNumber;
    value = value < min ? min : value;
    value = value > max ? max : value;
    document.getElementById(id).value = value.toString();
}
/**
 * Create an HTML table based on a given savings plan.
 * @param savingsPlan
 * @param tableId - ID of table element to clear and populate
 */
function createSavingsTable(savingsPlan, tableId) {
    var table = document.getElementById(tableId);
    var strOutput = "";
    removeChildNodes(table);
    var tableOutput = document.createDocumentFragment();
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');
    // Add table headers
    var headers = ['Date', 'Pay Grade', 'Active-Duty Monthly Pay', 'Monthly Retirement Savings', 'Equivalent Annual Civilian Pay'];
    var newRow = thead.insertRow();
    for (var i in headers) {
        var newCell = document.createElement('th');
        newCell.setAttribute('scope', 'col');
        newCell.textContent = headers[i];
        strOutput += (i != '0' ? ',' : '') + headers[i];
        newRow.appendChild(newCell);
    }
    tableOutput.appendChild(thead);
    // Add table rows
    var moneyStyle = { style: "currency", currency: "USD" };
    for (var i in savingsPlan) {
        var newRow_1 = tbody.insertRow();
        strOutput += '\n';
        // Add header cell
        var headerCell = document.createElement('th');
        headerCell.textContent = savingsPlan[i]["Date"].toLocaleDateString("en-US", { month: 'short', year: 'numeric', timeZone: 'UTC' });
        headerCell.setAttribute('scope', 'row');
        newRow_1.appendChild(headerCell);
        // Add remaining cells
        newRow_1.insertCell().textContent = savingsPlan[i]["Grade"];
        newRow_1.insertCell().textContent = savingsPlan[i]["Mil Monthly"].toLocaleString("en-US", moneyStyle);
        newRow_1.insertCell().textContent = savingsPlan[i]["Monthly Deposit"].toLocaleString("en-US", moneyStyle);
        newRow_1.insertCell().textContent = savingsPlan[i]["Civ Annual"].toLocaleString("en-US", moneyStyle);
        // Add text to CSV output
        strOutput += "\"" + savingsPlan[i]["Date"].toLocaleDateString("en-US", { month: 'short', year: 'numeric', timeZone: 'UTC' }) + "\",";
        strOutput += "\"" + savingsPlan[i]["Grade"] + "\",";
        strOutput += "\"" + savingsPlan[i]["Mil Monthly"].toLocaleString("en-US", moneyStyle) + "\",";
        strOutput += "\"" + savingsPlan[i]["Monthly Deposit"].toLocaleString("en-US", moneyStyle) + "\",";
        strOutput += "\"" + savingsPlan[i]["Civ Annual"].toLocaleString("en-US", moneyStyle) + "\",";
    }
    tableOutput.appendChild(tbody);
    table.appendChild(tableOutput);
    return strOutput;
}
/**
 * Create a savings plan graph on an HTML canvas using a given savings plan and annual return rate.
 * @param savingsPlan
 * @param id - HTML element ID for desired canvas.
 * @param returnRate
 */
function createSavingsChart(savingsPlan, returnRate, chartId, startingFunds) {
    if (startingFunds === void 0) { startingFunds = 0; }
    // Destroy current chart if it exists
    // @ts-ignore
    if (Chart.getChart(chartId) != null) {
        // @ts-ignore
        Chart.getChart(chartId).destroy();
    }
    // Grab context for the HTML canvas
    var ctx = document.getElementById(chartId).getContext('2d');
    // Setup Chart.js data.
    var data = {
        // Labels are months
        labels: [],
        datasets: [
            {
                label: 'Active-Duty Monthly Pay',
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
            },
            {
                label: 'Savings Gains',
                data: [],
                backgroundColor: 'rgba(255, 178, 102, 0.6)',
                order: 2
            },
        ]
    };
    // Populate data
    var monthlyReturnRate = returnRate / 12;
    var savings = startingFunds;
    for (var i in savingsPlan) {
        // Increase savings each month
        var gains = savings * monthlyReturnRate;
        savings += savingsPlan[i]["Monthly Deposit"] + gains;
        // Push data into Chart.js
        data.labels.push(savingsPlan[i]["Date"].toLocaleDateString("en-US", { month: 'short', year: 'numeric', timeZone: 'UTC' }));
        data.datasets[0].data.push(savingsPlan[i]["Mil Monthly"]);
        data.datasets[1].data.push(savingsPlan[i]["Monthly Deposit"]);
        data.datasets[2].data.push(savings);
        data.datasets[3].data.push(gains);
    }
    // Generate the Chart.js object
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
                    stacked: true,
                    title: {
                        text: 'Monthly Pay and Deposit',
                        display: true
                    },
                    ticks: {
                        callback: function (value, index, values) {
                            return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
                        }
                    }
                },
                y1: {
                    position: 'right',
                    title: {
                        text: 'Savings Balance',
                        display: true
                    },
                    ticks: {
                        callback: function (value, index, values) {
                            return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
                        }
                    }
                }
            }
        }
    });
}
/**
 * Create HTML table and Chart.js graph for predicted withdrawals from retirement savings.
 * @param startFunds - Retirement savings.
 * @param monthlyWithdrawal - Initial monthly withdrawals.
 * @param startDate - Start date of retirement.
 * @param endDate - End date of retirement.
 * @param colaRate - Rate of annual cost-of-living adjustments. Used to increase amount of withdrawals each year.
 * @param interestRate - Rate of return for savings balance.
 * @param tableId - HTML Table Element ID to create the table in.
 * @param chartId - HTML Canvas ID to create the graph on.
 */
function createWithdrawalTableAndChart(startFunds, monthlyWithdrawal, startDate, endDate, colaRate, interestRate, tableId, chartId, reduction) {
    if (reduction === void 0) { reduction = null; }
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
                borderColor: 'rgb(0, 102, 204)',
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
    var table = document.getElementById(tableId);
    removeChildNodes(table);
    var strOutput = "";
    var tableOutput = document.createDocumentFragment();
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');
    var headers = ['Date', 'Savings Balance', 'Withdrawal', 'Balance Change'];
    var newRow = thead.insertRow();
    for (var i in headers) {
        var newCell = document.createElement('th');
        newCell.setAttribute('scope', 'col');
        newCell.textContent = headers[i];
        strOutput += (i != '0' ? ',' : '') + headers[i];
        newRow.appendChild(newCell);
    }
    tableOutput.appendChild(thead);
    // Add table rows
    var moneyStyle = { style: "currency", currency: "USD" };
    var colaIncreases = 0;
    var totalMonths = monthsDifference(startDate, endDate);
    var balance = startFunds;
    var lastBalance = startFunds;
    // If we've already passed our reserves retirement date, reduce our withdrawals now
    if (reduction != null && reduction[0] < 0) {
        monthlyWithdrawal -= reduction[1] / 12;
    }
    for (var months = 0; months < totalMonths; ++months) {
        // Go forward one month and raise withdrawal rate if it's January
        var currentDate = addMonths(startDate, months);
        if (currentDate.getUTCMonth() == 0) {
            monthlyWithdrawal *= (1 + colaRate);
            colaIncreases++;
        }
        if (reduction != null && months == reduction[0]) {
            monthlyWithdrawal -= (reduction[1] / 12) * Math.pow((1 + colaRate), (colaIncreases));
        }
        // Add new row to the table
        var newRow_2 = tbody.insertRow();
        strOutput += '\n';
        // Add header cell
        var headerCell = document.createElement('th');
        headerCell.textContent = currentDate.toLocaleDateString("en-US", { month: 'short', year: 'numeric', timeZone: 'UTC' });
        headerCell.setAttribute('scope', 'row');
        newRow_2.appendChild(headerCell);
        // Add remaining cells
        newRow_2.insertCell().textContent = balance.toLocaleString("en-US", moneyStyle);
        newRow_2.insertCell().textContent = monthlyWithdrawal.toLocaleString("en-US", moneyStyle);
        newRow_2.insertCell().textContent = (balance - lastBalance).toLocaleString("en-US", moneyStyle);
        // Add data to CSV output
        strOutput += "\"" + currentDate.toLocaleDateString("en-US", { month: 'short', year: 'numeric', timeZone: 'UTC' }) + "\",";
        strOutput += "\"" + balance.toLocaleString("en-US", moneyStyle) + "\",";
        strOutput += "\"" + monthlyWithdrawal.toLocaleString("en-US", moneyStyle) + "\",";
        strOutput += "\"" + (balance - lastBalance).toLocaleString("en-US", moneyStyle) + "\",";
        // Add data to chart
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
    // Create the table
    tableOutput.appendChild(tbody);
    table.appendChild(tableOutput);
    // Create the chart
    // @ts-ignore
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    title: {
                        text: 'Savings Balance',
                        display: true
                    },
                    ticks: {
                        callback: function (value, index, values) {
                            return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
                        }
                    }
                },
                y1: {
                    position: 'right',
                    title: {
                        text: 'Change in Balance',
                        display: true
                    },
                    ticks: {
                        callback: function (value, index, values) {
                            return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
                        }
                    }
                }
            }
        }
    });
    return strOutput;
}
// Sets the ETS Date input as required for the Reserves and Full ETS options
function setETSDateRequirement() {
    var currCOA = parseInt(document.getElementById("coaSelect").value);
    if (currCOA == COA.ActiveDuty) {
        document.getElementById("etsDate").required = false;
    }
    else {
        document.getElementById("etsDate").required = true;
    }
}
function createDownloadButton(filename, data, buttonText, classAttr) {
    if (classAttr === void 0) { classAttr = 'btn btn-primary'; }
    var element = document.createElement('a');
    var b64_data = btoa(data);
    element.setAttribute('class', classAttr);
    element.setAttribute('href', "data:text/plain;base64," + b64_data);
    element.setAttribute('download', filename);
    element.textContent = buttonText;
    return element;
}
// Retrieves values from all DOM input fields and places them in the provided dictionaries
function getDOMInputs(dates, inputs) {
    // Personal Data
    dates.eadDate = document.getElementById("eadDate").valueAsDate;
    dates.payDate = document.getElementById("payDate").valueAsDate;
    inputs.milTotalYOS = document.getElementById("milRetireYOS").valueAsNumber;
    inputs.retirementSystem = parseFloat(document.getElementById("retireSystem").value);
    dates.birthday = document.getElementById("birthday").valueAsDate;
    inputs.lifeExpectancy = document.getElementById("lifeExpectancy").valueAsNumber;
    // Alternative COAs
    inputs.COA = parseInt(document.getElementById("coaSelect").value);
    if (inputs.COA != COA.ActiveDuty) {
        dates.etsDate = document.getElementById("etsDate").valueAsDate;
    }
    inputs.civRetireOffset = document.getElementById("civRetireOffset").valueAsNumber;
    inputs.annuityAdjustment = document.getElementById("annuityAdjustment").valueAsNumber / 100;
    inputs.payAdjustment = document.getElementById("payAdjustment").valueAsNumber / 100;
    // Market Performance
    inputs.colaRate = document.getElementById("colaRate").valueAsNumber / 100;
    inputs.savingsReturnRate = document.getElementById("savingsReturnRate").valueAsNumber / 100;
    inputs.retirementReturnRate = document.getElementById("retirementReturnRate").valueAsNumber / 100;
}
/**
 * Calculate retirement plan upon a button press from the user. Fetches JSON data, values from input fields, and outputs the results to the webpage.
 */
function calculateRetirementPlan() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, bas, dates, inputs, milRetireDate, civRetireDate, sixtyBirthday, lifeExpectancyDate, greyAreaYears, retirementLength, predictions, monthlyPension, annualPension, activePoints, reservesPoints, adjustedPension, reservesPension, adjustedReservesPension, reduction, reqSavings, moneyStyle, savingsTime, startingFunds, savingsPlan, monthlyDeposit, savingsTableData, withdrawalTableData;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    // Start spinner icon
                    document.getElementById("calcSpinner").hidden = false;
                    if (!(payscale !== null && payscale !== void 0)) return [3 /*break*/, 1];
                    _a = payscale;
                    return [3 /*break*/, 4];
                case 1: return [4 /*yield*/, fetch("./2021_payscale.json")];
                case 2: return [4 /*yield*/, (_c.sent()).json()];
                case 3:
                    _a = _c.sent();
                    _c.label = 4;
                case 4:
                    // Fetch payscale and BAH charts
                    payscale = _a;
                    if (!(bah2 !== null && bah2 !== void 0)) return [3 /*break*/, 5];
                    _b = bah2;
                    return [3 /*break*/, 8];
                case 5: return [4 /*yield*/, fetch("./2021_bah2.json")];
                case 6: return [4 /*yield*/, (_c.sent()).json()];
                case 7:
                    _b = _c.sent();
                    _c.label = 8;
                case 8:
                    bah2 = _b;
                    bas = { "O": 266.18, "E": 386.50 };
                    dates = {};
                    inputs = {};
                    getDOMInputs(dates, inputs);
                    milRetireDate = addMonths(dates.eadDate, inputs.milTotalYOS * 12);
                    civRetireDate = addMonths(milRetireDate, inputs.civRetireOffset * 12);
                    sixtyBirthday = addMonths(dates.birthday, 60 * 12);
                    lifeExpectancyDate = addMonths(dates.birthday, inputs.lifeExpectancy * 12);
                    greyAreaYears = monthsDifference(civRetireDate, sixtyBirthday) / 12;
                    /* ************************
                       * Perform calculations *
                       ************************ */
                    if (inputs.COA == COA.ActiveDuty) {
                        // Allows COLA-increases to work for the Active-Duty case
                        dates.etsDate = new Date();
                        inputs.annuityAdjustment = 1.0;
                        inputs.civRetireOffset = 0;
                        civRetireDate = milRetireDate;
                    }
                    retirementLength = lifeExpectancyDate.getUTCFullYear() - civRetireDate.getUTCFullYear();
                    predictions = predictPay(dates.etsDate, milRetireDate, dates.eadDate, dates.payDate, inputs.colaRate, promotionTimeline, payscale, bah2, bas);
                    monthlyPension = predictions["High 3"] * inputs.milTotalYOS * inputs.retirementSystem;
                    annualPension = predictions["High 3"] * inputs.milTotalYOS * inputs.retirementSystem * 12;
                    activePoints = 365 * monthsDifference(dates.eadDate, dates.etsDate) / 12;
                    reservesPoints = 72 * monthsDifference(dates.etsDate, milRetireDate) / 12;
                    adjustedPension = annualPension * Math.pow((1 + inputs.colaRate), inputs.civRetireOffset) * inputs.annuityAdjustment;
                    reservesPension = predictions["High 3"] * (activePoints + reservesPoints) / 360 * inputs.retirementSystem * 12;
                    adjustedReservesPension = reservesPension * Math.pow((1 + inputs.colaRate), Math.floor(monthsDifference(milRetireDate, sixtyBirthday) / 12)) * inputs.annuityAdjustment;
                    reduction = (inputs.COA == COA.Reserves) ? [greyAreaYears * 12, reservesPension] : null;
                    reqSavings = requiredSavings(retirementLength, adjustedPension, inputs.retirementReturnRate, inputs.colaRate, 1, civRetireDate.getUTCMonth(), reduction);
                    moneyStyle = { style: "currency", currency: "USD" };
                    // The Required Savings output will always be shown for every case
                    document.getElementById("requiredSavings").textContent = reqSavings.toLocaleString("en-US", moneyStyle);
                    document.getElementById("requiredSavingsGroup").hidden = false;
                    startingFunds = 0;
                    // Case for not staying on active-duty
                    if (inputs.COA != COA.ActiveDuty) {
                        document.getElementById("pension").textContent = "" + annualPension.toLocaleString("en-US", moneyStyle) + (inputs.civRetireOffset != 0 ? " (" + adjustedPension.toLocaleString("en-US", moneyStyle) + ")" : "");
                        // Case for transferring to reserves
                        if (inputs.COA == COA.Reserves) {
                            document.getElementById("reservesPension").textContent = reservesPension.toLocaleString("en-US", moneyStyle) + " (" + adjustedReservesPension.toLocaleString("en-US", moneyStyle) + ")";
                            document.getElementById("reservesPensionGroup").hidden = false;
                        }
                        else {
                            document.getElementById("reservesPensionGroup").hidden = true;
                        }
                        // Assume savings start from ETS date
                        savingsTime = civRetireDate.getUTCFullYear() - dates.etsDate.getUTCFullYear();
                        savingsPlan = equivalentRetirement(reqSavings, savingsTime, inputs.savingsReturnRate, predictions["Predicted Pay"], inputs.colaRate, inputs.payAdjustment);
                        monthlyDeposit = depositsNeeded(reqSavings, 0, inputs.savingsReturnRate, savingsTime);
                        document.getElementById("monthlySavings").textContent = monthlyDeposit.toLocaleString("en-US", moneyStyle);
                        document.getElementById("annualSavings").textContent = (monthlyDeposit * 12).toLocaleString("en-US", moneyStyle);
                        // Hide and display required outputs
                        document.getElementById("pensionGroup").hidden = false;
                        document.getElementById("monthlySavingsGroup").hidden = false;
                        document.getElementById("annualSavingsGroup").hidden = false;
                    }
                    // Case for staying on active-duty
                    else {
                        // Assume savings was done from the start of Active-Duty service
                        savingsTime = milRetireDate.getUTCFullYear() - dates.eadDate.getUTCFullYear();
                        savingsPlan = equivalentRetirement(reqSavings, savingsTime, inputs.savingsReturnRate, predictions["Predicted Pay"], inputs.colaRate, inputs.payAdjustment, milRetireDate);
                        startingFunds = savingsAfterDeposits(0, savingsPlan[0]["Monthly Deposit"], inputs.savingsReturnRate, monthsDifference(dates.eadDate, new Date()));
                        // Do not account for the civRetireOffset variable
                        document.getElementById("pension").textContent = "" + annualPension.toLocaleString("en-US", moneyStyle);
                        // Hide and display required outputs
                        document.getElementById("pensionGroup").hidden = false;
                        document.getElementById("reservesPensionGroup").hidden = true;
                        document.getElementById("monthlySavingsGroup").hidden = true;
                        document.getElementById("annualSavingsGroup").hidden = true;
                    }
                    savingsTableData = createSavingsTable(savingsPlan, "retireTable");
                    createSavingsChart(savingsPlan, inputs.savingsReturnRate, "savingsChart", startingFunds);
                    document.getElementById("retireTableTab").appendChild(createDownloadButton('savings.csv', savingsTableData, 'Download CSV', 'btn btn-primary mb-3'));
                    withdrawalTableData = createWithdrawalTableAndChart(reqSavings, adjustedPension / 12, civRetireDate, lifeExpectancyDate, inputs.colaRate, inputs.retirementReturnRate, "withdrawalTable", "withdrawalChart", reduction);
                    document.getElementById("withdrawalTableTab").appendChild(createDownloadButton('withdrawals.csv', withdrawalTableData, 'Download CSV', 'btn btn-primary mb-3'));
                    // Stop spinner icon and reveal tabs
                    document.getElementById("myTab").hidden = false;
                    document.getElementById("calcSpinner").hidden = true;
                    return [2 /*return*/];
            }
        });
    });
}
function createUpDownButtonCell(id) {
    var upDownCell = document.createElement('td');
    upDownCell.setAttribute("class", "align-items-center");
    var upButton = document.createElement("button");
    upButton.setAttribute("class", "btn btn-sm btn-secondary d-flex align-items-center");
    upButton.setAttribute("id", "up" + id);
    upButton.setAttribute("onclick", "moveTimelineRow(" + id + ", " + (id - 1) + ")");
    upButton.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-arrow-up-circle\" viewBox=\"0 0 16 16\"> <path fill-rule=\"evenodd\" d=\"M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z\"/> </svg>";
    var downButton = document.createElement("button");
    downButton.setAttribute("class", "btn btn-sm btn-secondary d-flex align-items-center");
    downButton.setAttribute("id", "down" + id);
    downButton.setAttribute("onclick", "moveTimelineRow(" + id + ", " + (id + 1) + ")");
    downButton.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-arrow-down-circle\" viewBox=\"0 0 16 16\"> <path fill-rule=\"evenodd\" d=\"M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z\"/> </svg>";
    upDownCell.appendChild(upButton);
    upDownCell.appendChild(downButton);
    return upDownCell;
}
function createYearCell(id, value) {
    var yearsCell = document.createElement('td');
    var yearsInput = document.createElement('input');
    yearsInput.setAttribute('type', 'number');
    yearsInput.setAttribute('class', 'form-control');
    yearsInput.setAttribute('id', "years" + id);
    yearsInput.setAttribute('value', "" + (value !== null && value !== void 0 ? value : ""));
    yearsCell.appendChild(yearsInput);
    return yearsCell;
}
function createGradeCell(id, grade) {
    var gradeCell = document.createElement('td');
    var gradeInput = document.createElement('select');
    gradeInput.setAttribute("class", "form-select");
    gradeInput.setAttribute('id', "grade" + id);
    for (var j in grades) {
        var optionInput = document.createElement('option');
        if (grade == grades[j]) {
            optionInput.selected = true;
        }
        optionInput.textContent = grades[j];
        gradeInput.appendChild(optionInput);
    }
    gradeCell.appendChild(gradeInput);
    return gradeCell;
}
function createRemoveButtonCell(id) {
    var removeCell = document.createElement('td');
    removeCell.setAttribute("class", "align-items-center");
    var removeInput = document.createElement('button');
    removeInput.setAttribute("class", "btn btn-danger d-flex align-items-center");
    removeInput.setAttribute("id", "remove" + id);
    removeInput.setAttribute("onclick", "removeTimelineRow(" + id + ")");
    removeInput.setAttribute("data-bs-toggle", "tooltip");
    removeInput.setAttribute("data-bs-placement", "right");
    removeInput.setAttribute("title", "Delete this row");
    removeInput.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-dash-circle-fill\" viewBox=\"0 0 16 16\"> <path d=\"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z\"/> </svg>";
    removeCell.appendChild(removeInput);
    // @ts-ignore - Enable tooltips on the delete button (disabled for now)
    // tooltipList.push(new bootstrap.Tooltip(removeInput));
    return removeCell;
}
/**
 * Generate the promotion timeline table from the promotionTimeline global.
 */
function showPromotionTimeline() {
    var tableId = "timelineTable";
    var table = document.getElementById(tableId);
    removeChildNodes(table);
    var tableOutput = document.createDocumentFragment();
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');
    // Add table headers
    var headers = ['', 'Year of Service', 'Grade', ''];
    var newRow = thead.insertRow();
    for (var i in headers) {
        var newCell = document.createElement('th');
        newCell.setAttribute('scope', 'col');
        newCell.textContent = headers[i];
        newRow.appendChild(newCell);
    }
    tableOutput.appendChild(thead);
    // Add table rows
    for (var i in promotionTimeline["Career YOS"]) {
        var newRow_3 = tbody.insertRow();
        // Add up and down buttons
        newRow_3.appendChild(createUpDownButtonCell(parseInt(i)));
        // Add YOS input cell
        newRow_3.appendChild(createYearCell(i, promotionTimeline["Career YOS"][i]));
        // Add paygrade select cell
        newRow_3.appendChild(createGradeCell(i, promotionTimeline["Grade"][i]));
        // Add remove button cell
        newRow_3.appendChild(createRemoveButtonCell(i));
    }
    // Add blank 'adder' row
    var adderRow = tbody.insertRow();
    adderRow.appendChild(document.createElement('td'));
    adderRow.appendChild(document.createElement('td'));
    adderRow.appendChild(document.createElement('td'));
    var adderCell = document.createElement('td');
    var adderInput = document.createElement('button');
    adderInput.setAttribute("class", "btn btn-success d-flex align-items-center");
    adderInput.setAttribute("id", "addRow");
    adderInput.setAttribute("onclick", "insertTimelineRow()");
    adderInput.setAttribute("data-bs-toggle", "tooltip");
    adderInput.setAttribute("data-bs-placement", "right");
    adderInput.setAttribute("title", "Add a new row");
    adderInput.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-plus-circle-fill\" viewBox=\"0 0 16 16\"> <path d=\"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z\"/> </svg>";
    // @ts-ignore - Enable tooltips on the adder button (disabled for now)
    // tooltipList.push(new bootstrap.Tooltip(adderInput));
    adderCell.appendChild(adderInput);
    adderRow.appendChild(adderCell);
    // Add complete table to the modal
    tableOutput.appendChild(tbody);
    table.appendChild(tableOutput);
}
function moveTimelineRow(rowId, newId) {
    var table = document.getElementById("timelineTable");
    var tbody = table.tBodies[0];
    // Do not move if we're out of bounds
    if (newId < 0 || newId >= tbody.rows.length - 1) {
        return false;
    }
    // @ts-ignore
    var years = parseInt(tbody.rows[rowId].cells[1].firstChild.value);
    // @ts-ignore
    var grade = tbody.rows[rowId].cells[2].firstChild.value;
    removeTimelineRow(rowId, false);
    insertTimelineRow(newId, years, grade);
    return true;
}
/**
 * Changes row ID values from startId to endId.
 * @param startId
 * @param endId
 * @param change
 */
function adjustRowValues(startId, endId, change) {
    var table = document.getElementById("timelineTable");
    var tbody = table.tBodies[0];
    // Adjust ID values for affected rows
    for (var row = startId; row < endId; ++row) {
        tbody.rows[row].cells[0].childNodes[0].setAttribute('id', "up" + (row + change));
        tbody.rows[row].cells[0].childNodes[0].setAttribute("onclick", "moveTimelineRow(" + (row + change) + ", " + (row + change - 1) + ")");
        tbody.rows[row].cells[0].childNodes[1].setAttribute('id', "down" + (row + change));
        tbody.rows[row].cells[0].childNodes[1].setAttribute("onclick", "moveTimelineRow(" + (row + change) + ", " + (row + change + 1) + ")");
        tbody.rows[row].cells[1].firstChild.setAttribute('id', "years" + (row + change));
        tbody.rows[row].cells[2].firstChild.setAttribute('id', "grade" + (row + change));
        tbody.rows[row].cells[3].firstChild.setAttribute('id', "remove" + (row + change));
        tbody.rows[row].cells[3].firstChild.setAttribute('onclick', "removeTimelineRow(" + (row + change) + ")");
    }
}
/**
 * Reset all ID values for the table to their proper row index.
 */
function refactorRowValues() {
    var table = document.getElementById("timelineTable");
    var tbody = table.tBodies[0];
    // Fix ID values for affected rows
    for (var row = 0; row < tbody.rows.length - 1; ++row) {
        tbody.rows[row].cells[0].childNodes[0].setAttribute('id', "up" + row);
        tbody.rows[row].cells[0].childNodes[0].setAttribute("onclick", "moveTimelineRow(" + row + ", " + (row - 1) + ")");
        tbody.rows[row].cells[0].childNodes[1].setAttribute('id', "down" + row);
        tbody.rows[row].cells[0].childNodes[1].setAttribute("onclick", "moveTimelineRow(" + row + ", " + (row + 1) + ")");
        tbody.rows[row].cells[1].firstChild.setAttribute('id', "years" + row);
        tbody.rows[row].cells[2].firstChild.setAttribute('id', "grade" + row);
        tbody.rows[row].cells[3].firstChild.setAttribute('id', "remove" + row);
        tbody.rows[row].cells[3].firstChild.setAttribute('onclick', "removeTimelineRow(" + row + ")");
    }
}
/**
 * Remove a row from the timeline table and adjust rowIDs for the following rows.
 * @param rowId - Row to remove.
 * @param refactor - Whether or not to perform a row ID refactor at the end of the deletion.
 */
function removeTimelineRow(rowId, refactor) {
    if (refactor === void 0) { refactor = true; }
    var table = document.getElementById("timelineTable");
    var tbody = table.tBodies[0];
    // adjustRowValues(rowId + 1, tbody.rows.length - 1, -1);
    tbody.deleteRow(rowId);
    if (refactor) {
        refactorRowValues();
    }
}
/**
 * Insert a new row into the promotion timeline table.
 * @param rowId - Index to insert into. Defaults to the end of the table.
 * @param years - Years of Service value to include. Blank by default.
 * @param grade - Paygrade value to include. Blank by default
 * @param refactor - Whether or not to perform a row ID refactor at the end of the insert.
 */
function insertTimelineRow(rowId, years, grade, refactor) {
    if (rowId === void 0) { rowId = null; }
    if (years === void 0) { years = null; }
    if (grade === void 0) { grade = null; }
    if (refactor === void 0) { refactor = true; }
    var table = document.getElementById("timelineTable");
    var tbody = table.tBodies[0];
    // Set target row to the end by default
    rowId = rowId == null ? (tbody.rows.length - 1) : rowId;
    var newRow = tbody.insertRow(rowId);
    // adjustRowValues(rowId + 1, tbody.rows.length - 1, 1);
    // Add up down buttons
    newRow.appendChild(createUpDownButtonCell(rowId));
    // Add YOS cell
    newRow.appendChild(createYearCell(rowId, years !== null && years !== void 0 ? years : 0));
    // Add paygrade cell
    newRow.appendChild(createGradeCell(rowId, grade));
    // Add remove line cell
    newRow.appendChild(createRemoveButtonCell(rowId));
    if (refactor) {
        refactorRowValues();
    }
}
/**
 * Retrieves data from the timeline table and stores it within the promotionTimeline global.
 */
function savePromotionTimeline() {
    var table = document.getElementById("timelineTable");
    var tbody = table.tBodies[0];
    var newTimeline = {
        "Career YOS": [],
        "Grade": []
    };
    for (var row = 0; row < tbody.rows.length - 1; ++row) {
        var YOS = tbody.rows[row].cells[1].firstChild.valueAsNumber;
        var grade = tbody.rows[row].cells[2].firstChild.value;
        newTimeline["Career YOS"].push(YOS);
        newTimeline["Grade"].push(grade);
    }
    promotionTimeline = newTimeline;
}
function setDefaultTimeline(careerPath) {
    var careerPathButton = document.getElementById("careerPathButton");
    switch (careerPath) {
        case "E":
            promotionTimeline = enlistedPromotionTimeline;
            careerPathButton.textContent = "Career Path: Enlisted";
            break;
        case "W":
            promotionTimeline = techWarrantPromotionTimeline;
            careerPathButton.textContent = "Career Path: Tech Warrant";
            break;
        case "O":
            promotionTimeline = officerPromotionTimeline;
            careerPathButton.textContent = "Career Path: Officer";
            break;
        default:
            promotionTimeline = enlistedPromotionTimeline;
            careerPathButton.textContent = "Career Path: Enlisted";
            break;
    }
    showPromotionTimeline();
}
/**
 * Create an HTML table based on a given dictionary.
 * @param data
 * @param headers
 * @param tableId - ID of table element to clear and populate
 */
function createTable(data, headers, tableId) {
    var table = document.getElementById(tableId);
    removeChildNodes(table);
    var tableOutput = document.createDocumentFragment();
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');
    // Add table headers
    var newRow = thead.insertRow();
    for (var i in headers) {
        var newCell = document.createElement('th');
        newCell.setAttribute('scope', 'col');
        newCell.textContent = headers[i];
        newRow.appendChild(newCell);
    }
    tableOutput.appendChild(thead);
    // Add table rows
    for (var i in data) {
        var newRow_4 = tbody.insertRow();
        // Add header cell
        var headerCell = document.createElement('th');
        headerCell.textContent = data[i][headers[0]];
        headerCell.setAttribute('scope', 'row');
        newRow_4.appendChild(headerCell);
        // Add remaining cells
        for (var j = 1; j < headers.length; ++j) {
            newRow_4.insertCell().textContent = data[i][headers[j]];
        }
    }
    tableOutput.appendChild(tbody);
    table.appendChild(tableOutput);
}
