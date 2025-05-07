import React, { useState, useEffect } from "react";
import { AlertCircle, LogOut, Eye, EyeOff } from "lucide-react";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedLoginStatus = localStorage.getItem("isLoggedIn");

    if (storedEmail && storedLoginStatus === "true") {
      setIsLoggedIn(true);
      setFormData((prevState) => ({
        ...prevState,
        email: storedEmail,
      }));
    }
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name as keyof LoginFormData]) {
      setErrors((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    const newErrors: Partial<LoginFormData> = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters and include uppercase, lowercase, and numbers";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    localStorage.setItem("email", formData.email);
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setFormData({
      email: "",
      password: "",
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen relative bg-[#041643] overflow-hidden">
      <img
        src={`${process.env.PUBLIC_URL}/bg-image.png`}
        alt="Background"
        className="absolute inset-0 h-full object-cover opacity-30"
      />

      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-lg border border-white/30 text-white px-6 py-3 rounded-full shadow-xl flex items-center space-x-2 z-50">
          <div className="h-2 w-2 bg-green-400 rounded-full"></div>
          <span>You are logged in successfully!</span>
        </div>
      )}

      {isLoggedIn ? (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white/20 backdrop-blur-lg rounded-lg border border-white/30 shadow-xl p-8 w-full max-w-md text-center relative z-10">
            <div className="flex items-center justify-center mb-6">
              <img
                src={`${process.env.PUBLIC_URL}/Logo.png`}
                alt="Circles Logo"
                className="h-8 lg:h-10"
              />
            </div>
            <h1 className="text-2xl font-bold mb-6 text-white">
              Welcome, {formData.email}
            </h1>
            <p className="mb-8 text-white/90">
              You are successfully logged in.
            </p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500/80 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300 flex items-center justify-center backdrop-blur-sm"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen w-full max-w-6xl mx-auto relative z-10">
          <div className="lg:grid lg:grid-cols-2 h-full">
            <div className="lg:grid lg:grid-rows-[35vh_1fr]">
              <div className="pl-8 pt-8 lg:pl-10 lg:pt-20">
                <div className="flex items-center">
                  <img
                    src={`${process.env.PUBLIC_URL}/Logo.png`}
                    alt="Circles Logo"
                    className="h-8 lg:h-10"
                  />
                </div>
              </div>

              <div className="pl-8 pr-8 mt-6 text-left lg:mt-0 lg:pl-10">
                <h1 className="text-2xl lg:text-4xl font-bold text-white mb-2">
                  Login into
                  <br />
                  your account
                </h1>
                <p className="text-sm lg:text-base text-blue-200">
                  Let us make the circle bigger!
                </p>
              </div>
            </div>

            <div className="mt-6 lg:mt-0 lg:grid lg:grid-rows-[35vh_1fr]">
              <div></div>

              <div className="px-6 flex justify-center lg:px-4 lg:justify-start">
                <div className="bg-white rounded-lg shadow-xl px-6 py-8 w-full max-w-md lg:px-10 lg:py-12 lg:w-[429px] lg:h-[358px]">
                  <div className="lg:block">
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-gray-600 mb-2 text-left text-xs"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className={`w-full px-4 py-3 border rounded-md ${
                          errors.email ? "border-red-500" : "border-gray-200"
                        }`}
                      />
                      {errors.email && (
                        <div className="text-red-500 text-sm mt-1 flex items-center h-4">
                          <AlertCircle size={14} className="mr-1" />
                          <span className="text-xs">{errors.email}</span>
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="block text-gray-600 mb-2 text-left text-xs"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Your password"
                          className={`w-full px-4 py-3 border rounded-md ${
                            errors.password
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <div className="text-red-500 text-sm mt-2 flex items-center h-4">
                          <AlertCircle size={14} className="mr-1" />
                          <span className="text-xs">{errors.password}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="hidden lg:flex lg:items-center lg:justify-between lg:mb-4">
                      <p className="text-gray-600 text-xs">
                        Don't have an account?{" "}
                        <a href="#" className="hover:underline font-bold">
                          Sign up
                        </a>
                      </p>
                      <button
                        onClick={handleSubmit}
                        className="bg-[#1352F1] hover:bg-blue-700 text-white py-2 px-10 rounded-md transition duration-300"
                      >
                        Login
                      </button>
                    </div>

                    <div className="lg:hidden">
                      <button
                        onClick={handleSubmit}
                        className="w-full bg-[#1352F1] hover:bg-blue-700 text-white py-3 px-4 rounded-md transition duration-300 mb-5"
                      >
                        Login
                      </button>
                      <p className="text-gray-600 text-xs text-center">
                        Don't have an account?{" "}
                        <a href="#" className=" font-semibold">
                          Sign up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 text-center text-blue-200 text-xs w-full">
            © 2023 Circle. All Rights Reserved.
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
