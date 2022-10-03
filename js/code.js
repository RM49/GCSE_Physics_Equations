let timeout
var x = 5
var y = 7
var total = 0
var equations = ["F", "KE", "D", "Elastic", "charge", "heatcapacity", "ohms", "gravitational", "power"]
var selected = ""
var rand = 0
var one = 0
var two = 0
var three = 0
var four = 0
var answer
var attempts = 0
var max_total = 10
newquestion()

function myFunction() {
    document.getElementById('AnswerInput').value = String(answer);
}

function ClosePopUp() {
    console.log("cloidsnio")
    document.getElementById('popUp').style.display = "none";
    document.getElementById('total').innerHTML = String(total)
    document.getElementById('progress').style.width = total * window.innerWidth / 10 + "px"
}


function correct() {

    if (parseFloat(document.getElementById('AnswerInput').value) == answer) {
        document.getElementById('AnswerInput').style.backgroundColor = "lime";
        timeout = setTimeout(normalbox, 250);
        document.getElementById('sit').innerHTML = "correct"
        total += 1
        attempts += 1
        document.getElementById('AnswerInput').value = ""
        document.getElementById('total').innerHTML = String(total)
        newquestion()
        console.log(total)
        if (total <= 10) {
            document.getElementById('progress').style.width = total * window.innerWidth / max_total + "px"
        }

        if (total == max_total) {
            Complete()
        }

    } else {
        document.getElementById('AnswerInput').style.backgroundColor = "red";
        timeout = setTimeout(normalbox, 250);
        if (total >= 1) {
            total -= 1
        }
        document.getElementById('total').innerHTML = String(total)
        document.getElementById('progress').style.width = total * window.innerWidth / 10 + "px"
        document.getElementById('sit').innerHTML = "incorrect, try again"

    }

    function normalbox() {
        document.getElementById('AnswerInput').style.backgroundColor = "white";

    }

    function Complete() {

        document.getElementById('popUp').style.display = "block";
        document.getElementById('PopUpTotal').innerHTML = "Total: " + total + " with " + attempts + " attempts";
        total = 0
        attempts = 0

    }

}


/*dkjafjkdsfhldjkfh comment */
function newquestion() {
    rand = Math.floor(Math.random() * equations.length)
    console.log(rand)
    selected = equations[rand]
    one = Math.floor(Math.random() * 10 + 1) // + 1 stops zero, change 10 to range wanted
    two = Math.floor(Math.random() * 10 + 1) // same applies ^
    three = Math.floor(Math.random() * 10 + 1)
    switch (selected) {

        case "KE":
            document.getElementById('img').src = "./images/Ke.png"
            answer = 0.5 * one * Math.pow(two, 2)
            document.getElementById('variables').innerHTML = "Calculate the <b>Kinetic Energy</b> when <br>" + "Mass = " + one + "<br>" + " Velocity = " + two

            break;

        case "F":
            document.getElementById('img').src = "./images/force.jpg"
            answer = one * two
            document.getElementById('variables').innerHTML = "Calculate the <b>Force</b> when <br>" + "Mass = " + one + "<br>" + " Acceleration = " + two
            break;

        case "D":
            document.getElementById('img').src = "./images/Density.png"
            answer = one / two
            document.getElementById('variables').innerHTML = "Calculate the <b>Density</b> when <br>" + "Mass = " + one + "<br>" + " Volume = " + two
            break;

        case "Elastic":
            document.getElementById('img').src = "./images/elastic.png"
            document.getElementById('variables').innerHTML = "Calculate the <b>Elastic Potential Energy</b> when <br>" + "Spring constant = " + one + "<br> Extention = " + two
            two = two ** 2
            answer = 0.5 * one * two
            break;
        case "charge":
            document.getElementById('img').src = "./images/charge.png"
            document.getElementById('variables').innerHTML = "Calculate the <b>Current</b> when <br>" + "Coulombs transfered = " + one + "<br> time taken = " + two
            answer = one / two
            break;
        case "heatcapacity":
            document.getElementById('img').src = "./images/heatcapacity.png"
            document.getElementById('variables').innerHTML = "Calculate the <b>Energy Transfered</b> when <br>" + " Mass = " + one + "<br> Change in temperature = " + two + "<br> Specific Heat Capacity = 4200J/Kg"
            answer = one * two * 4200
            break;
        case "ohms":
            document.getElementById('img').src = "./images/volt.png"
            document.getElementById('variables').innerHTML = "Calculate the <b>Voltage</b> when <br>" + "Current = " + one + "<br> Resistance = " + two
            answer = one * two
            break;
        case "gravitational":
            document.getElementById('img').src = "./images/MGH.png"
            document.getElementById('variables').innerHTML = "Calculate the <b>Gravitational Potential Energy </b> when <br>" + "Mass = " + one + "<br> Mass = " + two + "<br> gravity = 10N"
            answer = one * two * 10
            break;
        case "power":
            document.getElementById('img').src = "./images/power.png"
            document.getElementById('variables').innerHTML = "Calculate the <b>Power</b> when <br>" + "Energy transfered = " + one + "<br> Time Taken = " + two
            answer = one / two
            break;
        default:
            console.log("das")
            break;

    }

}
