var counter = 0;
var batteryCharging = false;
var counterTimer;

navigator.getBattery().then(function(battery) {
  function updateAllBatteryInfo(){
    updateChargeInfo();
    updateLevelInfo();
  }
  updateAllBatteryInfo();

  battery.addEventListener('chargingchange', function(){
    updateChargeInfo();
  });
  function updateChargeInfo(){
    console.log("Battery charging? "
                + (battery.charging ? "Yes" : "No"));

    battery.charging ? chargingCounter() : pauseCounter() ;
    batteryCharging = battery.charging;
    printCounter();
  }

  battery.addEventListener('levelchange', function(){
    updateLevelInfo();
  });
  function updateLevelInfo(){
    console.log("Battery level: "
                + battery.level * 100 + "%");
    document.querySelector('#level').innerText = `${battery.level * 100}%`;
  }  

  function chargingCounter() {
    if(!batteryCharging) {
      // battery was not charging start the counter
      counterTimer = setInterval(incrementCounter, 1000);
    }
  }

  function pauseCounter() {
    clearInterval(counterTimer);    
  }

  function incrementCounter() {
    counter++;
    printCounter();
  }

  function getBMR() {
    // BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(y) + 5         (man)
    // BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(y) - 161     (woman)

    var weight = 95;
    var height = 180;
    var age = 26;
    var male = true;

    var bmr = (10 * weight) + (6.25 * height) - (5*age)

    bmr = male ? bmr + 5 : bmr - 161;
    return bmr;
  }
  
  function printCounter() {
    var BMR = getBMR();
    var Mets = 8
    var hour = (counter / 60 ) / 60;
    var Calorie = BMR * (Mets/24) * hour;

    document.querySelector('#charging').innerText = Calorie.toFixed(1);
  }

  function resetCounter() {
    counter = 0;
    printCounter()
  }




});
