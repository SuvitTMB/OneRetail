/*
var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
*/
var cleararray = "";
var GroupNews = 0;
var xCal = 0;


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Academy")==null || sessionStorage.getItem("LineID")==null) { location.href = "index.html"; }
  Connect_DB();
  CheckGameRock();
  CheckGameLucky();
  CheckGameQuestion();
  CheckGamePicture();
});


function GotoGame(x) {
  if(x==1) {
    location.href = "intro-game1.html";
  } else if(x==2) { 
    location.href = "intro-game2.html";
  } else if(x==3) { 
    location.href = "intro-game3.html";
  } else if(x==4) { 
    location.href = "intro-game4.html";
  } else if(x==5) { 
    location.href = "intro-game5.html";
  } else if(x==6) { 
    location.href = "intro-game6.html";
  }
}


function CheckGameMatch() {
  var game6 = "";
  var sCheckQ = 0;
  dbttbGameLucky.where('QuizDate','==',thistoday)
  .where('EmpID','==',sessionStorage.getItem("EmpID_Academy"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sCheckQ = 1;
    });
    if(sCheckQ==1) {
      game6 += '<div class="progress"><div class="bar" style="width:100%"></div></div>';
    } else {
      game6 += '<div class="progress"><div class="bar1" style="width:0%"></div></div>';
    }
    $("#RatioGame6").html(game6);  
  });
}


function CheckGameLucky() {
  var game1 = "";
  var sCheckQ = 0;
  dbttbGameLucky.where('QuizDate','==',thistoday)
  .where('EmpID','==',sessionStorage.getItem("EmpID_Academy"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sCheckQ = 1;
    });
    if(sCheckQ==1) {
      game1 += '<div class="progress"><div class="bar" style="width:100%"></div></div>';
    } else {
      game1 += '<div class="progress"><div class="bar1" style="width:0%"></div></div>';
    }
    $("#RatioGame1").html(game1);  
  });
}


function CheckGameQuestion() {
  console.log(sessionStorage.getItem("EmpID_Academy"));
  var game3 = "";
  var sCheckQ = 0;
  dbttbGameQuestion.where('QuizDate','==',thistoday)
  .where('EmpID','==',sessionStorage.getItem("EmpID_Academy"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sCheckQ = 1;
    });
    if(sCheckQ==1) {
      game3 += '<div class="progress"><div class="bar" style="width:100%"></div></div>';
    } else {
      game3 += '<div class="progress"><div class="bar1" style="width:0%"></div></div>';
    }
    $("#RatioGame3").html(game3);  
  });
}


function CheckGamePicture() {
  var game2 = "";
  var sCheckQ = 0;
  dbttbGamePicture.where('QuizDate','==',thistoday)
  .where('EmpID','==',sessionStorage.getItem("EmpID_Academy"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sCheckQ = 1;
    });
    if(sCheckQ==1) {
      game2 += '<div class="progress"><div class="bar" style="width:100%"></div></div>';
    } else {
      game2 += '<div class="progress"><div class="bar1" style="width:0%"></div></div>';
    }
    $("#RatioGame4").html(game2);  
  });
}


function CheckGameRock() {
  var game5 = "";
  var sCheckQ = 0;
  dbttbGameRock.where('QuizDate','==',thistoday)
  .where('EmpID','==',sessionStorage.getItem("EmpID_Academy"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sCheckQ = 1;
    });
    if(sCheckQ==1) {
      game5 += '<div class="progress"><div class="bar" style="width:100%"></div></div>';
    } else {
      game5 += '<div class="progress"><div class="bar1" style="width:0%"></div></div>';
    }
    $("#RatioGame5").html(game5);  
  });
}
