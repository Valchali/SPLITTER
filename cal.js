const service = document.querySelectorAll(".btn")
const resetButton = document.querySelector("#resetbtn")
let tip = 0

function checkError(people) {
    if(people === 0){

        let errorBorder = document.querySelector("#people")

        errorBorder.style.border = "2px solid #b47c6d"
        return false
    }
    return true
}

function resetError(){

    let errorBorder = document.querySelector("#people")

    errorBorder.style.border = "none"
}

document.addEventListener("DOMContentLoaded", () => {
    let billInpt = document.querySelector("#bill")
    let peopleInpt = document.querySelector("#people")
    let customTipInpt = document.querySelector("#custom-tip")

    function updateResult() {
        let bill = parseFloat(billInpt.value)
        let people = parseInt(peopleInpt.value)
        let customTip = parseFloat(customTipInpt.value)
        let finalTip = 0
        let total = 0
        let isValid = checkError(people)

        if(isValid && ((bill) && (tip))) {
            resetError()
            if((customTip)){
                finalTip = parseFloat(((bill * customTip) / 100).toFixed(2))
            }
            else {
                finalTip = parseFloat(((bill * tip) / 100).toFixed(2))
            }
            total = parseFloat((bill + finalTip).toFixed(2))

            if((people)) {
                finalTip = (finalTip/people).toFixed(2)
                total = (total/people).toFixed(2)
            }

            const finalTipDisplay = document.querySelector(".tipnumber")
            const finalTotalDisplay = document.querySelector(".totalamount")
            finalTipDisplay.innerText = finalTip
            finalTotalDisplay.innerText = total
        }
    }

    billInpt.addEventListener("input", updateResult)
    customTipInpt.addEventListener("input", updateResult)
    service.forEach(button => {
       button.addEventListener("click", () => {
            service.forEach(buttons => {buttons.classList.remove("active")})
            button.classList.add("active")
            tip = parseFloat(button.querySelector(".tip").innerText)
            updateResult()
        })
    })
    peopleInpt.addEventListener("input", updateResult)
})
document.addEventListener("wheel", function(event){
    if(document.activeElement.type === "number"){
        document.activeElement.blur();
    }
});

resetButton.addEventListener("click", () => {
    location.reload()
})