import _ from 'lodash'
const areaValidate = (val) => {
    const errors = {}

    if(_.isEmpty(val.name)){
        errors.name = "Nama harus diisi..!"
    }else if(val.name.length < 3){
        errors.name = "Nama minimal 3 digit karakter..!"
    }

    if(_.isEmpty(val.area_type) || val.area_type ===undefined){
        errors.area_type = "Silahkan pilih salah satu area..!"
    }

    return errors
}

export default areaValidate
