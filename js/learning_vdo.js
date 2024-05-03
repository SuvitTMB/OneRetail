var MainGroupID = 0;
var ReadMemberArr = [];
var ReadVdoArr = [];

$(document).ready(function () {
  if(sessionStorage.getItem("LineID")==null || sessionStorage.getItem("LineID")==null) { location.href = "vdo.html"; }
  //MainGroupID = getParameterByName('gid');
  Connect_DB();
  GetAllVDO();
  LoadGroupVDO(MainGroupID);
});


function getParameterByName(name, url) {
  str = '';
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function GetAllVDO() {
  var i = 0;
  var str = "";
  ReadMemberArr = [];
  ReadVdoArr = [];
  dbVDOTraining.where('VDOmain','==',1)
  .where('VDOstatus','==',0)
  .orderBy('VDOrank','desc')
  .limit(3)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      ReadMemberArr.push(i);
      ReadVdoArr.push({ VDOname: doc.data().VDOname, VDOimg: doc.data().VDOimg, VDOShow: doc.data().VDOShow, Q: i, ID: doc.id });
      i++;
    });   
    //console.log(ReadVdoArr);
    LoadSlider(); 
  });
}


function LoadGroupVDO(MainGroupID) {
  var str = "";
  dbVDOGroup
  //.where('VDOgroup','==',parseFloat(MainGroupID))
  .orderBy('VDOrank','desc')
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      str += '<div class="story-box" onclick="ViewGroup(\''+ MainGroupID +'\',\''+ doc.data().VDOgroup +'\')" data-aos="zoom-in" data-aos-delay="100">';
      if(doc.data().VDOimg=="") {
        str += '<div class="learning-box-img"><div><img src="clipvdo.jpg" class="learning-box-box-img-in"></div></div>';
      } else {
        str += '<div class="learning-box-img"><div><img src="'+ doc.data().VDOimg +'" class="learning-box-box-img-in"></div></div>';
      }
      str += '<div class="learning-box-text"><div style="height: 50px;">';
      str += '<div class="story-box-text-head">'+ doc.data().VDOname +'</div><div class="story-box-text-sub">'+ doc.data().VDOdetail +'</div></div>';
      str += '<div class="entry-meta"><ul><li class="d-flex align-items-center"><i class="icofont-alarm"></i>'+ doc.data().VDOitem +' Clip</li></ul>';
      str += '</div></div></div>';
    });
    //document.getElementById('loading').style.display='none';
    $("#DisplayGroup").html(str);
  });
}


function LoadSlider() {
  var ii = 1;
  var xResults = "";
  var str = "";
  str += '<div id="homepage-slider" class="st-slider" style="max-width: 450px;">';
  str += '<input type="radio" class="cs_anchor radio" name="slider" id="slide1"/>';
  str += '<input type="radio" class="cs_anchor radio" name="slider" id="slide2"/>';
  str += '<input type="radio" class="cs_anchor radio" name="slider" id="slide3"/>';
  str += '<input type="radio" class="cs_anchor radio" name="slider" id="play1" checked=""/>';

  str += '<div class="images"><div class="images-inner">';
  str += '<div class="image-slide" onclick="ViewClip(\''+ ReadVdoArr[0].ID +'\')">';
  if(ReadVdoArr[0].VDOimg !== '') {
    str += '<div class="image bg-yellow"><img src="'+ ReadVdoArr[0].VDOimg +'" style="width:100%;"></div></div>';
  } else {
    str += '<div class="image bg-blue"><img src="./clip/SecretSauce-00.jpg" style="width:100%;"></div></div>';
  }
  str += '<div class="image-slide" onclick="ViewClip(\''+ ReadVdoArr[1].ID +'\')">';
  if(ReadVdoArr[1].VDOimg!=="") {
    str += '<div class="image bg-blue"><img src="'+ ReadVdoArr[1].VDOimg +'" style="width:100%;"></div></div>';
  } else {
    str += '<div class="image bg-blue"><img src="./clip/SecretSauce-00.jpg" style="width:100%;"></div></div>';
  }
  str += '<div class="image-slide" onclick="ViewClip(\''+ ReadVdoArr[2].ID +'\')">';
  if(ReadVdoArr[2].VDOimg!=="") {
    str += '<div class="image bg-red"><img src="'+ ReadVdoArr[2].VDOimg +'" style="width:100%;"></div></div>';
  } else {
    str += '<div class="image bg-blue"><img src="./clip/SecretSauce-00.jpg" style="width:100%;"></div></div>';
  }
  str += '</div></div>';

  str += '<div class="labels" style="margin-top:5px;">';
  //str += '<label for="slide1" class="label">'+ ReadVdoArr[0].VDOname +'</label>';
  //str += '<label for="slide2" class="label">'+ ReadVdoArr[1].VDOname +'</label>';
  //str += '<label for="slide3" class="label">'+ ReadVdoArr[2].VDOname +'</label>';
  str += '<label for="slide1" class="label" style="color:#0056ff;">'+ ReadVdoArr[0].VDOname +'</label>';
  str += '<label for="slide2" class="label" style="color:#0056ff;">'+ ReadVdoArr[1].VDOname +'</label>';
  str += '<label for="slide3" class="label" style="color:#0056ff;">'+ ReadVdoArr[2].VDOname +'</label>';

  str += '<div class="fake-radio" style="text-align:right;">';
  str += '<label for="slide1" class="radio-btn"></label>';
  str += '<label for="slide2" class="radio-btn"></label>';
  str += '<label for="slide3" class="radio-btn"></label>';
  str += '</div></div></div>';
  $("#DisplaySlider").html(str);
}
/*
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
*/

function ViewGroup(gid, ref) {
  console.log(gid);
  if(ref==1) {
    location.href = "learning_all.html?gid="+gid+"&sid="+ref;
  } else {
    location.href = "SecretSauce.html";
  }
}

function ViewClip(gid) {
  location.href = "showclip.html?gid="+gid;
}


