var investAmt = document.getElementById("sliderValue1").value;
var timeperiod = document.getElementById("sliderValue2").value;

function SipToLumpsum(){
    const toggle=document.getElementById("toggle");
    const info=document.getElementById("Monthly-Investment-Amount");
    if(toggle.checked){
        info.textContent="Investment Amount";
    }else{
        info.textContent="Monthly Investment Amount";
    }
    investAmt = document.getElementById("sliderValue1").value;
    timeperiod = document.getElementById("sliderValue2").value;
    edittable(investAmt, parseInt(timeperiod));
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
            else sliderValue.value = addCommas(Math.round(value));
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
    }
}

function edittable(investAmt, timeperiod){
    const table = document.getElementById('csvTable');
    var rows = Array.from(table.querySelectorAll('tbody tr'));
    rows.forEach(row =>{
      var roi = row.children[1].textContent.trim();
      if(roi != '-'){
        investAmt = parseInt(String(investAmt).replace(/,/g,''));
        roi = parseFloat(roi);
        timeperiod = parseInt(timeperiod);

        const toggle=document.getElementById("toggle");
        if(toggle.checked){
            var result = lumpcumypie(investAmt, roi, timeperiod);
            row.children[2].textContent = addCommas(parseInt(result) - investAmt);     
        }else{
            var result = creamypie(investAmt, roi, timeperiod);
            row.children[2].textContent = addCommas(parseInt(result) - investAmt*12*timeperiod);
        }

        row.children[3].textContent = addCommas(parseInt(result));
      }
      table.querySelector('tbody').appendChild(row);
    });
  }

function addCommas(number) {
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

    sliderHandle.addEventListener("mousedown", function(event) {
        event.preventDefault();
        var initialX = event.clientX;
        var containerLeft = sliderContainer.getBoundingClientRect().left;
        var offset = initialX - sliderHandle.getBoundingClientRect().left;

        function handleMouseMove(event) {
            event.preventDefault();
            var newX = event.clientX - containerLeft - offset;
            if (newX < 0) {
                newX = 0;
            } else if (newX > sliderContainer.offsetWidth) {
                newX = sliderContainer.offsetWidth;
            }
            progressBar.style.width = newX + "px";
            sliderHandle.style.left = newX + "px";
            updateSliderValue(sliderNum);
        }

        function handleMouseUp(event) {
            event.preventDefault();
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);

            investAmt = document.getElementById("sliderValue1").value;
            timeperiod = document.getElementById("sliderValue2").value;
            edittable(investAmt, parseInt(timeperiod));
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    sliderValue.addEventListener("change", function(event) {
        var value = parseInt(String(sliderValue.value).replace(/,/g,''));
        if (isNaN(value)) return;
        if (value < 0) value = 0;
        sliderValue.style.color="white";
        try{
            switch(sliderNum){
                case 1:
                    if (value > 100000) value = 100000;
                    if(value<500){
                        sliderValue.style.color="red";
                        throw new Error(`Value Of This Field Can't be Below 500 Rupees!`);
                    }
                    break;
                case 2:
                    if (value > 50) value = 50;
                    if(value==0){
                        sliderValue.style.color="red";
                        throw new Error(`Value Of This Field Can't be 0 Years!! Minimum 1 year!!`);
                    }
                    break;
            }
        }catch(error){
            console.error(error);
            return;
        }
        updateSliderPosition(sliderNum, value);
        investAmt = document.getElementById("sliderValue1").value;
        timeperiod = document.getElementById("sliderValue2").value;
        edittable(investAmt, parseInt(timeperiod));
    });
}


function creamypie(investAmt,ROI,n){
    ROI/=1200;
    let total = investAmt * (((1 + ROI)**(n*12) - 1) / ROI) * (1 + ROI);
    return total;
  }
  

function lumpcumypie(investAmt,ROI,n){
    ROI /= 100;
    let total = investAmt *( (1 + ROI) ** n);
    return total;
}

for (var i = 1; i <= 2; i++) {
    if(i==1) updateSliderPosition(i, 10);
    if(i==2) updateSliderPosition(i, 10);
    updateSliderValue(i);
    addSliderEventListeners(i);
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