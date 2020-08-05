var Validation = function() {
    this.kiemTraRong = function(value, selectorError) {
        if(value.trim() === '') {
            document.querySelector(selectorError).innerHTML = 'Không được bỏ trống!';
            document.querySelector(selectorError).style.display = 'block';
            return false;
        } else {
            document.querySelector(selectorError).innerHTML = '';
            document.querySelector(selectorError).style.display = 'none';
            return true;
        }
    }

    this.kiemTraTatCaLaChuoi = function(value, selectorError) {
        var regexAllLetter = /^[a-z A-Z]+$/;
        if(regexAllLetter.test(value.trim())) {
            document.querySelector(selectorError).innerHTML = '';
            document.querySelector(selectorError).style.display = 'none';
            return true;
        } else {
            document.querySelector(selectorError).innerHTML = 'Không được nhập số và ký tự đặc biệt';
            document.querySelector(selectorError).style.display = 'block';
            return false;
        }
    }

    this.kiemTraEmail = function(value, selectorError) {
        var regexValidEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regexValidEmail.test(value.trim())) {
            document.querySelector(selectorError).innerHTML = '';
            document.querySelector(selectorError).style.display = 'none';
            return true;
        } else {
            document.querySelector(selectorError).innerHTML = 'Email không hợp lệ!';
            document.querySelector(selectorError).style.display = 'block';
            return false;
        }
    }

    this.kiemTraSo = function(value, selectorError) {
        var regNumber = /^[0-9]$/;
        if (regNumber.test(value.trim())) {
            document.querySelector(selectorError).innerHTML = '';
            document.querySelector(selectorError).style.display = 'none';
            return true;
        } else {
            document.querySelector(selectorError).innerHTML = 'Chỉ được nhập số!';
            document.querySelector(selectorError).style.display = 'block';
            return false;

        }
    }

    this.kiemTraGiaTri = function(value, selectorError, minValue, maxValue) {
        var valid = this.kiemTraSo(value, selectorError);

        if(Number(value.trim()) < minValue || Number(value.trim()) > maxValue || !valid) {
            document.querySelector(selectorError).innerHTML = `Giá trị từ ${minValue} - ${maxValue}!`;
            document.querySelector(selectorError).style.display = 'block';
            return false;
        } else {
            document.querySelector(selectorError).innerHTML = '';
            document.querySelector(selectorError).style.display = 'none';
            return true
        }
    }

    this.kiemTraDoDaiChuoi = function(value, selectorError, minLength, maxLength) {
        if(value.length < minLength || value.length > maxLength) {
            document.querySelector(selectorError).innerHTML = `Độ dài từ ${minLength} - ${maxLength}!`;
            document.querySelector(selectorError).style.display = 'block';
            return false;
        } else {
            document.querySelector(selectorError).innerHTML = '';
            document.querySelector(selectorError).style.display = 'none';
            return true;
        }
    }
}