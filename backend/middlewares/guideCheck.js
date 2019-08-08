
const guideCheck = (req, res, next) => {
    const {isGuide} = req.decoded
    if (!isGuide) return res.status(403).json({message: "당신은 가이드가 아닙니다. 허튼짓 하지 마세요."})
    next()
}


module.exports = guideCheck