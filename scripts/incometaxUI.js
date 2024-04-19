
function updateProgress(percentage) {
    const progressBar = document.querySelector('.progress');
    progressBar.style.width = percentage + '%';

    // Update colors based on the selected stage
    for (let i = 1; i <= 5; i++) {
        const numberLabel = document.getElementById('number' + i);
        if (i <= Math.ceil(percentage / 20)) {
            numberLabel.style.color = '#181E20';
        } else {
            numberLabel.style.color = '#BCF145';
        }
    }
}
//PAGE1 JAVASCRIPT............................................................................................................................
function toggleDropdown(numOfBtn) {

    var dropdown = document.getElementById("dropdown-content"+numOfBtn);
    dropdown.classList.toggle("clicked");

    var P1arrow=document.getElementById("arrow"+numOfBtn);
    P1arrow.classList.toggle("rotateImg");

}
function ShowText(num,text){
    const dropdownText=document.getElementById("dropdown-text"+num);
    dropdownText.textContent=text;
}
function ShowHiddenInputBox(){
    const iPayRent=document.getElementById("I-Pay-Rent");
    const P1InputField=document.getElementById("sliderValue");
    const P1RadBtns=document.querySelectorAll(".RadBtn");
    P1RadBtns.forEach(btn=>{
        btn.disabled=false;
    });
    P1InputField.disabled=false;
    iPayRent.style.opacity=1;

}
function HideHiddenInputBox(){
    const iPayRent=document.getElementById("I-Pay-Rent");
    const P1InputField=document.getElementById("sliderValue");
    const P1RadBtns=document.querySelectorAll(".RadBtn");
    P1RadBtns.forEach(btn=>{
        btn.disabled=true;
    });
    P1InputField.disabled=true;
    iPayRent.style.opacity=0.4;
}

//Store data of page 1----------------------------------------------------------------------------------->
function P1SetItem(){
    const P1DDtextcont1=document.getElementById("dropdown-text1").textContent;
    const P1DDtextcont2=document.getElementById("dropdown-text2").textContent;
    const P1DDtextcont3=document.getElementById("dropdown-text3").textContent;
    const P1DDtextcont4=document.getElementById("dropdown-text4").textContent;
    const P1DDtextcont5=document.getElementById("dropdown-text5").textContent;
    const P1radioButtons = document.querySelectorAll(".RadBtn");
    const P1InputFieldValue = document.getElementById("sliderValue").value;
    var selectedRadioButton;
    for (const radioButton of P1radioButtons) {
        if (radioButton.checked) {
            selectedRadioButton = radioButton.value;
            break;
        }
    }
    const P1textContents={P1DDtextcont1, P1DDtextcont2,P1DDtextcont3,P1DDtextcont4,P1DDtextcont5,selectedRadioButton,P1InputFieldValue};
    console.log(P1textContents);
    sessionStorage.setItem("P1textContents",JSON.stringify(P1textContents));
}


//PAGE2 JAVASCRIPT............................................................................................................................

function P2SetItem(){
    //radios
    const P2radioButtons1 = document.querySelectorAll(".RadBtn1");
    var selectedRadioButton1;
    for (const radioButton1 of P2radioButtons1) {
        if (radioButton1.checked) {
            selectedRadioButton1 = radioButton1.value;
            break;
        }
    }
    const P2radioButtons2 = document.querySelectorAll(".RadBtn2");
    var selectedRadioButton2;
    for (const radioButton2 of P2radioButtons2) {
        if (radioButton2.checked) {
            selectedRadioButton2 = radioButton2.value;
            break;
        }
    }
    //inputs
    const P2InputFieldValue1 = document.getElementById("sliderValue1").value;
    const P2InputFieldValue2 = document.getElementById("sliderValue2").value;
    const P2InputFieldValue3 = document.getElementById("sliderValue3").value;
    const P2InputFieldValue4 = document.getElementById("sliderValue4").value;
    const P2InputFieldValue5 = document.getElementById("sliderValue5").value;
    //setting

    const P2detailsArray={P2InputFieldValue1,P2InputFieldValue2,P2InputFieldValue3,P2InputFieldValue4,P2InputFieldValue5,selectedRadioButton1,selectedRadioButton2};
    console.log(P2detailsArray);
    sessionStorage.setItem("P2detailsArray",JSON.stringify(P2detailsArray));

}

//PAGE3 JAVASCRIPT............................................................................................................................

function P3SetItem(){
    //radio
    const P3radioButtons = document.querySelectorAll(".RadBtn");
    var selectedRadioButton;
    for (const radioButton of P3radioButtons) {
        if (radioButton.checked) {
            selectedRadioButton = radioButton.value;
            break;
        }
    }

    //inputs
    const P3InputFieldValue1 = document.getElementById("sliderValue1").value;
    const P3InputFieldValue2 = document.getElementById("sliderValue2").value;
    const P3InputFieldValue3 = document.getElementById("sliderValue3").value;
    const P3InputFieldValue4 = document.getElementById("sliderValue4").value;

    //setting
    const P3detailsArray={P3InputFieldValue1,P3InputFieldValue2,P3InputFieldValue3,P3InputFieldValue4,selectedRadioButton};
    console.log(P3detailsArray);
    sessionStorage.setItem("P3detailsArray",JSON.stringify(P3detailsArray));
}


//PAGE4 JAVASCRIPT............................................................................................................................
function SetOpacityForCards(numOfBtn){
    const P4radioBtn=document.getElementById("radiobtn"+numOfBtn);
    const P4Card=document.getElementById("card"+numOfBtn);
    const P4inputField1=document.getElementById("slider-value"+numOfBtn+"1");
    const P4inputField2=document.getElementById("slider-value"+numOfBtn+"2");
    if(P4radioBtn.checked){
        P4inputField1.disabled=false;
        P4inputField2.disabled=false;
        P4Card.style.opacity=1;
    }
    else{
        P4inputField1.disabled=true;
        P4inputField2.disabled=true;
        P4Card.style.opacity=0.4;
    }
}

function P4SetItem(){
    //checkboxes
    const P4checkBox1=document.getElementById("radiobtn1");
    const P4checkBox2=document.getElementById("radiobtn2");
    const P4checkBox3=document.getElementById("radiobtn3");
    var box1,box2,box3;

    if(P4checkBox1.checked) box1="checked";
    else box1="unchecked";

    if(P4checkBox2.checked) box2="checked";
    else box2="unchecked";

    if(P4checkBox3.checked) box3="checked";
    else box3="unchecked";


    //inputs
    const P4InputFieldValue11 = document.getElementById("slider-value11").value;
    const P4InputFieldValue12 = document.getElementById("slider-value12").value;
    const P4InputFieldValue21 = document.getElementById("slider-value21").value;
    const P4InputFieldValue22 = document.getElementById("slider-value22").value;
    const P4InputFieldValue31 = document.getElementById("slider-value31").value;
    const P4InputFieldValue32 = document.getElementById("slider-value32").value;

    //setting
    const P4detailsArray={P4InputFieldValue11,P4InputFieldValue12,P4InputFieldValue21,P4InputFieldValue22,P4InputFieldValue31,P4InputFieldValue32,box1,box2,box3};
    console.log(P4detailsArray);
    sessionStorage.setItem("P4detailsArray",JSON.stringify(P4detailsArray));


}


//PAGE5 JAVASCRIPT................................................................................................................................

function P5SetItem(){
    //checkboxes
    const P5checkBox1=document.getElementById("checkbox1");
    const P5checkBox2=document.getElementById("checkbox2");
    const P5checkBox3=document.getElementById("checkbox3");
    const P5checkBox4=document.getElementById("checkbox4");
    const P5checkBox5=document.getElementById("checkbox5");
    var box1,box2,box3,box4,box5;

    if(P5checkBox1.checked) box1="checked";
    else box1="unchecked";
    if(P5checkBox2.checked) box2="checked";
    else box2="unchecked";
    if(P5checkBox3.checked) box3="checked";
    else box3="unchecked";
    if(P5checkBox4.checked) box4="checked";
    else box4="unchecked";
    if(P5checkBox5.checked) box5="checked";
    else box5="unchecked";

    //inputs
    const P5InputFieldValue11 = document.getElementById("slider-value11").value;
    const P5InputFieldValue12 = document.getElementById("slider-value12").value;
    const P5InputFieldValue13 = document.getElementById("slider-value13").value;
    const P5InputFieldValue14 = document.getElementById("slider-value14").value;
    const P5InputFieldValue21 = document.getElementById("slider-value21").value;
    const P5InputFieldValue22 = document.getElementById("slider-value22").value;
    const P5InputFieldValue31 = document.getElementById("slider-value31").value;
    const P5InputFieldValue41 = document.getElementById("slider-value41").value;
    const P5InputFieldValue42 = document.getElementById("slider-value42").value;
    const P5InputFieldValue51 = document.getElementById("slider-value51").value;

    //toggleBoxes
    const P5ToggleBox1 = document.getElementById("P5toggleBox1");
    const P5ToggleBox2 = document.getElementById("P5toggleBox2");
    var checked1,checked2;
    if(P5ToggleBox1.checked) checked1="TRUE";
    else checked1="FALSE";
    if(P5ToggleBox2.checked) checked2="TRUE";
    else checked2="FALSE";
    
    //setting
    const P5detailsArray={P5InputFieldValue11,P5InputFieldValue12,P5InputFieldValue13,P5InputFieldValue14,
                            P5InputFieldValue21,P5InputFieldValue22,P5InputFieldValue31,P5InputFieldValue41,
                            P5InputFieldValue42,P5InputFieldValue51,box1,box2,box3,box4,box5,checked1,checked2};
    console.log(P5detailsArray);
    sessionStorage.setItem("P5detailsArray",JSON.stringify(P5detailsArray));
}


//Ignore bhai amio jani na ki korechi TBVH....
function SetOpacityForTickBoxes(numOfBtn){
    const P5Checkbox=document.getElementById("checkbox"+numOfBtn);
    const P5innerContents=document.getElementById("inner-contents"+numOfBtn);
    if(P5Checkbox.checked){
        P5innerContents.style.opacity=1;
        switch(numOfBtn){
            case 1:
                const P5inputField11=document.getElementById("slider-value11");
                const P5inputField12=document.getElementById("slider-value12");
                const P5inputField13=document.getElementById("slider-value13");
                const P5inputField14=document.getElementById("slider-value14");
                P5inputField11.disabled=false;
                P5inputField12.disabled=false;
                P5inputField13.disabled=false;
                P5inputField14.disabled=false;
                break;
            case 2:
                const P5inputField21=document.getElementById("slider-value21");
                const P5inputField22=document.getElementById("slider-value22");
                const P5OverSixty=document.querySelectorAll(".OverSixty");
                P5OverSixty.forEach(elem=>{
                    elem.style.visibility="visible";
                });
                P5inputField21.disabled=false;
                P5inputField22.disabled=false;
                break;
            case 3:
                const P5inputField31=document.getElementById("slider-value31");
                P5inputField31.disabled=false;
                break;
            case 4:
                const P5inputField41=document.getElementById("slider-value41");
                const P5inputField42=document.getElementById("slider-value42");
                P5inputField41.disabled=false;
                P5inputField42.disabled=false;
                break;
            case 5:
                const P5inputField51=document.getElementById("slider-value51");
                P5inputField51.disabled=false;
                break;
        }
    }
    else{
        P5innerContents.style.opacity=0.5;
        switch(numOfBtn){
            case 1:
                const P5inputField11=document.getElementById("slider-value11");
                const P5inputField12=document.getElementById("slider-value12");
                const P5inputField13=document.getElementById("slider-value13");
                const P5inputField14=document.getElementById("slider-value14");
                const P5inputField15=document.getElementById("slider-value15");
                P5inputField11.disabled=true;
                P5inputField12.disabled=true;
                P5inputField13.disabled=true;
                P5inputField14.disabled=true;
                P5inputField15.disabled=true;
                break;
            case 2:
                const P5inputField21=document.getElementById("slider-value21");
                const P5inputField22=document.getElementById("slider-value22");
                const P5OverSixty=document.querySelectorAll(".OverSixty");
                P5OverSixty.forEach(elem=>{
                    elem.style.visibility="hidden";
                });
                P5inputField21.disabled=true;
                P5inputField22.disabled=true;

                break;
            case 3:
                const P5inputField31=document.getElementById("slider-value31");
                P5inputField31.disabled=true;
                break;
            case 4:
                const P5inputField41=document.getElementById("slider-value41");
                const P5inputField42=document.getElementById("slider-value42");
                P5inputField41.disabled=true;
                P5inputField42.disabled=true;
                break;
            case 5:
                const P5inputField51=document.getElementById("slider-value51");
                P5inputField51.disabled=true;
                break;
        }
    }
}
//surryyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy

function toggleMenu() {
    var menu = document.getElementById('menu');
    menu.classList.toggle('active');

    var menuIcon = document.querySelector('.menu-icon');
    menuIcon.classList.toggle('active');
  }

  function toggleOverlay(num) {
  var overlay = document.getElementById("overlay"+`${num}`);
  var overlayContent = document.getElementById("overlay-content"+`${num}`);
  var btn = document.getElementById("knowbutton"+`${num}`);

  if (overlay.style.opacity == 0) {
    // Show the overlay
    overlay.style.visibility = "visible";
    overlay.style.opacity = 1;
    overlayContent.style.animation = "slideInOverlay 0.5s ease-in-out forwards";
    btn.classList.toggle('active');
  } else {
    // Hide the overlay with slide-out animation
    overlay.style.opacity = 0;
    overlayContent.style.animation = "slideOutOverlay 0.5s ease-in-out forwards";
    setTimeout(function() {
      overlay.style.visibility = "hidden";
    }, 500); // Hide overlay after animation completes
    btn.classList.toggle('active');
  }
}