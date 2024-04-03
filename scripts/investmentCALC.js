var investAmt = document.getElementById("sliderValue1").value;
var timeperiod = document.getElementById("sliderValue2").value;

for(let i=1; i<3; i++){
  var sliderValue = document.getElementById("sliderValue" + i);
  var sliderHandle = document.getElementById("sliderHandle" + i);
  sliderValue.addEventListener("change", function(event) {
    investAmt = document.getElementById("sliderValue1").value;
    timeperiod = document.getElementById("sliderValue2").value;
    edittable(investAmt, parseInt(timeperiod));
  });
  sliderHandle.addEventListener("mouseup", function(event) {
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

function edittable(investAmt, timeperiod){
  const table = document.getElementById('csvTable');
  var rows = Array.from(table.querySelectorAll('tbody tr'));
  rows.forEach(row =>{
    var roi = row.children[1].textContent.trim();
    if(roi != '-'){
      investAmt = parseInt(String(investAmt).replace(/,/g,''));
      roi = parseFloat(roi);
      timeperiod = parseInt(timeperiod);
      var result = creamypie(investAmt, roi, timeperiod);

      row.children[2].textContent = addCommas(parseInt(result) - investAmt*12*timeperiod);
      row.children[3].textContent = addCommas(parseInt(result));
    }
    table.querySelector('tbody').appendChild(row);
  });
}

function addCommas(number) {
    let strNumber = String(number);
    let len = strNumber.length;
    let strNumbertemp = strNumber.slice(0, len-3);
    strNumbertemp = strNumbertemp.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    strNumber = strNumbertemp+","+strNumber.slice(len-3,len);
    return strNumber;
}
