import { type SVGProps } from "react"

export const Minimize = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    width="8"
    height="1"
    viewBox="0 0 8 1"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line y1="0.5" x2="8" y2="0.5" stroke="currentColor" />
  </svg>
)

export const Maximize = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line y1="0.4" x2="8" y2="0.4" stroke="currentColor" />
    <line x1="0.4" x2="0.4" y2="8" stroke="currentColor" />
    <line x1="7.6" y1="0.8" x2="7.6" y2="8" stroke="currentColor" />
    <line x1="0.8" y1="7.6" x2="8" y2="7.6" stroke="currentColor" />
  </svg>
)

export const Restore = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line x1="0.5" y1="2" x2="0.5" y2="10" stroke="currentColor" />
    <line y1="9.5" x2="8" y2="9.5" stroke="currentColor" />
    <line y1="2.5" x2="8" y2="2.5" stroke="currentColor" />
    <line x1="7.5" y1="3" x2="7.5" y2="9" stroke="currentColor" />
    <line x1="2" y1="0.5" x2="10" y2="0.5" stroke="currentColor" stroke-opacity="0.3" />
    <line x1="2" y1="0.5" x2="10" y2="0.5" stroke="currentColor" stroke-opacity="0.3" />
    <line x1="9.5" y1="1" x2="9.5" y2="8" stroke="currentColor" stroke-opacity="0.3" />
    <line x1="9.5" y1="1" x2="9.5" y2="8" stroke="currentColor" stroke-opacity="0.3" />
  </svg>
)

export const Close = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 4.56641L0.681641 7.71094C0.601074 7.79102 0.500977 7.83203 0.388672 7.83203C0.273438 7.83203 0.163086 7.79102 0.0825195 7.71094C-0.00244141 7.62012 0 7.49316 0 7.37891C0 7.26562 0.0292969 7.15527 0.0976562 7.08398L3.2207 4.00098L0.0976562 0.916016C0.0292969 0.844727 0 0.733398 0 0.618164C0 0.501953 0.0292969 0.380859 0.0976562 0.308594C0.163086 0.236328 0.273438 0.195312 0.388672 0.195312C0.500977 0.195312 0.601074 0.236328 0.681641 0.308594L4 3.43359L7.31836 0.308594C7.39893 0.236328 7.49902 0.195312 7.61133 0.195312C7.72559 0.195312 7.83606 0.236328 7.91016 0.308594C7.97656 0.380859 8 0.501953 8 0.618164C8 0.733398 7.97656 0.844727 7.91016 0.916016L4.7793 4.00098L7.91016 7.08398C7.97656 7.15527 8 7.26562 8 7.37891C8 7.49316 7.97656 7.62012 7.91016 7.71094C7.83606 7.79102 7.72559 7.83203 7.61133 7.83203C7.49902 7.83203 7.39893 7.79102 7.31836 7.71094L4 4.56641Z"
      fill="currentColor"
    />
  </svg>
)
