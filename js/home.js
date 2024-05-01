
$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Academy")==null || sessionStorage.getItem("LineID")==null) { location.href = "index.html"; }
  Connect_DB();
  //console.log(thistoday);
  //console.log(sessionStorage.getItem("CheckDonePulse"));
  CheckDatePulse();
  LoadSlider();
});


function CheckDatePulse() {
  var xCheckDate = 0;
  dbPulseDate.where('PulseDate','==',thistoday)
  .where('xTeamGroup','==',sessionStorage.getItem("xTeamGroup"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xCheckDate = 1;
      CheckDoneSurvey();
    });
  });
}

function CheckDoneSurvey() {
  var xCheckDone = 0;
  dbUserSurvey.where('PulseDate','==',thistoday)
  .where('LineID','==',sessionStorage.getItem("LineID"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xCheckDone = 1;
    });
    if(xCheckDone==0) {
      GotoSurvey();
    }
  });
}

function ViewClip(x) {
  alert(x);
  location.href = "displayclip.html?gid=ETwEgh2Pv1MVcgZNxLNn";
}



function GotoSurvey() {
  location.href = "pulsesurvey.html";
}


function LoadSlider() {
  var str = "";
  str += '<div id="homepage-slider" class="st-slider" style="max-width: 450px;">';
  str += '<input type="radio" class="cs_anchor radio" name="slider" id="slide1"/>';
  str += '<input type="radio" class="cs_anchor radio" name="slider" id="slide2"/>';
  str += '<input type="radio" class="cs_anchor radio" name="slider" id="slide3"/>';
  str += '<input type="radio" class="cs_anchor radio" name="slider" id="play1" checked=""/>';

  str += '<div class="images"><div class="images-inner">';

  str += '<div class="image-slide" onclick="ViewClip(1)">';
  str += '<div class="image bg-yellow"><img src="./clip/CYB-03.jpg" style="width:100%;"></div></div>';
  str += '<div class="image-slide" onclick="ViewClip(2)">';
  str += '<div class="image bg-blue"><img src="./clip/CYB-11.jpg" style="width:100%;"></div></div>';
  str += '<div class="image-slide" onclick="ViewClip(3)">';
  str += '<div class="image bg-red"><img src="./clip/CYB-12.jpg" style="width:100%;"></div></div>';

  str += '</div></div>';

  str += '<div class="labels" style="margin-top:5px;">';
  str += '<label for="slide1" class="label"></label>';
  str += '<label for="slide2" class="label"></label>';
  str += '<label for="slide3" class="label"></label>';

  str += '<div class="fake-radio" style="text-align:center;">';
  str += '<label for="slide1" class="radio-btn"></label>';
  str += '<label for="slide2" class="radio-btn"></label>';
  str += '<label for="slide3" class="radio-btn"></label>';
  str += '</div></div></div>';
  $("#DisplaySlider").html(str);

}




/*
function TapMenu(x) {
  if(x==0) {
    location.href = "home.html";
  } if(x==1) { 
    location.href = "calendar.html";
  } if(x==2) { 
    location.href = "quizgame.html";
  } if(x==3) { 
    location.href = "rewards.html";
  }
}
*/


/*

function CheckData() {
  var str = "";
  dbGiftRewards.where('EmpID','==',sessionStorage.getItem("EmpID_Moon2023"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      gcheck = 1;
      Xgiftname = doc.data().giftname;
      document.getElementById('loading').style.display='none';
      document.getElementById('DisplayActive').style.display='none';
      document.getElementById('DisplayMyReward').style.display='block';

      str +='<center><div class="btn-1" style="margin-top:35px; margin-bottom: 15px;">ผลการสุ่มรางวัลของคุณ</div>';
      str +='<div style="margin:20px auto;"><img src="./img/'+ doc.data().giftcode +'.png" style="max-height:150px;"></div>';
      if(doc.data().giftcode=="gift-99") {
        str +='<div style="color:#fff;"><b>เสียใจด้วยน้า</b> คุณไม่ได้รับรางวัล<br>จาก ... <b>กิจกรรมวันฮาโลวีน</b><br>แล้วมาร่วมกิจกรรมกันใหม่ในกิจกรรมหน้าน้า</div>';
        str +='<div class="clr"></div>';
      } else {
        str +='<div style="color:#fff;"><b>ยินดีด้วย</b> คุณได้รับรางวัล<br>จาก ... <b>กิจกรรมวันฮาโลวีน</b><br>ของรางวัลที่สุ่มได้คือ <b>'+ doc.data().giftname +'</b><br>เราจะทำการจัดส่งของรางวัลไปให้หลังจบกิจกรรมนี้</div>';
        str +='<div class="clr"></div>';
      }
      str +='</center>';
      $("#DisplayGift").html(str);
    });
    if(gcheck==0) {
      document.getElementById('loading').style.display='none';
      document.getElementById('DisplayActive').style.display='block';
      document.getElementById('DisplayMyReward').style.display='none';
      if(sessionStorage.getItem("DisplayText")==null) { 
        sessionStorage.setItem("DisplayText", 'Show');
        document.getElementById('id02').style.display='block';
      }
    }
  });
  MoonCake();
}


function MoonCake() {
  var str = "";
  var MaxProduct = 9;
  for (let i = 0; i < MaxProduct; i++) {
    str += '<div onclick="OpenCake(\''+ arrMoonCake[i][0] +'\',\''+ arrMoonCake[i][1] +'\')" class="box_gift"><div style="padding:5px"><img src="./img/g-'+ arrMoonCake[i][0] +'.png" style="width:80px;"></div>';
    str += '<div class="text-name">'+ arrMoonCake[i][1] +'</div></div>';
  }
  $("#DisplayMoonCake").html(str);
}


function OpenCake(n,x) {
  var str = "";
  dbGiftRewards.where('EmpID','==',sessionStorage.getItem("EmpID_Moon2023"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      gcheck = 1;
      str +='<div class="btn-1" style="margin-top:25px; margin-bottom: 15px; background:#0056ff; color:#fff;">ผลการสุ่มรางวัลของคุณ</div>';
      str +='<div style="margin:20px auto;"><img src="./img/'+ doc.data().giftcode +'.png" style="max-height:220px;"></div>';
      if(doc.data().giftcode=="gift-99") {
        str +='<div style="color:#fff;"><b>เสียใจด้วยน้า</b> คุณไม่ได้รับรางวัล<br>จาก ... <b>กิจกรรมวันฮาโลวีน</b><br>แล้วมาร่วมกิจกรรมกันใหม่ในกิจกรรมหน้าน้า</div>';
        str +='<div class="btn-t2" onclick="CloseAll()" style="margin-top:10px;">ปิดหน้าต่างนี้</div>';
        str +='<div class="clr"></div></center>';
      } else {
        str +='<div style="color:#fff;"><b>ยินดีด้วย</b> คุณได้รับรางวัล<br>จาก ... <b>กิจกรรมวันฮาโลวีน</b><br>ของรางวัลที่สุ่มได้คือ <b>'+ doc.data().giftname +'</b><br>เราจะทำการจัดส่งของรางวัลไปให้หลังจบกิจกรรมนี้</div>';
        str +='<div class="btn-t2" onclick="CloseAll()" style="margin-top:10px;">ปิดหน้าต่างนี้</div>';
        str +='<div class="clr"></div></center>';
      }
      $("#ShowMoonCake").html(str);
      document.getElementById('id01').style.display='block';
    });
    if(gcheck==0) {
      str +='<div class="btn-1" style="margin-top:25px; margin-bottom: 15px; background:#0056ff; color:#fff;">กิจกรรมสุ่มรับโชค</div>';
      str +='<div><img src="./img/g-'+ n +'.png" style="width:80%;"></div>';
      str +='<div class="text-product">'+ x +'</div>';
      str +='<div class="btn-t2" onclick="CheckRewards()" style="margin:10px auto;background:#12ca3c; margin-right:10px;border:2px solid #fff;">คลิกสุ่มรับโชค</div>';
      str +='<div class="btn-t2" onclick="CloseAll()" style="margin:10px auto;background:#ff0000;border:2px solid #fff; color:#fff;">เลือกรายการใหม่</div>';
      str +='<div class="clr" style="height: 10px;"></div>';
      $("#ShowMoonCake").html(str);
      document.getElementById('id01').style.display='block';
    }
  });
}


function CheckRewards() {
  var str = "";
  var TxtRandom = "กำลังสุ่มรางวัล";
  $("#ShowMoonCake").html(cleararray);
  document.getElementById('DisplayActive').style.display='none';
  document.getElementById('DisplayMyReward').style.display='none';
  $("#DisplayGift").html(cleararray);
  str +='<div class="btn-1" style="margin-top:25px; margin-bottom: 15px; background:#0056ff; color:#fff;">เรากำลังสุ่มรางวัลของคุณ</div>';
  str +='<div class="progress blue"><span class="progress-left">';
  str +='<span class="progress-bar"></span></span>';
  str +='<span class="progress-right"><span class="progress-bar"></span></span>';
  str +='<div class="progress-value" style="font-size:16px;"><div class="blink">'+ TxtRandom.blink() +'</div></div></div><div style="color:#fff;">... โปรดรอสักครู่ ...</div>';
  str +='<div class="clr" style="height: 40px;">';
  $("#ShowMoonCake").html(str);
  var myTimeout = setTimeout(RandomRewards, 1000);
  //CountRewards();
}


function CountRewards() { 
  var i = 0;
  dbGiftRewards.where('EmpID','!=','')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      i = i+1;
    });
    $("#CountUser").html("ขณะนี้มีผู้ร่วมกิจกรรมแล้ว <span class='font18'>"+ addCommas(i) +"</span> คน");
    console.log(i);
  });  
}


function RandomRewards() { 
  var i = 0;
  Eidewards = "";
  dbGiftRewards.where('EmpID','==','')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      i = i+1;
      ArrRewards.push([doc.id, doc.data().giftname, doc.data().giftcode]);
    });
    NewRewards = random_item(ArrRewards);
    Eid = NewRewards[0];
    if(NewRewards[2]!="gift-99") {
      XCheckRewards = 1;
    }
    //console.log("Code = "+XCheckRewards);
    //console.log(ArrRewards);
    //console.log(NewRewards);
    //console.log(Eidewards);
    UpdateRewards();
  });  
}


function ShowRewards() {
  XCheckRewards = 0;
  var str = "";
  var myTimeout = setTimeout(CheckData, 1500);
  str +='<div class="btn-1" style="margin-top:25px; margin-bottom: 15px; background:#0056ff; color:#fff;">ผลการสุ่มรางวัลของคุณ</div>';
  str +='<div style="margin:20px auto;"><img src="./img/'+ NewRewards[2] +'.png" style="max-height:150px;"></div>';
  if(NewRewards[2]=="gift-99") {
    str +='<div style="color:#fff;"><b>เสียใจด้วยน้า</b> คุณไม่ได้รับรางวัล<br>จาก ... <b>กิจกรรมวันฮาโลวีน</b><br>แล้วมาร่วมกิจกรรมกันใหม่ในกิจกรรมหน้าน้า</div>';
  } else {
    str +='<div style="color:#fff;"><b>ยินดีด้วย</b> คุณได้รับรางวัล<br>จาก ... <b>กิจกรรมวันฮาโลวีน</b><br>ของรางวัลที่สุ่มได้คือ <b>'+ NewRewards[1] +'</b><br>เราจะทำการจัดส่งของรางวัลไปให้หลังจบกิจกรรมนี้</div>';
  }
  str +='<div class="btn-t2" onclick="CloseAll()" style="margin-top:10px;">ปิดหน้าต่างนี้</div>';
  str +='<div class="clr"></div></center>';
  $("#ShowMoonCake").html(str);
  CountRewards();
}


function UpdateRewards() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbGiftRewards.doc(Eid).update({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Moon2023"),
    EmpName : sessionStorage.getItem("EmpName_Moon2023"),
    Phone : sessionStorage.getItem("EmpPhone"),
    address : sessionStorage.getItem("EmpAddress"),
    ResultQuiz : NewRewards[2],
    StatusSend : XCheckRewards,
    DateRegister : dateString,
  });
  var myTimeout = setTimeout(ShowRewards, 2000);
  //ShowRewards();
}



function NewDate() {
  var today = new Date();
  var day = today.getDate() + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
}

function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}

function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}


function numberWithCommas(num) {
  var valueString=num; //can be 1500.0 or 1500.00 
  var amount=parseFloat(valueString).toFixed(2);
  return formattedString= amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function GotoRewards() {
  location.href = "rewards.html";
}


function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];   
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
  //document.getElementById('id02').style.display='none';
  //document.getElementById('id03').style.display='none';
}
*/

/*
function blinker()
  {
    if(document.getElementById("blink"))
    {
        var d = document.getElementById("blink") ;
        d.style.color= (d.style.color=='blue'?'white':'blue');
        setTimeout('blinker()', 900);
    }
}
*/

