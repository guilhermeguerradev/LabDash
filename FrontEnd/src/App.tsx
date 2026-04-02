import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '@/pages/auth/LoginPage'
import OrdersPage from '@/pages/orders/OrdersPage'
import PrivateRoute from './components/auth/PrivateRoute'
import MainLayout from './components/layout/MainLayout'
import DashboardPage from './pages/dashboard/DashboardPage'
import SalesPage from './pages/sales/SalesPage'
import SettingsPage from './pages/settings/SettingsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginPage />} />
        
        <Route path="/orders" element={
          <PrivateRoute>
            <MainLayout>
                <OrdersPage />
              </MainLayout>
            
          </PrivateRoute>
          }/>

          <Route path='/dashboard' element={
            <PrivateRoute>
              <MainLayout>
                <DashboardPage/>
              </MainLayout>
            </PrivateRoute>
          }
          />

          <Route path='/sales' element={
            <PrivateRoute>
              <MainLayout>
                <SalesPage/>
              </MainLayout>
            </PrivateRoute>
          }/>

          <Route path="/settings" element={
          <PrivateRoute>
            <MainLayout>
              <SettingsPage />
            </MainLayout>
          </PrivateRoute>
        } />


      </Routes>
    </BrowserRouter>
  )
}

export default App