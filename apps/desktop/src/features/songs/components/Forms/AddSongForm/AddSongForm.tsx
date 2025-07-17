import { type ReactNode } from "react"

import { useForm } from "react-hook-form"

import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  TextInput
} from "@components/ui"

export type AddSongFormType = {
  trigger: ReactNode
}

const AddSongForm = ({ trigger }: AddSongFormType) => {
  const form = useForm()

  const onSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      {trigger}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <TextInput placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export { AddSongForm }
