var productDetails = {
    "productone": "Reliance Nippon Life Term Plan",
};

var productDetails1 = 
    {
        "title": "Reliance Nippon Life Term Plan",
        "content": "For tailor-made, comprehensive and affordable coverage that will help you secure your financial future and the future of your family, invest in Reliance Term Plan.",
        "productCode": 107
    };

var Insurance_gap = $m.juci.dataset("hlvresult").Insurance_Gap;
$m.juci.addDataset("productname1", [{
        "title": "Reliance Nippon Life Term Plan",
        "content": "For tailor-made, comprehensive and affordable coverage that will help you secure your financial future and the future of your family, invest in Reliance Term Plan.",
        "subContent":Insurance_gap,
        "productCode": 107
    }]);

$m.juci.addDataset("productname", productDetails);
$m.juci.addDataset("result", false);
$m.juci.addDataset("assumption", "*Assumptions: inflation (discount) rate = 8%, growth rate of income = 10%");
//$m.juci.addDataset("roles",["Male","Female"])
juci.addDataset("imgs", "images/personaldetail.png");
var Genderlist = [{"type":"Yes"},{"type":"No"}];
$m.juci.addDataset("Genderlist",Genderlist);
//$m.juci.addDataset("genderoptions1",genderoptions1);

//$m.juci.addDataset("hlv1",true);
//$m.juci.addDataset("hlv2",false);
//$m.juci.addDataset("hlv3",false);
$m.juci.addDataset("hlvbck",false);
$m.juci.addDataset("hlvbck1",false);
$m.juci.addDataset("exithlv",false);


var tabs = [];





function getToggleHandler(idx) {
    var toggleTab = function(event) {
        tabs[idx] = event.currentTarget.parent().toggleClass("visible");
    };
    return toggleTab;
}



function compareMarried(s1, s2) {
    if (s1.type == s2.type) {
        return s1.type;
    }
}

//function hlvCalculate1() {
//    var isValid = validation(event);
//    if (isValid.status) {
//        Calculation.hlvCalculate(event);
//    } else {
//        $m.alert(isValid.Message);
//        return;
//    }
//}

function hlvCalculate1() {
	var a = $m.juci.dataset("hlvcalculate");
    a.insurance = $m.juci.getControl("hlvins").value();
	a.loans = $m.juci.getControl("hlvto").value();
    $m.juci.dataset("hlvcalculate",a);
    var re2 = /[0-9\,?]{1}/;
    if(a.insurance == "" || a.loans == ""){
    	 $m.toast("Please enter all the fields");
    }
   	else if(!re2.test(a.insurance) || !re2.test(a.loans)){
		 $m.alert("Please enter the valid amount");
	}else{
    	 Calculation.hlvCalculate();
    }
	
}

function hlvReset(evnt) {
    $m.juci.dataset("result", false);
    $m.juci.dataset("hlvbck",false);
    $m.juci.dataset("hlvbck1",true);
    
}

function validation(obj) {
    var result = {}
    var data = obj.data;
    if (data.age >= data.retireage) {
        result.status = false;
        result.Message = "Retirement Age(" + data.retireage + ") cannot be greater than or Equal to Current Age(" + data.age + ")";
    } else {
        result.status = true;
    }
    return result;
}


function proceeda(){
	var a =  juci.getControl("hcage").value();
    var s = juci.getControl("hrage").value();
	if(a == "" ||  s == ""){
		$m.toast("Please enter the fields");
	}
	else if(parseInt(a) >= parseInt(s)){
		$m.alert("Current Age cannot be greater than or equal to retire age")
	}
	else{
	$m.juci.dataset("hlv1",false);
	$m.juci.dataset("hlv2",true);
	$m.juci.dataset("hlv3",false);
	$m.juci.dataset("hlvbck1",false);
	
	}
	$m.juci.dataset("result", false);
}


function backa(){
	$m.juci.dataset("hlv1",true);
	$m.juci.dataset("hlv2",false);
	$m.juci.dataset("hlv3",false);
	$m.juci.dataset("hlvbck",false);
	$m.juci.dataset("hlvbck1",false);
	$m.juci.dataset("result", false);
}

function backb(){
	$m.juci.dataset("hlv1",false);
	$m.juci.dataset("hlv2",true);
	$m.juci.dataset("hlv3",false);
	$m.juci.dataset("hlvbck",false);
	$m.juci.dataset("hlvbck1",false);
	$m.juci.dataset("result", false);
}


function backex(){
    $m.juci.dataset("hlv1",false);
	$m.juci.dataset("hlv2",true);
	$m.juci.dataset("hlv3",false);
	$m.juci.dataset("hlvbck",false);
	$m.juci.dataset("exithlv", true);
	$m.juci.dataset("result", false);
}




function proceedb(){
	
	var a = $m.juci.dataset("hlvcalculate");
	a.monthlyincome = $m.juci.getControl("hmi").value();
	a.monthlyexpensive = $m.juci.getControl("hme").value();
	a.valueofsvnginvstmnt = $m.juci.getControl("htsi").value();
	$m.juci.dataset("hlvcalculate",a);
	var re2 = /[0-9\,?]{1}/;
	var exit =   $m.juci.dataset("hlvpref");
	if(a.monthlyincome == "" || a.monthlyexpensive == "" || a.valueofsvnginvstmnt == ""){
	$m.toast("Please enter the fields");
	}
	else if(!re2.test(a.monthlyincome) || !re2.test(a.monthlyexpensive) || !re2.test(a.valueofsvnginvstmnt)){
		$m.alert("Please enter the valid amount");
	}
	else{
	$m.juci.dataset("hlv1",false);
	$m.juci.dataset("hlv2",false);
	$m.juci.dataset("hlv3",true);
	if(exit == true){
			$m.juci.dataset("hlvbck1",false);
			$m.juci.dataset("hlvbck",true);
			$m.juci.dataset("result", true);
	}else{
			$m.juci.dataset("hlvbck",false);
			$m.juci.dataset("hlvbck1",true);
			$m.juci.dataset("result", false);
	}

	}	
}

var currentUser = {};
function BuyNow(event){
	$m.putPref("productCode1",event.data.productCode);
	$m.savePref();
//	currentUser = {"code":"70268271","name":"Priyanka Sharma","usertype":"AGSM"};
	currentUser = {"code":$m.getUsername(),"name":$m.getUserAccount().customProperties.Login_Name,"usertype":$m.getUserAccount().customProperties.User_Type};
	
	if(currentUser.usertype != 'ADV' && currentUser.usertype != 'TPPR' && currentUser.usertype != 'TPADV' && currentUser.usertype != 'AGADV'&& currentUser.usertype != 'FLS' && currentUser.usertype !=='CNADV' && currentUser.usertype !=='PRADV' && currentUser.usertype !=='ENADV' && currentUser.usertype !=='F2FLPO'&& currentUser.usertype !=='F2FBM'){
		if(!window.dbHelper)
			initDB();
		else
	
	callService1();
	} else if(currentUser.usertype == 'TPPR'){
		if(!window.dbHelper)
			initDB();
		else
			checkData();
		callService1();
	}else {
		callService1();
	}
}



function checkAMLDetailForAdvisor(){
   	advUser1 = {
//  		"Login_Name": $m.getUserAccount().customProperties.Login_Name,
//  		"LA_Business_LoginCode": $m.getUsername(),
            "Login_Name": "70268271",
 		"LA_Business_LoginCode": "Priyanka Sharma",
	}
	$m.putPref("UseAs",	advUser1);
	$m.savePref();
	console.log(advUser1);
		openCallService1();	
}



function callService1() {
	
	if ($m.getPref("productCode1")) {
		var productCode = $m.getPref("productCode1");
		Plan_Code = productCode;
	} else {
		Plan_Code = data.PLanCode;
	}
	if (!Plan_Code) {
		return false;
	}
		advisorCode = $m.getUsername(),
		advisorName = $m.getUserAccount().customProperties.Login_Name;
		openProductsBi1();
}

function exitHLV(){
      $m.juci.dataset("hlvpref",false);
	  $m.juci.dataset("isCalculator",true);
	   $m.juci.findById("hlv_calculator").hide();
        $m.juci.findById("tax_calculator").hide();
        $m.juci.findById("retirement_calculator").hide();
        $m.juci.findById("child_calculator").hide();
        $m.juci.findById("fhs_calculator").hide();
}