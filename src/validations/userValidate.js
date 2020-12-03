import _ from 'lodash'
const userValidate = (val) => {
    const errors = {}

    if(_.isEmpty(val.nip)){
        errors.nip = "Nip harus diisi..!"
    }else if(_.isNaN(val.nip)){
        errors.nip = "Nip hanya boleh angka..!"
    }else if(val.nip.length < 6){
        errors.nip = "Nip minimal 6 digit angka !"
    }

    if(_.isEmpty(val.name)){
        errors.name = "Nama harus diisi..!"
    }else if(val.name.length < 3){
        errors.name = "Nama minimal 3 digit karakter..!"
    }

    if(_.isEmpty(val.email)){
        errors.email = "Email wajib diisi..!"
    }

    if(_.isEmpty(val.phone)){
        errors.phone = "No. telp harus diisi..!"
    }else if(_.isNaN(val.phone)){
        errors.phone = "No. telp harus angka..!"
    }else if(val.phone.length < 8){
        errors.phone = "No. telp minimal 8 digit angka..!"
    }

    if(_.isEmpty(val.role)){
        errors.role = "Role harus diisi..!"
    }

    return errors
}

export default userValidate
