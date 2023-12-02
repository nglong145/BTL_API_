var app = angular.module('AppAdCayCanh', []);
app.controller("NhaPhanPhoiController", function ($scope, $http) {
    $scope.listnpp; 
    $scope.GetNhaPhanPhoi = function () {
        $http({
            method: 'GET',
            url: current_url_admin + '/api/NhaPhanPhoi/get-all'
        }).then(function (response) {
            $scope.listnpp = response.data;
        });
    };
    $scope.GetNhaPhanPhoi();
    
})

var list = JSON.parse(localStorage.getItem('Suplier')) || [];
function ThemNhaPhanPhoi() {
var tennpp = document.getElementById("tennpp").value;
var diachi = document.getElementById("diachi").value;
var sdt = document.getElementById("sdt").value;
var email = document.getElementById("email").value;

if (tennpp == null || tennpp == "") {
    alert("Tên nhà phân phối không được để trống! Vui lòng nhập lại!");
    return false;
}

else if (diachi == null || diachi == "") {
    alert("Địa chỉ không được để trống! Vui lòng nhập lại!");
    return false;
}

else if (sdt == null || sdt == "") {
    alert("Số điện thoại không được để trống! Vui lòng nhập lại!");
    return false;
}

else if (email == null || email == "") {
    alert("Email không được để trống! Vui lòng nhập lại!");
    return false;
}
else {
    for (var x of list) {
        if (x.manhaphanphoi == masanpham) {
            alert("Mã nhà phân phối đã tồn tại! Vui lòng nhập lại!")
            return false;
        }
    }
}
var SuplierData = {
    tennhaphanphoi: tennpp,
    diachi:diachi,
    sodt:sdt,
    email:email,
};

fetch(current_url_admin + '/api/NhaPhanPhoi/create-nhaphanphoi', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(SuplierData) 
})
.then(response => {
    if (response.ok) {
        alert('Đã thêm thành công!');
        location.reload();
        console.log(response);
    } else {
        alert('Lỗi khi thêm loại sản phẩm!');
    }
})
.catch(error => {
    alert('Lỗi kết nối tới API: ' + error);
});
}

function NhapMoi() {
    document.getElementById('manpp').value = '';
    document.getElementById('tennpp').value = '';
    document.getElementById('diachi').value = '';
    document.getElementById('sdt').value = '';
    document.getElementById('email').value = '';

}

function SuaNPP(icon) {
    var row=icon.parentNode.parentNode;
    var cells=row.getElementsByTagName('td');


    var manpp = cells[1].textContent;
    var tennpp = cells[2].textContent;
    var diachi = cells[3].textContent;
    var sdt = cells[4].textContent;
    var email = cells[5].textContent;

    document.getElementById("manpp").value = manpp;
    document.getElementById("tennpp").value = tennpp;
    document.getElementById("diachi").value = diachi;
    document.getElementById("sdt").value = sdt;
    document.getElementById("email").value = email;

    document.getElementById("btnUpdate").setAttribute("data-manpp", manpp);
}

function CapNhat() {
    var manhaphanphoi =  document.getElementById('manpp').value;
    var tennhaphanphoi = document.getElementById('tennpp').value;
    var diachi = document.getElementById('diachi').value;
    var sodt = document.getElementById('sdt').value;
    var email = document.getElementById('email').value;

    var SuplierData = {
        manhaphanphoi: manhaphanphoi,
        tennhaphanphoi: tennhaphanphoi,
        diachi: diachi,
        sodt: sodt,
        email: email
    };

    fetch(current_url_admin + '/api/NhaPhanPhoi/update-nhaphanphoi', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(SuplierData)
    })
    .then(response => {
        if (response.ok) {
            alert('Cập nhật thông tin sản phẩm thành công!');
            location.reload();
        } else {
            console.error('Lỗi cập nhật dữ liệu' + error);
        }
    })
    .catch(error => {
        console.error('Lỗi kết nối đến máy chủ: ' + error);
    });
    
}

document.addEventListener('click', function (event) {
    var target = event.target;

    if (target.classList.contains('fa-trash-alt')) {

        var manhaphanphoi = target.getAttribute('data-manpp');

        var xacNhan = confirm("Bạn có chắc chắn muốn xóa loại sản phẩm này?");

        if (xacNhan) {
            XoaNPP(manhaphanphoi);
        }
    }
});

function XoaNPP(manhaphanphoi) {
    fetch(current_url_admin + '/api/NhaPhanPhoi/delete-nhaphanphoi' , {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.parse(manhaphanphoi)
    })
    .then(response => {
        if (response.ok) {
            alert('Xóa nhà phân phối thành công!');
            location.reload();
        } else {
            // Xử lý lỗi nếu cần
        }
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });
}