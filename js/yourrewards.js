//var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Academy")==null || sessionStorage.getItem("LineID")==null) { location.href = "index.html"; }
  Connect_DB();
  RedeemRewards();
  UserScore();
});


function UserScore() {
  var xLine = "";
  xLine += '<div class="box-top-user">';
  xLine += '<div><img class="box-user-rewards" src="'+ sessionStorage.getItem("LinePicture") +'" onerror="javascript:imgError(this)" ></div>';
  xLine += '<div style="width:290px; margin:0px auto;">';
  xLine += '<div class="ScoreCard"><div class="font16b">'+ parseFloat(sessionStorage.getItem("Level_Point")).toFixed(0) +'</div>';
  xLine += '<div class="font12">ระดับ<br>ประสบการณ์</div></div>';
  xLine += '<div class="ScoreCard"><div class="font16b">'+ parseFloat(sessionStorage.getItem("XP_Point")).toFixed(2) +'</div>';
  xLine += '<div class="font12">ประสบการณ์<br>การใช้งาน</div></div>';
  xLine += '<div class="ScoreCard"><div class="font16b">'+ parseFloat(sessionStorage.getItem("RP_Point")).toFixed(2) +'</div>';
  xLine += '<div class="font12">เหรียญ<br>แลกรางวัล</div></div>';
  xLine += '</div>';
  $("#DisplayScore").html(xLine);
} 


function RedeemRewards() {
  var str = "";
  var i = 1;
  var xStatus = "";
  str += '<table class="table table-bordered" class="font13" style="background-color: #fff;">';
  str += '<thead><tr style="text-align: center;background-color: #93a3c1;">';
  str += '<th scope="col">No.</th><th scope="col">รางวัล</th><th scope="col">ใช้เหรียญ</th></tr></thead><tbody>';
  dbRedeem.where('EmpID','==',sessionStorage.getItem("EmpID_Academy"))
  .orderBy('LogTimeStamp','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(doc.data().SubNews!='วงล้อมหาสนุก') {
        if(doc.data().Status_Confirm==0) {
          xStatus = "<font color='#999999'>รอการจัดส่ง</font>";
        } else if(doc.data().Status_Confirm==1) {
          xStatus = "<font color='#f68b1f'>จัดส่งเรียบร้อยแล้ว</font>";
        } else if(doc.data().Status_Confirm==2) {
          xStatus = "<font color='#07bb12'>ได้รับของรางวัลแล้ว</font>";
        }
        str += '<tr><th scope="row" style="text-align: center;">'+ i +'</th>';
        str += '<td style="text-align: left; line-height: 1.2;"><font color="#0056ff">'+ doc.data().SubNews +'</font>';
        str += '<br>แลกเมื่อ : '+ doc.data().LogDate +'<br>สถานะ : '+ xStatus +'</td>';
        str += '<td style="text-align: center;">'+ (doc.data().GetPoint)*-1 +' เหรียญ</td></tr>';
        console.log(doc.data().SubNews);
        i++;
      }
    });
    str += '</tbody></table></div>';
    str += '<div class="clr"></div>';
    $("#DisplayRedeem").html(str);
  });
}
