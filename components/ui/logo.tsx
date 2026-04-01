import logo from "@/public/logo.svg"

export default function Logo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <img src={logo.src} alt="" />
      <span className="text-xl font-bold text-gray-900 tracking-tight">
        KaireTribe
      </span>
    </div>
  );
}