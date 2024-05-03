var xProfile = "";
var gProfile = "";
var xEmpID = "";
var AA = 0;
var xCountIN = 0;
xHeaderNews = "30 Days Login";
xHeaderLog = "รับรางวัลจากการเข้าร่วมกิจกรรม 30 วันแรก";
xHeaderPoint = 1;


$(document).ready(function () {
  
  sessionStorage.clear(); 
  var str = "";
  var str1 = "";
  var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
  var sLineName = "Website";
  var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
  sessionStorage.setItem("LineID", sLineID);
  sessionStorage.setItem("LineName", sLineName);
  sessionStorage.setItem("LinePicture", sLinePicture);
  location.href = "learning_vdo.html";

  //Connect_DB();
  //CheckData();


  //main();
});


async function main() {
  await liff.init({ liffId: "1657509542-PvJkX9Om" });
  document.getElementById("isLoggedIn").append(liff.isLoggedIn());
  if(liff.isLoggedIn()) {
    getUserProfile();
  } else {
    liff.login();
  }
}


async function getUserProfile() {
  var str = "";
  var str1 = "";
  const profile = await liff.getProfile();
  sessionStorage.setItem("LineID", profile.userId);
  sessionStorage.setItem("LineName", profile.displayName);
  sessionStorage.setItem("LinePicture", profile.pictureUrl);
  location.href = "learning_vdo.html";
}


function openWindow() {
  liff.openWindow({
    url: "https://line.me",
    external: true     
  })
}

