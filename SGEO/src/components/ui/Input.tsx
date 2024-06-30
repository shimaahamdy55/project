import useTranslate from "../../hooks/useTranslate"
import Translate from "./Translate"

interface Input extends React.InputHTMLAttributes<HTMLInputElement> {
    form: any
    name: string
}
const Input = ({ name, form, ...props }: Input) => {
    const locale: any = useTranslate()
    
    if (props.hidden) return null
    return (<>
         <label htmlFor={name} className="relative top-4"><Translate text={name}/></label>
        <input
            {...form.getInputProps(name)}
              placeholder={locale?.[name] || name}
            id={name}
            {...props}
            className={`p-2 border border-white-200 outline-4 m-0 ${!!form?.errors[name] && 'border-red-500'}`}
        />
        <span className="text-red-500">{form?.errors[name]}</span>
    </>
    )
}

export default Input