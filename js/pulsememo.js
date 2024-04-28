var EidRefIDmemo = "";
var ClickMemo = 0;
var ClickLike = 0;
xHeaderNews = "กดชื่นชอบ";
xHeaderLog = "รับรางวัลจากการเข้าร่วมกิจกรรมการกด Like";
xHeaderPoint = 1;

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
  dbUserSurvey.where(firebase.firestore.FieldPath.documentId(), "==", EidRefIDmemo)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      var xValue = (doc.data().PulseChoice) * 20;
      str += '<div><span class="font14b">บันทึกการวัด</span><span class="font14f">อุณหภูมิ</span></div><div class="clr"></div>';
      str += '<div style="margin:20px auto 10px auto;"><img src="./img/img-ratting-'+ doc.data().PulseChoice +'.png" style="height:30px;"></div>';
      //str += '<div style="margin:20px 0px 5px 0px; text-align:left;"><img src="'+ doc.data().LinePicture +'" onerror="javascript:imgError(this)" class="chart-profilt"></div>';
      str += '<div class="boxmemo" style="min-height:95px; background:#d5e1f4;">';
      str += '<div class="font13bb" style="margin-bottom:6px;height:32px;">'+ doc.data().PulseQus +'</div>';
      str += '<div class="row-header" style="padding:5px; text-align:center; margin-top:8px;">อุณหภูมิข้อนี้</div>';
      str += '<div class="row-progress"><progress value="'+ xValue +'" max="'+ xRatio +'" style="--value: '+ xValue +'; --max: '+ xRatio +';"></progress></div>';
      str += '</div>';
      str += '<div class="boxmemo" style="background:#fbefe4;">';
      str += '<div class="font13bb">'+ doc.data().PulseMemo +'</div>';
      str += '<div class="font13b" style="padding-top:2px;">'+ doc.data().PulseStory +'</div></div>';
      str += '<div id="ShowClickLike"></div>';
      /*
      str += '<div class="entry-meta"><ul>';
      str += '<li class="d-flex align-items-center"><i class="icofont-wall-clock"></i>'+ doc.data().PulseDate +'</li>';
      str += '<li class="d-flex align-items-center"><i class="icofont-alarm"></i>'+ parseFloat(doc.data().PulseRead) +' Read</li>';
      str += '<li class="d-flex align-items-center"><i class="icofont-like"></i>'+ parseFloat(doc.data().PulseLike) +' Like</li>';
      str += '<li class="d-flex align-items-center"><i class="icofont-comment"></i>'+ parseFloat(doc.data().PulseComment) +' Comment</li>';
      str += '</ul></div>';
      str += '<div id="ShowClickLike"></div>';
      */
    });
    GetSocial();
    document.getElementById('loading').style.display='none';
    document.getElementById('DisplayMemo').style.display='block';
    $("#RefMember").html(str);
    ShowMemo();    
  });
}


function GetSocial() {
  var str = "";
  dbUserSurvey.where(firebase.firestore.FieldPath.documentId(), "==", EidRefIDmemo)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<div class="entry-meta"><ul>';
      str += '<li class="d-flex align-items-center"><i class="icofont-wall-clock"></i>'+ doc.data().PulseDate +'</li>';
      //str += '<li class="d-flex align-items-center"><i class="icofont-alarm"></i>'+ parseFloat(doc.data().PulseRead) +' Read</li>';
      str += '<li class="d-flex align-items-center"><i class="icofont-like"></i>'+ parseFloat(doc.data().PulseLike) +' Like</li>';
      str += '<li class="d-flex align-items-center"><i class="icofont-comment"></i>'+ parseFloat(doc.data().PulseComment) +' Comment</li>';
      str += '</ul></div>';
      //str += '<div id="ShowClickLike"></div>';
    });
    $("#GetSocial").html(str);
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
    GetSocial();
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


//var PointOfTheDay = 1;
function SaveClickLike() {
  var str1 = "";
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  sessionStorage.setItem("XP_Point", parseFloat(sessionStorage.getItem("XP_Point")) + parseFloat(xHeaderPoint));
  sessionStorage.setItem("RP_Point", parseFloat(sessionStorage.getItem("RP_Point")) + parseFloat(xHeaderPoint));
  str1 += '<div class="textheader" style="margin: 30px auto;">คุณได้รับเหรียญรางวัล '+parseFloat(sessionStorage.getItem("XP_Point"))+'</div>';
  str1 += '<div style="font-size:14px;line-height:1.1;margin-top:20px;"><img src="./point/coin-1.png" style="width:100%; max-width: 250px;background:#e9eef3; border-radius:15px;"><br><br><br>จากการเข้าร่วมกิจกรรม<br><b>การกดชื่นชอบข้อความของเพื่อน</b></div>';
  str1 += '<div class="clr"></div>';
  str1 += '<div class="btn-grey" onclick="CloseAll()" style="margin-top:20px;">ปิดหน้าต่างนี้</b></div>';
  str1 += '<div class="clr" style="height:40px;"></div>';
  $("#DisplayGetPoint").html(str1);  
  dbProfile.doc(sessionStorage.getItem("EmpRefID_Academy")).update({
    XP_Point : parseFloat(sessionStorage.getItem("XP_Point")),
    RP_Point : parseFloat(sessionStorage.getItem("RP_Point"))
  });   
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
  dbUserlog.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Academy"),
    EmpName : sessionStorage.getItem("EmpName_Academy"),
    RefID : EidRefIDmemo,
    NewsGroup : 0,
    HeadNews : "Like",
    SubNews : xHeaderNews,
    GetPoint : parseFloat(xHeaderPoint),
    LastPoint : parseFloat(sessionStorage.getItem("XP_Point")-xHeaderPoint),
    LogDate : dateString,
    LogTimeStamp : TimeStampDate
  });
  ClickSendLike();
  ShowLike();
  GetSocial();
  document.getElementById('id01').style.display='block';
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
}

