// const
var e1Lift = document.querySelector("#e-1");
var e2Lift = document.querySelector("#e-2");
var e0Lift = document.querySelector("#e-0");
var displayTxt = document.querySelector(".text");
var activeLift = document.querySelector(".activeLift");
var goUp = false;
var goDown = false;
var goUpBreak = true;
var audioS = new Audio("ding.mp3");
var audioE = new Audio("error.mp3");

function callLift(lvl) {
	//up down logic
	if (liftBoxIndex("e-0") && lvl == "l0") {
		audioS.play();
		goingUpDown("0");
	}
	//down logic
	if (liftBoxIndex("e-2") && lvl == "l2") {
		audioS.play();
		goingUpDown("2");
	}

	// up-down to stop at l1 level
	if ((lvl == "l1-u" && goUp) || (lvl == "l1-d" && goDown)) {
		audioS.play();
		displayTxt.textContent = "lift will stop at level 1";
		// console.log("can stop at l1 level");
		goUpBreak = false;
	}
	if ((lvl == "l1-u" && !goUp) || (lvl == "l1-d" && !goDown)) {
		audioE.play();
		displayTxt.textContent =
			"Can't call lift at level 1 as it has passed the floor";
	}

	//up down direct call
	if (
		(lvl == "l0" && liftBoxIndex("e-2")) ||
		(lvl == "l2" && liftBoxIndex("e-0"))
	) {
		audioS.play();
		if (lvl == "l0") {
			var levls = 0;
			var lcalls0 = e2Lift;
			var lcalls1 = e0Lift;
		}
		if (lvl == "l2") {
			var levls = 2;
			var lcalls0 = e0Lift;
			var lcalls1 = e2Lift;
		}
		displayTxt.textContent = `lift will stop at level ${levls} directly`;
		lcalls0.classList.remove("activeLift");
		setTimeout(function () {
			lcalls1.classList.add("activeLift");
			displayTxt.textContent = `lift is at level ${levls}`;
		}, 10000);
	}
	//lift at mid and go down or up
	if ((lvl == "l0" || lvl == "l2") && liftBoxIndex("e-1")) {
		audioS.play();
		if (lvl == "l0") {
			var liftcall = e0Lift;
			var lvls = 0;
		} else if (lvl == "l2") {
			var liftcall = e2Lift;
			var lvls = 2;
		}
		displayTxt.textContent = `lift will stop at level ${lvls}`;
		e1Lift.classList.remove("activeLift");
		setTimeout(function () {
			liftcall.classList.add("activeLift");
			displayTxt.textContent = `lift is at level ${lvls}`;
		}, 5000);
	}
}
function liftBoxIndex(liftlvl) {
	var liftBox1 = document.querySelector(`#${liftlvl}`);
	var hasLiftBox = liftBox1.classList.contains("activeLift");
	// console.log(hasLiftBox);
	return hasLiftBox;
}
function goingUpDown(val) {
	if (val == "0") {
		var flr = 0;
		var removed = activeLift;
		goUp = true;
		var show = e2Lift;
		// console.log("goiin up");
	}
	if (val == "2") {
		var flr = 2;
		var removed = e2Lift;
		goDown = true;
		var show = e0Lift;
		// console.log("goiin dwn");
	}

	displayTxt.textContent =
		"lift will pass floor 1 in 5 seconds press UP button at floor 1 before that to stop lift at floor 1";
	removed.classList.remove("activeLift");
	setTimeout(function () {
		goDown = false;
		goUp = false;
		displayTxt.textContent = `lift has passed floor 1 and will reach floor ${flr} in 5 seconds`;
		if (!goUpBreak) {
			e1Lift.classList.add("activeLift");
			displayTxt.textContent = "lift is at level 1";
		}
	}, 5000);

	setTimeout(function () {
		if (goUpBreak) {
			show.classList.add("activeLift");
			displayTxt.textContent = `lift is at level ${flr}`;
		}
		setTimeout(function () {
			goUpBreak = true;
			// console.log(goUpBreak, "up up");
		}, 10);
	}, 10000);
}
// function goingDown() {
// 	displayTxt.textContent =
// 		"lift will pass floor 1 in 5 seconds press DOWN button at floor 1 before that to stop lift at floor 1";
// 	e2Lift.classList.remove("activeLift");
// 	goDown = true;
// 	setTimeout(function () {
// 		goDown = false;
// 		displayTxt.textContent =
// 			"lift has passed floor 1 and will reach floor 0 in 5 seconds";
// 		if (!goUpBreak) {
// 			e1Lift.classList.add("activeLift");
// 			displayTxt.textContent = "lift is at level 1";
// 		}
// 	}, 5000);

// 	setTimeout(function () {
// 		// console.log(goUpBreak, "up up");
// 		if (goUpBreak) {
// 			e0Lift.classList.add("activeLift");
// 			displayTxt.textContent = "lift is at level 0";
// 		}
// 		setTimeout(function () {
// 			goUpBreak = true;
// 			// console.log(goUpBreak, "up up");
// 		}, 10);
// 	}, 10000);
// }
