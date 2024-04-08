


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Academy")==null || sessionStorage.getItem("LineID")==null) { location.href = "index.html"; }

  $(".content").slice(0, 4).show();
  $("#loadMore").on("click", function(e){
    e.preventDefault();
    $(".content:hidden").slice(0, 4).slideDown();
    if($(".content:hidden").length == 0) {
      $("#loadMore").text("No Content").addClass("noContent");
    }
  });
  //Connect_DB();
  //CheckUserSurvey();
  document.getElementById('loading').style.display='none';
  document.getElementById('DisplayClip').style.display='block';

});



function GroupVDO(x) {
  document.getElementById('DisplayGroup').style.display='block';

}


function ReadVdo(x) {
  console.log(x);
}



function CheckTapMemo(x) {
  console.log(x);
}


function CloseAll() {
  document.getElementById('DisplayGroup').style.display='none';
}


/*DisplayMemo
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
  str += '<div class="btn-memu">ข้อมูลความสุขในการทำงานของคุณ</div>';
  str += '<div style="margin-top:25px;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="show-profile" width="100px"></div>';
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
  var xFollowCase = 0;
  //if(x==undefined) { x = 1; } else if(x==0) { xFollowCase = 1; }
  if(x==undefined) { x = 1; } 
  //console.log("check x = "+x+"==FollowCase=="+xFollowCase);
  if(sessionStorage.getItem("Admin_Pulse")!=null) { 
    if(x==0) {
      dbUserSurvey.where('FollowCase','==',1)
      .where('PulseStatus','==',0)
      .orderBy('TimeStamp','desc')
      .limit(30)      
      .get().then((snapshot)=> {
      snapshot.forEach(doc=> {
        xMemo = 1;
        str += '<div class="boxmemo1">';
        str += '<div><div class="memo-header" style="width:15%;"><img src="'+ doc.data().LinePicture +'" class="pic-memo"></div>';
        str += '<div class="memo-header" style="width:55%;">'+ doc.data().EmpName +'</div>';
        str += '<div class="btn-more" style="width:30%; float: left;" onclick="GotoShowMemo(\''+ doc.id +'\')">ดูรายละเอียด</div></div>';
        str += '<div class="clr"></div><div class="font13b" style="margin-top:7px;"><b>'+ doc.data().PulseMemo +'</b><br>'+ doc.data().PulseStory +'</div>';
        str += '<div class="entry-meta"><ul>';
        str += '<li class="d-flex align-items-center"><i class="icofont-wall-clock"></i>'+ doc.data().PulseDate +'</li>';
        str += '<li class="d-flex align-items-center"><i class="icofont-alarm"></i>'+ parseFloat(doc.data().PulseRead) +' Read</li>';
        str += '<li class="d-flex align-items-center"><i class="icofont-like"></i>'+ parseFloat(doc.data().PulseLike) +' Like</li>';
        str += '<li class="d-flex align-items-center"><i class="icofont-comment"></i>'+ parseFloat(doc.data().PulseComment) +' Comment</li>';
        str += '</ul></div></div>';
      });
      if(xMemo==0) {
        str += '<div class="boxmemo-none">*** ไม่มีข้อมูล ***</div>';
      }
      document.getElementById('DisplayMemo').style.display='block';
      $("#Tap-"+x).html(str);
    });   
    } else {
      dbUserSurvey.where('FollowCase','==',0)
      .where('PulseChoice','==',parseFloat(x))
      .where('PulseStatus','==',0)
      .orderBy('TimeStamp','desc')
      .limit(30)      
      .get().then((snapshot)=> {
      snapshot.forEach(doc=> {
        xMemo = 1;
        str += '<div class="boxmemo1">';
        str += '<div><div class="memo-header" style="width:15%;"><img src="'+ doc.data().LinePicture +'" class="pic-memo"></div>';
        str += '<div class="memo-header" style="width:55%;">'+ doc.data().EmpName +'</div>';
        str += '<div class="btn-more" style="width:30%; float: left;" onclick="GotoShowMemo(\''+ doc.id +'\')">ดูรายละเอียด</div></div>';
        str += '<div class="clr"></div><div class="font13b" style="margin-top:7px;"><b>'+ doc.data().PulseMemo +'</b><br>'+ doc.data().PulseStory +'</div>';
        str += '<div class="entry-meta"><ul>';
        str += '<li class="d-flex align-items-center"><i class="icofont-wall-clock"></i>'+ doc.data().PulseDate +'</li>';
        str += '<li class="d-flex align-items-center"><i class="icofont-alarm"></i>'+ parseFloat(doc.data().PulseRead) +' Read</li>';
        str += '<li class="d-flex align-items-center"><i class="icofont-like"></i>'+ parseFloat(doc.data().PulseLike) +' Like</li>';
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
  } else { 
    if(x==0) {
      dbUserSurvey.where('LineID','==',sessionStorage.getItem("LineID"))
      .where('PulseStatus','==',0)
      .where('FollowCase','==',1)
      .orderBy('TimeStamp','desc')
      .limit(15)
      .get().then((snapshot)=> {
        snapshot.forEach(doc=> {
          xMemo = 1;
          str += '<div class="boxmemo"><div class="font13b">';
          str += '<div><div class="memo-header">'+ doc.data().PulseMemo +'</div><div class="btn-more" style="width:30%; float: left;" onclick="GotoShowMemo(\''+ doc.id +'\')">ดูรายละเอียด</div></div>';
          str += '<div class="clr"></div>'+ doc.data().PulseStory +'</div>';
          str += '<div class="entry-meta"><ul>';
          str += '<li class="d-flex align-items-center"><i class="icofont-wall-clock"></i>'+ doc.data().PulseDate +'</li>';
          //str += '<li class="d-flex align-items-center"><i class="icofont-alarm"></i>'+ parseFloat(doc.data().PulseRead) +' Read</li>';
          str += '<li class="d-flex align-items-center"><i class="icofont-like"></i>'+ parseFloat(doc.data().PulseLike) +' Like</li>';
          str += '<li class="d-flex align-items-center"><i class="icofont-comment"></i>'+ parseFloat(doc.data().PulseComment) +' Comment</li>';
          str += '</ul></div></div>';
        });
        if(xMemo==0) {
          str += '<div class="boxmemo-none">*** ไม่มีข้อมูล ***</div>';
        }
        document.getElementById('DisplayMemo').style.display='block';
        $("#Tap-"+x).html(str);
      });    
    } else {
      dbUserSurvey.where('LineID','==',sessionStorage.getItem("LineID"))
      .where('PulseChoice','==',parseFloat(x))
      .where('PulseStatus','==',0)
      .where('FollowCase','==',0)
      .orderBy('TimeStamp','desc')
      .limit(15)
      .get().then((snapshot)=> {
        snapshot.forEach(doc=> {
          xMemo = 1;
          str += '<div class="boxmemo"><div class="font13b">';
          str += '<div><div class="memo-header">'+ doc.data().PulseMemo +'</div><div class="btn-more" style="width:30%; float: left;" onclick="GotoShowMemo(\''+ doc.id +'\')">ดูรายละเอียด</div></div>';
          str += '<div class="clr"></div>'+ doc.data().PulseStory +'</div>';
          str += '<div class="entry-meta"><ul>';
          str += '<li class="d-flex align-items-center"><i class="icofont-wall-clock"></i>'+ doc.data().PulseDate +'</li>';
          //str += '<li class="d-flex align-items-center"><i class="icofont-alarm"></i>'+ parseFloat(doc.data().PulseRead) +' Read</li>';
          str += '<li class="d-flex align-items-center"><i class="icofont-like"></i>'+ parseFloat(doc.data().PulseLike) +' Like</li>';
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

  }
}



/*

function CheckTapMemo(x) {
  if(sessionStorage.getItem("Admin_Pulse")!=null) { 
    CheckTapAdmin();
  } else {
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
        str += '<div><div class="memo-header">'+ doc.data().PulseMemo +'</div><div class="btn-more" style="width:30%; float: left;" onclick="CheckTapAdmin(\''+ doc.id +'\')">ดูรายละเอียด</div></div>';
        str += '<div class="clr"></div>'+ doc.data().PulseStory +'</div>';
        str += '<div class="entry-meta"><ul>';
        str += '<li class="d-flex align-items-center"><i class="icofont-wall-clock"></i>'+ doc.data().PulseDate +'</li>';
        str += '<li class="d-flex align-items-center"><i class="icofont-alarm"></i>'+ parseFloat(doc.data().PulseRead) +' Read</li>';
        str += '<li class="d-flex align-items-center"><i class="icofont-like"></i>'+ parseFloat(doc.data().PulseLike) +' Like</li>';
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
}

function CheckTapAdmin(x) {
  console.log("Display Admin");
  if(x==undefined) { x = 11; }
  //document.getElementById('AdminHeader').style.display='block';
  var str = "";
  str += '<div class="btn-memu">แสดงอุณหภูมิของพนักงานทั้งหมด</div>';
  str += '<div class="clr" style="height: 30px;"></div>';
  str += '';
  str += '';
  console.log("==="+x);

  //document.getElementById('DisplayAdmin').style.display='block';
  $("#Tap-"+x).html(str);
}


function GotoShowMemo(x) {
  location.href = "pulsememo.html?gid="+x;
}
*/
