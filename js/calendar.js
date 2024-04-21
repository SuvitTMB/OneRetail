var thday = new Array ("อาทิตย์","จันทร์","อังคาร","พุธ","พฤหัส","ศุกร์","เสาร์");
var thmonth = new Array ("ธันวาคม","มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน", "กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน");
//document.write("วัน" + thday[now.getDay()]+ "ที่ "+ now.getDate()+ " " +thmonth[now.getMonth()]+ " " + (0+now.getYear()+543));</script></p>
var xDate_today = 0;
var xDate_number = 0;
var xDate_text= "";
var xMonth_number = 0;
var xMonth_text = "";
var xYear_number = 0;
var xCheckMonth = 0;
var xDate = "";
//var objectDate = new Date();

$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Academy")==null || sessionStorage.getItem("LineID")==null) { location.href = "index.html"; }
  //Connect_DB();
  //CalendarToMonth();
});

Connect_DB();

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: moment(),
      selected: moment().startOf('day') };
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  previous() {
    const {
      month } =
    this.state;
    this.setState({
      month: month.subtract(1, 'month') });
    //CalendarToMonth();
  }

  next() {
    const {
      month } =
    this.state;
    this.setState({
      month: month.add(1, 'month') });
    //CalendarToMonth();
  }

  select(day) {
    this.setState({
      selected: day.date,
      month: day.date.clone() });
//alert("click="+day.date);
      var xDate = new Date(day.date);
    //xYear_number = date.getFullYear();
      //xDate_number = xDate;
      xDate_number = xDate;
      console.log("xDate_number="+xDate_number.getDate());
      xDate_number = xDate_number.getDate();
      //console.log("xDate_number="+day.date);
      //CalendarToMonth();

    //console.log(day.date);
    //console.log(xYear_number);
  }


  renderWeeks() {
    let weeks = [];
    let done = false;
    let date = this.state.month.clone().startOf("month").add("w" - 1).day("Sunday");
    let count = 0;
    let monthIndex = date.month();
    const {
      selected,
      month } =
    this.state;

    while (!done) {
      weeks.push( /*#__PURE__*/
      React.createElement(Week, { key: date,
        date: date.clone(),
        month: month,
        select: day => this.select(day),
        selected: selected }));
      date.add(1, "w");

      //console.log("Clone="+date.clone());

      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
      if(done==true) {
        xMonth_number = monthIndex;
        xMonth_text = thmonth[monthIndex];
        if(xMonth_number==0) {
          xYear_number = (date.year()-1);
        } else {
          xYear_number = date.year();
        }

        if(xMonth_number!=xCheckMonth) {
          document.getElementById('loading').style.display='block';
          document.getElementById('DisplayCalendar').style.display='none';
          CalendarToMonth();
          console.log("month = "+monthIndex);
          console.log("xCheckMonth = "+xCheckMonth);
          console.log(thmonth[monthIndex]);
          console.log("year = "+xYear_number);
          xCheckMonth = xMonth_number;  
        } else {
          OpenCalendar();
        }

      }    
    }
    return weeks;
  }

  renderMonthLabel() {
    const {
      month } =
    this.state;

    return /*#__PURE__*/React.createElement("span", { className: "month-label" }, month.format("MMMM YYYY"));
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("section", { className: "calendar" }, /*#__PURE__*/
      React.createElement("header", { className: "header" }, /*#__PURE__*/
      React.createElement("div", { className: "month-display row" },
      this.renderMonthLabel(), /*#__PURE__*/
      React.createElement("i", { className: "fa fa-arrow-left", onClick: this.previous }), /*#__PURE__*/

      React.createElement("i", { className: "fa fa-arrow-right", onClick: this.next })), /*#__PURE__*/

      React.createElement(DayNames, null)),

      this.renderWeeks()));
    //console.log(this.previous+"==="+this.next);
  }}


class DayNames extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "row day-names" }, /*#__PURE__*/
      React.createElement("span", { className: "day" }, "S"), /*#__PURE__*/
      React.createElement("span", { className: "day" }, "M"), /*#__PURE__*/
      React.createElement("span", { className: "day" }, "T"), /*#__PURE__*/
      React.createElement("span", { className: "day" }, "W"), /*#__PURE__*/
      React.createElement("span", { className: "day" }, "T"), /*#__PURE__*/
      React.createElement("span", { className: "day" }, "F"), /*#__PURE__*/
      React.createElement("span", { className: "day" }, "S")));
  }}


class Week extends React.Component {
  render() {
    let days = [];
    let {
      date } =
    this.props;
    //console.log(date);

    const {
      month,
      selected,
      select } =
    this.props;

    for (var i = 0; i < 7; i++) {
      let day = {
        name: date.format("dd").substring(0, 1),
        number: date.date(),
        isCurrentMonth: date.month() === month.month(),
        isToday: date.isSame(new Date(), "day"),
        date: date };

if(date.isSame(new Date(), "day")) {
  console.log(date.date());
  xDate_today = date.date();
  console.log("Date="+date.date());
}


      days.push( /*#__PURE__*/
      React.createElement(Day, { day: day,
        selected: selected,
        select: select }));
//console.log(day[0]);

      date = date.clone();
      date.add(1, "day");
    }

    return /*#__PURE__*/(
      React.createElement("div", { className: "row week", key: days[0] },
      days));


  }}



class Day extends React.Component {
  render() {
    const {
      day,
      day: {
        date,
        isCurrentMonth,
        isToday,
        number },

      select,
      selected } =
    this.props;


    return /*#__PURE__*/(
      React.createElement("span", {
        key: date.toString(),
        className: "day" + (isToday ? " today" : "") + (isCurrentMonth ? "" : " different-month") + (date.isSame(selected) ? " selected" : ""),
        onClick: () => select(day) }, number));

//alert("click");
//console.log(date.isSame(selected));
//console.log(select(number));
//console.log(number);

        //console.log(select(day)+"==="+number);
  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Calendar, null), document.getElementById('cal'));



function CheckTapMemo(x) {
    console.log(x);
  }  



function CalendarToMonth() {

//console.log("Month000="+xMonth_number);
//console.log(xMonth_text);
//console.log("Year="+xYear_number);

  var i = 0;
  var str = "";
  var xCheck = 0;
  str += '<div class="upcoming">';
  str += '<center><div class="up-title"><b>ตารางการอบรมประจำเดือน'+ xMonth_text +' ปี '+ (xYear_number+543) +'</b></div></center>';
  str += '<ul class="up-plan">';
  dbCalendar.where('StatusTraining','==',0)
  .where('YearTraining','==',xYear_number)
  .where('MonthTraining','==',xMonth_number)
  .orderBy('DateTraining','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xCheck = 1;
      str += '<li style="margin-top:10px;"><div class="roundhead">'+ (i+1) +'</div><b>'+ doc.data().HeadTraining +'</b><br>'+ doc.data().DateUseTraining +' ('+ doc.data().DayUseTraining +' วัน)';
      str += '<div class="secondo">'+ doc.data().DetailTraining +'</div>';
      str += '<div class="textline">กลุ่ม : <b>'+ doc.data().EmpGroup +'</b> | ตำแหน่ง : <b>'+ doc.data().EmpPosition +'</b></div></li>';
      i++;
      //str += '';
    });
    if(xCheck==0) {
      str += '<div class="notraining">ยังไม่มีกำหนดการอบรมในเดือนนี้</div>';
    }
    str += '</ul><div class="clr" style="height:10px;"></div>';
    str += '</div>';
    $("#DisplayCalendar").html(str); 
    document.getElementById('loading').style.display='none';
    document.getElementById('DisplayCalendar').style.display='block';
  });

}


function OpenCalendar() {
  var i = 0;
  var str = "";
  var xCheck = 0;

  str += '<div class="up-title" style="margin:15px auto 10px auto;"><b>ตารางการอบรม : '+ xDate_number +'/'+ xCheckMonth +'/'+ xYear_number +'</b></div>';
  str += '<ul class="up-plan">';
  //str += '<div class="notraining" style="height: 200px; padding-top:90px">ไม่มีการอบรมในวันนี้</div>';
  //str += '<center><div onclick="CloseAll()" class="btn-t2" style="margin-top:25px;">ปิดหน้าต่าง</div></center>';EmpinClass
  dbCalendar
  .where('StatusTraining','==',0)
  .where('YearTraining','==',xYear_number)
  .where('MonthTraining','==',xMonth_number)
  .where('DateTraining','==',xDate_number)
  .orderBy('DateTraining','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xCheck = 1;
      str += '<li style="margin-top:10px;"><div class="roundhead">'+ (i+1) +'</div><div style="height: 30px;"><b>'+ doc.data().HeadTraining +'</b></div></div>';
      str += '<div class="secondo">'+ doc.data().DetailTraining +'</div>';
      str += '<div class="textline" style="margin-top:8px;">กลุ่ม : <b>'+ doc.data().EmpGroup +'</b><br>ตำแหน่ง : <b>'+ doc.data().EmpPosition +'</b>';
      str += '<br>ว้นที่ : <b>'+ doc.data().DateUseTraining +' ('+ doc.data().DayUseTraining +' วัน)</b><br>เวลา : <b>'+doc.data().TimeUseTraining+'</b>';
      str += '<br>สถานที่ : <b>'+ doc.data().PlaceTraining +'</b>';
      str += '<br>จำนวนผู้เข้าอบรม : <b>'+ doc.data().EmpinClass +' คน</b></div>';
      str += '</li>';
      i++;
    });
    if(xCheck==0) {
      str += '<div class="notraining" style="height: 200px; padding-top:90px">ไม่มีการอบรมในวันนี้</div>';
    }
    str += '</ul><div class="clr"></div>';
    str += '<center><div onclick="CloseAll()" class="btn-grey" style="margin:25px auto 20px auto;">ปิดหน้าต่าง</div></center>';
    $("#DisplayToDay").html(str); 
    document.getElementById('id01').style.display='block';
  });
  //console.log("Open Calendar = "+xDate_number+"/"+xCheckMonth+"/"+xYear_number);
}

function CloseAll() {
  document.getElementById('id01').style.display='none';
}



      
        
        
          
            
            
        
      