import { useToast } from "native-base";

const duration = 2000
const placement = "top"

const useMessage = () => {
  const toast = useToast();
  const message = (title: string) => {
    toast.show({
      title,
      duration,
      placement,
    });
  }

  const success = (title: string) => {
    toast.show({
      title,
      duration,
      status: "success",
      placement,
      isClosable: false
    });
  }

  const error = (title: string) => {
    toast.show({
      title,
      duration,
      status: "error",
      placement,
      isClosable: false
    });
  }
  return {message, success, error}
}

export default useMessage