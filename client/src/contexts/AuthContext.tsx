import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface AuthContextProps {
  employee: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [employee, setEmployee] = useState(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const response = await axios.post("http://127.0.0.1:8000/api/login", {
      email,
      password,
    });

    const { token, employee } = response.data;
    setToken(token);
    setEmployee(employee);

    localStorage.setItem("token", token);
    localStorage.setItem("employee", JSON.stringify(employee));

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const logout = async () => {
    await axios.post("http://127.0.0.1:8000/api/logout");
    setToken(null);
    setEmployee(null);

    localStorage.removeItem("token");
    localStorage.removeItem("employee");

    delete axios.defaults.headers.common["Authorization"];
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider
      value={{ employee, token, login, logout, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
