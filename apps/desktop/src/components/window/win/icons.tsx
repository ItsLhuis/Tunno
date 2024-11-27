export const MinimizeIcon = () => (
  <div className="w-5 h-5 flex justify-center items-center transform scale-75">
    <div className="w-4 h-[2px] rounded-sm bg-current"></div>
  </div>
)

export const MaximizeIcon = () => (
  <div className="w-5 h-5 flex justify-center items-center transform scale-75">
    <div className="w-3.5 h-3.5 rounded-sm border-2 border-current"></div>
  </div>
)

export const RestoreIcon = () => (
  <div className="w-5 h-5 flex justify-center items-center relative transform scale-75">
    <div className="absolute w-3 h-3 rounded-sm border-t-2 border-r-2 border-current top-0.5 left-1.5"></div>
    <div className="w-3 h-3 rounded-sm border-2 border-current absolute top-1.5 left-0.5"></div>
  </div>
)

export const CloseIcon = () => (
  <div className="w-5 h-5 flex justify-center items-center transform scale-80">
    <div className="relative w-3 h-3 flex justify-center items-center">
      <div className="absolute rounded-sm w-[1.5px] h-4 bg-current rotate-45"></div>
      <div className="absolute rounded-sm w-[1.5px] h-4 bg-current -rotate-45"></div>
    </div>
  </div>
)
