import Icon from "../ui/Icon.tsx";
import TextInput from "../ui/TextInput.tsx";
import {useState} from "react";
import Button from "../ui/Button.tsx";

export function AuthContent() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-lg">
      <div className="flex select-none flex-col justify-center items-center gap-sm">
        <Icon icon="at" size={108} className="text-primary"/>
        <h1 className="text-xxxl font-bold text-text-main">Введите почту</h1>
      </div>


      <TextInput value={email} onChange={(e) => setEmail(e.target.value)}
                 placeholder="example@gmail.com"/>

      <p className="text-center select-none text-md text-text-secondary w-[330px] break-words">
        После этого мы отправим 6-значный код подтверждения на вашу почту
      </p>

      <Button type="submit">
        Продолжить
      </Button>
    </div>
  )
}
