new Vue({
    el: "#app",
    data: {
        examId: "",
        name: "",
        result: null,
        error: "",
    },
    methods: {
        async queryScore() {
            this.result = null
            this.error = ""
            try {
                const response = await fetch(
                    "http://localhost:3000/api/query",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            exam_id: this.examId,
                            name: this.name,
                        }),
                    }
                )
                if (!response.ok) {
                    throw new Error("查询失败，请检查输入信息")
                }
                const data = await response.json()
                this.result = data
            } catch (error) {
                this.error = error.message
            }
        },
    },
})
