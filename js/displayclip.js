/*
file:///C:/Users/08400/OneDrive%20-%20TMB%20BANK/Desktop/Nan-job/OneRetailSociety/displayclip.html?gid=ETwEgh2Pv1MVcgZNxLNn
*/
var ReadNewsPoint = 1;
var EidVDOclip = "";
var EidReadID = "";
var EidReadGroup = "";
var ClickRead = 0;
var ClickView = 0;
var ClickMemo = 0;
var ClickLike = 0;
var xVDOViewDone = 0;
var xHeadNews = "";
var xNewsGroup = 0;
var xResults = "";
var timeLeft = 0;
var ReadUserArr = [];

xHeaderNews = "VDO Clip";
xHeaderLog = "เข้าชม VDO Clip";
//xHeaderPoint = 1;


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Academy")==null || sessionStorage.getItem("LineID")==null) { location.href = "index.html"; }
  EidReadID = getParameterByName('gid');
  EidReadGroup = getParameterByName('groupid');
  Connect_DB();
  GetAllRead();
  LoadVDOclip();

  //ClickSendLike();
  //GetAllRead();
  //LoadVDOclip();
  //ClickSendLike();
  //ShowLike();
  //countdown();
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


function GetAllRead() {
  var i = 0;
  var str = "";
  ReadMemberArr = [];
  ReadUserArr = [];
  dbCheckAllRead.where('LineID','==',sessionStorage.getItem("LineID"))
  //.where('RefID','==',EidReadID)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      ReadUserArr.push({ RefID: doc.data().RefID, ReadDate: doc.data().ReadDate, ID: doc.id });
    });    
    console.log(ReadUserArr);
  });
}


function LoadVDOclip() {
  var str = "";
  dbVDOTraining.where(firebase.firestore.FieldPath.documentId(), "==", EidReadID)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      const results = ReadUserArr.filter(obj => {return obj.RefID === doc.id;});
      if(results[0]!=undefined) { 
        xResults = results[0].ReadDate;
      }
      //console.log("78 ---> Chcek Results ="+xResults);
      EidVDOclip = doc.id;
      xNewsGroup = doc.data().VDOgroup;
      xHeadNews = doc.data().VDOname;
      ReadNewsPoint = parseFloat(doc.data().VDOPoint);
      ClickRead = parseFloat(doc.data().VDOread) + 1;
      ClickLike = doc.data().VDOLike;
      ClickMemo = doc.data().VDOMemo;
      ClickView = doc.data().VDOViewDone;
      timeLeft = doc.data().VDOTimer;
      //console.log("ClickRead="+ClickRead);
      //CheckUserRead();VDOtiktok

      //str += '<div style="width="100%" height="250px;">'+ doc.data().VDOyoutube +'</div>';
      str += '<div style="width="100%" height="250px;">'+ doc.data().VDOtiktok +'</div>';
      //str += '<video width="100%" height="auto" controls autoplay>';
      //str += '<source src="./vdoclip/ClubBenfit.mp4" type="video/mp4">';
      //str += '<source src="'+ doc.data().VDOyoutube +'" type="video/mp4">';
      //str += '</video>';
      str += '<div class="container" style="text-align: center; max-width: 450px; text-align: left; color:#fff; padding-top:15px; ">';
      str += '<div style="font-size:14px; font-weight: 400; color:#0056ff;">'+ doc.data().VDOname +'</div><hr>';
      str += '<div class="font13" style="color:#555;min-height: 80px;">'+ doc.data().VDOdetail +'</div>';
      str += '<div id="ShowClickLike"></div>';
      dbVDOTraining.doc(doc.id).update({
        VDOread : ClickRead
      });      
      //console.log("Load Clip");
    });
    //CheckUserLike();
    document.getElementById('loading').style.display='none';
    document.getElementById('DisplayMemo').style.display='block';
    $("#RefMember").html(str);
    GetSocial();
    CheckUserLike();
    ShowLike();
    ShowMemo();
  });
}


function GetSocial() {
  var str = "";
  dbVDOTraining.where(firebase.firestore.FieldPath.documentId(), "==", EidVDOclip)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<div class="entry-meta"><ul>';
      str += '<li class="d-flex align-items-center"><i class="icofont-wall-clock"></i>'+ doc.data().VDOdate +'</li>';
      str += '<li class="d-flex align-items-center"><i class="icofont-alarm"></i>'+ parseFloat(doc.data().VDOread) +' Read</li>';
      str += '<li class="d-flex align-items-center"><i class="icofont-like"></i>'+ parseFloat(doc.data().VDOlike) +' Like</li>';
      str += '<li class="d-flex align-items-center"><i class="icofont-comment"></i>'+ parseFloat(doc.data().VDOComment) +' Comment</li>';
      str += '</ul></div>';
      //str += '<div id="ShowClickLike"></div>';
    });
    $("#GetSocial").html(str);
  });
}


var sClickLike_user = 0;
function ClickSendLike() {
  var str = "";
  dbGetAllLike.where('LineID','==',sessionStorage.getItem("LineID"))
  .where('LikeID','==',EidVDOclip)
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


var sClickLike_user = 0;
function CheckUserLike() {
  CheckCountLike();
  var str = "";
  dbGetAllLike.where('LineID','==',sessionStorage.getItem("LineID"))
  .where('LikeID','==',EidVDOclip)
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


function ShowMemo() {
  var i = 0;
  var str = "";
  dbGetAllMemo.where('RefID','==',EidVDOclip)
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
  dbGetAllLike.where('LikeID','==',EidVDOclip)
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


//var sClickLike = 0;
function CheckCountLike() {
  dbVDOTraining.where(firebase.firestore.FieldPath.documentId(), "==", EidReadID)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      ClickLike = parseFloat(doc.data().VDOlike) + 1;
      $("#GetClickLike").html(ClickLike);
    });
  });
}


function SaveClickLike() {
  CheckCountLike();
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbGetAllLike.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Academy"),
    EmpName : sessionStorage.getItem("EmpName_Academy"),
    LikeID : EidReadID,
    LikeDate : dateString,
    LikeTimeStamp : TimeStampDate
  });
  dbVDOTraining.doc(EidReadID).update({
    VDOlike : ClickLike
  });
  CheckUserLike();
  GetSocial();
  ShowLike();
  //CheckCountLike();
  //ShowLike();
  document.getElementById('id03').style.display='block';
}


var elem = document.getElementById('CountReadNews');
var timerId = setInterval(countdown, 1000); 
function countdown() {
  console.log("256 xResults=="+xResults);
  if(xResults!="") { 
    document.getElementById('PopupMenu').style.display='none';
    clearTimeout(timerId);
    document.getElementById('loading').style.display='none';
    document.getElementById('CountReadNews').style.display='block';
    $("#CountReadNews").html("<div class='font12black' style='margin-top: 25px; color:#777'>ระบบบันทึกการอ่านของคุณเรียบร้อยแล้ว<br>เมื่อวันที่ "+xResults+" | รับคะแนน "+ ReadNewsPoint +" Point<br>มีพนักงานอ่านแล้ว "+ ReadNewsPoint+" คน</div>");
  } else {
    if (timeLeft == -1) {
      document.getElementById('PopupMenu').style.display='none';
      clearTimeout(timerId);
      //alert("หมดเวลา");
      CallReadNews();
    } else {
      document.getElementById('loading').style.display='none';
      document.getElementById('CountReadNews').style.display='block';
      document.getElementById('PopupMenu').style.display='block';
      console.log("===="+xResults);
      //if(xResults)
      $("#PopupTime").html('ระบบบันทึกการอ่าน<br>เหลือเวลา ' +timeLeft+ ' วินาที');
      elem.innerHTML = '<div class="font12black" style="margin-top: 25px; color:#ff0000; font-weight: 400;"><b>เหลือเวลาการอ่านข่าวอีก ' +timeLeft + ' วินาที</b><br><font color="#111">(ระบบจะบันทึกการอ่านอัตโนมัติเมื่อสิ้นสุดเวลาที่กำหนด)<br>คุณจะได้ '+ ReadNewsPoint +' Point เมื่อสิ้นสุดเวลาที่กำหนด</font></div>';

      //if(xResults!="") {
      //  elem.innerHTML = '<div class="font12black" style="margin-top: 25px; color:#ff0000; font-weight: 400;"><b>เหลือเวลาการอ่านข่าวอีก ' +timeLeft + ' วินาที</b><br><font color="#111">(ระบบจะบันทึกการอ่านอัตโนมัติเมื่อสิ้นสุดเวลาที่กำหนด)<br>คุณจะได้ '+ ReadNewsPoint +' Point เมื่อสิ้นสุดเวลาที่กำหนด</font></div>';
      //} else {
        //elem.innerHTML = '<div class="font12black" style="margin-top: 25px; color:#ff0000; font-weight: 400;"><b>เหลือเวลาการอ่านข่าวอีก ' +timeLeft + ' วินาที</b><br><font color="#111">(ระบบจะบันทึกการอ่านอัตโนมัติเมื่อสิ้นสุดเวลาที่กำหนด)<br>คุณจะได้ '+ ReadNewsPoint +' Point เมื่อสิ้นสุดเวลาที่กำหนด</font></div>';
      //}
      timeLeft--;
    }    
  }
}


function CallReadNews() {
  clearTimeout(timerId);
  //CheckPointMember();
  if(xResults=="") { 
    dbVDOTraining.where(firebase.firestore.FieldPath.documentId(), "==", EidReadID)
    .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
        xVDOViewDone = parseFloat(doc.data().VDOViewDone)+1;
      });
      dbVDOTraining.doc(EidReadID).update({
        VDOViewDone : parseFloat(xVDOViewDone)
      });
      RecordNews();
    });
  } else {
    alert("ระบบเคยทำการบันทึกรายการอ่านของคุณไว้แล้ว");
  } 
}


function RecordNews() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbCheckAllRead.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Academy"),
    EmpName : sessionStorage.getItem("EmpName_Academy"),
    RefID : EidReadID,
    ReadDate : dateString,
    ReadTimeStamp : TimeStampDate
  });
  sessionStorage.setItem("XP_Point", parseFloat(sessionStorage.getItem("XP_Point"))+parseFloat(ReadNewsPoint));
  sessionStorage.setItem("RP_Point", parseFloat(sessionStorage.getItem("RP_Point"))+parseFloat(ReadNewsPoint));
  dbProfile.doc(sessionStorage.getItem("EmpRefID_Academy")).update({
    LastUpdate : dateString,
    XP_Point : parseFloat(sessionStorage.getItem("XP_Point")),
    RP_Point : parseFloat(sessionStorage.getItem("RP_Point"))
  });
  dbUserlog.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Academy"),
    EmpName : sessionStorage.getItem("EmpName_Academy"),
    RefID : EidReadID,
    NewsGroup : xHeaderNews,
    HeadNews : xHeaderNews,
    SubNews : xHeaderLog,
    GetPoint : parseFloat(ReadNewsPoint),
    LastPoint : parseFloat(sessionStorage.getItem("XP_Point")),
    LogDate : dateString,
    LogTimeStamp : TimeStampDate
  });
  var str = "";
  str += '<div class="btn-t3"><b>คุณได้รับเหรียญรางวัล</b></div>';
  str += '<div style="font-size:14px;line-height:1.1;"><img src="./img/coin-'+ ReadNewsPoint +'.png" style="width:100%; max-width: 250px;background:#e9eef3; border-radius:15px;"><br><br>จากการอ่านข่าวสารเรื่อง<br><br><b>'+xHeadNews+'</b></div>';
  str += '<div class="clr" style="height:15px;"></div>';
  str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:15px;">ปิดหน้าต่างนี้</b></div>';
  str += '<div class="clr" style="height:40px;"></div>';
  $("#DisplayGetPoint").html(str);  
  document.getElementById('id01').style.display='block';
  $("#CountReadNews").html("<div class='font12black' style='color:#777'>ระบบบันทึกการอ่านของคุณเรียบร้อยแล้ว<br>เมื่อวันที่ "+dateString+"<br>มีพนักงานอ่านแล้ว "+ ClickView +" คน</div>");
  //OpenPopMenu();
  GetAllRead();
}


function CheckAllCount() {
  dbVDOTraining.where(firebase.firestore.FieldPath.documentId(), "==", EidVDOclip)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      ClickMemo = doc.data().VDOComment;
      ClickSendComment();
    });
  });
}


function ClickSendComment() {
  //alert("Comment");
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
      RefID : EidVDOclip,
      WriteMemo : sMemo,
      WriteDate : dateString,
      WriteTimeStamp : TimeStampDate
    });
    dbVDOTraining.doc(EidVDOclip).update({
      VDOComment : ClickMemo
      //FollowCase: 1
    });
    //ShowView();
    //ShowMemo();
    document.getElementById("txtDetail").value = "";
    ShowLike();
    ShowMemo();
    GetSocial();
  }
}




function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='none';
}
