//var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var xClickMenu = "";
var xRewardsCode = "";

$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Academy")==null || sessionStorage.getItem("LineID")==null) { location.href = "index.html"; }
  Connect_DB();
  OpenUserPoint();
  GetAllRewards();
  ListRewards();
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


function ListRewards() {
  var i = 0;
  var str = "";
  var xCountNews = 0;
  dbRewards
  .where('RewardsStatus','==',0)
  .orderBy('RewardsRank','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xRewardsCode = doc.data().RewardsCode;
      //(alert(doc.data().WheelRandom);

    str += '<div class="story-box" data-aos="zoom-in" data-aos-delay="100">';
    str += '<div class="story-box-img"><div><img src="./rewards/'+ doc.data().RewardsCode +'" class="story-box-img-in"></div>';
    //str += '<div class="btn-small">Click</div>';
    str += '</div>';
    str += '<div class="story-box-text"><div style="height: 50px;">';
    str += '<div class="story-box-text-head">'+ doc.data().RewardsName +'</div>';
    str += '<div class="story-box-text-sub" style="height: 31px;">'+ doc.data().RewardsDetail +'</div>';
    str += '</div><div class="clr"></div>';
    if(sessionStorage.getItem("COIN_Point")<doc.data().RewardsPrice) {
      if(parseFloat(doc.data().RewardsStock)>0) {
        str += '<div><div class="rewards-txt1">เหลือ '+ parseFloat(doc.data().RewardsStock) +' รายการ</div>';
      } else {
        str += '<div><div class="rewards-linkB">รางวัลหมดแล้ว</div>';
      }
      str += '<div class="rewards-linkB">ใช้ '+ parseFloat(doc.data().RewardsPrice) +' COIN</div></div>';
    } else {
      if(parseFloat(doc.data().RewardsStock)>0) {
        str += '<div><div class="rewards-txt1">เหลือ '+ parseFloat(doc.data().RewardsStock) +' รายการ</div>';
        str += '<div class="rewards-linkA" onclick="OpenLink(\''+ doc.id +'\',\''+ parseFloat(doc.data().RewardsPrice) +'\',\''+ i +'\')">ใช้ '+ parseFloat(doc.data().RewardsPrice) +' COIN</div></div>';
      } else {
        str += '<div><div class="rewards-txt1">รางวัลหมดแล้ว</div>';
        str += '<div class="rewards-linkB">ใช้ '+ parseFloat(doc.data().RewardsPrice) +' COIN</div></div>';
      }
    }
    //str += '<div><div class="rewards-txt1">เหลือ '+ parseFloat(doc.data().RewardsStock) +' รายการ</div>';
    //str += '<div class="rewards-txt1">ใช้ '+ parseFloat(doc.data().RewardsPrice) +' เหรียญ</div></div>';
    //str += '<div class="entry-meta">';
    //str += '<ul><li class="d-flex align-items-center"><i class="icofont-alarm"></i>4 Read</li>';
    //str += '<li class="d-flex align-items-center"><i class="icofont-like"></i>5 Like</li>';
    //str += '<li class="d-flex align-items-center"><i class="icofont-comment"></i>6 Comment</li>';
    //str += '</ul></div>';
    str += '</div></div>';
    i++;
    });


    $("#DisplayList").html(str);
  });
}



xRewardsRedeem = 0;
function OpenLink(x,price,i) {
  GetAllRewards();
  var str = "";
  var xCheck = 0;
  var xRPPoint = 0;
  str += '<div><span class="header1">ยืนยันการแลก</span> <span class="header2">ของรางวัล</span></div>';
  dbProfile.where('EmpID','==',sessionStorage.getItem("EmpID_Academy"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      const results = arrAllRewards.filter(obj => {return obj.id === x;});
      EidMember = doc.id;
      sessionStorage.setItem("XP_Point", doc.data().XP_Point);
      sessionStorage.setItem("RP_Point", doc.data().RP_Point);
      sessionStorage.setItem("COIN_Point", doc.data().COIN_Point);
      xRPPoint = doc.data().COIN_Point;
      xHeader = results[0].RewardsName;
      xRewardsCode = results[0].RewardsCode;
      xRewardsName = results[0].RewardsName;
      xRewardsRedeem = results[0].RewardsRedeem;
      xWheelRandom = results[0].WheelRandom;
      xRewardsStock = parseFloat(results[0].RewardsStock);
      xRewardsid = results[0].id;
      str += '<div class="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">';
      str += '<div class="iconbox-blue"><img src="./rewards/'+ results[0].RewardsCode +'" style="width:200px;margin-top:20px;"><div class="clr"></div>';
      str += '<div class="font13b" style="color:#0056ff;font-weight: 600;margin-top:15px; text-align: center;">'+ results[0].RewardsName +'</div>';
      str += '<div class="font13" style="overflow: visible; max-height:80px;text-align: center;">'+ results[0].RewardsDetail +'</div>';
      str += '<div style="height: 40px; border-radius: 10px; margin-top:8px; width:52%; margin:10px auto;">';
      str += '<div class="rewards-linkA" style="width:100%;">';
      str += '<div class="coin-number">'+ parseFloat(results[0].RewardsPrice) +' COIN</div>';
      //str += '<div class="coin-number">'+ parseFloat(results[0].RewardsPrice) +' <img src="./icon/icon-coin.png" class="coin-img"></div>';
      //str += '<div class="font11" style="margin-top:-3px;">COIN</div>';
      str += '</div></div><div class="clr"></div></div></div>';
      if(doc.data().COIN_Point>=price) {
        str += '<div class="font12black" style="margin-top:6px;color:#ff0000;font-weight:600;">ระบบจะทำการหัก COIN ของคุณ ตามราคาของรางวัลชิ้นนั้นๆ หลังจากที่คุณได้ทำการกดยืนยันการแลกรางวัลแล้ว</div>';
      } else {
        str += '<div>คะแนนของคุณไม่พอแลกของรางัลแล้วนะ</div>';
      }
    });
    str += '<div id="ClickRedeem">';
    str += '<div class="btn-click" onclick="CheckRewards(\''+ x +'\',\''+ price +'\',\''+ i +'\',\''+ xRPPoint +'\')" style="margin-top:15px;margin-right: 5px;">ยืนยันการแลก</div>';
    str += '<div class="btn-red" onclick="CloseAll()" style="margin-top:15px;">ยังไม่แลกตอนนี้</div>';
    str += '</div>';
    str += '<div id="LoadingSave" style="display:none;"><img src="./img/loading1.gif" style="margin:15px auto;width:20px;"></div>';
    $("#DisplayRewards").html(str);
    document.getElementById('id01').style.display='block';
  });
}



function CheckRewards(x,price,i,xRP) {
  document.getElementById('ClickRedeem').style.display='none';
  document.getElementById('LoadingSave').style.display='block';
  var str = "";
  dbRewards.where(firebase.firestore.FieldPath.documentId(), "==", x)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(doc.data().RewardsStock==0) {
        str += '<div class="btn-t3" style="cursor: default;margin-top:10px;background:#fff;">ทำรายการไม่สำเร็จ</div>';
        str += '<div class="col-lg-4 col-md-6 align-items-stretch" data-aos="zoom-in" data-aos-delay="100">';
        str += '<center><div class="iconbox-blue"><img src="./rewards/'+ xRewardsCode +'" style="width:200px;margin-top:10px;"><div class="clr"></div>';
        str += '<div class="font13black" style="color:#0056ff;font-weight: 600;margin-top:15px;">'+ xRewardsName +'</div>';
        str += '<div class="font12black" style="color:#ff0000;margin:8px auto;text-align:center;"><b>เนื่องจากของรางวัลหมดแล้ว</b></div>';
        str += '</div></div></center><div class="clr"></div>';
        str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:15px;">ปิดหน้าต่างนี้</div>';
        $("#DisplayRewards").html(str);
        dbRewards.doc(x).update({
          RewardsStatus : 1
        });   
        document.getElementById('id01').style.display='block';
      } else {
        RedeemPoint(x,price,i,xRP);
      }
    });
  });
}



function RedeemPoint(x,price,i,xRP) {
  var str = "";
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  var LastRP = parseFloat(xRP) - parseFloat(price);
  if (LastRP>=0) {
    if(xRewardsStock!=0) {
      dbProfile.doc(EidMember).update({
        LastUpdate : dateString,
        COIN_Point : parseFloat(sessionStorage.getItem("COIN_Point"))-parseFloat(price)
      });
      //console.log("ยอดแลก="+parseFloat(price));
      sessionStorage.setItem("COIN_Point", parseFloat(sessionStorage.getItem("COIN_Point"))-parseFloat(price));

      xRewardsStock = parseFloat(xRewardsStock) - 1;
      if(xRewardsStock==0) {
        dbRewards.doc(xRewardsid).update({
          RewardsStatus : 1, 
          RewardsStock : parseFloat(xRewardsStock) 
        });    
      } else {
        dbRewards.doc(xRewardsid).update({
          RewardsRedeem : parseFloat(xRewardsRedeem) + 1,
          RewardsStock : parseFloat(xRewardsStock) 
        });    
      }
      //alert("-205-Point"+parseFloat(price));
      dbRedeem.add({
        LineID : sessionStorage.getItem("LineID"),
        LineName : sessionStorage.getItem("LineName"),
        LinePicture : sessionStorage.getItem("LinePicture"),
        EmpID : sessionStorage.getItem("EmpID_Academy"),
        EmpName : sessionStorage.getItem("EmpName_Academy"),
        //RewardsCode : 
        RefID : x,
        HeadNews : "Redeem Point",
        SubNews : xHeader,
        GetPoint : parseFloat(price) * (-1),
        LastPoint : parseFloat(sessionStorage.getItem("COIN_Point")),
        LogDate : dateString,
        Status_Start : 0,
        Status_Send : 0,
        Status_Confirm : 0,
        LogTimeStamp : TimeStampDate
      })

      dbUserlog.add({
        LineID : sessionStorage.getItem("LineID"),
        LineName : sessionStorage.getItem("LineName"),
        LinePicture : sessionStorage.getItem("LinePicture"),
        EmpID : sessionStorage.getItem("EmpID_Academy"),
        EmpName : sessionStorage.getItem("EmpName_Academy"),
        RefID : x,
        NewsGroup : 0,
        HeadNews : "Redeem Point",
        SubNews : xHeader,
        GetPoint : parseFloat(price) * (-1),
        LastPoint : parseFloat(sessionStorage.getItem("XP_Point")),
        LogDate : dateString,
        LogTimeStamp : TimeStampDate
      });
      var varTimerInMiliseconds = 1500;
      setTimeout(function(){ 
        ShowItem(i);
      }, varTimerInMiliseconds);
    } else {
      alert("แลกไม่ได้ เนื่องจากของรางวัลหมดแล้ว");
    }
  } else {
    alert("COIN ที่คุณจะใช้มีไม่พอ");
  }
}



    
function UserScore() {
  var xLine = "";
  xLine += '<div class="box-top-user">';
  xLine += '<div style="width:300px; margin:0px auto;">';
  //xLine += '<div class="ScoreCard"><div class="font16b">'+ parseFloat(sessionStorage.getItem("Level_Point")).toFixed(0) +'</div>';
  //xLine += '<div class="font12">ระดับ<br>ประสบการณ์</div></div>';
  //xLine += '<div class="ScoreCard"><div class="font16b">'+ parseFloat(sessionStorage.getItem("XP_Point")).toFixed(2) +'</div>';
  //xLine += '<div class="font12">ประสบการณ์<br>การใช้งาน</div></div>';
  //xLine += '<div><img class="box-user-rewards" src="'+ sessionStorage.getItem("LinePicture") +'" onerror="javascript:imgError(this)" ></div>';
  xLine += '<div class="ScoreCard" style="background:#dae6ef;"><div><img src="./icon/icon-bag.png" class="coin-img1"></div><div class="font12">POINT</div><div class="font16b">'+ parseFloat(sessionStorage.getItem("RP_Point")).toFixed(0) +'</div></div>';
  xLine += '<div style="float:left;width: 110px;"><div class="btn-red" onclick="ChengeCOIN()" style="border-radius:50%; width: 80px; height: 80px; padding:0px; padding-top: 9px;">เปลี่ยน<br>POINT<br>เป็น COIN</div></div>';
  xLine += '<div class="ScoreCard"><div><img src="./icon/icon-coin.png" class="coin-img1"></div><div class="font12">COIN</div><div class="font16b">'+ parseFloat(sessionStorage.getItem("COIN_Point")).toFixed(0) +'</div></div>';

  //xLine += '<div class="ScoreCard" style="margin-right: 10px;"><div class="font16b">'+ parseFloat(sessionStorage.getItem("RP_Point")).toFixed(0) +'</div>';
  //xLine += '<div class="font12">Coin</div></div>';
  //xLine += '<div class="title-rewards"><b>รายการแลกของรางวัล</b><br><br>ทุก ๆ การสะสม COIN ของคุณ สามารถนำมาแลกเป็นของรางวัลตามความต้องการของคุณ</div>';
  xLine += '</div>';
  $("#DisplayScore").html(xLine);
} 


function ShowItem(i) {
  var str = "";
  document.getElementById('LoadingSave').style.display='none';
  if(xWheelRandom==1) {
    str += '<div class="btn-memu" style="margin-top:10px;">ทำรายการแลกสำเร็จ</div>';
    str += '<div class="col-lg-4 col-md-6 align-items-stretch" data-aos="zoom-in" data-aos-delay="100">';
    str += '<center><div class="iconbox-blue"><img src="./rewards/'+ xRewardsCode +'" style="width:200px;margin-top:10px;"><div class="clr"></div>';
    str += '<div class="font13black" style="color:#0056ff;font-weight: 600;margin-top:15px;">'+ xRewardsName +'</div><div class="clr"></div>';
    str += '<div class="font12black" style="color:#f68b1f;margin:8px auto;text-align:center;">ทำรายการ : '+ dateString +'</div>';
    str += '<div class="font12black" style="color:#777;margin:8px auto;text-align:center;">ระบบได้ทำการตัด COIN ของคุณไปเรียบร้อยแล้ว ขอให้กดปุ่มด้านล่างเพื่อไปหมุนวงล้อกัน หากไม่กดปุ่มและออกจากหน้านี้จะหมดสิทธิ์ในการหมุนวงล้อมหาสนุกนะ</div>';
    str += '</div></div></center><div class="clr"></div>';
    str += '<div class="btn-blue" onclick="LinkToRandom()" style="margin-top:15px;">เข้าไปหมุนวงล้อ</div>';
    $("#DisplayRewards").html(str);
    MyPoint();
    UserScore();
    OpenUserPoint();
    //OpenPopMenu();
    ListRewards();
  } else {
    str += '<div class="btn-memu" style="cursor: default;margin-top:10px;background:#fff;">ทำรายการแลกสำเร็จ</div>';
    str += '<div class="col-lg-4 col-md-6 align-items-stretch" data-aos="zoom-in" data-aos-delay="100">';
    str += '<center><div class="iconbox-blue"><img src="./rewards/'+ xRewardsCode +'" style="width:200px;margin-top:10px;"><div class="clr"></div>';
    str += '<div class="font13black" style="color:#0056ff;font-weight: 600;margin-top:15px;">'+ xRewardsName +'</div>';
    str += '<div class="font12black" style="color:#f68b1f;margin:8px auto;text-align:center;">ทำรายการ : '+ dateString +'</div>';
    str += '<div class="font12black" style="color:#777;margin:8px auto;text-align:center;">ระบบได้ทำการบันทึกรายการแลกของรางวัลของคุณเรียบร้อยแล้ว หากปฏิบัติงานอยู่ ณ สำนักงานใหญ่ ให้ติดต่อขอรับรางวัลได้ที่ชั้น 18A</div>';
    str += '</div></div></center><div class="clr"></div>';
    str += '<div class="btn-blue" onclick="LinkGift()" style="margin-top:15px; margin-right: 5px;">ดูของรางวัล</div>';
    str += '<div class="btn-grey" onclick="CloseAll()" style="margin-top:15px;">ปิดหน้าต่างนี้</div>';
    $("#DisplayRewards").html(str);
    MyPoint();
    UserScore();
    OpenUserPoint();
    //OpenPopMenu();
    ListRewards();
  }
}


function ChengeCOIN() {
    alert("คุณต้องการจะทำการแลกเปลี่ยน POINT เป็น COIN ใช่หรือไม่");
}


function LinkGift() {
  location.href = "yourrewards.html";
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
  //ListRewards();
  //GetAllRewards();

}


