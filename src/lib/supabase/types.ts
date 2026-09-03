export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type ProductUnit = 'MT' | 'Containers'
export type QuoteStatus = 'pending' | 'reviewed' | 'approved' | 'rejected'
export type ProfileRole = 'client' | 'admin'
export type OrderStatus =
  | 'pending_payment'
  | 'paid'
  | 'failed'
  | 'cancelled'
  | 'fulfillment'
  | 'delivered'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          company_name: string
          contact_name: string | null
          email: string
          phone: string | null
          country: string | null
          vat_number: string | null
          role: ProfileRole
          locale: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          company_name: string
          contact_name?: string | null
          email: string
          phone?: string | null
          country?: string | null
          vat_number?: string | null
          role?: ProfileRole
          locale?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
        Relationships: []
      }
      products: {
        Row: {
          id: string
          slug: string
          category_en: string
          category_ar: string
          title_en: string
          title_ar: string
          desc_en: string
          desc_ar: string
          specs_en: string[]
          specs_ar: string[]
          image: string
          min_order: number
          unit: ProductUnit
          availability_en: string
          availability_ar: string
          harvest_season_en: string
          harvest_season_ar: string
          sizes_en: string
          sizes_ar: string
          packaging_en: string
          packaging_ar: string
          commodity_class_en: string
          commodity_class_ar: string
          origin_en: string
          origin_ar: string
          brix: string | null
          index_price: string | null
          trend: string | null
          retail_price_egp: number | null
          consumer_unit_en: string
          consumer_unit_ar: string
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['products']['Row'],
          'id' | 'created_at' | 'updated_at' | 'is_active' | 'sort_order'
        > & {
          id?: string
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['products']['Insert']>
        Relationships: []
      }
      quote_requests: {
        Row: {
          id: string
          user_id: string | null
          company_name: string
          email: string
          phone: string | null
          country: string
          incoterm: string
          destination_port: string
          currency: string
          total_mt: number
          status: QuoteStatus
          admin_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          company_name: string
          email: string
          phone?: string | null
          country: string
          incoterm?: string
          destination_port: string
          currency?: string
          total_mt?: number
          status?: QuoteStatus
          admin_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['quote_requests']['Insert']>
        Relationships: []
      }
      quote_items: {
        Row: {
          id: string
          quote_request_id: string
          product_id: string | null
          product_slug: string
          title_en: string
          title_ar: string
          quantity: number
          unit: ProductUnit
          packaging: string
          quantity_mt: number
          created_at: string
        }
        Insert: {
          id?: string
          quote_request_id: string
          product_id?: string | null
          product_slug: string
          title_en: string
          title_ar: string
          quantity: number
          unit?: ProductUnit
          packaging: string
          quantity_mt: number
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['quote_items']['Insert']>
        Relationships: [
          {
            foreignKeyName: 'quote_items_quote_request_id_fkey'
            columns: ['quote_request_id']
            isOneToOne: false
            referencedRelation: 'quote_requests'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'quote_items_product_id_fkey'
            columns: ['product_id']
            isOneToOne: false
            referencedRelation: 'products'
            referencedColumns: ['id']
          },
        ]
      }
      orders: {
        Row: {
          id: string
          order_number: string
          status: OrderStatus
          lang: string
          currency: string
          subtotal_egp: number
          shipping_egp: number
          total_egp: number
          customer_name: string
          customer_email: string
          customer_phone: string
          shipping_street: string
          shipping_city: string
          shipping_governorate: string
          customer_notes: string | null
          paymob_intention_id: string | null
          paymob_transaction_id: string | null
          payment_method: string | null
          paid_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number: string
          status?: OrderStatus
          lang?: string
          currency?: string
          subtotal_egp: number
          shipping_egp?: number
          total_egp: number
          customer_name: string
          customer_email: string
          customer_phone: string
          shipping_street: string
          shipping_city: string
          shipping_governorate: string
          customer_notes?: string | null
          paymob_intention_id?: string | null
          paymob_transaction_id?: string | null
          payment_method?: string | null
          paid_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['orders']['Insert']>
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string | null
          product_slug: string
          title_en: string
          title_ar: string
          unit_label_en: string
          unit_label_ar: string
          quantity: number
          unit_price_egp: number
          line_total_egp: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id?: string | null
          product_slug: string
          title_en: string
          title_ar: string
          unit_label_en?: string
          unit_label_ar?: string
          quantity: number
          unit_price_egp: number
          line_total_egp: number
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['order_items']['Insert']>
        Relationships: [
          {
            foreignKeyName: 'order_items_order_id_fkey'
            columns: ['order_id']
            isOneToOne: false
            referencedRelation: 'orders'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: Record<string, never>
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean }
    }
    Enums: {
      product_unit: ProductUnit
      quote_status: QuoteStatus
      profile_role: ProfileRole
      order_status: OrderStatus
    }
  }
}

export type ProductRow = Database['public']['Tables']['products']['Row']
export type QuoteRequestRow = Database['public']['Tables']['quote_requests']['Row']
export type QuoteItemRow = Database['public']['Tables']['quote_items']['Row']
export type ProfileRow = Database['public']['Tables']['profiles']['Row']
export type OrderRow = Database['public']['Tables']['orders']['Row']
export type OrderItemRow = Database['public']['Tables']['order_items']['Row']
