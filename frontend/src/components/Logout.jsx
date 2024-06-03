import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Results from './Results';

const LogoutForm = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    navigate('/login'); // Redirect to sign-in page after logging out
  }, [logout, navigate]);

  return null; // Render nothing
};

export default LogoutForm;



// component for going back to the page //

export const GoBackButton = ({ position }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/Results'); // Go back one step in history
  };

  return (
    <button onClick={goBack} style={{ position: 'absolute', ...position, backgroundColor: 'blue', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}>Go Back</button>
  );
};

//component for edit button in result page //


 export const EditButton = ({ position, handleEdit }) => {
  return (
    <button
      onClick={handleEdit}
      style={{
        position: 'absolute',
        ...position,
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
      }}
    >
      Edit
    </button>
  );
};

