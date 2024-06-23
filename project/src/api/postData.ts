import axios from "axios"
type Params = {
  endpoint: string
  data?: any
  formData?: boolean
}
const baseURL = import.meta.env.VITE_BASEURL
export const postData = async (params: Params) => {
  const token = localStorage.getItem("sego_token")
  const postConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": params.formData
        ? "multipart/form-data"
        : "application/json",
      authorization: `Bearer ${token}`,
    },
  }
  try {
    const data = await axios.post(
      `${baseURL}${params.endpoint}`,params.data,
      postConfig
    )
    return data
  } catch (error) {
    console.error(error)
  }
}
