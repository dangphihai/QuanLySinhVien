
// Tạo mảng chứa thông tin tất cả sinh viên được thêm từ form
var mangSinhVien = [];
var validate = new Validation();
//------------ Giao tiếp với API thông qua axios ----------------

document.getElementById('btnThemSinhVien').onclick = function () {
    // Lấy thông tin sinh viên thêm vào đối tượng sinh viên
    var sinhVien = new SinhVien();
    sinhVien.maSV = document.getElementById('maSinhVien').value;
    sinhVien.tenSV = document.getElementById('tenSinhVien').value;
    sinhVien.email = document.getElementById('email').value;
    sinhVien.diemToan = document.getElementById('diemToan').value;
    sinhVien.diemLy = document.getElementById('diemLy').value;
    sinhVien.diemHoa = document.getElementById('diemHoa').value;
    sinhVien.diemRenLuyen = document.getElementById('diemRenLuyen').value;

    // Kiểm tra dữ liệu hợp lệ trước khi thêm vào mảng
    var valid = true

    valid =
        // Kiểm tra rỗng
        validate.kiemTraRong(sinhVien.maSV, '#error_maSinhVien')
        & validate.kiemTraRong(sinhVien.tenSV, '#error_tenSinhVien')
        & validate.kiemTraRong(sinhVien.email, '#error_email')
        & validate.kiemTraRong(sinhVien.diemToan, '#error_diemToan')
        & validate.kiemTraRong(sinhVien.diemLy, '#error_diemLy')
        & validate.kiemTraRong(sinhVien.diemHoa, '#error_diemHoa')
        & validate.kiemTraRong(sinhVien.diemRenLuyen, '#error_diemRenLuyen')

    // Kiểm tra mã sinh viên
    valid &= validate.kiemTraDoDaiChuoi(sinhVien.maSV, '#error_min_max_length_maSinhVien', 4, 6)

        // Kiểm tra tên là ký tự
        & validate.kiemTraTatCaLaChuoi(sinhVien.tenSV, '#error_all_letter_tenSinhVien')

        // Kiểm tra email 
        & validate.kiemTraEmail(sinhVien.email, '#error_format_email')

    // Kiểm tra điểm phải là số và từ 0-10
    valid &= validate.kiemTraSo(sinhVien.diemToan, '#error_all_number_diemToan')
        & validate.kiemTraGiaTri(sinhVien.diemToan, '#error_min_max_value_diemToan', 0, 10)

        & validate.kiemTraSo(sinhVien.diemLy, '#error_all_number_diemLy')
        & validate.kiemTraGiaTri(sinhVien.diemLy, '#error_min_max_value_diemLy', 0, 10)

    valid &= validate.kiemTraSo(sinhVien.diemHoa, '#error_all_number_diemHoa')
        & validate.kiemTraGiaTri(sinhVien.diemHoa, '#error_min_max_value_diemHoa', 0, 10)

        & validate.kiemTraSo(sinhVien.diemRenLuyen, '#error_all_number_diemRenLuyen')
        & validate.kiemTraGiaTri(sinhVien.diemRenLuyen, '#error_min_max_value_diemRenLuyen', 0, 10)



    if (!valid) {
        return;
    }

    // trim() phương thức loại bỏ khoảng trống đầu và cuối của chuỗi
    // if(sinhVien.maSV.trim() === '') {
    //     // Dom tới thẻ p thông báo bên dưới thẻ input
    //     document.getElementById('error_maSinhVien').style.display = 'block'
    //     document.getElementById('error_maSinhVien').innerHTML = 'Mã sinh viên không được bỏ trống!';
    //     valid = false;
    // } else {
    //     document.getElementById('error_maSinhVien').innerHTML = '';
    //     document.getElementById('error_maSinhVien').style.display = 'none'
    // }

    // if(sinhVien.tenSV.trim() === '') {
    //     document.getElementById('error_tenSinhVien').style.display = 'block'
    //     document.getElementById('error_tenSinhVien').innerHTML = 'Tên sinh viên không được bỏ trống!';
    //     valid = false;
    // } else {
    //     document.getElementById('error_tenSinhVien').innerHTML = '';
    //     document.getElementById('error_tenSinhVien').style.display = 'none'
    // }

    // if(sinhVien.email.trim() === '') {
    //     document.getElementById('error_email').style.display = 'block'
    //     document.getElementById('error_email').innerHTML = 'Email không được bỏ trống!';
    //     valid = false;
    // } else {
    //     document.getElementById('error_email').innerHTML = '';
    //     document.getElementById('error_email').style.display = 'none'
    // }

    // if(sinhVien.diemToan.trim() === '') {
    //     document.getElementById('error_diemToan').style.display = 'block'
    //     document.getElementById('error_diemToan').innerHTML = 'Điểm toán không được bỏ trống!';
    //     valid = false;
    // } else {
    //     document.getElementById('error_diemToan').innerHTML = '';
    //     document.getElementById('error_diemToan').style.display = 'none'
    // }

    // if(sinhVien.diemLy.trim() === '') {
    //     document.getElementById('error_diemLy').style.display = 'block'
    //     document.getElementById('error_diemLy').innerHTML = 'Điểm lý không được bỏ trống!';
    //     valid = false;
    // } else {
    //     document.getElementById('error_diemLy').innerHTML = '';
    //     document.getElementById('error_diemLy').style.display = 'none'
    // }

    // if(sinhVien.diemHoa.trim() === '') {
    //     document.getElementById('error_diemHoa').style.display = 'block'
    //     document.getElementById('error_diemHoa').innerHTML = 'Điểm hóa không được bỏ trống!';
    //     valid = false;
    // } else {
    //     document.getElementById('error_diemHoa').innerHTML = '';
    //     document.getElementById('error_diemHoa').style.display = 'none'
    // }

    // if(sinhVien.diemRenLuyen.trim() === '') {
    //     document.getElementById('error_diemRenLuyen').style.display = 'block'
    //     document.getElementById('error_diemRenLuyen').innerHTML = 'Điểm rèn luyện không được bỏ trống!';
    //     valid = false;
    // } else {
    //     document.getElementById('error_diemRenLuyen').innerHTML = '';
    //     document.getElementById('error_diemRenLuyen').style.display = 'none'
    // }
    // push(): phương thức thêm 1 phần tử vào mảng
    mangSinhVien.push(sinhVien);

    renderTableSinhVien(mangSinhVien);

    // Lưu vào local storage sau khi thêm sinh viên
    luuLocalStore();


    console.log(mangSinhVien);

    // // Tạo nội dung thẻ tr SinhVien
    // var trSinhVien = document.createElement('tr');
    // // Tạo nội dung các thẻ td
    // var tdMaSinhVien = document.createElement('td');
    // tdMaSinhVien.innerHTML = sinhVien.maSV;

    // var tdtenSinhVien = document.createElement('td');
    // tdtenSinhVien.innerHTML = sinhVien.tenSV;

    // var tdEmail = document.createElement('td');
    // tdEmail.innerHTML = sinhVien.email;

    // var tdLoaiSinhVien = document.createElement('td');
    // tdLoaiSinhVien.innerHTML = sinhVien.loaiSV;

    // var tdDiemTrungBinh = document.createElement('td');
    // tdDiemTrungBinh.innerHTML = sinhVien.tinhDiemTrungBinh();

    // var tdDiemRenLuyen = document.createElement('td');
    // tdDiemRenLuyen.innerHTML = sinhVien.diemRenLuyen;

    // var tdAction = document.createElement('td');
    // var btnXoa = document.createElement('button');
    // btnXoa.innerHTML = 'Xóa';
    // btnXoa.className = 'btn btn-danger';
    // btnXoa.id = 'btnXoa';
    // btnXoa.onclick = function() {
    //     btnXoa.parentElement.parentElement.remove();
    // }


    // tdAction.appendChild(btnXoa);

    // trSinhVien.appendChild(tdMaSinhVien);
    // trSinhVien.appendChild(tdtenSinhVien);
    // trSinhVien.appendChild(tdEmail);
    // trSinhVien.appendChild(tdLoaiSinhVien);
    // trSinhVien.appendChild(tdDiemTrungBinh);
    // trSinhVien.appendChild(tdDiemRenLuyen);
    // trSinhVien.appendChild(tdAction);

    // // Dom tới thẻ tbody và append child
    // document.getElementById('tableSinhVien').appendChild(trSinhVien);

}

var renderTableSinhVien = function (mangSV) {
    // Từ dữ liệu mảng tạo ra từ các thẻ tr tương ứng
    var chuoiTr = '';
    for (var i = 0; i < mangSinhVien.length; i++) {
        // Mỗi lần duyệt lấy ra dữ liệu của 1 sinh viên trong mảng
        var sinhVien = mangSV[i];
        // Tạo ra một object mới
        var sv = new SinhVien();
        sv.maSV = sinhVien.maSV;
        sv.tenSV = sinhVien.tenSV;
        sv.email = sinhVien.email;
        sv.diemToan = sinhVien.diemHoa;
        sv.diemLy = sinhVien.diemLy;
        sv.diemRenLuyen = sinhVien.diemRenLuyen;
        sv.loaiSV = sinhVien.loaiSV;
        // Từ dữ liệu sinh viên, tạo ra từng thẻ tr tương ứng
        chuoiTr += `<tr>
                    <td>${sv.maSV}</td>
                    <td>${sv.tenSV}</td>
                    <td>${sv.email}</td>
                    <td>${sv.xepLoai()}</td>
                    <td>${sv.tinhDiemTrungBinh()}</td>
                    <td><button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSV}')">Xóa</button></td>
                    <td></td>
                </tr>`

    }
    // Thoát ra vòng lặp
    document.getElementById('tableSinhVien').innerHTML = chuoiTr;
}

var xoaSinhVien = function (maSV) {
    for (var i = mangSinhVien.length - 1; i >= 0; i--) {
        var sinhVien = mangSinhVien[i];
        if (sinhVien.maSV === maSV) {
            mangSinhVien.splice(i, 1);
        }
    }
    // Sau khi xóa xong tạo lại tableSinhVien
    renderTableSinhVien(mangSinhVien);
}

var luuLocalStore = function () {
    // Biến mangSinhVien thành chuỗi
    var sMangSinhVien = JSON.stringify(mangSinhVien);
    // Lưu vào local storage
    localStorage.setItem('mangSinhVien', sMangSinhVien);
}

var layDuLieuLocalStorage = function () {
    if (localStorage.getItem('mangSinhVien')) {
        // Lấy dữ liệu từ local storage
        var sMangSinhVien = localStorage.getItem('mangSinhVien');
        // Chuyển chuỗi local storage về mảng (object) và gán cho mangSinhVien
        mangSinhVien = JSON.parse(sMangSinhVien);
        // Gọi hàm renderTable mangSinhVien
        renderTableSinhVien(mangSinhVien);
        console.log(mangSinhVien)
    }
}

layDuLieuLocalStorage();
