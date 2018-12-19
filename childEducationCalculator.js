var productDetails = {
	"productone": "Reliance Nippon Life Fixed Money Back",
	"producttwo": "Reliance Nippon Life Increasing Income Insurance Plan"
}
$m.juci.addDataset("designation", [{
	"value": "Doctor"
}, {
	"value": "Engineer"
}, {
	"value": "MBA"
}, {
	"value": "Lawyer"
}, {
	"value": "Pilot"
}, {
	"value": "Architect"
}, {
	"value": "Hotel Management"
}, {
	"value": "Fashion Designer"
}, {
	"value": "Other"
}]);
//$m.juci.addDataset("child_result", false);
$m.juci.addDataset("quantity", "");
$m.juci.addDataset("childtabs", {
	"childone": true,
	"childtwo": false,
	"childthree": false,
	"childfour": false
});
$m.juci.addDataset("proceed", false);
$m.juci.addDataset("child_productname", productDetails);
$m.juci.addDataset("child_productname1", [{
	"title": "Reliance Nippon Life Fixed Money Back",
	"content": "To keep up with the growing needs at every stage of life, you need a savings plan that can also safeguard your future.",
	"subContent": "Fixed money back benefits and guaranteed maturity benefits",
	"productCode": 146
}, {
	"title": "Reliance Nippon Life Increasing Income Insurance Plan",
	"content": "With time you would aspire for a bigger house, an expensive car, admission in the best school and a good higher education for your children. Your savings need to power these dreams of tomorrow.",
	"subContent": "Regular monthly income that increases every year",
	"productCode": 137
}]);





$m.onReady(function () {
	$m.juci.dataset("childtabs", {
		"childone": true,
		"childtwo": false,
		"childthree": false,
		"childfour": false
	});
	$m.juci.findById("resultone").hide();
	$m.juci.findById("resulttwo").hide();
	$m.juci.findById("resultthree").hide();
	$m.juci.findById("resultfour").hide();
});

$m.onData(function (eventObject) {
	reset();
	var data = eventObject.data;
});

function formatValue(e) {
	return e.value;
}

function formatValueCompare(i1, i2) {
	return i1.value == i2.value;
}

function formatChildOne(e) {
	return e.value;
}

function CompareChildOne(i1, i2) {

	return i1.value == i2.value;
}

function formatChildTwo(e) {
	return e.value;
}

function CompareChildTwo(i1, i2) {
	return i1.value == i2.value;
}

function formatChildThree(e) {
	return e.value;
}

function CompareChildThree(i1, i2) {
	return i1.value == i2.value;
}

function formatChildFour(e) {
	return e.value;
}

function CompareChildFour(i1, i2) {
	return i1.value == i2.value;
}

function childcalculate(evnt) {

}

var g = 1;
function incrementValue1() {
	var value = parseInt(document.getElementById('number').value, 10);
	value = isNaN(value) ? 0 : value;

	if (value < 4) {
		value++;
		document.getElementById('number').value = value;
		console.log("inc", value);
		g = value;
		child1();
	} else {
		$m.alert("Maximum Number is 4");
	}
}

function decrementValue1() {
	var value = parseInt(document.getElementById('number').value, 10);
	value = isNaN(value) ? 0 : value;
	if (value <= 1) {
		console.log("can not");
	}
	else {
		value--;
	}
	document.getElementById('number').value = value;
	console.log("dec", value);
	g = value;
	child1();
}


function child1() {
	juci.dataset("child_result", false);
	var childCount = juci.dataset("childcalculate");
	resetOutput();
	if (g == "1") {
		childCount.childone.display = true;
		childCount.childtwo.display = false;
		childCount.childthree.display = false;
		childCount.childfour.display = false;
	}
	else if (g == "2") {
		childCount.childone.display = true;
		childCount.childtwo.display = true;
		childCount.childthree.display = false;
		childCount.childfour.display = false;
	}
	else if (g == "3") {
		childCount.childone.display = true;
		childCount.childtwo.display = true;
		childCount.childthree.display = true;
		childCount.childfour.display = false;
	}
	else if (g == "4") {
		childCount.childone.display = true;
		childCount.childtwo.display = true;
		childCount.childthree.display = true;
		childCount.childfour.display = true;
	}
	else if (g == "5") {
		$m.alert("Maximum number is 4");
	}
	juci.dataset("childcalculate", childCount);
	$m.juci.dataset("proceed", true);
}



function reset() {
	var childCount = juci.dataset("childcalculate");
	var child = {
		"childone": {
			"display": true,
			"name": "",
			"age": "",
			"savings": "",
			"designation": "",
			"costestimation": "",
			"ageEst": ""
		},
		"childtwo": {
			"display": false,
			"name": "",
			"age": "",
			"savings": "",
			"designation": "",
			"costestimation": "",
			"ageEst": ""
		},
		"childthree": {
			"display": false,
			"name": "",
			"age": "",
			"savings": "",
			"designation": "",
			"costestimation": "",
			"ageEst": ""
		},
		"childfour": {
			"display": false,
			"name": "",
			"age": "",
			"savings": "",
			"designation": "",
			"costestimation": "",
			"ageEst": ""
		}
	};
	childCount = child;
	juci.dataset("childcalculate", childCount);
	juci.dataset("child_result", false);
	document.getElementById('number').value = "1";
}

function resetOutput() {
	juci.dataset("child_result", false);
	$m.juci.findById("resultone").hide();
	$m.juci.findById("resulttwo").hide();
	$m.juci.findById("resultthree").hide();
	$m.juci.findById("resultfour").hide();
	var child_output = juci.dataset("childResult");
	child_output = {
		"FirstChildSaveAmount": "",
		"FourthChildAmountvalue": "",
		"FourthChildInfo": "",
		"FourthChildSaveAmount": "",
		"FristChildAmountvalue": "",
		"FristChildInfo": "",
		"Message": "",
		"SecondChildAmountvalue": "",
		"SecondChildInfo": "",
		"SecondChildSaveAmount": "",
		"Status": "",
		"ThreeChildAmountvalue": "",
		"ThreeChildInfo": "",
		"ThreeChildSaveAmount": ""
	}
	juci.dataset("childResult", child_output);
}

function labelChange(event, index, index2, index3) {

	if (index3) {
		utils.ChangeLabelName(event.value.value._latestValue, index, index2, index3);
	} else {
		utils.ChangeLabelName(event.target.value, index, index2, index3);
	}

	if (event.control._id == "childone") {
		juci.findById("childone").addClass("childsel1");
		juci.findById("childone").removeClass("childsel");
	}
	else if (event.control._id == "childtwo") {
		juci.findById("childtwo").addClass("childsel2");
		juci.findById("childtwo").removeClass("childsel");
	}
	else if (event.control._id == "childthree") {
		juci.findById("childthree").addClass("childsel3");
		juci.findById("childthree").removeClass("childsel");
	}
	else {
		juci.findById("childfour").addClass("childsel4");
		juci.findById("childfour").removeClass("childsel");
	}
}


function exitc() {
	$m.juci.dataset("isCalculator", true);
	$m.juci.findById("hlv_calculator").hide();
	$m.juci.findById("tax_calculator").hide();
	$m.juci.findById("retirement_calculator").hide();
	$m.juci.findById("child_calculator").hide();
	$m.juci.findById("fhs_calculator").hide();
	$m.juci.dataset("childCalculate", "");
}
function childcalculate(event) {
	resetOutput();
	agest();
	var quan = {
		value: g
	};
	juci.dataset("quantity", quan);
	var isValid = validation(event);
	if (isValid.status) {
		Calculation.childCalculate(event);
	}
	else {
		$m.alert(isValid.Message);
	}
}

function validation(event) {
	var data = finalcal;
	var result = {};
	for (var key in data) {
		var child = data[key]
		if (child.display) {
			var child_age = parseInt(child.age);
			var child_estage = parseInt(child.ageEst);
			var child_savings = child.savings;
			var child_designation = child.designation.value;
			var child_costestimation = child.costestimation;
			if (child.name == NaN || child.name == null || child.name == undefined || child.name == "") {
				result.status = false;
				result.Message = "Please enter the Name";
			}
			else if (child_age == NaN || child_age == null || child_age == undefined || child_age == "" || !/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(child_age)) {
				result.status = false;
				result.Message = "Please enter the Valid Current Age";
			}
			else if (child_estage == NaN || child_estage == null || child_estage == undefined || child_estage == "" || !/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(child_estage)) {
				result.status = false;
				result.Message = "Please enter the Valid Estimated Age";
			}
			else if (child_savings == NaN || child_savings == null || child_savings == undefined || child_savings == "" || !/^[0-9]*$/.test(child_savings)) {
				result.status = false;
				result.Message = "Please enter the Valid Amount";
			}
			else if (child_designation == NaN || child_designation == null || child_designation == undefined || child_designation == "") {
				result.status = false;
				result.Message = "Please select the designation";
			}
			else if (child_costestimation == NaN || child_costestimation == null || child_costestimation == undefined || child_costestimation == "" || !/^[0-9]*$/.test(child_costestimation)) {
				result.status = false;
				result.Message = "Please enter the Valid Amount";
			}
			else if (child_age >= child_estage) {
				result.status = false;
				result.Message = "Current Age(" + child_age + ") cannot be greater than or Equal to Estimation Age(" + child_estage + ")";
			}
		}
	}
	if (result.status == undefined) {
		result.status = true;
	}
	return result;
}

function toggleView(event) {
	switch (event.newToggled) {
		case 0:
			$m.juci.findById("resultone").show();
			$m.juci.findById("resulttwo").hide();
			$m.juci.findById("resultthree").hide();
			$m.juci.findById("resultfour").hide();
			break;
		case 1:
			$m.juci.findById("resultone").hide();
			$m.juci.findById("resulttwo").show();
			$m.juci.findById("resultthree").hide();
			$m.juci.findById("resultfour").hide();
			break;
		case 2:
			$m.juci.findById("resultone").hide();
			$m.juci.findById("resulttwo").hide();
			$m.juci.findById("resultthree").show();
			$m.juci.findById("resultfour").hide();
			break;
		case 3:
			$m.juci.findById("resultone").hide();
			$m.juci.findById("resulttwo").hide();
			$m.juci.findById("resultthree").hide();
			$m.juci.findById("resultfour").show();
			break;
	}
}

var finalcal;
function agest() {
	if ($m.juci.dataset("childcalculate").childone.display == true) {
		var a = $m.juci.dataset("childcalculate");
		a.childone.ageEst = $m.juci.getControl("cage1").value();
		if (a.childone.ageEst == "") {
			$m.toast("please enter all fields")
			$m.juci.dataset("childcalculate", a);
		} else {
			$m.juci.dataset("childcalculate", a);
		}
	}
	if ($m.juci.dataset("childcalculate").childtwo.display == true) {
		var b = $m.juci.dataset("childcalculate");
		b.childtwo.ageEst = $m.juci.getControl("cage2").value();
		if (b.childtwo.ageEst == "") {
			$m.toast("please enter all fields");
			$m.juci.dataset("childcalculate", b);
		} else {
			$m.juci.dataset("childcalculate", b);
		}
	}
	if ($m.juci.dataset("childcalculate").childthree.display == true) {
		var c = $m.juci.dataset("childcalculate");
		c.childthree.ageEst = $m.juci.getControl("cage3").value();
		if (c.childthree.ageEst == "") {
			$m.toast("please enter all fields");
			$m.juci.dataset("childcalculate", c);
		} else {
			$m.juci.dataset("childcalculate", c);
		}
	}
	if ($m.juci.dataset("childcalculate").childfour.display == true) {
		var d = $m.juci.dataset("childcalculate");
		d.childfour.ageEst = $m.juci.getControl("cage4").value();
		if (d.childfour.ageEst == "") {
			$m.toast("please enter all fields");
			$m.juci.dataset("childcalculate", d);
		} else {
			$m.juci.dataset("childcalculate", d);
		}
	}
	finalcal = $m.juci.dataset("childcalculate");
}

