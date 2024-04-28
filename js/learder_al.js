xGroup = "AL Group";

$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Academy")==null || sessionStorage.getItem("LineID")==null) { location.href = "index.html"; }
  Connect_DB();
  TopLeaderboard();
});


function TopLeaderboard() {
  var i = 0;
  var str = "";
  var str1 = "";
  var str2 = "";
  var str3 = "";
  dbProfile.where('xTeamGroup','==',xGroup)
  .orderBy('XP_Point','desc')
  .limit(50)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(i>2) {
        str +='<div class="boxmemo" data-aos="zoom-in" data-aos-delay="100">';
        str +='<div class="boxmemo-L1">'+ (i+1) +'</div><div class="boxmemo-L2"><img src="'+ doc.data().LinePicture+'" class="leader-member" onerror="javascript:imgError(this)"></div>';
        str +='<div class="boxmemo-L3"><font color="#0056ff">'+ doc.data().EmpName+'</font><br>'+ doc.data().xChief_eng+'</div><div class="boxmemo-L4">'+ doc.data().XP_Point+'<div class="boxmemo-L4t">Point</div></div></div>';

      } else {
        if(i==0) {
          str1 +='<div style="width:32%; float: left; height: 80px;"><div><img src="./img/Top1.png" style="width:40px;margin-bottom: 4px;"></div>';
          str1 +='<img src="'+ doc.data().LinePicture+'" onerror="javascript:imgError(this)" class="show-learderboard-1" width="70px">';
          str1 +='<div class="leader-1">'+ (i+1) +'</div><div class="TopScore">'+ doc.data().XP_Point+' Point</div><div class="name-leaderboard">'+ doc.data().EmpName+'</div></div>';
          $("#DisplayTop1").html(str1);
        }
        if(i==1) {
          str2 +='<div style="width:32%; float: left; height: 80px;padding-top:55px;"><img src="'+ doc.data().LinePicture+'" class="show-learderboard-2">';
          str2 +='<div class="leader-2">'+ (i+1) +'</div><div class="TopScore">'+ doc.data().XP_Point+' Point</div><div class="name-leaderboard">'+ doc.data().EmpName+'</div></div>';
          $("#DisplayTop2").html(str2);
        }
        if(i==2) {
          str3 +='<div style="width:32%; float: left; height: 80px;padding-top:55px;"><img src="'+ doc.data().LinePicture+'" class="show-learderboard-3" width="70px">';
          str3+='<div class="leader-3">'+ (i+1) +'</div><div class="TopScore">'+ doc.data().XP_Point+' Point</div><div class="name-leaderboard">'+ doc.data().EmpName+'</div></div>';
          $("#DisplayTop3").html(str3);
        }        
      }
      i++;
    });
    $("#DisplayTopLeaderboard").html(str);
  });
}