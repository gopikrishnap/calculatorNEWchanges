var finalGoalsAmount = 0;
var savingsPerAnnum;
var savingsTimeToReachGoal;
var totalSavings;
var userDataArr = [];
$m.juci.dataset("previousEntry", []);
$m.juci.addDataset("goalsText", true);
$m.juci.addDataset("thinbar1",true);
var current_id = "";


$m.juci.addDataset("hlvpref",false);
$m.juci.addDataset("taxpref",false);
$m.juci.addDataset("retpref",false);
$m.juci.addDataset("childpref",false);
$m.juci.addDataset("fhspref",false);

$m.juci.addDataset("fhs1",true);
$m.juci.addDataset("fhs2",false);
$m.juci.addDataset("fhs3",false);
$m.juci.addDataset("fhs4",false);
$m.juci.addDataset("fhs5",false);

$m.juci.addDataset("hlv1",true);
$m.juci.addDataset("hlv2",false);
$m.juci.addDataset("hlv3",false);

$m.juci.addDataset("taxi1",true);
$m.juci.addDataset("tax1", false);
$m.juci.addDataset("tax2", false);

$m.juci.addDataset("retire1",true);
$m.juci.addDataset("retire2",false);
$m.juci.addDataset("self", false);
$m.juci.addDataset("numchildren",false);
$m.juci.addDataset("child1",false);
$m.juci.addDataset("child2",false);
$m.juci.addDataset("child3",false);
$m.juci.addDataset("child4",false);
$m.juci.addDataset("child5",false);
$m.juci.addDataset("child_result", false);


var successCallback = function(res) {
    utils.HideProgress();
    if (!res.length) {
        $m.alert("No data found..", "Alert", function() {
            $m.juci.dataset("leadno", "");
            $m.juci.dataset("advisorCode", "");
            $m.juci.dataset("userdetails_section", false);
            return;
        });
    }
    for (var i = 0; i <= res.length; i++) {
        if (res[i]) {
            for (var j = 0; j < res[i].LeadInfo.length; j++) {
                userDataArr.push(res[i].LeadInfo[j]);
            }
        }
    }
};


$m.onReady(function(){
	// Code to execute when the page is ready
		    resethlv();
			resetretire();
			resettax();
			resetfhs();
			reset();
});



$m.onResume(function() {
    var hName = $m.juci.dataset('headerName');
    //	var alertCount = $m.juci.dataset('alertcount');
    $m.pageTitle('<div class="page_title"><div style="text-align:center" class="title_image"><img src="images/relaince-logo.png"></img></div></div>');
    $m.pageTitleLeftButton('<div class="left_heading"><div class="header_left" onclick="onBackPress()"><img src="images/arrow-left2.png"></div><div class="seperator"></div><div style="text-align:left" class="page_name">&nbsp ' + hName + '</div></div>');
    $m.pageTitleRightButton('<div class="icons"><div class="icon contact"><img class="contactimg" src="images/mobileWhite.png" onclick="openCallContact()"/></div><div class="icon plus"><img class="plusimg" src="images/add.png" onclick="openplus(event)"/></div><div class="icon icon1"><div class="notif1"><div class="pAlert"><div class="alert" id="alertCount" onClick="onNotificationsClick()"></div><img src="images/Notifications.png" onClick="onNotificationsClick()"/></div></div></div><div class="icon icon2"><img src="images/more.png" onclick="openMenu(event)"/></div></div>');
    current_id = "home_page";
    $m.juci.dataset("isCalculator", true);
    $m.juci.findById("calculator").show();
    $m.juci.findById("welcome-text").el.innerText = "Welcome..";
    $m.juci.findById("disclaimer").el.innerText = "Select your calculator..";
    $m.juci.findById("network-calculator").hide();
    $m.juci.findById("retirement_calculator").hide();
    $m.juci.findById("hlv_calculator").hide();
    $m.juci.findById("tax_calculator").hide();
    $m.juci.findById("child_calculator").hide();
    $m.juci.findById("fhs_calculator").hide();
    $m.juci.findById("disclaimer").show();
    $m.juci.dataset("isLeadOrAdvisor", false);
    $m.juci.dataset("isPreviousEntry", false);
    $m.juci.dataset("isPremiumExceed", false);
    $m.juci.getControl("advisor-no").enable();
    $m.juci.dataset("calculatorName", "");
});

function onCalculatorChange(event) {
	juci.setGhostBusters();
    var eventValue = event.value; 
    if (eventValue == "My Dream My Income Calculator") {
        $m.juci.dataset("isCalculator", false);
        initMyDreamIncomeCalulator();
    } else
    if (eventValue == "My Network Calculator") {
        initNetworkCalculator();
        $m.juci.findById("hlv_calculator").hide();
        $m.juci.findById("tax_calculator").hide();
        $m.juci.findById("retirement_calculator").hide();
        $m.juci.findById("child_calculator").hide();
        $m.juci.findById("fhs_calculator").hide();
    } else
    if (eventValue == "Human Life Value Calculator") {
        initHLVCalculator();
        $m.juci.dataset("isCalculator", false);
        $m.juci.findById("hlv_calculator").show();
        $m.juci.findById("tax_calculator").hide();
        $m.juci.findById("retirement_calculator").hide();
        $m.juci.findById("child_calculator").hide();
        $m.juci.findById("fhs_calculator").hide();
    } else
    if (eventValue == "Retirement Calculator") {
        initRetirementCalculator();
       $m.juci.dataset("isCalculator", false);
        $m.juci.findById("hlv_calculator").hide();
        $m.juci.findById("tax_calculator").hide();
        $m.juci.findById("child_calculator").hide();
        $m.juci.findById("retirement_calculator").show();
        $m.juci.findById("fhs_calculator").hide();
    } else
    if (eventValue == "Tax Calculator") {
    
        initTaxCalculator();
        $m.juci.dataset("isCalculator", false);
        $m.juci.findById("hlv_calculator").hide();
        $m.juci.findById("tax_calculator").show();
        $m.juci.findById("child_calculator").hide();
        $m.juci.findById("retirement_calculator").hide();
        $m.juci.findById("fhs_calculator").hide();
    } else
    if (eventValue == "Children Education Calculator") {
       
        initChildEducationCalculator();
        $m.juci.dataset("isCalculator", false);
        $m.juci.findById("hlv_calculator").hide();
        $m.juci.findById("tax_calculator").hide();
        $m.juci.findById("child_calculator").show();
        $m.juci.findById("retirement_calculator").hide();
        $m.juci.findById("fhs_calculator").hide();
    }else
    if (eventValue == "FHS Calculator") {
        initFHSCalculator();
        $m.juci.dataset("isCalculator", false);
        $m.juci.findById("hlv_calculator").hide();
        $m.juci.findById("tax_calculator").hide();
        $m.juci.findById("child_calculator").hide();
        $m.juci.findById("retirement_calculator").hide();
        $m.juci.findById("fhs_calculator").show();
        
    }
    setTimeout(function(){
    juci.removeGhostBusters();

      }, 300); 
}


function initMyDreamIncomeCalulator() {
    current_id = "first_page";
    $m.juci.dataset("leadno", "");
    $m.juci.dataset("advisorCode", "");
    $m.juci.dataset("userdetails_section", false);
    $m.juci.findById("first-section").show();
    $m.juci.findById("calculator").hide();
    $m.juci.findById("previous-entry").hide();
    $m.juci.findById("select-role").show();
    $m.juci.dataset("fetchingUserDetails", {
        "Name": "",
        "DOB": "",
        "Mobile": ""
    });
    $m.juci.findById("welcome-text").el.innerText = "Welcome to My Dream My Income Calculator";
    $m.juci.findById("disclaimer").el.innerText = "You are just 3 steps away from reaching your goals";
    $m.juci.dataset("isHomeGoal", false);
    $m.juci.dataset("isCarGoal", false);
    $m.juci.dataset("isMarriageGoal", false);
    $m.juci.dataset("isEducationGoal", false);
    $m.juci.dataset("isVacationGoal", false);
    $m.juci.dataset("isOtherGoal", false);
    $m.juci.getControl("advisor-no").enable();

    utils.ShowProgress("Fetching Lead details..");
    var service = new ServiceLibrary();
    service.GetinputCountDefault(successCallback);
}

var failureCallback = function(res) {
    utils.HideProgress();
    $m.logError("fetching data failed due to " + res);
};

function fetchByLeadNumber(event) {
    $m.juci.dataset("isLeadOrAdvisor", true);
}

function fetchByAdvisorCode(event) {
    $m.juci.dataset("isLeadOrAdvisor", true);
}

function onPreviousEntry(event) {
    current_id = "first_page";
    var arr = [];
    var eventData = ko.toJS(event);
    var eventname;
    var eventValue;
    var service = new ServiceLibrary();
    if (eventData.leadno) {
        eventname = "lead_id";
        eventValue = eventData.leadno;
    } else {
        eventname = "advisor_code";
        eventValue = eventData.advisorCode;
    }
    var data = {
        "name": eventname,
        "value": eventValue
    };
    var getIncomeCalculatorCallback = function(res) {
        if (res.Status == "Y") {
            utils.HideProgress();
            $m.juci.dataset("isPreviousEntry", true);
            $m.juci.findById("lead-no").hide();
            $m.juci.findById("advisor-no").hide();
            $m.juci.findById("select-role").hide();
            $m.juci.dataset("userdetails_section", false);
            $m.juci.dataset("isLeadOrAdvisor", false);
            $m.juci.findById("disclaimer").hide();
            if (res.Message != "") {
                $m.alert(res.Message);
                $m.juci.dataset("previousEntry", []);
                $m.juci.dataset("isPreviousEntry", false);
                $m.juci.dataset("isLeadOrAdvisor", true);
                $m.juci.findById("select-role").show();
                $m.juci.findById("disclaimer").show();
                return;
            }
            arr.push(res.IncomeCalculator);
            $m.juci.dataset("previousEntry", arr);

        } else {
            utils.HideProgress();
            $m.alert("Fetching Failed..");
            $m.logError("getIncomeCalculator failed due to : " + JSON.stringify(res));
        }
    };
    utils.ShowProgress("Fetching calculator details...");
    service.getIncomeCalculatorDetails(getIncomeCalculatorCallback, data);

}

function onNewEntry(event) {
    current_id = "first_page";
    $m.juci.dataset("fetchingUserDetails", {
        "Name": "",
        "DOB": "",
        "Mobile": ""
    });
    $m.juci.dataset("isPreviousEntry", false);
    var eventData = ko.toJS(event);
    if (eventData.leadno) {
        var leadNo = eventData.leadno;
        var arr = [];
        var eventValue = "";
        $m.juci.dataset("fetchingUserDetails", {
            "Name": "",
            "DOB": "",
            "Mobile": ""
        });
        eventValue = leadNo;
        if (!eventValue) {
            $m.alert("Please enter lead code..");
            return;
        }
        arr = [];
        for (var i = 0; i < userDataArr.length; i++) {
            if (userDataArr[i].Lead_Id == eventValue) {
                var obj = {
                    "Name": userDataArr[i].Name,
                    "DOB": setAge(userDataArr[i].DOB),
                    "Mobile": userDataArr[i].Mobile,
                    "Lead_Id": userDataArr[i].Lead_Id
                };
                arr.push(obj);
            }
        }
        if (!arr.length) {
            $m.alert("No data found..");
            $m.juci.getControl("advisor-no").enable();
            return;
        }
        $m.juci.dataset("fetchingUserDetails", obj);
        $m.juci.dataset("userdetails_section", true);
    } else if (eventData.advisorCode) {
        var advisorName;
        var advisorDetails = utils.GetPref("AdvisorsList");
        var advisorCode = eventData.advisorCode;
        $m.putPref("advisorCode", advisorCode);
        $m.savePref();
        var arr = [];
        var eventValue = "";
        $m.juci.dataset("fetchingUserDetails", {
            "Name": "",
            "DOB": "",
            "Mobile": ""
        });
        eventValue = advisorCode;
        if (!eventValue) {
            $m.alert("Please enter advisor code..");
            return;
        }

        if (advisorDetails) {
            for (var i = 0; i < advisorDetails.length; i++) {
                if (advisorDetails[i].AM_Code == advisorCode) {
                    advisorName = advisorDetails[i].AM_Name;
                } else if (advisorDetails[i].Adv_Emp_Code == advisorCode) {
                    advisorName = advisorDetails[i].Adv_Emp_Name;
                } else if (advisorDetails[i].BM_Code == advisorCode) {
                    advisorName = advisorDetails[i].BM_Name;
                } else if (advisorDetails[i].RM_Code == advisorCode) {
                    advisorName = advisorDetails[i].RM_Name;
                } else if (advisorDetails[i].SM_Code == advisorCode) {
                    advisorName = advisorDetails[i].SM_Name;
                } else if (advisorDetails[i].ZM_Code == advisorCode) {
                    advisorName = advisorDetails[i].ZM_Name;
                }
            }
        } else {
            $m.alert("No data found.");
        }
        var obj = {
            "Name": advisorName,
            "DOB": "",
            "Mobile": "",
            "Aadhaar": ""
        };

        if (!advisorName) {
            $m.alert("No data found..");
            $m.juci.dataset("userdetails_section", false)
            $m.juci.getControl("advisor-no").enable();
            return;
        }

        $m.juci.getControl("advisor-no").disable();
        $m.juci.dataset("fetchingUserDetails", obj);
        $m.juci.dataset("userdetails_section", true);
    } else {
        $m.alert("Please enter the value");
        return;
    }
}

function onFirstSectionClick(event) {
    current_id = "second_page";
    $m.juci.findById("first-section").hide();
    $m.juci.findById("second-section").show();
    $m.juci.dataset("secondSection", true);
    $m.juci.getControl("time-goals").value(null);
    $m.juci.getControl("reach-goal").value(null);
    $m.juci.dataset("goalsSection", {
        "homeGoal": "",
        "carGoal": "",
        "childEducationGoal": "",
        "childMarriageGoal": "",
        "vacatonGoals": "",
        "otherGoals": ""
    });
    $m.juci.dataset("totalAmount", 0);
    $m.juci.dataset("currentSavings", null);
    $m.juci.dataset("annualIncome", null);
    $m.juci.findById("welcome-text").el.innerText = "Let us know something about you";
    $m.juci.findById("disclaimer").el.innerText = "You are just 2 steps away from reaching your goals";
}

function sumGoalsAmount(e) {
    var sumGoalsAssured = $m.juci.dataset("goalsSection");
    finalGoalsAmount = sumGoalsAssured.homeGoal ? parseInt(sumGoalsAssured.homeGoal) : 0;
    finalGoalsAmount = finalGoalsAmount + (sumGoalsAssured.carGoal ? parseInt(sumGoalsAssured.carGoal) : 0);
    finalGoalsAmount = finalGoalsAmount + (sumGoalsAssured.childEducationGoal ? parseInt(sumGoalsAssured.childEducationGoal) : 0);
    finalGoalsAmount = finalGoalsAmount + (sumGoalsAssured.childMarriageGoal ? parseInt(sumGoalsAssured.childMarriageGoal) : 0);
    finalGoalsAmount = finalGoalsAmount + (sumGoalsAssured.vacatonGoals ? parseInt(sumGoalsAssured.vacatonGoals) : 0);
    finalGoalsAmount = finalGoalsAmount + (sumGoalsAssured.otherGoals ? parseInt(sumGoalsAssured.otherGoals) : 0);
    $m.juci.dataset("totalAmount", finalGoalsAmount);
}

function hide() {
    $m.juci.findById("pop").hide();
}

function onSecondSectionClick(event) {
    $m.juci.dataset("calculatedAmount", {
        "amountToBeAchieved": "",
        "amountToBeAchievedInTime": "",
        "amountToBeSaved": "",
        "currentSavings": ""
    });
    var goalTime = $m.juci.dataset("goalTime");
    var splitTime = goalTime.split("Y");
    var goalSpecifiedTime = splitTime[0];
    var eventData = ko.toJS(event);

    savingsPerAnnum = parseInt(eventData.annualIncome) * 0.3;
    savingsTimeToReachGoal = savingsPerAnnum * parseInt(goalSpecifiedTime);
    totalSavings = parseInt(eventData.currentSavings) + savingsTimeToReachGoal;

    if ((!savingsPerAnnum) || (!savingsTimeToReachGoal) || (!totalSavings)) {
        $m.alert("Please enter the amount");
        return;
    } else {
        var specificAmountToreachYourGoal = parseInt(eventData.totalAmount) - totalSavings;
        var SpecificTimeToReachGoal = parseInt(goalSpecifiedTime) + (specificAmountToreachYourGoal / savingsPerAnnum);
        var savingsToReachGoal = specificAmountToreachYourGoal / parseInt(goalSpecifiedTime);
        var SpecificTimeToReachGoal = SpecificTimeToReachGoal.toFixed(1);

        var calculatedAmount = $m.juci.dataset("calculatedAmount");
        calculatedAmount.amountToBeAchieved = parseFloat(specificAmountToreachYourGoal).toFixed(1);
        calculatedAmount.amountToBeAchievedInTime = parseFloat(SpecificTimeToReachGoal).toFixed(1);
        calculatedAmount.amountToBeSaved = parseFloat(savingsToReachGoal).toFixed(1);
        if (calculatedAmount.amountToBeAchieved < 0 || calculatedAmount.amountToBeAchievedInTime < 0 || calculatedAmount.amountToBeSaved < 0) {
            $m.alert("Please enter valid input");
            return;
        } else {
            current_id = "third_page";
            $m.juci.findById("second-section").hide();
            $m.juci.findById("third-section").show();
            $m.juci.findById("welcome-text").el.innerText = "How much do you need to achieve your goal?";
            $m.juci.findById("disclaimer").el.innerText = "You are just 1 steps away from reaching your goals";
            $m.juci.dataset("thirdSection", true);
            $m.juci.dataset("goalsText", true);
        }
        $m.juci.dataset("calculatedAmount", calculatedAmount);
    }

}

function onThirdSectionClick(e) {
    current_id = "final_page";
    var eventData = ko.toJS(e);
    $m.juci.findById("third-section").hide();
    $m.juci.findById("fourth-section").show();
    $m.juci.dataset("baseOption", {
        "years": "",
        "noOfPoliciesPerMonth": "",
        "noOfMeetingsPerMonth": "",
        "avgMeetingsPerDay": ""
    });
    $m.juci.dataset("aggressiveOption", {
        "years": "",
        "noOfPoliciesPerMonth": "",
        "noOfMeetingsPerMonth": "",
        "avgMeetingsPerDay": ""
    });
    $m.juci.dataset("conservativeOption", {
        "years": "",
        "noOfPoliciesPerMonth": "",
        "noOfMeetingsPerMonth": "",
        "avgMeetingsPerDay": ""
    });
    $m.juci.findById("welcome-text").el.innerText = "Your Options...";
    $m.juci.findById("disclaimer").el.innerText = "Finish..";

    $m.juci.dataset("fourthSection", true);
    var goalTime = $m.juci.dataset("goalTime");
    var splitTime = goalTime.split("Y");
    var goalSpecifiedTime = parseInt(splitTime[0]);
    var totalAmount = eventData.calculatedAmount.amountToBeAchieved;
    //	totalAmount = parseInt(totalAmount);
    //	totalAmount = totalAmount/100000;
    var getPoliciesCallback = function(r) {
        var baseOption = $m.juci.dataset("baseOption");
        baseOption.years = goalSpecifiedTime;
        if (r == "N/A") {
            $m.alert("Improper input values,Please give the proper value", "Alert", function() {
                $m.juci.findById("second-section").hide();
                $m.juci.findById("first-section").show();
                $m.juci.findById("third-section").hide();
                $m.juci.findById("fourth-section").hide();
                $m.juci.findById("fifth-section").hide();
                $m.juci.findById("welcome-text").el.innerText = "Welcome to My Dream My Income Calculator";
                $m.juci.findById("disclaimer").el.innerText = "You are just 3 steps away from reaching your goals";
                return;
            })
        } else if (!r) {
            $m.juci.findById("second-section").hide();
            $m.juci.findById("first-section").hide();
            $m.juci.findById("third-section").hide();
            $m.juci.findById("fourth-section").hide();
            $m.juci.findById("fifth-section").show();
            $m.juci.findById("welcome-text").el.innerText = "How much do you need to achieve your goal?";
            $m.juci.findById("disclaimer").el.innerText = "You are just 1 steps away from reaching your goals";
            return;
            baseOption.noOfPoliciesPerMonth = 20;
            baseOption.noOfMeetingsPerMonth = goalSpecifiedTime > 5 ? 20 * 3 : 20 * 4;
        } else {
            baseOption.noOfPoliciesPerMonth = r;
            baseOption.noOfMeetingsPerMonth = goalSpecifiedTime > 5 ? r * 3 : r * 4;
        }
        baseOption.avgMeetingsPerDay = baseOption.noOfMeetingsPerMonth / 25;
        $m.juci.dataset("baseOption", baseOption);
        var aggressiveOption = $m.juci.dataset("aggressiveOption");
        aggressiveOption.years = goalSpecifiedTime - 1;
        var getAggressivePoliciesCallback = function(res) {
            if (res == "N/A") {
                $m.alert("Improper input values,Please give the proper value", "Alert", function() {
                    $m.juci.findById("second-section").hide();
                    $m.juci.findById("first-section").show();
                    $m.juci.findById("third-section").hide();
                    $m.juci.findById("fourth-section").hide();
                    $m.juci.findById("fifth-section").hide();
                    $m.juci.findById("welcome-text").el.innerText = "Welcome to My Dream My Income Calculator";
                    $m.juci.findById("disclaimer").el.innerText = "You are just 3 steps away from reaching your goals";
                    return;
                })
            } else if (!res) {
                $m.juci.findById("second-section").hide();
                $m.juci.findById("first-section").hide();
                $m.juci.findById("third-section").hide();
                $m.juci.findById("fourth-section").hide();
                $m.juci.findById("fifth-section").show();
                $m.juci.findById("welcome-text").el.innerText = "How much do you need to achieve your goal?";
                $m.juci.findById("disclaimer").el.innerText = "You are just 1 steps away from reaching your goals";
                return;
                aggressiveOption.noOfPoliciesPerMonth = 20;
                aggressiveOption.noOfMeetingsPerMonth = aggressiveOption.years > 5 ? 20 * 3 : 20 * 4;
            } else {
                aggressiveOption.noOfPoliciesPerMonth = res;
                aggressiveOption.noOfMeetingsPerMonth = aggressiveOption.years > 5 ? res * 3 : res * 4;
            }
            aggressiveOption.avgMeetingsPerDay = aggressiveOption.noOfMeetingsPerMonth / 25;
            $m.juci.dataset("aggressiveOption", aggressiveOption);
        };
        myDreamMyIncomeCalculator.calculateNumberOfPolicies(aggressiveOption.years, totalAmount, getAggressivePoliciesCallback);
        var conservativeOption = $m.juci.dataset("conservativeOption");
        conservativeOption.years = goalSpecifiedTime + 1;
        var getConservativePoliciesCallback = function(r) {
            if (r == "N/A") {
                $m.alert("Improper input values,Please give the proper value", "Alert", function() {
                    $m.juci.findById("second-section").hide();
                    $m.juci.findById("first-section").show();
                    $m.juci.findById("third-section").hide();
                    $m.juci.findById("fourth-section").hide();
                    $m.juci.findById("fifth-section").hide();
                    $m.juci.findById("welcome-text").el.innerText = "Welcome to My Dream My Income Calculator";
                    $m.juci.findById("disclaimer").el.innerText = "You are just 3 steps away from reaching your goals";
                    return;
                })
            } else if (!r) {
                $m.juci.findById("second-section").hide();
                $m.juci.findById("first-section").hide();
                $m.juci.findById("third-section").hide();
                $m.juci.findById("fourth-section").hide();
                $m.juci.findById("fifth-section").show();
                $m.juci.findById("welcome-text").el.innerText = "How much do you need to achieve your goal?";
                $m.juci.findById("disclaimer").el.innerText = "You are just 1 steps away from reaching your goals";
                return;
                conservativeOption.noOfPoliciesPerMonth = 20;
                conservativeOption.noOfMeetingsPerMonth = conservativeOption.years > 5 ? 20 * 3 : 20 * 4;
            } else {
                conservativeOption.noOfPoliciesPerMonth = r;
                conservativeOption.noOfMeetingsPerMonth = conservativeOption.years > 5 ? r * 3 : r * 4;
            }
            conservativeOption.avgMeetingsPerDay = conservativeOption.noOfMeetingsPerMonth / 25;
            $m.juci.dataset("conservativeOption", conservativeOption);
            saveIncomeCalculatorData();
        };
        myDreamMyIncomeCalculator.calculateNumberOfPolicies(conservativeOption.years, totalAmount, getConservativePoliciesCallback);
    };
    myDreamMyIncomeCalculator.calculateNumberOfPolicies(goalSpecifiedTime, totalAmount, getPoliciesCallback);
}

function saveIncomeCalculatorData() {
    var requestObj = {};
    var userData = $m.juci.dataset("fetchingUserDetails");
    var aggressiveOption = $m.juci.dataset("aggressiveOption");
    var calculatedAmount = $m.juci.dataset("calculatedAmount");
    var baseOption = $m.juci.dataset("baseOption");
    var conservativeOption = $m.juci.dataset("conservativeOption");
    var goalsSection = $m.juci.dataset("goalsSection");
    var goalTime = $m.juci.dataset("goalTime");
    var currentSavings = $m.juci.dataset("currentSavings");
    var annualIncome = $m.juci.dataset("annualIncome");
    var totalAmount = $m.juci.dataset("totalAmount");
    var roleNames = $m.juci.dataset("roleNames");

    //	requestObj.Aadhaar = userData.Aadhaar ? userData.Aadhaar : userData[0].Aadhaar;
    requestObj.Added_By = $m.getUsername();
    requestObj.Actual_Time_to_reach_goals = calculatedAmount.amountToBeAchievedInTime.toString();
    requestObj.Adv_Type = roleNames;
    requestObj.Advisor_Code = $m.getPref("advisorCode") ? $m.getPref("advisorCode") : $m.getUsername();
    requestObj.Age = ""; // calculate age based on dob
    requestObj.Aggressive_Avg_No_of_meetings_Perday = aggressiveOption.avgMeetingsPerDay ? aggressiveOption.avgMeetingsPerDay.toString() : "";
    requestObj.Aggressive_No_of_meetings_PerMonth = aggressiveOption.noOfMeetingsPerMonth ? aggressiveOption.noOfMeetingsPerMonth.toString() : "";
    requestObj.Aggressive_No_of_policies_PerMonth = aggressiveOption.noOfPoliciesPerMonth ? aggressiveOption.noOfPoliciesPerMonth.toString() : "";
    requestObj.Aggressive_Years = aggressiveOption.years ? aggressiveOption.years.toString() : "";
    requestObj.Amount_For_each_year_to_reach_goals_on_time = calculatedAmount.amountToBeAchieved ? calculatedAmount.amountToBeAchieved.toString() : "";
    requestObj.Amount_to_reach_goals_on_time = calculatedAmount.amountToBeSaved ? calculatedAmount.amountToBeSaved.toString() : "";
    requestObj.Base_Avg_No_of_meetings_Perday = baseOption.avgMeetingsPerDay ? baseOption.avgMeetingsPerDay.toString() : "";
    requestObj.Base_No_of_meetings_PerMonth = baseOption.noOfMeetingsPerMonth ? baseOption.noOfMeetingsPerMonth.toString() : "";
    requestObj.Base_No_of_policies_PerMonth = baseOption.noOfPoliciesPerMonth ? baseOption.noOfPoliciesPerMonth.toString() : "";
    requestObj.Base_Years = baseOption.years ? baseOption.years.toString() : "";
    requestObj.Conservative_Avg_No_of_meetings_Perday = conservativeOption.avgMeetingsPerDay ? conservativeOption.avgMeetingsPerDay.toString() : "";
    requestObj.Conservative_No_of_meetings_PerMonth = conservativeOption.noOfMeetingsPerMonth ? conservativeOption.noOfMeetingsPerMonth.toString() : "";
    requestObj.Conservative_No_of_policies_PerMonth = conservativeOption.noOfPoliciesPerMonth ? conservativeOption.noOfPoliciesPerMonth.toString() : "";
    requestObj.Conservative_Years = conservativeOption.years ? conservativeOption.years.toString() : "";
    requestObj.Current_Savings_A = currentSavings;
    requestObj.Goal_Car = goalsSection.carGoal;
    requestObj.Goal_Child_Education = goalsSection.childEducationGoal;
    requestObj.Goal_Child_Marriage = goalsSection.childMarriageGoal;
    requestObj.Goal_Home = goalsSection.homeGoal;
    requestObj.Goal_Others = goalsSection.otherGoals;
    requestObj.Goal_Vacation = goalsSection.vacatonGoals;
    requestObj.Identification_code = "";
    requestObj.Income_Per_Annum = annualIncome;
    requestObj.Lead_ID = userData.Lead_Id ? userData.Lead_Id : null;
    requestObj.Mobile = userData.Mobile ? userData.Mobile : null;
    requestObj.Name = userData.Name ? userData.Name : "";
    requestObj.Savings_Per_Annum_30Percent = savingsPerAnnum ? savingsPerAnnum.toString() : "";
    requestObj.Savings_during_Goals_B = savingsTimeToReachGoal ? savingsTimeToReachGoal.toString() : "";
    requestObj.Source_From = "TAB";
    requestObj.Total_Goal_Amount = totalAmount.toString();
    requestObj.Total_Savings_A_B = totalSavings ? totalSavings.toString() : "";
    requestObj.Years_To_ReachGoals = goalTime;
    console.log(requestObj);

    utils.ShowProgress("Saving Income Calculator Data..");
    var service = new ServiceLibrary();
    var saveIncomeCalculatorCallback = function(res) {
        utils.HideProgress();
        if (res.Status == "Y") {
            $m.toast(res.Message);
        } else {
            $m.logError("Save Income Calculator failed due to : " + res);
        }
    };
    service.saveIncomeCalculator(saveIncomeCalculatorCallback, requestObj);
}

function onChangeGoals(event) {
    var eventValue = event.value;
    switch (eventValue) {
        case "Home Goal":
            $m.juci.dataset("isHomeGoal", true);
            break;
        case "Car Goal":
            $m.juci.dataset("isCarGoal", true);
            break;
        case "Child's Education Goal":
            $m.juci.dataset("isEducationGoal", true);
            break;
        case "Child's Marriage Goal":
            $m.juci.dataset("isMarriageGoal", true);
            break;
        case "Vacation Goal":
            $m.juci.dataset("isVacationGoal", true);
            break;
        case "Other Goals":
            $m.juci.dataset("isOtherGoal", true);
            break;
    }
}

function onFinishedClick() {
    $m.juci.findById("second-section").hide();
    $m.juci.findById("first-section").hide();
    $m.juci.findById("third-section").hide();
    $m.juci.findById("fourth-section").hide();
    $m.juci.findById("calculator").show();
    $m.juci.dataset("isCalculator", true);
    $m.juci.findById("welcome-text").el.innerText = "Welcome..";
    $m.juci.findById("disclaimer").el.innerText = "Select your calculator..";
    current_id = "home_page";

}

function initNetworkCalculator() {
	 
    $m.juci.dataset("thinbar", "Welcome to Newtork Calculator...");
    $m.juci.dataset("footerText", "Please answer for the above questions");
    showMenu("network-calculator");
    $m.juci.dataset("questionaries", {
        "relativesCount": "",
        "relatives": ["Upto 100", "101-250", "251-500", "More than 500"],
        "spouseOptions": ["Yes", "No"],
        "spouse": "",
        "inLawsoptions": ["Upto 100", "101-250", "251-500", "More than 500"],
        "inLawsValue": "",
        "socialMediaoptions": ["Upto 500", "501-1000", "1001-2000", "More than 2000"],
        "socialMediaValue": "",
        "businessOptions": ["Yes", "No"],
        "businessValue": "",
        "businessCustomerOptions": ["Upto 500", "501-1000", "1001-2000", "More than 2000"],
        "businessCustomerValue": "",
        "policyOptions": ["3", "4", "5", "6", "7", "8"],
        "policyValue": ""
    });
    $m.juci.dataset("isCalculator", false);
}

function initHLVCalculator() {
    current_id = "cal_page";
    $m.juci.findById("calculator").hide();
   
    $m.juci.dataset("thinbar1",false);
     var hlvf = utils.GetControl("hlvfrm1");
   	hlvf.clearValidation();
    resethlv();
   // $m.juci.dataset("thinbar", "Welcome to HLV Calculator...");
     $m.juci.findById("disclaimer").el.innerText = "Please enter the following details to find the score.";
    $m.juci.dataset("footerText", "Please enter the following details to find the score.");
    showMenu("hlv_calculator");
    $m.juci.dataset("isCalculator", false);
	$m.juci.dataset("hlv1",true);
	$m.juci.dataset("hlv2",false);
	$m.juci.dataset("hlv3",false);
	 $m.juci.dataset("result", false);
}

function initRetirementCalculator() {
    current_id = "cal_page";
    $m.juci.findById("calculator").hide();
	var retf = utils.GetControl("retfrm");
  	retf.clearValidation();
    resetretire();
    $m.juci.dataset("thinbar1",false); 
  //  $m.juci.dataset("thinbar", "Welcome to Retirement Calculator...");
   $m.juci.dataset("footerText", "Please enter the following details to find the score.");
    $m.juci.findById("disclaimer").el.innerText = "Please enter the following details to find the score.";
    showMenu("hlv_calculator");
	$m.juci.dataset("isCalculator", false);
	$m.juci.dataset("retire1",true);
	$m.juci.dataset("retire2",false);
	$m.juci.dataset("retirement_result", false);
}

function initTaxCalculator() {
    current_id = "cal_page";
    $m.juci.findById("calculator").hide();
	var taxf = utils.GetControl("TAXForm");
  	taxf.clearValidation();
    resettax();
    $m.juci.dataset("thinbar1",false);
 //   $m.juci.dataset("thinbar", "Welcome to Tax Calculator...");
    $m.juci.dataset("footerText", "Please enter the following details to find the score.");
   $m.juci.findById("disclaimer").el.innerText = "Please enter the following details to find the score.";
   showMenu("tax_calculator");
	$m.juci.dataset("isCalculator",false);
	$m.juci.dataset("taxi1",true);
	$m.juci.dataset("tax1", false);
	$m.juci.dataset("tax2", false);
	$m.juci.dataset("tax_result", false);
}

function initChildEducationCalculator() {
    current_id = "cal_page";
    $m.juci.findById("calculator").hide();
    $m.juci.dataset("thinbar1",false);
	var childf = utils.GetControl("CHILDForm");
  	childf.clearValidation();
    resetchild();
    //$m.juci.dataset("thinbar", "Welcome to Children Education Calculator...");
    $m.juci.dataset("footerText", "Please enter the following details to find the score.");
      $m.juci.findById("disclaimer").el.innerText = "Please enter the following details to find the score.";
    showMenu("child_calculator");
    $m.juci.dataset("isCalculator", false);
}

function initFHSCalculator() {
    current_id = "cal_page";
    $m.juci.findById("calculator").hide();
	var fhsf = utils.GetControl("FHSForm");
	fhsf.clearValidation();
	document.getElementById('number1').value = "1";
	$m.juci.dataset("numchildren",false);
    resetfhs();
	$m.juci.dataset("child1",true);
	$m.juci.dataset("child2",false);
	$m.juci.dataset("child3",false);
	$m.juci.dataset("child4",false);
	$m.juci.dataset("child5",false);
    $m.juci.dataset("thinbar1",false);
   // $m.juci.dataset("thinbar", "Welcome to HLV Calculator...");
     $m.juci.findById("disclaimer").el.innerText = "Please enter the following details to find the score.";
    $m.juci.dataset("footerText", "Please enter the following details to find the score.");
    showMenu("hlv_calculator");
  
//    $m.juci.dataset("spousedb",false);
	$m.juci.dataset("isCalculator",false);
	$m.juci.dataset("fhs1",true);
	$m.juci.dataset("fhs2",false);
	$m.juci.dataset("fhs3",false);
	$m.juci.dataset("fhs4",false);
	$m.juci.dataset("fhs5",false);
	$m.juci.dataset("fhsresult",false);
}


function onChangeClick(e) {
    var datasetData = $m.juci.dataset("questionaries");
    if (e.value == "No") {
        datasetData.inLawsValue = 0;
    }
    $m.juci.dataset("questionaries", datasetData);
}

function onChangeBusinessClick(e) {
    var datasetData = $m.juci.dataset("questionaries");
    if (e.value == "No") {
        datasetData.businessCustomerValue = 0;
    }
    $m.juci.dataset("questionaries", datasetData);
}

function onSubmitClick() {
    var datasetData = $m.juci.dataset("questionaries");
    var selectedOptions = {
        "firstQuestionAns": datasetData.relativesCount,
        "thirdQuestionAns": datasetData.socialMediaValue,
        "secondQuestionAns": datasetData.inLawsValue,
        "fourthQuestionAns": datasetData.businessCustomerValue,
        "noOfPolicies": datasetData.policyValue
    };
    var networkCalculatorCallback = function(res) {
        console.log(res);
        var networkDataset = $m.juci.dataset("networkCalci");
        $m.putPref("networkCalDetails", res);
        $m.savePref();
        networkDataset = "<span class='congratulation'>Congratulations!</span> <span class='message'>Your network is estimated to have <font color='red'><b>" + res.estimatedConnections + " </b></font>connections.You have potential to sell <font color='red'><b>" + res.estimationPoliciesSold + "</b></font> policies to your connections and achieve policy sales target for next <font color='red'><b>" + res.estimatedYearsOfSales + "</b></font> year/s. Join us today.</span>";
        $m.juci.dataset("networkCalci", networkDataset);
        utils.ShowDialog("dialog-network-calculator");
    };
    networkCalculator.calculateEstimatedNetworkConnections(selectedOptions, networkCalculatorCallback);
}

//function hideMenu(id) {
//	$m.juci.findById(id).hide();
//}

function showMenu(id) {
    $m.juci.findById(id).show();
}

function onClose(id) {
    utils.HideDialog(id);
    saveNetworkDetails();
    $m.close();
}

function onBackClick(e) {
    $m.juci.dataset("isPreviousEntry", false);
    $m.juci.dataset("isLeadOrAdvisor", true);
    $m.juci.findById("select-role").show();
    $m.juci.findById("disclaimer").show();
    $m.juci.findById("lead-no").show();
}

$m.onClose(function() {
    //	$m.juci.findById("second-section").hide();
    //	$m.juci.findById("first-section").hide();
    //	$m.juci.findById("third-section").hide();
    //	$m.juci.findById("fourth-section").hide();
    event.preventDefault();
});

function formatValue(value) {
    return formatMoney(value);
}

function onRolesChange(e) {
    if (e.value == "New Advisor" || e.value == "Existing Advisor") {
        $m.juci.dataset("leadno", "");
    } else {
        $m.juci.dataset("advisorCode", "");
    }
}

function onBackPress() {
    switch (current_id) {
        case "home_page":
        	$m.juci.dataset("calculatorName", "");
			resethlv();
			resetretire();
			resettax();
			resetfhs();
			reset();
		var retf = utils.GetControl("retfrm");
      	retf.clearValidation();
      	var taxf = utils.GetControl("TAXForm");
      	taxf.clearValidation();
      	var childf = utils.GetControl("CHILDForm");
      	childf.clearValidation();
      	var fhsf = utils.GetControl("FHSForm");
      	fhsf.clearValidation();
      	var hlvf = utils.GetControl("hlvfrm1");
      	hlvf.clearValidation();
    	document.getElementById('number1').value = "1";
    	$m.juci.dataset("numchildren",false);
		$m.juci.dataset("child1",true);
		$m.juci.dataset("child2",false);
		$m.juci.dataset("child3",false);
		$m.juci.dataset("child4",false);
		$m.juci.dataset("child5",false);

            $m.open("com.cloudpact.mowbly.home", "/system/resourceHome.html", null);
            break;
        case "first_page":
            $m.juci.findById("calculator").show();
            $m.juci.findById("first-section").hide();
            $m.juci.findById("second-section").hide();
            $m.juci.findById("disclaimer").show();
            $m.juci.findById("welcome-text").el.innerText = "Welcome..";
            $m.juci.findById("disclaimer").el.innerText = "Select your calculator..";
            $m.juci.findById("third-section").hide();
            $m.juci.findById("fourth-section").hide();
            $m.juci.findById("retirement_calculator").hide();
            $m.juci.findById("hlv_calculator").hide();
            $m.juci.findById("tax_calculator").hide();
            $m.juci.findById("child_calculator").hide();
            $m.juci.findById("fhs_calculator").hide();
            current_id = "home_page";
            break;
       case "cal_page":
            $m.juci.findById("calculator").show();
            $m.juci.findById("first-section").hide();
            $m.juci.findById("second-section").hide();
            $m.juci.findById("disclaimer").show();
            $m.juci.findById("welcome-text").el.innerText = "Welcome..";
            $m.juci.findById("disclaimer").el.innerText = "Select your calculator..";
            $m.juci.findById("third-section").hide();
            $m.juci.findById("fourth-section").hide();
            $m.juci.findById("retirement_calculator").hide();
            $m.juci.findById("hlv_calculator").hide();
            $m.juci.findById("tax_calculator").hide();
            $m.juci.findById("child_calculator").hide();
            $m.juci.findById("fhs_calculator").hide();
            current_id = "home_page";
            break;
        case "previous_page":
            $m.juci.findById("first-section").show();
            $m.juci.findById("disclaimer").show();
            $m.juci.dataset("isPreviousEntry", false);
            $m.juci.findById("welcome-text").el.innerText = "Welcome to My Dream My Income Calculator";
            $m.juci.findById("disclaimer").el.innerText = "You are just 3 steps away from reaching your goals";
            $m.juci.findById("second-section").hide();
            $m.juci.findById("third-section").hide();
            $m.juci.findById("fourth-section").hide();
            current_id = "first_page";
            break;
        case "second_page":
            $m.juci.findById("first-section").show();
            $m.juci.findById("disclaimer").show();
            $m.juci.findById("welcome-text").el.innerText = "Welcome to My Dream My Income Calculator";
            $m.juci.findById("disclaimer").el.innerText = "You are just 3 steps away from reaching your goals";
            $m.juci.findById("second-section").hide();
            $m.juci.findById("third-section").hide();
            $m.juci.findById("fourth-section").hide();
            current_id = "first_page";
            break;
        case "third_page":
            $m.juci.findById("second-section").show();
            $m.juci.findById("disclaimer").show();
            $m.juci.findById("welcome-text").el.innerText = "Let us know something about you";
            $m.juci.findById("disclaimer").el.innerText = "You are just 2 steps away from reaching your goals";
            $m.juci.findById("third-section").hide();
            $m.juci.findById("first-section").hide();
            $m.juci.findById("fourth-section").hide();
            $m.juci.findById("fifth-section").hide();
            current_id = "second_page";
            break;
        case "final_page":
            $m.juci.findById("second-section").hide();
            $m.juci.findById("third-section").show();
            $m.juci.findById("disclaimer").show();
            $m.juci.findById("welcome-text").el.innerText = "How much do you need to achieve your goal?";
            $m.juci.findById("disclaimer").el.innerText = "You are just 1 steps away from reaching your goals";
            $m.juci.findById("first-section").hide();
            $m.juci.findById("fourth-section").hide();
            current_id = "third_page";
            break;
        case "premium_page":
            $m.juci.findById("second-section").hide();
            $m.juci.findById("fifth-section").show();
            $m.juci.findById("disclaimer").show();
            $m.juci.findById("welcome-text").el.innerText = "How much do you need to achieve your goal?";
            $m.juci.findById("disclaimer").el.innerText = "You are just 1 steps away from reaching your goals";
            $m.juci.findById("first-section").hide();
            $m.juci.findById("third-section").hide();
            $m.juci.findById("fourth-section").hide();
            current_id = "third_page";
            break;
    }
}


function onPremiumChange(event) {
    current_id = "premium_page";
    var eventValue = event.value;
    $m.juci.getControl("premium-value").value(null);
    var goalTime = $m.juci.dataset("goalTime");
    var splitTime = goalTime.split("Y");
    var goalSpecifiedTime = parseInt(splitTime[0]);
    var goalAmount = $m.juci.dataset("calculatedAmount");
    var goal_Amount = goalAmount.amountToBeAchieved;
    $m.juci.findById("fifth-section").hide();
    $m.juci.findById("fourth-section").show();
    $m.juci.findById("welcome-text").el.innerText = "Your Options...";
    $m.juci.findById("disclaimer").el.innerText = "Finish..";
    if (eventValue == 50000) {
        var revisedFirstCalculatorCallback = function(r) {
            var baseOption = $m.juci.dataset("baseOption");
            baseOption.years = goalSpecifiedTime;
            if (!r || r == undefined) {
                baseOption.noOfPoliciesPerMonth = 20;
                baseOption.noOfMeetingsPerMonth = goalSpecifiedTime > 5 ? 20 * 3 : 20 * 4;
            } else {
                baseOption.noOfPoliciesPerMonth = r;
                baseOption.noOfMeetingsPerMonth = goalSpecifiedTime > 5 ? r * 3 : r * 4;
            }
            baseOption.avgMeetingsPerDay = baseOption.noOfMeetingsPerMonth / 25;
            $m.juci.dataset("baseOption", baseOption);

            var aggressiveOption = $m.juci.dataset("aggressiveOption");
            aggressiveOption.years = goalSpecifiedTime - 1;
            var revisedFirstAggresiveCalculatorCallback = function(res) {
                if (!res) {
                    aggressiveOption.noOfPoliciesPerMonth = 20;
                    aggressiveOption.noOfMeetingsPerMonth = aggressiveOption.years > 5 ? 20 * 3 : 20 * 4;
                } else {
                    aggressiveOption.noOfPoliciesPerMonth = res;
                    aggressiveOption.noOfMeetingsPerMonth = aggressiveOption.years > 5 ? res * 3 : res * 4;
                }
                aggressiveOption.avgMeetingsPerDay = aggressiveOption.noOfMeetingsPerMonth / 25;
                $m.juci.dataset("aggressiveOption", aggressiveOption);
                var conservativeOption = $m.juci.dataset("conservativeOption");
                conservativeOption.years = goalSpecifiedTime + 1;

                var getConservativePoliciesCallback = function(r) {
                    if (!r || r == undefined) {
                        conservativeOption.noOfPoliciesPerMonth = 20;
                        conservativeOption.noOfMeetingsPerMonth = conservativeOption.years > 5 ? 20 * 3 : 20 * 4;
                    } else {
                        conservativeOption.noOfPoliciesPerMonth = r;
                        conservativeOption.noOfMeetingsPerMonth = conservativeOption.years > 5 ? r * 3 : r * 4;
                    }
                    conservativeOption.avgMeetingsPerDay = conservativeOption.noOfMeetingsPerMonth / 25;
                    $m.juci.dataset("conservativeOption", conservativeOption);
                    saveIncomeCalculatorData();
                };
                revisedMyDreamMyIncomeCalculator.RevisedFirstCaluclator(conservativeOption.years, goal_Amount, eventValue, getConservativePoliciesCallback);
            }
            revisedMyDreamMyIncomeCalculator.RevisedFirstCaluclator(aggressiveOption.years, goal_Amount, eventValue, revisedFirstAggresiveCalculatorCallback);
        };
        revisedMyDreamMyIncomeCalculator.RevisedFirstCaluclator(goalSpecifiedTime, goal_Amount, eventValue, revisedFirstCalculatorCallback);

    } else if (eventValue == 60000) {
        var revisedSecondCalculatorCallback = function(r) {
            var baseOption = $m.juci.dataset("baseOption");
            baseOption.years = goalSpecifiedTime;
            if (r == undefined) {
                baseOption.noOfPoliciesPerMonth = 20;
                baseOption.noOfMeetingsPerMonth = baseOption.years > 5 ? 20 * 3 : 20 * 4;
            } else if (r) {
                baseOption.noOfPoliciesPerMonth = r;
                baseOption.noOfMeetingsPerMonth = baseOption.years > 5 ? r * 3 : r * 4;
            }
            baseOption.avgMeetingsPerDay = baseOption.noOfMeetingsPerMonth / 25;
            $m.juci.dataset("baseOption", baseOption);
            var aggressiveOption = $m.juci.dataset("aggressiveOption");
            aggressiveOption.years = goalSpecifiedTime - 1;
            var revisedFirstAggresiveCalculatorCallback = function(res) {
                if (!res) {
                    aggressiveOption.noOfPoliciesPerMonth = 20;
                    aggressiveOption.noOfMeetingsPerMonth = aggressiveOption.years > 5 ? 20 * 3 : 20 * 4;
                } else {
                    aggressiveOption.noOfPoliciesPerMonth = res;
                    aggressiveOption.noOfMeetingsPerMonth = aggressiveOption.years > 5 ? res * 3 : res * 4;
                }
                aggressiveOption.avgMeetingsPerDay = aggressiveOption.noOfMeetingsPerMonth / 25;
                $m.juci.dataset("aggressiveOption", aggressiveOption);
            }

            var conservativeOption = $m.juci.dataset("conservativeOption");
            conservativeOption.years = goalSpecifiedTime + 1;

            var getConservativePoliciesCallback = function(r) {
                if (!r) {
                    conservativeOption.noOfPoliciesPerMonth = 20;
                    conservativeOption.noOfMeetingsPerMonth = conservativeOption.years > 5 ? 20 * 3 : 20 * 4;
                } else {
                    conservativeOption.noOfPoliciesPerMonth = r;
                    conservativeOption.noOfMeetingsPerMonth = conservativeOption.years > 5 ? r * 3 : r * 4;
                }
                conservativeOption.avgMeetingsPerDay = conservativeOption.noOfMeetingsPerMonth / 25;
                $m.juci.dataset("conservativeOption", conservativeOption);
                saveIncomeCalculatorData();
            };
            revisedMyDreamMyIncomeCalculator.RevisedSecondCalculator(conservativeOption.years, goal_Amount, eventValue, getConservativePoliciesCallback);
            revisedMyDreamMyIncomeCalculator.RevisedSecondCalculator(aggressiveOption.years, goal_Amount, eventValue, revisedFirstAggresiveCalculatorCallback);
        };
        revisedMyDreamMyIncomeCalculator.RevisedSecondCalculator(goalSpecifiedTime, goal_Amount, eventValue, revisedSecondCalculatorCallback);

    } else if (eventValue == 70000) {
        var revisedSecondCalculatorCallback = function(r) {
            var baseOption = $m.juci.dataset("baseOption");
            baseOption.years = goalSpecifiedTime;
            if (r == undefined) {
                baseOption.noOfPoliciesPerMonth = 20;
                baseOption.noOfMeetingsPerMonth = baseOption.years > 5 ? 20 * 3 : 20 * 4;
            } else if (r) {
                baseOption.noOfPoliciesPerMonth = r;
                baseOption.noOfMeetingsPerMonth = baseOption.years > 5 ? r * 3 : r * 4;
            }
            baseOption.avgMeetingsPerDay = baseOption.noOfMeetingsPerMonth / 25;
            $m.juci.dataset("baseOption", baseOption);

            var aggressiveOption = $m.juci.dataset("aggressiveOption");
            aggressiveOption.years = goalSpecifiedTime - 1;
            var revisedFirstAggresiveCalculatorCallback = function(res) {
                if (!res) {
                    aggressiveOption.noOfPoliciesPerMonth = 20;
                    aggressiveOption.noOfMeetingsPerMonth = aggressiveOption.years > 5 ? 20 * 3 : 20 * 4;
                } else {
                    aggressiveOption.noOfPoliciesPerMonth = res;
                    aggressiveOption.noOfMeetingsPerMonth = aggressiveOption.years > 5 ? res * 3 : res * 4;
                }
                aggressiveOption.avgMeetingsPerDay = aggressiveOption.noOfMeetingsPerMonth / 25;
                $m.juci.dataset("aggressiveOption", aggressiveOption);
                var getConservativePoliciesCallback = function(r) {
                    if (!r) {
                        conservativeOption.noOfPoliciesPerMonth = 20;
                        conservativeOption.noOfMeetingsPerMonth = conservativeOption.years > 5 ? 20 * 3 : 20 * 4;
                    } else {
                        conservativeOption.noOfPoliciesPerMonth = r;
                        conservativeOption.noOfMeetingsPerMonth = conservativeOption.years > 5 ? r * 3 : r * 4;
                    }
                    conservativeOption.avgMeetingsPerDay = conservativeOption.noOfMeetingsPerMonth / 25;
                    $m.juci.dataset("conservativeOption", conservativeOption);
                    saveIncomeCalculatorData();
                };
                var conservativeOption = $m.juci.dataset("conservativeOption");
                conservativeOption.years = goalSpecifiedTime + 1;
                revisedMyDreamMyIncomeCalculator.RevisedThirdCalculator(conservativeOption.years, goal_Amount, eventValue, getConservativePoliciesCallback);

            }
            revisedMyDreamMyIncomeCalculator.RevisedThirdCalculator(aggressiveOption.years, goal_Amount, eventValue, revisedFirstAggresiveCalculatorCallback);

        };
        revisedMyDreamMyIncomeCalculator.RevisedThirdCalculator(goalSpecifiedTime, goal_Amount, eventValue, revisedSecondCalculatorCallback);
    } else if (eventValue == 80000) {
        var revisedSecondCalculatorCallback = function(r) {
            var baseOption = $m.juci.dataset("baseOption");
            baseOption.years = goalSpecifiedTime;
            if (r == undefined) {
                baseOption.noOfPoliciesPerMonth = 20;
                baseOption.noOfMeetingsPerMonth = baseOption.years > 5 ? 20 * 3 : 20 * 4;
            } else if (r) {
                baseOption.noOfPoliciesPerMonth = r;
                baseOption.noOfMeetingsPerMonth = baseOption.years > 5 ? r * 3 : r * 4;
            }
            baseOption.avgMeetingsPerDay = baseOption.noOfMeetingsPerMonth / 25;
            $m.juci.dataset("baseOption", baseOption);

            var aggressiveOption = $m.juci.dataset("aggressiveOption");
            aggressiveOption.years = goalSpecifiedTime - 1;
            var revisedFirstAggresiveCalculatorCallback = function(res) {
                if (!res) {
                    aggressiveOption.noOfPoliciesPerMonth = 20;
                    aggressiveOption.noOfMeetingsPerMonth = aggressiveOption.years > 5 ? 20 * 3 : 20 * 4;
                } else {
                    aggressiveOption.noOfPoliciesPerMonth = res;
                    aggressiveOption.noOfMeetingsPerMonth = aggressiveOption.years > 5 ? res * 3 : res * 4;
                }
                aggressiveOption.avgMeetingsPerDay = aggressiveOption.noOfMeetingsPerMonth / 25;
                $m.juci.dataset("aggressiveOption", aggressiveOption);
                var getConservativePoliciesCallback = function(r) {
                    if (!r) {
                        conservativeOption.noOfPoliciesPerMonth = 20;
                        conservativeOption.noOfMeetingsPerMonth = conservativeOption.years > 5 ? 20 * 3 : 20 * 4;
                    } else {
                        conservativeOption.noOfPoliciesPerMonth = r;
                        conservativeOption.noOfMeetingsPerMonth = conservativeOption.years > 5 ? r * 3 : r * 4;
                    }
                    conservativeOption.avgMeetingsPerDay = conservativeOption.noOfMeetingsPerMonth / 25;
                    $m.juci.dataset("conservativeOption", conservativeOption);
                    saveIncomeCalculatorData();
                };
                var conservativeOption = $m.juci.dataset("conservativeOption");
                conservativeOption.years = goalSpecifiedTime + 1;
                revisedMyDreamMyIncomeCalculator.RevisedEightyThousandCalculator(conservativeOption.years, goal_Amount, eventValue, getConservativePoliciesCallback);

            }
            revisedMyDreamMyIncomeCalculator.RevisedEightyThousandCalculator(aggressiveOption.years, goal_Amount, eventValue, revisedFirstAggresiveCalculatorCallback);
        };
        revisedMyDreamMyIncomeCalculator.RevisedEightyThousandCalculator(goalSpecifiedTime, goal_Amount, eventValue, revisedSecondCalculatorCallback);
    } else if (eventValue == 90000) {
        var revisedSecondCalculatorCallback = function(r) {
            var baseOption = $m.juci.dataset("baseOption");
            baseOption.years = goalSpecifiedTime;
            if (r == undefined) {
                baseOption.noOfPoliciesPerMonth = 20;
                baseOption.noOfMeetingsPerMonth = baseOption.years > 5 ? 20 * 3 : 20 * 4;
            } else if (r) {
                baseOption.noOfPoliciesPerMonth = r;
                baseOption.noOfMeetingsPerMonth = baseOption.years > 5 ? r * 3 : r * 4;
            }
            baseOption.avgMeetingsPerDay = baseOption.noOfMeetingsPerMonth / 25;
            $m.juci.dataset("baseOption", baseOption);

            var aggressiveOption = $m.juci.dataset("aggressiveOption");
            aggressiveOption.years = goalSpecifiedTime - 1;
            var revisedFirstAggresiveCalculatorCallback = function(res) {
                if (!res) {
                    aggressiveOption.noOfPoliciesPerMonth = 20;
                    aggressiveOption.noOfMeetingsPerMonth = aggressiveOption.years > 5 ? 20 * 3 : 20 * 4;
                } else {
                    aggressiveOption.noOfPoliciesPerMonth = res;
                    aggressiveOption.noOfMeetingsPerMonth = aggressiveOption.years > 5 ? res * 3 : res * 4;
                }
                aggressiveOption.avgMeetingsPerDay = aggressiveOption.noOfMeetingsPerMonth / 25;
                $m.juci.dataset("aggressiveOption", aggressiveOption);
                var getConservativePoliciesCallback = function(r) {
                    if (!r) {
                        conservativeOption.noOfPoliciesPerMonth = 20;
                        conservativeOption.noOfMeetingsPerMonth = conservativeOption.years > 5 ? 20 * 3 : 20 * 4;
                    } else {
                        conservativeOption.noOfPoliciesPerMonth = r;
                        conservativeOption.noOfMeetingsPerMonth = conservativeOption.years > 5 ? r * 3 : r * 4;
                    }
                    conservativeOption.avgMeetingsPerDay = conservativeOption.noOfMeetingsPerMonth / 25;
                    $m.juci.dataset("conservativeOption", conservativeOption);
                    saveIncomeCalculatorData();
                };
                var conservativeOption = $m.juci.dataset("conservativeOption");
                conservativeOption.years = goalSpecifiedTime + 1;
                revisedMyDreamMyIncomeCalculator.RevisedNintyThousandCalculator(conservativeOption.years, goal_Amount, eventValue, getConservativePoliciesCallback);

            }
            revisedMyDreamMyIncomeCalculator.RevisedNintyThousandCalculator(aggressiveOption.years, goal_Amount, eventValue, revisedFirstAggresiveCalculatorCallback);
        };
        revisedMyDreamMyIncomeCalculator.RevisedNintyThousandCalculator(goalSpecifiedTime, goal_Amount, eventValue, revisedSecondCalculatorCallback);
    } else if (eventValue == 100000) {
        var revisedSecondCalculatorCallback = function(r) {
            var baseOption = $m.juci.dataset("baseOption");
            baseOption.years = goalSpecifiedTime;
            if (r == undefined) {
                baseOption.noOfPoliciesPerMonth = 20;
                baseOption.noOfMeetingsPerMonth = baseOption.years > 5 ? 20 * 3 : 20 * 4;
            } else if (r) {
                baseOption.noOfPoliciesPerMonth = r;
                baseOption.noOfMeetingsPerMonth = baseOption.years > 5 ? r * 3 : r * 4;
            }
            baseOption.avgMeetingsPerDay = baseOption.noOfMeetingsPerMonth / 25;
            $m.juci.dataset("baseOption", baseOption);

            var aggressiveOption = $m.juci.dataset("aggressiveOption");
            aggressiveOption.years = goalSpecifiedTime - 1;
            var revisedFirstAggresiveCalculatorCallback = function(res) {
                if (!res) {
                    aggressiveOption.noOfPoliciesPerMonth = 20;
                    aggressiveOption.noOfMeetingsPerMonth = aggressiveOption.years > 5 ? 20 * 3 : 20 * 4;
                } else {
                    aggressiveOption.noOfPoliciesPerMonth = res;
                    aggressiveOption.noOfMeetingsPerMonth = aggressiveOption.years > 5 ? res * 3 : res * 4;
                }
                aggressiveOption.avgMeetingsPerDay = aggressiveOption.noOfMeetingsPerMonth / 25;
                $m.juci.dataset("aggressiveOption", aggressiveOption);
                var getConservativePoliciesCallback = function(r) {
                    if (!r) {
                        conservativeOption.noOfPoliciesPerMonth = 20;
                        conservativeOption.noOfMeetingsPerMonth = conservativeOption.years > 5 ? 20 * 3 : 20 * 4;
                    } else {
                        conservativeOption.noOfPoliciesPerMonth = r;
                        conservativeOption.noOfMeetingsPerMonth = conservativeOption.years > 5 ? r * 3 : r * 4;
                    }
                    conservativeOption.avgMeetingsPerDay = conservativeOption.noOfMeetingsPerMonth / 25;
                    $m.juci.dataset("conservativeOption", conservativeOption);
                    saveIncomeCalculatorData();
                };
                var conservativeOption = $m.juci.dataset("conservativeOption");
                conservativeOption.years = goalSpecifiedTime + 1;
                revisedMyDreamMyIncomeCalculator.RevisedOneLakhCalculator(conservativeOption.years, goal_Amount, eventValue, getConservativePoliciesCallback);
            }
            revisedMyDreamMyIncomeCalculator.RevisedOneLakhCalculator(aggressiveOption.years, goal_Amount, eventValue, revisedFirstAggresiveCalculatorCallback);
        };
        revisedMyDreamMyIncomeCalculator.RevisedOneLakhCalculator(goalSpecifiedTime, goal_Amount, eventValue, revisedSecondCalculatorCallback);
    }
}

/** Check the age**/
function setAge(cuurentAge) {
    cuurentAge = cuurentAge.substring(0, cuurentAge.lastIndexOf(" "));
    var age = utils.GetAge(cuurentAge);
    return age;
}

function formatMoney(num) {
    if (num == "") {
        return "";
    } else {
        var n1, n2;
        if (typeof num == 'string')
            num = num.replace(/,/g, "");
        num = (Math.round(num * 100) / 100) + '' || '';
        // works for integer and floating as well
        n1 = num.split('.');
        n2 = n1[1];
        n1 = n1[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
        num = n2 ? n1 + '.' + n2 : n1;
        num = num;
        return num;
    }
}

function saveNetworkDetails() {
    var obj = {};
    var ques = $m.juci.dataset("questionaries");
    var resDetails = $m.getPref("networkCalDetails");
    obj.Added_By = $m.getUsername();
    obj.Est_Connections = resDetails.estimatedConnections
    obj.Est_Policies_Sold = resDetails.estimationPoliciesSold
    obj.Est_YearsOfSalesCoveredByConnections = ques.policyValue
    obj.Policies_Sold_PerMonth = resDetails.estimatedConnections
    obj.Q1 = ques.relativesCount
    obj.Q2 = ques.spouse
    obj.Q3 = ques.inLawsValue
    obj.Q4 = ques.socialMediaValue
    obj.Q5 = ques.businessValue
    obj.Q6 = ques.businessCustomerValue
    var service = new ServiceLibrary();
    var saveNetworkCalculatorCallback = function(res) {
        if (res.Status == "Y") {
            $m.juci.dataset("questionaries", {
                "relativesCount": "",
                "relatives": ["Upto 100", "101-250", "251-500", "More than 500"],
                "spouseOptions": ["Yes", "No"],
                "spouse": "",
                "inLawsoptions": ["Upto 100", "101-250", "251-500", "More than 500"],
                "inLawsValue": "",
                "socialMediaoptions": ["Upto 500", "501-1000", "1001-2000", "More than 2000"],
                "socialMediaValue": "",
                "businessOptions": ["Yes", "No"],
                "businessValue": "",
                "businessCustomerOptions": ["Upto 500", "501-1000", "1001-2000", "More than 2000"],
                "businessCustomerValue": "",
                "policyOptions": ["3", "4", "5", "6", "7", "8"],
                "policyValue": ""
            });
            $m.toast(res.Message);
        } else {
            $m.logError("Save Income Calculator failed due to : " + res);
        }
    };
    service.saveNetworkCalcultor(saveNetworkCalculatorCallback, obj);

}





function resetretire(){
	var k = $m.juci.dataset("retirementCalculator");
	var p = {
			"age" : "",
		"retireage" : "",
		"annualincome":"",
		"monthlyexpensive":"",
		"investtype":"",
		"currentsaving":""
	}
	k = p;
	$m.juci.dataset("retirementCalculator",k);
	$m.juci.dataset("retirement_result",false);
	$m.juci.dataset("retire1",true);
	$m.juci.dataset("retire2",false);
	
}


function resettax(){
	var m = $m.juci.dataset("taxCalculator");
	$m.juci.dataset("salaried",true);
	$m.juci.dataset("self",false);
	var n = {
		"age" : "",
		"annualincome":"",
		"employeetype":"",
		"selfannualsalary":"",
		"incomeformothersource":"",
		"investment":"",
		"healthinsurancepremium":"",
		"hiradebt":"",
		"interesthomeloan":"",
		"interesteducation":"",
		"interesttta":"",
		"otherdeduction":""
	}
	m = n;
	$m.juci.dataset("taxCalculator",m);
	$m.juci.dataset("tax_result",false);
	$m.juci.dataset("taxi1",true);
	$m.juci.dataset("tax1", false);
	$m.juci.dataset("tax2", false);
	
}


function resethlv(){
	var l = $m.juci.dataset("hlvcalculate");
	var o = {
		"age" : "",
		"married" : "",
		"retireage" : "",
		"monthlyincome":"",
		"monthlyexpensive":"",
		"valueofsvnginvstmnt":"",
		"insurance":"",
		"loans":""
	}
	l = o;
	l.married.type = "";
	$m.juci.dataset("hlvcalculate",l);
	$m.juci.dataset("result",false);
	$m.juci.dataset("hlv1",true);
	$m.juci.dataset("hlv2",false);
	$m.juci.dataset("hlv3",false);
	
}




function resetfhs(){
	var x = $m.juci.dataset("fhsform");
	var y = {
	"gender":"",	
	"name":"",
	"mobile":"",
	"dob":"",
	"spousefhs":"",
	"spouseDob":"",
	"annualIncome":"",
	"spouseAL":"",
	"savingInves":"",
	"monthlyexpense":"",
	"totalsavings":"",
	"totaloutstandingloan":"",
	"insuranceCover":"",
	"spouseInsuranceCover":"",
	"children":"",
	"childName":"",
	"childName2":"",
	"childName3":"",
	"childName4":"",
	"childName5":"",
	"childName6":"",
	"no_of_children":"",
	"parents":"",
	"savingChild":"",
	"savingRetire":""
		}
	x = y;
	$m.juci.dataset("fhsform",x);
	$m.juci.dataset("fhsresult",false);
	$m.juci.dataset("fhs1",true);
	$m.juci.dataset("fhs2",false);
	$m.juci.dataset("fhs3",false);
	$m.juci.dataset("fhs4",false);
	$m.juci.dataset("fhs5",false);
	
}




function formatValue1(value) {
	return formatMoney1(value);
}

function formatMoney1(num) {
	if (num == "") {
		return "";
	} else {
		var n1, n2;
		if (typeof num == 'string')
			num = num.replace(/,/g, "");
		num = (Math.round(num * 100) / 100) + '' || '';
		// works for integer and floating as well
		n1 = num.split('.');
		n2 = n1[1];
		n1 = n1[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
		num = n2 ? n1 + '.' + n2 : n1;
		num = num;
		return num;
	}
}



function resetchild() {
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
	juci.dataset("child_result",false);
	document.getElementById('number').value = "1";
}