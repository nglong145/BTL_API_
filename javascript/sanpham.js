var app = angular.module('AppAdCayCanh', []);
app.controller("SanPhamController", function ($scope, $http) {
    $scope.listdanhmuc; 
    $scope.GetDanhMuc = function () {
        $http({
            method: 'GET',
            data:{ tendm:$scope.tendanhmuc},
            url: current_url_admin + '/api/DanhMuc/get-all'
        }).then(function (response) {
            $scope.listdanhmuc = response.data;
        });
        
       
    };
    
    $scope.GetDanhMuc();

    $scope.listsp;
    $scope.GetSanPham =function(){
        $http({
            method: 'GET',
            url: current_url + '/api/SanPham/get-all'
        }).then(function (response) {
            $scope.listsp = response.data;
        });
    };
    $scope.GetSanPham();
})

var list = JSON.parse(localStorage.getItem('Product')) || [];
function ThemSanPham() {
var danhmuc = document.getElementById("danhmuc").value;
var masanpham = document.getElementById("masanpham").value;
var tensanpham = document.getElementById("tensanpham").value;

var anhsp = document.getElementById("imgproduct");
var viewimg = document.getElementById("viewimg")
var newimg="/assets/img/" + anhsp.value.split("\\").pop();
viewimg.src=newimg;

var soluong = document.getElementById("soluong").value;
var giaban = document.getElementById("giaban").value;
var motasanpham=document.getElementById("motasanpham").value;

if (danhmuc == "choose" || danhmuc=="") {
    alert("Vui lòng chọn loại sản phẩm!");
    return false;
}

else if (tensanpham == null || tensanpham == "") {
    alert("Tên sản phẩm không được để trống! Vui lòng nhập lại!");
    return false;
}

else if (soluong == null || tensanpham == "") {
    alert("Số lượng sản phẩm không được để trống! Vui lòng nhập lại!");
    return false;
}

else if (soluong<0) {
    alert("Số lượng sản phẩm phải lớn hơn 0 hoặc bằng 0! Vui lòng nhập lại!");
    return false;
}

else if (giaban == null || giaban == "") {
    alert("Giá sản phẩm không được để trống! Vui lòng nhập lại!");
    return false;
}

else if (giaban <=0) {
    alert("Giá sản phẩm phải lớn hơn 0! Vui lòng nhập lại!");
    return false;
}
else {
    for (var x of list) {
        if (x.masanpham == masanpham) {
            alert("Mã sản phẩm đã tồn tại! Vui lòng nhập lại!")
            return false;
        }
    }
}
var ProductData = {
    tensanpham: tensanpham,
    tendanhmuc:danhmuc,
    anhsanpham:newimg,
    soluong:soluong,
    gia:giaban,
    motasanpham:motasanpham
};

fetch(current_url_admin + '/api/SanPham/create-sanpham', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(ProductData) 
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

function loadFile(event) {
    var image = document.getElementById('viewimg');
    image.src = URL.createObjectURL(event.target.files[0]);
}

function NhapMoi() {
    document.getElementById('danhmuc').value = '';
    document.getElementById('masanpham').value = '';
    document.getElementById('tensanpham').value = '';
    document.getElementById('imgproduct').value = '';
    document.getElementById('viewimg').value = '';
    var image = document.getElementById('viewimg');
    image.src="";
    document.getElementById('soluong').value = '';
    document.getElementById('giaban').value = '';
    document.getElementById('motasanpham').value = '';
}

function SuaSanPham(icon) {
    var row=icon.parentNode.parentNode;
    var cells=row.getElementsByTagName('td');


    var masp = cells[1].textContent;
    var tensp = cells[2].textContent;
    var anhsanpham = cells[3].textContent;
    var sl = cells[4].textContent;
    var gia = cells[5].textContent;
    var tendanhmuc = cells[6].textContent;
    var mota = cells[7].textContent;


    document.getElementById("danhmuc").value = tendanhmuc;
    document.getElementById("masanpham").value = masp;
    document.getElementById("tensanpham").value = tensp;
    document.getElementById("soluong").value = sl;
    document.getElementById("giaban").value = gia;
    document.getElementById("motasanpham").value = mota;


    document.getElementById("btnUpdate").setAttribute("data-masp", masp);
}



function CapNhat() {
    var masanpham =  document.getElementById('masanpham').value;
    var danhmuc = document.getElementById('danhmuc').value;
    var tensanpham = document.getElementById('tensanpham').value;
    var soluong = document.getElementById('soluong').value;
    var gia = document.getElementById('giaban').value;
    var mota = document.getElementById('motasanpham').value;

    var anhsp = document.getElementById("imgproduct");
    var viewimg = document.getElementById("viewimg")
    var newimg="/assets/img/" + anhsp.value.split("\\").pop();


    var sanphamData = {
        masanpham: masanpham,
        tendanhmuc: danhmuc,
        tensanpham: tensanpham,
        anhsanpham: newimg,
        gia: gia,
        soluong: soluong,
        motasanpham: mota
    };

    fetch(current_url_admin + '/api/SanPham/update-sanpham', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sanphamData)
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

        var masanpham = target.getAttribute('data-masp');

        var xacNhan = confirm("Bạn có chắc chắn muốn xóa loại sản phẩm này?");

        if (xacNhan) {
            XoaSanPham(masanpham);
        }
    }
});

function XoaSanPham(masanpham) {
    fetch(current_url_admin + '/api/SanPham/delete-sanpham' , {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.parse(masanpham)
    })
    .then(response => {
        if (response.ok) {
            alert('Xóa loại sản phẩm thành công!');
            location.reload();
        } else {
            // Xử lý lỗi nếu cần
        }
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });
}