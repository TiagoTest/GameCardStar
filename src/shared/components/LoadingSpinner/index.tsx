import React from "react";
import classes from "./LoadingSpinner.module.css";

export const LoadingSpinner: React.FC = () => {
  //todo: usar css in js
  return <div className={classes.loader}>Carregando...</div>;
};

export default LoadingSpinner;
