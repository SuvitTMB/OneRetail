var EidProfile = "";
//var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var xdateCheck = "";
var sCountView = 0;
var sCheckStatus = 2;


$(document).ready(function () {
  if(sessionStorage.getItem("LineName")==null) { location.href = "index.html"; }
  var str = "";
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="show-profile" width="130px"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
  CheckData();
});



function CheckData() {
  dbProfile.where('LineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckFoundData = doc.data().StatusConfirm;
      if(CheckFoundData==9) {
        alert("ยกเลิกการใช้งาน");
        //location.href = "cancelpage.html";
      } else if(CheckFoundData==2) { 
        EidProfile = doc.id;
        document.getElementById("txtEmpID").value = doc.data().EmpID;
        document.getElementById('txtEmpID').setAttribute("class","DisableEmpID"); 
        document.getElementById("txtEmpName").value = doc.data().EmpName;
        document.getElementById('txtEmpName').setAttribute("class","DisableEmpID"); 
        document.getElementById("txtEmpPhone").value = doc.data().EmpPhone;
        //document.getElementById("txtEmpRH").value = doc.data().empRH;
        //document.getElementById("txtEmpBR").value = doc.data().empBr;
        document.getElementById("txtEmpAddress").value = doc.data().EmpAddress;
        if(doc.data().DateRegister!="") {
          document.getElementById("txtEmpAccept").checked = true;
          $("#DisplayDateRegister").html("<div class='confirmdate'> ยืนยันแล้วเมื่อ "+doc.data().DateRegister+"</div>");
        //} else {
        //  document.getElementById("txtDateRegister").checked = false;
        }
      }
    });
  });
}


var sCheckBottom = 0;
function CheckRegister() {
  NewDate();
  //alert(xdateCheck);
  //alert(EidProfile);
  var str="";
  sCheckBottom = 0;
  stxtEmpID = document.getElementById("txtEmpID").value;
  stxtEmpName = document.getElementById("txtEmpName").value;
  stxtEmpPhone = document.getElementById("txtEmpPhone").value;
  stxtEmpAddress = document.getElementById("txtEmpAddress").value;
  stxtEmpAccept = $('#txtEmpAccept').is(':checked')

  if(stxtEmpID !== null && stxtEmpID !== '') { sCheckBottom = sCheckBottom+1; } else { str += '- กรุณากรอกรหัสพนักงาน<br>'; }
  if(stxtEmpName !== null && stxtEmpName !== '') { sCheckBottom = sCheckBottom+1; } else { str += '- กรุณากรอกชื่อ-นามสกุลของท่าน<br>'; }
  if(stxtEmpPhone !== null && stxtEmpPhone !== '') { sCheckBottom = sCheckBottom+1; } else { str += '- กรุณากรอกหมายเลขโทรศัพท์ของท่าน<br>'; }
  if(sCheckBottom!=3) { 
    $("#MessageShow").html('<div style="text-align: left;margin: 10px 0; font-size: 13px; color:#000;line-height: 1.3;font-weight: 300;">'+ str +'</div>');  
    document.getElementById('id01').style.display='block';
    //alert("คุณยังกรอกข้อมูลไม่ครบถ้วน\n\n"+str);
  }
  if(stxtEmpAccept == true && sCheckBottom==3) { 
    CheckUserProfile(stxtEmpID);
  }
}


function CheckUserProfile(x) {
  NewDate();
  dbCheckMember.where('xEmpID','==',parseFloat(x))
  .where('xTeamGroup','in',['Retail','AL'])
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sCheckStatus = 1;
      sessionStorage.setItem("xTeamGroup", doc.data().xTeamGroup);
      sessionStorage.setItem("xBranch", doc.data().xBranch);
      sessionStorage.setItem("xDepartment", doc.data().xDepartment);
      sessionStorage.setItem("xGroup", doc.data().xGroup);
      sessionStorage.setItem("xChief_th", doc.data().xChief_th);
      sessionStorage.setItem("xChief_eng", doc.data().xChief_eng);
      sessionStorage.setItem("xPosition", doc.data().xPosition);
    });

    if(EidProfile=="") {
      dbProfile.add({
        LineID: sessionStorage.getItem("LineID"),
        Linename: sessionStorage.getItem("LineName"),
        LinePicture: sessionStorage.getItem("LinePicture"),
        EmpID: stxtEmpID,
        EmpName: stxtEmpName,
        EmpPhone: stxtEmpPhone,
        EmpAddress: stxtEmpAddress,
        xTeamGroup: sessionStorage.getItem("xTeamGroup"),
        xBranch: sessionStorage.getItem("xBranch"),
        xDepartment: sessionStorage.getItem("xDepartment"),
        xGroup: sessionStorage.getItem("xGroup"),
        xChief_th: sessionStorage.getItem("xChief_th"),
        xChief_eng: sessionStorage.getItem("xChief_eng"),
        xPosition: sessionStorage.getItem("xPosition"),
        //StatusConfirm : 1,
        //StatusEdit : 1,
        //StatusPass : 0,
        Admin_Pulse: 0,
        Admin_News: 0,
        Admin_Web: 0,
        Admin_Chat: 0,
        EmpCheckIN: 0,
        JoinTime: 0,
        Level_Point: 0,
        XP_Point: 0,
        RP_Point: 0,
        QS_Point: 0,
        PulseRatio: 0,
        PulseScore: 0,
        PulseCount: 0,
        Choice1: 0,
        Choice2: 0,
        Choice3: 0,
        Choice4: 0,
        Choice5: 0,
        SumChoice: 0,
        DateToDay: thistoday,
        LastUpdate: dateString,
        DateAccept: dateString,
        LastCheckIN: dateString,
        DateRegister: dateString
      });
      //console.log(x);
      document.getElementById('id02').style.display='block';
    } else {
      location.href = "index.html";
    }
  });
}


function CheckButtomClick() {
  if($('#txtEmpAccept').is(':checked')) {
    $('#SubmitApp').removeClass('disabledbutton');
  } else {
    var element = document.getElementById("SubmitApp");
    element.classList.add("disabledbutton");
  }
}

function GotoHome() {
  location.href = "index.html";
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
}
