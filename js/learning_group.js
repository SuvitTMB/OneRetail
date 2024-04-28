var MainGroupID = 0;

$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Academy")==null || sessionStorage.getItem("LineID")==null) { location.href = "index.html"; }
  MainGroupID = getParameterByName('gid');
    //alert(MainGroupID);
  Connect_DB();
  LoadGroupVDO(MainGroupID);
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


function LoadGroupVDO(MainGroupID) {
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
  var str = "";
  dbVDOGroup.where('VDOgroup','==',parseFloat(MainGroupID))
  .orderBy('VDOrank','desc')
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      str += '<div class="story-box" onclick="ViewGroup(\''+ MainGroupID +'\',\''+ doc.id +'\')" data-aos="zoom-in" data-aos-delay="100">';
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

function ViewGroup(gid, ref) {
  console.log(gif+"==="+erf);
}