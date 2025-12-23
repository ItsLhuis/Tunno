import {
  type InsertSidebar as BaseInsertSidebar,
  type Sidebar as BaseSidebar
} from "@repo/database"

export type SidebarColumns = keyof BaseSidebar

export type SidebarEntityType = BaseSidebar["entityType"]

export type SidebarItem = BaseSidebar

export type SidebarItemWithDetails = SidebarItem & {
  name: string
  thumbnail: string | null
}

export type InsertSidebarItem = BaseInsertSidebar
export type UpdateSidebarItem = Partial<InsertSidebarItem>
