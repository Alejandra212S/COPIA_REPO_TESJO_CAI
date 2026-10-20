import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../api/firebaseConfig';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const register = async (userData) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                userData.email,
                userData.password
            );

            const userFirebase = userCredential.user;

            await updateProfile(userFirebase, {
                displayName: userData.name
            });

            await setDoc(doc(db, "users", userFirebase.uid), {
                uid: userFirebase.uid,
                name: userData.name,
                email: userData.email,
                username: userData.username,
                phone: userData.phone,
                area: userData.area,
                subarea: userData.subarea,
                role: 'docente',
                createdAt: new Date()
            });

            return userFirebase;

        } catch (error) {
            let errorMessage = "Fallo en el registro con Firebase.";

            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "Este correo ya está registrado.";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Correo inválido.";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "Contraseña débil.";
            }

            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        // Manejado en LoginForm
    };

    const value = {
        user,
        loading,
        register,
        login,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;