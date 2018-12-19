var employee = [{
	"type": "Salaried"
}, {
	"type": "Self employed"
}]
$m.juci.addDataset("employeetype", employee);
$m.juci.addDataset("tax_result", false);
$m.juci.addDataset("salaried", true);
$m.juci.addDataset("self", false);
var productDetails = {
	"productone": "Reliance Nippon Life Smart Savings Insurance Plan",
	"producttwo": "Reliance Nippon Life Increasing Income Plan",
	"productthree": "Reliance Nippon Life Fixed Money Back Plan"
};

$m.juci.addDataset("tax_productname", productDetails);
$m.juci.addDataset("tax_productname1", [{
	"title": "Reliance Nippon Life Increasing Income Insurance Plan",
	"content": "With time you would aspire for a bigger house, an expensive car, admission in the best school and a good higher education for your children. Your savings need to power these dreams of tomorrow.",
	"subContent": "Regular monthly income that increases every year",
	"productCode": 137,
}, {
	"title": "Reliance Nippon Life Smart Savings Insurance Plan",
	"content": "A Plan that automatically changes your investment profile with changing life-stage",
	"subContent": "Automatically adjust to your risk appetite, by balancing between equity and debt through a systematic asset allocation strategy based on your life-stage",
	"productCode": 163,
}, {
	"title": "Reliance Nippon Life Fixed Money Back Plan",
	"content": "To keep up with the growing needs at every stage of life, you need a savings plan that can also safeguard your future.",
	"subContent": "Fixed money back benefits and guaranteed maturity benefits",
	"productCode": 146,
},]
);

//$m.juci.addDataset("tax1", true);
$m.juci.addDataset("taxi1", true);
$m.juci.addDataset("tax1", false);
$m.juci.addDataset("tax2", false);
$m.juci.addDataset("retbck1", false);
$m.juci.addDataset("retbck", false);
$m.juci.addDataset("exittax", false);





var emp;

function exit() {
	$m.open("com.cloudpact.mowbly.home", "/system/home.html", null);
}

function formatEmployeeType(e) {
	return e.type;
}

function CompareEmployeeType(i1, i2) {
	return i1.type == i2.type;
}

function taxCalculate(event) {
	var a = $m.juci.dataset("taxCalculator");
	a.interesthomeloan = $m.juci.getControl("tintst").value();
	a.interesteducation = $m.juci.getControl("tinstedu").value();
	a.interesttta = $m.juci.getControl("tinstinc").value();
	a.otherdeduction = $m.juci.getControl("tinstod").value();
	$m.juci.dataset("taxCalculator", a);
	if (a.interesthomeloan == "" || a.interesteducation == "" || a.interesttta == "" || a.otherdeduction == "") {
		$m.toast("please enter all the fields");
	} else {
		Calculation.taxCalculate(event);
	}

}


function parseIntValue(value) {
	var data = value ? value.split(",").join("") : 0;
	return parseInt(data);
}

function employeeType(event) {
	var value = event.value.type._latestValue
	if (value == "Self employed") {
		$m.juci.dataset("self", false);
		$m.juci.dataset("salaried", true);
	} else {
		$m.juci.dataset("self", true);
		$m.juci.dataset("salaried", false);
	}

	emp = value;
}


function proceed1() {
	var a = $m.juci.dataset("taxCalculator");
	a.annualincome = $m.juci.getControl("tal").value();
	a.selfannualsalary = $m.juci.getControl("tasl").value();
	a.incomeformothersource = $m.juci.getControl("tosi").value();
	$m.juci.dataset("taxCalculator", a);
	var re2 = /[0-9\,?]{1}/;
	if (a.employeetype == "") {
		$m.toast("Please enter the fields");
	}
	else if (a.employeetype.type == "Self employed" && a.annualincome == "") {
		$m.toast("Please enter the fields");
	}
	else if (a.employeetype.type == "Salaried" && (a.selfannualsalary == "" || a.incomeformothersource == "")) {
		$m.toast("Please enter the fields");
	}
	else if (a.employeetype.type == "Self employed" && !re2.test(a.annualincome)) {
		$m.alert("Please enter the valid amount");
	}
	else if (a.employeetype.type == "Salaried" && (!re2.test(a.selfannualsalary) || !re2.test(a.incomeformothersource))) {
		$m.alert("Please enter the valid amount");
	}
	else {
		$m.juci.dataset("taxi1", false);
		$m.juci.dataset("tax1", true);
		$m.juci.dataset("tax2", false);
		$m.juci.dataset("retbck1", false);


	}
	$m.juci.dataset("tax_result", false);
}



function back2() {
	$m.juci.dataset("taxi1", true);
	$m.juci.dataset("tax1", false);
	$m.juci.dataset("tax2", false);
	$m.juci.dataset("retbck1", false);
	$m.juci.dataset("retbck", false);
	$m.juci.dataset("tax_result", false);
}

function back3() {
	$m.juci.dataset("taxi1", false);
	$m.juci.dataset("tax1", true);
	$m.juci.dataset("tax2", false);
	$m.juci.dataset("retbck", false);
	$m.juci.dataset("tax_result", false);
}
function proceed2() {
	var a = $m.juci.dataset("taxCalculator");
	a.investment = $m.juci.getControl("tinvs").value();
	a.healthinsurancepremium = $m.juci.getControl("thip").value();
	a.hiradebt = $m.juci.getControl("thra").value();
	$m.juci.dataset("taxCalculator", a);
	var re2 = /[0-9\,?]{1}/;
	var exit = $m.juci.dataset("taxpref");
	if (a.investment == "" || a.healthinsurancepremium == "" || a.hiradebt == "") {
		$m.toast("Please enter the fields");
	} else if (!re2.test(a.investment) || !re2.test(a.healthinsurancepremium) || !re2.test(a.hiradebt)) {
		$m.alert("Please enter the valid amount");
	}
	else {
		$m.juci.dataset("taxi1", false);
		$m.juci.dataset("tax1", false);
		$m.juci.dataset("tax2", true);
		if (exit == true) {
			$m.juci.dataset("retbck1", false);
			$m.juci.dataset("retbck", true);
			$m.juci.dataset("exittax", false);
			$m.juci.dataset("tax_result", true);
		} else {
			$m.juci.dataset("retbck1", true);
			$m.juci.dataset("retbck", false);
			$m.juci.dataset("tax_result", false);

		}
	}
}



function exittax() {
	$m.juci.dataset("taxpref", false);
	$m.juci.dataset("isCalculator", true);
	$m.juci.findById("hlv_calculator").hide();
	$m.juci.findById("tax_calculator").hide();
	$m.juci.findById("retirement_calculator").hide();
	$m.juci.findById("child_calculator").hide();
	$m.juci.findById("fhs_calculator").hide();
	$m.juci.dataset("self", false);
}


function annualformat(event) {
	console.log(event)
	var a = parseInt(event.value).toLocaleString();
	console.log(a);

}