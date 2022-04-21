import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const City = (props: any) => {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, []);

  return <div>City</div>;
};

export default City;
