function timeToMins(time) {
    var b = time.split(':');
    return b[0]*60 + +b[1];
  }
  
  // Convert minutes to a time in format hh:mm
  // Returned value is in range 00  to 24 hrs
  function timeFromMins(mins) {
    function z(n){return (n<10? '0':'') + n;}
    var h = (mins/60 |0) % 24;
    var m = mins % 60;
    return z(h) + ':' + z(m);
  }
  
  // Add two times in hh:mm format
  function addTimes(t0, t1) {
    return timeFromMins(timeToMins(t0) + timeToMins(t1));
  }

function calcAll(){

    // timegrp2
    document.getElementById('start2').value = document.getElementById('finish1').value;
    document.getElementById('finish2').value = addTimes(document.getElementById('start2').value, document.getElementById('duration2').value);

    // timegrp3
    document.getElementById('start3').value = document.getElementById('finish2').value;
    document.getElementById('finish3').value = addTimes(document.getElementById('start3').value, document.getElementById('duration3').value);

    // timegrp4
    document.getElementById('start4').value = document.getElementById('finish3').value;
    document.getElementById('finish4').value = addTimes(document.getElementById('start4').value, document.getElementById('duration4').value);
    
    // timegrp5
    document.getElementById('start5').value = document.getElementById('finish4').value;
    document.getElementById('finish5').value = addTimes(document.getElementById('start5').value, document.getElementById('duration5').value);
    
    // timegrp6
    document.getElementById('start6').value = document.getElementById('finish5').value;
    document.getElementById('finish6').value = addTimes(document.getElementById('start6').value, document.getElementById('duration6').value);

    // timegrp7 (bedtime)
    document.getElementById('start7').value = document.getElementById('finish6').value;
    
    // Save locally
    setSavedTimes();
}

// -------------------------------------------------------- 
// ---------------------------- SAVED TIMES: GET / SET / APPLY
// -------------------------------------------------------- 
function setSavedTimes(){
    var durations = {
        finish1: document.getElementById('finish1').value,
        duration2: document.getElementById('duration2').value,
        duration3: document.getElementById('duration3').value,
        duration4: document.getElementById('duration4').value,
        duration5: document.getElementById('duration5').value,
        duration6: document.getElementById('duration6').value
    };
    localStorage.setItem('savedTimes', JSON.stringify(durations));
}
function getSavedTimes(){
    var data = localStorage.getItem('savedTimes');
    var dataObj = JSON.parse(data);
    return dataObj;
}
function applySavedTimes(){
    var savedTimes = getSavedTimes();
    if(savedTimes){
        console.log("loading saved times...")
        document.getElementById('finish1').value = savedTimes.finish1;
        document.getElementById('duration2').value = savedTimes.duration2;
        document.getElementById('duration3').value = savedTimes.duration3;
        document.getElementById('duration4').value = savedTimes.duration4;
        document.getElementById('duration5').value = savedTimes.duration5;
        document.getElementById('duration6').value = savedTimes.duration6;
    }else{
        applyDefaultTimes();
    }
    calcAll();
}

// -------------------------------------------------------- 
// ---------------------------- DEFAULT TIMES: GET / SET / APPLY
// -------------------------------------------------------- 
function applyOriginalDefaultTimes(){
    document.getElementById('finish1').value = "07:00";
    document.getElementById('duration2').value = "03:00";
    document.getElementById('duration3').value = "01:00";
    document.getElementById('duration4').value = "03:30";
    document.getElementById('duration5').value = "01:00";
    document.getElementById('duration6').value = "04:00";
    calcAll();
}
function setDefaultTimes(){
    var durations = {
        finish1: document.getElementById('finish1').value,
        duration2: document.getElementById('duration2').value,
        duration3: document.getElementById('duration3').value,
        duration4: document.getElementById('duration4').value,
        duration5: document.getElementById('duration5').value,
        duration6: document.getElementById('duration6').value
    };
    localStorage.setItem('defaultTimes', JSON.stringify(durations));
}
function getDefaultTimes(){
    var data = localStorage.getItem('defaultTimes');
    var dataObj = JSON.parse(data);
    return dataObj;
}
function applyDefaultTimes(){
    var defaultTimes = getDefaultTimes();
    if(defaultTimes){
        console.log("loading updated default times...")
        document.getElementById('finish1').value = defaultTimes.finish1;
        document.getElementById('duration2').value = defaultTimes.duration2;
        document.getElementById('duration3').value = defaultTimes.duration3;
        document.getElementById('duration4').value = defaultTimes.duration4;
        document.getElementById('duration5').value = defaultTimes.duration5;
        document.getElementById('duration6').value = defaultTimes.duration6;
    }else{
        console.log("using default times...")
        applyOriginalDefaultTimes();
    }
    calcAll();
}



// -------------------------------------------------------- 
// ---------------------------- BUTTONS
// --------------------------------------------------------
function btnSetAsDefault(){
    setDefaultTimes();
    console.log("Saved new defaults.")
    alert("Saved as defaults.");
} 
function btnResetToDefaults(){
    applyDefaultTimes();
    calcAll();
}
function btnClearAll(){
    document.getElementById('finish1').value = "00:00";
    document.getElementById('duration2').value = "00:00";
    document.getElementById('duration3').value = "00:00";
    document.getElementById('duration4').value = "00:00";
    document.getElementById('duration5').value = "00:00";
    document.getElementById('duration6').value = "00:00";
    calcAll();
}
function btnDeleteAllData(){
    btnClearAll();
    localStorage.clear();
}

// -------------------------------------------------------- 
// ---------------------------- Version Check
// --------------------------------------------------------
document.getElementById('version').innerHTML = 'version 01.01';


