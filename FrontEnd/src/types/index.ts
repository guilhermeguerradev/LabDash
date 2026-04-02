export interface FinancialReport {
  totalOrders: number
  totalSales: number
  totalRevenue: number
}
export interface OrderResponse {
  id: number
  companyId: number
  companyName: string
  clientId: number
  clientName: string
  date: string
  quantity: number
  totalValue: number
}

export interface DailyCounterSale {
  id: number
  date: string
  pixAmount: number
  cashAmount: number
  cardAmount: number
  totalDay: number
}

export interface Client {
  id: number
  name: string
  unitPrice: number
}

export interface Company {
  id: number
  name: string
}