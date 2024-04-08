var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var datetoday = "";
var thistoday = "";


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
  dbttblog = firebase.firestore().collection("ttblog");
  dbPulseDate = firebase.firestore().collection("PulseDate");
  dbPulseResult = firebase.firestore().collection("PulseResult");

  dbGetAllMemo = firebase.firestore().collection("GetAllMemo");
  dbGetAllLike = firebase.firestore().collection("GetAllLike");


  dbPulseSurvey = firebase.firestore().collection("PulseSurvey");
  dbUserSurvey = firebase.firestore().collection("UserSurvey");
  dbQuizTheDay = firebase.firestore().collection("Quizoftheday");
  //dbttbMember = firebase.firestore().collection("ttbMember");
  NewDate();

}


function imgError(image) {
    image.onerror = "";
    image.src = "./img/box.jpg";
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
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
  xdateCheck = months[monthEN] + " " + day + ", " + year + " " + hour + ":" + minutes + ":" + seconds ;
  datetoday = day + "/" + month + "/" + year;
  thistoday = day + "/" + month + "/" + year;
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}
