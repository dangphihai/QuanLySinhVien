// Khai bao prototype (gan giong voi class - lop doi tuong)

var SinhVien = function () {
    this.maSV = '';
    this.tenSV = '';
    this.diemToan = '';
    this.diemLy = '';
    this.diemHoa = '';
    this.diemRenLuyen = '';
    this.loaiSV = '';
    this.email = '';
    
    this.tinhDiemTrungBinh = function () {
        return (Number(this.diemToan) + Number(this.diemLy) + Number(this.diemHoa)) / 3;
    };
    this.xepLoai = function () {
        var dtb = this.tinhDiemTrungBinh();
        console.log(dtb)
        if (this.diemRenLuyen < 5) {
            return 'Yếu'
        } else if (this.diemRenLuyen >= 5) {
            if (dtb < 5) {
                return 'Yếu'
            } else if (dtb >= 5 && dtb < 6.5) {
                return 'Trung bình'
            } else if (dtb >= 6.5 && dtb < 8) {
                return 'Khá'
            } else if (dtb >= 8 && dtb < 9) {
                return 'Giỏi'
            } else if (dtb >= 9 && dtb <= 10) {
                return 'Xuất sắc'
            } else {
                return 'Điểm trung bình không hợp lệ';
            }
        } else {
            return 'Điểm rèn luyện không hợp lệ'
        }
    };
}