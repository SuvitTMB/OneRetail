var EidVDOclip = "";
var EidVDOID = "";
var EidReadGroup = "";
var ClickRead = 0;
var ClickView = 0;
var ClickMemo = 0;
var ClickLike = 0;
var xVDOViewDone = 0;
var xHeadNews = "";
var xNewsGroup = 0;
var xResults = "";
//var VDOTime = 0;

var timeLeft = 0;
var xVDOpointview = 1;
var xVDOpointLike = 1;
var xVDOread = 0;
var ReadUserArr = [];
var elem = "";
var timerId = ""; 
xHeaderNews = "VDO Clip";
xHeaderLog = "เข้าชม VDO Clip";
//xHeaderPoint = 1;

$(document).ready(function () {
  if(sessionStorage.getItem("LineID")==null || sessionStorage.getItem("LineID")==null) { location.href = "vdo.html"; }
  EidVDOID = getParameterByName('gid');
  Connect_DB();
  GetAllRead();
  LoadVDOclip();
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
  .where('RefID','==',EidVDOID)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      ReadUserArr.push({ RefID: doc.data().RefID, ReadDate: doc.data().ReadDate, ID: doc.id });
    });    
  });
}


function LoadVDOclip() {
  var str = "";
  dbVDOTraining.where(firebase.firestore.FieldPath.documentId(), "==", EidVDOID)
  .limit(1)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      const results = ReadUserArr.filter(obj => {return obj.RefID === doc.id;});

      EidVDOclip = doc.id;
      xNewsGroup = doc.data().VDOgroup;
      xHeadNews = doc.data().VDOname;
      //ReadNewsPoint = parseFloat(doc.data().VDOPoint);
      ClickRead = parseFloat(doc.data().VDOread) + 1;
      ClickLike = doc.data().VDOLike;
      ClickMemo = parseFloat(doc.data().VDOcomment);
      ClickView = doc.data().VDOViewDone;
      timeLeft = parseFloat(doc.data().VDOtimer);
      xVDOread = parseFloat(doc.data().VDOread);
      //console.log(doc.data().VDOpointview);
      xVDOpointview = parseFloat(doc.data().VDOpointview);
      xVDOpointLike = parseFloat(doc.data().VDOpointLike);
      xVDOViewDone = parseFloat(doc.data().VDOViewDone);
      VDOtimeString = toHHMMSS(timeLeft);
      //VDOTime(timeLeft);

      //console.log(xVDOpointview);
      if(results[0]!=undefined) { 
        xResults = results[0].ReadDate;
        $("#CountReadNews").html("<div class='font12black' style='margin-top: 25px; color:#777'>ระบบบันทึกการอ่านของคุณเรียบร้อยแล้ว<br>เมื่อวันที่ "+xResults+" | รับคะแนน "+ xVDOpointview +" POINT<br>มีพนักงานอ่านแล้ว "+ xVDOViewDone +" คน</div>");
        document.getElementById('CountReadNews').style.display='block';
      } else {
        elem = document.getElementById('CountReadNews');
        timerId = setInterval(countdown, 1000); 
        if(doc.data().VDOpointview==undefined || doc.data().VDOpointview!==doc.data().VDOpointview) { location.href = history.back(); }
        //console.log(doc.data().VDOpointview);
      }      
      if(doc.data().VDOpointLike==undefined || doc.data().VDOpointLike!==doc.data().VDOpointLike) { location.href = history.back(); }
      //console.log(doc.data().VDOpointLike);
      str += '<center>';
      //console.log("doc.data().VDOurl=="+doc.data().VDOurl);
      if(doc.data().VDOType==0 && doc.data().VDOurl!=="") {
        //if(doc.data().VDOShow==1) {
        //  str += '<video height="500px" controls autoplay><source src="'+ doc.data().VDOurl +'" type="video/mp4"></video> ';
        //} else {
          str += '<video width="100%" height="auto" controls autoplay><source src="'+ doc.data().VDOurl +'" type="video/mp4"></video> ';
        //}
      } else if(doc.data().VDOType==1 && doc.data().VDOurl!=="") {
        str += '<iframe width="100%" height="200px" src="'+ doc.data().VDOurl +'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      } else if(doc.data().VDOType==2 && doc.data().VDOurl!=="") {
        str += '<iframe width="100%" height="200px" src="'+ doc.data().VDOurl +'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      //} else if(doc.data().VDOurl==="") {
      } else {
        str += '<div><img src="'+ doc.data().VDOimg +'" style="height: 210px;"></div>';
      }
      str += '</center>';
      //str += '<div style="width="100%" height="250px;">'+ doc.data().VDOyoutube +'</div>';
      //str += '<div style="width="100%" height="250px;">'+ doc.data().VDOtiktok +'</div>';
      //str += '<video width="100%" height="auto" controls autoplay>';
      //str += '<source src="./vdoclip/ClubBenfit.mp4" type="video/mp4">';
      //str += '<source src="'+ doc.data().VDOyoutube +'" type="video/mp4">';
      //str += '</video>';
      str += '<div class="container" style="text-align: center; max-width: 450px; text-align: left; color:#fff; padding-top:15px; ">';
      str += '<div style="font-size:14px; font-weight: 600; color:#0056ff;">'+ doc.data().VDOname +'</div><hr>';
      str += '<div class="font13" style="color:#555;min-height: 30px;">'+ doc.data().VDOdetail +'</div>';
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
      str += '<li class="d-flex align-items-center"><i class="icofont-alarm"></i>'+ parseFloat(doc.data().VDOread) +' View</li>';
      str += '<li class="d-flex align-items-center"><i class="icofont-like"></i>'+ parseFloat(doc.data().VDOlike) +' Like</li>';
      str += '<li class="d-flex align-items-center"><i class="icofont-comment"></i>'+ parseFloat(doc.data().VDOcomment) +' Comment</li>';
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


function CheckCountLike() {
  dbVDOTraining.where(firebase.firestore.FieldPath.documentId(), "==", EidVDOID)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      ClickLike = parseFloat(doc.data().VDOlike) + 1;
      $("#GetClickLike").html(ClickLike);
    });
  });
}


function SaveClickLike() {
  var str = "";
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  //console.log("xVDOpointLike="+xVDOpointLike+"==="+sessionStorage.getItem("XP_Point")+"==="+sessionStorage.getItem("RP_Point"));
  CheckCountLike();
  if(xVDOpointLike!=0) {
    sessionStorage.setItem("XP_Point", parseFloat(sessionStorage.getItem("XP_Point"))+parseFloat(xVDOpointLike));
    sessionStorage.setItem("RP_Point", parseFloat(sessionStorage.getItem("RP_Point"))+parseFloat(xVDOpointLike));
    dbProfile.doc(sessionStorage.getItem("EmpRefID_Academy")).update({
      XP_Point : parseFloat(sessionStorage.getItem("XP_Point")),
      RP_Point : parseFloat(sessionStorage.getItem("RP_Point"))
    });    
    str += '<div style="margin:30px auto 20px auto;"><span class="header1">คุณได้รับ</span> <span class="header2">POINT</div>';
    str += '<div style="font-size:14px;line-height:1.1;"><img src="./point/coin-'+ xVDOpointLike +'.png" style="width:100%; max-width: 250px;background:#e9eef3; border-radius:15px;"><br><br><br>จากการกด Like VDO<br><b>'+xHeadNews+'</b></div>';
    str += '<div class="clr"></div>';
    str += '<div class="btn-grey" onclick="CloseAll()" style="margin-top:15px;">ปิดหน้าต่างนี้</b></div>';
    str += '<div class="clr" style="height:30px;"></div>';
    $("#DisplayGetPoint").html(str);    
    document.getElementById('id01').style.display='block';
  }
  dbGetAllLike.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Academy"),
    EmpName : sessionStorage.getItem("EmpName_Academy"),
    LikeID : EidVDOID,
    LikeDate : dateString,
    LikeTimeStamp : TimeStampDate
  });  
  dbVDOTraining.doc(EidVDOID).update({
    VDOlike : ClickLike
  });
  CheckUserLike();
  GetSocial();
  ShowLike();
}


  //var elem = document.getElementById('CountReadNews');
  //var timerId = setInterval(countdown, 1000); 
  function countdown() {
        //if(xVDOpointview==NaN) { location.href = history.back(); console.log("L335"); }
      //console.log(xVDOpointview);
    //console.log("256 xResults=="+xResults);
    if(xResults!="") { 
      document.getElementById('PopupMenu').style.display='none';
      clearTimeout(timerId);
      document.getElementById('loading').style.display='none';
      document.getElementById('CountReadNews').style.display='block';
      $("#CountReadNews").html("<div class='font12black' style='margin-top: 25px; color:#777'>ระบบบันทึกการอ่านของคุณเรียบร้อยแล้ว<br>เมื่อวันที่ "+xResults+" | รับคะแนน "+ xVDOpointview +" POINT<br>มีพนักงานอ่านแล้ว "+ xVDOViewDone +" คน</div>");
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
        //console.log("===="+xResults);
        //if(xResults)
      //console.log(xVDOpointview);
        //moment(number.toString(),"LT")
        //var xtime = moment(timeLeft,'HH').format('HH:mm');
        $("#PopupTime").html('ระบบบันทึกการอ่าน<br>เหลือเวลา ' +timeLeft+ ' วินาที');
        elem.innerHTML = '<div class="font12black" style="margin-top: 25px; color:#ff0000; font-weight: 400;"><b>เหลือเวลาการดู VDO อีก ' +timeLeft + ' วินาที</b><br><font color="#111">(ระบบจะบันทึกการอ่านอัตโนมัติเมื่อสิ้นสุดเวลาที่กำหนด)<br>คุณจะได้ '+ xVDOpointview +' POINT เมื่อสิ้นสุดเวลาที่กำหนด</font></div>';
        //console.log("VDOpointview="+xVDOpointview);

        //if(xResults!="") {
        //  elem.innerHTML = '<div class="font12black" style="margin-top: 25px; color:#ff0000; font-weight: 400;"><b>เหลือเวลาการอ่านข่าวอีก ' +timeLeft + ' วินาที</b><br><font color="#111">(ระบบจะบันทึกการอ่านอัตโนมัติเมื่อสิ้นสุดเวลาที่กำหนด)<br>คุณจะได้ '+ ReadNewsPoint +' Point เมื่อสิ้นสุดเวลาที่กำหนด</font></div>';
        //} else {
          //elem.innerHTML = '<div class="font12black" style="margin-top: 25px; color:#ff0000; font-weight: 400;"><b>เหลือเวลาการอ่านข่าวอีก ' +timeLeft + ' วินาที</b><br><font color="#111">(ระบบจะบันทึกการอ่านอัตโนมัติเมื่อสิ้นสุดเวลาที่กำหนด)<br>คุณจะได้ '+ ReadNewsPoint +' Point เมื่อสิ้นสุดเวลาที่กำหนด</font></div>';
        //}
        timeLeft--;
      }    
    }    
  //}
}


function CallReadNews() {
  clearTimeout(timerId);
  //CheckPointMember();
  if(xResults=="") { 
    dbVDOTraining.where(firebase.firestore.FieldPath.documentId(), "==", EidVDOID)
    .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
        xVDOViewDone = parseFloat(doc.data().VDOViewDone)+1;
      });
      dbVDOTraining.doc(EidVDOID).update({
        VDOViewDone : parseFloat(xVDOViewDone)
      });
      RecordNews();
    });
  } else {
    alert("ระบบเคยทำการบันทึกรายการอ่านของคุณไว้แล้ว");
  } 
}


function RecordNews() {
  //console.log(xVDOpointview);
    //console.log(xVDOpointview);
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  //console.log("xVDOpointview="+xVDOpointview+"==="+parseFloat(sessionStorage.getItem("XP_Point")));
  if(sessionStorage.getItem("XP_Point")==NaN) { GotoHome(); }
  dbCheckAllRead.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Academy"),
    EmpName : sessionStorage.getItem("EmpName_Academy"),
    RefID : EidVDOID,
    ReadDate : dateString,
    ReadTimeStamp : TimeStampDate
  });
  if(xVDOpointview!=0) {
    sessionStorage.setItem("XP_Point", parseFloat(sessionStorage.getItem("XP_Point"))+parseFloat(xVDOpointview));
    sessionStorage.setItem("RP_Point", parseFloat(sessionStorage.getItem("RP_Point"))+parseFloat(xVDOpointview));
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
      RefID : EidVDOID,
      NewsGroup : xHeaderNews,
      HeadNews : xHeaderNews,
      SubNews : xHeaderLog,
      GetPoint : parseFloat(xVDOpointview),
      LastPoint : parseFloat(sessionStorage.getItem("XP_Point")),
      LogDate : dateString,
      LogTimeStamp : TimeStampDate
    });
  }
  var str = "";
  if(xVDOpointview!=0) {
    str += '<div style="margin:30px auto 20px auto;"><span class="header1">คุณได้รับ</span> <span class="header2">POINT</div>';
    str += '<div style="font-size:14px;line-height:1.1;"><img src="./point/coin-'+ xVDOpointview +'.png" style="width:100%; max-width: 250px;background:#e9eef3; border-radius:15px;"><br><br><br>จากการอ่านดู VDO<br><b>'+xHeadNews+'</b></div>';
    str += '<div class="clr"></div>';
    str += '<div class="btn-grey" onclick="CloseAll()" style="margin-top:15px;">ปิดหน้าต่างนี้</b></div>';
    str += '<div class="clr" style="height:30px;"></div>';
    $("#DisplayGetPoint").html(str);  
    document.getElementById('id01').style.display='block';
  }
  $("#CountReadNews").html("<div class='font12black' style='color:#777'>ระบบบันทึกการอ่านของคุณเรียบร้อยแล้ว<br>เมื่อวันที่ "+ dateString +"<br>มีพนักงานอ่านแล้ว "+ ClickView +" คน</div>");
  GetAllRead();  
}


function CheckAllCount() {
  dbVDOTraining.where(firebase.firestore.FieldPath.documentId(), "==", EidVDOclip)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      ClickMemo = doc.data().VDOcomment;
      ClickSendComment();
    });
  });
}


function ClickSendComment() {
  //alert("Comment");
  var sMemo = document.getElementById("txtDetail").value;
  ClickMemo = (parseInt(ClickMemo)+1);
  //console.log("Comment="+ClickMemo);
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
      VDOcomment : ClickMemo
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
