var app = angular.module('AppAdCayCanh', []);
app.controller("DanhMucController", function ($scope, $http) {

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

})






var list = JSON.parse(localStorage.getItem('Category')) || [];
    function ThemDanhMuc() {
    var tendanhmuc = document.getElementById("tendanhmuc").value;


    if (tendanhmuc == null || tendanhmuc == "") {
        alert("Tên loại sản phẩm không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else {
        for (var x of list) {
            if (x.madanhmuc == madanhmuc) {
                alert("Mã danh muc đã tồn tại! Vui lòng nhập lại!")
                return false;
            }
        }
    }
    var CateData = {
        tendanhmuc: tendanhmuc
    };

    fetch(current_url_admin + '/api/DanhMuc/create-danhmuc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(CateData) 
    })
    .then(response => {
        if (response.ok) {
            alert('Đã thêm thành công!');
            location.reload();
        } else {
            alert('Lỗi khi thêm loại sản phẩm!');
        }
    })
    .catch(error => {
        alert('Lỗi kết nối tới API: ' + error);
    });
}


    function NhapMoi() {
        document.getElementById('madanhmuc').value = '';
        document.getElementById('tendanhmuc').value = '';
    }

    function SuaDM(icon) {
        var row = icon.parentNode.parentNode;
        var cells = row.getElementsByTagName('td');
    
        var MaDanhMuc = cells[1].textContent;
        var TenDanhMuc = cells[2].textContent;
    
        document.getElementById("madanhmuc").value = MaDanhMuc;
        document.getElementById("tendanhmuc").value = TenDanhMuc;
        
        // Lưu mã khách hàng để sử dụng khi cập nhật
        document.getElementById("btnUpdate").setAttribute("data-madm", MaDanhMuc);
    }
    
    function CapNhat() {
        var MaDanhMuc = document.getElementById("btnUpdate").getAttribute("data-madm");
        var TenDanhMuc = document.getElementById("tendanhmuc").value;
    
    
        var DanhMucData = {
            MaDanhMuc: MaDanhMuc,
            TenDanhMuc: TenDanhMuc
        };
    
        fetch(current_url_admin + '/api/DanhMuc/update-danhmuc', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(DanhMucData)
        })
        .then(response => {
            if (response.ok) {
                alert('Cập nhật thông tin loại sản phẩm thành công!');
                location.reload();
            } else {
                console.error('Lỗi cập nhật dữ liệu');
            }
        })
        .catch(error => {
            console.error('Lỗi kết nối đến máy chủ: ' + error);
        });
    }

    document.addEventListener('click', function (event) {
        var target = event.target;
    
        if (target.classList.contains('fa-trash-alt')) {
    
            var madanhmuc = target.getAttribute('data-madm');
    
            var xacNhan = confirm("Bạn có chắc chắn muốn xóa loại sản phẩm này?");
    
            if (xacNhan) {
                XoaDM(madanhmuc);
            }
        }
    });

    function XoaDM(madanhmuc) {
        fetch(current_url_admin + '/api/DanhMuc/delete-danhmuc' , {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.parse(madanhmuc)
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



    