var xProfile = "";
var gProfile = "";
var xEmpID = "";
var AA = 0;
xHeaderNews = "30 Days Login";
xHeaderLog = "รับรางวัลจากการเข้าร่วมกิจกรรม 30 วันแรก";
xHeaderPoint = 1;


$(document).ready(function () {
  /*
  sessionStorage.clear(); 
  //console.log("Point="+sessionStorage.getItem("XP_Point"));
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
  str1 += '<div class="textheader">เริ่มต้นการเรียนรู้</div><div class="NameLine" style="margin-top:5px;">'+ sessionStorage.getItem("LineName")+'</div>';
  xProfile = str;
  gProfile = sLinePicture;
  $("#MyProfile").html(str);  
  $("#MyProfile-start").html(str1);  
  Connect_DB();
  CheckData();
  //UpdatePorfile();
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
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="show-profile" width="100px"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  str1 += '<div style="color:#fff; font-size: 13px;">เริ่มต้นการเรียนรู้ของ</div><div class="NameLine" style="margin-top:5px;">'+ sessionStorage.getItem("LineName")+'</div>';
  xProfile = str;
  gProfile = profile.pictureUrl;
  $("#MyProfile").html(str);  
  $("#MyProfile-start").html(str1);  
  Connect_DB();
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
        EidProfile = doc.id;
        xEmpID = doc.data().EmpID;
        CheckUserProfile(doc.data().EmpID);
        sessionStorage.setItem("EmpName_Academy", doc.data().EmpName);
        sessionStorage.setItem("EmpRefID_Academy", doc.id);
        sessionStorage.setItem("EmpPhone_Academy", doc.data().EmpPhone);
        sessionStorage.setItem("EmpAddress_Academy", doc.data().EmpAddress);
        sessionStorage.setItem("JoinTime", doc.data().JoinTime);
        sessionStorage.setItem("Level_Point", doc.data().Level_Point);
        sessionStorage.setItem("XP_Point", doc.data().XP_Point);
        sessionStorage.setItem("RP_Point", doc.data().RP_Point);
        sessionStorage.setItem("QS_Point", doc.data().QS_Point);
        sessionStorage.setItem("PulseCount", doc.data().PulseCount);
        sessionStorage.setItem("LastUpdate", doc.data().LogDateTime);
        sessionStorage.setItem("PulseRatio", doc.data().PulseRatio);
        if(doc.data().Admin_Web==1) { 
          sessionStorage.setItem("Admin_Web", doc.id);
        }
        xDateToDay = doc.data().DateToDay;
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
        //console.log("107="+sessionStorage.getItem("EmpID_Academy")+"==="+sessionStorage.getItem("xTeamGroup"));
    });
    if(CheckFoundData==0) {
      document.getElementById('loading').style.display='none';
      document.getElementById('NoService').style.display='none';
      document.getElementById('NewMember').style.display='block';
    } else {
      CheckDatePulse();
    }
  });
}


function CheckDatePulse() {
  var str = "";
  var xCheckDate = 0;
  dbPulseDate.where('PulseDate','==',thistoday)
  .where('xTeamGroup','==',sessionStorage.getItem("xTeamGroup"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xCheckDate = 1;
      //xPulsetoday = 1;
      //console.log("Found ---> 111==="+thistoday+"==="+sessionStorage.getItem("xTeamGroup"));
      //str += '<div class="btn-grey" onclick="GotoHome()" style="margin-top:20px;">ปิดหน้าต่าง</div>';
      //$("#B_id03").html(str);      //str += '<div class="btn-grey" onclick="GotoMyPoint()" style="margin-top:20px;">ปิดหน้าต่าง</div>';
      CheckDoneSurvey();
    });

  //console.log("xPulsetoday1===="+xPulsetoday+"==="+sessionStorage.getItem("xTeamGroup"));

    if(xCheckDate==0) {
      //console.log("NotFound ---> 222==="+thistoday+"==="+sessionStorage.getItem("xTeamGroup"));
      //str += '<div class="btn-grey" onclick="GotoHome()" style="margin-top:20px;">ปิดหน้าต่าง</div>';
      //$("#B_id03").html(str);      //str += '<div class="btn-grey" onclick="GotoMyPoint()" style="margin-top:20px;">ปิดหน้าต่าง</div>';

      if(sCountTimeJoin>30) { setInterval(GotoHome, 2000);  }
//console.log("Line 151");


      //setInterval(GotoHome, 2000); 
      //GotoHome();
    }
  });
}


var xPulsetoday = 0;
function CheckLoad() {
  dbPulseDate.where('PulseDate','==',thistoday)
  .where('xTeamGroup','==',sessionStorage.getItem("xTeamGroup"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xPulsetoday = 1;
      CheckLoadRound2();
    });
    console.log("CheckLoad===="+xPulsetoday);
  });
}


function CheckLoadRound2() {
  var xAAA = 0;
  dbUserSurvey.where('PulseDate','==',thistoday)
  .where('LineID','==',sessionStorage.getItem("LineID"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xAAA = 1;
      //console.log("xAAA 111==="+xAAA);
      xPulsetoday = 0;
      console.log("xAAA 111==="+xPulsetoday);
    });
    xPulsetoday = 0;
    //console.log("xAAA 222==="+xAAA);
    //if(xAAA==0) { xPulsetoday = 1; }
    //xPulsetoday = 0;
    console.log("CheckLoadRound2===="+xPulsetoday);
  });
}


function CheckDoneSurvey() {
  var str = "";
  var xCheckDone = 0;
  sessionStorage.setItem("CheckDonePulse", 0);
  dbUserSurvey.where('PulseDate','==',thistoday)
  .where('LineID','==',sessionStorage.getItem("LineID"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xCheckDone = 1;
      sessionStorage.setItem("CheckDonePulse", 1);
      GotoHome();
    });
    if(xCheckDone==0) {
      GotoSurvey();
    }
  });
}


var xCheckOut = 0;
function CheckUserProfile(eid) {
  //console.log("Check User Profile Done");
  dbCheckMember.where('xEmpID','==',parseFloat(eid))
  .where('xChief_eng','in',['CRSG','CRDG','CRLG','CTWPG','CALO'])
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xCheckOut = 1;
      sessionStorage.setItem("EmpID_Academy", eid);
      if(doc.data().xChief_eng=="CALO") {
        sessionStorage.setItem("xTeamGroup", "AL Group");        
      } else {
        sessionStorage.setItem("xTeamGroup", "Retail Group");        
      }
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
      UpdatePorfile();
      console.log(thistoday+"==="+xDateToDay);
      if(thistoday!=xDateToDay) {
        console.log("250");
        CheckDateIn();
      } else {
        console.log("253");
        CheckPulseSurvey();
        //GotoHome();
        //MyPointMenu();
      }
    });
    if(xCheckOut==0) {
      document.getElementById('loading').style.display='none';
      document.getElementById('NoService').style.display='block';
    }
  });
}



var sCountTimeJoin = 0;
var sGetRewards = 0;
var xCheckDate = 0;
function CheckDateIn() {
  CheckLoad();
  var str = "";
  var str1 = "";
  dbProfile.where('EmpID','==',sessionStorage.getItem("EmpID_Academy"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sessionStorage.setItem("XP_Point", doc.data().XP_Point);
      sessionStorage.setItem("RP_Point", doc.data().RP_Point);
      if(thistoday!=doc.data().DateToDay) {
        xCheckDate = 1;
        sCountTimeJoin = parseFloat(doc.data().JoinTime)+1;

        dbProfile.doc(EidProfile).update({
          DateToDay : thistoday,
          JoinTime : sCountTimeJoin,
          LastCheckIN : dateString
        });

        if(sCountTimeJoin<31) {
          xHeaderNews = "30 Days Login";
          xHeaderLog = "รับรางวัลจากการเข้าร่วมกิจกรรม 30 วันแรก";
          xHeaderPoint = 1;
          //AddUserLog();
          //CheckLoad();
          //CheckDatePulse();
          console.log("เช็คจำนวนครั้ง");
          Runloop();
          document.getElementById("id03").style.display = "block";

          str1 += '<div class="textheader" style="margin: 30px auto;">คุณได้รับเหรียญรางวัล</div>';
          str1 += '<div style="font-size:14px;line-height:1.1;margin-top:20px;"><img src="./point/coin-1.png" style="width:100%; max-width: 250px;background:#e9eef3; border-radius:15px;"><br><br><br>จากการเข้าร่วมกิจกรรม<br><b>เป็นวันที่ '+ sCountTimeJoin +' จาก 30 วัน</b></div>';
          str1 += '<div class="clr"></div>';
          str1 += '<div class="btn-grey" onclick="ClosePage6()" style="margin-top:20px;">ปิดหน้าต่างนี้</b></div>';
          str1 += '<div class="clr" style="height:40px;"></div>';
          $("#DisplayGetPoint").html(str1);  
          document.getElementById("id06").style.display = "block";
        } else {
          //console.log("")
          //CheckLoad();
          if(sCountTimeJoin<=60) { sTarget = 60; sPoint = 15; }
          else if(sCountTimeJoin<=90) { sTarget = 90; sPoint = 20; }
          else if(sCountTimeJoin<=120) { sTarget = 120; sPoint = 30; }
          else if(sCountTimeJoin<=150) { sTarget = 150; sPoint = 40; }
          else if(sCountTimeJoin<=180) { sTarget = 180; sPoint = 50; }
          else if(sCountTimeJoin<=360) { sTarget = 360; sPoint = 100; }
          if(sCountTimeJoin==60) {
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
          } 
          str+='<div style="margin-top:15px;">';
          str+='<div class="textheader">การเดินทางของคุณ</div>';
          str+='<div><img src="img/one-logo.png" style="width:150px;"></div>';
          str+='<div><img src="./img/waitting.png" style="width:80%;margin:30px auto 20px auto;"></div>';
          str+='<div class="box-target">เข้าเว็บแล้ว<div class="box-target-number">'+ sCountTimeJoin +'</div>วัน</div>';
          str+='<div class="box-target">เหลืออีก<div class="box-target-number">'+(sTarget-sCountTimeJoin)+'</div>วัน</div>';
          str+='<div class="box-target">เพื่อรับ<div class="box-target-number">'+sPoint+'</div>เหรียญรางวัล</div>';
          str+='</div>';
          str += '<div class="btn-blue" onclick="GotoHome()" style="margin-top:20px;">ไปหน้าหลัก</div>';
          $("#BoxTimeLine").html(str);    
          console.log("293 Check Days=="+sCountTimeJoin);
          //CheckDatePulse();
          document.getElementById("id01").style.display = "block";
        }
      }
    });
  });
}


function Runloop() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  var PointOfTheDay = 1;
  //console.log("Point="+sessionStorage.getItem("XP_Point"));
  //console.log(sCountTimeJoin+"===== Point = "+sPoint);
  var str = "";
  var xloop = 30;
  var CalRatio = (sCountTimeJoin*100)/xloop;


  str += '<div class="text-header" style="margin-top:14px; font-size:15px; color:#002d63; font-weight: 600;"><span class="header1">Login</span> <span class="header2">Reward</span> <span>--> Days '+ sCountTimeJoin +'/30</span></div>';
  str += '<div class="font10b">รับเหรียญแลกของรางวัลง่าย ๆ เพียงลงทะเบียนทุก ๆ วัน</div>';
  str += '<div class="row-progress1"><progress value="'+ parseFloat(CalRatio).toFixed(0) +'" max="100" style="--value: '+ parseFloat(CalRatio).toFixed(0) +'; --max: 100;"></progress></div>';
  str += '<div class="clr" style="height: 10px;"></div>';
  //str += '<div style="margin:10px auto 15px auto;"><img src="./point/coin-1.png" style="width:100%;border-radius: 15px; background:#fff;"></div>';
  AddUserLog();

  sessionStorage.setItem("XP_Point", parseFloat(sessionStorage.getItem("XP_Point")) + parseFloat(PointOfTheDay));
  sessionStorage.setItem("RP_Point", parseFloat(sessionStorage.getItem("RP_Point")) + parseFloat(PointOfTheDay));
  dbProfile.doc(EidProfile).update({
    LastUpdate : dateString,
    XP_Point : parseFloat(sessionStorage.getItem("XP_Point")),
    RP_Point : parseFloat(sessionStorage.getItem("RP_Point"))
  });    

  for (let i = 0; i < xloop; i++) {
    if(sCountTimeJoin >= (i+1)) {
      str += '<div id='+ (i+1) +' class="LoopRadio-Check"><img src="./icon/icons-diamondblue.png" style="width:34px;"><div class="LoopTextNumberblue">'+ (i+1) +'</div></div>';      
    } else {
      str += '<div id='+ (i+1) +' class="LoopRadio"><img src="./icon/icons-diamond.png" style="width:34px;"><div class="LoopTextNumber">'+ (i+1) +'</div></div>';      
    }
  } 
  //console.log("xPulsetoday2===="+xPulsetoday);
  if(xPulsetoday==1) {
    str += '<div class="btn-click" onclick="GotoSurvey()" style="margin-top:20px;">ไปวัดอุณหภูมิความสุขกันเถอะ</div>';
  } else {
    str += '<div class="btn-blue" onclick="GotoHome()" style="margin-top:20px;">ไปหน้าหลัก</div>';
  }
  $("#LoopDay").html(str);    
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
    //QS_Point : parseFloat(NewScore),
    QS_Point : 0,
    LogDateTime : dateString,
    LastUpdate : dateString,
    DateToDay : datetoday,
    LogTimeStamp : TimeStampDate
  });
  sessionStorage.setItem("Level_Point", 1);
  sessionStorage.setItem("XP_Point", parseFloat(NewScore));
  sessionStorage.setItem("RP_Point", parseFloat(NewScore));
  sessionStorage.setItem("QS_Point", 0);
  WelcomePoint();
  dbLoginlog.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    //EmpID : sessionStorage.getItem("EmpID_Academy"),
    EmpID : xEmpID,
    EmpName : sessionStorage.getItem("EmpName_Academy"),
    LogDate : dateString,
    LogTimeStamp : TimeStampDate
  });

  var xHeader = "เข้าร่วมกิจกรรมครั้งแรก";
  //if(sessionStorage.getItem("EmpID_Academy")==null) { }xEmpID
  dbUserlog.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    //EmpID : sessionStorage.getItem("EmpID_Academy")
    EmpID : xEmpID,
    EmpName : sessionStorage.getItem("EmpName_Academy"),
    RefID : EidProfile,
    NewsGroup : 0,
    HeadNews : "Join Website",
    SubNews : xHeader,
    GetPoint : parseFloat(NewScore),
    LastPoint : parseFloat(sessionStorage.getItem("XP_Point")),
    LogDate : dateString,
    LogTimeStamp : TimeStampDate
  });
}


function WelcomePoint() {
  document.getElementById('id05').style.display='block';
  var str = "";
  str += '<div class="textheader" style="margin-top:14px;">Welcome Point</div>';
  str += '<div class="font13" style="margin-top:10px; text-align:center; padding:5px; color:#0056ff;">ยินดีด้วยคุณได้รับเหรียญรางวัลครั้งแรก<br>จากการเข้าร่วมกิจกรรม One Retail Society</div>';
  str += '<div class="clr"></div>';
  str += '<div><img src="./point/coin-'+ sessionStorage.getItem("XP_Point") +'.png" style="margin-top:10px;width:100%;border-radius: 15px; background:#ffffff;"></div>';
  //str += '<div class="btn-start" onclick="GotoHome()" style="margin-top:30px;">คลิกเพื่อเริ่มต้นการใช้งาน</div>';
  //str += '<div class="btn-start" onclick="CloseAll()" style="margin-top:30px;">คลิกเพื่อเริ่มต้นการใช้งาน</div>';
  str += '<div style="height: 15px;"></div>';
  $("#BoxTimeGetPoint").html(str);      
}


function UpdatePorfile() {
  if(sessionStorage.getItem("EmpID_Academy")==null) { }
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbProfile.doc(EidProfile).update({
    EmpPicture : sessionStorage.getItem("LinePicture"),
    Linename : sessionStorage.getItem("LineName")
  })
  dbLoginlog.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Academy"),
    EmpName : sessionStorage.getItem("EmpName_Academy"),
    xTeamGroup : sessionStorage.getItem("xTeamGroup"),
    LogDate : dateString,
    LogTimeStamp : TimeStampDate
  });
}



function CheckPulseSurvey() {
  console.log("L 493");
  dbPulseDate.where('PulseDate','==',thistoday)
  .where('xTeamGroup','==',sessionStorage.getItem("xTeamGroup"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      //alert("Found");
      //alert("Found"+sessionStorage.getItem("xTeamGroup")+"==="+thistoday);
      //console.log(360);
      CheckDoneSurvey();
    });
    console.log("Not Found"+sessionStorage.getItem("xTeamGroup")+"==="+thistoday);
    GotoHome();
  });
}



function GetJoinPoint(d,x) {
  //alert("447 - Get Join Point");
  var str = "";
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  sessionStorage.setItem("XP_Point", parseFloat(sessionStorage.getItem("XP_Point"))+parseFloat(sGetRewards));
  sessionStorage.setItem("RP_Point", parseFloat(sessionStorage.getItem("RP_Point"))+parseFloat(sGetRewards));
  //console.log(xCheckDate+"==="+d+"==="+x);
  if(xCheckDate==1) {
    var xHeader = "ได้รับเหรียญ "+ sGetRewards +" เหรียญรางวัล";

    dbUserlog.add({
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID_Academy"),
      EmpName : sessionStorage.getItem("EmpName_Academy"),
      RefID : sessionStorage.getItem("EmpRefID_Academy"),
      NewsGroup : 0,
      HeadNews : "Join Website",
      SubNews : xHeader,
      GetPoint : parseFloat(sGetRewards),
      LastPoint : parseFloat(sessionStorage.getItem("XP_Point")),
      LogDate : dateString,
      LogTimeStamp : TimeStampDate
    });

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


function GotoSurvey() {
  //OpenPluseSurvey
  location.href = "pulsesurvey.html";
}

function GotoHome() {
  location.href = "home.html";
}

function GotoReload() {
  location.href = "index.html";
}

function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];   
}


function OneStory() {
  document.getElementById('id02').style.display='block';
}

function ClosePage6() {
  document.getElementById('id06').style.display='none';
}

function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='none';
  document.getElementById('id04').style.display='none';
  document.getElementById('id05').style.display='none';
}
