import { createContext, useContext, useState, useEffect } from 'react'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // S'inscrire
  const signup = async (email, password, displayName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    
    // Mettre à jour le profil
    await updateProfile(userCredential.user, {
      displayName: displayName
    })

    // Créer le document utilisateur dans Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      displayName: displayName,
      email: email,
      currentLevel: 0,
      coins: 100,
      createdAt: new Date().toISOString()
    })

    return userCredential
  }

  // Se connecter
  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Se déconnecter
  const logout = async () => {
    return signOut(auth)
  }

  // Récupérer les données utilisateur
  const getUserData = async (uid) => {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return docSnap.data()
    }
    return null
  }

  // Écouter les changements d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    getUserData
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}


