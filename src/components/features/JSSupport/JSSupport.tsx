const JSSupport = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
        fontSize: "1.2rem",
        textAlign: "right",
      }}
    >
      <h4>json-server supported cities for adding</h4>
      <ul style={{ listStyleType: "none" }}>
        <li>New York</li>
        <li>Boston</li>
        <li>Los Angeles</li>
        <li>Washington</li>
        <li>Chicago</li>
        <li>Rome</li>
        <li>Paris</li>
        <li>Madrid</li>
      </ul>
    </div>
  );
};

export default JSSupport;
