import { Box, Divider, Typography, Button } from "@mui/material";
import { useState } from "react";
import { FaCheck, FaTimes } from 'react-icons/fa'; // FontAwesome Icons

import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';  // Import the default styling

function MyAccount() {
    const [isEmailVerified, setEmailVerified] = useState(false);
    const [isPhoneVerified, setPhoneVerified] = useState(false);

    const handleVerifyEmail = () => {
        // Logic to verify email
        setEmailVerified(true);
    };

    const handleVerifyPhone = () => {
        // Logic to verify phone
        setPhoneVerified(true);
    };


    const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("hello");
  const [tempValue, setTempValue] = useState("hello");
  const [loading, setLoading] = useState(false);

  // Handler to save changes and send to API
  const handleSave = async () => {
    setLoading(true);
    try {
    //   await axios.post(apiEndpoint, { updatedValue: tempValue });
    //   setValue(tempValue);
    } catch (error) {
      console.error("Failed to save changes:", error);
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  // Cancel changes and revert to original value
  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

    return (
        <Box p={3} sx={{ width: '100%', margin: 'auto' }}>
            <span className="settings-heading">My Profile</span>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <span className="settings-subject">Name:</span>
                    <div style={{ display: 'inline-block' }}>
                        {isEditing ? (
                        <div
                            style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid #4c9aff',
                            padding: '6px 8px',
                            borderRadius: '4px',
                            boxShadow: '0 0 3px rgba(76, 154, 255, 0.5)',
                            backgroundColor: 'white',
                            }}
                        >
                            <input
                            type="text"
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '5px 10px',
                                border: 'none',
                                outline: 'none',
                                fontSize: '14px',
                                borderRadius: '4px',
                            }}
                            disabled={loading}
                            autoFocus
                            />
                            <div style={{ display: 'flex', marginLeft: '8px' }}>
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#36B37E',
                                marginRight: '5px',
                                fontSize: '16px',
                                }}
                            >
                                <FaCheck />
                            </button>
                            <button
                                onClick={handleCancel}
                                style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#FF5630',
                                fontSize: '16px',
                                }}
                            >
                                <FaTimes />
                            </button>
                            </div>
                        </div>
                        ) : (
                        <div
                            onClick={() => setIsEditing(true)}
                            style={{
                            padding: '6px 12px',
                            border: '1px solid transparent',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            minWidth: '200px',
                            backgroundColor: '#F4F5F7',
                            transition: 'border 0.2s, background-color 0.2s',
                            }}
                            onMouseEnter={(e) =>
                            (e.currentTarget.style.border = '1px solid #DFE1E6')
                            }
                            onMouseLeave={(e) =>
                            (e.currentTarget.style.border = '1px solid transparent')
                            }
                        >
                            {value || (
                            <span style={{ color: '#6B778C' }}>Click to edit</span>
                            )}
                        </div>
                        )}
                    </div>
                </Box>

            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <span className="settings-subject">Email ID:</span>
                    <div style={{ display: 'inline-block' }}>
                        {isEditing ? (
                        <div
                            style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid #4c9aff',
                            padding: '6px 8px',
                            borderRadius: '4px',
                            boxShadow: '0 0 3px rgba(76, 154, 255, 0.5)',
                            backgroundColor: 'white',
                            }}
                        >
                            <input
                            type="text"
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '5px 10px',
                                border: 'none',
                                outline: 'none',
                                fontSize: '14px',
                                borderRadius: '4px',
                            }}
                            disabled={loading}
                            autoFocus
                            />
                            <div style={{ display: 'flex', marginLeft: '8px' }}>
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#36B37E',
                                marginRight: '5px',
                                fontSize: '16px',
                                }}
                            >
                                <FaCheck />
                            </button>
                            <button
                                onClick={handleCancel}
                                style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#FF5630',
                                fontSize: '16px',
                                }}
                            >
                                <FaTimes />
                            </button>
                            </div>
                        </div>
                        ) : (
                        <div
                            onClick={() => setIsEditing(true)}
                            style={{
                            padding: '6px 12px',
                            border: '1px solid transparent',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            minWidth: '200px',
                            backgroundColor: '#F4F5F7',
                            transition: 'border 0.2s, background-color 0.2s',
                            }}
                            onMouseEnter={(e) =>
                            (e.currentTarget.style.border = '1px solid #DFE1E6')
                            }
                            onMouseLeave={(e) =>
                            (e.currentTarget.style.border = '1px solid transparent')
                            }
                        >
                            {value || (
                            <span style={{ color: '#6B778C' }}>Click to edit</span>
                            )}
                        </div>
                        )}
                    </div>
                </Box>

            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <span className="settings-subject">Phone number:</span>
                    <div style={{ display: 'inline-block' }}>
                        {isEditing ? (
                        <div
                            style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid #4c9aff',
                            padding: '6px 8px',
                            borderRadius: '4px',
                            boxShadow: '0 0 3px rgba(76, 154, 255, 0.5)',
                            backgroundColor: 'white',
                            }}
                        >
                            <input
                            type="text"
                            value={tempValue}
                            onChange={(e) => setTempValue(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '5px 10px',
                                border: 'none',
                                outline: 'none',
                                fontSize: '14px',
                                borderRadius: '4px',
                            }}
                            disabled={loading}
                            autoFocus
                            />
                            <div style={{ display: 'flex', marginLeft: '8px' }}>
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#36B37E',
                                marginRight: '5px',
                                fontSize: '16px',
                                }}
                            >
                                <FaCheck />
                            </button>
                            <button
                                onClick={handleCancel}
                                style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#FF5630',
                                fontSize: '16px',
                                }}
                            >
                                <FaTimes />
                            </button>
                            </div>
                        </div>
                        ) : (
                        <div
                            onClick={() => setIsEditing(true)}
                            style={{
                            padding: '6px 12px',
                            border: '1px solid transparent',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            minWidth: '200px',
                            backgroundColor: '#F4F5F7',
                            transition: 'border 0.2s, background-color 0.2s',
                            }}
                            onMouseEnter={(e) =>
                            (e.currentTarget.style.border = '1px solid #DFE1E6')
                            }
                            onMouseLeave={(e) =>
                            (e.currentTarget.style.border = '1px solid transparent')
                            }
                        >
                            {value || (
                            <span style={{ color: '#6B778C' }}>Click to edit</span>
                            )}
                        </div>
                        )}
                    </div>
                </Box>

            </Box>
        </Box>

    //     <div style={{ display: 'inline-block' }}>
    //     {isEditing ? (
    //       <div
    //         style={{
    //           display: 'flex',
    //           alignItems: 'center',
    //           border: '1px solid #4c9aff',
    //           padding: '6px 8px',
    //           borderRadius: '4px',
    //           boxShadow: '0 0 3px rgba(76, 154, 255, 0.5)',
    //           backgroundColor: 'white',
    //         }}
    //       >
    //         <input
    //           type="text"
    //           value={tempValue}
    //           onChange={(e) => setTempValue(e.target.value)}
    //           style={{
    //             flex: 1,
    //             padding: '5px 10px',
    //             border: 'none',
    //             outline: 'none',
    //             fontSize: '14px',
    //             borderRadius: '4px',
    //           }}
    //           disabled={loading}
    //           autoFocus
    //         />
    //         <div style={{ display: 'flex', marginLeft: '8px' }}>
    //           <button
    //             onClick={handleSave}
    //             disabled={loading}
    //             style={{
    //               background: 'none',
    //               border: 'none',
    //               cursor: 'pointer',
    //               color: '#36B37E',
    //               marginRight: '5px',
    //               fontSize: '16px',
    //             }}
    //           >
    //             <FaCheck />
    //           </button>
    //           <button
    //             onClick={handleCancel}
    //             style={{
    //               background: 'none',
    //               border: 'none',
    //               cursor: 'pointer',
    //               color: '#FF5630',
    //               fontSize: '16px',
    //             }}
    //           >
    //             <FaTimes />
    //           </button>
    //         </div>
    //       </div>
    //     ) : (
    //       <div
    //         onClick={() => setIsEditing(true)}
    //         style={{
    //           padding: '6px 12px',
    //           border: '1px solid transparent',
    //           borderRadius: '4px',
    //           cursor: 'pointer',
    //           minWidth: '200px',
    //           backgroundColor: '#F4F5F7',
    //           transition: 'border 0.2s, background-color 0.2s',
    //         }}
    //         onMouseEnter={(e) =>
    //           (e.currentTarget.style.border = '1px solid #DFE1E6')
    //         }
    //         onMouseLeave={(e) =>
    //           (e.currentTarget.style.border = '1px solid transparent')
    //         }
    //       >
    //         {value || (
    //           <span style={{ color: '#6B778C' }}>Click to edit</span>
    //         )}
    //       </div>
    //     )}
    //   </div>

    );
}

export default MyAccount;
