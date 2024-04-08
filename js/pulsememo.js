var EidRefIDmemo = "";
var ClickMemo = 0;
var ClickLike = 0;

$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Academy")==null || sessionStorage.getItem("LineID")==null) { location.href = "index.html"; }
  EidRefIDmemo = getParameterByName('gid');
  console.log(EidRefIDmemo);
  Connect_DB();
  CheckPulseMemo();
  ClickSendLike();
  ShowLike();
});


function getParameterByName(name, url) {
  str = '';
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function CheckPulseMemo() {
  var str = "";
  var xRatio = 100;
  //if(EidRefIDmemo=="") { location.href = "pulseresult.html"; }
  dbUserSurvey.where(firebase.firestore.FieldPath.documentId(), "==", EidRefIDmemo)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      var xValue = (doc.data().PulseChoice) * 20;
      str += '<div class="btn-memu">บันทึกข้อมูลอุณหภูมิของคุณ</div><div class="clr"></div>';
      str += '<div style="margin:20px 0px 5px 0px; text-align:left;"><img src="'+ doc.data().LinePicture +'" onerror="javascript:imgError(this)" class="chart-profilt"></div>';
      str += '<div class="boxmemo" style="margin-top:20px; min-height:95px; background:#64b5c0;">';
      str += '<div class="font13bb" style="margin-bottom:6px;height:32px;">'+ doc.data().PulseQus +'</div>';
      str += '<div class="row-header" style="padding:5px; text-align:center; margin-top:8px;">อุณหภูมิข้อนี้</div>';
      str += '<div class="row-progress"><progress value="'+ xValue +'" max="'+ xRatio +'" style="--value: '+ xValue +'; --max: '+ xRatio +';"></progress></div>';
      str += '</div>';
/*
      str += '<div class="boxmemo">';
      str += '<div class="font13bb">'+ doc.data().PulseMemo +'</div>';
      str += '</div>';
*/


      str += '<div class="boxmemo" style="background:#4798a4;">';
      str += '<div class="font13bb">'+ doc.data().PulseMemo +'</div>';
      str += '<div class="font13b" style="padding-top:8px;">'+ doc.data().PulseStory +'</div>';
      str += '<div class="entry-meta"><ul>';
      str += '<li class="d-flex align-items-center"><i class="icofont-wall-clock"></i>'+ doc.data().PulseDate +'</li>';
      str += '<li class="d-flex align-items-center"><i class="icofont-alarm"></i>'+ parseFloat(doc.data().PulseRead) +' Read</li>';
      str += '<li class="d-flex align-items-center"><i class="icofont-like"></i>'+ parseFloat(doc.data().PulseLike) +' Like</li>';
      str += '<li class="d-flex align-items-center"><i class="icofont-comment"></i>'+ parseFloat(doc.data().PulseComment) +' Comment</li>';
      str += '</ul></div></div>';
      str += '<div id="ShowClickLike"></div>';



      //str +='<div class="chart-box">';
      //str +='<div class="chart-img"><img src="https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8" onerror="javascript:imgError(this)" class="chart-profilt"></div>';
      //str +='<div class="chart-text">ปี 2559 จั๊กกะบุ๋ม เชิญยิ้ม ถูก ศร อิจฉา อดีตนักร้องเจ้าของเพลงฮิต อิจฉา ที่เดินทางเข้าร้องทุกข์ สน.ท่าข้าม หลังจากที่ถูก จั๊กกะบุ๋ม ข่มขู่โดยการโทรศัพท์มาหายามวิกาล โพสต์คลิปท้าตีท้าต่อยในเฟซบุ๊กจนเป็นคดีความ สุดท้ายจบที่มีการไกล่เกลี่ยกันในชั้นศาลโดยได้ขอโทษกันและกัน และจบเรื่องนี้ด้วยดี<div class="chart-date"><b><font color="#000">Website</font></b> | โพส : 04/04/2024 16:49:31 PM</div></div></div>';
      //str +='<div class="clr"></div>';


      //str += 'RefID='+EidRefIDmemo;
      //console.log("Found = "+doc.data().PulseQus);
      //console.log("Found = "+sessionStorage.getItem("Admin_Pulse"));
    });
    document.getElementById('loading').style.display='none';
    document.getElementById('DisplayMemo').style.display='block';
    $("#RefMember").html(str);
    ShowMemo();    
  });
}


function ShowMemo() {
  var i = 0;
  var str = "";
  dbGetAllMemo.where('RefID','==',EidRefIDmemo)
  .orderBy('WriteTimeStamp','desc')
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      str +='<div class="chart-box">';
      str +='<div class="chart-img"><img src="'+ doc.data().LinePicture +'" onerror="javascript:imgError(this)" class="chart-profilt" title="'+ doc.data().LineName +'"></div>';
      str +='<div class="chart-text">'+doc.data().WriteMemo+'<div class="chart-date"><b><font color="#f68b1f">'+ doc.data().LineName +'</font></b> | โพส : '+doc.data().WriteDate+'</div></div></div>';
      str +='<div class="clr"></div>';
      i++;
    });
    if(i==0) {
      str = '<div class="no-message-box" style="width:100%;">ยังไม่มีข้อความจากเพื่อน</div>';
    }
    $("#DisplayAllMemo").html(str);
  });
}


function ShowLike() {
  var xCheck = "";
  var xxx = "";
  var str = '';
  var i = 0;
  dbGetAllLike.where('LikeID','==',EidRefIDmemo)
  .orderBy('LikeTimeStamp','desc')
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      str += '<img src="'+ doc.data().LinePicture +'" onerror="javascript:imgError(this)" class="chart-profilt" title="'+ doc.data().LineName +'">';
      i++;
    });
    if(i==0) {
      str = '<div class="memo-text" style="text-align:center;">ยังไม่มีกำลังใจส่งมา</div>';
    }
    $("#DisplayShowLike").html(str);
  });
}


function CheckAllCount() {
  dbUserSurvey.where(firebase.firestore.FieldPath.documentId(), "==", EidRefIDmemo)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      ClickMemo = doc.data().PulseComment;
      ClickSendComment();
    });
  });
}


function ClickSendComment() {
  var sMemo = document.getElementById("txtDetail").value;
  ClickMemo = (parseInt(ClickMemo)+1);
  console.log("Comment="+ClickMemo);
  //ClickView = ClickView-1;
  if(sMemo!="") {
    NewDate();
    var TimeStampDate = Math.round(Date.now() / 1000);
    dbGetAllMemo.add({
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID_Academy"),
      EmpName : sessionStorage.getItem("EmpName_Academy"),
      RefID : EidRefIDmemo,
      WriteMemo : sMemo,
      WriteDate : dateString,
      WriteTimeStamp : TimeStampDate
    });
    dbUserSurvey.doc(EidRefIDmemo).update({
      PulseComment: ClickMemo,
      FollowCase: 1
    });
    //ShowView();
    //ShowMemo();
    document.getElementById("txtDetail").value = "";
    ShowLike();
    ShowMemo();
    //document.getElementById('id02').style.display='block';
  } else {
    //document.getElementById('id02').style.display='block';
  }
}


var sClickLike_user = 0;
function ClickSendLike() {
  //CheckCountLike();
  var str = "";
  dbGetAllLike.where('LineID','==',sessionStorage.getItem("LineID"))
  .where('LikeID','==',EidRefIDmemo)
  //.orderBy('LikeTimeStamp','desc')
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      sClickLike_user  = 1;
    });
    if(sClickLike_user==0) {
      str +='<img src="./img/like1.png" class="chart-like" id="ShowClickLike" onclick="SaveClickLike()">';
    } else {
      str +='<img src="./img/like2.png" class="chart-dislike" id="ShowClickLike">';
    }
    $("#ShowClickLike").html(str);
  });
}


function SaveClickLike() {
  //CheckCountLike();
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbGetAllLike.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Academy"),
    EmpName : sessionStorage.getItem("EmpName_Academy"),
    LikeID : EidRefIDmemo,
    LikeDate : dateString,
    LikeTimeStamp : TimeStampDate
  });
  dbUserSurvey.doc(EidRefIDmemo).update({
    PulseLike : parseInt(ClickLike)+1
  });
  ClickSendLike();
  ShowLike();
  //CheckUserLike();
  //CheckCountLike();
  //ShowLike();
  //document.getElementById('id03').style.display='block';
}
/*

var CalUserSurvey = 0;
function CheckUserSurvey() {
  dbUserSurvey.where('PulseDate','==',thistoday)
  .where('EmpID','==',sessionStorage.getItem("EmpID_Academy"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CalUserSurvey = doc.data().PulseRatio;
      console.log("Found = "+CalUserSurvey);
    });
    CheckUserProfile();
  });
}

var CalUserProfile = 0;
function CheckUserProfile() {
  dbProfile.where('LineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CalUserProfile = doc.data().PulseRatio;
    });
    CheckPulseDate();
  });
}


var CalPulseDate = 0;
var CheckPulseRefID = "";
function CheckPulseDate() {
  dbPulseDate.where('PulseDate','==',thistoday)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CalPulseDate = doc.data().PulseRatio;
      CheckPulseRefID = doc.data().PulseRefID;
      console.log("Found = "+CalPulseDate);
    });
    CheckPulseResult();
  });
}


var CalPulseSurvey = 0;
function CheckPulseResult() {
  dbPulseResult.where('xTeamGroup','==',sessionStorage.getItem("xTeamGroup"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CalPulseResult = doc.data().PulseRatio;
      console.log("Found = "+CalPulseResult);
    });
    CheckSurvey();
  });
}


var CalPulseSurvey = 0;
function CheckPulseSurvey() {
  dbPulseSurvey.where(firebase.firestore.FieldPath.documentId(), "==", CheckPulseRefID)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CalPulseSurvey = doc.data().PulseRatio;
      console.log("Found = "+CalPulseSurvey);
    });
    CheckSurvey();
  });
}




function CheckSurvey() {
  var xRatio = "100";
  var str = "";
  str += '<div class="clr" style="height:0px;"></div>';
  str += '<div class="btn-memu">ภาพรวมความสุขในการทำงาน</div>';
  str += '<div style="margin-top:20px;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="show-profile" width="100px"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  str += '<div class="half-arc" style="--percentage:'+ parseFloat(CalUserProfile).toFixed(2) +'%;"><span class="label" style="color:#ffffff; padding-top:30px;">'+ parseFloat(CalUserProfile).toFixed(2) +'%</span></div>';
  str += '<div class="txt-white">ภาพรวมอุณหภูมิความสุขในการทำงานของคุณ</div>';
  str += '<div class="clr" style="height:25px"></div>';
  str += '<div class="row-header">อุณหภูมิ<br>ของคุณวันนี้</div>';
  str += '<div class="row-progress"><progress value="'+ parseFloat(CalUserSurvey).toFixed(0) +'" max="'+ xRatio +'" style="--value: '+ parseFloat(CalUserSurvey).toFixed(0) +'; --max: '+ xRatio +';"></progress></div>';
  str += '<div class="row-header">อุณหภูมิรวม<br>ของทุกคนวันนี้</div>';
  str += '<div class="row-progress"><progress value="'+ parseFloat(CalPulseDate).toFixed(0) +'" max="'+ xRatio +'" style="--value: '+ parseFloat(CalPulseDate).toFixed(0) +'; --max: '+ xRatio +';"></progress></div>';
  str += '<div class="row-header">อุณหภูมิรวม<br>ของตัวคุณ</div>';
  str += '<div class="row-progress"><progress value="'+ parseFloat(CalUserProfile).toFixed(0) +'" max="'+ xRatio +'" style="--value: '+ parseFloat(CalUserProfile).toFixed(0) +'; --max: '+ xRatio +';"></progress></div>';
  str += '<div class="row-header">อุณหภูมิรวม<br>ของทุกคน</div>';
  str += '<div class="row-progress"><progress value="'+ parseFloat(CalPulseResult).toFixed(0) +'" max="'+ xRatio +'" style="--value: '+ parseFloat(CalPulseResult).toFixed(0) +'; --max: '+ xRatio +';"></progress></div>';
  str += '</div>';
  $("#DisplayMyPoint").html(str); 
  document.getElementById('loading').style.display='none';
  CheckTapMemo();
}



function CheckTapMemo(x) {
  document.getElementById('DisplayHeader').style.display='block';
  var str = "";
  var xMemo = 0;
  if(x==undefined) { x = 1; }
  dbUserSurvey.where('LineID','==',sessionStorage.getItem("LineID"))
  .where('PulseChoice','==',parseFloat(x))
  .orderBy('TimeStamp','desc')
  .limit(10)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xMemo = 1;
      str += '<div class="boxmemo"><div class="font13w">';
      str += '<div><div class="memo-header">'+ doc.data().PulseMemo +'</div><div class="btn-more" style="width:30%; float: left;" onclick="GotoShowMemo(\''+ doc.id +'\')">ดูรายละเอียด</div></div>';
      str += '<div class="clr"></div>'+ doc.data().PulseStory +'</div>';
      str += '<div class="entry-meta"><ul>';
      str += '<li class="d-flex align-items-center"><i class="icofont-wall-clock"></i>'+ doc.data().PulseDate +'</li>';
      str += '<li class="d-flex align-items-center"><i class="icofont-alarm"></i>'+ parseFloat(doc.data().PulseRead) +' Read</li>';
      str += '<li class="d-flex align-items-center"><i class="icofont-like"></i>'+ parseFloat(doc.data().PulseLink) +' Like</li>';
      str += '<li class="d-flex align-items-center"><i class="icofont-comment"></i>'+ parseFloat(doc.data().PulseComment) +' Comment</li>';
      str += '</ul></div></div>';
    });
    if(xMemo==0) {
      str += '<div class="boxmemo-none">*** ไม่มีข้อมูล ***</div>';
    }
    document.getElementById('DisplayMemo').style.display='block';
    $("#Tap-"+x).html(str);
  });
}


function GotoShowMemo(x) {
  alert(x);
  location.href = "pulsememo.html?gid="+x;
}
*/
/*
var CheckFoundData = 0;
var NewJointoDay = 0;
var xDateToDay = "";
function CheckData() {
  dbProfile.where('LineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckFoundData = 1;
      //if(doc.data().StatusConfirm==1) {
        EidProfile = doc.id;
        CheckUserProfile(doc.data().EmpID);
        sessionStorage.setItem("EmpName_Academy", doc.data().EmpName);
        sessionStorage.setItem("EmpRefID_Academy", doc.id);
        sessionStorage.setItem("EmpPhone_Academy", doc.data().EmpPhone);
        sessionStorage.setItem("EmpAddress_Academy", doc.data().EmpAddress);
        sessionStorage.setItem("Level_Point", doc.data().Level_Point);
        sessionStorage.setItem("XP_Point", doc.data().XP_Point);
        sessionStorage.setItem("RP_Point", doc.data().RP_Point);
        sessionStorage.setItem("DM_Point", doc.data().DM_Point);
        sessionStorage.setItem("LastUpdate", doc.data().LogDateTime);
        sessionStorage.setItem("PulseRatio", doc.data().PulseRatio);
        //AA = parseFloat(doc.data().PulseRatio).toFixed(0);
        xDateToDay = doc.data().DateToDay;
        UpdatePorfile();
        if(doc.data().Level_Point==1 && doc.data().XP_Point >= 100) {
          NextLevel(2);
        } else if(doc.data().Level_Point==2 && doc.data().XP_Point >= 300) { 
          NextLevel(3);
        } else if(doc.data().Level_Point==3 && doc.data().XP_Point >= 600) { 
          NextLevel(4);
        } else if(doc.data().Level_Point==4 && doc.data().XP_Point >= 1000) { 
          NextLevel(5);
        }
        if(doc.data().JoinTime==0) {
          FirstTimeMember();
        }
    });
    if(CheckFoundData==0) {
      document.getElementById('loading').style.display='none';
      document.getElementById('NoService').style.display='none';
      document.getElementById('NewMember').style.display='block';
    }
  });
}


function UpdatePorfile() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbProfile.doc(EidProfile).update({
    EmpPicture : sessionStorage.getItem("LinePicture"),
    Linename : sessionStorage.getItem("LineName")
  });

  dbttblog.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Academy"),
    EmpName : sessionStorage.getItem("EmpName_Academy"),
    LogDate : dateString,
    LogTimeStamp : TimeStampDate
  });
  //console.log("Update");
}


var xCheckOut = 0;
function CheckUserProfile(eid) {
  dbCheckMember.where('xEmpID','==',parseFloat(eid))
  .where('xChief_eng','in',['CRSG','CRSG'])
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xCheckOut = 1;
      sessionStorage.setItem("EmpID_Academy", eid);
      sessionStorage.setItem("xTeamGroup", doc.data().xTeamGroup);
      sessionStorage.setItem("xBranch", doc.data().xBranch);
      sessionStorage.setItem("xDepartment", doc.data().xDepartment);
      sessionStorage.setItem("xGroup", doc.data().xGroup);
      sessionStorage.setItem("xChief_th", doc.data().xChief_th);
      sessionStorage.setItem("xChief_eng", doc.data().xChief_eng);
      sessionStorage.setItem("xPosition", doc.data().xPosition);
      dbProfile.doc(sessionStorage.getItem("EmpRefID_Academy")).update({
        Linename : sessionStorage.getItem("LineName"),
        LinePicture : sessionStorage.getItem("LinePicture"),
        xTeamGroup : sessionStorage.getItem("xTeamGroup"),
        xBranch : sessionStorage.getItem("xBranch"),
        xDepartment : sessionStorage.getItem("xDepartment"),
        xGroup : sessionStorage.getItem("xGroup"),
        xChief_th : sessionStorage.getItem("xChief_th"),
        xChief_eng : sessionStorage.getItem("xChief_eng"),
        xPosition : sessionStorage.getItem("xPosition")
      });

      if(thistoday!=xDateToDay) {
        //alert("check1"+thistoday+"==="+xDateToDay);
        CheckDateIn();
      } else {
        //alert("check2"+thistoday+"==="+xDateToDay);
        MyPointMenu();
      }
      //MyPointMenu();
    });
    if(xCheckOut==0) {
      document.getElementById('loading').style.display='none';
      document.getElementById('NoService').style.display='block';
    }
  });
}


function FirstTimeMember() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  var newPoint = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  var NewScore = random_item(newPoint);
  dbProfile.doc(EidProfile).update({
    Level_Point : 1,
    JoinTime : 1,
    XP_Point : parseFloat(NewScore),
    RP_Point : parseFloat(NewScore),
    //DM_Point : parseFloat(NewScore),
    DM_Point : 0,
    LogDateTime : dateString,
    LastUpdate : dateString,
    DateToDay : datetoday,
    LogTimeStamp : TimeStampDate
  });
  sessionStorage.setItem("Level_Point", 1);
  sessionStorage.setItem("XP_Point", parseFloat(NewScore));
  sessionStorage.setItem("RP_Point", parseFloat(NewScore));
  sessionStorage.setItem("DM_Point", parseFloat(NewScore));
  WelcomePoint();
  dbttblog.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Academy"),
    EmpName : sessionStorage.getItem("EmpName_Academy"),
    LogDate : dateString,
    LogTimeStamp : TimeStampDate
  });
}


function WelcomePoint() {
  document.getElementById('id01').style.display='block';
  var str = "";
  str += '<div class="text-header" style="margin-top:14px;">Welcome Point</div>';
  str += '<div class="font13" style="margin-top:10px; text-align:center; padding:5px; color:#fff;">ยินดีด้วยคุณได้รับเหรียญรางวัลครั้งแรก<br>จากการเข้าร่วมกิจกรรม One Retail Academy</div>';
  str += '<div class="clr"></div>';
  str += '<div><img src="./point/coin-'+ sessionStorage.getItem("XP_Point") +'.png" style="margin-top:10px;width:100%;border-radius: 15px; background:#fff;"></div>';
  //str += '<div class="btn-start" onclick="GotoHome()" style="margin-top:30px;">คลิกเพื่อเริ่มต้นการใช้งาน</div>';
  str += '<div class="btn-start" onclick="CloseAll()" style="margin-top:30px;">คลิกเพื่อเริ่มต้นการใช้งาน</div>';
  str += '<div style="height: 15px;"></div>';
  $("#BoxTimeGetPoint").html(str);      
}


var sCountTimeJoin = 0;
var sGetRewards = 0;
var xCheckDate = 0;
function CheckDateIn() {
  var str = "";
  dbProfile.where('EmpID','==',sessionStorage.getItem("EmpID_Academy"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      //xJoinTime = doc.data().JoinTime;
      //EidMember = doc.id;
      sessionStorage.setItem("XP_Point", doc.data().XP_Point);
      sessionStorage.setItem("RP_Point", doc.data().RP_Point);
      if(thistoday!=doc.data().DateToDay) {
        //alert("วันไม่เท่ากัน"+thistoday+"===="+doc.data().DateToDay);
        xCheckDate = 1;
        sCountTimeJoin = parseFloat(doc.data().JoinTime)+1;
        if(sCountTimeJoin<=5) { sTarget = 5; sPoint = 5; }
        else if(sCountTimeJoin<=30) { sTarget = 30; sPoint = 10; }
        else if(sCountTimeJoin<=60) { sTarget = 60; sPoint = 15; }
        else if(sCountTimeJoin<=90) { sTarget = 90; sPoint = 20; }
        else if(sCountTimeJoin<=120) { sTarget = 120; sPoint = 30; }
        else if(sCountTimeJoin<=150) { sTarget = 150; sPoint = 40; }
        else if(sCountTimeJoin<=180) { sTarget = 180; sPoint = 50; }
        else if(sCountTimeJoin<=360) { sTarget = 360; sPoint = 100; }
        else sPoint = 0;

        if(sCountTimeJoin==5) {
          sGetRewards = 5;
          GetJoinPoint(5,5);
        } else if(sCountTimeJoin==30) {
          sGetRewards = 10;
          GetJoinPoint(30,10);
        } else if(sCountTimeJoin==60) {
          sGetRewards = 15;
          GetJoinPoint(60,15);
        } else if(sCountTimeJoin==90) {
          sGetRewards = 20;
          GetJoinPoint(90,20);
        } else if(sCountTimeJoin==120) {
          sGetRewards = 30;
          GetJoinPoint(120,30);
        } else if(sCountTimeJoin==150) {
          sGetRewards = 40;
          GetJoinPoint(150,40);
        } else if(sCountTimeJoin==180) {
          sGetRewards = 50;
          GetJoinPoint(180,50);
        } else if(sCountTimeJoin==360) {
          sGetRewards = 100;
          GetJoinPoint(360,100);
        } else {
          str+='<div style="margin-top:15px;">';
          str+='<div class="box-target">เข้าเว็บแล้ว<div class="box-target-number">'+ sCountTimeJoin +'</div>วัน</div>';
          str+='<div class="box-target">เหลืออีก<div class="box-target-number">'+(sTarget-sCountTimeJoin)+'</div>วัน</div>';
          str+='<div class="box-target">เพื่อรับ<div class="box-target-number">'+sPoint+'</div>เหรียญรางวัล</div>';
          str+='</div>';
          $("#BoxTimeLine").html(str);    
          //document.getElementById('loading').style.display='none';  
          document.getElementById("id03").style.display = "block";
        }      
        dbProfile.doc(EidProfile).update({
          DateToDay : thistoday,
          JoinTime : sCountTimeJoin,
          LastCheckIN : dateString
        });
      }
    });
  });
}



function GetJoinPoint(d,x) {
  var str = "";
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  sessionStorage.setItem("XP_Point", parseFloat(sessionStorage.getItem("XP_Point"))+parseFloat(sGetRewards));
  sessionStorage.setItem("RP_Point", parseFloat(sessionStorage.getItem("RP_Point"))+parseFloat(sGetRewards));
  //console.log(xCheckDate+"==="+d+"==="+x);
  if(xCheckDate==1) {
    var xHeader = "ได้รับเหรียญ "+ sGetRewards +" เหรียญรางวัล";
    dbProfile.doc(EidProfile).update({
      XP_Point : parseFloat(sessionStorage.getItem("XP_Point")),
      RP_Point : parseFloat(sessionStorage.getItem("RP_Point")),
      DateToDay : thistoday,
      JoinTime : sCountTimeJoin
    });
    //console.log("New Point");
    //OpenPopMenu(); 
  }         
  str+='<div style="margin-top:25px;">';
  str+='<div style="text-align:center; padding:5px;">ยินดีด้วยคุณได้รับเหรียญรางวัล</div>';
  str+='<div style="text-align:center; font-weight: 600; color:#0056ff;">'+ x +' เหรียญรางวัล</div>';
  str+='<div style="text-align:center; padding:5px;">จากการเข้าชมเว็บไซต์มาแล้ว <b>'+ d +'</b> วัน</div>';
  str+='</div>';
  $("#BoxTimeNewPoint").html(str);      
  document.getElementById("id04").style.display = "block";
}


function CheckDoneSurvey() {
  sessionStorage.setItem("CheckDonePulse", 0);
  dbUserSurvey.where('PulseDate','==',datetoday)
  .where('LineID','==',sessionStorage.getItem("LineID"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sessionStorage.setItem("CheckDonePulse", 1);
    });
    //console.log("ทำแบบสอบถามหรือยัง = "+sessionStorage.getItem("CheckDonePulse"));
  });
}


function GotoMyPoint() {
  document.getElementById("id03").style.display = "none";
  document.getElementById("id04").style.display = "none";
  MyPointMenu();
}

function OneStory() {
  document.getElementById('id02').style.display='block';
}

function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];   
}

function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='none';
  document.getElementById('id04').style.display='none';
}
*/