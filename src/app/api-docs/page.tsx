export default function ApiDocs() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <iframe 
        src="/swagger.html" 
        style={{ width: "100%", height: "100%", border: "none" }} 
        title="Swagger UI"
      />
    </div>
  );
}
