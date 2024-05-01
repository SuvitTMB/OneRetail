var MainGroupID = 0;
var SubGroupID = 0;
//$("#DisplayGroup").html(str);


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Academy")==null || sessionStorage.getItem("LineID")==null) { location.href = "index.html"; }
  MainGroupID = getParameterByName('gid');
  SubGroupID = getParameterByName('sid');
  console.log(MainGroupID+"==="+SubGroupID);
  Connect_DB();
  GetMainGroup();
    //alert(MainGroupID);
  LoadGroupVDO();
  //document.getElementByID("M1").remove("active");
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


function GetMainGroup() {
  var str = "";
  dbVDOGroup.where('VDOmain','==',parseFloat(MainGroupID))
  .where('VDOgroup','==',parseFloat(SubGroupID))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<div class="story-box-text-head">'+ doc.data().VDOname +'</div>';
      str += '<div class="story-box-text-sub" style="height: auto;margin-top:6px;">'+ doc.data().VDOdetail +'</div>';
      str += '<div class="entry-meta" style="margin-top:6px;"><ul>';
      str += '<li class="d-flex align-items-center"><i class="icofont-alarm"></i>'+ parseFloat(doc.data().VDOitem) +' Clip</li>';
      //str += '<li class="d-flex align-items-center"><i class="icofont-like"></i>'+ parseFloat(doc.data().VVDOclick) +' Read</li>';
      str += '</ul></div>';
    });
    $("#DisplayMainGroup").html(str);
  });
}


function LoadGroupVDO() {
/*
  if(parseFloat(MainGroupID)==1) {
    $('#M1').addClass("active");
    $('#M2').removeClass();
    $('#M3').removeClass();
    $('#M4').removeClass();
  } else if(parseFloat(MainGroupID)==4) {
    $('#M1').removeClass();
    $('#M2').addClass("active");
    $('#M3').removeClass();
    $('#M4').removeClass();
  } else if(parseFloat(MainGroupID)==3) {
    $('#M1').removeClass();
    $('#M2').removeClass();
    $('#M3').addClass("active");
    $('#M4').removeClass();
  } else if(parseFloat(MainGroupID)==2) {
    $('#M1').removeClass();
    $('#M2').removeClass();
    $('#M3').removeClass();
    $('#M4').addClass("active");
  }
  */
  var str = "";
  dbVDOTraining.where('VDOmain','==',parseFloat(MainGroupID))
  .where('VDOgroup','==',parseFloat(SubGroupID))
  .orderBy('VDOrank','desc')
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      str += '<div class="story-box" onclick="ViewGroup(\''+ doc.id +'\')" data-aos="zoom-in" data-aos-delay="100">';
      if(doc.data().VDOimg=="") {
        str += '<div class="learning-box-img"><div><img src="clipvdo.jpg" class="learning-box-box-img-in"></div>';
        str += '<div>เวลา 02:40 นาที</div></div>';
      } else {
        str += '<div class="learning-box-img"><div><img src="'+ doc.data().VDOimg +'" class="learning-box-box-img-in"></div>';
        str += '<div class="VDO-timer">'+ toHHMMSS(doc.data().VDOtimer) +' นาที</div></div>';
      }
      str += '<div class="learning-box-text"><div style="height: 50px;">';
      str += '<div class="story-box-text-head">'+ doc.data().VDOname +'</div><div class="story-box-text-sub">'+ doc.data().VDOdetail +'</div></div>';
      str += '<div class="entry-meta" style="padding-top:3px;"><ul><li class="d-flex align-items-center"><i class="icofont-alarm"></i>'+ doc.data().VDOread +' Read</li>';
      str += '<li class="d-flex align-items-center"><i class="icofont-comment"></i>'+ doc.data().VDOcomment +' Comment</li></ul>';
      str += '</div></div></div>';
    });
    //document.getElementById('loading').style.display='none';
    $("#DisplayGroup").html(str);
  });
}

function ViewGroup(gid) {
  location.href = "displayclip.html?gid="+gid;
  //console.log(gid);
}