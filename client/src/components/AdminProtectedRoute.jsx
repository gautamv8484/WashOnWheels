import { Navigate } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'  // ✅ Points to context folder

const AdminProtectedRoute = ({ children }) => {
  const { isAdminAuthenticated, loading } = useAdmin()

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.5rem',
        color: '#4F46E5'
      }}>
        Loading Admin Panel...
      </div>
    )
  }

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default AdminProtectedRoute;