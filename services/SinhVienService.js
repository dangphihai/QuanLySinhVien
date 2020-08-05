var SinhVienService = function() {
    this.xoaSinhVien = function(maSV) {
        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/' + maSV,
            method: 'DELETE'
        })
    }

    this.layThongTinSinhVien = function(maSV) {
        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/' + maSV,
            method: 'GET'
        })
    }

    this.capNhatThongTinSinhVien = function(sv) {
        return axios({
            url: 'http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien',
            method: 'PUT',
            data: sv
        })
    }
}
