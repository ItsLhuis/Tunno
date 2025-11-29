import { createContext, useContext, useId } from "react"

import { createStyleSheet, useStyles } from "@styles"

import { View, type ViewProps } from "react-native"

import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues
} from "react-hook-form"

import { Label, type LabelProps } from "@components/ui/Label"
import { Text, type TextProps } from "@components/ui/Text"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

function useFormField() {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)

  const { getFieldState } = useFormContext()

  const formState = useFormState({ name: fieldContext.name })

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue)

const FormItem = ({ style, ...props }: ViewProps) => {
  const styles = useStyles(formItemStyles)

  const id = useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <View style={[styles.container, style]} {...props} />
    </FormItemContext.Provider>
  )
}

const FormLabel = ({ style, ...props }: LabelProps) => {
  const { error } = useFormField()

  return <Label color={error ? "destructive" : "foreground"} style={style} {...props} />
}

const FormControl = ({ children, ...props }: ViewProps) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <View
      nativeID={formItemId}
      accessible={true}
      aria-invalid={!!error}
      aria-describedby={!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`}
      {...props}
    >
      {children}
    </View>
  )
}

const FormDescription = ({ style, ...props }: TextProps) => {
  const { formDescriptionId } = useFormField()

  return (
    <Text nativeID={formDescriptionId} size="xs" color="mutedForeground" style={style} {...props} />
  )
}

const FormMessage = ({ style, children, ...props }: TextProps) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <Text
      nativeID={formMessageId}
      size="xs"
      color="destructive"
      weight="medium"
      style={style}
      {...props}
    >
      {body}
    </Text>
  )
}

const formItemStyles = createStyleSheet(({ theme }) => ({
  container: {
    gap: theme.space(2)
  }
}))

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField
}
