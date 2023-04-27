//this gives an array of objects [{day, amount}]
async function amountInDays() {
    
    const request = new Request("script/data.json");
    const response = await fetch(request);
    const amounts = await response.json();

}

//max height 9.5rem -> 100% of height
//we manage 19 parts of 0.5rem
//maxNumber : 9.5 = number : ?

function createBars() {
    const chart = document.querySelector(".chart_bars");
    for(let i = 0; i < 7; i++) {
        const block = document.createElement("div");
        block.setAttribute("class", "barAndDay");
        chart.appendChild(block);
    }
    const barsArr = document.querySelectorAll(".barAndDay");
    barsArr[0].style.height = "3.16rem";
    barsArr[1].style.height = "6.33rem";
    barsArr[2].style.height = "9.5rem";
    barsArr[3].style.height = "5.63rem";
    barsArr[4].style.height = "4.24rem";
    barsArr[5].style.height = "7.85rem";
    barsArr[6].style.height = "4.62rem";
}

createBars();

amountInDays();