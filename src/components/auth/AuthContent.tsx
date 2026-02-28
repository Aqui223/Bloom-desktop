import Icon from "../ui/Icon.tsx";

export function AuthContent() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-lg">
      <div className="flex select-none flex-col justify-center items-center gap-sm">
        <Icon icon="at" size={108} className="text-primary"/>
        <h1 className="text-xxxl font-bold text-white">Введите почту</h1>
      </div>

      <div className="flex h-xxxxl bg-foreground w-full">
        <div className="aspect-square h-full flex justify-center items-center">
          <Icon icon="at" size={24} className="text-text-secondary"/>
        </div>

        <input className="placeholder:text-text-secondary placeholder:text-md text-md"
               placeholder="example@gmail.com"/>
      </div>
      <p className="text-center select-none text-md text-text-secondary w-[330px] break-words">
        После этого мы отправим 6-значный код подтверждения на вашу почту
      </p>
    </div>
  )
}
