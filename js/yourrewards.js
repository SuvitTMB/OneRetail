//var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var xRefID = "";

$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Academy")==null || sessionStorage.getItem("LineID")==null) { location.href = "index.html"; }
  Connect_DB();
  GetAllRewards();
  RedeemRewards();
  UserScore();
});

var arrAllRewards = [];
function GetAllRewards() {
  var i = 0;
  var str = "";
  arrAllRewards = [];
  dbRewards
  .orderBy('RewardsRank','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      arrAllRewards.push({ id: doc.id, RewardsName: doc.data().RewardsName, RewardsCode: doc.data().RewardsCode, RewardsDetail: doc.data().RewardsDetail, RewardsPrice: doc.data().RewardsPrice, RewardsStock: doc.data().RewardsStock, RewardsRedeem: doc.data().RewardsRedeem, WheelRandom: doc.data().WheelRandom });
    });    
  });
}
    
function UserScore() {
  var xLine = "";
  xLine += '<div class="box-top-user">';
  xLine += '<div style="width:290px; margin:0px auto;">';

  xLine += '<div class="ScoreCard"><div><img src="./icon/icon-coin.png" class="coin-img1"></div><div class="font12">COIN</div><div class="font16b">'+ parseFloat(sessionStorage.getItem("RP_Point")).toFixed(0) +'</div></div>';

  //xLine += '<div class="ScoreCard" style="margin-right: 10px;"><div class="font16b">'+ parseFloat(sessionStorage.getItem("RP_Point")).toFixed(0) +'</div>';
  //xLine += '<div class="font12">Coin</div></div>';
  xLine += '<div class="title-rewards"><b>รายการแลกของรางวัล</b><br><br>ทุก ๆ การสะสมเหรียญรางวัลของคุณ สามารถนำมาแลกเป็นของรางวัลตามความต้องการของคุณ</div>';
  xLine += '</div>';
  $("#DisplayScore").html(xLine);
} 


function RedeemRewards() {
  //alert("Connect");
  var str = "";
  var i = 1;
  var xStatus = "";
  //str += '<table class="table table-bordered" class="font13" style="background-color: #fff;">';
  //str += '<thead><tr style="text-align: center;background-color: #93a3c1;">';
  //str += '<th scope="col">No.</th><th scope="col">รางวัล</th><th scope="col">ใช้เหรียญ</th></tr></thead><tbody>';
  dbRedeem.where('EmpID','==',sessionStorage.getItem("EmpID_Academy"))
  .orderBy('LogTimeStamp','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      const results = arrAllRewards.filter(obj => {return obj.id === doc.data().RefID;});
      //alert(results[0].RewardsCode);
      //if(doc.data().SubNews!='วงล้อมหาสนุก') {
        if(doc.data().Status_Confirm==0) {
          xStatus = "<font color='#999999'>รอการจัดส่ง</font>";
        } else if(doc.data().Status_Confirm==1) {
          xStatus = "<font color='#f68b1f'>จัดส่งเรียบร้อยแล้ว</font>";
        } else if(doc.data().Status_Confirm==2) {
          xStatus = "<font color='#07bb12'>ได้รับของรางวัลแล้ว</font>";
        }
/*
        str += '<tr><th scope="row" style="text-align: center;">'+ i +'</th>';
        str += '<td style="text-align: left; line-height: 1.2;"><font color="#0056ff">'+ doc.data().SubNews +'</font>';
        str += '<br>แลกเมื่อ : '+ doc.data().LogDate +'<br>สถานะ : '+ xStatus +'</td>';
        str += '<td style="text-align: center;">'+ (doc.data().GetPoint)*-1 +' เหรียญ</td></tr>';
        console.log(doc.data().SubNews);
*/
        str += '<div class="story-box" data-aos="zoom-in" data-aos-delay="100">';
        str += '<div class="story-box-img"><div><img src="./rewards/'+ results[0].RewardsCode +'" class="story-box-img-in"></div></div>';
        str += '<div class="story-box-text"><div style="height: 50px;">';
        str += '<div class="story-box-text-head">'+ doc.data().SubNews +'</div>';
        str += '<div class="story-box-text-sub">แลกเมื่อ : '+ doc.data().LogDate +'<br>สถานะ : '+ xStatus +'</div>';
        str += '<div class="rewards-linkA" onclick="OpenLink(\''+ doc.data().RefID +'\',\''+ parseFloat(doc.data().RewardsPrice) +'\',\''+ i +'\')">ดูรายละเอียด</div></div>';
        str += '</div><div class="clr"></div>';

/*
        str += '<div><div class="rewards-txt1">แลกเมื่อ : '+ doc.data().LogDate +'</div>';
        str += '<div class="rewards-txt1">สถานะ : '+ xStatus +'</div></div>';
        str += '</div>';
*/
        str += '</div></div>';


        i++;
      //}
    });
    //str += '</tbody></table></div>';
    str += '<div class="clr"></div>';
    $("#DisplayRedeem").html(str);
  });
}


xRewardsRedeem = 0;
function OpenLink(x,price,i) {
  GetAllRewards();
  var str = "";
  var xCheck = 0;
  var xRPPoint = 0;
  str += '<div class="btn-memu" style="cursor: default;margin-top:10px;">รายละเอียดของรางวัล</div>';
  dbProfile.where('EmpID','==',sessionStorage.getItem("EmpID_Academy"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      const results = arrAllRewards.filter(obj => {return obj.id === x;});
      EidMember = doc.id;
      sessionStorage.setItem("XP_Point", doc.data().XP_Point);
      sessionStorage.setItem("RP_Point", doc.data().RP_Point);
      xRPPoint = doc.data().RP_Point;
      xHeader = results[0].RewardsName;
      xRewardsCode = results[0].RewardsCode;
      xRewardsName = results[0].RewardsName;
      xRewardsRedeem = results[0].RewardsRedeem;
      xWheelRandom = results[0].WheelRandom;
      xRewardsStock = parseFloat(results[0].RewardsStock);
      xRewardsid = results[0].id;
      str += '<div>';
      str += '<div class="iconbox-blue"><img src="./rewards/'+ results[0].RewardsCode +'" style="width:200px;margin-top:20px;"><div class="clr"></div>';
      str += '<div class="font13black" style="color:#0056ff;font-weight: 600;margin-top:15px;">'+ results[0].RewardsName +'</div>';
      str += '<div class="font13black" style="overflow: visible; max-height:80px;">'+ results[0].RewardsDetail +'</div>';
      //str += '<div style="height: 40px; border-radius: 10px; margin-top:8px; width:52%; margin:10px auto;">';
      //str += '<div class="rewards-linkA" style="width:100%;">';
      //str += '<div class="coin-number">'+ parseFloat(results[0].RewardsPrice) +'<img src="./icon/coin.png" class="coin-img"></div>';
      //str += '<div class="font11" style="margin-top:-3px;">เหรียญรางวัล</div>';
      str += '</div>';
      str += '</div><div class="clr"></div></div></div>';
      //if(doc.data().RP_Point>=price) {
      //  str += '<div class="font12black" style="color:#ff0000;font-weight:600;">ระบบจะทำการหักเหรียญรางวัลของคุณ ตามราคาของรางวัลชิ้นนั้นๆ หลังจากที่คุณได้ทำการกดยืนยันการแลกรางวัลแล้ว</div>';
      //} else {
      //  str += '<div>คะแนนของคุณไม่พอแลกของรางัลแล้วนะ</div>';
      //}
    });
    str += '<div class="btn-red" onclick="CloseAll()" style="margin-top:15px;margin-right: 5px;">ปิดหน้าต่างนี้</div>';
    /*
    str += '<div id="ClickRedeem">';
    str += '<div class="btn-red" onclick="CloseAll()" style="margin-top:15px;margin-right: 5px;">ยังไม่แลกตอนนี้</div>';
    str += '<div class="btn-click" onclick="CheckRewards(\''+ x +'\',\''+ price +'\',\''+ i +'\',\''+ xRPPoint +'\')" style="margin-top:15px;">ยืนยันการแลก</div>';
    str += '</div>';
    str += '<div id="LoadingSave" style="display:none;"><img src="./img/loading1.gif" style="margin:15px auto;width:20px;"></div>';
    */
    $("#DisplayRewards").html(str);
    document.getElementById('id01').style.display='block';
  });
}

/*
    str += '<div class="story-box" onclick="ViewStory(1)" data-aos="zoom-in" data-aos-delay="100">';
    str += '<div class="story-box-img"><div><img src="./rewards/'+ doc.data().RewardsCode +'" class="story-box-img-in"></div>';
    str += '</div>';
    str += '<div class="story-box-text"><div style="height: 50px;">';
    str += '<div class="story-box-text-head">'+ doc.data().RewardsName +'</div>';
    str += '<div class="story-box-text-sub">'+ doc.data().RewardsDetail +'</div>';
    str += '</div><div class="clr"></div>';
    str += '<div><div class="rewards-txt1">แลกเมื่อ : '+ doc.data().LogDate +'</div>';
    str += '<div class="rewards-txt1">สถานะ : '+ xStatus +'</div></div>';
*/

function CloseAll() {
  document.getElementById('id01').style.display='none';
  //document.getElementById('id02').style.display='none';
}