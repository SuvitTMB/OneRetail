var MainGroupID = 6;
var ReadMemberArr = [];
var ReadVdoArr = [];


$(document).ready(function () {
  if(sessionStorage.getItem("LineID")==null || sessionStorage.getItem("LineID")==null) { location.href = "vdo.html"; }
  Connect_DB();
  GetAllVDO();
  GetAllRead();
  LoadGroupVDO();
});


function GetAllVDO() {
  var i = 0;
  var str = "";
  ReadMemberArr = [];
  ReadVdoArr = [];
  dbVDOTraining.where('VDOmain','==',parseFloat(MainGroupID))
  .where('VDOstatus','==',0)
  .orderBy('VDOrank','desc')
  .limit(3)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      ReadMemberArr.push(i);
      ReadVdoArr.push({ VDOname: doc.data().VDOname, VDOimg: doc.data().VDOimg, VDOShow: doc.data().VDOShow, Q: i, ID: doc.id });
      i++;
    });   
    console.log(ReadVdoArr);
    LoadSlider(); 
  });
}


function GetAllRead() {
  var i = 0;
  var str = "";
  ReadMemberArr = [];
  ReadUserArr = [];
  dbCheckAllRead.where('LineID','==',sessionStorage.getItem("LineID"))
  //.where('RefID','==',EidVDOID)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      ReadUserArr.push({ RefID: doc.data().RefID, ReadDate: doc.data().ReadDate, ID: doc.id });
    });    
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
  str += '<div class="image-slide" onclick="ViewStory(\''+ ReadVdoArr[0].ID +'\')">';
  if(ReadVdoArr[0].VDOimg !== '') {
    str += '<div class="image bg-yellow"><img src="'+ ReadVdoArr[0].VDOimg +'" style="width:100%;"></div></div>';
  } else {
    str += '<div class="image bg-blue"><img src="./clip/SecretSauce-00.jpg" style="width:100%;"></div></div>';
  }
  str += '<div class="image-slide" onclick="ViewStory(\''+ ReadVdoArr[1].ID +'\')">';
  if(ReadVdoArr[1].VDOimg!=="") {
    str += '<div class="image bg-blue"><img src="'+ ReadVdoArr[1].VDOimg +'" style="width:100%;"></div></div>';
  } else {
    str += '<div class="image bg-blue"><img src="./clip/SecretSauce-00.jpg" style="width:100%;"></div></div>';
  }
  str += '<div class="image-slide" onclick="ViewStory(\''+ ReadVdoArr[2].ID +'\')">';
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
  str += '<label for="slide1" class="label">'+ ReadVdoArr[0].VDOname +'</label>';
  str += '<label for="slide2" class="label">'+ ReadVdoArr[1].VDOname +'</label>';
  str += '<label for="slide3" class="label">'+ ReadVdoArr[2].VDOname +'</label>';

  str += '<div class="fake-radio" style="text-align:right;">';
  str += '<label for="slide1" class="radio-btn"></label>';
  str += '<label for="slide2" class="radio-btn"></label>';
  str += '<label for="slide3" class="radio-btn"></label>';
  str += '</div></div></div>';
  $("#DisplaySlider").html(str);
}


function LoadGroupVDO() {
  var str = "";
  dbVDOTraining.where('VDOmain','==',parseFloat(MainGroupID))
  .where('VDOstatus','==',0)
  .orderBy('VDOrank','desc')
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      const results = ReadUserArr.filter(obj => {return obj.RefID === doc.id;});
      if(results[0]!=undefined) { 
        xResults = results[0].RefID;
        //console.log(xResults);
        str += '<div class="story-box" onclick="ViewStory(\''+ doc.id +'\')" data-aos="zoom-in" data-aos-delay="100">';
      } else {
        //console.log("---");
        str += '<div class="story-box grayscale" onclick="ViewStory(\''+ doc.id +'\')" data-aos="zoom-in" data-aos-delay="100">';
      }

      //str += '<div class="story-box" onclick="ViewStory(\''+ MainGroupID +'\',\''+ doc.id +'\')" data-aos="zoom-in" data-aos-delay="100">';
      if(doc.data().VDOimg=="") { 
        str += '<div class="story-box-img"><div><img src="./clip/SecretSauce-00.jpg" class="story-box-img-in"></div>';
      } else {
        str += '<div class="story-box-img"><div><img src="'+ doc.data().VDOimg +'" class="story-box-img-in"></div>';
      }
      str += '<div class="VDO-timer-clip">'+ toHHMMSS(doc.data().VDOtimer) +' นาที</div></div>';
      str += '<div class="story-box-text"><div style="height: 50px;">';
      str += '<div class="story-box-text-head">'+ doc.data().VDOname +'</div>';
      str += '<div class="story-box-text-sub">'+ doc.data().VDOdetail +'</div>';
      str += '</div><div class="entry-meta">';
      str += '<ul><li class="d-flex align-items-center"><i class="icofont-alarm"></i>'+ doc.data().VDOread +' Read</li>';
      str += '<li class="d-flex align-items-center"><i class="icofont-like"></i>'+ doc.data().VDOlike +' Like</li>';
      str += '<li class="d-flex align-items-center"><i class="icofont-comment"></i>'+ doc.data().VDOcomment +' Comment</li>';
      str += '</ul></div></div></div>';
    });
    $("#DisplayGroup").html(str);
    document.getElementById('loading').style.display='none';
    document.getElementById('home').style.display='block';
  });
}

function ViewStory(gid) {
  location.href = "showclip.html?gid="+gid;
  //console.log(refid);
}

