function timeRun (req,res,next) {
    console.log (`Đây là chương trình chạy với Method ${req.method} với url là ${req.url} . Thời gian chạy method là ${new Date()}`)

    next()
}

module.exports = {timeRun};