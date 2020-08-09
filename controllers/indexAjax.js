// Khai báo svService tương tác api
var svService = new SinhVienService();


// Giao tiếp với api thông qua axios
var layDanhSachSinhVien = function () {
    var objectAPI = {
        url: 'http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien',
        method: 'GET' // phương thức backend cung cấp
    }

    // Gửi yêu cầu dữ liệu đến backend = > backend trả về promise
    var promise = axios(objectAPI);

    // Xử lý thành công
    var funcSuccess = function (result) {
        console.log(result.data);
        renderTableSinhVien(result.data);
    }

    var funcFail = function (error) {
        console.log(error);
    }

    // then(): hàm nhận giá trị là 1 hàm xử lý thành công
    // catch(): hàm nhận vào giá trị là 1 hàm xử lý thất bại
    promise.then(funcSuccess).catch(funcFail);
}

layDanhSachSinhVien();

// Lưu ý: ajax là 1 kỹ thuật xử lý bất đồng bộ: trong lúc thực thi, những dòng code phía dưới vẫn chạy bình thường
var renderTableSinhVien = function (mangSinhVien) {
    var contentTable = '';
    // Sau khi lấy được data từ backend => tạo bảng giao diện
    for (var i = 0; i < mangSinhVien.length; i++) {
        // Lấy ra từng sinh viên trong dữ liệu backend trả về
        var sinhVien = mangSinhVien[i];
        // Tạo ra 1 sv object từ prototype sinh viên
        var sv = new SinhVien();
        sv.maSV = sinhVien.MaSV;
        sv.tenSV = sinhVien.HoTen;
        sv.email = sinhVien.Email;
        sv.diemToan = sinhVien.DiemToan;
        sv.diemLy = sinhVien.DiemLy;
        sv.diemHoa = sinhVien.DiemHoa;
        sv.diemRenLuyen = 5;
        contentTable += `<tr>
                    <td>${sv.maSV}</td>
                    <td>${sv.tenSV}</td>
                    <td>${sv.email}</td>
                    <td>${sv.xepLoai()}</td>
                    <td>${sv.tinhDiemTrungBinh()}</td>
                    <td>
                    <button class="btn btn-primary" onclick="chinhSuaSinhVien(${sv.maSV})">Chỉnh sửa</button>
                    <button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSV}')">Xóa</button></td>
                </tr>`
    }
    // Dom đến giao diện ghi thông tin dữ liệu vào
    document.getElementById('tableSinhVien').innerHTML = contentTable;
}

// THÊM DỮ LIỆU LÊN SERVER QUA API POST
document.getElementById('btnThemSinhVien').onclick = function () {
    // Lấy thông tin từ người dùng (tạo ra một object)
    var sinhVien = {
        MaSV: document.getElementById('maSinhVien').value,
        HoTen: document.getElementById('tenSinhVien').value,
        Email: document.getElementById('email').value,
        SoDT: 123456789,
        CMND: 987654321,
        DiemToan: document.getElementById('diemToan').value,
        DiemLy: document.getElementById('diemLy').value,
        DiemHoa: document.getElementById('diemHoa').value
    }
    console.log(sinhVien);
    // Dùng axios gọi ajax đưa dữ liệu lên backend xử lý
    var objectAxios = {
        url: 'http://svcy.myclass.vn/api/SinhVien/ThemSinhVien',
        method: 'POST',
        data: sinhVien // thuộc tính backend yêu cầu dữ liệu gửi đi phải đúng định dạng
    }

    var promise = axios(objectAxios);
    promise.then(function (result) {
        // Thêm thành công, gọi lại api lấy danh sách sinh viên mới về
        layDanhSachSinhVien();
        console.log(result.data);
    }).catch(function (error) {
        console.log(error);
    })
}

// XÓA SINH VIÊN

var xoaSinhVien = function(maSV) {
    // Dùng service gọi api
    var promise = svService.xoaSinhVien(maSV);

    promise.then(function(result) {
        // Xóa thành công load lại api get LayDanhSachSinhVien
        layDanhSachSinhVien();
        console.log(result.data);
    }).catch(function(error) {
        console.log(error);
    });
}

// CHỈNH SỬA SINH VIÊN

var chinhSuaSinhVien = function(maSV) {
    var promise = svService.layThongTinSinhVien(maSV);

    promise.then(function(result) {
        console.log(result.data)
        var sinhVienEdit = result.data;
        document.getElementById('maSinhVien').value = sinhVienEdit.MaSV;
        document.getElementById('tenSinhVien').value = sinhVienEdit.HoTen;
        document.getElementById('email').value = sinhVienEdit.Email;
        document.getElementById('diemToan').value = sinhVienEdit.DiemToan;
        document.getElementById('diemLy').value = sinhVienEdit.DiemLy;
        document.getElementById('diemHoa').value = sinhVienEdit.DiemHoa;

        // Khóa mã sinh viên, không cho người đung chỉnh sửa
        document.getElementById('maSinhVien').disabled = true;
        document.getElementById('btnThemSinhVien').disabled = true;
    }).catch(function(error) {
        console.log(error)
    })
}

// LƯU THÔNG TIN SINH VIÊN

document.getElementById('btnLuuSinhVien').onclick = function() {
    // Lấy thông tin sinh viên gán vào data gửi lên api
    var sinhVienCapNhat = {
        MaSV: document.getElementById('maSinhVien').value,
        HoTen: document.getElementById('tenSinhVien').value,
        Email: document.getElementById('email').value,
        SoDT: 123456789,
        CMND: 987654321,
        DiemToan: document.getElementById('diemToan').value,
        DiemLy: document.getElementById('diemLy').value,
        DiemHoa: document.getElementById('diemHoa').value
    }
    
    var promise = svService.capNhatThongTinSinhVien(sinhVienCapNhat);
    promise.then(function (result) {
        // Cập nhật thành công, gọi lại api lấy danh sách sinh viên mới về
        layDanhSachSinhVien();

        document.getElementById('btnThemSinhVien').disabled = false;
        document.getElementById('maSinhVien').disabled = false;
        document.getElementById('btnLuuSinhVien').disabled = true;

        console.log(result.data);
        // Ẩn nút lưu cập nhật
    }).catch(function (error) {
        console.log(error);
    })
}


var hienThiThongTinSV = function() {
    console.log('userB, hiển thị thông tin sinh viên');
}

var sapXepSinhVien = function() {
    console.log('usA, sap xep sinh vien');
}

var def = function() {
    console.log('def');
}

var abc = function() {
    console.log('abc');
}

var capNhatXetLoai = function() {
    console.log('Cap nhat xep loai');
}

var f_devB = function() {
    console.log('devA');
}