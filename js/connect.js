var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var datetoday = "";
var thistoday = "";
var thistoday_th = "";
var xHeaderLog = "";
var xHeaderNews = "";
var xHeaderPoint = 0;
var xProfile = "";
NewDate();

function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyApN5jhPMBkU2YHF2LOcRT1Ce3iFS7PfoQ",
    authDomain: "retail-academy-a40e1.firebaseapp.com",
    projectId: "retail-academy-a40e1",
    storageBucket: "retail-academy-a40e1.appspot.com",
    messagingSenderId: "333936342264",
    appId: "1:333936342264:web:17a1cfef44b11d228eb70d",
    measurementId: "G-Y0RJCH8RY5"
  };
  firebase.initializeApp(firebaseConfig);
  dbProfile = firebase.firestore().collection("UserProfile");
  dbCheckMember = firebase.firestore().collection("CheckProfile");
  dbPulseDate = firebase.firestore().collection("PulseDate");
  dbPulseResult = firebase.firestore().collection("PulseResult");

  dbLoginlog = firebase.firestore().collection("Loginlog");
  dbUserlog = firebase.firestore().collection("Userlog");
  dbRewards = firebase.firestore().collection("Rewards");
  dbRedeem = firebase.firestore().collection("RewardsRedeem");

  dbCalendar = firebase.firestore().collection("Calendar");

  dbGetAllMemo = firebase.firestore().collection("GetAllMemo");
  dbGetAllLike = firebase.firestore().collection("GetAllLike");
  dbCheckAllRead = firebase.firestore().collection("CheckAllRead");

  dbVDOGroup = firebase.firestore().collection("VDOGroup");
  dbVDOTraining = firebase.firestore().collection("VDOTraining");


  dbPulseSurvey = firebase.firestore().collection("PulseSurvey");
  dbUserSurvey = firebase.firestore().collection("UserSurvey");
  dbQuizTheDay = firebase.firestore().collection("Quizoftheday");
  //dbttbMember = firebase.firestore().collection("ttbMember");

  dbttbGameRock = firebase.firestore().collection("ttbGameRock");
  dbttbGameLucky = firebase.firestore().collection("ttbGameLucky");
  dbttbGameQuestion = firebase.firestore().collection("ttbGameQuestion");
  dbttbGamePicture = firebase.firestore().collection("ttbGameImage");

  
  dbLandingPage = firebase.firestore().collection("LandingPage");

  NewDate();

}

function ImgProfile() {
  var str = "";
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="show-profile" width="100px">';
  str += '<div class="box-level">'+ sessionStorage.getItem("Level_Point") +'<br>Level</div></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("EmpName_Academy")+'</div>';
  xProfile = str;
}


function AddUserLog() {
/*
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbUserlog.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Academy"),
    EmpName : sessionStorage.getItem("EmpName_Academy"),
    RefID : sessionStorage.getItem("EmpRefID_Academy"),
    HeadNews : xHeaderNews,
    SubNews : xHeaderLog,
    GetPoint : parseFloat(xHeaderPoint),
    LastPoint : parseFloat(sessionStorage.getItem("XP_Point")),
    LogDate : dateString,
    LogTimeStamp : TimeStampDate
  });
  console.log("XP_Point="+parseFloat(sessionStorage.getItem("XP_Point")));
  console.log("xHeaderPoint="+xHeaderPoint);
  sessionStorage.setItem("XP_Point", parseFloat(sessionStorage.getItem("XP_Point")) + parseFloat(xHeaderPoint));
  sessionStorage.setItem("RP_Point", parseFloat(sessionStorage.getItem("RP_Point")) + parseFloat(xHeaderPoint));
  dbProfile.doc(sessionStorage.getItem("EmpRefID_Academy")).update({
    LastUpdate : dateString,
    XP_Point : parseFloat(sessionStorage.getItem("XP_Point")),
    RP_Point : parseFloat(sessionStorage.getItem("RP_Point"))
  });    
*/
  console.log("Save Log");
}

function imgError(image) {
    image.onerror = "";
    image.src = "./img/box.jpg";
    return true;
}

function imgErrorLearning(image) {
    image.onerror = "";
    image.src = "./clip/vdo.jpg";
    return true;
}

function imgErrorStory(image) {
    image.onerror = "";
    image.src = "./clip/story.jpg";
    return true;
}


function NewDate() {
  var months = new Array(12);
  months[0] = "January";
  months[1] = "February";
  months[2] = "March";
  months[3] = "April";
  months[4] = "May";
  months[5] = "June";
  months[6] = "July";
  months[7] = "August";
  months[8] = "September";
  months[9] = "October";
  months[10] = "November";
  months[11] = "December";
  var today = new Date();
  var day = today.getDate() + "";
  var monthEN = (today.getMonth()) + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  year_th = parseFloat(checkZero(year))+543;
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
  xdateCheck = months[monthEN] + " " + day + ", " + year + " " + hour + ":" + minutes + ":" + seconds ;
  datetoday = day + "/" + month + "/" + year;
  thistoday = day + "/" + month + "/" + year;
  thistoday_th = day + "/" + month + "/" + year_th;
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}
