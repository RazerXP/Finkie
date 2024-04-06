var investAmt=500;
var n=10;
var ROI=12;
var thischart;
document.addEventListener("DOMContentLoaded", function() {
    creamPie(investAmt,ROI,n);
});

function SipToLumpsum(){
    const toggle=document.getElementById("toggle");
    const info=document.getElementById("Monthly-Investment-Amount");
    if(!toggle.checked){
        info.textContent="Investment Amount";
    }else{
        info.textContent="Monthly Investment Amount";
    }
    if(!toggle.checked){
        console.log(`lumcumpie`);
        lumpcumPie(investAmt,ROI,n);
        
    }else{
        console.log(`creampie`);
        creamPie(investAmt,ROI,n);
    }
}
function updateSliderPosition(sliderNum, value) {
    var progressBar = document.getElementById("progressBar" + sliderNum);
    var sliderHandle = document.getElementById("sliderHandle" + sliderNum);
    var sliderContainer = document.querySelector(".slider-container");
    var containerWidth = sliderContainer.offsetWidth;

    switch(sliderNum){
        case 1:
            var newX = (containerWidth * value) / 100000;
            progressBar.style.width = newX + "px";
            sliderHandle.style.left = newX + "px";
            if(value<=500) value=500;
            investAmt=value;
            break;
        case 2:
            var newX = (containerWidth * value) / 50;
            progressBar.style.width = newX + "px";
            sliderHandle.style.left = newX + "px";
            n=Math.round(value);
            break;
        case 3:
            var newX = (containerWidth * value) / 25.0;
            progressBar.style.width = newX + "px";
            sliderHandle.style.left = newX + "px";
            if(value<=1) value=1;
            console.log(`slider update ${value}`);
            ROI=value;
            break;
    } 
}

function updateSliderValue(sliderNum) {
    var progressBar = document.getElementById("progressBar" + sliderNum);
    var sliderValue = document.getElementById("sliderValue" + sliderNum);
    var sliderContainer = document.querySelector(".slider-container");
    var containerWidth = sliderContainer.offsetWidth;
    var progressBarWidth = progressBar.offsetWidth;
    switch(sliderNum){
        case 1:
            var value = ((progressBarWidth / containerWidth) * 100000);
            if(value==0) value=500;
            investAmt=Math.round(value);
            if(value==100000) sliderValue.value = 1+"Lakh";
            else sliderValue.value = commafy(Math.round(value));
            break;
        case 2:
            var value = ((progressBarWidth / containerWidth) * 50);
            n=Math.round(value);
            if(value<=1){
                value=1;
                sliderValue.value = Math.round(value)+" year";
            }
            else sliderValue.value = Math.round(value)+" years";
            break;
        case 3:
            var value = (progressBarWidth / containerWidth) * 25;
            if(value<=1) value=1;
            ROI=value;
            sliderValue.value = Number(value.toFixed(2));
            break;
    }
}

function commafy(number) {
    let strNumber = String(number);
    let len = strNumber.length;
    if(len <= 3) return strNumber;
    let strNumbertemp = strNumber.slice(0, len-3);
    strNumbertemp = strNumbertemp.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    strNumber = strNumbertemp+","+strNumber.slice(len-3,len);
    return strNumber;
}

function addSliderEventListeners(sliderNum) {
    var sliderHandle = document.getElementById("sliderHandle" + sliderNum);
    var progressBar = document.getElementById("progressBar" + sliderNum);
    var sliderValue = document.getElementById("sliderValue" + sliderNum);
    var sliderContainer = document.querySelector(".slider-container");

    function startDrag(event) {
        event.preventDefault();
        var initialX = event.clientX || event.touches[0].clientX;
        var containerLeft = sliderContainer.getBoundingClientRect().left;
        var offset = initialX - sliderHandle.getBoundingClientRect().left;

        function moveHandle(event) {
            event.preventDefault();
            var newX = (event.clientX || event.touches[0].clientX) - containerLeft - offset;
            if (newX < 0) {
                newX = 0;
            } else if (newX > sliderContainer.offsetWidth) {
                newX = sliderContainer.offsetWidth;
            }
            progressBar.style.width = newX + "px";
            sliderHandle.style.left = newX + "px";
            updateSliderValue(sliderNum);
        }

        function stopDrag(event) {
            event.preventDefault();
            document.removeEventListener("mousemove", moveHandle);
            document.removeEventListener("touchmove", moveHandle);
            document.removeEventListener("mouseup", stopDrag);
            document.removeEventListener("touchend", stopDrag);

            const toggle = document.getElementById("toggle");
            if (toggle.checked) {
                lumpcumPie(investAmt, ROI, n);
            } else {
                creamPie(investAmt, ROI, n);
            }
        }

        document.addEventListener("mousemove", moveHandle, { passive: false });
        document.addEventListener("touchmove", moveHandle, { passive: false });
        document.addEventListener("mouseup", stopDrag, { passive: false });
        document.addEventListener("touchend", stopDrag, { passive: false });
    }

    sliderHandle.addEventListener("mousedown", startDrag);
    sliderHandle.addEventListener("touchstart", startDrag);

    sliderValue.addEventListener("change", function(event) {
        var value = parseInt(String(sliderValue.value).replace(/,/g, ''));
        if (isNaN(value)) return;
        if (value < 0) value = 0;
        sliderValue.style.color = "white";
        try {
            switch (sliderNum) {
                case 1:
                    if (value > 100000) value = 100000;
                    if (value < 500) {
                        sliderValue.style.color = "red";
                        throw new Error(`Value Of This Field Can't be Below 500 Rupees!`);
                    }
                    break;
                case 2:
                    if (value > 50) value = 50;
                    if (value == 0) {
                        sliderValue.style.color = "red";
                        throw new Error(`Value Of This Field Can't be 0 Years!! Minimum 1 year!!`);
                    }
                    break;
                case 3:
                    var belu = sliderValue.value;
                    belu = Number(belu);
                    if (belu > 25) belu = 25;
                    if (belu == 0) {
                        sliderValue.style.color = "red";
                        throw new Error(`Value Of This Growth Rate Can't be 0% !!`);
                    }
                    value = belu;
                    break;
            }
        } catch (error) {
            console.error(error);
            return;
        }
        updateSliderPosition(sliderNum, value);
        const toggle = document.getElementById("toggle");
        if (toggle.checked) {
            lumpcumPie(investAmt, ROI, n);
        } else {
            creamPie(investAmt, ROI, n);
        }
    });
}


function creamPie(investAmt,ROI,n){
    ROI=Number(ROI);
    ROI/=1200;
    console.log(investAmt,ROI,n);
    let total = investAmt * (((1 + ROI)**(n*12) - 1) / ROI) * (1 + ROI);
    let gain=total-investAmt*12*n;
    let chartStatus = Chart.getChart("my-chart"); // <canvas> id
    if (chartStatus != undefined) {
        chartStatus.destroy();
        
    }
    displayChart(investAmt*12*n,gain);
}

function lumpcumPie(investAmt,ROI,n){
    ROI /= 100;
    console.log(investAmt,ROI,n);
    let total = investAmt *( (1 + ROI) ** n);
    let gain=total-investAmt;
    let chartStatus = Chart.getChart("my-chart"); // <canvas> id
    if (chartStatus != undefined) {
        chartStatus.destroy(); 
    }
    displayChart(investAmt,gain);
}



for (var i = 1; i <= 3; i++) {
    if(i==1) updateSliderPosition(i, 10);
    if(i==2) updateSliderPosition(i, 10);
    if(i==3) updateSliderPosition(i, 12);
    updateSliderValue(i);
    addSliderEventListeners(i);
}

function displayChart(investAmt,gainsAmt){
    const chartData = {
        labels: ["Invested Amount", "Gains"],
        data: [investAmt, gainsAmt], 
    };
      
    var myChart = document.getElementById("my-chart");
    const ul = document.querySelector(".programming-stats .details ul");
      
    thischart = new Chart(myChart, {
        type: "doughnut",
        data: {
        labels: chartData.labels,
        datasets: [
            {
            label: "  ",
            data: chartData.data,
            backgroundColor: ['#D9D9D9',"#BCF145"],
            borderColor: "#181E20",
            },
            ],
        },
        options: {
            borderWidth: 10,
            borderRadius: 2,
            hoverBorderWidth: 0,
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        });
        const populateUl = () => {
          let total = 0;
          const tutal=document.getElementById("total");
          const Investment=document.getElementById("Investment");
          const Gains=document.getElementById("Gains");
          chartData.labels.forEach((l, i) => {
            total += chartData.data[i];
          });
          tutal.textContent="Total Amount" + "\t" + `${commafy(Math.trunc(total))}`;
          tutal.style.color="#BCF145";
          Investment.textContent="Invested Amount" + "\t" + `${commafy(investAmt)}`;
          Gains.textContent="Gains" + "\t" + `${commafy(Math.trunc(gainsAmt))}`;
        };
      
    populateUl();
}

const ibut1=document.getElementById("info-button1");
const itext1=document.getElementById("info-text1");
ibut1.addEventListener("mouseover",event=>{
    const toggle=document.getElementById("toggle");
    if(toggle.checked){
        itext1.textContent="The amount of money you want to invest at once.";
    }
    else{
        itext1.textContent="The amount of money you want to invest monthly.";
    }
    itext1.style.visibility="visible";
});
ibut1.addEventListener("mouseout",event=>{
    itext1.style.visibility="hidden";
});

//second
const ibut2=document.getElementById("info-button2");
const itext2=document.getElementById("info-text2");
ibut2.addEventListener("mouseover",event=>{
    itext2.style.visibility="visible";
});
ibut2.addEventListener("mouseout",event=>{
    itext2.style.visibility="hidden";
});

//third
const ibut3=document.getElementById("info-button3");
const itext3=document.getElementById("info-text3");
ibut3.addEventListener("mouseover",event=>{
    itext3.style.visibility="visible";
});
ibut3.addEventListener("mouseout",event=>{
    itext3.style.visibility="hidden";
});

function stripcommasininput(){
    var sliderValue = document.getElementById("sliderValue1");
    var temp = parseInt(String(sliderValue.value).replace(/,/g,''));
    sliderValue.value = temp;
}