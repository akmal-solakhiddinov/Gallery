import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../config/firebase";

const AuthContext = createContext();

const initialState = {
  user: null,
  images: [],
  isLogin: false,
  isLoading: false,
  error: "",
  message: "",
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "auth/signup":
    case "auth/login":
      return {
        ...state,
        user: payload,
        isLogin: true,
        isLoading: false,
        error: "",
      };
    case "auth/logout":
      return {
        ...state,
        user: null,
        isLogin: false,
        isLoading: false,
        error: "",
      };
    case "images/upload":
      return { ...state, isLoading: false, images: [...state.images, payload] };
    case "images/getImages":
      return { ...state, isLoading: false, images: payload };
    case "images/getMyImages":
      return {
        ...state,
        isLoading: false,
        user: { ...state.user, myImages: payload },
      };

    case "images/deleteImage":
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          myImages: state.user?.myImages?.filter((img) => img.id !== payload),
        },
      };

    case "images/hideImage":
      const newD = state.user?.myImages?.map((img) =>
        img.id === payload ? { ...img, hidden: true } : img
      );
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          myImages: newD,
        },
      };
    case "images/unhideImage":
      const newData = state.user?.myImages?.map((img) =>
        img.id === payload ? { ...img, hidden: false } : img
      );
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          myImages: newData,
        },
      };
    case "loading":
      return { ...state, isLoading: true, error: "" };
    case "error":
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [image, setImage] = useState([]);

  const signUp = async (email, password) => {
    dispatch({ type: "loading" });
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch({ type: "auth/signup", payload: userCredential.user });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  const login = async (email, password) => {
    dispatch({ type: "loading" });
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  const logout = async () => {
    dispatch({ type: "loading" });
    try {
      await signOut(auth);
      dispatch({ type: "auth/logout" });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  const uploadImage = async (file) => {
    dispatch({ type: "loading" });
    // Generate a unique identifier for the file name
    const fileName = `${Date.now()}_${file.name}`;

    // Create a reference to the storage location with the unique file name
    const imagesRef = ref(storage, `images/${fileName}`);

    try {
      const uploadedTask = await uploadBytes(imagesRef, file);
      const url = await getDownloadURL(imagesRef);
      const body = {
        imageName: `${fileName}`,
        user_email: state.user.email,
        image: url,
        createdAt: new Date(),
        hidden: false,
      };

      const doc = await addDoc(collection(db, "gallery"), body);
      console.log("Image uploaded successfully");
      dispatch({ type: "images/upload", payload: body });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: "error", payload: error.message });
    }
  };

  const getImages = async () => {
    dispatch({ type: "loading" });
    const galleryCollectionRef = collection(db, "gallery");
    const q = query(galleryCollectionRef, where("hidden", "==", false));
    try {
      const querySnapshot = await getDocs(q);
      const imagesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch({ type: "images/getImages", payload: imagesData });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  const getMyImages = async () => {
    dispatch({ type: "loading" });
    const galleryCollectionRef = collection(db, "gallery");
    const q = query(
      galleryCollectionRef,
      where("user_email", "==", `${auth?.currentUser?.email}`)
    );
    try {
      const querySnapshot = await getDocs(q);
      const imagesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch({ type: "images/getMyImages", payload: imagesData });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  const deleteMyImage = async (id, name) => {
    dispatch({ type: "loading" });
    try {
      await deleteDoc(doc(db, "gallery", id));
      const desertRef = ref(storage, `images/${name}`);

      // Delete the file
      deleteObject(desertRef)
        .then(() => {
          console.log("File deleted successfully");
        })
        .catch((error) => {
          console.log("Uh-oh, an error occurred!", error);
        });
      dispatch({ type: "images/deleteImage", payload: id });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  const hideImage = async (id) => {
    dispatch({ type: "loading" });
    try {
      const docRef = doc(db, "gallery", id);
      await updateDoc(docRef, { hidden: true });
      dispatch({ type: "images/hideImage", payload: id });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  const unhideImage = async (id) => {
    dispatch({ type: "loading" });
    try {
      const docRef = doc(db, "gallery", id);
      await updateDoc(docRef, { hidden: false });
      dispatch({ type: "images/unhideImage", payload: id });
    } catch (error) {
      dispatch({ type: "error", payload: error.message });
    }
  };

  const getUser = (user) => {
    dispatch({ type: "auth/login", payload: user });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          myImages: [],
        };
        getUser(userData);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        login,
        logout,
        uploadImage,
        state,
        getImages,
        getUser,
        getMyImages,
        deleteMyImage,
        hideImage,
        unhideImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
