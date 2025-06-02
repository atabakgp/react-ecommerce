import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useUser } from "../context/UserContext";
import { useLoading } from "../context/LoadingContext";


const useAuthObserver = () => {
  const { setUser } = useUser();
  const { setLoading } = useLoading();



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          setUser({
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            accessToken: token,
          });
        } catch (error) {
          console.error('Failed to get token:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  
    return () => unsubscribe();
  }, []);
  
};

export default useAuthObserver;
