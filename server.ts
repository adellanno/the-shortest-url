import { app } from './index'

const port = process.env.PORT as unknown as number || 8000

app.listen(port, () => console.log(`Listening on port ${port}`));