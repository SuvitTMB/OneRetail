var MainGroupID = 0;

$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Academy")==null || sessionStorage.getItem("LineID")==null) { location.href = "index.html"; }
  //MainGroupID = getParameterByName('gid');
    //alert(MainGroupID);
  Connect_DB();
  ClickGroup(0);

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


function ClickGroup(x) { 
  MainGroupID = x;
  //console.log(x);
  //$("#DisplayGroup").html('');
  document.getElementById("loading").style.display = "block";
  $("#DisplayGroup").html("");
  //document.getElementById("slider").style.display = "none";
  if(parseFloat(x)==0) {
    $('#M1').addClass("box-user-select");
    $('#M2').removeClass('box-user-select');
    $('#M3').removeClass('box-user-select');
    LoadAllStory();
  } else if(parseFloat(x)==1) {
    $('#M1').removeClass('box-user-select');
    $('#M2').addClass("box-user-select");
    $('#M3').removeClass('box-user-select');
    LoadGroupStory();
  } else if(parseFloat(x)==2) {
    $('#M1').removeClass('box-user-select');
    $('#M2').removeClass('box-user-select');
    $('#M3').addClass("box-user-select");
    LoadGroupTikTok();
  }
}


function LoadAllStory() {
  //console.log("Nenu-1=="+MainGroupID);
  MainGroupID = 6;
  var str = "";
  dbVDOTraining.where('VDOmain','==',MainGroupID)
  .where('VDOstatus','==',0)
  .orderBy('VDOtimestamp','desc')
  .limit(30)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      str += '<div class="col col-md-6 col-lg-3 d-flex align-items-stretch padding-down" style="float: left; margin:3px; width: 48%;" onclick="ViewSubGroup(\''+ doc.id +'\')">';
      str += '<div class="icon-box box-cursor" data-aos="fade-up" data-aos-delay="100" style="padding:0px;">';
      str += '<div style="position: relative;"><div><img src="'+ doc.data().VDOimg +'" style="width:100%;" onerror="javascript:imgErrorStory(this)"></div>';
      str += '<div class="VDO-Point">'+ doc.data().VDOpointview +'<img src="./icon/icon-coin.png" style="width:17px; margin-top: -2px; padding-left:1px;"></div>';
      str += '<div class="VDO-timer">'+ toHHMMSS(doc.data().VDOtimer) +' นาที</div>';
      str += '<div style="position: absolute; bottom:0px; left: 3px;"><i class="icofont-ui-video-play icon-img"></i></div>';
      //str += '<div style="margin: -36px 3px 0px 7px;"><i class="icofont-ui-video-play icon-img"></i></div>';
      str += '</div>';
      str += '<div style="width:100%; padding:12px 10px 0px 10px;"><div class="story-box-text-head">'+ doc.data().VDOname +'</div>';
      str += '<div class="story-box-text-sub" style="padding-top:3px;">'+ doc.data().VDOdetail +'</div></div>';
      str += '<div class="entry-meta" style="margin:0px auto 5px auto;"><ul style="padding-left:5px;">';
      //str += '<li class="d-flex align-items-center padding-r"><i class="icofont-ui-calendar"></i>'+ doc.data().VDOdate +'</li>';
      str += '<li class="d-flex align-items-center padding-r"><i class="icofont-eye-open"></i>'+ parseFloat(doc.data().VDOread) +' View</li>';
      //str += '<li class="d-flex align-items-center padding-r"><i class="icofont-like"></i>'+ parseFloat(doc.data().VDOlike) +' Like</li>';
      str += '<li class="d-flex align-items-center padding-r"><i class="icofont-speech-comments"></i>'+ parseFloat(doc.data().VDOcomment) +' Comment</li>';
      str += '</ul></div>';
      //str += '<a href="./vdo/mascot.mp4" class="glightbox btn-watch-video"><i class="bi bi-play-circle"></i><span>Watch Video</span></a>';
      str += '</div></div>';
    });
    $("#DisplayGroup").html(str);
    document.getElementById("loading").style.display = "none";
  });
}



function LoadGroupStory() {
  var str = "";
  dbVDOGroup.where('VDOmain','==',6)
  .orderBy('VDOrank','desc')
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      str += '<div class="checkbox-clip" style="background-image: url('+ doc.data().VDOimg +');" onclick="ViewGroup(\''+ doc.data().VDOmain +'\',\''+ doc.data().VDOgroup +'\')">';
      str += '<div class="text-pic"><div style="height:32px;">'+ doc.data().VDOname +'</div>';
      str += '<div class="entry-meta"><ul><li class="d-flex align-items-center"><i class="icofont-ui-video-play" style="color:#000;"></i>'+ doc.data().VDOitem +' วิดีโอคลิป</li></ul></div></div>';
      str += '</div>';
    });
    //str += '</div>';
    $("#DisplayGroup").html(str);
    document.getElementById("loading").style.display = "none";
    //document.getElementById("slider").style.display = "block";
  });
}




function LoadGroupTikTok() {
  MainGroupID = 6;
  var str = "";
  dbVDOTraining.where('VDOmain','==',MainGroupID)
  .where('VDOstatus','==',0)
  .orderBy('VDOtimestamp','desc')
  .limit(30)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      str += '<div class="col col-md-6 col-lg-3 d-flex align-items-stretch padding-down" style="float: left; margin:3px; width: 48%;" onclick="ViewSubGroup(\''+ doc.id +'\')">';
      str += '<div class="icon-box box-cursor" data-aos="fade-up" data-aos-delay="100" style="padding:0px;">';
      str += '<div><img src="'+ doc.data().VDOimg +'" style="width:100%;" onerror="javascript:imgErrorStory(this)">';
      //str += '<div class="VDO-Point">'+ doc.data().VDOpointview +' POINT</div>';
      str += '<div class="VDO-timer">'+ toHHMMSS(doc.data().VDOtimer) +' นาที</div>';
      str += '<div style="margin: -40px 3px 0px 7px;"><i class="icofont-ui-video-play icon-img"></i></div>';
      str += '</div>';
      str += '<div style="width:100%; padding:12px 10px 0px 10px;"><div class="story-box-text-head">'+ doc.data().VDOname +'</div>';
      str += '<div class="story-box-text-sub" style="padding-top:3px;">'+ doc.data().VDOdetail +'</div></div>';
      str += '<div class="entry-meta" style="margin:0px auto 5px auto;"><ul style="padding-left:5px;">';
      //str += '<li class="d-flex align-items-center padding-r"><i class="icofont-ui-calendar"></i>'+ doc.data().VDOdate +'</li>';
      str += '<li class="d-flex align-items-center padding-r"><i class="icofont-eye-open"></i>'+ parseFloat(doc.data().VDOread) +' View</li>';
      //str += '<li class="d-flex align-items-center padding-r"><i class="icofont-like"></i>'+ parseFloat(doc.data().VDOlike) +' Like</li>';
      str += '<li class="d-flex align-items-center padding-r"><i class="icofont-speech-comments"></i>'+ parseFloat(doc.data().VDOcomment) +' Comment</li>';
      str += '</ul></div>';
      //str += '<a href="./vdo/mascot.mp4" class="glightbox btn-watch-video"><i class="bi bi-play-circle"></i><span>Watch Video</span></a>';
      str += '</div></div>';
    });
    $("#DisplayGroup").html(str);
    document.getElementById("loading").style.display = "none";
  });


}



function ViewGroup(gid, ref) {
  location.href = "success_sub.html?gid="+gid+"&sid="+ref;
  //console.log(gif+"==="+erf);
}


function ViewSubGroup(gid) {
  location.href = "displayclip.html?gid="+gid;
  //console.log(gid);
}

