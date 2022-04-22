import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const City = () => {
  const [cityData, setCityData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { name } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3001/${name}`).then((resp) => {
      setCityData(resp.data);
      setLoading(false);
    });
  }, [name]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => console.log(cityData.location.name)}>LOG</button>
      {cityData && <div>Extended Card</div>}
    </div>
  );
};

export default City;
