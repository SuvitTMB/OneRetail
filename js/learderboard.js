//xGroup = "Retail Group";
var xGroup = "";
var GroupLeader = 0;

$(document).ready(function () {
  var str = "";
  if(sessionStorage.getItem("EmpID_Academy")==null || sessionStorage.getItem("LineID")==null) { location.href = "index.html"; }
  str += '<div class="box-user-left box-user-select" onclick="ClickGroup(\'Retail\')">Retail Group</div>';
  str += '<div class="box-user-right"  onclick="ClickGroup(\'AL\')">AL Group</div>';
  $("#DisplayMenu").html(str);
  Connect_DB();
  ClickGroup(GroupLeader);
  //TopLeaderboard();
});


function ClickGroup(x) {
  $("#DisplayTopLeaderboard").html("");
  $("#DisplayTop1").html("");
  $("#DisplayTop2").html("");
  $("#DisplayTop3").html("");
  document.getElementById("loading").style.display = "block";
  if(parseFloat(x)==0) {
    //xGroup = "Retail Group";
    $('#M1').addClass("box-user-select");
    $('#M2').removeClass('box-user-select');
    $('#M3').removeClass('box-user-select');
    AllLeaderboard();
  } else if(parseFloat(x)==1) {
    //xGroup = "Retail Group";
    $('#M1').removeClass('box-user-select');
    $('#M2').addClass("box-user-select");
    $('#M3').removeClass('box-user-select');
    RetailLeaderboard(x);
  } else if(parseFloat(x)==2) {
    //xGroup = "AL Group";
    $('#M1').removeClass('box-user-select');
    $('#M2').removeClass('box-user-select');
    $('#M3').addClass("box-user-select");
    ALLeaderboard(x);
  }
}


/*

function ClickGroup(x) {
  var str = "";
  $("#DisplayTop1").html("");
  $("#DisplayTop2").html("");
  $("#DisplayTop3").html("");
  $("#DisplayTopLeaderboard").html("");
  document.getElementById("loading").style.display = "block";
  switch(x) {
    case "Retail":
      xGroup = "Retail Group";
      str += '<div class="box-user-left box-user-select" onclick="ClickGroup(\'Retail\')">Retail Group</div>';
      str += '<div class="box-user-right"  onclick="ClickGroup(\'AL\')">AL Group</div>';
      $("#DisplayMenu").html(str);
      break;
    case "AL":
      xGroup = "AL Group";
      str += '<div class="box-user-left" onclick="ClickGroup(\'Retail\')">Retail Group</div>';
      str += '<div class="box-user-right box-user-select"  onclick="ClickGroup(\'AL\')">AL Group</div>';
      $("#DisplayMenu").html(str);
      break;
    default:
      xGroup = "Retail Group";
      str += '<div class="box-user-left box-user-select" onclick="ClickGroup(\'Retail\')">Retail Group</div>';
      str += '<div class="box-user-right"  onclick="ClickGroup(\'AL\')">AL Group</div>';
      $("#DisplayMenu").html(str);
  }
  TopLeaderboard();
}
*/


function AllLeaderboard() {
  //console.log(xGroup);
  var i = 0;
  var str = "";
  var str1 = "";
  var str2 = "";
  var str3 = "";
  dbProfile
  .orderBy('XP_Point','desc')
  .limit(50)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(i>2) {
        str +='<div class="boxmemo" data-aos="zoom-in" data-aos-delay="100">';
        str +='<div class="boxmemo-L1">'+ (i+1) +'</div><div class="boxmemo-L2"><img src="'+ doc.data().LinePicture+'" class="leader-member" onerror="javascript:imgError(this)"></div>';
        str +='<div class="boxmemo-L3"><font color="#0056ff">'+ doc.data().EmpName+'</font><br>'+ doc.data().xChief_eng+'</div>';
        str +='<div class="boxmemo-L4"><div style="width:50%; float:left; text-align:center;color:#f68b1f;">'+ doc.data().Level_Point+'<div class="boxmemo-L4t">Level</div></div>';
        str +='<div style="width:50%; float:left; text-align:center;">'+ doc.data().XP_Point+'<div class="boxmemo-L4t">Point</div></div></div></div>';
      } else {
        if(i==0) {
          str1 +='<div style="width:33%; float: left; height: 80px;"><div><img src="./img/Top1.png" style="width:40px;margin-bottom: 4px;"></div>';
          str1 +='<img src="'+ doc.data().LinePicture+'" onerror="javascript:imgError(this)" class="show-learderboard-1" width="70px" onerror="javascript:imgError(this)">';
          str1 +='<div class="leader-1">'+ (i+1) +'</div><div class="TopScore">'+ doc.data().XP_Point+' Point</div><div class="name-leaderboard">'+ doc.data().EmpName+'</div></div>';
          $("#DisplayTop1").html(str1);
        }
        if(i==1) {
          str2 +='<div style="width:33%; float: left; height: 80px;padding-top:55px;"><img src="'+ doc.data().LinePicture+'" class="show-learderboard-2" onerror="javascript:imgError(this)">';
          str2 +='<div class="leader-2">'+ (i+1) +'</div><div class="TopScore">'+ doc.data().XP_Point+' Point</div><div class="name-leaderboard">'+ doc.data().EmpName+'</div></div>';
          $("#DisplayTop2").html(str2);
        }
        if(i==2) {
          str3 +='<div style="width:33%; float: left; height: 80px;padding-top:55px;"><img src="'+ doc.data().LinePicture+'" class="show-learderboard-3" width="70px" onerror="javascript:imgError(this)">';
          str3+='<div class="leader-3">'+ (i+1) +'</div><div class="TopScore">'+ doc.data().XP_Point+' Point</div><div class="name-leaderboard">'+ doc.data().EmpName+'</div></div>';
          $("#DisplayTop3").html(str3);
        }        
      }
      i++;
    });
    $("#DisplayTopLeaderboard").html(str);
    document.getElementById("loading").style.display = "none";
    document.getElementById("DisplayTop").style.display = "block";
  });
}


function RetailLeaderboard() {
  //console.log(xGroup);
  var i = 0;
  var str = "";
  var str1 = "";
  var str2 = "";
  var str3 = "";
  dbProfile.where('xTeamGroup','==','Retail')
  .orderBy('XP_Point','desc')
  .limit(50)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(i>2) {
        str +='<div class="boxmemo" data-aos="zoom-in" data-aos-delay="100">';
        str +='<div class="boxmemo-L1">'+ (i+1) +'</div><div class="boxmemo-L2"><img src="'+ doc.data().LinePicture+'" class="leader-member" onerror="javascript:imgError(this)"></div>';
        str +='<div class="boxmemo-L3"><font color="#0056ff">'+ doc.data().EmpName+'</font><br>'+ doc.data().xChief_eng+'</div>';
        str +='<div class="boxmemo-L4"><div style="width:50%; float:left; text-align:center;color:#f68b1f;">'+ doc.data().Level_Point+'<div class="boxmemo-L4t">Level</div></div>';
        str +='<div style="width:50%; float:left; text-align:center;">'+ doc.data().XP_Point+'<div class="boxmemo-L4t">Point</div></div></div></div>';
      } else {
        if(i==0) {
          str1 +='<div style="width:33%; float: left; height: 80px;"><div><img src="./img/Top1.png" style="width:40px;margin-bottom: 4px;" onerror="javascript:imgError(this)"></div>';
          str1 +='<img src="'+ doc.data().LinePicture+'" onerror="javascript:imgError(this)" class="show-learderboard-1" width="70px">';
          str1 +='<div class="leader-1">'+ (i+1) +'</div><div class="TopScore">'+ doc.data().XP_Point+' Point</div><div class="name-leaderboard">'+ doc.data().EmpName+'</div></div>';
          $("#DisplayTop1").html(str1);
        }
        if(i==1) {
          str2 +='<div style="width:33%; float: left; height: 80px;padding-top:55px;"><img src="'+ doc.data().LinePicture+'" class="show-learderboard-2" onerror="javascript:imgError(this)">';
          str2 +='<div class="leader-2">'+ (i+1) +'</div><div class="TopScore">'+ doc.data().XP_Point+' Point</div><div class="name-leaderboard">'+ doc.data().EmpName+'</div></div>';
          $("#DisplayTop2").html(str2);
        }
        if(i==2) {
          str3 +='<div style="width:33%; float: left; height: 80px;padding-top:55px;"><img src="'+ doc.data().LinePicture+'" class="show-learderboard-3" width="70px" onerror="javascript:imgError(this)">';
          str3+='<div class="leader-3">'+ (i+1) +'</div><div class="TopScore">'+ doc.data().XP_Point+' Point</div><div class="name-leaderboard">'+ doc.data().EmpName+'</div></div>';
          $("#DisplayTop3").html(str3);
        }        
      }
      i++;
    });
    $("#DisplayTopLeaderboard").html(str);
    document.getElementById("loading").style.display = "none";
    document.getElementById("DisplayTop").style.display = "block";
  });
}


function ALLeaderboard() {
  //console.log(xGroup);
  var i = 0;
  var str = "";
  var str1 = "";
  var str2 = "";
  var str3 = "";
  dbProfile.where('xTeamGroup','==','AL')
  .orderBy('XP_Point','desc')
  .limit(50)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(i>2) {
        str +='<div class="boxmemo" data-aos="zoom-in" data-aos-delay="100">';
        str +='<div class="boxmemo-L1">'+ (i+1) +'</div><div class="boxmemo-L2"><img src="'+ doc.data().LinePicture+'" class="leader-member" onerror="javascript:imgError(this)"></div>';
        str +='<div class="boxmemo-L3"><font color="#0056ff">'+ doc.data().EmpName+'</font><br>'+ doc.data().xChief_eng+'</div>';
        str +='<div class="boxmemo-L4"><div style="width:50%; float:left; text-align:center; color:#f68b1f;">'+ doc.data().Level_Point+'<div class="boxmemo-L4t">Level</div></div>';
        str +='<div style="width:50%; float:left; text-align:center;">'+ doc.data().XP_Point+'<div class="boxmemo-L4t">Point</div></div></div></div>';
      } else {
        if(i==0) {
          str1 +='<div style="width:33%; float: left; height: 80px;"><div><img src="./img/Top1.png" style="width:40px;margin-bottom: 4px;"></div>';
          str1 +='<img src="'+ doc.data().LinePicture+'" onerror="javascript:imgError(this)" class="show-learderboard-1" width="70px">';
          str1 +='<div class="leader-1">'+ (i+1) +'</div><div class="TopScore">'+ doc.data().XP_Point+' Point</div><div class="name-leaderboard">'+ doc.data().EmpName+'</div></div>';
          $("#DisplayTop1").html(str1);
        }
        if(i==1) {
          str2 +='<div style="width:33%; float: left; height: 80px;padding-top:55px;"><img src="'+ doc.data().LinePicture+'" class="show-learderboard-2" onerror="javascript:imgError(this)">';
          str2 +='<div class="leader-2">'+ (i+1) +'</div><div class="TopScore">'+ doc.data().XP_Point+' Point</div><div class="name-leaderboard">'+ doc.data().EmpName+'</div></div>';
          $("#DisplayTop2").html(str2);
        }
        if(i==2) {
          str3 +='<div style="width:33%; float: left; height: 80px;padding-top:55px;"><img src="'+ doc.data().LinePicture+'" class="show-learderboard-3" width="70px" onerror="javascript:imgError(this)">';
          str3+='<div class="leader-3">'+ (i+1) +'</div><div class="TopScore">'+ doc.data().XP_Point+' Point</div><div class="name-leaderboard">'+ doc.data().EmpName+'</div></div>';
          $("#DisplayTop3").html(str3);
        }        
      }
      i++;
    });
    $("#DisplayTopLeaderboard").html(str);
    document.getElementById("loading").style.display = "none";
    document.getElementById("DisplayTop").style.display = "block";
  });
}