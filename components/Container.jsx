export function Container({ className = '', children }) {
  return (
    <div className={`mx-auto w-full max-w-7xl ${className}`}> {children} </div>
  );
}
