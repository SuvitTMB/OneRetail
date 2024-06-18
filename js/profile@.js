var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var cleararray = "";
var age = "";
var xEditdate = "";
var arrLocation = ['สนญ.','ประชาอุทิศ','จันทน์','บางกอกน้อย','สมุทรปราการ','นนทบุรี'];
var arrLocationE = ['HQ','fai-fah-prachauthit','fai-fah-chan','fai-fah-bangkoknoi','fai-fah-samuthprakarn','fai-fah-nonthaburi'];
var arrInterest = ['ศิลปะ','กีฬา','ดนตรีและ<br>การแสดง','ภาษา','ครัว ขนม<br>และเบเกอรี่','การออกแบบ<br>สิ่งทอ','การออกแบบ<br>อุตสาหกรรม','ท่องเที่ยวเพื่อ<br>ชุมชนยั่งยืน'];
var arrInterestE = ['art','sport','drama','language','cook','carft','industry','travel'];
var arrPush = [];
var xInterest1, xInterest2, xInterest3, xInterest4, xInterest5, xInterest6, xInterest7, xInterest8;
var xEmpTypeReg = "";
var xImgProfile = "";
var xEid = "";
var xEmpMemberID = "";
var xEmpSex = "";
//var xEmpMember = "";
var xEmpName = "";
var xEmpNickname = "";
var xEmpBirthday = "";
//var Xyear = 0;
//var xConfirmBox1 = "ยอมรับ";
var xConfirmDate = "";
var xConfirmBox1 = "";


$(document).ready(function () {

  if(sessionStorage.getItem("EmpIDCard_faifah")==null) { location.href = "index.html"; }
  Connect_DB();
  dbFaiFahMember = firebase.firestore().collection("faifah_member");

  $('#imageFile').change(function(evt) {
     var files = evt.target.files;
     var file = files[0];
     if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('preview').src = e.target.result;
            ResizeImage();
            //alert(document.getElementById('preview').src);
        };
        reader.readAsDataURL(file);
    }
  });
  Connect_Profile();
  LoadProfile();
  //CheckLike();
});


function LoadProfile() {
  str = "";
  //dbFaiFahMember.where('EmpIDCard','==',sessionStorage.getItem("EmpIDCard_faifah"))
  dbFaiFahMember.where('LineID','==',sessionStorage.getItem("LineID"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      xEid = doc.id;
      xEmpMemberID = doc.data().EmpMemberID;
      xEmpTypeReg = doc.data().EmpTypeReg+" ศูนย์ไฟ-ฟ้า"+doc.data().EmpLocation;
      xImgProfile = doc.data().ImgProfile;
      xEmpName = doc.data().EmpName;
      xEmpNickname = doc.data().EmpNickname;
      xEmpSex = doc.data().EmpSex;
      xEmpIDCard = doc.data().EmpIDCard;
      xEmpBirthday = doc.data().EmpBirthday;
      xConfirmBox1 = doc.data().ConfirmBox1;
      xConfirmDate = doc.data().ConfrimDate;
      //if(xConfirmBox1=="") { xConfirmBox1 = "ยอมรับ"; }




/*
      //xEmpMember = doc.data().EmpMember;
      xHomeAddress = doc.data().HomeAddress;
      xPhoneHome = doc.data().PhoneHome;
      xPhoneMobile = doc.data().PhoneMobile;
      xContactName = doc.data().Contact_Name;
      xContactPhone = doc.data().Contact_Phone;
      xCompanyName = doc.data().Company_Name;
      xOfficeAddress = doc.data().OfficeAddress;
      xPhoneOffice = doc.data().PhoneOffice;
      xEmpMail = doc.data().EmpMail;
*/
      arrPush.push(doc.data().CheckBox1,doc.data().CheckBox2,doc.data().CheckBox3,doc.data().CheckBox4,doc.data().CheckBox5,doc.data().CheckBox6,doc.data().CheckBox7,doc.data().CheckBox8);
      $("#empid").html(doc.data().EmpMemberID);
      $("#member").html(doc.data().EmpTypeReg+" ศูนย์ไฟ-ฟ้า"+doc.data().EmpLocation);
      $("#fullname").html(doc.data().EmpName);
      $("#nickname").html(doc.data().EmpNickname);
      $("#sex").html(doc.data().EmpSex);
      $("#idcard").html(doc.data().EmpIDCard);
      $("#birthday").html(ConvertDate(doc.data().EmpBirthday) + " (อายุ " + doc.data().EmpAge + ")");
      $("#confirm1").html(doc.data().ConfirmBox1);



/*
      $("#homeaddress").html(doc.data().HomeAddress);
      $("#phonehome").html(formatPhoneHome(doc.data().PhoneHome));
      $("#phonemobile").html(formatPhoneHome(doc.data().PhoneMobile));
      $("#contactname").html(doc.data().Contact_Name);
      $("#contactphone").html(formatPhoneHome(doc.data().Contact_Phone));
      $("#companyname").html(doc.data().Company_Name);
      $("#officeaddress").html(doc.data().OfficeAddress);
      $("#phoneoffice").html(formatPhoneHome(doc.data().PhoneOffice));
      $("#email").html(doc.data().EmpMail);
*/
      str += '<div class="box-profile">';
      if(xImgProfile!="") {
        str += '<img src="'+ xImgProfile +'" id="output" class="photo-center">';
      } else {
        str += '<img src="./img/avatar.png" class="photo-center">';
      }
      str += '<img src="'+ doc.data().LinePicture +'" class="photo-over" onerror="javascript:imgError(this)">';
      //str += '<div style="padding-top:35px;margin-bottom:20px;">ประเภท : '+ xEmpTypeReg +'</div></div>';
      str += '</div>';
      //xImgProfile = '<div class="photo-over"><img src="'+ doc.data().LinePicture +'" onerror="javascript:imgError(this)" class="member-profilt" title="'+ doc.data().LineName +'"></div>';
      $("#imgprofile").html(str);


      var str1 = "";
      str1 += '<fieldset class="checkbox-group" style="margin-top:0px;">';
      for (var i = 0, length = arrInterest.length; i < length; i++) { 
        if(arrInterestE[i]==arrPush[i]) { 
          if(i==0) {
            xInterest1 = arrPush[i];
          } else if(i==1) {
            xInterest2 = arrPush[i];
          } else if(i==2) {
            xInterest3 = arrPush[i];
          } else if(i==3) {
            xInterest4 = arrPush[i];
          } else if(i==4) {
            xInterest5 = arrPush[i];
          } else if(i==5) {
            xInterest6 = arrPush[i];
          } else if(i==6) {
            xInterest7 = arrPush[i];
          } else if(i==7) {
            xInterest8 = arrPush[i];
          }
          str1 += '<div class="checkbox"><label class="checkbox-wrapper">';
          str1 += '<input type="checkbox" class="checkbox-input" id="c'+ i +'" name="SelectJob" value="'+ arrInterest[i] +'" onclick="Interest(\''+ i +'\',\''+ arrInterestE[i] +'\')" checked/>';
          str1 += '<span class="checkbox-tile"><span class="checkbox-icon"><img src="./icon/'+ arrInterestE[i] +'.png" style="width:60px">';
          str1 += '</span><span class="checkbox-label">'+ arrInterest[i] +'</span></span></label></div>';
          //$("#c"+i+"").html(str1);
        } else {
          if(i==0) {
            xInterest1 = "";
          } else if(i==1) {
            xInterest2 = "";
          } else if(i==2) {
            xInterest3 = "";
          } else if(i==3) {
            xInterest4 = "";
          } else if(i==4) {
            xInterest5 = "";
          } else if(i==5) {
            xInterest6 = "";
          } else if(i==6) {
            xInterest7 = "";
          } else if(i==7) {
            xInterest8 = "";
          }
          str1 += '<div class="checkbox"><label class="checkbox-wrapper">';
          str1 += '<input type="checkbox" class="checkbox-input" id="c'+ i +'" name="SelectJob" value="'+ arrInterest[i] +'" onclick="Interest(\''+ i +'\',\''+ arrInterestE[i] +'\')"/>';
          str1 += '<span class="checkbox-tile"><span class="checkbox-icon"><img src="./icon/'+ arrInterestE[i] +'.png" style="width:60px">';
          str1 += '</span><span class="checkbox-label">'+ arrInterest[i] +'</span></span></label></div>';
          //$("#c"+i+"").html(str1);
        }
      }
      str1 += '</fieldset>';
      //console.log(xInterest1+"==="+xInterest2+"==="+xInterest3);
      $("#DisplayInterest").html(str1);
    });
  });
  document.getElementById('savedata').style.display='none';
}


function Interest(i,t) {
  var ValueItem = "";
  var ValueCheckBox = $('#c'+i+'').is(':checked');
  if($('#c'+i+'').is(':checked') == true) {
    ValueItem = t;
  } else {
    ValueItem = "";
  }
  if(i==0) {
    dbFaiFahMember.doc(xEid).update({
      CheckBox1 : ValueItem
    });      
  } else if(i==1) {
    dbFaiFahMember.doc(xEid).update({
      CheckBox2 : ValueItem
    });      
  } else if(i==2) {
    dbFaiFahMember.doc(xEid).update({
      CheckBox3 : ValueItem
    });      
  } else if(i==3) {
    dbFaiFahMember.doc(xEid).update({
      CheckBox4 : ValueItem
    });      
  } else if(i==4) {
    dbFaiFahMember.doc(xEid).update({
      CheckBox5 : ValueItem
    });      
  } else if(i==5) {
    dbFaiFahMember.doc(xEid).update({
      CheckBox6 : ValueItem
    });      
  } else if(i==6) {
    dbFaiFahMember.doc(xEid).update({
      CheckBox7 : ValueItem
    });      
  } else if(i==7) {
    dbFaiFahMember.doc(xEid).update({
      CheckBox8 : ValueItem
    });      
  }
}



function PicProfile() {
  LoadProfile();
  document.getElementById('ShowUploadFile').style.display='block';
}


function EditProfile() {
  document.getElementById('ShowUploadFile').style.display='none';
	document.getElementById('savedata').style.display='block';
  $("#nickname").html("<input id='txtnickname' type='text' value='"+ xEmpNickname +"'>");
  if(xEmpSex=="ชาย") {
    $("#sex").html("<div class='radio-toolbar'><input type='radio' id='radio1' name='sex' value='ชาย' checked><label for='radio1'>ชาย</label><input type='radio' id='radio2' name='sex' value='หญิง'><label for='radio2'>หญิง</label></div>");
  } else {
    $("#sex").html("<div class='radio-toolbar'><input type='radio' id='radio1' name='sex' value='ชาย'><label for='radio1'>ชาย</label><input type='radio' id='radio2' name='sex' value='หญิง' checked><label for='radio2'>หญิง</label></div>");
  }
  $("#birthday").html("<input id='txtbirthday' type='date' name='birthday' value='"+ xEmpBirthday +"'>");

  console.log("xConfirmBox1=="+xConfirmBox1);


  if(xConfirmBox1=="ยอมรับ") {
    $("#confirm1").html("<div class='radio-toolbar'><input type='radio' id='Order1' name='Check1' value='ยอมรับ' checked><label for='Order1'>ยอมรับ</label><input type='radio' id='Order2' name='Check1' value='ไม่ยอมรับ'><label for='Order2'>ไม่ยอมรับ</label></div>");
  } else if(xConfirmBox1=="ไม่ยอมรับ") {
    $("#confirm1").html("<div class='radio-toolbar'><input type='radio' id='Order1' name='Check1' value='ยอมรับ'><label for='Order1'>ยอมรับ</label><input type='radio' id='Order2' name='Check1' value='ไม่ยอมรับ' checked><label for='Order2'>ไม่ยอมรับ</label></div>");
  } else {
    $("#confirm1").html("<div class='radio-toolbar'><input type='radio' id='Order1' name='Check1' value='ยอมรับ'><label for='Order1'>ยอมรับ</label><input type='radio' id='Order2' name='Check1' value='ไม่ยอมรับ'><label for='Order2'>ไม่ยอมรับ</label></div>");
  }


/*

  if(xConfirmBox1=="ยอมรับ") {
    $("#confirm1").html("<div class='radio-toolbar'><input type='radio' id='confirm1' name='confirm1' value='ยอมรับ' checked><label for='confirm1'>ยอมรับ</label><input type='radio' id='confirm2' name='confirm1' value='ไม่ยอมรับ'><label for='confirm2'>ไม่ยอมรับ</label></div>");
  //} if(xConfirmBox1=="ไม่ยอมรับ") { 
  //  $("#confirm1").html("<div class='radio-toolbar'><input type='radio' id='confirm1' name='confirm1' value='ยอมรับ'><label for='confirm1'>ยอมรับ</label><input type='radio' id='confirm2' name='confirm1' value='ไม่ยอมรับ' checked><label for='confirm2'>ไม่ยอมรับ</label></div>");
  } else {
    $("#confirm1").html("<div class='radio-toolbar'><input type='radio' id='confirm1' name='confirm1' value='ยอมรับ'><label for='confirm1'>ยอมรับ</label><input type='radio' id='confirm2' name='confirm1' value='ไม่ยอมรับ' checked><label for='confirm2'>ไม่ยอมรับ</label></div>");
  }

  $("#homeaddress").html("<textarea id='txthomeaddress' name='text'>"+ xHomeAddress +"</textarea>");
  $("#phonehome").html("<input id='txtphonehome' type='number' value='"+ xPhoneHome +"'>");
  $("#phonemobile").html("<input id='txtphonemobile' type='number' value='"+ xPhoneMobile +"'>");
  $("#contactname").html("<input id='txtcontactname' type='text' value='"+ xContactName +"'>");
  $("#contactphone").html("<input id='txtcontactphone' type='number' value='"+ xContactPhone +"'>");
  $("#companyname").html("<input id='txtcompanyname' type='text' value='"+ xCompanyName +"'>");
  $("#officeaddress").html("<textarea id='txtofficeaddress' name='text'>"+ xOfficeAddress +"</textarea>");
  $("#phoneoffice").html("<input id='txtcompanyname' type='number' value='"+ xPhoneOffice +"'>");
  //$("#birthday").html("<input id='txtbirthday' type='date' name='birthday' value='1967-12-23'>");
  $("#office").html("<textarea name='text' id='Goffice'>ชั้น 18 สำนักงานใหญ่ 3000 ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กทม. 10900</textarea>");
  $("#phoneoffice").html("<input id='txtphoneoffice' type='text' value='"+ xPhoneOffice +"'>");
  $("#email").html("<input id='txtemail' type='text' value='"+ xEmpMail +"'>");
*/
  document.getElementById('savedata').style.display='block';
}


function SaveProfile() {
  //var office = document.getElementById("Goffice").value;
	var radios = document.getElementsByName('sex');
	for (var i = 0, length = radios.length; i < length; i++) {
	  if (radios[i].checked) {
	  	xEmpSex = radios[i].value;
	    break;
	  }
	}

  var radios1 = document.getElementsByName('confirm1');

  //var Xcon1 = document.getElementsByName('confirm1');
  for (var i = 0, length = radios1.length; i < length; i++) {
    if (radios1[i].checked) {
      xConfirmBox1 = radios1[i].value;
      console.log("xConfirmBox1=="+radios1[i].value);
      break;
    }
  }

  xEmpNickname = document.getElementById("txtnickname").value;
  xEmpBirthday = document.getElementById("txtbirthday").value;

/*
  xHomeAddress = document.getElementById("txthomeaddress").value;
  xPhoneHome = document.getElementById("txtphonehome").value;
  xPhoneOffice = document.getElementById("txtphoneoffice").value;
  xPhoneMobile = document.getElementById("txtphonemobile").value;
  xContactName = document.getElementById("txtcontactname").value;
  xContactPhone = document.getElementById("txtcontactphone").value;
  xCompanyName = document.getElementById("txtcompanyname").value;
  xOfficeAddress = document.getElementById("txtofficeaddress").value;
  xEmpMail = document.getElementById("txtemail").value;
*/
  Cal(xEmpBirthday);
  //console.log(age);

  dbFaiFahMember.doc(xEid).update({
    EmpNickname : xEmpNickname,
    EmpSex : xEmpSex,
    EmpBirthday : xEditdate,
    EmpAge : age

/*
    HomeAddress : xHomeAddress,
    PhoneHome : xPhoneHome,
    PhoneMobile : xPhoneMobile,
    Contact_Name : xContactName,
    Contact_Phone : xContactPhone,
    PhoneOffice : xPhoneOffice,
    Company_Name : xCompanyName,
    OfficeAddress : xOfficeAddress,
    EmpMail : xEmpMail
*/
  });
  document.getElementById('id01').style.display='block';
  //console.log(xEmpSex)
  LoadProfile();
}


function ResizeImage() {
  var img = "";
  sessionStorage.setItem("Uploadfaifah", cleararray);
  if (window.File && window.FileReader && window.FileList && window.Blob) {
      var filesToUploads = document.getElementById('imageFile').files;
      var file = filesToUploads[0];
      //alert(filesToUploads[0]);
      if (file) {
           var reader = new FileReader();
          // Set the image once loaded into file reader
          reader.onload = function(e) {
              var img = document.createElement("img");
              img.src = e.target.result;
              var canvas = document.createElement("canvas");
              var ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0);
               var MAX_WIDTH = 400;
              var MAX_HEIGHT = 400;
              var width = img.width;
              var height = img.height;
               if (width > height) {
                  if (width > MAX_WIDTH) {
                      height *= MAX_WIDTH / width;
                      width = MAX_WIDTH;
                  }
              } else {
                  if (height > MAX_HEIGHT) {
                      width *= MAX_HEIGHT / height;
                      height = MAX_HEIGHT;
                  }
              }
              canvas.width = width;
              canvas.height = height;
              var ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0, width, height);

              dataurl = canvas.toDataURL(file.type);
              document.getElementById('output').src = dataurl;
          }
          reader.readAsDataURL(file);

          //NewDate();
          var sCampRound = "faifah";
          //var DateTimeStamp = Math.round(Date.now() / 1000);
          //var ImgName = sCampRound+"-"+sessionStorage.getItem("EmpID_faifah")+"-"+DateTimeStamp;
          var ImgName = sCampRound+"_"+sessionStorage.getItem("EmpID_faifah");
          //console.log(ImgName);
          var uploadTask = firebase.storage().ref('Member/'+ImgName).put(file);
          var storage = firebase.storage().ref('Member/'+ImgName);
          var upload = storage.put(file);
          //document.getElementById('MyATKUPloading').src = dataurl;
          upload.on(
            "state_changed",
            function progress(snapshot) {
              //var percentage =
              //(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            function error() {
              alert("error uploading file");
            },
            function complete() {
                uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
                sessionStorage.setItem("Uploadfaifah", url);
                dbFaiFahMember.doc(xEid).update({
                  ImgProfile : url
                });
                document.getElementById('id01').style.display='block';
                LoadProfile();
                document.getElementById('preview').style.display='none';
                document.getElementById('output').style.display='none';
                document.getElementById('ShowUploadFile').style.display='none';
             }
              );
            }
          );
      }
   } else {
      alert('The File APIs are not fully supported in this browser.');
  }
}


/*
function CalDateTime(x) {
  var year = Number(x.substr(0, 4));
  var month = Number(x.substr(4, 2)) - 1;
  var day = Number(x.substr(6, 2));
  xEditdate = (x.substr(0, 4))+"-"+(x.substr(5, 2))+"-"+(x.substr(8, 2));
  //dob.getFullYear() + "-" + dob.getMonth() + "-" + dob.getDate().slice(-2);
  var today = new Date();
  console.log(x + " === " + xEditdate + "---"+ today.getMonth() + " //// "+x.substr(5, 2) );
  //m = today.getMonth() - b.getMonth();
  age = (today.getFullYear() - year) + " ปี";
  //var age = (today.getFullYear() - year) + " ปี " + ((today.getMonth()-1) - month) + " เดือน";
  if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
    age--;
  }
  console.log(age);
}
var CheckLikeID1 = "";
var CheckLikeID2 = "";
var CheckLikeID3 = "";
var CheckLikeID4 = "";
var CheckLikeID5 = "";
var CheckLikeID6 = "";
var CheckLikeID7 = "";
var CheckLikeID8 = "";
function CheckLike() {
  var str = "";
  str += '<label class="form-control">';
  dbFaiFahMember.where('EmpMember','==',sessionStorage.getItem("EmpID_faifah"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      CheckLikeID1 = doc.data().CheckBox1;
      CheckLikeID2 = doc.data().CheckBox2;
      CheckLikeID3 = doc.data().CheckBox3;
      CheckLikeID4 = doc.data().CheckBox4;
      CheckLikeID5 = doc.data().CheckBox5;
      CheckLikeID6 = doc.data().CheckBox6;
      CheckLikeID7 = doc.data().CheckBox7;
      CheckLikeID8 = doc.data().CheckBox8;
      if(CheckLikeID1==true) {
        str += '<input type="checkbox" id="checkbox1" onclick="CheckBox(1)" checked="checked"/> ศิลปะ';
      } else {
        str += '<input type="checkbox" id="checkbox1" onclick="CheckBox(1)"/> ศิลปะ';
      }
      if(CheckLikeID2==true) {
        str += '<input type="checkbox" id="checkbox2" onclick="CheckBox(2)" checked="checked"/> กีฬา';
      } else {
        str += '<input type="checkbox" id="checkbox2" onclick="CheckBox(2)"/> กีฬา';
      }
      if(CheckLikeID3==true) {
        str += '<input type="checkbox" id="checkbox3" onclick="CheckBox(3)" checked="checked"/> ดนตรีและการแสดง';
      } else {
        str += '<input type="checkbox" id="checkbox3" onclick="CheckBox(3)"/> ดนตรีและการแสดง';
      }
      if(CheckLikeID4==true) {
        str += '<input type="checkbox" id="checkbox4" onclick="CheckBox(4)" checked="checked"/> ภาษา';
      } else {
        str += '<input type="checkbox" id="checkbox4" onclick="CheckBox(4)"/> ภาษา';
      }
      if(CheckLikeID5==true) {
        str += '<input type="checkbox" id="checkbox5" onclick="CheckBox(5)" checked="checked"/> ครัว ขนม และเบเกอรี่';
      } else {
        str += '<input type="checkbox" id="checkbox5" onclick="CheckBox(5)"/> ครัว ขนม และเบเกอรี่';
      }
      if(CheckLikeID6==true) {
        str += '<input type="checkbox" id="checkbox6" onclick="CheckBox(6)" checked="checked"/> การออกแบบสิ่งทอ';
      } else {
        str += '<input type="checkbox" id="checkbox6" onclick="CheckBox(6)"/> การออกแบบสิ่งทอ';
      }
      if(CheckLikeID7==true) {
        str += '<input type="checkbox" id="checkbox7" onclick="CheckBox(7)" checked="checked"/> การออกแบบอุตสาหกรรม';
      } else {
        str += '<input type="checkbox" id="checkbox7" onclick="CheckBox(7)"/> การออกแบบอุตสาหกรรม';
      }
      if(CheckLikeID8==true) {
        str += '<input type="checkbox" id="checkbox8" onclick="CheckBox(8)" checked="checked"/> ท่องเที่ยวเพื่อชุมชนยั่งยืน';
      } else {
        str += '<input type="checkbox" id="checkbox8" onclick="CheckBox(8)"/> ท่องเที่ยวเพื่อชุมชนยั่งยืน';
      }
      str += '</div>';
      $("#CheckListLike").html(str);
    });
  });
}
*/


function CheckBox(x) {
  if(x==1) {
    var ValueCheckBox = $('#checkbox1').is(':checked');
    dbFaiFahMember.doc(xEid).update({
      CheckBox1 : ValueCheckBox
    });
  } else if(x==2) {
    var ValueCheckBox = $('#checkbox2').is(':checked');
    dbFaiFahMember.doc(xEid).update({
      CheckBox2 : ValueCheckBox
    });
  } else if(x==3) {
    var ValueCheckBox = $('#checkbox3').is(':checked');
    dbFaiFahMember.doc(xEid).update({
      CheckBox3 : ValueCheckBox
    });
  } else if(x==4) {
    var ValueCheckBox = $('#checkbox4').is(':checked');
    dbFaiFahMember.doc(xEid).update({
      CheckBox4 : ValueCheckBox
    });
  } else if(x==5) {
    var ValueCheckBox = $('#checkbox5').is(':checked');
    dbFaiFahMember.doc(xEid).update({
      CheckBox5 : ValueCheckBox
    });
  } else if(x==6) {
    var ValueCheckBox = $('#checkbox6').is(':checked');
    dbFaiFahMember.doc(xEid).update({
      CheckBox6 : ValueCheckBox
    });
  } else if(x==7) {
    var ValueCheckBox = $('#checkbox7').is(':checked');
    dbFaiFahMember.doc(xEid).update({
      CheckBox7 : ValueCheckBox
    });
  } else if(x==8) {
    var ValueCheckBox = $('#checkbox8').is(':checked');
    dbFaiFahMember.doc(xEid).update({
      CheckBox8 : ValueCheckBox
    });
  }
  //console.log(y+" === " + z+" === " + x+" === "+xEid);
/*
  dbFaiFahMember.doc(xEid).update({
    EmpNickname : xEmpNickname,
    EmpSex : xEmpSex,
    EmpBirthday : xEditdate,
    EmpAge : age,
    HomeAddress : xHomeAddress,
    PhoneHome : xPhoneHome,
    PhoneMobile : xPhoneMobile,
    Contact_Name : xContactName,
    Contact_Phone : xContactPhone,
    PhoneOffice : xPhoneOffice,
    CompanyName : xCompanyName,
    OfficeAddress : xOfficeAddress,
    EmpMail : xEmpMail
  });
*/


}


function Cal(x) {
    console.log(x);
    var today = new Date();
    var Xyear = Number(x.substr(0, 4));
    var Xmonth = Number(x.substr(4, 2)) - 1;
    var Xday = Number(x.substr(6, 2));
    xEditdate = (x.substr(0, 4))+"-"+(x.substr(5, 2))+"-"+(x.substr(8, 2));

    var form = document.getElementById("form"),
        bdate = Xday,
        bmonth = Xmonth,
        byear = Xyear,
        days = "",
        mons = "",
        today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() - 1;
    var date = today.getDate();
    var by = Number.parseFloat(byear),
        bm = Number.parseFloat(bmonth),
        bd = Number.parseFloat(bdate),
        ty = Number.parseFloat(year),
        tm = Number.parseFloat(month),
        td = Number.parseFloat(date);
    if (td < bd) {
      days = (td - bd + 30) + ' วัน';
      //days.innerHTML = (td - bd + 30) + ' days';
      tm = tm - 1;
    } else {
      days = (td - bd) + ' วัน';
      //days.innerHTML = (td - bd) + ' days'
    }
    if (tm < bm) {
      mons = (tm - bm + 12) + ' เดือน';
      //months.innerHTML = (tm - bm + 12) + ' months';
      ty = ty - 1;
    } else {
      mons = (tm - bm) + ' เดือน';
      //months.innerHTML = (tm - bm) + ' months'
    }
    age = (ty - by) + ' ปี ' +  mons  ;
    //age.innerHTML = "Age: " + (ty - by) + ' years';
    //console.log(age);
}


function formatPhoneHome(str) {
  //console.log(str.length);
  if(str.length==9) {
    var res = '(' + str.substr(0,2) + ') ' + str.substr(2,3) + '-' + str.substr(5);
  } else if(str.length==10) {
    var res = '(' + str.substr(0,3) + ') ' + str.substr(3,3) + '-' + str.substr(6);  
  } else {
    var res = str;
  }
  return res
}


function ConvertDate(x) {
  //x = '1967/12/23';
  console.log("date = "+x);
  var monthNames = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
      "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม.",
      "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];
  var today = new Date(x);
  var day = today.getDate() + "";
  var month = (today.getMonth() + 1) + "";
  var year = (today.getFullYear()+543) + "";
  day = checkZero(day);
  //month = checkZero(month);
  year = checkZero(year);
  //return day + " " + monthNames[today.getMonth() + 1] + " " + year;
  return day + " " + monthNames[today.getMonth()] + " " + year;
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}


function imgError(image) {
    image.onerror = "";
    image.src = "./img/box.jpg";
    return true;
}


function gotohome() {
  location.href = "home.html";
}


function CloseAll() {
  window.scroll(0, 0);
  document.getElementById('id01').style.display='none';
}


