import { useParams } from "@tanstack/react-router"

import { Typography } from "@components/ui"

const Song = () => {
  const { id } = useParams({ from: "/songs/$id" })

  return <Typography>{id}</Typography>
}

export { Song }
