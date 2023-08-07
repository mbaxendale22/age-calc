const yearsContainer = document.getElementById('years-container')
const monthsContainer = document.getElementById('months-container')
const daysContainer = document.getElementById('days-container')
const form = document.getElementById('main-form')

const dayValidation = document.getElementById('day-validation')
const monthValidation = document.getElementById('month-validation')
const yearValidation = document.getElementById('year-validation')
const dateValidation = document.getElementById('date-validation')

const dayRequired = document.getElementById('day-required')
const monthRequired = document.getElementById('month-required')
const yearRequired = document.getElementById('year-required')

function addToResults(container, value) {
    container.innerHTML = `
    <p class="results-values">${value}</p>
    `
}

function checkValue(input, validationElement) {
    if (!input) {
        validationElement.classList.remove('hidden')
        return false
    } else {
        validationElement.classList.add('hidden')
        return true
    }
}

function dateRangesValidator(dayValue, monthValue, yearValue) {
    let valid = true

    if (dayValue < 0 || dayValue > 31) {
        dayValidation.classList.remove('hidden')
        valid = false
    } else {
        dayValidation.classList.add('hidden')
    }

    if (monthValue < 0 || monthValue > 12) {
        monthValidation.classList.remove('hidden')
        valid = false
    } else {
        monthValidation.classList.add('hidden')
    }
    if (new Date(yearValue) > new Date()) {
        yearValidation.classList.remove('hidden')
        valid = false
    } else {
        yearValidation.classList.add('hidden')
    }
    return valid
}

function checkVariableMonths(monthValue, dayValue) {
    console.log(monthValue)
    switch (monthValue) {
        case 4:
        case 6:
        case 9:
        case 11:
            if (dayValue > 30) {
                console.log(dayValue)
                dateValidation.classList.remove('hidden')
                return false
            }
        case 2:
            if (dayValue > 28) {
                dateValidation.classList.remove('hidden')
                return false
            }
        default:
            dateValidation.classList.add('hidden')
            console.log('boom')
            return true
    }
}

function calculateAge(dayValue, monthValue, yearValue) {
    const birthDate = new Date(yearValue, monthValue - 1, dayValue)
    const today = new Date()

    const diffBetweenDates = Math.floor(today - birthDate)

    const millsInaDay = 1000 * 60 * 60 * 24

    const years = Math.floor(diffBetweenDates / (365 * millsInaDay))

    const months = Math.floor(
        (diffBetweenDates % (365 * millsInaDay)) / (30 * millsInaDay)
    )
    const days = Math.floor(
        ((diffBetweenDates % (365 * millsInaDay)) % (30 * millsInaDay)) /
            millsInaDay
    )

    return {
        days,
        months,
        years,
    }
}

function handleSubmit(e) {
    e.preventDefault()

    const dayValue = e.target.day.value
    const monthValue = e.target.month.value
    const yearValue = e.target.year.value

    const dayIsValid = checkValue(dayValue, dayRequired)
    const monthIsValid = checkValue(monthValue, monthRequired)
    const yearIsValid = checkValue(yearValue, yearRequired)

    const dateRangeIsValid = dateRangesValidator(
        dayValue,
        monthValue,
        yearValue
    )

    const variableMonthIsValid = checkVariableMonths(
        parseInt(monthValue),
        parseInt(dayValue)
    )
    if (
        !dayIsValid ||
        !monthIsValid ||
        !yearIsValid ||
        !dateRangeIsValid ||
        !variableMonthIsValid
    ) {
        return
    }

    const { days, months, years } = calculateAge(
        dayValue,
        monthValue,
        yearValue
    )

    addToResults(yearsContainer, years)
    addToResults(monthsContainer, months)
    addToResults(daysContainer, days)
}

form.addEventListener('submit', handleSubmit)
