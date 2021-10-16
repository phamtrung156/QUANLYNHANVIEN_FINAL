function Dom(id) {
    return document.getElementById(id)
}

var dsnv = new DanhSachNhanVien();
var validation = new Validation();

getLocalStorage()

function getInfor(isAdd) {
    var _tk = Dom("tknv").value;
    var _name = Dom("name").value;
    var _email = Dom("email").value;
    var _pass = Dom("password").value;
    var _date = Dom("datepicker").value;
    var _basicSalary = Dom("luongCB").value;
    var _pos = Dom("chucvu").value;
    var _hour = Dom("gioLam").value;
    var isValid = true;

    if (isAdd) {
        isValid &= validation.checkEmpty(_tk, "divTkErr", "* vui lòng nhập tài khoản") &&
            validation.checkDuplicate(_tk, "divTkErr", "* tài khoản này đã tồn tại", dsnv.arr) &&
            validation.formTk(_tk, "divTkErr", "* tài khoản gồm 4-6 chữ số, vui lòng nhập lại")

        isValid &= validation.checkEmpty(_name, "divNameErr", "* Vui lòng nhập tên") &&
            validation.formkName(_name, "divNameErr", "* Tên không bao gồm số và kí tự đặc biệt. Vui lòng nhập lại")

        isValid &= validation.checkEmpty(_email, "divEmailErr", "* Vui lòng nhập email") &&
            validation.checkEmail(_email, "divEmailErr", "* Vui lòng nhập lại email")

        isValid &= validation.checkEmpty(_pass, "divPassErr", "* Vui lòng nhập mật khẩu") &&
            validation.formPass(_pass, "divPassErr", "* Mật khẩu từ 6-10 ký tự  (chứa  ít nhất  1 ký tự số,  1 ký tự  in hoa,  1ký tự đặc biệt)")

        isValid &= validation.checkEmpty(_date, "divDateErr", "* vui lòng nhập ngày đi làm")
        isValid &= validation.checkEmpty(_basicSalary, "divSalaryErr", "* vui lòng nhập lương")
        isValid &= validation.checkPos("chucvu", "divPosErr", "* vui lòng nhập chức vụ ")
        isValid &= validation.checkEmpty(_hour, "divHourErr", "* vui lòng nhập giờ làm")
    }
    if (isValid) {
        var staff = new NhanVien(
            _tk,
            _name,
            _email,
            _pass,
            _date,
            _basicSalary,
            _pos,
            _hour)
        return staff
    }
    return null
}
// thêm nhân viên
function addNV(event) {
    event.preventDefault()
    var staff = getInfor(true);
    if (staff !== null) {
        staff.countSalary();
        staff.level();
        dsnv.addNV(staff)
        taoBang(dsnv.arr)
        setLocalStorage()
    }
}
// xóa nhân viên
function deleteNV(tk) {
    dsnv._deleteNV(tk)
    taoBang(dsnv.arr)
    setLocalStorage()
}
// sửa thông tin nhân viên
function editNV(tk) {
    var staff = dsnv._getInfor(tk);

    Dom("btnCapNhat").style.display = "inline-block"

    Dom("tknv").value = staff.tk;
    Dom("tknv").disabled = true;
    Dom("name").value = staff.name;
    Dom("email").value = staff.email;
    Dom("password").value = staff.pass
    Dom("datepicker").value = staff.date;
    Dom("luongCB").value = staff.basicSalary
    Dom("chucvu").value = staff.pos;
    Dom("gioLam").value = staff.hour

    Dom("btnCapNhat").addEventListener("click", function (event) {
        event.preventDefault()
        var staff = getInfor();
        staff.countSalary();
        staff.level();
        dsnv.updateNV(staff)
        taoBang(dsnv.arr)

    })
}

Dom("btnReset").addEventListener("click", function (event) {
    event.preventDefault()
    Dom("formNV").reset();
    Dom("btnCapNhat").style.display = "none"
    Dom("tknv").disabled = false
})

// tìm kiếm nhân viên

Dom("searchLoai").addEventListener("keyup", function () {
    var keyword = Dom("searchLoai").value;
    var arraySearch = dsnv.searchNV(keyword);
    taoBang(arraySearch)
})

// lưu localStorage
function setLocalStorage() {
    var arrString = JSON.stringify(dsnv.arr);
    localStorage.setItem("DSNV", arrString);
}

function getLocalStorage() {
    if (localStorage.getItem("DSNV")) {
        var data = localStorage.getItem("DSNV");
        dsnv.arr = JSON.parse(data)
        taoBang(dsnv.arr)
    }
}







// tạo bảng
function taoBang(arr) {
    Dom("tableDanhSach").innerHTML = "";
    for (var i = 0; i < arr.length; i++) {
        var TR = document.createElement("tr");

        var TD_TK = document.createElement("td")
        var TD_Name = document.createElement("td")
        var TD_Email = document.createElement("td")
        var TD_Date = document.createElement("td")
        var TD_Pos = document.createElement("td")
        var TD_Salary = document.createElement("td")
        var TD_Level = document.createElement("td")
        var TD_Delete = document.createElement("td")
        var TD_Edit = document.createElement("td")


        TD_TK.innerHTML = arr[i].tk;
        TD_Name.innerHTML = arr[i].name;
        TD_Email.innerHTML = arr[i].email;
        TD_Date.innerHTML = arr[i].date;
        TD_Pos.innerHTML = arr[i].pos
        TD_Salary.innerHTML = arr[i].salary;
        TD_Level.innerHTML = arr[i].xepLoai
        TD_Delete.innerHTML = '<button class="btn btn-danger" onclick="deleteNV(\'' + arr[i].tk + "')\">xóa</button>"
        TD_Edit.innerHTML = '<button class="btn btn-success" data-target="#myModal"  data-toggle="modal" onclick="editNV(\'' + arr[i].tk + "')\">sửa</button>"


        TR.appendChild(TD_TK)
        TR.appendChild(TD_Name)
        TR.appendChild(TD_Email)
        TR.appendChild(TD_Date)
        TR.appendChild(TD_Pos)
        TR.appendChild(TD_Salary)
        TR.appendChild(TD_Level)
        TR.appendChild(TD_Delete)
        TR.appendChild(TD_Edit)


        Dom("tableDanhSach").appendChild(TR)
    }
}
