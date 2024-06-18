var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var checkMonth = String(today.getMonth() + 1).padStart(2, '0');
var checkYear = today.getFullYear();
var DatetodayFormat = "";
var DatetodayFormatShort = "";
var today = new Date();
var worktime = 0;
var worktimein = "";
var worktimeout = "";
var worktimeinend = "";
var worktimeoutend = "";
var startCheckOut = "";
var checkmenu = 0;
var usercheckin = "";
var usercheckout = "";
var worktimein_check = 0;
var worktimeout_check = 0;
var EidMember = "";
var xLocation = "";

$(document).ready(function () {
  //if(sessionStorage.getItem("EmpID_Moon2023")==null) { location.href = "index.html"; }
/*
  sessionStorage.clear(); 
  var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
  var sLineName = "Website";
  var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
  var sEmpID = "ttb08400";
  var sEmpName = "สุวิทย์ ชัยรุ่งปัญญา";
  sessionStorage.setItem("LineID", sLineID);
  sessionStorage.setItem("LineName", sLineName);
  sessionStorage.setItem("LinePicture", sLinePicture);
  sessionStorage.setItem("EmpID_HR", sEmpID);
  sessionStorage.setItem("EmpName_HR", sEmpName);
*/
  if(sessionStorage.getItem("EmpIDCard_faifah")==null) { location.href = "index.html"; }
  Connect_DB();
  dbFaiFahMember = firebase.firestore().collection("faifah_member");
  //dbHR_userprofile = firebase.firestore().collection("HR_UserProfile");
  //dbHR_log = firebase.firestore().collection("HR_log");
  //dbHR_worktime = firebase.firestore().collection("HR_WorkTime");

  Loadmenu();
  ClickMenu(1);
  DateTodayFormat();

  FaiFahLoctaion();


  //CheckUser();
  //CheckDateLogin();

  ShowTimeing();
  setInterval(ShowTimeing, 1000);
});




function CheckDateLogin() {
  var CheckLogin = 0;
  DateTodayFormat();
  dbHR_log.where('DateRegister','==',DatetodayFormatShort)
  .where('EmpID','==',sessionStorage.getItem("EmpID_HR"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      CheckLogin = 1;
      EidMember = doc.id;
      usercheckin = doc.data().worktimein;
      worktimein_check = doc.data().worktimein_check;
      usercheckout = doc.data().worktimeout;
      worktimeout_check = doc.data().worktimeout_check;
      console.log("worktimein_check="+worktimein_check);
      console.log("worktimeout_check="+worktimeout_check);
      //console.log("Found"+"\n"+DatetodayFormatShort+"\n"+sessionStorage.getItem("EmpID_HR"));
      CheckUser();
    });
    if(CheckLogin==0) {
      console.log("Add New Record"+"\n"+DatetodayFormatShort+"\n"+sessionStorage.getItem("EmpID_HR"));
      AddNewData();
    }
    //$("#CountUser").html("ขณะนี้มีผู้ร่วมกิจกรรมแล้ว <span class='font18'>"+ addCommas(i) +"</span> คน");
    //console.log(i);
  });  
}


function CheckUser() {
  dbHR_userprofile.where('EmpID','==',sessionStorage.getItem("EmpID_HR"))
  .where('EmpStatus','==',0)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      worktime = doc.data().WorkTime;
      console.log("worktime="+worktime);
    });
    CheckWorkTime();
  });  
}


function CheckWorkTime() {
  dbHR_worktime.where('WorkTime','==',worktime)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      worktimein = DatetodayFormatShort + " " + doc.data().WorkTimeIN;
      worktimeinend = DatetodayFormatShort + " " + doc.data().WorkTimeINend;
      worktimeout = DatetodayFormatShort + " " + doc.data().WorkTimeOUT;
      worktimeoutend = DatetodayFormatShort + " " + doc.data().WorkTimeOUTend;
      startCheckOut = DatetodayFormatShort + " " + doc.data().StartCheckOut;
      //$("#UserTimeIN").html('<div class="time-header">เวลาเข้างาน<br>'+ doc.data().WorkTimeIN + ' - ' + doc.data().WorkTimeINend +'</div>');
      //$("#UserTimeOUT").html('<div class="time-header">เวลาออกงาน<br>'+ doc.data().WorkTimeOUT + ' - ' + doc.data().WorkTimeOUTend +'</div>');
      $("#UserTimeIN").html('<div class="time-header">เวลาเข้าศูนย์<br>ก่อนเวลา '+ doc.data().WorkTimeIN + ' น.</div>');
      $("#UserTimeOUT").html('<div class="time-header">เวลาออกศูนย์<br>หลังเวลา '+ doc.data().WorkTimeOUT + ' น.</div>');

      document.getElementById('loading').style.display='none';
      document.getElementById('DateCheckIN').style.display='block';
      document.getElementById('loading1').style.display='none';
      document.getElementById('DateCheckOUT').style.display='block';
    });
  });
}



function AddNewData() {
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbHR_log.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_HR"),
    EmpName : sessionStorage.getItem("EmpName_HR"),
    DateRegister : DatetodayFormatShort,
    ReportDay : 0,
    Month : checkMonth,
    Year : checkYear,
    WorkTime : worktime,
    worktimein : "",
    worktimeout : "",
    worktimein_check : 0,
    worktimeout_check : 0,
    worktimein_late : "",
    worktimeout_late : "",
    LogTimeStamp : TimeStampDate
  });
  //console.log("New Record");
  CheckDateLogin();
}


function DateTodayFormat() {
  today = new Date();
  DatetodayFormat = today.getFullYear() + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + String(today.getDate()).padStart(2, '0') + " " + today.getHours() + ":" + today.getMinutes()  + ":" + today.getSeconds();
  DatetodayFormatShort = today.getFullYear() + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + String(today.getDate()).padStart(2, '0');
  //console.log(DatetodayFormat+"\n"+DatetodayFormatShort);
}


function ShowTimeing() {
  //document.getElementById('TimeLeaveWork').style.display='none';
  var m = new Date();
  var dayNames = [ "อาทิตย์", "จันทร์", "อังคาร", "พุธ","พฤหัสบดี", "ศุกร์", "เสาร์" ];
  var monthNames = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
      "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม.",
      "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];
  var datetoday = "วัน"+ dayNames[m.getDay()] + "ที่ " +
      ("0" + m.getDate()).slice(-2) + " " + monthNames[m.getMonth()] + " " +
      (m.getFullYear()+543) + " " + " <br>เวลา " +
      ("0" + m.getHours()).slice(-2) + ":" +
      ("0" + m.getMinutes()).slice(-2) + ":" +
      ("0" + m.getSeconds()).slice(-2) + " น." ;
  $("#myDateTime").html(datetoday);
  $("#myDateTimeCheckIN").html(datetoday);
  $("#myDateTimeCheckOUT").html(datetoday);
  //$("#myDateTimeIN").html(datetoday);
  //$("#myDateTimeOUT").html(datetoday);
  //console.log("ShowTimeing"+datetoday);worktimeinend

  var thisday = new Date();
  var startin = new Date(worktimein).getTime();
  var startinend = new Date(worktimeinend).getTime();
  var startout = new Date(worktimeout).getTime();
  var endout = new Date(thisday).getTime();
  var startoutend = new Date(worktimeoutend).getTime();
  var timestartcheck = new Date(startCheckOut).getTime();

  diffin =  startin - endout;
  hoursin = Math.floor(diffin / 1000 / 60 / 60);
  minutesin = Math.ceil(((diffin/1000/60) %60)).toFixed(0);

  diffinnow =  endout - startin;
  hoursinnow = Math.floor(diffinnow / 1000 / 60 / 60);
  minutesinnow = Math.floor(((diffinnow/1000/60) %60)).toFixed(0);

  diffinend =  startinend - endout;
  hoursinend = Math.floor(diffinend / 1000 / 60 / 60);
  minutesinend = Math.ceil(((diffinend/1000/60) %60)).toFixed(0);

  diffout =  startout - endout;
  hoursout = Math.floor(diffout / 1000 / 60 / 60);
  minutesout = Math.ceil(((diffout/1000/60) %60)).toFixed(0);

  diffoutend =  startoutend - endout;
  hoursoutend = Math.floor(diffoutend / 1000 / 60 / 60);
  minutesoutend = Math.ceil(((diffoutend/1000/60) %60)).toFixed(0);

  diffcheck = timestartcheck - endout;

  //console.log("diffcheck="+diffcheck+" timestartcheck=" +timestartcheck+" endout="+endout);
  //console.log("usercheckin="+usercheckin);
  //$("#DateCheckIN").html(ConvertDate(usercheckin)); worktimeinend

  if(usercheckin=="") {
    //document.getElementById('TimeLeaveWork').style.display='block';
    //document.getElementById('TimeLeaveWorkend').style.display='none';
    if(isNaN(diffin)) {
    } else {
      //document.getElementById('TimeIN').style.display='block';
      //document.getElementById('TimeINnone').style.display='none';
      if(diffin>=0) {
        if(hoursin<=0 && minutesin<=0) {
          $("#DateCheckIN").html("เหลือเวลาเข้างานอีก<br>"+ hoursin +" ชั่วโมง "+ minutesin + " นาที<br><font color='#12c230'>อยู่ในเวลาเข้างานปกติ</font>");
          $("#CheckINlate").html("เหลือเวลาเข้างานอีก<br>"+ hoursin +" ชั่วโมง "+ minutesin + " นาที<br><font color='#12c230'>อยู่ในเวลาเข้างานปกติ</font>");
        } else if(hoursin<=0 && minutesin>=0) {
          $("#DateCheckIN").html("เหลือเวลาเข้างานอีก<br>"+ minutesin + " นาที<br><font color='#12c230'>อยู่ในเวลาเข้างานปกติ</font>");
          $("#CheckINlate").html("เหลือเวลาเข้างานอีก<br>"+ minutesin + " นาที<br><font color='#12c230'>อยู่ในเวลาเข้างานปกติ</font>");
        } else {
          $("#DateCheckIN").html("เหลือเวลาเข้างานอีก<br>"+ hoursin +" ชั่วโมง "+ minutesin + " นาที<br><font color='#12c230'>อยู่ในเวลาเข้างานปกติ</font>");
          $("#CheckINlate").html("เหลือเวลาเข้างานอีก<br>"+ hoursin +" ชั่วโมง "+ minutesin + " นาที<br><font color='#12c230'>อยู่ในเวลาเข้างานปกติ</font>");
        }
        //document.getElementById('loading').style.display='none';
        //document.getElementById('DateCheckIN').style.display='block';
      } else {
        if(hoursinend<=0 && minutesinend<=0) {
          document.getElementById('TimeIN').style.display='none';
          document.getElementById('TimeINnone').style.display='block';
          $("#DateCheckIN").html("หมดลงเวลาเข้างาน<br>ในช่วงเช้าแล้ว<br><font color='#ff0000'>* ไม่ได้ลงเวลาเข้างาน *</font>");
          $("#CheckINlate").html("หมดลงเวลาเข้างาน<br>ในช่วงเช้าแล้ว<br><font color='#ff0000'>* ไม่ได้ลงเวลาเข้างาน *</font>");
        } else if(hoursinend>0 && minutesinend>0) {
          $("#DateCheckIN").html("คุณลงเวลาช้าไปแล้ว<br>"+ hoursinnow +" ชั่วโมง "+ minutesinnow + " นาที<br><font color='#ff0000'>* คุณเข้างานสาย *</font>");
          $("#CheckINlate").html("ลงเวลาเข้างานภายใน<br>"+ hoursinend +" ชั่วโมง "+ minutesinend + " นาที<br><font color='#ff0000'>* คุณเข้างานสาย *</font>");
        } else if(hoursinend<=0 && minutesinend>0) {
          if(hoursinnow==0) {
            $("#DateCheckIN").html("คุณลงเวลาช้าไปแล้ว<br>"+ minutesinnow + " นาที<br><font color='#ff0000'>* คุณเข้างานสาย *</font>");            
          } else {
            $("#DateCheckIN").html("คุณลงเวลาช้าไปแล้ว<br>"+ hoursinnow +" ชั่วโมง "+ minutesinnow + " นาที<br><font color='#ff0000'>* คุณเข้างานสาย *</font>");            
          }
          $("#CheckINlate").html("ลงเวลาเข้างานภายใน<br>"+ minutesinend + " นาที<br><font color='#ff0000'>* คุณเข้างานสาย *</font>");
        }
      }      
    }
  } else if(usercheckin!="") { 
    var str = "";
    str += ConvertDate(usercheckin)+"<br>";
    if(worktimein_check==1) {
      str += "<font color='#12c230'>* คุณเข้างานในเวลา *</font>"
    } else if(worktimein_check==2) {
      str += "<font color='#ff0000'>* คุณเข้างานสาย *</font>"
    } else {
      str += "<font color='#000000'>* ไม่ได้ลงเวลาเข้างาน *</font>"      
    }
    $("#DateCheckIN").html(str);
    $("#DateCheckConfirm").html(str);
  }


  if(usercheckout=="") {
    if(isNaN(diffout)) {
        console.log(diffout);
        $("#DateCheckOUT").html("หมดลงเวลาออกงาน<br>ช่วงบ่ายของวันนี้แล้ว<br><font color='#ff0000'>คุณไม่ได้ลงเวลาออก</font>");
    } else {
      if(diffout>=0) {
        //alert("Case 1");
        if(hoursout<=0 && minutesout<=0) {
          $("#DateCheckOUT").html("เหลือเวลาออกงานอีก<br>"+ hoursout +" ชั่วโมง "+ minutesout + " นาที<br><font color='#ff0000'>ยังไม่ถึงเวลาออกงาน</font>");
          $("#CheckOUTlate").html("เหลือเวลาออกงานอีก<br>"+ hoursout +" ชั่วโมง "+ minutesout + " นาที<br><font color='#ff0000'>ยังไม่ถึงเวลาออกงาน</font>");
        } else if(hoursout<=0 && minutesout>=0) {
          $("#DateCheckOUT").html("เหลือเวลาออกงานอีก<br>"+ minutesout + " นาที<br><font color='#ff0000'>ยังไม่ถึงเวลาออกงาน</font>");
          $("#CheckOUTlate").html("เหลือเวลาออกงานอีก<br>"+ minutesout + " นาที<br><font color='#ff0000'>ยังไม่ถึงเวลาออกงาน</font>");
        } else {
          $("#DateCheckOUT").html("เหลือเวลาออกงานอีก<br>"+ hoursout +" ชั่วโมง "+ minutesout + " นาที<br><font color='#ff0000'>ยังไม่ถึงเวลาออกงาน</font>");
          $("#CheckOUTlate").html("เหลือเวลาออกงานอีก<br>"+ hoursout +" ชั่วโมง "+ minutesout + " นาที<br><font color='#ff0000'>ยังไม่ถึงเวลาออกงาน</font>");
        }        
      } else {
        //alert("Case 2");
        if(hoursoutend<=0 && minutesoutend<=0) {
          $("#DateCheckOUT").html("1หมดลงเวลาออกงาน<br>ของวันนี้แล้ว<br><font color='#ff0000'>ยังไม่ได้ลงเวลาออก</font>");
          $("#CheckOUTlate").html("2หมดลงเวลาออกงาน<br>ของวันนี้แล้ว<br><font color='#ff0000'>ยังไม่ได้ลงเวลาออก</font>");
          document.getElementById('TimeOUT').style.display='none';
          document.getElementById('TimeOUTnone').style.display='block';
        } else if(hoursoutend>0 && minutesoutend>0) {
          document.getElementById('TimeOUT').style.display='block';
          document.getElementById('TimeOUTnone').style.display='none';
          $("#DateCheckOUT").html("ต้องลงเวลาออกงานใน<br>"+ hoursoutend +" ชั่วโมง "+ minutesoutend + " นาที<br><font color='#ff0000'>ยังไม่ได้ลงเวลาออก</font>");
          $("#CheckOUTlate").html("ต้องลงเวลาออกงานใน<br>"+ hoursoutend +" ชั่วโมง "+ minutesoutend + " นาที<br><font color='#ff0000'>ยังไม่ได้ลงเวลาออก</font>");
        } else if(hoursoutend<=0 && minutesoutend>0) {
          document.getElementById('TimeOUT').style.display='block';
          document.getElementById('TimeOUTnone').style.display='none';
          if(hoursoutend==0) {
            $("#DateCheckOUT").html("ต้องลงเวลาออกงานใน<br>"+ minutesoutend + " นาที<br><font color='#ff0000'>ยังไม่ได้ลงเวลาออก</font>");            
          } else {
            $("#DateCheckOUT").html("ต้องลงเวลาออกงานใน<br>"+ hoursoutend +" ชั่วโมง "+ minutesoutend + " นาที<br><font color='#ff0000'>ยังไม่ได้ลงเวลาออก</font>");            
          }
          //$("#DateCheckOUT").html("คุณลงเวลาช้าไปแล้ว<br>"+ minutesoutnow + " นาที<br><font color='#ff0000'>* คุณออกงานสาย *</font>");
          //$("#DateCheckOUT").html("ลงเวลาออกงานภายใน<br>"+ minutesoutend + " นาที<br><font color='#ff0000'>* คุณออกงานสาย *</font>");
          $("#CheckOUTlate").html("ลงเวลาออกงานภายใน<br>"+ minutesoutend + " นาที<br><font color='#ff0000'>ยังไม่ได้ลงเวลาออก</font>");
        }        
      }     
      document.getElementById('loading1').style.display='none';
      document.getElementById('DateCheckOUT').style.display='block';
    }
  } else if(usercheckout!="") { 
    var str = "";
    str += ConvertDate(usercheckout)+"<br>";
    if(worktimeout_check==1) {
      str += "<font color='#12c230'>* ออกงานในเวลา *</font>"
    } else if(worktimeout_check==2) {
      str += "<font color='#ff0000'>* ออกงานสาย *</font>"
    } else {
      str += "<font color='#000000'>* ไม่ได้ลงเวลาออกงาน *</font>"      
    }
    $("#DateCheckOUT").html(str);
    $("#DateCheckConfirm").html(str);
      document.getElementById('loading1').style.display='none';
      document.getElementById('DateCheckOUT').style.display='block';
  }
  //document.getElementById('OpenCheckOUT').style.display='block';
}


function CheckTimeIN() {
  TimeCheckIN();
  document.getElementById('id01').style.display='block';
}

function TimeCheckIN() {
  str = "";
  str += '<div style="margin-top:20px;">';
  str += '<div id="ConfirmIN" class="btn btn-info btn-info-font" onclick="ConfirmIN('+ diffinnow +')" style="margin-right:5px;">';
  str += '<span><img src="./icon/icon-confirm.png" style="width:25px"></span> ยืนยันการเข้างาน</div>';
  str += '<div class="btn btn-info btn-info-font pink" onclick="CloseAll()"><span>';
  str += '<img src="./icon/icon-cancel.png" style="width:25px"></span> ยกเลิกรายการ</div></div>';
  str += '<div class="text-memo">การลงเวลานอกสถานที่ทำงาน หากระบบตรวจสอบพบ คุณจะมีความผิดและจะได้รับโทษจากบริษัทฯ ต่อไป</div>';
  $("#OpenCheckIN").html(str);
  console.log("diffin="+diffin+ " hoursin="+hoursin+" minutesin="+minutesin);
  document.getElementById('id01').style.display='block';
}


function ConfirmIN() {
  var FormatDatein = "";
  var worktimein_check = 0;
  var todayin = new Date();
  var startin = new Date(worktimein).getTime();
  //var startinend = new Date(worktimeinend).getTime();
  //var startout = new Date(worktimeout).getTime();
  var endout = new Date(todayin).getTime();
  var startinend = new Date(worktimeinend).getTime();
  //var startoutend = new Date(worktimeoutend).getTime();
  var Xdiffinnow =  endout - startin;
  var Xhoursinnow = String(Math.floor(Xdiffinnow / 1000 / 60 / 60)).padStart(2, "0");
  var Xminutesinnow = String(Math.floor(((Xdiffinnow/1000/60) %60)).toFixed(0)).padStart(2, "0");
  console.log("Xdiffinnow= "+Xdiffinnow+" Xhoursinnow= "+Xhoursinnow+" Xminutesinnow= "+Xminutesinnow);
  if(Xdiffinnow<=0) {
    worktimein_check = 1;
    worktimein_late = hoursin + ":" + minutesin;
    worktimein_late = "IN | "+String(hoursin).padStart(2, '0') + ":" + String(Math.ceil(minutesin)).padStart(2, '0');
  } else if(Xdiffinnow>0) { 
    worktimein_check = 2;
    worktimein_late = "Late | "+String(Xhoursinnow).padStart(2, '0') + ":" + String(Math.ceil(Xminutesinnow)).padStart(2, '0');
  }
  console.log("worktimein_check="+worktimein_check+" ||| worktimein_late="+worktimein_late);
  FormatDatein = todayin.getFullYear() + '/' + String(todayin.getMonth() + 1).padStart(2, '0') + '/' + String(todayin.getDate()).padStart(2, '0') + " " + String(todayin.getHours()).padStart(2, '0') + ":" + String(todayin.getMinutes()).padStart(2, '0') + ":" + String(todayin.getSeconds()).padStart(2, '0');
  dbHR_log.doc(EidMember).update({
     worktimein : FormatDatein,
     worktimein_check : parseFloat(worktimein_check.toFixed(0)),
     worktimein_late : worktimein_late
  }); 
  document.getElementById('OpenCheckIN').style.display='none';
  var str1 = "";
  str1 += '<div class="clr"></div>';
  str1 += '<div class="time-confirm-in"><u>ลงทะเบียนเข้างาน</u><br>ระบบได้ทำการบันทึกเวลา<br>การเข้างานของคุณเรียบร้อยแล้ว<br>'+ FormatDatein +'';
  str1 += '<div class="btn btn-info btn-info-font pink" onclick="CloseAll()" style="margin-top:15px;"><span>';
  str1 += '<img src="./icon/icon-cancel.png" style="width:25px"></span> ปิดหน้าต่างนี้</div></div></div>';
  $("#OpenCheckIN").html(str1);
  document.getElementById('OpenCheckIN').style.display='block';
  CheckDateLogin();
  ShowTimeing();
  document.getElementById('TimeIN').style.display='none';
  document.getElementById('TimeINnone').style.display='block';
  document.getElementById('TimeOUT').style.display='block';
  document.getElementById('TimeOUTnone').style.display='none';
}


function CheckTimeOUT() {
  TimeCheckOUT();
  document.getElementById('id02').style.display='block';
}


function TimeCheckOUT() {
  str = "";
  str += '<div style="margin-top:20px;">';
  str += '<div id="ConfirmOUT" class="btn btn-info btn-info-font" onclick="ConfirmOUT('+ diffoutend +')" style="margin-right:5px;">';
  str += '<span><img src="./icon/icon-confirm.png" style="width:25px"></span> ยืนยันการออกงาน</div>';
  str += '<div class="btn btn-info btn-info-font pink" onclick="CloseAll()"><span>';
  str += '<img src="./icon/icon-cancel.png" style="width:25px"></span> ยกเลิกรายการ</div></div>';
  str += '<div class="text-memo">การลงเวลานอกสถานที่ทำงาน หากระบบตรวจสอบพบ คุณจะมีความผิดและจะได้รับโทษจากบริษัทฯ ต่อไป</div>';
  $("#OpenCheckOUT").html(str);
  console.log("diffout="+diffout+ " hoursout="+hoursout+" minutesout="+minutesout);
  document.getElementById('id02').style.display='block';
}


function ConfirmOUT() {
  var FormatDateout = "";
  //var worktimeout_check = 0;
  var todayin = new Date();
  //var startin = new Date(worktimein).getTime();
  //var startinend = new Date(worktimeinend).getTime();
  var startout = new Date(worktimeout).getTime();
  var endout = new Date(todayin).getTime();
  var startinend = new Date(worktimeinend).getTime();
  //var startoutend = new Date(worktimeoutend).getTime();
  var Xdiffoutnow =  startout - endout;
  var Xhoursoutnow = String(Math.floor(Xdiffoutnow / 1000 / 60 / 60)).padStart(2, "0");
  var Xminutesoutnow = String(Math.floor(((Xdiffoutnow/1000/60) %60)).toFixed(0)).padStart(2, "0");
  console.log("Xdiffoutnow= "+Xdiffoutnow+" Xhoursoutnow= "+Xhoursoutnow+" Xminutesoutnow= "+Xminutesoutnow);
  if(Xdiffoutnow<=0) {
    worktimeout_check = 1;
    worktimeout_late = hoursout + ":" + minutesout;
    worktimeout_late = "IN | "+String(hoursout).padStart(2, '0') + ":" + String(Math.ceil(minutesout)).padStart(2, '0');
  } else if(Xdiffoutnow>0) { 
    worktimeout_check = 2;
    worktimeout_late = "Late | "+String(Xhoursoutnow).padStart(2, '0') + ":" + String(Math.ceil(Xminutesoutnow)).padStart(2, '0');
  }
  //console.log("worktimeout_check="+worktimeout_check+" ||| worktimeout_late="+worktimeout_late);
  FormatDateout = todayin.getFullYear() + '/' + String(todayin.getMonth() + 1).padStart(2, '0') + '/' + String(todayin.getDate()).padStart(2, '0') + " " + String(todayin.getHours()).padStart(2, '0') + ":" + String(todayin.getMinutes()).padStart(2, '0') + ":" + String(todayin.getSeconds()).padStart(2, '0');
  //console.log(worktimeout_late);
  dbHR_log.doc(EidMember).update({
     worktimeout : FormatDateout,
     worktimeout_check : parseFloat(worktimeout_check.toFixed(0)),
     worktimeout_late : worktimeout_late
  }); 

  document.getElementById('OpenCheckOUT').style.display='none';
  var str1 = "";
  str1 += '<div class="clr"></div>';
  str1 += '<div class="time-confirm-in"><u>ลงทะเบียนออกงาน</u><br>ระบบได้ทำการบันทึกเวลา<br>การออกงานของคุณเรียบร้อยแล้ว<br>'+ FormatDateout +'';
  str1 += '<div class="btn btn-info btn-info-font pink" onclick="CloseAll()" style="margin-top:15px;"><span>';
  str1 += '<img src="./icon/icon-cancel.png" style="width:25px"></span> ปิดหน้าต่างนี้</div></div></div>';
  $("#OpenCheckOUT").html(str1);
  CheckDateLogin();
  ShowTimeing();
  document.getElementById('OpenCheckOUT').style.display='block';
  document.getElementById('TimeOUT').style.display='none';
  document.getElementById('TimeOUTnone').style.display='none';
}


function Loadmenu() {
  //$("#loadmenu").html("<div class='radio-toolbar'><input type='radio' id='radio1' name='workingtime' value='1' onclick='ClickMenu(1)' checked><label for='radio1'>ลงเวลา</label><input type='radio' id='radio2' name='workingtime' value='2' onclick='ClickMenu(2)'><label for='radio2'>ขออนุมัติ</label><input type='radio' id='radio3' name='workingtime' value='3' onclick='ClickMenu(3)'><label for='radio3'>ประวัติการลงเวลา</label></div>");
  $("#loadmenu").html("<div class='radio-toolbar'><input type='radio' id='radio1' name='workingtime' value='1' onclick='ClickMenu(1)' checked><label for='radio1'>ลงเวลาเข้าศูนย์</label><input type='radio' id='radio2' name='workingtime' value='2' onclick='ClickMenu(2)'><label for='radio2'>ประวัติการเข้าศูนย์ไฟ-ฟ้า</label></div>");
}


function FaiFahLoctaion() {
  var str = "";
  str += '<fieldset class="checkbox-group" style="margin-top:5px;"><div class="radio-buttons">';
  for (var i = 0, length = arrLocation.length; i < length; i++) {
    if(arrLocation[i]==xLocation) {
      str += '<label class="custom-radio"><input type="radio" id="r'+ i +'" name="SelectPlace" value="'+ arrLocation[i] +'" checked>';
      str += '<span class="radio-btn"><i class="las la-check"></i><div class="hobbies-icon">';
      str += '<div><img src="./icon/'+ arrLocationE[i] +'.png"></div><div class="radio-label">'+ arrLocation[i] +'</div></div></span></label>';
    } else {
      str += '<label class="custom-radio"><input type="radio" id="r'+ i +'" name="SelectPlace" value="'+ arrLocation[i] +'">';
      str += '<span class="radio-btn"><i class="las la-check"></i><div class="hobbies-icon">';
      str += '<div><img src="./icon/'+ arrLocationE[i] +'.png"></div><div class="radio-label">'+ arrLocation[i] +'</div></div></span></label>';
    }
  } 
  str += '</fieldset></div>';
  $("#DisplayLocation").html(str);
}



function ClickMenu(x) {
  ShowTimeing();
  //var office = document.getElementById("Goffice").value;
  //var sex = document.getElementById("sex").value; = 1;
  var radios = document.getElementsByName('workingtime');
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      checkmenu = radios[i].value;
      break;
    }
  }
  switch (x) {
    case 2:
      document.getElementById('Menu1').style.display='none';
      document.getElementById('Menu2').style.display='block';
      //document.getElementById('Menu3').style.display='none';
      break;
    case 3:
      document.getElementById('Menu1').style.display='none';
      document.getElementById('Menu2').style.display='none';
      //document.getElementById('Menu3').style.display='block';
      break;
    default:
      document.getElementById('Menu1').style.display='block';
      document.getElementById('Menu2').style.display='none';
      //document.getElementById('Menu3').style.display='none';
  }
}


function ConvertDate(x) {
  //console.log("X"+x);
  var monthNames = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
      "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม.",
      "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];
  var today = new Date(x);
  var day = today.getDate() + "";
  var month = (today.getMonth() + 1) + "";
  var year = (today.getFullYear()+543) + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  return day + " " + monthNames[today.getMonth() + 1] + " " + year + "<br>" + hour + ":" + minutes + ":" + seconds +" น.";
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
}
