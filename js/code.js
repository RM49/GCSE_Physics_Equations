let timeout
var total = 0
var equations = ["ACCELERATION", "CHARGECURRENTTIME", "DENSITY", "ELASTIC", "ENERGYPOWERTIME", "FORCE", "GRAVITY", "KINETIC", "LATENTHEAT", "MOMENT", "MOMENTUM", "POWER", "POWERIR", "POWERIV", "PRESSURE", "SPECIFICHEATCAPACITY", "SPRINGCONSTANT", "VELOCITY", "VIR", "WAVELENGTH", "WEIGHT", "WORKFORCEDISTANCE"]
var equations = ["F", "KE", "D", "Elastic", "charge", "heatcapacity", "ohms", "gravitational", "power"]
var selected = ""
var rand = 0
var one = 0
var two = 0
var three = 0
var four = 0
var answer
var attempts = 0
var max_total = 10 // hio

var QuestionQueue = ["KE1", "KE2", "KE3", "F1", "F2", "F3", "D1", "D2", "D3", "O1", "O2", "O3", "G1", "G2", "G3", "G4", "P1", "P2", "P3", "EL1", "EL2", "EL3"];
var Mode = "Random1" // or "Normal"
var step = 0

// this part of the code takes the chosen equations sent via the url from the customise page
const params = new URLSearchParams(window.location.search)
var field = 'thing';
var url = window.location.href;
if (url.indexOf('?' + field + '=') != -1) {
    
    let stuff = document.location.search.replace(/^.*?\=/, "")
    console.log(stuff)
    equations = stuff.split(",")
    console.log(equations)
}


// starts by generating a question
if (Mode == "Random") {
    NewQuestion()
} else {
    QueuedQuestion()
}


function ClosePopUp() {
    document.getElementById('popUp').style.display = "none"; // removes pop up
    document.getElementById('total').innerHTML = String(total) // resets score
    document.getElementById('progress').style.width = total * window.innerWidth / 10 + "px" // resets progress bar
}


function Answer() {
    answerbox = document.getElementById('AnswerInput')
    Answer_num = parseFloat(answerbox.value)
    // if the answer is correct

    answerRight = false

    if (Answer_num == answer) {
        answerRight = true
    }
    console.log(Number(answer).toFixed(1))
    if (Answer_num >= Number(answer.toFixed(1)) - Number(0.05) && Answer_num <= Number(answer.toFixed(1)) + Number(0.05)) {
        answerRight = true
    }
    if (answerRight) {
        document.getElementById('AnswerInput').style.backgroundColor = "lime";
        timeout = setTimeout(ResetAnswerBoxColour, 250);
        document.getElementById('sit').innerHTML = "Correct!"
        total += 1
        attempts += 1
        document.getElementById('AnswerInput').value = ""
        document.getElementById('total').innerHTML = String(total)

        if (Mode == "Random") { // this only does anything in random mode

            NewQuestion()
            if (total <= 10) {
                document.getElementById('progress').style.width = total * window.innerWidth / max_total + "px"
            }

            if (total == max_total) {
                Complete()
            }

        } else {
            QueuedQuestion()
            console.log("HERE")
        }
        
 


        // if it is not correct
    } else {
        document.getElementById('AnswerInput').style.backgroundColor = "red";
        timeout = setTimeout(ResetAnswerBoxColour, 250);

        if (total >= 1) {
            total -= 1
        }

        document.getElementById('total').innerHTML = String(total)
        document.getElementById('progress').style.width = total * window.innerWidth / 10 + "px"
        document.getElementById('sit').innerHTML = "incorrect, try again"

    }

}

function ResetAnswerBoxColour() {
    document.getElementById('AnswerInput').style.backgroundColor = "white";
}

function Complete() {

    document.getElementById('popUp').style.display = "block";
    document.getElementById('PopUpTotal').innerHTML = "Total: " + total + " with " + attempts + " attempts" + "<br>" + "Including " + equations;
    total = 0
    attempts = 0

}
function ChangeImage(equation) {
    document.getElementById('img').src = "./assets/" + equation + ".png"
    }


function NewQuestion() {
    rand = Math.floor(Math.random() * equations.length)
    selected = equations[rand] // these two lines pick a random equation id out of the list
    one = Math.floor(Math.random() * 10 + 1) // + 1 stops zero, change 10 to range wanted
    two = Math.floor(Math.random() * 10 + 1) // same applies ^
    three = Math.floor(Math.random() * 10 + 1)

    switch (selected) {

        case "KE": // testing different arrangements of the equation.

            chance = Math.floor(Math.random() * 5)
            document.getElementById('img').src = "./images/Ke.png"
            console.log("chance = " + chance)
            if (chance <= 2) {
                // KE is subject
                answer = 0.5 * one * Math.pow(two, 2)
                document.getElementById('variables').innerHTML = "Calculate the <b>Kinetic Energy</b> when <br>" + "Mass = " + one + "<br>" + " Velocity = " + two

            }

            if (chance == 3) {
                // mass is subject
                KE = Math.floor(Math.random() * 1000) + 1
                KE = KE * 100
                answer = Math.round((KE * 2) / Math.pow(one, 2))
                document.getElementById('variables').innerHTML = "Calculate the <b>Mass</b> when <br>" + "Kinetic Energy = " + KE + "<br>" + " Velocity = " + one

            }

            if (chance >= 4) {
                // velocity is subject, one is mass
                KE = Math.floor(Math.random() * 1000) + 1
                KE = KE * 100
                answer = Math.round(Math.sqrt(Math.floor((KE * 2) / one)))
                document.getElementById('variables').innerHTML = "Calculate the <b>Velocity</b> when <br>" + "Kinetic Energy = " + KE + "<br>" + " Mass = " + one

            }

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

function Cheat() {
    document.getElementById('AnswerInput').value = String(answer);
}

function ChangeMode() {
    if (Mode == "Random") {
        Mode = "NotRandom"
        QueuedQuestion()
        
    } else {
        Mode = "Random"
        NewQuestion()
    }

}

function QueuedQuestion() {
    console.log(QuestionQueue.length)
    if (QuestionQueue.length == 0) {
        Complete()
    }

    currentQuestion = QuestionQueue[0]
    QuestionQueue.splice(0, 1)

    // create sebsible numbers for each variable here?
    HeatCapacities = [4200, 300]
    Accelerations = [1, 2, 3, 5, 9] // could be random tbh
    Masses = [1, 1.5] // random as well tbh
    Gravity = [10, 1.6] // Earth, moon
    // this could give a little context to the questions




    one = Math.floor(Math.random() * 10 + 1) // + 1 stops zero, change 10 to range wanted
    two = Math.floor(Math.random() * 10 + 1) // same applies ^
    three = Math.floor(Math.random() * 10 + 1)



   
    switch (currentQuestion) {

        case "KE1":
            // Kinetic energy is subject
            document.getElementById('img').src = "./images/Ke.png"
            answer = 0.5 * one * Math.pow(two, 2)
            document.getElementById('variables').innerHTML = "Calculate the <b>Kinetic Energy</b> when <br>" + "Mass = " + one + "<br>" + " Velocity = " + two
            break;

        case "KE2":
            // mass is subject
            KE = Math.floor(Math.random() * 1000) + 1
            KE = KE * 100
            answer = Math.round((KE * 2) / Math.pow(one, 2))
            document.getElementById('variables').innerHTML = "Calculate the <b>Mass</b> when <br>" + "Kinetic Energy = " + KE + "<br>" + " Velocity = " + one
            document.getElementById('img').src = "./images/Ke.png"
            break;

        case "KE3":
            // velocity
            document.getElementById('img').src = "./images/Ke.png"
            KE = Math.floor(Math.random() * 1000) + 1
            KE = KE * 100
            answer = Math.round(Math.sqrt(Math.floor((KE * 2) / one)))
            document.getElementById('variables').innerHTML = "Calculate the <b>Velocity</b> when <br>" + "Kinetic Energy = " + KE + "<br>" + " Mass = " + one
            break;

        case "F1":
            // code force is subject
            document.getElementById('img').src = "./images/force.jpg"
            answer = one * two
            document.getElementById('variables').innerHTML = "Calculate the <b>Force</b> when <br>" + "Mass = " + one + "<br>" + " Acceleration = " + two
            break;

        case "F2":
            // code mass subject
            document.getElementById('img').src = "./images/force.jpg"
            answer = one / two
            document.getElementById('variables').innerHTML = "Calculate the <b>Mass</b> when <br>" + "Force = " + one + "<br>" + " Acceleration = " + two
            break;

        case "F3":
            // code acceleration subject
            document.getElementById('img').src = "./images/force.jpg"
            answer = one / two
            document.getElementById('variables').innerHTML = "Calculate the <b>Acceleration</b> when <br>" + "Force = " + one + "<br>" + " Mass = " + two
            break;

        case "D1":
            // density is subject
            document.getElementById('img').src = "./images/Density.png"
            answer = one / two
            document.getElementById('variables').innerHTML = "Calculate the <b>Density</b> when <br>" + "Mass = " + one + "<br>" + " Volume = " + two
            break;

        case "D2":
            // mass is subject
            document.getElementById('img').src = "./images/Density.png"
            answer = one * two
            document.getElementById('variables').innerHTML = "Calculate the <b>Mass</b> when <br>" + "Density = " + one + "<br>" + " Volume = " + two
            break;

        case "D3":
            // volume is subject
            document.getElementById('img').src = "./images/Density.png"
            answer = one / two
            document.getElementById('variables').innerHTML = "Calculate the <b>Volume</b> when <br>" + "Mass = " + one + "<br>" + " Density = " + two
            break;


        case "O1":
            // voltage is subject
            document.getElementById('img').src = "./assets/VIR.png";
            answer = one * two;
            document.getElementById('variables').innerHTML = "Calculate the <b>Voltage</b> when <br>" + "Current = " + one + "<br>" + " Resistance = " + two;
            break

        case "O2":
            // current is subject
            document.getElementById('img').src = "./assets/VIR.png";
            answer = one / two;
            document.getElementById('variables').innerHTML = "Calculate the <b>Current</b> when <br>" + "Voltage = " + one + "<br>" + " Resistance = " + two;
            break;

        case "O3":
            // resistance is subject
            document.getElementById('img').src = "./assets/VIR.png";
            answer = one / two;
            document.getElementById('variables').innerHTML = "Calculate the <b>Resistance</b> when <br>" + "Voltage = " + one + "<br>" + " Current = " + two;
            break;

        case "G1":
            // Energy is subject
            document.getElementById('img').src = "./assets/GRAVITY.png";
            answer = one * two * three;
            document.getElementById('variables').innerHTML = "Calculate the <b>Energy</b> when <br>" + "Mass = " + one + "<br>" + " Gravity = " + two + "<br>" + " Height = " + three;
            break;

        case "G2":
            // Mass is subject
            document.getElementById('img').src = "./assets/GRAVITY.png";
            answer = one / (two * three);
            document.getElementById('variables').innerHTML = "Calculate the <b>Mass</b> when <br>" + "Energy = " + one + "<br>" + " Gravity = " + two + "<br>" + " Height = " + three;
            break;

        case "G3":
            // Gravity is subject
            document.getElementById('img').src = "./assets/GRAVITY.png";
            answer = one / (two * three);
            document.getElementById('variables').innerHTML = "Calculate the <b>Gravity</b> when <br>" + "Energy = " + one + "<br>" + " Mass = " + two + "<br>" + " Height = " + three;
            break;

        case "G4":
            // Height force is subject
            document.getElementById('img').src = "./assets/GRAVITY.png";
            answer = one / (two * three);
            document.getElementById('variables').innerHTML = "Calculate the <b>Height</b> when <br>" + "Energy = " + one + "<br>" + " Mass = " + two + "<br>" + " Gravity = " + three;
            break;

        case "P1":
            // power is subject
            document.getElementById('img').src = "./assets/POWER.png";
            answer = one / two;
            document.getElementById('variables').innerHTML = "Calculate the <b>Power</b> when <br>" + "Work done / energy = " + one + "<br>" + " Time taken = " + two;
            break;

        case "P2":
            // work is subject
            document.getElementById('img').src = "./assets/POWER.png";
            answer = one * two;
            document.getElementById('variables').innerHTML = "Calculate the <b>Work done / Energy transfered</b> when <br>" + "Power = " + one + "<br>" + " Time = " + two;
            break;

        case "P3":
            // time is subject
            document.getElementById('img').src = "./assets/POWER.png";
            answer = two / one;
            document.getElementById('variables').innerHTML = "Calculate the <b>Time Taken</b> when <br>" + "Power = " + one + "<br>" + " Work done = " + two;
            break;

        case "EL1":
            // Energy is subject
            document.getElementById('img').src = "./assets/ELASTIC.png";
            answer = 0.5 * one * Math.pow(two, 2);
            document.getElementById('variables').innerHTML = "Calculate the <b>Elastic potential energy</b> when <br>" + "Spring constant = " + one + "<br>" + " Extension = " + two;
            break;

        case "EL2":
            // Spring constant is subject
            document.getElementById('img').src = "./assets/ELASTIC.png";
            KE = Math.floor(Math.random() * 1000) + 1
            KE = KE * 100
            answer = Math.round((KE * 2) / Math.pow(one, 2))
            document.getElementById('variables').innerHTML = "Calculate the <b>Spring constant</b> when <br>" + "Elastic potential energy = " + one + "<br>" + " Extension = " + two;
            break;

        case "EL3":
            // Extension is subject
            document.getElementById('img').src = "./assets/ELASTIC.png";
            KE = Math.floor(Math.random() * 1000) + 1
            KE = KE * 100
            answer = Math.round(Math.sqrt(Math.floor((KE * 2) / one)))
            document.getElementById('variables').innerHTML = "Calculate the <b>Extension</b> when <br>" + "Elastic potential energy = " + one + "<br>" + "Spring constant = " + two;
            break;






        //case "":
            // volume is subject
            //document.getElementById('img').src = "./images/_.png"
            //answer = //
            //document.getElementById('variables').innerHTML = "Calculate the <b>_</b> when <br>" + "_ = " + one + "<br>" + " _ = " + two
            // break;

        default:
            console.log("der")
            break;
    }

}