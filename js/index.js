var xProfile = "";
var gProfile = "";
var AA = 0;

$(document).ready(function () {
/*
  sessionStorage.clear(); 
  var str = "";
  var str1 = "";
  var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
  var sLineName = "Website";
  var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
  sessionStorage.setItem("LineID", sLineID);
  sessionStorage.setItem("LineName", sLineName);
  sessionStorage.setItem("LinePicture", sLinePicture);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="show-profile" width="100px"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  //str += '<div class="NameLine">'+ sessionStorage.getItem("EmpName_Academy")+'</div>';
  str1 += '<div style="color:#fff; font-size: 13px;">เริ่มต้นการเรียนรู้ของ</div><div class="NameLine" style="margin-top:5px;">'+ sessionStorage.getItem("LineName")+'</div>';
  xProfile = str;
  gProfile = sLinePicture;
  $("#MyProfile").html(str);  
  $("#MyProfile-start").html(str1);  
  Connect_DB();
  CheckDoneSurvey();
  CheckData();
*/

  main();
});


async function main() {
  await liff.init({ liffId: "1657509542-4Mwmplqj" });
  document.getElementById("isLoggedIn").append(liff.isLoggedIn());
  if(liff.isLoggedIn()) {
    getUserProfile();
  } else {
    liff.login();
  }
}


async function getUserProfile() {
  var str = "";
  var str1 = "";
  const profile = await liff.getProfile();
  sessionStorage.setItem("LineID", profile.userId);
  sessionStorage.setItem("LineName", profile.displayName);
  sessionStorage.setItem("LinePicture", profile.pictureUrl);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  str1 += '<div style="color:#fff; font-size: 13px;">เริ่มต้นการเรียนรู้ของ</div><div class="NameLine" style="margin-top:5px;">'+ sessionStorage.getItem("LineName")+'</div>';
  xProfile = str;
  gProfile = profile.pictureUrl;
  $("#MyProfile").html(str);  
  $("#MyProfile-start").html(str1);  
  Connect_DB();
  CheckDoneSurvey();
  CheckData();
}


function openWindow() {
  liff.openWindow({
    url: "https://line.me",
    external: true     
  })
}


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
        //sessionStorage.setItem("EmpID_Academy", doc.data().EmpID);
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
/*
      } else if(doc.data().StatusConfirm==2) {
        document.getElementById('loading').style.display='none';
        document.getElementById('PleaseWait').style.display='block';
      } else if(doc.data().StatusConfirm==9) {
        document.getElementById('loading').style.display='none';
        document.getElementById('NoService').style.display='block';
      }
*/
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
  /*
  dbttbMember.doc(EidMember).update({
    LinePicture : sessionStorage.getItem("LinePicture"),
    LineName : sessionStorage.getItem("LineName")
  });
  */
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
/*
    dbttbnewsLog.add({
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID_Society"),
      EmpName : sessionStorage.getItem("EmpName_Society"),
      RefID : EidMember,
      NewsGroup : 0,
      HeadNews : "Join Website",
      SubNews : xHeader,
      GetPoint : parseFloat(sGetRewards),
      LastPoint : parseFloat(sessionStorage.getItem("XP_Point")),
      LogDate : dateString,
      LogTimeStamp : TimeStampDate
    });
*/
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
