let taxable_income = 0; 
let capital_gains = 0; // those that can't be added to tax_payable
let tax_payable = 0;
let deductions = 0;
let P1Arr, P2Arr, P3Arr, P4Arr, P5Arr;

function parseFromStorage(){
    let FromStorage;
    FromStorage=sessionStorage.getItem("P1textContents");
    P1Arr = JSON.parse(FromStorage);
    FromStorage=sessionStorage.getItem("P2detailsArray");
    P2Arr = JSON.parse(FromStorage);
    FromStorage=sessionStorage.getItem("P3detailsArray");
    P3Arr = JSON.parse(FromStorage);
    FromStorage=sessionStorage.getItem("P4detailsArray");
    P4Arr = JSON.parse(FromStorage);
    FromStorage=sessionStorage.getItem("P5detailsArray");
    P5Arr = JSON.parse(FromStorage);
}


function hraDeduction(isSalaried, rent){
    let a, b, c;
    if(isSalaried == 'salaried'){
        let basicpay = Number(P2Arr['P2InputFieldValue1']);
        if(P2Arr['selectedRadioButton1']=='monthly') basicpay *= 12;
        let DA = Number(P3Arr['P3InputFieldValue3']);
        if(P3Arr['selectedRadioButton']=='monthly') DA *= 12;
        const isMetro = P1Arr['P1DDtextcont3'];

        a = Number(P3Arr['P3InputFieldValue1']);
        b = rent - (0.1*basicpay);
        c = (isMetro=='Metro')? (0.5*basicpay)+DA : (0.4*basicpay)+DA;
    }
    else{
        const adj_income = grossSalarySelfEmployed();
        a = rent - (0.1*adj_income);
        b = 0.25*adj_income;
        c = 60000;
    }
    if(a<0) a=0;
    if(b<0) b=0;
    if(c<0) c=0;
    return Math.min(a, b, c);
}
function grossSalarySelfEmployed(){
    let result = 0;
    let basicpay = Number(P2Arr['P2InputFieldValue1']);
    if(P2Arr['selectedRadioButton1']=='monthly') basicpay *= 12;
    for(let i=2; i<=5; i++) result +=  Number(P2Arr[`P2InputFieldValue${i}`]);
    if(P2Arr['selectedRadioButton2']=='monthly') result *= 12;
    result += basicpay;
    return result;
}


function calcDeductions(){
    // HRA
    if(P1Arr['P1DDtextcont4']=='Rented'){
        let rent = Number(P1Arr['P1InputFieldValue']);
        if(P1Arr['selectedRadioButton']=='monthly') rent *= 12;
        let hra_exempt;
        if(P1Arr['P1DDtextcont5']=='Salaried') hra_exempt = hraDeduction('salaried', rent);
        else hra_exempt = hraDeduction('self-employed', rent);
        deductions += hra_exempt;
    }

    // 80c
    let epf = Number(P3Arr['P3InputFieldValue4']);
    if(P3Arr['selectedRadioButton']=='monthly') epf *= 12;
    let total_80c = epf;
    if(P5Arr['box1']=='checked'){
        for(let i=1; i<=4; i++) total_80c += P5Arr["P5InputFieldValue1"+i];
    }
    deductions += (total_80c>150000)? 150000 : total_80c;

    // 80d
    if(P5Arr['box2']=='checked'){
        const my_age_above60 = P5Arr['checked1'];
        const parents_age_above60 = P5Arr['checked2'];
        const my_premium = Number(P5Arr['P5InputFieldValue21']);
        const parents_premium = Number(P5Arr['P5InputFieldValue22']);
        console.log(my_premium, parents_premium);
        if(my_age_above60=='TRUE') deductions += (my_premium>50000)? 50000 : my_premium;
        if(my_age_above60=='FALSE') deductions += (my_premium>25000)? 25000 : my_premium;
        if(parents_age_above60=='TRUE') deductions += (parents_premium>50000)? 50000 : parents_premium;
        if(parents_age_above60=='FALSE') deductions += (parents_premium>25000)? 25000 : parents_premium;
    }

    // 80ccd
    if(P5Arr['box3']=='checked'){
        let nps = Number(P5Arr['P5InputFieldValue31']);
        deductions += (nps>50000)? 50000 : nps;
    }

    // 80e & Section 24
    if(P5Arr['box4']=='checked'){
        const edloan = Number(P5Arr['P5InputFieldValue41']);
        const homeloan = Number(P5Arr['P5InputFieldValue42']);
        deductions += edloan;
        deductions += (homeloan>200000)? 200000 : homeloan;
    }

    // 80g
    if(P5Arr['box5']=='checked'){
        const donations = Number(P5Arr['P5InputFieldValue51']);
        deductions += donations;
    }

    // 80TTE
    let int_income = Number(P2Arr['P2InputFieldValue2']);
    if(P2Arr['selectedRadioButton2']=='monthly') int_income *= 12;
    deductions += (int_income>10000)? 10000 : int_income;
}


function calcIncomeSources(){
    let basicpay = Number(P2Arr['P2InputFieldValue1']);
    if(P2Arr['selectedRadioButton1']=='monthly') basicpay *= 12;

    // From other sources (self)
    let income_sources = 0;
    income_sources += Number(P2Arr['P2InputFieldValue2']);
    income_sources += Number(P2Arr['P2InputFieldValue3']);
    income_sources += Number(P2Arr['P2InputFieldValue4'])*0.7;
    income_sources += Number(P2Arr['P2InputFieldValue5']);
    if(P2Arr['selectedRadioButton2']=='monthly') income_sources *= 12;

    // From employer
    let income_sources2 = 0;
    income_sources2 += Number(P3Arr['P3InputFieldValue1']);
    income_sources2 += Number(P3Arr['P3InputFieldValue2']);
    income_sources2 += Number(P3Arr['P3InputFieldValue3']);
    if(P3Arr['selectedRadioButton']=='monthly') income_sources2 *= 12;

    taxable_income += basicpay + income_sources + income_sources2;
}


function calcCapitalGains(){
    // Equity
    if(P4Arr['box1']=='checked'){
        const stcg = Number(P4Arr['P4InputFieldValue11']);
        let ltcg = Number(P4Arr['P4InputFieldValue12']);
        ltcg = (ltcg>100000)? 100000 : ltcg;
        tax_payable += (0.15*stcg) + (0.1*ltcg);
        capital_gains += ltcg + stcg;
    }

    // Debt
    if(P4Arr['box2']=='checked'){
        const debt = Number(P4Arr['P4InputFieldValue21']) + Number(P4Arr['P4InputFieldValue22']);
        taxable_income += debt;
    }

    // Real Estate
    if(P4Arr['box3']=='checked'){
        const stcg_real_estate = Number(P4Arr['P4InputFieldValue31']);
        const ltcg_real_estate = Number(P4Arr['P4InputFieldValue32']);
        taxable_income += stcg_real_estate;
        tax_payable += 0.2*ltcg_real_estate;
        capital_gains += ltcg_real_estate;
    }
}


function calculateTax(taxableIncome, slabs, rates) {
    let taxPayable = 0;
    for (let i = 1; i < slabs.length; i++) {
        if (taxableIncome <= slabs[i]) {
            taxPayable += (taxableIncome-slabs[i-1]) * rates[i-1];
            break;
        } else {
            taxPayable += (slabs[i] - slabs[i - 1]) * rates[i-1];
        }
    }
    if(taxableIncome > slabs[slabs.length-1]) taxPayable += (taxableIncome-slabs[slabs.length-1]) * rates[rates.length-1];
    taxPayable += (taxPayable) * 0.04; // Health Ed CESS
    return taxPayable;
}
function newtax(){
    const slabs = [300000, 600000, 900000, 1200000, 1500000];
    const rates = [0.05, 0.1, 0.15, 0.2, 0.3];
    let new_regime_tax = calculateTax(taxable_income-50000, slabs, rates); //sd
    let chartStatus = Chart.getChart("my-chart"); // <canvas> id
    if (chartStatus != undefined) {
        chartStatus.destroy();  
    }
    displayChart(taxable_income-50000+capital_gains, 50000, tax_payable + new_regime_tax);
}
function oldtax(){
    let slabs, rates;
    const age = P1Arr['P1DDtextcont2'];
    if(age == "60-80"){
        slabs = [300000, 500000, 1000000];
        rates = [0.05, 0.2, 0.3];
    }
    else if(age == "Above 80"){
        slabs = [500000, 1000000];
        rates = [0.2, 0.3];
    }
    else{
        slabs = [250000, 500000, 1000000];
        rates = [0.05, 0.2, 0.3];
    }
    let old_regime_tax = calculateTax(taxable_income-50000-deductions, slabs, rates); //sd
    let chartStatus = Chart.getChart("my-chart"); // <canvas> id
    if (chartStatus != undefined) {
        chartStatus.destroy();  
    }
    displayChart(taxable_income-deductions-50000+capital_gains, deductions+50000, tax_payable + old_regime_tax);
}
function calcTax(){
    if(taxable_income<700000) {
        if (chartStatus != undefined) {
            chartStatus.destroy();  
        }
        displayChart(taxable_income, 0, 0);
        return;
    }
    const toggle=document.getElementById("toggle");
    if(!toggle.checked) oldtax();
    else newtax();
}


// For the PIE CHART ----------------------------------------------
function commafy(number) {
    let strNumber = String(number);
    let len = strNumber.length;
    if(len <= 3) return strNumber;
    let strNumbertemp = strNumber.slice(0, len-3);
    strNumbertemp = strNumbertemp.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    strNumber = strNumbertemp+","+strNumber.slice(len-3,len);
    return strNumber;
}
function displayChart(taxableIncome,Deductions,taxPayable){
    const chartData = {
        labels: ["Tax Payable", "Tax Deductions","Taxable Income"],
        data: [taxPayable, Deductions,taxableIncome], 
    };
      
    var myChart = document.getElementById("my-chart");
    thischart = new Chart(myChart, {
        type: "doughnut",
        data: {
        labels: chartData.labels,
        datasets: [
            {
            label: "  ",
            data: chartData.data,
            backgroundColor: ['#F4F4F4',"#F16E45","#BCF145"],
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
          const TaxableIncome=document.getElementById("text-Taxable-Income");
          const TaxDeductions=document.getElementById("text-Tax-Deductions");
          const TaxPayable=document.getElementById("text-Tax-Payable");
          chartData.labels.forEach((l, i) => {
            total += chartData.data[i];
          });
          TaxableIncome.textContent=`Taxable Income   Rs.${commafy(Math.trunc(taxableIncome))}`;
          TaxDeductions.textContent=`Tax Deductions   Rs.${commafy(Deductions)}`;
          TaxPayable.textContent=`Tax Payable         Rs.${commafy(Math.trunc(taxPayable))}`;
        };
    populateUl();
}
// -----------------------------------------------------------------


window.onload = function(){
    taxable_income = 0;
    capital_gains = 0;
    tax_payable = 0;
    deductions = 0;
    parseFromStorage();
    calcIncomeSources();
    calcDeductions();
    calcCapitalGains();
    calcTax();
}

