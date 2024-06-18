var xLDP = 1;

$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Academy")==null || sessionStorage.getItem("LineID")==null) { location.href = "index.html"; }
  Connect_DB();
  //console.log(thistoday);
  console.log(sessionStorage.getItem("COIN_Point"));
  LoadLandingPage();
  CheckDatePulse();
  GetLearningGroup();
  //RandomLearning();
  RandomSecret();
  setInterval(LoadLandingPage, 10000);
  //LoadSlider();
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


function LoadLandingPage() {
  var i = 0;
  str = "";
/*
  dbLandingPage.where('LDP_status','==',0)
  .orderBy('LDP_no','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      //str += '<div>'+ doc.data().LDP_header +'</div>';
      str += '<section id="'+ i +'" class="d-flex align-items-center" style="background: url(\''+ doc.data().LDP_img +'\'); background-size: cover; animation: fadeIn 3s;">';
      str += '<div class="container" data-aos="zoom-out" data-aos-delay="100" style="background: rgba(218, 238, 253, 0.9);  padding: 20px; bottom:0; width:95%; border-radius: 10px; position:absolute; bottom:10px; left:10px; right: 10px;">';
      str += '<div class="header1">'+ doc.data().LDP_header +'</div><div style="font-size:14px;">'+ doc.data().LDP_detail +'</div>';
      str += '<div class="d-flex"><a href="#about" class="btn btn-a1 blue">'+ doc.data().LDP_namebtn +'</a>';
      if (doc.data().LDP_vdo != "") {
        str += '<a href="./vdo/mascot.mp4" class="glightbox btn-watch-video"><i class="bi bi-play-circle"></i><span>Watch Video</span></a>';
      }
      str += '</div></div></section>';
      i++;
    });  
    console.log(str);
    console.log(i);
    $("#DisplayLandingPage").html(str);
  });
*/



  if(xLDP==1) {
    str += '<section id="hero" class="d-flex align-items-center" style="background: url(\'./assets/img/mascot.jpg\'); background-size: cover; animation: fadeIn 3s;">';
    str += '<div class="container" data-aos="zoom-out" data-aos-delay="100" style="background: rgba(218, 238, 253, 0.9);  padding: 20px; bottom:0; width:95%; border-radius: 10px; position:absolute; bottom:10px; left:10px; right: 10px;">';
    str += '<h1>ยินดีต้อนรับสู่ <span><img src="./img/logo.png" style="height: 40px;"><span></span></h1>';
    str += '<h2>ร่วมสร้างการมีส่วนร่วม และยกระดับการขายผลิตภัณฑ์และบริการของคุณ พร้อมกับการเรียนรู้ การมีส่วนร่วม และการเติบโตไปด้วยกัน</h2>';
    str += '<div class="d-flex"><a href="#about" class="btn btn-a1 blue">รู้จักกันให้มากขึ้น</a>';
    str += '<a href="./vdo/mascot.mp4" class="glightbox btn-watch-video"><i class="bi bi-play-circle"></i><span>Watch Video</span></a></div></div></section>';
  } else if(xLDP==2) { 
    str += '<section id="hero" class="d-flex align-items-center" style="background: url(\'./assets/img/pulseservey.jpg\'); background-size: cover; animation: fadeIn 3s;">';
    str += '<div class="container" data-aos="zoom-out" data-aos-delay="100" style="background: rgba(218, 238, 253, 0.9);  padding: 20px; bottom:0; width:95%; border-radius: 10px; position:absolute; bottom:10px; left:10px; right: 10px;">';
    str += '<h1>วันนี้คุณทำ Pulse Survey แล้วหรือยัง?</h1>';
    str += '<h2><b>Pulse Survey</b> หรือ แบบสำรวจที่ใช้วัดความสุขของพนักงาน เพื่อวัดดูอุณหภูมิความสุขของพนักงาน และสามารถประเมินความสุขของพนักงานได้</h2>';
    str += '<div class="d-flex"><div class="btn btn-a1 blue" onclick="GotoSurvey()">ทำแบบสำรวจความสุข</div></div></div></section>';
  }
  $("#DisplayLandingPage").html(str);
  if(xLDP==1) { xLDP=2; } 
  else if(xLDP==2) { xLDP=1; } 

}


var GetSecretArr = [];
function RandomSecret() {
  var i = 0;
  var str = "";
  GetSecretArr = [];
  dbVDOTraining.where('VDOmain','==',6)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      GetSecretArr.push({ VDOname: doc.data().VDOname, VDOimg: doc.data().VDOimg, VDOdate: doc.data().VDOdate, VDOpointview: doc.data().VDOpointview, VDOtimer: doc.data().VDOtimer, ID: doc.id });
      //GetSecretArr.push({ ID: doc.id });
    });  
    var NewQuestion = getRandomElement(GetSecretArr);
    //console.log(NewQuestion);
    //console.log(GetSecretArr.length);
    str += '<div class="row">';
    var MaxIndex = 4;
    //for (let i = 0; i < GetSecretArr.length; i++) {
    for (let i = 0; i < MaxIndex; i++) {
      console.log(NewQuestion[i].VDOname);
      str += '<div class="col-lg-3 col-md-6 d-flex align-items-stretch setbox" data-aos="fade-up" data-aos-delay="100" onclick="ViewSubGroup(\''+ NewQuestion[i].ID +'\')">';
      //if(NewQuestion[i].VDOimg =="") {
      //str += '<div class="member"><div class="member-img"><img src="./clip/story.jpg" class="img-fluid" alt=""></div>';
      //} else {
      str += '<div class="member"><div class="member-img" style="position: relative;"><div><img src="'+ NewQuestion[i].VDOimg +'" onerror="javascript:imgErrorStory(this)" class="img-fluid" alt=""></div>';        

      str += '<div class="VDO-Point">'+ NewQuestion[i].VDOpointview +'<img src="./icon/icon-coin.png" style="width:17px; margin-top: -2px; padding-left:1px;"></div>';
      str += '<div class="VDO-timer">'+ toHHMMSS(NewQuestion[i].VDOtimer) +' นาที</div>';
      str += '<div style="position: absolute; bottom:0px; left: 3px;"><i class="icofont-ui-video-play icon-img"></i></div></div>';

      //}
      str += '<div class="member-info"><h4>'+ NewQuestion[i].VDOname +'</h4><span class="txtname">'+ NewQuestion[i].ID +'</span></div></div></div>';
    }
    str += '</div>';
    $("#DisplaySecretSauce").html(str);


    //console.log(GetNewSecretArr[0].VDOname+"\n"+GetNewSecretArr[1].VDOname+"\n"+GetNewSecretArr[2].VDOname+"\n"+GetNewSecretArr[3].VDOname);  
  });
}



var GetLearningArr = [];
function GetLearningGroup() {
  dbVDOTraining.where('VDOmain','==',1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      GetLearningArr.push({ VDOname: doc.data().VDOname, VDOimg: doc.data().VDOimg, VDOdetail: doc.data().VDOdetail, VDOtimer: doc.data().VDOtimer, VDOdate: doc.data().VDOdate, VDOread: doc.data().VDOread, VDOcomment: doc.data().VDOcomment, VDOpointview: doc.data().VDOpointview, ID: doc.id });
    });    
    RandomLearning();
  });
}




function RandomLearning() {
  var i = 0;
  var str = "";
  var NewQuestion = getRandomElement(GetLearningArr);
    console.log(NewQuestion);
  str += '<div class="row">';
  var MaxIndex = 3;
  for (let i = 0; i < MaxIndex; i++) {
      str += '<div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" onclick="ViewGroup(\''+ NewQuestion[i].ID +'\')" data-aos="zoom-in" data-aos-delay="100">';
      str += '<div class="icon-box box-cursor" data-aos="fade-up" data-aos-delay="200" style="padding:0px;">';
      str += '<div style="width:50%;float: left; position: relative;"><div><img src="'+ NewQuestion[i].VDOimg  +'" onerror="javascript:imgErrorLearning(this)" style="width:100%; border-bottom-left-radius: 6px; border-top-left-radius: 6px;"></div>';
      str += '<div class="VDO-Point">'+ NewQuestion[i].VDOpointview +'<img src="./icon/icon-coin.png" style="width:17px; margin-top: -2px; padding-left:1px;"></div>';
      str += '<div class="VDO-timer">'+ toHHMMSS(NewQuestion[i].VDOtimer) +' นาที</div>';
      str += '<div style="position: absolute; bottom:0px; left: 3px;"><i class="icofont-ui-video-play icon-img"></i></div>';
      str += '</div>';
      str += '<div style="width:50%; float: left; padding:5px 10px;text-align:left;"><div class="story-box-text-head">'+  NewQuestion[i].VDOname +'</div>';
      str += '<div class="story-box-text-sub" style="height:46px;text-align:left;">'+ NewQuestion[i].VDOdetail +'</div>';
      str += '<div class="entry-meta"><ul style="padding-left:0px;"><li class="d-flex align-items-center"><i class="icofont-eye-open"></i>'+ NewQuestion[i].VDOread +' View </li>';
      str += '<li class="d-flex align-items-center"> <i class="icofont-comment" style="padding-left:5px;"></i>'+ NewQuestion[i].VDOcomment +' Comment</li></ul></div>';
      str += '</div></div></div>';
  }
  str += '</div>';
  $("#DisplayLearning").html(str);
}
/*


var GetLearningArr = [];
function RandomLearning() {
  var i = 0;
  var str = "";
  GetLearningArr = [];
  dbVDOTraining.where('VDOmain','==',1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      GetLearningArr.push({ VDOname: doc.data().VDOname, VDOimg: doc.data().VDOimg, VDOdate: doc.data().VDOdate, ID: doc.id });
    });  
    var NewQuestion = getRandomElement(GetLearningArr);
    str += '<div class="row">';
    var MaxIndex = 3;
    for (let i = 0; i < MaxIndex; i++) {
      console.log(NewQuestion[i].VDOname);
      str += '<div class="col-lg-3 col-md-6 d-flex align-items-stretch setbox" data-aos="fade-up" data-aos-delay="100" onclick="ViewSubGroup(\''+ NewQuestion[i].ID +'\')">';
      str += '<div class="member"><div class="member-img"><img src="'+ NewQuestion[i].VDOimg +'" class="img-fluid" alt=""></div>';
      str += '<div class="member-info"><h4>'+ NewQuestion[i].VDOname +'</h4><span class="txtname">'+ NewQuestion[i].ID +'</span></div></div></div>';
    }
    str += '</div>';
    $("#DisplayLearning").html(str);
  });
}
*/


function ShowSecretArr(vdo,n) {
  console.log(vdo+"==="+n);
}

function ViewSubGroup(gid) {
  //alert(gid);
  location.href = "displayclip.html?gid="+gid;
}



