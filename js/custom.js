let stuff = ["KE", "D"]


function Done() {
    let inputs = document.getElementsByName("temp")
    let vals = [];
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].checked == 1) {
            vals.push(inputs[i].id)
        }


    }
    window.document.location = './index.html' + '?thing=' + vals
    console.log(vals)



}