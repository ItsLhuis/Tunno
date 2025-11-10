import { Button, type ButtonProps } from "@components/ui/Button"
import { Icon, type IconProps } from "@components/ui/Icon"

export type IconButtonProps = Omit<ButtonProps, "size" | "asChild" | "children"> & {
  name: IconProps["name"]
  isFilled?: boolean
}

const IconButton = ({ name, isFilled, className, ref, ...props }: IconButtonProps) => {
  return (
    <Button ref={ref} size="icon" className={className} {...props}>
      <Icon name={name} isFilled={isFilled} />
    </Button>
  )
}

export { IconButton }
