export type ProductType = "course" | "bundle" | "subscription" | "workshop" | "lead_magnet";
export type PurchaseStatus = "completed" | "pending" | "refunded" | "failed";
export type ExperimentStatus = "draft" | "active" | "paused" | "completed";
export type BillingInterval = "one_time" | "month" | "year";

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          stripe_customer_id: string | null;
          klaviyo_profile_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          stripe_customer_id?: string | null;
          klaviyo_profile_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          stripe_customer_id?: string | null;
          klaviyo_profile_id?: string | null;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          type: ProductType;
          price: number;
          original_price: number | null;
          billing_interval: BillingInterval;
          stripe_product_id: string | null;
          stripe_price_id: string | null;
          thinkific_course_id: string | null;
          description: string | null;
          active: boolean;
          metadata: Record<string, unknown> | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          type: ProductType;
          price: number;
          original_price?: number | null;
          billing_interval?: BillingInterval;
          stripe_product_id?: string | null;
          stripe_price_id?: string | null;
          thinkific_course_id?: string | null;
          description?: string | null;
          active?: boolean;
          metadata?: Record<string, unknown> | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          slug?: string;
          type?: ProductType;
          price?: number;
          original_price?: number | null;
          billing_interval?: BillingInterval;
          stripe_product_id?: string | null;
          stripe_price_id?: string | null;
          thinkific_course_id?: string | null;
          description?: string | null;
          active?: boolean;
          metadata?: Record<string, unknown> | null;
          updated_at?: string;
        };
      };
      purchases: {
        Row: {
          id: string;
          customer_id: string;
          product_id: string;
          stripe_payment_id: string | null;
          amount: number;
          currency: string;
          status: PurchaseStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          product_id: string;
          stripe_payment_id?: string | null;
          amount: number;
          currency?: string;
          status?: PurchaseStatus;
          created_at?: string;
        };
        Update: {
          customer_id?: string;
          product_id?: string;
          stripe_payment_id?: string | null;
          amount?: number;
          currency?: string;
          status?: PurchaseStatus;
        };
      };
      experiments: {
        Row: {
          id: string;
          name: string;
          variants: Record<string, unknown>;
          traffic_split: number;
          status: ExperimentStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          variants: Record<string, unknown>;
          traffic_split?: number;
          status?: ExperimentStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          variants?: Record<string, unknown>;
          traffic_split?: number;
          status?: ExperimentStatus;
          updated_at?: string;
        };
      };
      experiment_assignments: {
        Row: {
          id: string;
          experiment_id: string;
          visitor_id: string;
          variant: string;
          converted: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          experiment_id: string;
          visitor_id: string;
          variant: string;
          converted?: boolean;
          created_at?: string;
        };
        Update: {
          variant?: string;
          converted?: boolean;
        };
      };
      email_captures: {
        Row: {
          id: string;
          email: string;
          source: string | null;
          page_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          source?: string | null;
          page_url?: string | null;
          created_at?: string;
        };
        Update: {
          email?: string;
          source?: string | null;
          page_url?: string | null;
        };
      };
    };
  };
}
