import {
    pgTable,
    serial,
    text,
    integer,
    boolean,
    timestamp,
    jsonb,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
export type OrderItem = {
    productId: number
    name: string
    price: number
    quantity: number
    size: string
    color: string
    imageUrl?: string
}

//tabel

export const categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    imageUrl: text('image_url'),
    createdAt: timestamp('created_at').defaultNow(),
})

export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description'),

    price: integer('price').notNull(),
    originalPrice: integer('original_price'),

    imageUrl: text('image_url'),

    images: jsonb('images').$type<string[]>(),
    sizes: jsonb('sizes').$type<string[]>().notNull().default(['S', 'M', 'L', 'XL', 'XXL']),
    colors: jsonb('colors').$type<string[]>().notNull().default([]),

    categoryId: integer('category_id').references(() => categories.id, { onDelete: 'set null' }),
    stock: integer('stock').default(0),

    isActive: boolean('is_active').default(true),
    isFeatured: boolean('is_featured').default(false),
    createdAt: timestamp('created_at').defaultNow(),
})

export const orders = pgTable('orders', {
    id: serial('id').primaryKey(),
    orderNumber: text('order_number').notNull().unique(),
    customerName: text('customer_name').notNull(),
    customerEmail: text('customer_email').notNull(),
    customerPhone: text('customer_phone').notNull(),
    address: text('address').notNull(),
    city: text('city').notNull(),
    province: text('province').notNull(),
    postalCode: text('postal_code').notNull(),

    items: jsonb('items').$type<OrderItem[]>().notNull(),

    subtotal: integer('subtotal').notNull(),
    total: integer('total').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
})

export const admins = pgTable('admins', {
    id: serial('id').primaryKey(),
    username: text('username').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
})

export const categoriesRelations = relations(categories, ({ many }) => ({ products: many(products), }))

export const productsRelations = relations(products, ({ one }) => ({
    category: one(categories, {
        fields: [products.categoryId],
        references: [categories.id],
    }),
}))