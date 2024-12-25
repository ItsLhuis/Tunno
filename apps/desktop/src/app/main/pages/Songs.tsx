import { List, Checkbox } from "@components/ui"

import { ColumnDef } from "@tanstack/react-table"

type Person = {
  id: string
  name: string
  email: string
}

const columns: ColumnDef<Person>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "email",
    header: "Email"
  }
]

const data: Person[] = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Doe", email: "jane@example.com" },
  { id: "3", name: "Alice Smith", email: "alice@example.com" },
  { id: "4", name: "Bob Johnson", email: "bob@example.com" },
  { id: "5", name: "Charlie Brown", email: "charlie@example.com" },
  { id: "6", name: "David Wilson", email: "david@example.com" },
  { id: "7", name: "Eva Davis", email: "eva@example.com" },
  { id: "8", name: "Frank Miller", email: "frank@example.com" },
  { id: "9", name: "Grace Lee", email: "grace@example.com" },
  { id: "10", name: "Henry Clark", email: "henry@example.com" },
  { id: "11", name: "Ivy Lewis", email: "ivy@example.com" },
  { id: "12", name: "Jack Walker", email: "jack@example.com" }
]

function Songs() {
  return <List className="p-6" headerProps={{ title: "Songs" }} columns={columns} data={data} />
}

export default Songs
