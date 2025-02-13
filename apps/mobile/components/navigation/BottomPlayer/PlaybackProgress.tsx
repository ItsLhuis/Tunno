import { useEffect, useState } from "react"

import { border } from "@constants/styles"

import { Slider } from "../../ui/Slider"

export function PlaybackProgress() {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prevValue) => {
        if (prevValue >= 1) {
          return 0
        }
        return prevValue + 0.01
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Slider
      disabled
      value={value}
      containerStyle={{ height: "auto" }}
      trackStyle={{ height: border.thin }}
      minimumTrackStyle={{ height: border.medium }}
      thumbStyle={{ height: 0, width: 0 }}
    />
  )
}
