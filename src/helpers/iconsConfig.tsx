import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudSunRain,
  faCloudSun,
  faSun,
  faSunPlantWilt,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";
import { FunctionComponent } from "react";

const ConfiggedIcon: FunctionComponent<{ icon: string }> = ({ icon }) => {
  switch (icon) {
    case "cloud-sun-rain":
      return <FontAwesomeIcon icon={faCloudSunRain} />;

    case "cloud-sun":
      return <FontAwesomeIcon icon={faCloudSun} />;

    case "cloud":
      return <FontAwesomeIcon icon={faCloud} />;

    case "sun-plant-wilt":
      return <FontAwesomeIcon icon={faSunPlantWilt} />;

    default:
      return <FontAwesomeIcon icon={faSun} />;
  }
};

export default ConfiggedIcon;
