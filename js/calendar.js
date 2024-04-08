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

  }

  next() {
    const {
      month } =
    this.state;

    this.setState({
      month: month.add(1, 'month') });

  }

  select(day) {
    this.setState({
      selected: day.date,
      month: day.date.clone() });

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

      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
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

      days.push( /*#__PURE__*/
      React.createElement(Day, { day: day,
        selected: selected,
        select: select }));


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

  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Calendar, null), document.getElementById('cal'));



function CheckTapMemo(x) {
    console.log(x);
  }  