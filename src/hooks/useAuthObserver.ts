import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useUser } from "../context/UserContext";

const useAuthObserver = () => {
  const { setUser, setLoading } = useUser();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        console.log("observ", firebaseUser);
      if (firebaseUser) {
        firebaseUser.getIdToken().then((token) => {
          setUser({
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            accessToken: token,
          });
          localStorage.setItem("accessToken", token);
          setLoading(false);
        });
      } else {
        setUser(null);
        localStorage.removeItem("accessToken");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [setUser]);
};

export default useAuthObserver;
