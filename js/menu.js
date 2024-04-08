MenuFooter();


function MyPointMenu() {
  //console.log("Menu");
  var xLine = "";

  var xValue1 = ((parseFloat(sessionStorage.getItem("Level_Point")).toFixed(0)/5)*100);
  var xValue2 = 0;
  var xValue3 = 0;
  /*
  //var xValue1 = parseFloat(sessionStorage.getItem("PulseRatio")).toFixed(2);
  var xRatio10 = "10";
  */
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
    xLine += '<div class="txt-white"><b>'+ sessionStorage.getItem("xTeamGroup") +'</b>';
    if(sessionStorage.getItem("xBranch")!="") {
      xLine += '<br>'+ sessionStorage.getItem("xBranch") +'';
      xLine += '<br>'+ sessionStorage.getItem("xDepartment")+'';
    } else {
      xLine += '<br>'+ sessionStorage.getItem("xDepartment") +'';
    }
    xLine += '<br>'+ sessionStorage.getItem("xGroup") +'';
    xLine += '<br>'+ sessionStorage.getItem("xChief_th") +' ('+ sessionStorage.getItem("xChief_eng") +')';
    xLine += '<div class="half-arc" style="--percentage:'+ parseFloat(sessionStorage.getItem("PulseRatio")).toFixed(2) +'%;"><span class="label" style="color:#ffffff; padding-top:30px;">'+ parseFloat(sessionStorage.getItem("PulseRatio")).toFixed(2) +'%</span></div>';
    xLine += '<div class="txt-white">ภาพรวมอุณหภูมิความสุขในการทำงานของคุณ</div>';
    xLine += '<div class="clr" style="height:20px"></div>';



    xLine += '<div class="row-header">อุณหภูมิรวม<br>ของตัวคุณ</div>';
    xLine += '<div class="row-progress"><progress value="'+ parseFloat(sessionStorage.getItem("PulseRatio")).toFixed(0) +'" max="'+ xRatio +'" style="--value: '+ parseFloat(sessionStorage.getItem("PulseRatio")).toFixed(0) +'; --max: '+ xRatio +';"></progress></div>';
    xLine += '<div class="row-header">ระดับของ<br>ผู้ใช้งาน</div>';
    xLine += '<div class="row-progress"><progress value="'+ xValue1 +'" max="'+ xRatio +'" style="--value: '+ xValue1 +'; --max: '+ xRatio +';"></progress></div>';
    xLine += '<div class="row-header">เหรียญแลก<br>ของรางวัล</div>';
    xLine += '<div class="row-progress"><progress value="'+ xValue2 +'" max="'+ xRatio +'" style="--value: '+ xValue2 +'; --max: '+ xRatio +';"></progress></div>';

    //xLine += '<div class="row-header">เหรียญ<br>แลกรางวัล</div>';
    //xLine += '<div class="row-progress"><progress value="78" max="'+ xRatio +'" style="--value: 78; --max: '+ xRatio +';"></progress></div>';
    xLine += '</div>';
    if(sessionStorage.getItem("CheckDonePulse")==0) {
      //xLine += '<div class="btn-grey" onclick="PulseDetail()" style="margin-top:20px;margin-right:5px;">เกี่ยวกับวัดอุณหภูมิ</div>';
      xLine += '<div class="btn-click" onclick="GotoSurvey()" style="margin-top:25px;">ไปวัดอุณหภูมิความสุขของคุณ</div>';
    } else {
      xLine += '<div class="btn-blue" onclick="GotoHome()" style="margin-top:25px;">ไปหน้าแรกของระบบงาน</div>';
    }    
    xLine += '</div><div class="clr" style="height:30px;"></div>'
    $("#DisplayMyPoint").html(xLine); 
    document.getElementById('loading').style.display='none';
  }
}




function OpenPopMenu() {
  var xLine = "";
  xLine += '<div style="height: 50px;">';
  xLine += '<div style="height: 55px;background-color: #0056ff; width:100%; padding-top:10px;border-top-left-radius:15px; border-top-right-radius:15px;">';
  xLine += '<div style="height: 50px; margin:auto; width:100%;">';
  xLine += '<center><div style="color:#fff; font-size:15px;font-weight: 400;padding-top:8px; letter-spacing:2px;">One Retail</div></center>';
  xLine += '</div>';
  xLine += '</div><div class="clr" style="height:3px;"></div>';
  xLine += '<div class="clr"></div>';
  xLine += '<div style="line-height: 1.3;margin:20px 15px; text-align:left;"><b>LINE Retail Society</b> ชวนคุณมาหาความลับในวันฮาโลวีนกัน ซึ่งในปีนี้ตรงกับวันอังคารที่ 31 ตุลาคม2566 และยังชวนคุณร่วมกิจกรรมสุ่มลุ้นโชคในเทศกาลวันฮาโลวีน ...</div>';
  xLine += '<div style="max-width:280px; margin:10px auto 10px 25px; width:100%;">';
  xLine += '<div class="clr" style="height: 15px;"></div>';
  xLine += '<div class="icon-left"><img src="./img/icon-mooncake.png" style="width:50px;"></div>';
  xLine += '<div class="icon-right" onclick="ClickLink(1)">สุ่มรับโชคจาก กิจกรรมวันฮาโลวีน<div class="icon-text" style="line-height:1.2;">คุณมี 1 ฉลากสำหรับการร่วมลุ้นรางวัลจากกิจกรรมของเรา</div></div>';
  xLine += '<div class="icon-left"><img src="./img/icon-moon.png" style="width:50px;"></div>';
  xLine += '<div class="icon-right" onclick="ClickLink(2)">ประวัติวันฮาโลวีน<div class="icon-text" style="line-height:1.2;">มาอ่านประวัติตำนานตะเกียงฟักทองว่ามีความเป็นมาอย่างไร</div></div>';
  xLine += '<div class="clr"></div>';
  xLine += '</div>';
  xLine += '<div style="margin-top:0px;margin-left:35px;">';
  xLine += '<div class="menu-box1" onclick="window.location.href=\'home.html\';">';
  xLine += '<div class="menu-box-img1"><img src="./img/icons-home.png" style="width:32px;"></div>';
  xLine += '<div class="menu-box-text1" style="color:#000000;">หน้าแรก</div></div>';
  xLine += '<div class="menu-box1" onclick="window.location.href=\'clipvdo.html\';">';
  xLine += '<div class="menu-box-img1"><img src="./img/icons-history.png" style="width:32px;"></div>';
  xLine += '<div class="menu-box-text1" style="color:#000000;">คลิป VDO</div></div>';
  xLine += '<div class="menu-box1" onclick="window.location.href=\'pulseresult.html\';">';
  xLine += '<div class="menu-box-img1"><img src="./img/icons-gift.png" style="width:32px;"></div>';
  xLine += '<div class="menu-box-text1" style="color:#000000;">วัดอุณหภูมิ</div></div>';
  xLine += '<div class="menu-box1" onclick="window.location.href=\'successstory.html\';">';
  xLine += '<div class="menu-box-img1"><img src="./img/icons-friend.png" style="width:32px;"></div>';
  xLine += '<div class="menu-box-text1" style="color:#000000;">Success Story</div></div>';
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
  str += '<div class="row" style="padding: 20px; max-width:450px; margin-right:0px; margin-left: 0px;">';


  str += '<div style="margin:auto; width:100%;">';

  str += '<div class="menu-box1" onclick="window.location.href=\'home.html\';">';
  str += '<div class="menu-box-img1"><img src="./img/icons-home.png" style="width:35px;"></div>';
  str += '<div class="menu-box-text1">Home</div></div>';

  str += '<div class="menu-box1" onclick="window.location.href=\'calendar.html\';">';
  str += '<div class="menu-box-img1"><img src="./img/icons-youtube.png" style="width:35px;"></div>';
  str += '<div class="menu-box-text1">ปฎิทิน<br>การอบรม</div></div>';

  str += '<div class="menu-box1" onclick="window.location.href=\'calendar.html\';">';
  str += '<div class="menu-box-img1"><img src="./img/icons-youtube.png" style="width:35px;"></div>';
  str += '<div class="menu-box-text1">ผลิตภัณฑ์<br>ธนาคาร</div></div>';

  str += '<div class="menu-box1" onclick="window.location.href=\'calendar.html\';">';
  str += '<div class="menu-box-img1"><img src="./img/icons-youtube.png" style="width:35px;"></div>';
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


/*
*/


  str += '</div></div>';
  str += '<div class="copyright">@One Retail Society</span></div>';
  str += '</div>';
  //str += '<div class="container d-md-flex py-4"><div class="mr-md-auto text-center text-md-left">';
  //str += '<div class="copyright">@<span>LINE Retail Society</span></div></div></div>';
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
