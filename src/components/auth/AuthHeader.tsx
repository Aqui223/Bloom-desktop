import Icon from "../ui/Icon.tsx";

export default function AuthHeader() {
  return (
    <header className="w-full p-lg">
      <div className="flex items-center gap-sm justify-center select-none">
        <Icon icon="logo" size={20} className="text-primary"/>
        <span className="text-xl font-bold text-text-main">
            Bloom
          </span>
      </div>
    </header>
  )
}
