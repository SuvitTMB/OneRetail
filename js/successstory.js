var MainGroupID = 6;
var ReadMemberArr = [];
var ReadVdoArr = [];
var xVDOname1 = "";
var xVDOname2 = "";
var xVDOname3 = "";
var xVDOimg1 = "";
var xVDOimg2 = "";
var xVDOimg3 = "";

$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Academy")==null || sessionStorage.getItem("LineID")==null) { location.href = "index.html"; }
  Connect_DB();
  GetAllVDO();
  //LoadLDP();
  LoadGroupVDO();
  //LoadTopContent();
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
    LoadSlider(); 
  });
}


/*
function LoadLDP() {

  var i = 0;
  var str = "";
  dbVDOTraining.where('VDOmain','==',parseFloat(MainGroupID))
  .orderBy('VDOrank','desc')
  .limit(3)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {

        str += '<div id="slides"><div class="slide"><img src="./clip/SecretSauce-00.jpg" style="height: 400px;">';
      if(doc.data().VDOimg=="") { 
        //str += '<div id="slides"><div class="slide" style="background-image: url(./clip/SecretSauce-00.jpg); height: 400px; width: 100%;">';
        str += '<div id="slides"><div class="slide"><img src="./clip/SecretSauce-00.jpg" style="height: 400px; width: 100%;">';
      } else {
        //str += '<div id="slides"><div class="slide" style="background-image: url('+ doc.data().VDOimg +'); height: 400px; width: 100%;">';
        str += '<div id="slides"><div class="slide" style="background-image: url('+ doc.data().VDOimg +'); height: 400px; width: 100%;">';
      }
      str += '<div class="caption"><p style="padding:5px; font-weight: 400;">';
      str += '<span style="font-weight: 600px; color:#ffff00;">'+ doc.data().VDOname +'</span>';
      str += '<span style="font-weight: 600px; color:#ffff00;">'+ doc.data().VDOdetail +'</span>';
      str += '</p></div></div>';


    });
    str += '<span class="timeline"></span>';
    $("#DisplayLDP").html(str);
  });
*/
/*
  var i = 0;
  var str = "";
  str += '<div id="slides"><div class="slide" style="background-image: url(./clip/SecretSauce-01-1.jpg);">';
  str += '<div class="caption"><p style="padding:5px; font-weight: 400;">';
  str += '<span style="font-weight: 600px; color:#ffff00;">RASC SERVICE DASHBOARD AWARDS 2020</span>';
  str += '<span style="font-weight: 600px; color:#ffff00;">คุณอนันต์ จันทร์เสวก</span><br><span style="color:#fff;">สำนักงานภาคลูกค้าธุรกิจขนาดเล็ก - ภาคเหนือ - กลาง</span>';
  str += '</p></div></div>';

  str += '<div class="slide" style="background-image: url(./clip/SecretSauce-01-2.jpg);">';
  str += '<div class="caption"><p style="padding:5px; font-weight: 400;">';
  str += '<span style="font-weight: 600px; color:#ffff00;">คุณอนันต์ จันทร์เสวก</span>';
  str += '<span style="color:#fff;"><br>สำนักงานภาคลูกค้าธุรกิจขนาดเล็ก - ภาคเหนือ - กลาง</span>';
  str += '</p></div></div>';

  str += '<div class="slide" style="background-image: url(./pic/CX-03.jpg);">';
  str += '<div class="caption"><p style="padding:5px; font-weight: 400;">';
  str += '<span style="font-weight: 600px; color:#ffff00;">คุณจุฑาทิพย์ ทองย้อย</span>';
  str += '<span style="color:#fff;"><br>สำนักงานภาคลูกค้าธุรกิจขนาดเล็ก - กทม</span>';
  str += '</p></div></div>';

  str += '<span class="timeline"></span>';
  $("#DisplayLDP").html(str);
}
*/

function LoadSlider() {
  //console.log(ReadVdoArr[0].VDOimg);
  //console.log(ReadVdoArr[1].VDOimg);
  //console.log(ReadVdoArr[2].VDOimg);
  var ii = 1;
  var xResults = "";
  //console.log(xVDOname1+"==="+xVDOname2+"==="+xVDOname3);
  //console.log(xVDOimg1+"==="+xVDOimg2+"==="+xVDOimg3);
  //console.log(ReadMemberArr.lenght);
    //console.log(ReadVdoArr);
    //console.log(ReadVdoArr.lenght);
      //console.log(ReadVdoArr[0,1]);
      //const results = ReadVdoArr.filter(obj => {return obj.Q === ii;});
      //if(results[0]!=undefined) { 
      //  xResults = results[0].VDOname;
      //}
      //console.log(results[0]);

    //const results = ReadVdoArr.filter(obj => {return obj.Q === ii;});
    ///console.log(  results[0].Q );
    //console.log(ReadVdoArr[1].VDOname);
    //console.log(ReadVdoArr[2].VDOname);

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
      //str += '<div class="story-box" onclick="ViewStory(\''+ MainGroupID +'\',\''+ doc.id +'\')" data-aos="zoom-in" data-aos-delay="100">';
      str += '<div class="story-box" onclick="ViewStory(\''+ doc.id +'\')" data-aos="zoom-in" data-aos-delay="100">';
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
    //document.getElementById('loading').style.display='none';
    $("#DisplayGroup").html(str);
  });
}

function ViewStory(gid) {
  location.href = "displayclip.html?gid="+gid;
  //console.log(refid);
}

/*
function LoadTopContent() {
  var i = 0;
  var str = "";
  str += '<div class="story-box" onclick="ViewStory(1)" data-aos="zoom-in" data-aos-delay="100">';
  str += '<div class="story-box-img"><div><img src="./pic/CX-01.jpg" class="story-box-img-in"></div>';
  str += '<div class="btn-small">Click</div></div>';
  str += '<div class="story-box-text"><div style="height: 50px;">';
  str += '<div class="story-box-text-head">คุณจุฑาทิพย์ ทองย้อย</div>';
  str += '<div class="story-box-text-sub">สำนักงานภาคลูกค้าธุรกิจขนาดเล็ก - กทม<br>สังกัดสำนักงานเขตธุรกิจสาขา</div>';
  str += '</div><div class="entry-meta">';
  str += '<ul><li class="d-flex align-items-center"><i class="icofont-alarm"></i>4 Read</li>';
  str += '<li class="d-flex align-items-center"><i class="icofont-like"></i>5 Like</li>';
  str += '<li class="d-flex align-items-center"><i class="icofont-comment"></i>6 Comment</li>';
  str += '</ul></div></div></div>';

  str += '<div class="story-box" onclick="ViewStory(2)" data-aos="zoom-in" data-aos-delay="100">';
  str += '<div class="story-box-img"><div><img src="./pic/CX-02.jpg" class="story-box-img-in"></div>';
  str += '<div class="btn-small">Click</div></div>';
  str += '<div class="story-box-text"><div style="height: 50px;">';
  str += '<div class="story-box-text-head">คุณจุฑาทิพย์ ทองย้อย</div>';
  str += '<div class="story-box-text-sub">สำนักงานภาคลูกค้าธุรกิจขนาดเล็ก - กทม<br>สังกัดสำนักงานเขตธุรกิจสาขา</div>';
  str += '</div><div class="entry-meta">';
  str += '<ul><li class="d-flex align-items-center"><i class="icofont-alarm"></i>4 Read</li>';
  str += '<li class="d-flex align-items-center"><i class="icofont-like"></i>5 Like</li>';
  str += '<li class="d-flex align-items-center"><i class="icofont-comment"></i>6 Comment</li>';
  str += '</ul></div></div></div>';

  str += '<div class="story-box" onclick="ViewStory(3)" data-aos="zoom-in" data-aos-delay="100">';
  str += '<div class="story-box-img"><div><img src="./pic/CX-03.jpg" class="story-box-img-in"></div>';
  str += '<div class="btn-small">Click</div></div>';
  str += '<div class="story-box-text"><div style="height: 50px;">';
  str += '<div class="story-box-text-head">คุณจุฑาทิพย์ ทองย้อย</div>';
  str += '<div class="story-box-text-sub">สำนักงานภาคลูกค้าธุรกิจขนาดเล็ก - กทม<br>สังกัดสำนักงานเขตธุรกิจสาขา</div>';
  str += '</div><div class="entry-meta">';
  str += '<ul><li class="d-flex align-items-center"><i class="icofont-alarm"></i>4 Read</li>';
  str += '<li class="d-flex align-items-center"><i class="icofont-like"></i>5 Like</li>';
  str += '<li class="d-flex align-items-center"><i class="icofont-comment"></i>6 Comment</li>';
  str += '</ul></div></div></div>';

  str += '<div class="story-box" onclick="ViewStory(4)" data-aos="zoom-in" data-aos-delay="100">';
  str += '<div class="story-box-img"><div><img src="./pic/CX-04.jpg" class="story-box-img-in"></div>';
  str += '<div class="btn-small">Click</div></div>';
  str += '<div class="story-box-text"><div style="height: 50px;">';
  str += '<div class="story-box-text-head">คุณจุฑาทิพย์ ทองย้อย</div>';
  str += '<div class="story-box-text-sub">สำนักงานภาคลูกค้าธุรกิจขนาดเล็ก - กทม<br>สังกัดสำนักงานเขตธุรกิจสาขา</div>';
  str += '</div><div class="entry-meta">';
  str += '<ul><li class="d-flex align-items-center"><i class="icofont-alarm"></i>4 Read</li>';
  str += '<li class="d-flex align-items-center"><i class="icofont-like"></i>5 Like</li>';
  str += '<li class="d-flex align-items-center"><i class="icofont-comment"></i>6 Comment</li>';
  str += '</ul></div></div></div>';

  str += '<div class="story-box" onclick="ViewStory(5)" data-aos="zoom-in" data-aos-delay="100">';
  str += '<div class="story-box-img"><div><img src="./pic/CX-05.jpg" class="story-box-img-in"></div>';
  str += '<div class="btn-small">Click</div></div>';
  str += '<div class="story-box-text"><div style="height: 50px;">';
  str += '<div class="story-box-text-head">คุณจุฑาทิพย์ ทองย้อย</div>';
  str += '<div class="story-box-text-sub">สำนักงานภาคลูกค้าธุรกิจขนาดเล็ก - กทม<br>สังกัดสำนักงานเขตธุรกิจสาขา</div>';
  str += '</div><div class="entry-meta">';
  str += '<ul><li class="d-flex align-items-center"><i class="icofont-alarm"></i>4 Read</li>';
  str += '<li class="d-flex align-items-center"><i class="icofont-like"></i>5 Like</li>';
  str += '<li class="d-flex align-items-center"><i class="icofont-comment"></i>6 Comment</li>';
  str += '</ul></div></div></div>';

  $("#DisplayTopContent").html(str);
}
*/


/*
function ViewStory(x) {
  alert(x);
}


  str += '';
  str += '';
  str += '';
  str += '';
  str += '';
  str += '';
  str += '';
  str += '';
  str += '';
  str += '';
  str += '';
  str += '';
  str += '';
*/

