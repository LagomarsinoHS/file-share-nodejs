require("dotenv").config();
require("./bd");

const PORT = process.env.PORT || 3000
const app = require("./server")
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))
