import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Manager = () => {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [mainpassword, setmainPassword] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [savedPasswords, setSavedPasswords] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 2000);
  };

  const fetchPasswords = () => {
    try {
      const stored = localStorage.getItem('passwords');
      if (stored) {
        const data = JSON.parse(stored);
        setSavedPasswords(data.map(p => ({ ...p, show: false })));
      } else {
        setSavedPasswords([]);
      }
    } catch (error) {
      console.error("Failed to fetch passwords:", error);
      setSavedPasswords([]);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const savePassword = () => {
    if (!url || !username || !mainpassword) {
      showToast("Please fill all fields");
      return;
    }

    try {
      const newPassword = {
        _id: Date.now().toString(),
        url,
        username,
        password: mainpassword,
        show: false
      };

      const updated = [...savedPasswords, newPassword];
      localStorage.setItem('passwords', JSON.stringify(updated));
      setSavedPasswords(updated);

      setPassword("non-empty-to-render-section");
      setOpen(false);
      setUrl("");
      setUsername("");
      setmainPassword("");
      showToast("Password Saved");
    } catch (error) {
      console.error("Failed to save password:", error);
      showToast("Failed to save");
    }
  };

  const deletepassword = (id) => {
    try {
      const updated = savedPasswords.filter(p => p._id !== id);
      localStorage.setItem('passwords', JSON.stringify(updated));
      setSavedPasswords(updated);
      showToast("Password Deleted");
    } catch (error) {
      console.error("Failed to delete password:", error);
      showToast("Failed to delete");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='flex flex-col justify-center items-center gap-6'
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className='mt-3 text-[44px] text-white z-10 font-bold text-center'
        >
          <div>Your vault of</div>
          <div>digital secrets</div>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='add bg-blue-600 hover:scale-105 transition-scale duration-200 text-white px-6 py-2 rounded hover:bg-blue-700 transition'
          onClick={() => setOpen(!open)}
        >
          <span className="text">{open ? "Close Form" : "Add Password"}</span>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className='fixed top-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50'
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='mt-6 flex justify-center overflow-hidden'
          >
            <div className='w-[80vw] max-w-2xl p-6 bg-[#122852] text-white rounded-xl shadow-lg transition-all duration-300'>
              <h2 className='text-xl font-bold mb-6 text-center'>Add New Password</h2>
              <div className='flex flex-col gap-4'>
                <motion.input
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  type='url'
                  placeholder='Enter Website URL'
                  className='w-full p-3 rounded bg-[#0c1632] border border-[#1f2e50] focus:outline-none focus:ring-2 focus:ring-blue-400'
                  onChange={(e) => setUrl(e.target.value)}
                  value={url}
                  required
                />
                <motion.input
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  type='text'
                  placeholder='Enter Username'
                  className='w-full p-3 rounded bg-[#0c1632] border border-[#1f2e50] focus:outline-none focus:ring-2 focus:ring-blue-400'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <motion.input
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  type='password'
                  placeholder='Enter Password'
                  onChange={(e) => setmainPassword(e.target.value)}
                  className='w-full p-3 rounded bg-[#0c1632] border border-[#1f2e50] focus:outline-none focus:ring-2 focus:ring-blue-400'
                  value={mainpassword}
                  required
                />
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer w-full mt-2'
                  onClick={savePassword}
                >
                  Save
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-10 flex justify-center items-center"
      >
        <div className='rounded-xl border-2 border-[#102e51] w-[90vw] h-[55vh]'>
          <div className="w-[30vw] flex m-4 gap-1 items-center border border-[#102e51] rounded-xl">
            <div className='p-2'>
              <img className='w-6' src="https://img.icons8.com/?size=100&id=132&format=png&color=6c799a" alt="search" />
            </div>
            <input
              className='focus:outline-none text-white w-full text-[18px] font-semibold bg-transparent'
              type="text"
              name="search"
              id="search"
              placeholder='Search'
            />
          </div>

          <AnimatePresence mode='wait'>
            {savedPasswords.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className='text-center font-black text-white text-3xl mt-20'
              >
                No Passwords Created
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='rounded-md text-white w-[80vw] h-[43vh] m-4 border border-[#0b1932] overflow-y-auto'
              >
                <div className='m-4'>
                  <div className='flex justify-between border-b mb-3 border-[#1e2e4e] py-2 items-center'>
                    <div className='w-[30%] text-center text-[23px] font-bold'>Website</div>
                    <div className='w-[30%] text-center text-[23px] font-bold'>Username</div>
                    <div className='w-[30%] text-center text-[23px] font-bold'>Passwords</div>
                  </div>

                  <AnimatePresence>
                    {savedPasswords.map((item, index) => (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className='flex justify-between border-b border-[#1e2e4e] py-2 items-center'
                      >
                        <div className='w-[30%] text-center text-[15px] font-semibold'>{item.url}</div>
                        <div className='w-[30%] text-center text-[15px] font-semibold'>{item.username}</div>
                        <div className='w-[30%] text-center text-[15px] flex justify-between items-center gap-2'>
                          <motion.span
                            key={item.show ? 'visible' : 'hidden'}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.show ? item.password : '•'.repeat(item.password.length)}
                          </motion.span>
                          <div className='flex gap-4'>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                setSavedPasswords(prev =>
                                  prev.map((p) =>
                                    p._id === item._id ? { ...p, show: !p.show } : p
                                  )
                                );
                              }}
                              title={item.show ? "Hide" : "Show"}
                              className='border-black border rounded-xl hover:scale-110 transition-transform'
                            >
                              <img
                                src={
                                  item.show
                                    ? "https://img.icons8.com/?size=100&id=85137&format=png&color=ffffff"
                                    : "https://img.icons8.com/?size=100&id=85130&format=png&color=ffffff"
                                }
                                alt="toggle visibility"
                                className='w-5 h-5 m-[9px]'
                              />
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="bin-button"
                              onClick={() => deletepassword(item._id)}
                            >
                              <svg className="bin-top" viewBox="0 0 39 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line y1="5" x2="39" y2="5" stroke="white" strokeWidth="4" />
                                <line x1="12" y1="1.5" x2="26.0357" y2="1.5" stroke="white" strokeWidth="3" />
                              </svg>
                              <svg className="bin-bottom" viewBox="0 0 33 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="path-1-inside-1_8_19" fill="white">
                                  <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" />
                                </mask>
                                <path
                                  d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                  fill="white"
                                  mask="url(#path-1-inside-1_8_19)"
                                />
                                <path d="M12 6L12 29" stroke="white" strokeWidth="4" />
                                <path d="M21 6V29" stroke="white" strokeWidth="4" />
                              </svg>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <style>{`
        .bin-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background-color: rgb(220, 38, 38);
          cursor: pointer;
          border: 2px solid rgb(220, 38, 38);
          transition: all 0.3s;
        }
        .bin-bottom {
          width: 15px;
          transition: all 0.3s;
        }
        .bin-top {
          width: 17px;
          transform-origin: center;
          transition: all 0.3s;
        }
        .bin-button:hover .bin-top {
          transform: rotate(45deg);
        }
        .bin-button:hover {
          background-color: rgb(185, 28, 28);
        }
        .bin-button:active {
          transform: scale(0.9);
        }
      `}</style>
    </>
  );
};

export default Manager;
