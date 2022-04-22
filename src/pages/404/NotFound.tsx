import { FunctionComponent } from "react";
import Button from "../../components/ui/Button/Button";
import classes from "./notFound.module.scss";

const NotFound: FunctionComponent<{
  error: any;
  resetErrorBoundary: () => void;
}> = ({ error, resetErrorBoundary }) => {
  return (
    <div className={classes.wrapper} role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <Button
        customClass={classes.button}
        type="regular"
        text="Try again"
        clickFn={resetErrorBoundary}
      />
    </div>
  );
};

export default NotFound;
