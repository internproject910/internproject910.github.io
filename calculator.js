function refreshRecentResults() {  
  var table = document.getElementById("recentResults");
  table.innerHTML = "";
  var calculatorRef = firebase.database().ref().limitToLast(10);;
  calculatorRef.once('value',   function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var row = table.insertRow(0);
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      var cell3 = row.insertCell(3);
      var cell4 = row.insertCell(4);
      cell0.innerHTML = childSnapshot.val().NumberA;
      cell1.innerHTML = childSnapshot.val().Operator;
      cell2.innerHTML = childSnapshot.val().NumberB;
      cell3.innerHTML = "=";
      cell4.innerHTML = childSnapshot.val().Result;
    });
  });
  
}

function isNumeric(value) {
        return /^-?\d+$/.test(value);
    }

function doCalculation() {

  var a = document.getElementById("a").value;
  var b = document.getElementById("b").value;
  var operator = document.getElementById("operator").value;
  var result;

  if (!isNumeric(a)) {
     document.getElementById("result").value = "invalid input number (1)";
    return;
  }
  
  if (!isNumeric(b)) {
     document.getElementById("result").value = "invalid input number (2)";
    return;
  }
  
  if (operator === "+") {
    result = parseInt(a) + parseInt(b);
  } else if (operator === "-") {
    result = parseInt(a) - parseInt(b);
  } else if (operator === "*") {
    result = parseInt(a) * parseInt(b);
  } else if (operator === "/") {
    if (b == 0) {
      document.getElementById("result").value = "invalid input number (2)";
      return;
    } else {
      result = parseInt(a) / parseInt(b);
    }
  } else {
    document.getElementById("result").value = "invalid operator";
    return;
  }
  
  document.getElementById("result").value = result;
  
  var calculatorRef = firebase.database().ref();
  calculatorRef.push (
   {
      NumberA: a,
     Operator: operator,
     NumberB: b,
     Result: result
   }
  );
  
 refreshRecentResults();
  
  
}
