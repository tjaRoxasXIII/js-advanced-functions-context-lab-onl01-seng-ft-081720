/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function (record) {
    let employee = {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

let createEmployeeRecords = function(nestArr) {
    let empList = []
    for(const arr of nestArr) {
        empList.push(createEmployeeRecord(arr))
    }
    return empList
}

let createTimeInEvent = function(timeIn) {
    let event = {
        type: 'TimeIn',
        hour: parseInt(timeIn.split(' ')[1]),
        date: timeIn.split(' ')[0]
    }
    this.timeInEvents.push(event)
    return this

}

let createTimeOutEvent = function(timeOut) {
    let event = {
        type: 'TimeOut',
        hour: parseInt(timeOut.split(' ')[1]),
        date: timeOut.split(' ')[0]
    }
    this.timeOutEvents.push(event)
    return this
}

let hoursWorkedOnDate = function(date) {
    let i = this.timeInEvents.find(e => e.date === date)
    let o = this.timeOutEvents.find(e => e.date === date)
    return (o.hour - i.hour) / 100
}

let wagesEarnedOnDate = function(date) {
    let pay = this.payPerHour
    let hours = hoursWorkedOnDate.call(this, date)
    
    return pay * hours
}

let calculatePayroll = function(arr){
    return arr.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }