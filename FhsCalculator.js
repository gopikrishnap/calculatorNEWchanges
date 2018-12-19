var savingsoption = [{ type: "Saving more than", value: "1" }, { type: "Saving atleast", value: "2" }, { type: "Saving less than", value: "3" }, { type: "No Saving", value: "4" }];
var genderoptions = [{ "type": "Male" }, { "type": "Female" }];
var spouseptions = [{ "type": "Yes" }, { "type": "No" }];
var parentoption = [{ "type": "Yes" }, { "type": "No" }];
var childrenoption = [{ "type": "Yes" }, { "type": "No" }];
var arr = {
	"gender": "",
	"name": "",
	"mobile": "",
	"dob": "",
	"spousefhs": "",
	"spouseDob": "",
	"annualIncome": "",
	"spouseAL": "",
	"savingInves": "",
	"monthlyexpense": "",
	"totalsavings": "",
	"totaloutstandingloan": "",
	"insuranceCover": "",
	"spouseInsuranceCover": "",
	"children": "",
	"childName": "",
	"childName2": "",
	"childName3": "",
	"childName4": "",
	"childName5": "",
	"childName6": "",
	"childrenages": "",
	"no_of_children": "",
	"parents": "",
	"savingChild": "",
	"savingRetire": ""
};


$m.juci.addDataset("options", savingsoption);
$m.juci.addDataset("options1", savingsoption);
$m.juci.addDataset("overalltext", "Average");
$m.juci.addDataset("Instext", "Average");
$m.juci.addDataset("childtext", "Average");
$m.juci.addDataset("retiretext", "Average");
$m.juci.addDataset("loantext", "Average");
$m.juci.addDataset("savingstext", "Average");
$m.juci.addDataset("count", false);
$m.juci.addDataset("Ques12", "Rupees");
$m.juci.addDataset("Ques11", "Rupees");
$m.juci.addDataset("fhsbck", false);
$m.juci.addDataset("fhsbck1", false);
$m.juci.addDataset("options2", parentoption);
$m.juci.addDataset("options3", childrenoption);
$m.juci.addDataset("genderoptions", genderoptions);
$m.juci.addDataset("currentRange", "35");
$m.juci.addDataset("spouseptions", spouseptions);
$m.juci.addDataset("pluschild", false);
$m.juci.addDataset("result", false);
$m.juci.addDataset("fhsresult", false);
$m.juci.addDataset("child1", false);
$m.juci.addDataset("child2", false);
$m.juci.addDataset("child3", false);
$m.juci.addDataset("child4", false);
$m.juci.addDataset("child5", false);
$m.juci.addDataset("fhsform", arr);
$m.juci.addDataset("spousedb", false);
$m.juci.addDataset("minScore", 0);
$m.juci.addDataset("maxScore", 100);
$m.juci.addDataset("overallscore");
$m.juci.addDataset("Insscore");
$m.juci.addDataset("childscore");
$m.juci.addDataset("retirescore");
$m.juci.addDataset("loanscore");
$m.juci.addDataset("savingsscore");
$m.juci.addDataset("exitfhs", false);
$m.juci.addDataset("children", false);
$m.juci.addDataset("spouseEarning", false);

$m.onReady(function () {
	var TestResult = function (score) {
		var self = this;
		self.minScore = 0;
		self.maxScore = 100;
		self.score = ko.observable(score);

	};
	var result = new TestResult(9075);
	child()
	//	$m.juci.addDataset("score",10);
	//	$m.juci.dataset("score",75);
	//	juci.viewModel.applyBinding(document.getElementById("working-slider"));
});

function formatfhsgender(e) {
	return e.option;
}

function compareGender(s1, s2) {
	if (s1.type == s2.type) {
		return s1.type;
	}
}

function compareSpouse(s1, s2) {
	if (s1.type == s2.type) {
		return s1.type;
	}
}

function Comparefhschildren(s1, s2) {
	if (s1.type == s2.type) {
		return s1.type;
	}
}

function Comparefhsparents(s1, s2) {
	if (s1.type == s2.type) {
		return s1.type;
	}
}

function Comparefhssavings(i1, i2) {
	return i1.type == i2.type;
}

function onvalidatesp(e) {
	console.log(e.value);
	if (e.value.type._latestValue == "Yes") {
		$m.juci.dataset("spousedb", true);
	}
	else {
		$m.juci.dataset("spousedb", false);
	}
}


function testingdate(event) {
	var dob1 = $m.juci.dataset("fhsform").spouseDob;
	var newdob1 = new Date(dob1).toDateString();
	var currentDate1 = new Date().toDateString();
	if (dob1 > new Date()) {
		$m.juci.getDataset("fhsform")().spouseDob('');
		$m.alert("Date of birth should not be greater than Today's Date");
		juci.findById("spousedate").addClass("picker1");
		juci.findById("spousedate").removeClass("awesome_class");
	}
	else if (newdob1 == currentDate1) {
		$m.juci.getDataset("fhsform")().spouseDob('');
		$m.alert("Date of birth should not be current date");
		juci.findById("spousedate").addClass("picker1");
		juci.findById("spousedate").removeClass("awesome_class");
	}
	else {
		var b = $m.juci.dataset("fhsform");
		b.spouseDob = new Date(b.spouseDob).toString("MM-dd-yyyy");
		$m.juci.dataset("fhsform", b);
		juci.findById("spousedate").addClass("awesome_class");
		juci.findById("spousedate").removeClass("picker1");
	}

}

function testing1(event) {
	var dob = $m.juci.dataset("fhsform").dob;
	var newdob = new Date(dob).toDateString();
	var currentDate = new Date().toDateString();
	if (dob > new Date()) {
		$m.juci.getDataset("fhsform")().dob('');
		$m.alert("Date of birth should not be greater than Today's Date");
		juci.findById("dobc").removeClass("awesome_class");
		juci.findById("dobc").addClass("picker12");
	}
	else if (newdob == currentDate) {
		$m.juci.getDataset("fhsform")().dob('');
		$m.alert("Date of birth should not be current date");
		juci.findById("dobc").removeClass("awesome_class");
		juci.findById("dobc").addClass("picker12");
	}
	else {
		var c = $m.juci.dataset("fhsform");
		c.dob = new Date(c.dob).toString("MM-dd-yyyy");
		$m.juci.dataset("fhsform", c);
		juci.findById("dobc").addClass("awesome_class");
		juci.findById("dobc").removeClass("picker1");
	}
}



function savechild(e) {
	var p = $m.juci.dataset("fhsform");
	p.savingChild = e.value.value();
	$m.juci.dataset("fhsform", p);
}

function saveretire(e) {
	var p = $m.juci.dataset("fhsform");
	p.savingRetire = e.value.value();
	$m.juci.dataset("fhsform", p);
}

function fhsCalculate(event) {
	var isValid = validation(event);
	if (isValid.status) {
		Calculation.fhsCalculate2(event);
	}
	else {
		$m.alert(isValid.Message);
		return;
	}
}

function proceedf1() {
	var p1 = $m.juci.dataset("fhsform");
	p1.name = $m.juci.getControl("firstmid").value();
	p1.mobile = $m.juci.getControl("fmobile").value();
	p1.dob = $m.juci.getControl("dobc").value();
	p1.spouseDob = $m.juci.getControl("spousedate").value();
	p1.annualIncome = $m.juci.getControl("fhsal").value();
	p1.spouseAL = $m.juci.getControl("fhsalsp").value();
	$m.juci.dataset("fhsform", p1);
	if (p1.name == "" || p1.mobile == "" || p1.dob == "" || p1.spouse == "" || p1.annualIncome == "") {
		$m.toast("Please enter all the fields");
	}
	else if (p1.spousefhs.type == "Yes" && (p1.spouseDob == "" || p1.spouseAL == "")) {
		$m.toast("Please enter all the fields");
	}
	else {
		var first = $m.juci.getControl("firstmid").value();
		var second = $m.juci.getControl("fmobile").value();
		var re1 = /^[1-9]{1}[0-9]{9}$/;
		//	var re2 = /^([0]+|[1-9][0-9]+\.?\d+?)$/;
		var re2 = /[0-9\,?]{1}/;
		var spaceCount = (first.split(" ").length - 1);
		var speccount = (first.split("'").length - 1);
		if (spaceCount > 2 || speccount > 1) {
			$m.alert("Please enter the valid name");
		}
		else if (!re1.test(second)) {
			$m.alert("Please enter the valid mobile number");
		} else if (!re2.test(p1.annualIncome)) {
			$m.alert("Please enter the valid Annual Income");
		}
		else {
			$m.juci.dataset("fhsbck1", false);
			$m.juci.dataset("fhs1", false);
			$m.juci.dataset("fhs2", true);
			$m.juci.dataset("fhs3", false);
			$m.juci.dataset("fhs4", false);
			$m.juci.dataset("fhs5", false);
		}
	}
	$m.juci.dataset("fhsresult", false);
}

function proceedf2() {
	var p1 = $m.juci.dataset("fhsform");
	if (p1.spousefhs.type == "Yes") {
		p1.spouseDob = new Date(p1.spouseDob).toString("MM-dd-yyyy");
	}
	p1.dob = new Date(p1.dob).toString("MM-dd-yyyy");
	p1.savingInves = $m.juci.getControl("fsavings").value();
	p1.monthlyexpense = $m.juci.getControl("fmonthly").value();
	p1.totalsavings = $m.juci.getControl("ftotal").value();
	p1.totaloutstandingloan = $m.juci.getControl("ftotalloan").value();
	$m.juci.dataset("fhsform", p1);
	var re2 = /[0-9\,?]{1}/;
	if (p1.savingInves == "" || p1.monthlyexpense == "" || p1.totalsavings == "" || p1.totaloutstandingloan == "") {
		$m.toast("Please enter all the fields");
	}
	else if (!re2.test(p1.savingInves) || !re2.test(p1.monthlyexpense) || !re2.test(p1.totalsavings) || !re2.test(p1.totaloutstandingloan)) {
		$m.alert("Please enter the valid amount");
	}
	else {
		var exit = $m.juci.dataset("fhsresult");
		if (exit == true) {
			$m.juci.dataset("exitfhs", true);
		} else {
			$m.juci.dataset("exitfhs", false);
		}
		$m.juci.dataset("fhs1", false);
		$m.juci.dataset("fhs2", false);
		$m.juci.dataset("fhs3", true);
		$m.juci.dataset("fhs4", false);
		$m.juci.dataset("fhs5", false);
	}
	$m.juci.dataset("fhsresult", false);
}

function proceedf3() {
	var p1 = $m.juci.dataset("fhsform");
	p1.insuranceCover = $m.juci.getControl("fsumAssure").value();
	p1.spouseInsuranceCover = $m.juci.getControl("fsumAssure").value();
	$m.juci.dataset("fhsform", p1);
	var re2 = /[0-9\,?]{1}/;
	if (p1.insuranceCover == "") {
		$m.toast("Please enter all the fields");
	}
	else if (p1.spouse == "Yes" && (p1.spouseInsuranceCover == "")) {
		$m.toast("Please enter all the fields");
	}
	else if (!re2.test(p1.insuranceCover)) {
		$m.alert("Please enter the valid amount");
	}
	else {
		var exit = $m.juci.dataset("fhsresult");
		if (exit == true) {
			$m.juci.dataset("exitfhs", true);
		} else {
			$m.juci.dataset("exitfhs", false);
		}
		$m.juci.dataset("fhs1", false);
		$m.juci.dataset("fhs2", false);
		$m.juci.dataset("fhs3", false);
		$m.juci.dataset("fhs4", true);
		$m.juci.dataset("fhs5", false);
	}
	$m.juci.dataset("fhsresult", false);
}

function proceed4(event) {
	var p1 = $m.juci.dataset("fhsform");
	p1.childName = $m.juci.getControl("fhsone").value();
	p1.childName2 = $m.juci.getControl("fhstwo").value();
	p1.childName3 = $m.juci.getControl("fhsthree").value();
	p1.childName4 = $m.juci.getControl("fhsfour").value();
	p1.childName5 = $m.juci.getControl("fhsfive").value();
	var no1 = $m.juci.dataset("fhsform");
	var Age = /^(?!0)[0-9]*$/;
	$m.juci.dataset("fhsform", p1);
	if (p1.children == "") {
		$m.toast("Please enter all the fields");
	}
	else if (p1.children == "Yes") {
		$m.toast("Please enter all the fields");
	}
	else {
		var exit = $m.juci.dataset("fhsresult");
		if (exit == true) {
			$m.juci.dataset("fhsbck1", false);
			$m.juci.dataset("fhsbck", true);
			$m.juci.dataset("exitfhs", false);
		} else {
			$m.juci.dataset("fhsbck", false);
			$m.juci.dataset("fhsbck1", true);
		}
		if (no1.no_of_children == 0) {
			Calculation.fhsCalculate1(event);
		}
		else if (no1.no_of_children == 1) {
			if (no1.childName == "") {
				$m.alert("Please enter the age");
			}
			else if (!Age.test(no1.childName)) {
				$m.alert("Please enter the valid age");
			}
			else {
				Calculation.fhsCalculate1(event);
			}
		}
		else if (no1.no_of_children == 2) {
			if (no1.childName == "" || no1.childName2 == "") {
				$m.alert("Please enter the age");
			}
			else if (!Age.test(no1.childName) || !Age.test(no1.childName2)) {
				$m.alert("Please enter the valid age");
			}
			else {
				Calculation.fhsCalculate1(event);
			}
		}
		else if (no1.no_of_children == 3) {
			if (no1.childName == "" || no1.childName2 == "" || no1.childName3 == "") {
				$m.alert("Please enter the age");
			}
			else if (!Age.test(no1.childName) || !Age.test(no1.childName2) || !Age.test(no1.childName3)) {
				$m.alert("Please enter the valid age");
			}
			else {
				Calculation.fhsCalculate1(event);
			}
		}
		else if (no1.no_of_children == 4) {
			if (no1.childName == "" || no1.childName2 == "" || no1.childName3 == "" || no1.childName4 == "") {
				$m.alert("Please enter the age");
			}
			else if (!Age.test(no1.childName) || !Age.test(no1.childName2) || !Age.test(no1.childName3) || !Age.test(no1.childName4)) {
				$m.alert("Please enter the valid age");
			}
			else {
				Calculation.fhsCalculate1(event);
			}
		}
		else if (no1.no_of_children == 5) {
			if (no1.childName == "" || no1.childName2 == "" || no1.childName3 == "" || no1.childName4 == "" || no1.childName5 == "") {
				$m.alert("Please enter the age");
			}
			else if (!Age.test(no1.childName) || !Age.test(no1.childName2) || !Age.test(no1.childName3) || !Age.test(no1.childName4) || !Age.test(no1.childName5)) {
				$m.alert("Please enter the valid age");
			}
			else {
				Calculation.fhsCalculate1(event);
			}
		}
		//	var isValid = validation(event);
		//	childage();
		//	if (isValid.status) {
		//		Calculation.fhsCalculate1(event);
		//	} 
		//	else {
		//		$m.alert(isValid.Message);
		//		return;
		//	}		
	}
}

function backfh1() {
	$m.juci.dataset("fhs1", true);
	$m.juci.dataset("fhs2", false);
	$m.juci.dataset("fhs3", false);
	$m.juci.dataset("fhs4", false);
	$m.juci.dataset("fhs5", false);
	$m.juci.dataset("fhsbck", false);
	$m.juci.dataset("fhsbck1", false);
	$m.juci.dataset("fhsresult", false);

}

function backfh2() {
	$m.juci.dataset("fhs1", false);
	$m.juci.dataset("fhs2", true);
	$m.juci.dataset("fhs3", false);
	$m.juci.dataset("fhs4", false);
	$m.juci.dataset("fhs5", false);
	$m.juci.dataset("fhsbck", false);
	$m.juci.dataset("fhsbck1", false);
	$m.juci.dataset("fhsresult", false);
}

function backfh3() {
	$m.juci.dataset("fhs1", false);
	$m.juci.dataset("fhs2", false);
	$m.juci.dataset("fhs3", true);
	$m.juci.dataset("fhs4", false);
	$m.juci.dataset("fhs5", false);
	$m.juci.dataset("fhsbck", false);
	$m.juci.dataset("fhsresult", false);
}

function backfh4() {
	$m.juci.dataset("fhs1", false);
	$m.juci.dataset("fhs2", false);
	$m.juci.dataset("fhs3", false);
	$m.juci.dataset("fhs4", true);
	$m.juci.dataset("fhsbck1", false);
	$m.juci.dataset("fhsbck", false);
	$m.juci.dataset("fhs5", false);
	$m.juci.dataset("fhs6", false);
	$m.juci.dataset("fhsresult", false);
}

var g = 1;
function incrementValue() {
	var value = parseInt(document.getElementById('number1').value, 10);
	value = isNaN(value) ? 0 : value;
	if (value < 5) {
		value++;
		document.getElementById('number1').value = value;
		console.log("inc", value);
		g = value;
		child();
	} else {
		$m.alert("Maximum Number is 5");
	}
}



function decrementValue() {
	var value = parseInt(document.getElementById('number1').value, 10);
	value = isNaN(value) ? 0 : value;
	if (value <= 1) {
		console.log("can not");
	} else {
		value--;
	}
	document.getElementById('number1').value = value;
	console.log("dec", value);
	g = value;
	child();
}


function children(e) {
	if (e.value.type._latestValue == "Yes") {
		$m.juci.dataset("count", true);
	}
	else {
		$m.juci.dataset("count", false);
	}
}



function noofchild(e) {
	var type = e.control.__koValue._latestValue.type();
	if (type == "Yes") {
		$m.juci.dataset("numchildren", true);
		var a = $m.juci.dataset("fhsform");
		a.no_of_children = 1;
		$m.juci.dataset("fhsform", a);
	} else {
		$m.juci.dataset("numchildren", false);
		$m.juci.dataset("pluschild", false);
		var a = $m.juci.dataset("fhsform");
		a.no_of_children = 0;
		$m.juci.dataset("fhsform", a);
	}

}


function child() {
	var noc = $m.juci.dataset("fhsform");
	noc.no_of_children = g;
	$m.juci.dataset("fhsform", noc);
	if (g == 1) {
		$m.juci.dataset("child1", true);
		$m.juci.dataset("child2", false);
		$m.juci.dataset("child3", false);
		$m.juci.dataset("child4", false);
		$m.juci.dataset("child5", false);
	}
	if (g == 2) {
		$m.juci.dataset("child1", true);
		$m.juci.dataset("child2", true);
		$m.juci.dataset("child3", false);
		$m.juci.dataset("child4", false);
		$m.juci.dataset("child5", false);
	}
	if (g == 3) {
		$m.juci.dataset("child1", true);
		$m.juci.dataset("child2", true);
		$m.juci.dataset("child3", true);
		$m.juci.dataset("child4", false);
		$m.juci.dataset("child5", false);
	}
	if (g == 4) {
		$m.juci.dataset("child1", true);
		$m.juci.dataset("child2", true);
		$m.juci.dataset("child3", true);
		$m.juci.dataset("child4", true);
		$m.juci.dataset("child5", false);
	}
	if (g == 5) {
		$m.juci.dataset("child1", true);
		$m.juci.dataset("child2", true);
		$m.juci.dataset("child3", true);
		$m.juci.dataset("child4", true);
		$m.juci.dataset("child5", true);
	}
}

//function childreq(){
//var no = $m.juci.dataset("fhsform");
//if(no.no_of_children == "1"){
//if(no.childName == "" || Age.test(no.childName)){
//$m.alert("Please enter the valid age");
//}
//}
//else if(no.no_of_children == "2"){
//if(no.childName2 == "" || Age.test(no.childName2)){
//$m.alert("Please enter the valid age");
//}
//}
//else if(no.no_of_children == "3"){
//if(no.childName3 == "" || Age.test(no.childName3)){
//$m.alert("Please enter the valid age");
//}
//}
//else if(no.no_of_children == "4"){
//if(no.childName4 == "" || Age.test(no.childName4)){
//$m.alert("Please enter the valid age");
//}
//}
//else if(no.no_of_children == "5"){
//if(no.childName5 == "" || Age.test(no.childName5)){
//$m.alert("Please enter the valid age");
//}
//}
//}


function childage() {
	var no = $m.juci.dataset("fhsform");
	var Age = /^(?!0)[0-9]*$/;
	if (no.no_of_children == 1) {
		no.childrenages = no.childName;
		$m.juci.dataset("fhsform", no);
	}
	else if (no.no_of_children == 2) {
		no.childrenages = no.childName.concat(',' + no.childName2);
		$m.juci.dataset("fhsform", no);
	}
	else if (no.no_of_children == 3) {
		no.childrenages = no.childName.concat(',' + no.childName2 + ',' + no.childName3);
		$m.juci.dataset("fhsform", no);
	}
	else if (no.no_of_children == 4) {
		no.childrenages = no.childName.concat(',' + no.childName2 + ',' + no.childName3 + ',' + no.childName4);
		$m.juci.dataset("fhsform", no);
	}
	else if (no.no_of_children == 5) {
		no.childrenages = no.childName.concat(',' + no.childName2 + ',' + no.childName3 + ',' + no.childName4 + ',' + no.childName5);
		$m.juci.dataset("fhsform", no);
	}

}

function exitfhs() {
	$m.juci.dataset("fhspref", false);
	$m.juci.dataset("isCalculator", true);
	$m.juci.findById("hlv_calculator").hide();
	$m.juci.findById("tax_calculator").hide();
	$m.juci.findById("retirement_calculator").hide();
	$m.juci.findById("child_calculator").hide();
	$m.juci.findById("fhs_calculator").hide();
}