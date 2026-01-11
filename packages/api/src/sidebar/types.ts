import {
  type InsertSidebar as BaseInsertSidebar,
  type Sidebar as BaseSidebar
} from "@repo/database"

/**
 * Represents the available column names for the Sidebar entity.
 */
export type SidebarColumns = keyof BaseSidebar

/**
 * Defines the types of entities that can be stored in the sidebar.
 */
export type SidebarEntityType = BaseSidebar["entityType"]

/**
 * Represents a single item in the sidebar, directly from the database schema.
 */
export type SidebarItem = BaseSidebar

/**
 * Represents a sidebar item with additional details like name and thumbnail for display purposes.
 */
export type SidebarItemWithDetails = SidebarItem & {
  name: string
  thumbnail: string | null
}

/**
 * Represents the data required to insert a new Sidebar item into the database.
 */
export type InsertSidebarItem = BaseInsertSidebar
/**
 * Represents the partial data for updating an existing Sidebar item in the database.
 */
export type UpdateSidebarItem = Partial<InsertSidebarItem>
