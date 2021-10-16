function Validation() {
    this.checkEmpty = function (input, divId, Mess) {
        if (input.trim() === "") {
            Dom(divId).innerHTML = Mess;
            Dom(divId).className = "alert alert-danger"
            return false;
        } else {
            Dom(divId).innerHTML = ""
            Dom(divId).className = "";
            return true
        }
    }

    this.formTk = function (input, divId, mess) {

        if (input.length < 4 || input.length > 6 || isNaN(input)) {
            Dom(divId).innerHTML = mess;
            Dom(divId).className = "alert alert-danger"
            return false;
        } else {
            Dom(divId).innerHTML = ""
            Dom(divId).className = "";
            return true
        }
    }


}


Validation.prototype.checkDuplicate = function (input, divId, mess, arr) {
    var status = true;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].tk === input) {
            status = false;
            break;
        }
    }
    if (status) {
        Dom(divId).innerHTML = ""
        Dom(divId).className = ""
        return true
    }
    Dom(divId).innerHTML = mess
    Dom(divId).className = "alert alert-danger"
    return false;
}



Validation.prototype.checkEmail = function (input, divId, mess) {
    var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (input.match(letter)) {
        Dom(divId).innerHTML = ""
        Dom(divId).className = ""
        return true;
    } else {
        Dom(divId).innerHTML = mess
        Dom(divId).className = "alert alert-danger"
        return false;
    }
}

Validation.prototype.formName = function (input, divId, mess) {
    var txt = /^[A-Za-z]+$/;
    if (input.match(txt)) {
        Dom(divId).innerHTML = ""
        Dom(divId).className = ""
        return true;
    } else {
        Dom(divId).innerHTML = mess
        Dom(divId).className = "alert alert-danger"
        return false;
    }
}

Validation.prototype.formPass = function (input, divId, mess) {
    var passWord = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
    if (input.match(passWord)) {
        Dom(divId).innerHTML = ""
        Dom(divId).className = ""
        return true;
    } else {
        Dom(divId).innerHTML = mess
        Dom(divId).className = "alert alert-danger"
        return false;
    }
}
Validation.prototype.checkPos = function (idSelect, divId, mess) {
    if (Dom(idSelect).selectedIndex != 0) {
        Dom(divId).innerHTML = ""
        Dom(divId).className = ""
        return true
    } else {
        Dom(divId).innerHTML = mess
        Dom(divId).className = "alert alert-danger"
        return false;
    }
}

