var xProfile = "";
var VDOtimeString = "";
//MenuFooter();


function MyPoint() {
  dbProfile.where('LineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckFoundData = 1;
        sessionStorage.setItem("XP_Point", doc.data().XP_Point);
        sessionStorage.setItem("RP_Point", doc.data().RP_Point);
        sessionStorage.setItem("QS_Point", doc.data().QS_Point);
    });
  });
}


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


function MyPointMenu() {
  //console.log("Menu");
  var xLine = "";
  var xValue1 = ((parseFloat(sessionStorage.getItem("Level_Point")).toFixed(0)/5)*100);
  var xValue2 = 0;
  var xValue3 = 0;
  var xRatio = "100";
  if(sessionStorage.getItem("LineID")!=null) {
      var xxx = parseFloat(sessionStorage.getItem("XP_Point"));
      //console.log("XP_Point="+(parseFloat(sessionStorage.getItem("XP_Point"))));
      if(sessionStorage.getItem("XP_Point") >= 1000) {
        xValue2 = xRatio;
      } else if(xxx >= 600) {
        xValue2 = ((parseFloat(xxx)/1000)*100);
        console.log("XP_Point="+xValue2);
      } else {
        xValue2 = (parseFloat(sessionStorage.getItem("XP_Point")));
      }

    xLine += '<div class="clr" style="height:10px;"></div>';
    //xLine += '<div><img src="" class="show-profile"></div>';
    xLine += '<div>'+ xProfile +'</div>';
    xLine += '<div class="txt-white"><b>'+ sessionStorage.getItem("xTeamGroup") +'</b>';
    if(sessionStorage.getItem("xBranch")!="") {
      xLine += '<br>'+ sessionStorage.getItem("xBranch") +'';
      xLine += '<br>'+ sessionStorage.getItem("xDepartment")+'';
    } else {
      xLine += '<br>'+ sessionStorage.getItem("xDepartment") +'';
    }
    xLine += '<br>'+ sessionStorage.getItem("xGroup") +'';
    xLine += '<br>'+ sessionStorage.getItem("xChief_th") +' ('+ sessionStorage.getItem("xChief_eng") +')';
    xLine += '<div class="half-arc" style="--percentage:'+ parseFloat(sessionStorage.getItem("PulseRatio")).toFixed(2) +'%;"><span class="label">'+ parseFloat(sessionStorage.getItem("PulseRatio")).toFixed(2) +'%</span></div>';
    xLine += '<div class="txt-white">ภาพรวมอุณหภูมิความสุขในการทำงานของคุณ</div>';
    xLine += '<div class="clr" style="height:20px"></div>';

    xLine += '<div style="width:290px; margin:5px auto 10px auto;">';
    xLine += '<div class="ScoreCard"><div class="font16b">'+ parseFloat(sessionStorage.getItem("Level_Point")).toFixed(0) +'</div>';
    xLine += '<div class="font12" style="padding:5px;">ระดับ<br>ประสบการณ์</div></div>';
    xLine += '<div class="ScoreCard"><div class="font16b">'+ parseFloat(sessionStorage.getItem("XP_Point")).toFixed(2) +'</div>';
    xLine += '<div class="font12" style="padding:5px;">ประสบการณ์<br>การใช้งาน</div></div>';
    xLine += '<div class="ScoreCard"><div class="font16b">'+ parseFloat(sessionStorage.getItem("RP_Point")).toFixed(2) +'</div>';
    xLine += '<div class="font12" style="padding:5px;">เหรียญ<br>แลกรางวัล</div></div>';
    xLine += '</div>';
    xLine += '</div>';
    if(sessionStorage.getItem("CheckDonePulse")==0) {
      //xLine += '<div class="btn-grey" onclick="PulseDetail()" style="margin-top:20px;margin-right:5px;">เกี่ยวกับวัดอุณหภูมิ</div>';
      xLine += '<div class="btn-click" onclick="GotoSurvey()" style="margin-top:25px;">ไปวัดอุณหภูมิความสุขของคุณ</div>';
    } else {
      xLine += '<div class="btn-blue" onclick="GotoPulse()" style="margin-top:25px; margin-right:5px;">ดูอุณหภูมิความสุข</div>';
      xLine += '<div class="btn-click" onclick="GotoHome()" style="margin-top:25px;">เข้าสู่ระบบงาน</div>';
    }    
    xLine += '</div><div class="clr" style="height:30px;"></div>'
    $("#DisplayMyPoint").html(xLine); 
    document.getElementById('loading').style.display='none';
  }
}


function MyPulseSurvey() {
  var xLine = "";
  var xValue1 = ((parseFloat(sessionStorage.getItem("Level_Point")).toFixed(0)/5)*100);
  var xValue2 = 0;
  var xValue3 = 0;
  var xRatio = "100";
  if(sessionStorage.getItem("LineID")!=null) {
    var xxx = parseFloat(sessionStorage.getItem("XP_Point"));
    //console.log("XP_Point="+(parseFloat(sessionStorage.getItem("XP_Point"))));
    if(sessionStorage.getItem("XP_Point") >= 1000) {
      xValue2 = xRatio;
    } else if(xxx >= 600) {
      xValue2 = ((parseFloat(xxx)/1000)*100);
      console.log("XP_Point="+xValue2);
    } else {
      xValue2 = (parseFloat(sessionStorage.getItem("XP_Point")));
    }

    xLine += '<div class="clr" style="height:10px;"></div>';
    xLine += '<div style="color:#fff;">'+ xProfile +'</div>';


  xLine += '<div style="width:290px; margin:10px auto;">';
  xLine += '<div class="ScoreCard"><div><img src="./icon/icon-level.png" class="coin-img1"></div><div class="font12">LEVEL</div><div class="font16b">'+ parseFloat(sessionStorage.getItem("Level_Point")).toFixed(0) +'</div></div>';
  xLine += '<div class="ScoreCard"><div><img src="./icon/icon-point.png" class="coin-img1"></div><div class="font12">POINT</div><div class="font16b">'+ parseFloat(sessionStorage.getItem("XP_Point")).toFixed(0) +'</div></div>';
  xLine += '<div class="ScoreCard"><div><img src="./icon/icon-coin.png" class="coin-img1"></div><div class="font12">COIN</div><div class="font16b">'+ parseFloat(sessionStorage.getItem("RP_Point")).toFixed(0) +'</div></div>';


  //xLine += '<div class="ScoreCard"><div class="font16b">'+ parseFloat(sessionStorage.getItem("XP_Point")).toFixed(0) +'</div>';
  //xLine += '<div class="font12">Point</div></div>';
  //xLine += '<div class="ScoreCard"><div class="font16b">'+ parseFloat(sessionStorage.getItem("RP_Point")).toFixed(0) +'<span><img src="./icon/coin.png" class="coin-img"></span></div>';
  //xLine += '<div class="font12">Coin</div></div>';


  xLine += '<div class="clr" style="height:10px"></div>';
  xLine += '<div class="btn-blue" onclick="GotoReeards()">แลกของรางวัล</div>';
  xLine += '<div class="clr" style="height:20px"></div>';
/*
    xLine += '<div class="txt-white""><b>'+ sessionStorage.getItem("xTeamGroup") +'</b>';
    if(sessionStorage.getItem("xBranch")!="") {
      xLine += '<br>'+ sessionStorage.getItem("xBranch") +'';
      xLine += '<br>'+ sessionStorage.getItem("xDepartment")+'';
    } else {
      xLine += '<br>'+ sessionStorage.getItem("xDepartment") +'';
    }
    xLine += '<br>'+ sessionStorage.getItem("xGroup") +'';
    xLine += '<br>'+ sessionStorage.getItem("xChief_th") +' ('+ sessionStorage.getItem("xChief_eng") +')';
*/


    xLine += '<div class="half-arc" style="--percentage:'+ parseFloat(sessionStorage.getItem("PulseRatio")).toFixed(2) +'%;"><span class="label">'+ parseFloat(sessionStorage.getItem("PulseRatio")).toFixed(2) +'%</span></div>';
    xLine += '<div class="txt-white" style="color:#000;">ภาพรวมอุณหภูมิความสุขในการทำงานของคุณ</div>';
    //xLine += '<div class="clr" style="height:20px"></div>';



/*
    xLine += '<div style="width:290px; margin:5px auto 10px auto;">';
    xLine += '<div class="ScoreCard"><div class="font16b">'+ parseFloat(sessionStorage.getItem("Level_Point")).toFixed(0) +'</div>';
    xLine += '<div class="font12" style="padding:5px;">ระดับ<br>ประสบการณ์</div></div>';
    xLine += '<div class="ScoreCard"><div class="font16b">'+ parseFloat(sessionStorage.getItem("XP_Point")).toFixed(2) +'</div>';
    xLine += '<div class="font12" style="padding:5px;">ประสบการณ์<br>การใช้งาน</div></div>';
    xLine += '<div class="ScoreCard"><div class="font16b">'+ parseFloat(sessionStorage.getItem("RP_Point")).toFixed(2) +'</div>';
    xLine += '<div class="font12" style="padding:5px;">เหรียญ<br>แลกรางวัล</div></div>';
    xLine += '</div>';
*/
    xLine += '</div>';
/*
    if(sessionStorage.getItem("CheckDonePulse")==0) {
      xLine += '<div class="btn-click" onclick="GotoSurvey()" style="margin-top:25px;">ไปวัดอุณหภูมิความสุขของคุณ</div>';
    } else {
      xLine += '<div class="btn-blue" onclick="GotoPulse()" style="margin-top:25px; margin-right:5px;">ดูอุณหภูมิความสุข</div>';
      xLine += '<div class="btn-click" onclick="GotoHome()" style="margin-top:25px;">เข้าสู่ระบบงาน</div>';
    }    
*/
    xLine += '</div><div class="clr" style="height:30px;"></div>'
    $("#DisplayPulseSurvey").html(xLine); 
    document.getElementById('loading').style.display='none';
    console.log(parseFloat(sessionStorage.getItem("PulseRatio")).toFixed(2));
  }
}



function OpenUserPoint() {
  var xLine = "";
  xLine += '<div style="text-align: left; padding: 10px; height: 66px;">';
  xLine += '<div style="width:20%;float:left;text-align:center; padding-top:5px;"><img class="chart-profilt" src="'+ sessionStorage.getItem("LinePicture") +'" onerror="javascript:imgError(this)" ></div>';
  xLine += '<div style="width:80%;float:left;">';
  xLine += '<div><b>'+ sessionStorage.getItem("EmpName_Academy") +'</b></div>'
  xLine += '<div>'+ sessionStorage.getItem("xDepartment") +'</div>'
  xLine += '<div>'+ sessionStorage.getItem("xTeamGroup") +'</div>'
  xLine += '</div>';
  xLine += '</div><div class="clr"></div>';
  $("#DisplayUserPoint").html(xLine); 
}


function OpenPopMenu() {
  //console.log("Open");
  var xLine = "";
  xLine += '<div style="height: 50px;">';
  xLine += '<div style="height: 55px;background-color: #0056ff; width:100%; padding-top:10px;border-top-left-radius:15px; border-top-right-radius:15px;">';
  xLine += '<div style="height: 50px; margin:auto; width:100%;">';
  xLine += '<center><div style="color:#fff; font-size:15px;font-weight: 400;padding-top:8px; letter-spacing:2px;">One Retail Society</div></center>';
  xLine += '</div>';
  xLine += '</div><div class="clr" style="height:3px;"></div>';

  xLine += '<div style="text-align: left; padding: 10px; height: 66px;">';
  xLine += '<div style="width:20%;float:left;text-align:center; padding-top:5px;"><img class="chart-profilt" src="'+ sessionStorage.getItem("LinePicture") +'" onerror="javascript:imgError(this)" ></div>';
  xLine += '<div style="width:80%;float:left;">';
  xLine += '<div><b>'+ sessionStorage.getItem("EmpName_Academy") +'</b></div>'
  xLine += '<div>'+ sessionStorage.getItem("xDepartment") +'</div>'
  xLine += '<div>'+ sessionStorage.getItem("xTeamGroup") +'</div>'
  xLine += '</div>';
  xLine += '</div><div class="clr"></div>';

  xLine += '<div style="width:290px; margin:10px auto;">';
  xLine += '<div class="ScoreCard"><div class="font16b">'+ parseFloat(sessionStorage.getItem("Level_Point")).toFixed(0) +'</div>';
  xLine += '<div class="font12">ระดับ<br>ประสบการณ์</div></div>';
  xLine += '<div class="ScoreCard"><div class="font16b">'+ parseFloat(sessionStorage.getItem("XP_Point")).toFixed(2) +'</div>';
  xLine += '<div class="font12">ประสบการณ์<br>การใช้งาน</div></div>';
  xLine += '<div class="ScoreCard"><div class="font16b">'+ parseFloat(sessionStorage.getItem("RP_Point")).toFixed(2) +'</div>';
  xLine += '<div class="font12">เหรียญ<br>แลกรางวัล</div></div>';

  xLine += '<div class="ScoreCard"><div class="font16b">'+ parseFloat(sessionStorage.getItem("QS_Point")).toFixed(2) +'</div>';
  xLine += '<div class="font12">ผลคะแนน<br>ตอบคำถาม</div></div>';
  xLine += '<div class="ScoreCard"><div class="font16b">'+ parseFloat(sessionStorage.getItem("JoinTime")).toFixed(0) +'</div>';
  xLine += '<div class="font12">จำนวนครั้ง<br>ที่เข้าใช้งาน</div></div>';
  xLine += '<div class="ScoreCard"><div class="font16b">'+ parseFloat(sessionStorage.getItem("PulseCount")).toFixed(0) +'</div>';
  xLine += '<div class="font12">จำนวนครั้ง<br>ที่วัดอุณหภูมิ</div></div>';

  xLine += '</div>';

  xLine += '<div class="clr"></div>';
  xLine += '<div style="line-height: 1.3;margin:20px 15px; text-align:left;"><b>One Retail Society</b> เป็นแหล่งรวบรวมข้อมูลสำหรับชาว One Retail Society ทุก ๆ ท่าน สามารถเข้ามาร่วมเป็นส่วนหนึ่งในการสร้างการเรียนรู้ การสื่อสาร และการมีส่วนร่วมของพนักงานในองค์กร ...</div>';
  xLine += '<div style="margin-top:0px;margin-left:12px;">';

  xLine += '<div class="menu-box2" onclick="window.location.href=\'home.html\';">';
  xLine += '<div class="menu-box-img1"><img src="./img/icons-home.png" style="width:35px;"></div>';
  xLine += '<div class="menu-box-text2">Home</div></div>';

  xLine += '<div class="menu-box2" onclick="window.location.href=\'calendar.html\';">';
  xLine += '<div class="menu-box-img1"><img src="./img/icon-calendar.png" style="width:35px;"></div>';
  xLine += '<div class="menu-box-text2">ปฎิทิน<br>การอบรม</div></div>';

  xLine += '<div class="menu-box2" onclick="window.location.href=\'calendar.html\';">';
  xLine += '<div class="menu-box-img1"><img src="./img/icons-product.png" style="width:35px;"></div>';
  xLine += '<div class="menu-box-text2">ผลิตภัณฑ์<br>ธนาคาร</div></div>';

  xLine += '<div class="menu-box2" onclick="window.location.href=\'quizgame.html\';">';
  xLine += '<div class="menu-box-img1"><img src="./img/icons-quiz.png" style="width:35px;"></div>';
  xLine += '<div class="menu-box-text2">การแข่งขัน<br>ตอบคำถาม</div></div>';

  xLine += '<div class="menu-box2" onclick="window.location.href=\'clipvdo.html\';">';
  xLine += '<div class="menu-box-img1"><img src="./img/icons-youtube.png" style="width:35px;"></div>';
  xLine += '<div class="menu-box-text2">UPskill<br>Clip VDO</div></div>';

  xLine += '<div class="menu-box2" onclick="window.location.href=\'successstory.html\';">';
  xLine += '<div class="menu-box-img1"><img src="./img/icons-appreciation.png" style="width:35px;"></div>';
  xLine += '<div class="menu-box-text2">Success Story</div></div>';

  xLine += '<div class="menu-box2" onclick="window.location.href=\'pulseresult.html\';">';
  xLine += '<div class="menu-box-img1"><img src="./img/icons-scale.png" style="width:35px;"></div>';
  xLine += '<div class="menu-box-text2">Pulse<br>Survey</div></div>';

  xLine += '<div class="menu-box2" onclick="window.location.href=\'oneretailclub.html\';">';
  xLine += '<div class="menu-box-img1"><img src="./img/icons-query.png" style="width:35px;"></div>';
  xLine += '<div class="menu-box-text2">Retail CLub</div></div>';

  xLine += '<div class="menu-box2" onclick="window.location.href=\'gamezone.html\';">';
  xLine += '<div class="menu-box-img1"><img src="./img/icons-game.png" style="width:35px;"></div>';
  xLine += '<div class="menu-box-text2">Game Zone</div></div>';

  xLine += '<div class="menu-box2" onclick="window.location.href=\'rewards.html\';">';
  xLine += '<div class="menu-box-img1"><img src="./img/icons-game.png" style="width:35px;"></div>';
  xLine += '<div class="menu-box-text2">Rewards</div></div>';

  if(sessionStorage.getItem("Admin_Web")!=null) {
    xLine += '<div class="menu-box2" onclick="window.location.href=\'adminpage.html\';">';
    xLine += '<div class="menu-box-img1" style="background-color:#dc3545;"><img src="./img/icons-admin.png" style="width:35px;"></div>';
    xLine += '<div class="menu-box-text2">Admin</div></div>';
  }



  xLine += '</div></div>';
  xLine += '<div class="clr" style="height:10px;"></div>';
  xLine += '<center><div class="btn-grey" onclick="CloseMenu()">ปิดหน้าต่างนี้</div></center>';
  xLine += '<div class="clr" style="height:25px;"> </div>';
  $("#MenuSociety").html(xLine); 
  document.getElementById('menu').style.display='block';
}


function MenuFooter() {
  var str = "";
  str += '<div class="footer-top">';
  str += '<div class="row" style="padding: 20px; max-width:450px; margin:auto;">';


  str += '<div style="margin:auto; width:100%;">';

  str += '<div class="menu-box1" onclick="window.location.href=\'home.html\';">';
  str += '<div class="menu-box-img1"><img src="./img/icons-home.png" style="width:35px;"></div>';
  str += '<div class="menu-box-text1">Home</div></div>';

  str += '<div class="menu-box1" onclick="window.location.href=\'calendar.html\';">';
  str += '<div class="menu-box-img1"><img src="./img/icon-calendar.png" style="width:35px;"></div>';
  str += '<div class="menu-box-text1">ปฎิทิน<br>การอบรม</div></div>';

  str += '<div class="menu-box1" onclick="window.location.href=\'calendar.html\';">';
  str += '<div class="menu-box-img1"><img src="./img/icons-product.png" style="width:35px;"></div>';
  str += '<div class="menu-box-text1">ผลิตภัณฑ์<br>ธนาคาร</div></div>';

  str += '<div class="menu-box1" onclick="window.location.href=\'quizgame.html\';">';
  str += '<div class="menu-box-img1"><img src="./img/icons-quiz.png" style="width:35px;"></div>';
  str += '<div class="menu-box-text1">การแข่งขัน<br>ตอบคำถาม</div></div>';

  str += '<div class="menu-box1" onclick="window.location.href=\'clipvdo.html\';">';
  str += '<div class="menu-box-img1"><img src="./img/icons-youtube.png" style="width:35px;"></div>';
  str += '<div class="menu-box-text1">UPskill<br>Clip VDO</div></div>';

  str += '<div class="menu-box1" onclick="window.location.href=\'successstory.html\';">';
  str += '<div class="menu-box-img1"><img src="./img/icons-appreciation.png" style="width:35px;"></div>';
  str += '<div class="menu-box-text1">Success Story</div></div>';

  str += '<div class="menu-box1" onclick="window.location.href=\'pulseresult.html\';">';
  str += '<div class="menu-box-img1"><img src="./img/icons-scale.png" style="width:35px;"></div>';
  str += '<div class="menu-box-text1">Pulse<br>Survey</div></div>';

  str += '<div class="menu-box1" onclick="window.location.href=\'oneretailclub.html\';">';
  str += '<div class="menu-box-img1"><img src="./img/icons-query.png" style="width:35px;"></div>';
  str += '<div class="menu-box-text1">Retail CLub</div></div>';

  str += '<div class="menu-box1" onclick="window.location.href=\'gamezone.html\';">';
  str += '<div class="menu-box-img1"><img src="./img/icons-game.png" style="width:35px;"></div>';
  str += '<div class="menu-box-text1">Game Zone</div></div>';

  str += '<div class="menu-box1" onclick="window.location.href=\'rewards.html\';">';
  str += '<div class="menu-box-img1"><img src="./img/icons-game.png" style="width:35px;"></div>';
  str += '<div class="menu-box-text1">Rewards</div></div>';


  if(sessionStorage.getItem("Admin_Web")!=null) {
    str += '<div class="menu-box1" onclick="window.location.href=\'adminpage.html\';">';
    str += '<div class="menu-box-img1" style="background-color:#dc3545;"><img src="./img/icons-admin.png" style="width:35px;"></div>';
    str += '<div class="menu-box-text1">Admin</div></div>';
  }
  str += '</div></div>';
  str += '<div class="copyright">@One Retail Society</span></div>';
  str += '</div>';
  $("#DisplayFooter").html(str);  
}


function ClickLink(x) {
  if(x==1) {
    location.href = "home.html";
  } else if(x==2) { 
    location.href = "history.html";
  }
}


function numberWithCommas(num) {
  var valueString=num; //can be 1500.0 or 1500.00 
  var amount=parseFloat(valueString).toFixed(2);
  return formattedString= amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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


function CloseMenu() {
  document.getElementById('menu').style.display='none';
}

function GotoSurvey() {
  location.href = "pulsesurvey.html";
}

function GotoHome() {
  location.href = "home.html";
}

function GotoPulse() {
  location.href = "pulseresult.html";
}

function GotoReeards() {
  location.href = "rewards.html";
}

function VDOTime(time) {
  var date = new Date(0);
  date.setSeconds(time); // specify value for SECONDS here
  VDOtimeString = date.toISOString().substring(11, 19);
  return;
  //console.log(VDOtimeString)
}

function toHHMMSS(seconds) {
    var h, m, s, result='';
    // HOURs
    h = Math.floor(seconds/3600);
    seconds -= h*3600;
    if(h){
        result = h<10 ? '0'+h+':' : h+':';
    }
    // MINUTEs
    m = Math.floor(seconds/60);
    seconds -= m*60;
    result += m<10 ? '0'+m+':' : m+':';
    // SECONDs
    s=seconds%60;
    result += s<10 ? '0'+s : s;
    return result;
}