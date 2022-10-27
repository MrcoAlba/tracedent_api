const recruitmentSchema = require('../models/recruitment')



//READ      -> GET AL RECRUITMENTS
const getAllRecruitments = async (req, res) => {
    try {
        const recruitment = await recruitmentSchema.findAll({
            attributes: ['id_recruitment', 'beg_date', 'end_date','sttus', 'id_clinic', 'id_dentist'],
            order: [['id_recruitment', 'ASC']],
        })
        res.status(200).send(recruitment)
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = { getAllRecruitments }