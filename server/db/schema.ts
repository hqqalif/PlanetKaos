import { pgTable, serial, text, timestamp, jsonb } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
})

export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    brand: text('brand').notNull(),
    imageUrl: text('image_url').notNull(),
    description: text('description').notNull(),

    // jsonb -> array string asli, tidak perlu JSON.parse di frontend
    colors: jsonb('colors').$type<string[]>().notNull(),
    sizes: jsonb('sizes').$type<string[]>().notNull(),

    createdAt: timestamp('created_at').defaultNow(),
})