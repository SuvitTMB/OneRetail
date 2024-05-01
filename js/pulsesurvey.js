var gcheck = 0;
var EidPulseDate = "";
var EidUserSurvey = "";
var EidProfile = "";
var EidPulseRefID = "";
var QuesPulse = "";
var MemoPulse = "";
var xPulsePoint = 0;
xHeaderNews = "Pulse Survey";
xHeaderLog = "รับรางวัลจากการทำ Pulse Survey";
xHeaderPoint = 1;

$(document).ready(function () {
  var str = "";
  var str1 = "";
  var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
  var sLineName = "Website";
  var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
  sessionStorage.setItem("LineID", sLineID);
  sessionStorage.setItem("LineName", sLineName);
  sessionStorage.setItem("LinePicture", sLinePicture);

  //if(sessionStorage.getItem("EmpID_Academy")==null || sessionStorage.getItem("LineID")==null) { location.href = "index.html"; }
  Connect_DB();
  CheckSurvey()
  //CheckDatePulse();
});


function CheckSurvey() {
  console.log(datetoday);
  var str = "";
  dbUserSurvey.where('PulseDate','==',datetoday)
  .where('EmpID','==',sessionStorage.getItem("EmpID_Academy"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      gcheck = 1;
      EidUserSurvey = doc.id;
      //str += '<div><div class="btn-blue" onclick="GotoResult()" style="margin-top:20px; margin-right:5px;">ดูอุณหภูมิของคุณ</div>';
      //str += '<div class="btn-grey" onclick="GotoHome()" style="margin-top:20px;">กลับหน้าแรก</div></div>';
      GotoHome();
    });
    if(gcheck==0) {
      CheckQuestionPulse();
      //str += '<div><div class="btn-grey" onclick="ReadMore()" style="margin-top:20px;margin-right:5px;">อ่านรายละเอียด</div>';
      //str += '<div class="btn-click" onclick="CheckQuestionPulse()" style="margin-top:20px;">เริ่มวัดอุณหภูมิของคุณ</div></div>';
    }
    //document.getElementById('loading').style.display='none';
    $("#CheckStart").html(str);
  });
}


var aChoice1 = 0 ;
var aChoice2 = 0 ;
var aChoice3 = 0 ;
var aChoice4 = 0 ;
var aChoice5 = 0 ;
var aPulseCount = 0;
var aPulseScore = 0;
var aPulseRatio = 0;
function CheckQuestionPulse() {
  //document.getElementById('loading').style.display='none';
  //alert("Check");
  dbPulseDate.where('PulseDate','==',thistoday)
  .where('xTeamGroup','==',sessionStorage.getItem("xTeamGroup"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      //console.log("Found");
      EidPulseDate = doc.id;
      EidPulseRefID = doc.data().PulseRefID;
      xPulsePoint = doc.data().PulsePoint;
      aPulseCount = doc.data().PulseCount;
      aChoice1 = doc.data().Choice1;
      aChoice2 = doc.data().Choice2;
      aChoice3 = doc.data().Choice3;
      aChoice4 = doc.data().Choice4;
      aChoice5 = doc.data().Choice5;
      StartSurvey(doc.data().PulseRefID);
      console.log(xPulsePoint);
    });
  });
}


var Q_memo = "";        
function StartSurvey() {
  console.log("RefSurvey="+EidPulseRefID);
  var str = "";
  document.getElementById('StartPage').style.display='none';
  dbPulseSurvey.where(firebase.firestore.FieldPath.documentId(), "==", EidPulseRefID)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      //EidPulseRefID
      QuesPulse = doc.data().PulseQuestion;
      MemoPulse = doc.data().PulseMemo;
      Q_memo = doc.data().PulseMemo;
      if(doc.data().PulseIMG!="") {
        str += '<div style="margin:10px auto 10px auto;height: 180px; overflow:hidden;"><img src="./img/'+ doc.data().PulseIMG +'" style="width:320px;"></div>';
      } else {
        str += '<div style="margin:10px auto 10px auto;height: 180px; overflow:hidden;"><img src="./img/survey-2.png" style="width:320px;"></div>';
      }
      str += '<a href="#A">';
      str += '<div class="text-Qsurvey">'+ doc.data().PulseQuestion +'</div>';
      str += '<div id="B5" class="btn-choice5" value="5" onclick="SendSurvey(5)"><span style="float: left;"><img src="./img/ratting-5.png" style=" width:32px;"></span><span style="line-height:2;margin-right: 20px;">'+ doc.data().PulseChice5 +'</span></div>';
      str += '<div id="B4" class="btn-choice4" value="4" onclick="SendSurvey(4)"><span style="float: left;"><img src="./img/ratting-4.png" style=" width:32px;"></span><span style="line-height:2;margin-right: 20px;">'+ doc.data().PulseChice4 +'</span></div>';
      str += '<div id="B3" class="btn-choice3" value="3" onclick="SendSurvey(3)"><span style="float: left;"><img src="./img/ratting-3.png" style=" width:32px;"></span><span style="line-height:2;margin-right: 20px;">'+ doc.data().PulseChice3 +'</span></div>';
      str += '<div id="B2" class="btn-choice2" value="2" onclick="SendSurvey(2)"><span style="float: left;"><img src="./img/ratting-2.png" style=" width:32px;"></span><span style="line-height:2;margin-right: 20px;">'+ doc.data().PulseChice2 +'</span></div>';
      str += '<div id="B1" class="btn-choice1" value="1" onclick="SendSurvey(1)"><span style="float: left;"><img src="./img/ratting-1.png" style=" width:32px;"></span><span style="line-height:2;margin-right: 20px;">'+ doc.data().PulseChice1 +'</span></div>';

/*
      str += '<div class="btn-choice4" value="4" onclick="SendSurvey(4)">'+ doc.data().PulseChice4 +'</div>';
      str += '<div class="btn-choice3" value="3" onclick="SendSurvey(3)">'+ doc.data().PulseChice3 +'</div>';
      str += '<div class="btn-choice2" value="2" onclick="SendSurvey(2)">'+ doc.data().PulseChice2 +'</div>';
      str += '<div class="btn-choice1" value="1" onclick="SendSurvey(1)">'+ doc.data().PulseChice1 +'</div>';
*/
      str += '<div class="text-detail">กรุณาเลือกตัวเลือกที่เป็นตัวตนของคุณ เพื่อการประเมินผลที่ถูกต้อง</div>';
      str += '</a>'
    });
    $("#DisplaySurvey").html(str);
    document.getElementById('loading').style.display='none';
  });
  document.getElementById('SurveyPage').style.display='block';
}


var xSelectChoice = 0;
function SendSurvey(x) {
  console.log(x);
  document.getElementById("B1").className = "btn-choice1";  
  document.getElementById("B2").className = "btn-choice2";  
  document.getElementById("B3").className = "btn-choice3";  
  document.getElementById("B4").className = "btn-choice4";  
  document.getElementById("B5").className = "btn-choice5";  
  if(x==1) {
    var b = document.getElementById("B2");  
    b.classList.add("color-grayscale");  
    var c = document.getElementById("B3");  
    c.classList.add("color-grayscale");  
    var d = document.getElementById("B4");  
    d.classList.add("color-grayscale");  
    var e = document.getElementById("B5");  
    e.classList.add("color-grayscale");  
  } else if(x==2) {
    var a = document.getElementById("B1");  
    a.classList.add("color-grayscale");  
    var c = document.getElementById("B3");  
    c.classList.add("color-grayscale");  
    var d = document.getElementById("B4");  
    d.classList.add("color-grayscale");  
    var e = document.getElementById("B5");  
    e.classList.add("color-grayscale");  
  } else if(x==3) {
    var a = document.getElementById("B1");  
    a.classList.add("color-grayscale");  
    var b = document.getElementById("B2");  
    b.classList.add("color-grayscale");  
    var d = document.getElementById("B4");  
    d.classList.add("color-grayscale");  
    var e = document.getElementById("B5");  
    e.classList.add("color-grayscale");  
  } else if(x==4) {
    var a = document.getElementById("B1");  
    a.classList.add("color-grayscale");  
    var b = document.getElementById("B2");  
    b.classList.add("color-grayscale");  
    var c = document.getElementById("B3");  
    c.classList.add("color-grayscale");  
    var e = document.getElementById("B5");  
    e.classList.add("color-grayscale");  
  } else if(x==5) {
    var a = document.getElementById("B1");  
    a.classList.add("color-grayscale");  
    var b = document.getElementById("B2");  
    b.classList.add("color-grayscale");  
    var c = document.getElementById("B3");  
    c.classList.add("color-grayscale");  
    var d = document.getElementById("B4");  
    d.classList.add("color-grayscale");  
  }


  //document.getElementById('loading1').style.display='block';
  var str = "";
  xSelectChoice = x;
  //if(x<=3) {
    //str += '<div style="margin:10px auto 10px auto;height: 170px; overflow:"><img src="./img/survey-3.png" style="width:320px;"></div>';
    str += '<div class="text-Qsurvey">'+ Q_memo  +'</div>';
    $("#DisplayMemo").html(str);
    //document.getElementById('Q_PulseSurvey').style.display='none';
    document.getElementById('A_PulseSurvey').style.display='block';
  //} else {
    //console.log("Survey");
    //SavePulseDate();
  //}
}


var stxtGroupQ = "";
var stxtEtxtStory = "";
function SavePulseDate() {
  document.getElementById('CheckLoading').style.display='block';

/*
  var str = "";
  var PulsePoint = 1;
  console.log("asdfasdf");
  sessionStorage.setItem("XP_Point", parseFloat(sessionStorage.getItem("XP_Point"))+parseFloat(PulsePoint));
  sessionStorage.setItem("RP_Point", parseFloat(sessionStorage.getItem("RP_Point"))+parseFloat(PulsePoint));
  dbProfile.doc(sessionStorage.getItem("EmpRefID_Academy")).update({
    //LastUpdate : dateString,
    XP_Point : parseFloat(sessionStorage.getItem("XP_Point")),
    RP_Point : parseFloat(sessionStorage.getItem("RP_Point"))
  });
  str += '<div class="btn-t3"><b>คุณได้รับเหรียญรางวัล</b></div>';
  str += '<div style="font-size:14px;line-height:1.1;"><img src="./point/coin-'+ PulsePoint +'.png" style="width:100%; max-width: 250px;background:#e9eef3; border-radius:15px;"><br><br>จากกิจกรรม<br><br><b>สำรวจอุณหภูมิความสุข</b></div>';
  str += '<div class="clr" style="height:15px;"></div>';
  str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:15px;">ปิดหน้าต่างนี้</b></div>';
  str += '<div class="clr" style="height:40px;"></div>';
  $("#DisplayGetPoint").html(str);  
  document.getElementById('id02').style.display='block';
*/

  document.getElementById('A_PulseSurvey').style.display='none';
  document.getElementById('Q_PulseSurvey').style.display='none';
  //alert("dsfadsfs");
  stxtGroupQ = document.getElementById("txtGroupQ").value;
  stxtStory = document.getElementById("txtStory").value;
  aPulseCount = parseFloat(aPulseCount) + 1;
  if(xSelectChoice==1) { 
    aChoice1 = parseFloat(aChoice1) + 1;
  } else if(xSelectChoice==2) { 
    aChoice2 = parseFloat(aChoice2) + 1;
  } else if(xSelectChoice==3) { 
    aChoice3 = parseFloat(aChoice3) + 1;
  } else if(xSelectChoice==4) { 
    aChoice4 = parseFloat(aChoice4) + 1;
  } else if(xSelectChoice==5) { 
    aChoice5 = parseFloat(aChoice5) + 1;
  }
  aPulseScore = (aChoice1*1) + (aChoice2*2) + (aChoice3*3) + (aChoice4*4) + (aChoice5*5);
  aPulseRatio = aPulseScore / (aPulseCount * 5) * 100;
  dbPulseDate.doc(EidPulseDate).update({
    PulseCount: parseFloat(aPulseCount),
    Choice1: parseFloat(aChoice1),
    Choice2: parseFloat(aChoice2),
    Choice3: parseFloat(aChoice3),
    Choice4: parseFloat(aChoice4),
    Choice5: parseFloat(aChoice5),
    PulseScore: parseFloat(aPulseScore),
    PulseRatio: parseFloat(aPulseRatio).toFixed(2)
  });    
  //console.log("Save 1");
  //console.log("Save 1111");
  SaveUserProfile();
}  


var bChoice1 = 0 ;
var bChoice2 = 0 ;
var bChoice3 = 0 ;
var bChoice4 = 0 ;
var bChoice5 = 0 ;
var bPulseCount = 0;
var bPulseScore = 0;
var bPulseRatio = 0;
function SaveUserProfile() {
  dbProfile.where('LineID','==',sessionStorage.getItem("LineID"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidUserSurvey = doc.id;
      bPulseCount = doc.data().PulseCount;
      bChoice1 = doc.data().Choice1;
      bChoice2 = doc.data().Choice2;
      bChoice3 = doc.data().Choice3;
      bChoice4 = doc.data().Choice4;
      bChoice5 = doc.data().Choice5;
    });
    bPulseCount = parseFloat(bPulseCount) + 1;
    if(xSelectChoice==1) { 
      bChoice1 = parseFloat(bChoice1) + 1;
    } else if(xSelectChoice==2) { 
      bChoice2 = parseFloat(bChoice2) + 1;
    } else if(xSelectChoice==3) { 
      bChoice3 = parseFloat(bChoice3) + 1;
    } else if(xSelectChoice==4) { 
      bChoice4 = parseFloat(bChoice4) + 1;
    } else if(xSelectChoice==5) { 
      bChoice5 = parseFloat(bChoice5) + 1;
    }
    bPulseScore = (bChoice1*1) + (bChoice2*2) + (bChoice3*3) + (bChoice4*4) + (bChoice5*5);
    bPulseRatio = bPulseScore / (bPulseCount * 5) * 100;
    //console.log("ข้อที่เลือก = "+xSelectChoice+"=== "+stxtGroupQ+"=== "+stxtStory);
    //console.log("คะแนนรวม ="+bPulseScore+" คะแนนความสุข ="+bPulseRatio);
    dbProfile.doc(EidUserSurvey).update({
      PulseCount: parseFloat(bPulseCount),
      Choice1: parseFloat(bChoice1),
      Choice2: parseFloat(bChoice2),
      Choice3: parseFloat(bChoice3),
      Choice4: parseFloat(bChoice4),
      Choice5: parseFloat(bChoice5),
      PulseScore: parseFloat(bPulseScore),
      PulseRatio: parseFloat(bPulseRatio).toFixed(2)
    });    
    console.log("Save 2");
    SavePulseSurvey();
  });    
}


var cChoice1 = 0 ;
var cChoice2 = 0 ;
var cChoice3 = 0 ;
var cChoice4 = 0 ;
var cChoice5 = 0 ;
var cPulseCount = 0;
var cPulseScore = 0;
var cPulseRatio = 0;
function SavePulseSurvey() {
  dbPulseSurvey.where(firebase.firestore.FieldPath.documentId(), "==", EidPulseRefID)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      cPulseCount = doc.data().PulseCount;
      cChoice1 = doc.data().Choice1;
      cChoice2 = doc.data().Choice2;
      cChoice3 = doc.data().Choice3;
      cChoice4 = doc.data().Choice4;
      cChoice5 = doc.data().Choice5;
    });
    cPulseCount = parseFloat(cPulseCount) + 1;
    if(xSelectChoice==1) { 
      cChoice1 = parseFloat(cChoice1) + 1;
    } else if(xSelectChoice==2) { 
      cChoice2 = parseFloat(cChoice2) + 1;
    } else if(xSelectChoice==3) { 
      cChoice3 = parseFloat(cChoice3) + 1;
    } else if(xSelectChoice==4) { 
      cChoice4 = parseFloat(cChoice4) + 1;
    } else if(xSelectChoice==5) { 
      cChoice5 = parseFloat(cChoice5) + 1;
    }
    cPulseScore = (cChoice1*1) + (cChoice2*2) + (cChoice3*3) + (cChoice4*4) + (cChoice5*5);
    cPulseRatio = cPulseScore / (cPulseCount * 5) * 100;
    dbPulseSurvey.doc(EidPulseRefID).update({
      PulseCount: parseFloat(cPulseCount),
      Choice1: parseFloat(cChoice1),
      Choice2: parseFloat(cChoice2),
      Choice3: parseFloat(cChoice3),
      Choice4: parseFloat(cChoice4),
      Choice5: parseFloat(cChoice5),
      PulseScore: parseFloat(cPulseScore),
      PulseRatio: parseFloat(cPulseRatio).toFixed(2)
    });    
    console.log("Save 3");
    SavePulseResult();
  });    
}


var dChoice1 = 0 ;
var dChoice2 = 0 ;
var dChoice3 = 0 ;
var dChoice4 = 0 ;
var dChoice5 = 0 ;
var dPulseCount = 0;
var dPulseScore = 0;
var dPulseRatio = 0;
var EidPulseSurvey = "";
function SavePulseResult() {
  dbPulseResult.where('xTeamGroup','==',sessionStorage.getItem("xTeamGroup"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidPulseSurvey = doc.id;
      dPulseCount = doc.data().PulseCount;
      dChoice1 = doc.data().Choice1;
      dChoice2 = doc.data().Choice2;
      dChoice3 = doc.data().Choice3;
      dChoice4 = doc.data().Choice4;
      dChoice5 = doc.data().Choice5;
    });
    dPulseCount = parseFloat(dPulseCount) + 1;
    if(xSelectChoice==1) { 
      dChoice1 = parseFloat(dChoice1) + 1;
    } else if(xSelectChoice==2) { 
      dChoice2 = parseFloat(dChoice2) + 1;
    } else if(xSelectChoice==3) { 
      dChoice3 = parseFloat(dChoice3) + 1;
    } else if(xSelectChoice==4) { 
      dChoice4 = parseFloat(dChoice4) + 1;
    } else if(xSelectChoice==5) { 
      dChoice5 = parseFloat(dChoice5) + 1;
    }
    dPulseScore = (dChoice1*1) + (dChoice2*2) + (dChoice3*3) + (dChoice4*4) + (dChoice5*5);
    dPulseRatio = dPulseScore / (dPulseCount * 5) * 100;
    dbPulseResult.doc(EidPulseSurvey).update({
      PulseCount: parseFloat(dPulseCount),
      Choice1: parseFloat(dChoice1),
      Choice2: parseFloat(dChoice2),
      Choice3: parseFloat(dChoice3),
      Choice4: parseFloat(dChoice4),
      Choice5: parseFloat(dChoice5),
      PulseScore: parseFloat(dPulseScore),
      PulseRatio: parseFloat(dPulseRatio).toFixed(2)
    });    
    console.log("Save 4");
    SaveUserSurvey();
  });    
}


function SaveUserSurvey() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  var zCalPoint = (parseFloat(xSelectChoice)/5) * 100;
  stxtGroupQ = document.getElementById("txtGroupQ").value;
  stxtStory = document.getElementById("txtStory").value;
  dbUserSurvey.add({
    LineID: sessionStorage.getItem("LineID"),
    LinePicture: sessionStorage.getItem("LinePicture"),
    EmpID: sessionStorage.getItem("EmpID_Academy"),
    EmpName: sessionStorage.getItem("EmpName_Academy"),
    PulseStatus: 0,
    FollowCase: 0,
    PulseChoice: parseFloat(xSelectChoice),
    PulseDate: thistoday,
    PulseGroup: stxtGroupQ,
    PulseRatio: parseFloat(zCalPoint).toFixed(2),
    RefID: EidPulseRefID,
    PulseQus: QuesPulse,
    PulseMemo: MemoPulse,
    PulseStory: stxtStory,
    PulseRead: 0,
    PulseLike: 0,
    PulseComment: 0,
    TimeStamp: TimeStampDate,
    DateSurvey: dateString
  });
  document.getElementById('Q_thankyou').style.display='block';
  //console.log("Save 5");
  AddUserLog();
  GetPoint();
  //CheckTapMemo();
}


function GetPoint() {
  console.log(xPulsePoint);
  document.getElementById('loading').style.display='none';
  var str = "";
  //var PulsePoint = 1;
  sessionStorage.setItem("XP_Point", parseFloat(sessionStorage.getItem("XP_Point"))+parseFloat(xPulsePoint));
  sessionStorage.setItem("RP_Point", parseFloat(sessionStorage.getItem("RP_Point"))+parseFloat(xPulsePoint));

  dbProfile.doc(sessionStorage.getItem("EmpRefID_Academy")).update({
    XP_Point : parseFloat(sessionStorage.getItem("XP_Point")),
    RP_Point : parseFloat(sessionStorage.getItem("RP_Point"))
  });
  str += '<div class="textheader" style="margin: 30px auto;">คุณได้รับเหรียญรางวัล</div>';
  str += '<div style="font-size:14px;line-height:1.1;margin-top:20px;"><img src="./point/coin-'+ xPulsePoint +'.png" style="width:100%; max-width: 250px;background:#e9eef3; border-radius:15px;"><br><br><br>จากกิจกรรม<br><b>แบบสำรวจอุณหภูมิความสุขในการทำงาน</b></div>';
  str += '<div class="clr"></div>';
  str += '<div class="btn-grey" onclick="CloseAll()" style="margin-top:20px;">ปิดหน้าต่างนี้</b></div>';
  str += '<div class="clr" style="height:40px;"></div>';
  $("#DisplayGetPoint").html(str);  
  document.getElementById('CheckLoading').style.display='none';
  setInterval(GotoHome, 2000);
  //document.getElementById('id02').style.display='block';  
  //GotoHome();
}


function GotoHome() {
  location.href = "home.html";
}


function GotoResult() {
  location.href = "pulseresult.html";
}

function ReadMore() {
  document.getElementById('id01').style.display='block';
}

function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
}
