export const Minimize = ({ isLinux = false }) => (
  <div
    className="w-5 h-5 flex justify-center items-center transform"
    style={{ transform: `scale(${isLinux ? 0.5 : 0.75})` }}
  >
    <div className="w-4 h-[2px] rounded-sm bg-current"></div>
  </div>
)

export const Maximize = ({ isLinux = false }) => (
  <div
    className="w-5 h-5 flex justify-center items-center transform"
    style={{ transform: `scale(${isLinux ? 0.5 : 0.75})` }}
  >
    <div
      className="w-3.5 h-3.5 border-2 border-current"
      style={{ borderRadius: isLinux ? 0 : 3 }}
    ></div>
  </div>
)

export const Restore = ({ isLinux = false }) => (
  <div
    className="w-5 h-5 flex justify-center items-center relative transform"
    style={{ transform: `scale(${isLinux ? 0.5 : 0.75})` }}
  >
    <div
      className="absolute w-3 h-3 border-t-2 border-r-2 border-current top-0.5 left-1.5"
      style={{ opacity: isLinux ? 0.5 : 1, borderRadius: isLinux ? 0 : 3 }}
    ></div>
    <div
      className="w-3 h-3 border-2 border-current absolute top-1.5 left-0.5"
      style={{ borderRadius: isLinux ? 0 : 3 }}
    ></div>
  </div>
)

export const Close = ({ isLinux = false }) => (
  <div
    className="w-5 h-5 flex justify-center items-center transform"
    style={{ transform: `scale(${isLinux ? 0.65 : 0.8})` }}
  >
    <div className="relative w-3 h-3 flex justify-center items-center">
      <div className="absolute rounded-sm w-[1.5px] h-4 bg-current rotate-45"></div>
      <div className="absolute rounded-sm w-[1.5px] h-4 bg-current -rotate-45"></div>
    </div>
  </div>
)
