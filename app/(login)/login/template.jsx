export default function Template({ children }) {
  return (
    <html lang="en">
      <body className="root-layout">{children}</body>
    </html>
  );
}

// export default function Template({ children }) {
//     return (
//         <>{children}</>        
//     )
// }