import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '@/pages/auth/LoginPage'
import OrdersPage from '@/pages/orders/OrdersPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App