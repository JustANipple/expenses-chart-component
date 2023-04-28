//this gives an array of objects [{day, amount}]
async function amountInDays() {
    const request = new Request("script/data.json");
    const response = await fetch(request);
    const amounts = await response.json();
    createBars(amounts);
}

async function createBars(amounts) {
    //save a reference for the chart container
    const chart = document.querySelector(".chart_bars");
    
    for(let i = 0; i < 7; i++) {
        //container of bar and day
        const barDayCont = document.createElement("div");
        barDayCont.setAttribute("class", "bar_day_container");
        chart.appendChild(barDayCont);
        //hover element
        const spending = document.createElement("div");
        spending.setAttribute("class", "container_spending");
        barDayCont.appendChild(spending);
        //bar
        const bar = document.createElement("div");
        bar.setAttribute("class", "container_bar");
        barDayCont.appendChild(bar);
        //day
        const day = document.createElement("p");
        day.setAttribute("class", "container_day");
        barDayCont.appendChild(day);
        fillDays(amounts);
    }
    //max value of the bars height in rem
        const maxHeight = 9.5;
    
    //check the highest number in the data for the proportion
    const highest = highNumber(amounts);

    const barsArr = document.querySelectorAll(".container_bar");
    //proportion --> highest : 9.5rem = number : ? --> 9.5 * number / highest
    for(let i = 0; i < barsArr.length; i++) {
        barsArr[i].style.height = maxHeight * amounts[i].amount / highest + "rem";
    }

    //set timeout to make screenshot right for frontendmentor challenge
    barsArr[2].setAttribute("id", "current_day");
    setTimeout(() => {
        barsArr[2].setAttribute("id", "");
        barsArr[new Date().getDay() - 1].setAttribute("id", "current_day");
    }, 2000);    
    
    fillSpending(amounts);
}

function fillSpending(amounts) {
    const spendings = document.querySelectorAll(".container_spending");
    for(let i = 0; i < spendings.length; i++) {
        spendings[i].textContent = "$" + amounts[i].amount;
        //events for hovering
        spendings[i].parentElement.addEventListener("mouseover", (event) => {
            spendings[i].style.visibility = "visible";
            spendings[i].style.opacity = "1";
            spendings[i].parentElement.style.filter = "brightness(1.2)";
        });
        spendings[i].parentElement.addEventListener("mouseout", (event) => {
            spendings[i].style.visibility = "hidden";
            spendings[i].style.opacity = "0";
            spendings[i].parentElement.style.filter = "brightness(1)";
        });
    }
}

function fillDays(amounts) {

    const days = document.querySelectorAll(".container_day");
    for(let i = 0; i < days.length; i++) {
        days[i].textContent = amounts[i].day;
    }
}

function highNumber(amounts) {

    let highest = 0;
    for(const data of amounts) {
        if(data.amount > highest) {
            highest = data.amount;
        }
    }
    return highest;
}

amountInDays();