const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const Score = require("./models/score")

const app = express()
const PORT = 3000

// 配置中间件
app.use(cors())
app.use(express.json())

// 连接 MongoDB
mongoose
    .connect("mongodb://127.0.0.1:27017/cet_scores", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB 连接成功")
    })
    .catch((err) => console.error("MongoDB 连接失败", err))

// 查询成绩
app.post("/api/query", async (req, res) => {
    const { exam_id, name } = req.body
    try {
        const score = await Score.findOne({ exam_id, name })
        if (score) {
            res.json(score)
        } else {
            res.status(404).json({
                message: "未找到成绩，请检查准考证号和姓名",
            })
        }
    } catch (error) {
        res.status(500).json({ message: "查询失败", error })
    }
})

app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`)
})
