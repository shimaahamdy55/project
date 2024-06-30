import locale from "../locale"

const useTranslate = () => {
  const lang = sessionStorage.getItem("lang") || "en"
  const res = lang === "ar" && locale.ar
  return res
}

export default useTranslate