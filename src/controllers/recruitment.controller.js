const recluitmentSchema = require('../models/recruitment')



//READ      -> GET AL RECRUITMENTS
const getAllRecruitments = async (req, res) => {
    try {
        const recruitment = await recluitmentSchema.findAll({
            attributes: ['id_recluitment', 'beg_date', 'end_date', 'id_clinic', 'id_dentist'],
            order: [['id_recluitment', 'ASC']],
        })
        res.status(200).send(recruitment)
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = { getAllRecruitments }