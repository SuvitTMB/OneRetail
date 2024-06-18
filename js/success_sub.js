var MainGroupID = 6;
var SubGroupID = 0;
//$("#DisplayGroup").html(str);


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Academy")==null || sessionStorage.getItem("LineID")==null) { location.href = "index.html"; }
  MainGroupID = getParameterByName('gid');
  SubGroupID = getParameterByName('sid');
  //console.log(MainGroupID+"==="+SubGroupID);
  Connect_DB();
  GetMainGroup();
  GetAllRead();
  LoadGroupVDO();
  RandomVDO();
  //document.getElementByID("M1").remove("active");
  //alert(MainGroupID);
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


function GetAllRead() {
  var i = 0;
  var str = "";
  ReadMemberArr = [];
  ReadUserArr = [];
  dbCheckAllRead.where('LineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      ReadUserArr.push({ RefID: doc.data().RefID, ReadDate: doc.data().ReadDate, ID: doc.id });
    });    
  });
}



function GetMainGroup() {
  var str = "";
  dbVDOGroup.where('VDOmain','==',parseFloat(MainGroupID))
  .where('VDOgroup','==',parseFloat(SubGroupID))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<div class="story-box-text-head"><font color="#000">หมวด :</font> '+ doc.data().VDOname +'</div>';
      str += '<div class="story-box-text-sub" style="height: auto;margin-top:6px;">'+ doc.data().VDOdetail +'</div>';
      str += '<div class="entry-meta" style="margin-top:6px;"><ul style="padding-left:0px;">';
      str += '<li class="d-flex align-items-center"><i class="icofont-ui-video-play"></i>'+ parseFloat(doc.data().VDOitem) +' Clip</li>';
      str += '</ul></div>';
    });
    $("#DisplayMainGroup").html(str);
  });
}


function LoadGroupVDO() {
  var i = 1;
  var str = "";
  str += '<div class="row">';
  dbVDOTraining.where('VDOmain','==',parseFloat(MainGroupID))
  .where('VDOgroup','==',parseFloat(SubGroupID))
  .where('VDOstatus','==',0)
  .orderBy('VDOrank','desc')
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      const results = ReadUserArr.filter(obj => {return obj.RefID === doc.id;});
      //console.log(i+"xxx="+results[0]+"==="+doc.data().RefID);
      str += '<div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0" onclick="ViewGroup(\''+ doc.id +'\')" data-aos="zoom-in" data-aos-delay="100">';
      str += '<div class="icon-box box-cursor" data-aos="fade-up" data-aos-delay="200" style="padding:0px;">';
      //if(doc.data().VDOimg=="") {
      //  str += '<div style="width:35%;float: left;"><div><img src="./imgclip/clipvdo.jpg" style="width:100%;"></div><div class="VDO-timer">'+ toHHMMSS(doc.data().VDOtimer) +' นาที</div></div>';
      //} else {
      str += '<div style="width:35%;float: left; position: relative;"><div><img src="'+ doc.data().VDOimg +'" style="width:100%;" onerror="javascript:imgErrorStory(this)"></div>';
      str += '<div class="VDO-Pointvdo">'+ doc.data().VDOpointview +'<img src="./icon/icon-coin.png" style="width:17px;margin-top: -2px; padding-left:1px;"></div>';
      str += '<div class="VDO-timer">'+ toHHMMSS(doc.data().VDOtimer) +' นาที</div></div>';
      //}
      if(results[0]!=undefined) { 
        xResults = results[0].RefID;
        //console.log("one==="+xResults);
        str += '<div style="width:65%; float: left; padding:7px 10px;"><div class="story-box-text-head">'+ doc.data().VDOname +'</div>';
      } else {
        //console.log("two");
        str += '<div class="grayscale" style="width:65%; float: left; padding:7px 10px;"><div class="story-box-text-head">'+ doc.data().VDOname +'</div>';
      }
      str += '<div class="story-box-text-sub" style="height:65px; padding-top: 5px;">'+ doc.data().VDOdetail +'</div>';
      str += '<div class="entry-meta"><ul style="padding-left:0px;"><li class="d-flex align-items-center"><i class="icofont-eye-open"></i>'+ doc.data().VDOread +' View </li>';
      str += '<li class="d-flex align-items-center"> <i class="icofont-comment" style="padding-left:5px;"></i>'+ doc.data().VDOcomment +' Comment</li></ul></div>';
      str += '</div></div></div>';
      i++;
    });
    str += '</div>';
    $("#DisplayGroup").html(str);
    document.getElementById("loading").style.display = "none";
    document.getElementById("LoadingContent").style.display = "block";
  });
}


var randomIndex = "";
var RandomVDOArray = [];
function RandomVDO() {
  var str = "";
  dbVDOTraining.where('VDOmain','==',parseFloat(MainGroupID))
  .where('VDOgroup','==',parseFloat(SubGroupID))
  .where('VDOstatus','==',0)
  .orderBy('VDOrank','desc')
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      //RandomVDOArray.push({ VDOurl: doc.data().VDOurl, ID: doc.id });
      if(doc.data().VDOurl!="") {
        RandomVDOArray.push(doc.data().VDOurl);
      }
    });
    randomIndex = random_item(RandomVDOArray);
    //console.log(randomIndex);
    str += '<iframe id="player" type="text/html" width="100%" height="220px" ';
    str += 'src="http://www.youtube.com/embed/jWEoTy4R5l0?enablejsapi=1&origin=http://example.com" frameborder="0"></iframe>';
    //str += '<iframe width="100%" height="220px" src="'+ randomIndex +'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    $("#DisplayVDO").html(str);
  });
}


function ViewGroup(gid) {
  location.href = "displayclip.html?gid="+gid;
  //console.log(gid);
}



