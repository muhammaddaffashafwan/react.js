import PropTypes from "prop-types";
import { useState } from "react";

// Modal component for replying to a forum post
const Modal = ({ forumId, onClose }) => {
  console.log("Forum ID:", forumId);  // Add this for debugging
  const [replyText, setReplyText] = useState(""); // State to manage reply text

  // Handle textarea change
  const handleTextChange = (e) => {
    setReplyText(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate reply text
    if (replyText.trim().length === 0) {
      alert("Reply text cannot be empty");
      return;
    }

    try {
      // Send the reply to the backend API
      const response = await fetch(`http://localhost:5000/reply-forum/${forumId}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Use token for authentication
        },
        body: JSON.stringify({ reply_text: replyText }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Reply added:", data.reply); // Log the response for debugging
        onClose(); // Close modal after successful submission
      } else {
        alert(data.message || "Error adding reply");
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
      alert("Failed to submit reply");
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-lg'>
        {/* Close button */}
        <span
          className='text-gray-600 cursor-pointer float-right text-3xl hover:text-gray-800'
          onClick={onClose}
        >
          &times;
        </span>

        {/* User Avatar */}
        <div className='flex items-center mb-6'>
          <img
            className='w-12 h-12 rounded-full mr-3'
            src='/images/forum1/muhammad sumbul.png'
            alt='User Avatar'
          />
          <span className='font-semibold text-lg'>Muhammad Sumbul</span>
        </div>

        {/* Comment Section */}
        <div className='flex flex-col space-y-4'>
          <textarea
            className='w-full border border-gray-300 rounded-lg p-2'
            placeholder='Add your comment...'
            value={replyText}
            onChange={handleTextChange} // Update state on change
          ></textarea>

          <button
            className='ml-[300px] py-2 rounded-full shadow-md bg-[#739646] border-[#5f7f33] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#739646] hover:ring-[#5f7f33] hover:ring-2 active:bg-[#ffffff] active:text-[#739646] active:ring-2 transition-all text-center text-[13px]'
            onClick={handleSubmit} // Handle submit when clicked
          >
            ADD COMMENT
          </button>
        </div>
      </div>
    </div>
  );
};

// Adding prop validation
Modal.propTypes = {
  forumId: PropTypes.string.isRequired, // forumId should be passed as a prop
  onClose: PropTypes.func.isRequired,   // onClose must be a function
};

export default Modal;
