import { create } from 'dva-core-ts'
import createLoading from 'dva-loading-ts'
import models from '@/models/index'
import Toast from 'react-native-root-toast'
const app = create({
  onError: (e: any) => {
    const {data: {message}, status} = e.response
    Toast.show(message, {
      position: Toast.positions.CENTER,
      duration: Toast.durations.LONG,
      shadow: true,
      animation: true,
    });
  }
})
models.forEach(model => app.model(model))
app.use(createLoading())
app.start()
export default app._store