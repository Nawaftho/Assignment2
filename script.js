const dropList = document.querySelectorAll(".drop-list select");
const fromCurrency = document.querySelector(".form select");
const toCurrency = document.querySelector(".to select");
const getButton = document.querySelector("form button");

for (let index = 0; index < dropList.length; index++) {
    for (currency_code in country_list) {
        let selected;
        if (index == 0) {
            selected = currency_code == "USD" ? "selected" : "";
        } else if (index == 1) {
            selected = currency_code == "SAR" ? "selected" : "";
        }
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[index].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[index].addEventListener("change",e =>{
        loadflags(e.target);
    })
}

function loadflags(element){
for (code in country_list) {
if(code == element.value){
    let imgTag = element.parentElement.querySelector("img");
    imgTag.src = `https://flagsapi.com/${country_list[code]}/flat/64.png`
}
} 
};
window.addEventListener("load", ()=>{
    getExchangeRate();
});
getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

function getExchangeRate() {
    const amount = document.querySelector(".amount input");
    let amountvalue = amount.value;
    if (amountvalue == "" || amountvalue == "0") {
        amount.value = "1";
        amountvalue = 1;
    }

    let url = `https://v6.exchangerate-api.com/v6/e1b4d8604f7254f673cd0cb5/latest/${fromCurrency.value}`;
    fetch(url)
        .then(response => response.json())
        .then(result => {
            let exchangerate =result.conversion_rates[toCurrency.value];
            let totalExchangeRate = (amountvalue*exchangerate);
            const exchangeRateTxt = document.querySelector(".exchange-rate")
            exchangeRateTxt.innerText = `${amountvalue} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`
        });
}
