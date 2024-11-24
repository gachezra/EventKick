const [allEvents, setAllEvents] = useState([]);
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const currentUser = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const checkStatus = async () => {
      try {
        if (!currentUser) {
          navigate('/');
        } else {
          const userId = currentUser._id;
          const userResponse = await axios.get(`${getUserDetailsRoute}/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          const user = userResponse.data.user;

          if (user.role !== 'admin') {
            navigate('/');
          } else {
            // Only fetch events if the user is an admin
            fetchEvents();
          }
        }
      } catch (error) {
        console.error(error);
        setError("Error checking user status");
      }
    };

    checkStatus();
  }, []);